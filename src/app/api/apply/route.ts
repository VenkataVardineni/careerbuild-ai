import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import type { ApplyTab } from "@/lib/applyForms";
import { appendToSpreadsheet } from "@/lib/spreadsheet";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireFields(body: Record<string, unknown>, fields: string[]) {
  for (const field of fields) {
    const v = body[field];
    if (typeof v !== "string" || !v.trim()) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

function validateEmail(body: Record<string, unknown>) {
  const email = String(body.email || "").trim();
  if (!EMAIL_RE.test(email)) return "Invalid email address";
  return null;
}

function validateByType(formType: ApplyTab, body: Record<string, unknown>) {
  if (formType === "instructor") {
    const base =
      requireFields(body, [
        "name",
        "email",
        "instructorKind",
        "expertise",
        "format",
        "experience",
        "audience",
        "message",
      ]) || validateEmail(body);
    if (base) return base;
    if (body.instructorKind === "institution") {
      return requireFields(body, ["partnershipType"]);
    }
    return null;
  }
  if (formType === "course-suggestion") {
    return requireFields(body, ["name", "email", "proposedTitle"]) || validateEmail(body);
  }
  return "Invalid form type";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formType = body.formType as ApplyTab;

    if (!formType || !["instructor", "course-suggestion"].includes(formType)) {
      return NextResponse.json({ error: "Invalid or missing formType" }, { status: 400 });
    }

    const validationError = validateByType(formType, body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const submission = {
      formType,
      ...body,
      submittedAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });

    const filename = `${formType}-${Date.now()}.json`;
    await writeFile(path.join(dataDir, filename), JSON.stringify(submission, null, 2));

    let sheetWarning: string | undefined;
    try {
      await appendToSpreadsheet(submission);
    } catch (sheetError) {
      sheetWarning =
        sheetError instanceof Error ? sheetError.message : "Spreadsheet sync failed";
      console.error("[apply] Spreadsheet sync failed:", sheetWarning);
    }

    return NextResponse.json({
      success: true,
      message: "Submission received successfully",
      ...(sheetWarning ? { warning: sheetWarning } : {}),
    });
  } catch {
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 });
  }
}
