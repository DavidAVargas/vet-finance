import { CreditCard, Gauge, Medal, TriangleAlert, type LucideIcon } from "lucide-react";

/**
 * Public-facing summary of each course, shared by the homepage and /learn.
 * Section titles mirror the course pages under app/(courses)/courses — update both together.
 */
export type CatalogCourse = {
  title: string;
  icon: LucideIcon;
  desc: string;
  sections: string[];
  quizzes: number;
  tag?: string;
};

export const courseCatalog: CatalogCourse[] = [
  {
    title: "Credit Basics",
    icon: Gauge,
    desc: "Why credit matters, how your score is built, how to track it, and how to protect it from fraud.",
    sections: ["My Story", "Why Credit Matters", "How Credit Works", "Tracking Your Credit", "Protecting Your Credit"],
    quizzes: 4,
    tag: "Start here",
  },
  {
    title: "Credit Cards 101",
    icon: CreditCard,
    desc: "How cards really work, the power of points, and building a card stack that pays you back.",
    sections: ["My Credit Card Story", "How Credit Cards Work", "The Power of Points", "Building Your Card Stack"],
    quizzes: 3,
    tag: "After Credit Basics",
  },
  {
    title: "Debt Traps",
    icon: TriangleAlert,
    desc: "The car trap, medical debt, and student loans: how they catch people, and how to get out.",
    sections: ["The Car Trap", "Medical Debt", "Student Loans"],
    quizzes: 3,
  },
  {
    title: "Military Money",
    icon: Medal,
    desc: "Active duty pay, TSP and retirement, the VA home loan, education benefits, VA disability, and the hidden stuff.",
    sections: [
      "Active Duty Pay",
      "TSP & Retirement",
      "The VA Home Loan",
      "Education Benefits",
      "VA Disability & Healthcare",
      "The Hidden Stuff",
    ],
    quizzes: 0,
  },
];

export const PLAYBOOK_GUIDE_COUNT = 15;

export function courseMeta(course: CatalogCourse): string {
  const parts = [`${course.sections.length} sections`];
  parts.push(course.quizzes > 0 ? `${course.quizzes} quizzes` : "Self-paced");
  return parts.join(" · ");
}
