export interface ExperienceEntry {
  company: string;
  title: string;
  dates: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "{{COMPANY_1}}",
    title: "{{TITLE_1}}",
    dates: "{{DATES_1}}",
    bullets: [
      "{{BULLET_1_1}}",
      "{{BULLET_1_2}}",
      "{{BULLET_1_3}}",
    ],
  },
  {
    company: "{{COMPANY_2}}",
    title: "{{TITLE_2}}",
    dates: "{{DATES_2}}",
    bullets: [
      "{{BULLET_2_1}}",
      "{{BULLET_2_2}}",
    ],
  },
];
