"use client";

import {
  ArrowRight,
  Check,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import {
  FormEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  audienceOptions,
  courseSuggestionBenefits,
  courseTopicOptions,
  experienceOptions,
  formBenefits,
  formatOptions,
} from "@/lib/data";
import {
  ApplyParams,
  ApplyTab,
  CourseSuggestionFormState,
  InstructorFormState,
  emptyCourseSuggestionForm,
  emptyInstructorForm,
  hashForTab,
  instructorKindOptions,
  partnershipTypeOptions,
  tabFromHash,
  validateCourseSuggestionForm,
  validateInstructorForm,
} from "@/lib/applyForms";
import { FormSelect } from "./FormSelect";
import { inputClass, labelClass } from "@/lib/formUi";

type Status = "idle" | "loading" | "success" | "error";

const tabs: { id: ApplyTab; label: string; short: string }[] = [
  { id: "instructor", label: "Apply to teach", short: "Instructor" },
  { id: "course-suggestion", label: "Suggest a new course", short: "New course" },
];

const tabCopy: Record<
  ApplyTab,
  { eyebrow: string; title: string; subtitle: string; benefits: string[] }
> = {
  instructor: {
    eyebrow: "For instructors & partners",
    title: "Apply to teach",
    subtitle:
      "Share your expertise or partnership goals. We respond within 2 business days.",
    benefits: formBenefits,
  },
  "course-suggestion": {
    eyebrow: "New course idea",
    title: "Propose a topic we should host",
    subtitle:
      "Don't see your area listed? Propose any course topic — we're building a catalog beyond life sciences.",
    benefits: courseSuggestionBenefits,
  },
};

type ApplyModalContextValue = {
  openApply: (tab: ApplyTab, params?: ApplyParams) => void;
  closeApply: () => void;
};

const ApplyModalContext = createContext<ApplyModalContextValue | null>(null);

export function useApplyModal() {
  const ctx = useContext(ApplyModalContext);
  if (!ctx) throw new Error("useApplyModal must be used within ApplyModalProvider");
  return ctx;
}

async function postForm(formType: ApplyTab, payload: Record<string, unknown>) {
  const res = await fetch("/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, ...payload }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

function SubmitButton({ status, label }: { status: Status; label: string }) {
  return (
    <button
      type="submit"
      disabled={status === "loading"}
      className="btn-primary flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white disabled:opacity-60"
    >
      {status === "loading" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          {label}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export function ApplyModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ApplyTab>("instructor");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [instructor, setInstructor] = useState<InstructorFormState>(emptyInstructorForm);
  const [suggestion, setSuggestion] = useState<CourseSuggestionFormState>(emptyCourseSuggestionForm);

  const applyParams = useCallback((tab: ApplyTab, params?: ApplyParams) => {
    if (!params) return;
    if (tab === "instructor") {
      setInstructor((prev) => ({
        ...prev,
        instructorKind: params.kind === "institution" ? "institution" : prev.instructorKind,
        expertise: params.topic || prev.expertise,
        outsideLifeSciences: params.outside ?? prev.outsideLifeSciences,
      }));
      return;
    }
    setSuggestion((prev) => ({
      ...prev,
      proposedTitle: params.topic || prev.proposedTitle,
    }));
  }, []);

  const openApply = useCallback(
    (tab: ApplyTab, params?: ApplyParams) => {
      setActiveTab(tab);
      setStatus("idle");
      setErrorMessage("");
      applyParams(tab, params);
      setOpen(true);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", hashForTab(tab));
      }
    },
    [applyParams],
  );

  const closeApply = useCallback(() => {
    setOpen(false);
    setStatus("idle");
    setErrorMessage("");
    if (typeof window !== "undefined" && window.location.hash.startsWith("#apply")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const tab = tabFromHash(window.location.hash);
      if (!tab) {
        setOpen(false);
        setStatus("idle");
        setErrorMessage("");
        return;
      }
      const params = new URLSearchParams(window.location.search);
      setActiveTab(tab);
      setStatus("idle");
      setErrorMessage("");
      applyParams(tab, {
        topic: params.get("topic") || undefined,
        kind: params.get("kind") || undefined,
        outside: params.get("outside") === "1",
      });
      setOpen(true);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [applyParams]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeApply();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeApply]);

  const selectTab = (tab: ApplyTab) => {
    setActiveTab(tab);
    setStatus("idle");
    setErrorMessage("");
    window.history.replaceState(null, "", hashForTab(tab));
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
    setInstructor(emptyInstructorForm());
    setSuggestion(emptyCourseSuggestionForm());
  };

  const handleInstructorSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateInstructorForm(instructor);
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      await postForm("instructor", instructor);
      setStatus("success");
      setInstructor(emptyInstructorForm());
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const handleSuggestionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateCourseSuggestionForm(suggestion);
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      await postForm("course-suggestion", suggestion);
      setStatus("success");
      setSuggestion(emptyCourseSuggestionForm());
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const copy = tabCopy[activeTab];

  return (
    <ApplyModalContext.Provider value={{ openApply, closeApply }}>
      {children}

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 pt-[max(1rem,10vh)] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
        >
          <button
            type="button"
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={closeApply}
          />

          <div className="relative z-10 w-full max-w-4xl animate-fade-in-up">
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/30">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-violet/5 to-sky/5 px-6 py-5 md:px-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet/15 bg-violet-light/60 px-3 py-1">
                    <Sparkles className="h-3 w-3 text-violet" />
                    <span className="text-[10px] font-bold tracking-[0.16em] text-violet uppercase">
                      {copy.eyebrow}
                    </span>
                  </div>
                  <h2 id="apply-modal-title" className="font-serif mt-3 text-2xl text-ink md:text-3xl">
                    {copy.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-ink-muted">{copy.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={closeApply}
                  className="rounded-xl p-2 text-ink-muted transition hover:bg-slate-100 hover:text-ink"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 border-b border-slate-100 px-6 py-3 md:px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => selectTab(tab.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                      activeTab === tab.id
                        ? "bg-ink text-white shadow-md"
                        : "text-ink-muted hover:bg-slate-100 hover:text-ink"
                    }`}
                  >
                    {tab.short}
                  </button>
                ))}
              </div>

              <div className="grid max-h-[min(70vh,720px)] overflow-y-auto lg:grid-cols-5">
                <div className="hidden border-r border-slate-100 bg-slate-50/80 p-6 lg:col-span-2 lg:block">
                  <ul className="space-y-3">
                    {copy.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink-muted">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet/10">
                          <Check className="h-3 w-3 text-violet" />
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 md:p-8 lg:col-span-3">
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl icon-box-violet text-white">
                        <Check className="h-8 w-8" />
                      </div>
                      <h3 className="font-serif mt-6 text-2xl text-ink">Thank you!</h3>
                      <p className="mt-2 max-w-sm text-sm text-ink-muted">
                        We received your submission and will reach out within 2 business days.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={resetForm}
                          className="text-sm font-bold text-violet hover:text-violet-dark"
                        >
                          Submit another
                        </button>
                        <button
                          type="button"
                          onClick={closeApply}
                          className="rounded-full bg-slate-100 px-5 py-2 text-sm font-bold text-ink hover:bg-slate-200"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : activeTab === "instructor" ? (
                    <form onSubmit={handleInstructorSubmit} noValidate className="space-y-5">
                      {status === "error" ? (
                        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                          {errorMessage}
                        </p>
                      ) : null}
                      <Field id="instructor-kind" label="I am applying as" required>
                        <FormSelect
                          id="instructor-kind"
                          required
                          value={instructor.instructorKind}
                          onChange={(v) =>
                            setInstructor({ ...instructor, instructorKind: v })
                          }
                          options={instructorKindOptions}
                        />
                      </Field>
                      {instructor.instructorKind === "institution" ? (
                        <Field id="partnership-type" label="Partnership interest" required>
                          <FormSelect
                            id="partnership-type"
                            required
                            placeholder="Select type"
                            value={instructor.partnershipType}
                            onChange={(v) =>
                              setInstructor({ ...instructor, partnershipType: v })
                            }
                            options={partnershipTypeOptions.map((opt) => ({
                              value: opt,
                              label: opt,
                            }))}
                          />
                        </Field>
                      ) : null}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="instructor-name" label="Full name" required>
                          <input
                            id="instructor-name"
                            required
                            value={instructor.name}
                            onChange={(e) => setInstructor({ ...instructor, name: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                        <Field id="instructor-email" label="Email" required>
                          <input
                            id="instructor-email"
                            type="email"
                            required
                            value={instructor.email}
                            onChange={(e) => setInstructor({ ...instructor, email: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="instructor-company" label="Company / institution">
                          <input
                            id="instructor-company"
                            value={instructor.company}
                            onChange={(e) =>
                              setInstructor({ ...instructor, company: e.target.value })
                            }
                            className={inputClass}
                          />
                        </Field>
                        <Field id="instructor-linkedin" label="LinkedIn URL">
                          <input
                            id="instructor-linkedin"
                            type="url"
                            value={instructor.linkedin}
                            onChange={(e) =>
                              setInstructor({ ...instructor, linkedin: e.target.value })
                            }
                            className={inputClass}
                            placeholder="https://linkedin.com/in/..."
                          />
                        </Field>
                      </div>
                      <Field id="instructor-expertise" label="Area of expertise" required>
                        <FormSelect
                          id="instructor-expertise"
                          required
                          placeholder="Select course"
                          value={instructor.expertise}
                          onChange={(v) => setInstructor({ ...instructor, expertise: v })}
                          options={courseTopicOptions.map((opt) => ({
                            value: opt,
                            label: opt,
                          }))}
                        />
                      </Field>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="instructor-format" label="Preferred format" required>
                          <FormSelect
                            id="instructor-format"
                            required
                            placeholder="Select format"
                            value={instructor.format}
                            onChange={(v) => setInstructor({ ...instructor, format: v })}
                            options={formatOptions.map((opt) => ({
                              value: opt,
                              label: opt,
                            }))}
                          />
                        </Field>
                        <Field id="instructor-experience" label="Years of experience" required>
                          <FormSelect
                            id="instructor-experience"
                            required
                            placeholder="Select range"
                            value={instructor.experience}
                            onChange={(v) => setInstructor({ ...instructor, experience: v })}
                            options={experienceOptions.map((opt) => ({
                              value: opt,
                              label: opt,
                            }))}
                          />
                        </Field>
                      </div>
                      <Field id="instructor-audience" label="Target audience" required>
                        <FormSelect
                          id="instructor-audience"
                          required
                          placeholder="Select audience"
                          value={instructor.audience}
                          onChange={(v) => setInstructor({ ...instructor, audience: v })}
                          options={audienceOptions.map((opt) => ({
                            value: opt,
                            label: opt,
                          }))}
                        />
                      </Field>
                      <Field id="instructor-message" label="Tell us about your expertise" required>
                        <textarea
                          id="instructor-message"
                          required
                          rows={4}
                          value={instructor.message}
                          onChange={(e) =>
                            setInstructor({ ...instructor, message: e.target.value })
                          }
                          className={`${inputClass} resize-none`}
                        />
                      </Field>
                      {instructor.outsideLifeSciences ? (
                        <p className="rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-900">
                          Applying for a topic outside our current course catalog —
                          we&apos;ll review your proposal for future offerings.
                        </p>
                      ) : null}
                      <SubmitButton status={status} label="Submit instructor application" />
                    </form>
                  ) : (
                    <form onSubmit={handleSuggestionSubmit} noValidate className="space-y-5">
                      {status === "error" ? (
                        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                          {errorMessage}
                        </p>
                      ) : null}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="suggest-name" label="Full name" required>
                          <input
                            id="suggest-name"
                            required
                            value={suggestion.name}
                            onChange={(e) => setSuggestion({ ...suggestion, name: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                        <Field id="suggest-email" label="Email" required>
                          <input
                            id="suggest-email"
                            type="email"
                            required
                            value={suggestion.email}
                            onChange={(e) => setSuggestion({ ...suggestion, email: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field id="suggest-company" label="Organization (optional)">
                        <input
                          id="suggest-company"
                          value={suggestion.company}
                          onChange={(e) =>
                            setSuggestion({ ...suggestion, company: e.target.value })
                          }
                          className={inputClass}
                        />
                      </Field>
                      <Field id="suggest-title" label="What would you like to teach?" required>
                        <input
                          id="suggest-title"
                          required
                          value={suggestion.proposedTitle}
                          onChange={(e) =>
                            setSuggestion({ ...suggestion, proposedTitle: e.target.value })
                          }
                          className={inputClass}
                          placeholder="e.g. Advanced PV Signal Detection"
                        />
                      </Field>
                      <SubmitButton status={status} label="Submit course proposal" />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </ApplyModalContext.Provider>
  );
}
