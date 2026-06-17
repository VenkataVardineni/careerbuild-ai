import type { ApplyTab } from "./applyForms";

type SubmissionPayload = Record<string, unknown> & {
  formType: ApplyTab;
  submittedAt: string;
};

function cleanEnv(value: string | undefined): string {
  if (!value) return "";
  // Strip inline comments accidentally pasted into .env values
  return value.split("#")[0].trim();
}

export async function appendToSpreadsheet(submission: SubmissionPayload): Promise<void> {
  const webhookUrl = cleanEnv(process.env.GOOGLE_SHEETS_WEBHOOK_URL);
  if (!webhookUrl) {
    console.warn("[spreadsheet] GOOGLE_SHEETS_WEBHOOK_URL is not set — skipping sheet sync");
    return;
  }

  const payload = {
    secret: cleanEnv(process.env.GOOGLE_SHEETS_WEBHOOK_SECRET),
    submission: formatSubmissionRow(submission),
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
    cache: "no-store",
  });

  const text = await response.text();

  if (text.trimStart().startsWith("<!DOCTYPE") || text.trimStart().startsWith("<HTML")) {
    throw new Error(
      "Spreadsheet webhook returned HTML instead of JSON. Redeploy your Apps Script as a Web App (Execute as: Me, Access: Anyone).",
    );
  }

  if (!response.ok) {
    throw new Error(`Spreadsheet sync failed (${response.status}): ${text.slice(0, 200)}`);
  }

  let result: { success?: boolean; error?: string };
  try {
    result = JSON.parse(text) as { success?: boolean; error?: string };
  } catch {
    throw new Error(`Spreadsheet returned invalid JSON: ${text.slice(0, 200)}`);
  }

  if (!result.success) {
    throw new Error(result.error || "Spreadsheet sync rejected the submission");
  }
}

function str(value: unknown): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value == null) return "";
  return String(value).trim();
}

/** Flat row sent to Google Sheets / Excel webhook */
export function formatSubmissionRow(submission: SubmissionPayload) {
  const isInstructor = submission.formType === "instructor";

  return {
    submittedAt: str(submission.submittedAt),
    formType: isInstructor ? "Instructor application" : "Course suggestion",
    name: str(submission.name),
    email: str(submission.email),
    company: str(submission.company),
    linkedin: isInstructor ? str(submission.linkedin) : "",
    instructorKind: isInstructor ? str(submission.instructorKind) : "",
    partnershipType: isInstructor ? str(submission.partnershipType) : "",
    topic: isInstructor ? str(submission.expertise) : str(submission.proposedTitle),
    expertise: isInstructor ? str(submission.expertise) : "",
    format: isInstructor ? str(submission.format) : "",
    experience: isInstructor ? str(submission.experience) : "",
    audience: isInstructor ? str(submission.audience) : "",
    message: isInstructor ? str(submission.message) : "",
    industryNeed: "",
    willingToTeach: "",
    outsideLifeSciences: isInstructor ? str(submission.outsideLifeSciences) : "",
  };
}
