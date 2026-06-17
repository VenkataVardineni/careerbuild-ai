export type ApplyTab = "instructor" | "course-suggestion";

export type ApplyParams = {
  topic?: string;
  kind?: string;
  outside?: boolean;
};

export function tabFromHash(hash: string): ApplyTab | null {
  const h = hash.replace(/^#/, "");
  if (h === "apply-instructor" || h === "apply") return "instructor";
  if (h === "apply-suggest" || h === "apply-suggestion") return "course-suggestion";
  return null;
}

export function hashForTab(tab: ApplyTab): string {
  if (tab === "course-suggestion") return "#apply-suggest";
  return "#apply-instructor";
}

export const CAREERBUILD_URL =
  process.env.NEXT_PUBLIC_CAREERBUILD_URL ||
  "https://careerbuild-ai-frontend-d63psuqakq-uc.a.run.app";

export const instructorKindOptions = [
  { value: "individual", label: "Individual subject-matter expert" },
  { value: "institution", label: "School, college, or training provider" },
];

export const partnershipTypeOptions = [
  "Co-publish a course on our platform",
  "White-label / license our platform",
  "Corporate training for my organization",
  "Not sure yet — let's discuss",
];

export type InstructorFormState = {
  name: string;
  email: string;
  company: string;
  linkedin: string;
  instructorKind: string;
  partnershipType: string;
  expertise: string;
  format: string;
  experience: string;
  audience: string;
  message: string;
  outsideLifeSciences: boolean;
};

export type CourseSuggestionFormState = {
  name: string;
  email: string;
  company: string;
  proposedTitle: string;
};

export const emptyInstructorForm = (): InstructorFormState => ({
  name: "",
  email: "",
  company: "",
  linkedin: "",
  instructorKind: "individual",
  partnershipType: "",
  expertise: "",
  format: "",
  experience: "",
  audience: "",
  message: "",
  outsideLifeSciences: false,
});

export const emptyCourseSuggestionForm = (): CourseSuggestionFormState => ({
  name: "",
  email: "",
  company: "",
  proposedTitle: "",
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInstructorForm(data: InstructorFormState): string | null {
  if (!data.name.trim()) return "Please enter your full name.";
  if (!data.email.trim()) return "Please enter your email.";
  if (!EMAIL_RE.test(data.email.trim())) return "Please enter a valid email address.";
  if (!data.expertise.trim()) return "Please select a course.";
  if (!data.format.trim()) return "Please select a preferred format.";
  if (!data.experience.trim()) return "Please select your years of experience.";
  if (!data.audience.trim()) return "Please select a target audience.";
  if (!data.message.trim()) return "Please tell us about your expertise.";
  if (data.instructorKind === "institution" && !data.partnershipType.trim()) {
    return "Please select a partnership interest.";
  }
  return null;
}

export function validateCourseSuggestionForm(
  data: CourseSuggestionFormState,
): string | null {
  if (!data.name.trim()) return "Please enter your full name.";
  if (!data.email.trim()) return "Please enter your email.";
  if (!EMAIL_RE.test(data.email.trim())) return "Please enter a valid email address.";
  if (!data.proposedTitle.trim()) return "Please tell us what you would like to teach.";
  return null;
}
