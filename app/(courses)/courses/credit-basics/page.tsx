"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  CheckCircle2,
  Circle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/DarkLightMode/theme-toggle";
import Link from "next/link";

// ─── Mock user ───────────────────────────────────────────────────────────────

const mockUser = { name: "David", rank: "Veteran" };

// ─── Course structure ────────────────────────────────────────────────────────
// noQuiz: true means completing all lessons auto-unlocks the next section

const SECTIONS = [
  {
    id: "my-story",
    title: "My Story",
    noQuiz: true,
    lessons: [
      { id: "my-story-1", title: "Why I Built This" },
      { id: "my-story-2", title: "Where I Was With Credit" },
      { id: "my-story-3", title: "What This Course Will Do For You" },
    ],
  },
  {
    id: "why-credit-matters",
    title: "Why Credit Matters",
    noQuiz: false,
    lessons: [
      { id: "wcm-1", title: "What Credit Unlocks" },
      { id: "wcm-2", title: "The Cost of Bad Credit" },
      { id: "wcm-3", title: "How Much Good Credit Saves You" },
      { id: "wcm-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "how-credit-works",
    title: "How Credit Works",
    noQuiz: false,
    lessons: [
      { id: "hcw-1", title: "What Is Credit?" },
      { id: "hcw-2", title: "The 5 Factors of Your Score" },
      { id: "hcw-3", title: "What Hurts Your Score" },
      { id: "hcw-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "tracking-your-credit",
    title: "Tracking Your Credit",
    noQuiz: false,
    lessons: [
      { id: "tyc-1", title: "Credit Karma — Useful but Not Perfect" },
      { id: "tyc-2", title: "The 3 Bureaus: Equifax, TransUnion, Experian" },
      { id: "tyc-3", title: "The Two Rules That Move Your Score" },
      { id: "tyc-4", title: "Your Credit Report — Pull It Free" },
      { id: "tyc-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "protecting-your-credit",
    title: "Protecting Your Credit",
    noQuiz: false,
    lessons: [
      { id: "pyc-1", title: "Freeze Your Credit — Do This Now" },
      { id: "pyc-2", title: "Why Good Credit Makes You a Target" },
      { id: "pyc-3", title: "If It Happens to You" },
      { id: "pyc-4", title: "Services & Habits That Keep You Safe" },
      { id: "pyc-quiz", title: "Quiz", isQuiz: true },
    ],
  },
];

// ─── Quiz component ──────────────────────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function QuizBlock({ sectionLabel, questions, onPass }: {
  sectionLabel: string;
  questions: QuizQuestion[];
  onPass?: () => void;
}) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  const allAnswered = questions.every((_, i) => selected[i] !== undefined);
  const score = questions.filter((q, i) => selected[i] === q.correct).length;

  const handleSubmit = () => {
    const didPass = score >= Math.ceil(questions.length * 0.67);
    setSubmitted(true);
    setPassed(didPass);
    if (didPass) onPass?.();
  };

  const handleRetry = () => {
    setSelected({});
    setSubmitted(false);
    setPassed(false);
  };

  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {sectionLabel} · Quiz
      </p>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Knowledge Check
      </h1>
      <p className="mb-8 text-base text-muted-foreground">
        Answer all questions to unlock the next section. You need 2 out of 3 to pass.
      </p>

      <div className="flex flex-col gap-8">
        {questions.map((q, qi) => {
          const isAnswered = selected[qi] !== undefined;
          const isCorrect = submitted && selected[qi] === q.correct;
          const isWrong = submitted && isAnswered && selected[qi] !== q.correct;

          return (
            <div key={qi}>
              <p className="mb-3 font-semibold text-foreground">
                <span className="mr-2 font-mono text-xs text-muted-foreground/60">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi;
                  const isCorrectOption = submitted && oi === q.correct;
                  const isWrongSelected = submitted && isSelected && oi !== q.correct;

                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => !submitted && setSelected((prev) => ({ ...prev, [qi]: oi }))}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                        isCorrectOption
                          ? "border-green-500 bg-green-500/10 text-foreground"
                          : isWrongSelected
                          ? "border-red-400 bg-red-400/10 text-foreground"
                          : isSelected
                          ? "border-foreground bg-muted text-foreground"
                          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                      } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                        isCorrectOption
                          ? "border-green-500 bg-green-500 text-white"
                          : isWrongSelected
                          ? "border-red-400 bg-red-400 text-white"
                          : isSelected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border"
                      }`}>
                        {isCorrectOption ? "✓" : isWrongSelected ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`mt-3 rounded-lg px-3 py-2 text-sm ${isCorrect ? "bg-green-500/10 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {submitted ? (
        <div className={`mt-8 rounded-xl border p-5 text-center ${passed ? "border-green-500 bg-green-500/10" : "border-border bg-muted/30"}`}>
          {passed ? (
            <>
              <p className="text-lg font-bold text-foreground">You passed! {score}/{questions.length} correct.</p>
              <p className="mt-1 text-sm text-muted-foreground">The next section is now unlocked.</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-foreground">{score}/{questions.length} correct — not quite.</p>
              <p className="mt-1 mb-4 text-sm text-muted-foreground">Review the lessons above and try again.</p>
              <Button size="sm" variant="outline" onClick={handleRetry}>Try Again</Button>
            </>
          )}
        </div>
      ) : (
        <Button
          className="mt-8"
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          Submit Answers
        </Button>
      )}
    </div>
  );
}

// ─── Lesson content ──────────────────────────────────────────────────────────

function LessonContent({ lessonId, onQuizPass }: { lessonId: string; onQuizPass?: () => void }) {
  switch (lessonId) {
    case "my-story-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Story · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Why I Built This
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            After learning about credit, I honestly can&apos;t stop talking about it.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            When I meet new people, one of the first things I ask is what kind
            of credit cards they have. I know, a little personal. But you&apos;d
            be surprised how many people actually answer.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            And it gets me every time. Most people say they don&apos;t have a credit
            card at all. I&apos;m talking about people from their early 20s to all the way
            to their late 40s. Or they&apos;ll say they only have one. Some even say
            they&apos;re too scared to get one, which I understand. Nobody wants to
            make the wrong decision and end up in debt. That&apos;s probably
            everyone&apos;s biggest fear when it comes to credit cards. But it still
            bothers me, not in a judgmental way, because I know what that
            difference has meant in my own life.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            It feels like knowing a secret that could actually help someone and
            just keeping it to yourself. So I started doing something about it.
            I began trying to help the people I met who seemed like they needed
            it. Friends, family, coworkers. Some listened, some didn&apos;t. There
            are people I sat down with one on one, answered every question, no
            judgment, and they still never went and got a credit card. That&apos;s
            their call. But for the ones who did follow through, about 10 people
            total, they got their credit cards, they started using them the right
            way, and their credit scores went up. Most of them were friends and
            coworkers. And I&apos;m genuinely proud of that.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The issue was I kept having to repeat myself. Every new person, same
            conversation from the start. It started getting a little tedious. I
            thought about putting it all into a Google Slides presentation so I
            could just send it over. Then I figured, why not just build a website
            and do this properly.
          </p>

          <p className="mb-5 text-base font-medium leading-relaxed text-foreground">
            And that&apos;s when I started thinking bigger.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I started thinking about veterans. People who gave everything for
            this country and somehow end up without a home. I&apos;m not 100% sure
            of every reason that happens, but I have a strong feeling that
            financial literacy, or the lack of it, plays a bigger role than most
            people realize. When you go from a world where everything is handled
            for you to suddenly managing rent, credit, and bills on your own, it
            can feel impossible. And nobody really teaches you how.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            There&apos;s no shortage of information out there. YouTube, Google,
            podcasts. It&apos;s everywhere. But it&apos;s scattered, overwhelming, and
            most of it isn&apos;t built for someone starting from zero.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            That&apos;s why this platform is free specifically for veterans. They
            gave everything for us and they deserve real help. None of them
            should be homeless. I think most people would agree with that.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            This isn&apos;t going to happen overnight. It takes work. But
            you&apos;re already here, and that&apos;s the first step.
          </p>
        </div>
      );

    case "my-story-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Story · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Where I Was With Credit
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Just like most people, I had one credit card for years. A Chase bank
            card and a store credit card from a mall. And just like most people,
            I was scared to use them. I&apos;d use them here and there and pay them
            off right away. Never really let a balance sit. For years I basically
            pretended they didn&apos;t exist.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Then one year things got rough. My mom got into a car accident.
            Thank God she was okay, but her car wasn&apos;t. She needed it to get
            to work, so I did what I had to do.
          </p>

          <div
            className="mb-6 rounded-r-lg bg-muted/40 p-5"
            style={{ borderLeft: "2px solid var(--brand-600)" }}
          >
            <p className="italic leading-relaxed text-muted-foreground">
              I put $8,000 on my credit cards to help fix her car. My
              Apple Card was maxed out at $5,000 and my Chase card was maxed
              out at $3,000. Both completely maxed. And I had no idea what I
              was doing.
            </p>
          </div>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I tried doing the right thing. I paid what I could every month. But
            I didn&apos;t understand how interest worked. No matter what I paid, it
            felt like the balance barely moved. The interest kept canceling out
            whatever I was putting in. It was like running on a treadmill.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            My credit score dropped. The lowest I remember seeing it was 530.
            Before all of this I was around 630, which I always knew wasn&apos;t
            amazing but felt okay. Seeing 530 was different. I knew that if I
            didn&apos;t change something fast, it could easily keep going down into
            the 400s or lower. That&apos;s when I decided I was done guessing and
            started actually learning.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I didn&apos;t let it go to collections. Instead I worked two full-time
            jobs, 80 hours a week, every week, for almost a year. And I was
            doing this completely alone. I was living in a different state, far
            from home, nobody around if things went bad. I still had to pay
            rent every month. Still had to buy groceries. Still had to handle
            everything that comes with living on your own, on top of trying to
            dig out of $8,000 worth of maxed out cards. That&apos;s why I got the
            second job. There was no other option.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            It was really hard. But it was worth every bit of it. I had one
            goal the entire time and I kept my eyes on it: the Chase Sapphire
            Reserve. I always wanted to travel, and I knew it was one of the
            best travel cards out there. I didn&apos;t fully understand everything
            about it at the time. I just knew I wanted it, and I knew I had to
            fix my credit to ever have a shot at getting approved.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Once I paid everything off, I waited about three months and applied.
            I got approved. For those who don&apos;t know it, the Chase Sapphire
            Reserve is Chase&apos;s top-tier card. It&apos;s a travel card but really
            it&apos;s a lifestyle card. The perks and benefits are a different
            level. And now that I actually understand it, I can tell you it&apos;s
            pointless to travel without some kind of travel card. We&apos;ll get
            into all of that in the Credit Cards 101 course.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Getting to where I am now took about two to three years of real
            effort. Reading books, listening to podcasts, learning by actually
            doing it. I&apos;m not saying I know everything. But I can tell you that
            if you do the right things consistently, the results show up. I&apos;ve
            been at 530. I know what that feels like. And I know it&apos;s not
            permanent.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            If I can do it, you can do it. It just takes some effort. And it
            helps a lot to have a goal, something you actually want, so you can
            keep your eyes on the prize when it gets hard. We&apos;ll talk more
            about that as we go.
          </p>
        </div>
      );

    case "my-story-3":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Story · Lesson 3
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What This Course Will Do For You
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Let me be clear about something before we go any further.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            This course is not going to fix your situation overnight. You
            already know that from my story. It doesn&apos;t work that way. It
            takes time, it takes effort, and it takes actually doing the work.
            But I can tell you from experience that it is worth every bit of it.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Everyone&apos;s situation is different. Hopefully you&apos;re not sitting on
            $50K or more in debt, but even if you are, I can at least give you
            a blueprint, a direction, somewhere to start. For those of you
            closer to where I was, maybe $20K and under, or maybe you just
            don&apos;t fully understand credit yet, or you&apos;re too scared to even use
            your credit card, this course is going to help you. That I&apos;m
            confident about.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The goal is to help you understand how credit works, why it matters,
            and how credit cards can work for you instead of against you. This
            stuff touches more of your life than most people realize. Rent
            applications, car loans, financing anything for your future. And for
            the younger people out there, in your 20s or late 30s still trying
            to figure it out, the sooner you get this right, the better your
            life looks on the other side.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            I&apos;m writing this in 2026. A lot of people are saying the economy is
            rough right now and they&apos;re not wrong. But honestly, because of what
            I know and how I move now, especially with how I use my credit cards,
            I don&apos;t feel it the same way I would have before. Not trying to brag.
            I&apos;m just saying that when you understand this stuff, you build a
            foundation that doesn&apos;t crumble as easily. I could never go back to
            being knocked down to where I was. Not because nothing bad can
            happen, but because I know how to handle it now. If I ever took a
            hit, it wouldn&apos;t go that low again. That&apos;s what I want for you.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            No fluff. No filler. Just exactly what you need to know to get
            started and build from there. If you want to go harder after this,
            dig deeper, read more, learn more on your own, I encourage that.
            I&apos;m still learning things myself every day. That&apos;s just how it is.
            It&apos;s part of being an adult. It&apos;s honestly a lifestyle. Once you
            get into it, you won&apos;t want to stop.
          </p>

          <p className="text-base font-medium leading-relaxed text-foreground">
            Alright. Let&apos;s get into it.
          </p>
        </div>
      );

    case "wcm-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Why Credit Matters · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What Credit Unlocks
          </h1>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "Split image, left side a person happily receiving apartment keys, car keys, and house keys on a clean minimal background, right side the same person facing closed doors with a red denied stamp, flat modern illustration style, no text" */}
          <div className="mb-8 flex h-48 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: What credit unlocks vs. what bad credit closes ]</p>
          </div>

          <div
            className="mb-8 rounded-r-lg bg-muted/40 p-5"
            style={{ borderLeft: "2px solid var(--brand-600)" }}
          >
            <p className="text-base font-medium leading-relaxed text-foreground">
              &ldquo;It&apos;s better to be broke and have good credit than to have
              $1 million in cash and bad credit.&rdquo;
            </p>
          </div>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            That might sound extreme, but think about it. Cash runs out. A
            credit score stays with you and gives you access to other
            people&apos;s money at low rates. Good credit is a tool that keeps
            working. Bad credit is a wall that follows you everywhere you go.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Most people think of credit as something you only need when you
            want a credit card. That&apos;s not even close to the full picture.
            Your credit score shows up in almost every major financial decision
            you&apos;ll ever make.
          </p>

          <p className="mb-3 text-base font-semibold text-foreground">Here&apos;s what credit actually unlocks:</p>

          <div className="mb-6 flex flex-col gap-4">
            {[
              { title: "Renting an apartment", body: "This is the first wall most people hit. Landlords pull your credit before they even consider your application. Most markets require a score of 620 or higher. Below that and you get denied outright, or they ask for a larger security deposit just to trust you." },
              { title: "Buying a car", body: "Almost everyone finances a car. Your credit score determines your interest rate, and that rate changes your monthly payment by hundreds of dollars. Same car, two different people, two completely different deals." },
              { title: "Buying a house", body: "The biggest one. Your mortgage rate is almost entirely based on your credit score. The difference between a good score and a bad score on a $300K home can cost you over $200,000 more over 30 years. We'll show you the exact numbers in lesson 3." },
              { title: "Phone plans", body: "Carriers check your credit when you finance a device. Bad credit can mean higher deposits or getting locked out of certain plans." },
              { title: "Some jobs", body: "Employers in finance, government, and security sometimes run credit checks as part of their hiring process. It doesn't happen everywhere, but it happens." },
              { title: "The best credit cards", body: "The cards with the best rewards, travel benefits, and perks require good credit to get approved. Building your credit is literally the price of admission." },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="mb-1 font-semibold text-foreground">{title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            The pattern is always the same. Good credit opens doors. Bad credit
            either closes them or makes you pay more to get through them. The
            sooner you take this seriously, the better every single one of these
            situations goes for you.
          </p>
        </div>
      );

    case "wcm-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Why Credit Matters · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The Cost of Bad Credit
          </h1>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "Two people at a car dealership, both looking at the same car, one holding a paper showing a low monthly payment with a happy expression, the other holding a paper showing a much higher monthly payment looking stressed, clean flat illustration style, no text" */}
          <div className="mb-8 flex h-48 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: Same car, two completely different payments ]</p>
          </div>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Bad credit doesn&apos;t just mean you get denied sometimes. It means
            you pay more for everything, usually for years. Most people don&apos;t
            realize how much it&apos;s actually costing them because the extra
            money comes out slowly in monthly payments, not all at once.
          </p>

          <p className="mb-3 text-base font-semibold text-foreground">Higher interest rates on everything</p>
          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Every loan you take out, car, home, personal, comes with an
            interest rate. That rate is determined almost entirely by your
            credit score. A lower score means a higher rate. A higher rate
            means more money out of your pocket every single month, for the
            entire life of the loan.
          </p>

          <p className="mb-3 text-base font-semibold text-foreground">Bigger security deposits</p>
          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Landlords who accept applicants with lower credit scores usually
            require two to three months of rent upfront as a deposit. If
            rent is $1,500 a month, that&apos;s $3,000 to $4,500 you need in
            cash before you can even move in, on top of first month&apos;s rent.
            That&apos;s money most people don&apos;t have sitting around.
          </p>

          <p className="mb-3 text-base font-semibold text-foreground">Predatory lending</p>
          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            This is the dangerous one. When people with bad credit get
            desperate and can&apos;t get approved for a normal loan, they turn to
            payday loans and title loans. These come with interest rates of
            200% to 400%. You borrow $500 and you can end up owing $1,500.
            People get trapped in these cycles and can&apos;t get out. This is not
            a solution. It makes everything worse.
          </p>

          <p className="mb-3 text-base font-semibold text-foreground">The real trap</p>
          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Here&apos;s what makes bad credit so hard to escape. People with bad
            credit pay more for the same things. That extra money is gone
            every month before they can save anything. Because they can&apos;t
            save, they can&apos;t build a cushion. Because they have no cushion,
            the next unexpected expense goes right back on high-interest debt.
            It&apos;s a cycle, and it&apos;s designed to be hard to break out of.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            Understanding this is why the work is worth it. Every point you
            add to your credit score is money back in your pocket, not just
            once, but every month for years. That adds up to a number that
            will genuinely surprise you in the next lesson.
          </p>
        </div>
      );

    case "wcm-3":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Why Credit Matters · Lesson 3
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            How Much Good Credit Saves You
          </h1>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "Two identical houses side by side, one with a price tag showing $682,000 total paid and a green checkmark, one with a price tag showing $908,000 total paid and a red marker, clean minimal infographic style illustration, no people, no text besides the numbers" */}
          <div className="mb-8 flex h-48 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: Same house, $226,000 difference in lifetime cost ]</p>
          </div>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Let&apos;s talk real numbers. This is where it stops being abstract
            and starts being the kind of thing you can&apos;t unsee.
          </p>

          <p className="mb-4 text-base font-semibold text-foreground">Buying a home — $300,000 mortgage, 30 years</p>
          <div className="mb-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Credit Score</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Monthly Payment</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Total Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-green-600">750+</td>
                  <td className="px-4 py-3 text-muted-foreground">~6.5%</td>
                  <td className="px-4 py-3 text-muted-foreground">~$1,896</td>
                  <td className="px-4 py-3 font-medium text-foreground">~$682,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-red-500">580</td>
                  <td className="px-4 py-3 text-muted-foreground">~9.5%</td>
                  <td className="px-4 py-3 text-muted-foreground">~$2,522</td>
                  <td className="px-4 py-3 font-medium text-foreground">~$908,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-8 rounded-lg bg-muted/40 px-4 py-3 text-sm font-medium text-foreground">
            That&apos;s a $226,000 difference on the exact same house. Not a bigger house. Not a better neighborhood. The same house.
          </p>

          <p className="mb-4 text-base font-semibold text-foreground">Buying a car — $30,000 loan, 5 years</p>
          <div className="mb-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Credit Score</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Rate</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Monthly Payment</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Total Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-green-600">750+</td>
                  <td className="px-4 py-3 text-muted-foreground">~5%</td>
                  <td className="px-4 py-3 text-muted-foreground">~$566</td>
                  <td className="px-4 py-3 font-medium text-foreground">~$3,968</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-red-500">580</td>
                  <td className="px-4 py-3 text-muted-foreground">~15%</td>
                  <td className="px-4 py-3 text-muted-foreground">~$714</td>
                  <td className="px-4 py-3 font-medium text-foreground">~$12,848</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-8 rounded-lg bg-muted/40 px-4 py-3 text-sm font-medium text-foreground">
            About $9,000 more in interest on the same car. That&apos;s a vacation. That&apos;s an emergency fund. That&apos;s money gone.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Add those up across a lifetime and good credit saves you well into
            the hundreds of thousands of dollars. That&apos;s not an exaggeration.
            That&apos;s just math.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            And this doesn&apos;t even count the credit card rewards, the travel
            benefits, the annual fee waivers for military members, or the
            simple fact that having good credit means you never have to take a
            bad deal because you had no other option. You always have leverage.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            Now you know why this matters. In the next section we&apos;re going to
            get into exactly how credit works so you understand what actually
            moves your score and what doesn&apos;t.
          </p>
        </div>
      );

    case "wcm-quiz":
      return (
        <QuizBlock
          sectionLabel="Why Credit Matters"
          onPass={onQuizPass}
          questions={[
            {
              question: "Which of the following does your credit score affect?",
              options: [
                "Renting an apartment",
                "Getting a car loan",
                "Your mortgage rate",
                "All of the above",
              ],
              correct: 3,
              explanation: "Your credit score affects all of these. Landlords, lenders, and banks all use it to decide if they'll work with you and at what rate.",
            },
            {
              question: "Two people buy the same $300,000 home. One has a 750 credit score, the other has a 580. Over 30 years, roughly how much more does the person with the lower score pay?",
              options: [
                "About $10,000 more",
                "About $50,000 more",
                "Over $200,000 more",
                "They pay the same — the house price is the same",
              ],
              correct: 2,
              explanation: "The difference in interest rates between a 750 and 580 score adds up to over $226,000 on a $300K mortgage over 30 years. Same house, completely different total cost.",
            },
            {
              question: "What is the main danger of payday loans for people with bad credit?",
              options: [
                "They require a credit score above 700 to qualify",
                "They have extremely high interest rates that trap borrowers in debt",
                "They only work for purchases over $5,000",
                "They have no impact on your credit score",
              ],
              correct: 1,
              explanation: "Payday and title loans can carry 200–400% APR. Borrow $500 and you can end up owing $1,500. They're designed to be hard to escape.",
            },
          ]}
        />
      );

    case "hcw-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How Credit Works · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What Is Credit?
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            At its core, credit is a trust system. When you borrow money —
            whether it&apos;s on a credit card, a car loan, or a mortgage — the
            lender is betting that you&apos;ll pay them back. Your credit score is
            just a number that summarizes how trustworthy you&apos;ve been with
            borrowed money so far. The higher the number, the more lenders
            trust you, and the better the deals they offer you.
          </p>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            The scale runs from 300 to 850. Nobody starts with a perfect score
            and nobody starts at zero. Most people with no credit history at
            all simply don&apos;t have a score yet, which is its own challenge but
            a different one than having bad credit.
          </p>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "A clean horizontal gauge or meter showing credit score range from 300 to 850, divided into color zones from red (300-579 Poor) to orange (580-669 Fair) to yellow (670-739 Good) to light green (740-799 Very Good) to dark green (800-850 Exceptional), minimal flat design, no people" */}
          <div className="mb-8 flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: Credit score scale 300–850 with tiers ]</p>
          </div>

          <p className="mb-4 text-base font-semibold text-foreground">Here&apos;s how the tiers break down:</p>
          <div className="mb-8 overflow-hidden rounded-xl border border-border">
            {[
              { range: "800 – 850", label: "Exceptional", color: "text-green-600", desc: "Best rates on everything. Lenders compete for you." },
              { range: "740 – 799", label: "Very Good", color: "text-green-500", desc: "Close to the best rates. This is the real target." },
              { range: "670 – 739", label: "Good", color: "text-yellow-500", desc: "Approved for most things, not always the best rate." },
              { range: "580 – 669", label: "Fair", color: "text-orange-500", desc: "Getting approved is harder. Rates start climbing." },
              { range: "300 – 579", label: "Poor", color: "text-red-500", desc: "Most lenders will decline or require a co-signer." },
            ].map(({ range, label, color, desc }) => (
              <div key={label} className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0">
                <div className="w-24 shrink-0 font-mono text-sm text-muted-foreground">{range}</div>
                <div className={`w-24 shrink-0 font-semibold ${color}`}>{label}</div>
                <div className="text-sm text-muted-foreground">{desc}</div>
              </div>
            ))}
          </div>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            One thing worth knowing: there are two main scoring models. FICO
            is the one most lenders actually use when you apply for a loan or
            credit card. VantageScore is what Credit Karma shows you. They&apos;re
            calculated differently, which is why your Credit Karma score and
            your actual score with a bank can be different. We&apos;ll cover that
            more in the Tracking Your Credit section.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            For now, the target is 740 and above. That&apos;s where the best rates
            start and where you want to be. Everything in this section explains
            exactly what gets you there.
          </p>
        </div>
      );

    case "hcw-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How Credit Works · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The 5 Factors of Your Score
          </h1>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Your credit score isn&apos;t random. It&apos;s calculated from five specific
            factors, each with a different weight. Once you know what they are
            and how much each one counts, you can make decisions that actually
            move the number instead of guessing.
          </p>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "A clean pie chart showing 5 segments: Payment History 35%, Credit Utilization 30%, Credit Age 15%, Hard Inquiries 10%, Total Accounts 10%, each segment a different muted color, minimal flat style, labeled clearly, no people, white background" */}
          <div className="mb-8 flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: Pie chart — 5 factors and their weights ]</p>
          </div>

          <div className="mb-6 flex flex-col gap-5">
            {[
              {
                number: "01",
                factor: "Payment History",
                weight: "35%",
                body: "The single biggest factor. Do you pay on time? Even one payment that's 30 days late can drop a good score by 50 to 100 points. This is the most important habit you can build — pay on time, every time, no exceptions. Set up autopay if you have to.",
              },
              {
                number: "02",
                factor: "Credit Utilization",
                weight: "30%",
                body: "How much of your available credit are you using? If you have $10,000 in available credit and you're carrying a $3,000 balance, that's 30% utilization. The rule is stay under 30%, but ideally under 10% for the best impact. This is the one people mess up the most without realizing it.",
              },
              {
                number: "03",
                factor: "Credit Age",
                weight: "15%",
                body: "How long your accounts have been open. Older accounts help your score. This is why you should never close a credit card just because you don't use it — that card's age is working for you. Closing it removes that history and can drop your score.",
              },
              {
                number: "04",
                factor: "Hard Inquiries",
                weight: "10%",
                body: "Every time you apply for a new card or loan, the lender does a hard inquiry on your credit. That temporarily dips your score a few points. Hard inquiries stay on your report for 2 years and then get removed automatically. Opening several in a short window looks risky to lenders, so space out applications and don't apply for things you don't need.",
              },
              {
                number: "05",
                factor: "Total Accounts",
                weight: "10%",
                body: "Having different types of credit — credit cards, a car loan, a student loan — shows lenders you can handle various kinds of debt. It's the least impactful factor so don't go taking out loans just to improve your mix. But it does matter when everything else is equal.",
              },
            ].map(({ number, factor, weight, body }) => (
              <div key={number} className="rounded-xl border border-border p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground/50">{number}</span>
                  <span className="font-semibold text-foreground">{factor}</span>
                  <span className="ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold text-white" style={{ background: "var(--brand-600)" }}>
                    {weight}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-4">
            <div className="rounded-xl border-2 border-border p-5" style={{ borderColor: "var(--brand-600)" }}>
              <p className="mb-2 font-bold text-foreground">Rule #1 — Use your credit card like a debit card</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Never spend money you don&apos;t already have. If you were going to
                buy it anyway and the money is sitting in your account, put it
                on the card — then pay it off. That&apos;s it. You&apos;ll never miss a
                payment because you already had the money. This one habit alone
                will keep your score clean.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <p className="mb-2 font-bold text-foreground">Always pay on time — at minimum, the minimum</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Pay the full balance every month if you can. If you can&apos;t, pay
                the statement minimum without fail. That keeps your payment
                history clean and avoids late fees. Never let a due date pass
                without at least the minimum going through — set up autopay so
                it happens automatically no matter what.
              </p>
            </div>

            <div className="rounded-xl border border-border p-5">
              <p className="mb-2 font-bold text-foreground">Most people start with a $1,000 limit — $300 is already 30%</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                When you&apos;re starting out, your limit is probably $1,000. That
                means $300 in charges puts you right at 30% utilization. Pay it
                in full every month, or keep your balance under $300 at all
                times. Even better — keep it under $100 if you can. The lower
                your utilization, the faster your score climbs.
              </p>
            </div>
          </div>
        </div>
      );

    case "hcw-3":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How Credit Works · Lesson 3
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            What Hurts Your Score
          </h1>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Most credit damage is avoidable once you know what causes it. Some
            of these are obvious, some are counterintuitive. All of them are
            worth knowing before you make a move.
          </p>

          <div className="mb-8 flex flex-col gap-4">
            {[
              {
                title: "Late or missed payments",
                severity: "High impact",
                body: "One missed payment — even one — can drop your score significantly and stays on your report for seven years. It doesn't matter if it's $20 or $2,000. The late payment itself is what damages you. Set up autopay for at least the minimum payment on every card so this never happens accidentally.",
              },
              {
                title: "High credit utilization",
                severity: "High impact",
                body: "Maxing out your cards, even if you pay them off every month, can hurt your score if the balance is reported before you pay. The bureaus get a snapshot of your balance at a specific point in the month. Keep balances low or pay them down before your statement closes.",
              },
              {
                title: "Closing old accounts",
                severity: "Medium impact",
                body: "This one surprises people. Closing a card you don't use feels like the responsible thing to do, but it removes that card's age from your history and reduces your total available credit — which raises your utilization. Keep old accounts open, even if you just use them once a year to keep them active.",
              },
              {
                title: "Too many hard inquiries",
                severity: "Medium impact",
                body: "Every credit application triggers a hard pull. One or two a year is fine. Five in three months looks desperate to lenders and each one shaves points off your score. Be intentional about when and why you apply for new credit.",
              },
              {
                title: "Collections and derogatory marks",
                severity: "High impact",
                body: "If a debt goes unpaid long enough, it gets sent to a collection agency. That shows up on your report as a collection account and can drop your score by 100 points or more. Always better to negotiate a payment plan, even a small one, than to let something hit collections.",
              },
              {
                title: "No credit history at all",
                severity: "Medium impact",
                body: "Not having any credit isn't the same as bad credit but lenders see a blank file and have nothing to work with. You can't get approved for much without any history. The solution is starting with a secured card or a credit-builder loan — we'll cover that in a later section.",
              },
            ].map(({ title, severity, body }) => (
              <div key={title} className="rounded-xl border border-border p-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground">{title}</p>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    severity === "High impact"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-orange-500/10 text-orange-500"
                  }`}>
                    {severity}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            The good news is none of this is permanent. Every negative mark
            fades over time and your habits going forward matter more than
            what happened in the past. A 530 can become a 750. It just takes
            time and consistency. You already know that from my story.
          </p>
        </div>
      );

    case "hcw-quiz":
      return (
        <QuizBlock
          sectionLabel="How Credit Works"
          onPass={onQuizPass}
          questions={[
            {
              question: "What is the single biggest factor in your credit score?",
              options: [
                "Credit mix",
                "Length of credit history",
                "Payment history",
                "New credit",
              ],
              correct: 2,
              explanation: "Payment history makes up 35% of your score — the largest single factor. Paying on time, every time, is the most important habit you can build.",
            },
            {
              question: "You have $10,000 in available credit. To keep a healthy score, what's the most you should carry as a balance?",
              options: [
                "$5,000 (50%) — you're still under the limit",
                "$4,000 (40%) — close enough",
                "$3,000 (30%) — the standard guideline",
                "It doesn't matter as long as you pay on time",
              ],
              correct: 2,
              explanation: "Keep utilization under 30%, ideally under 10%. High balances relative to your limit signal risk to lenders, even if you always pay on time.",
            },
            {
              question: "You have a credit card you've had for 5 years but never use anymore. What should you do?",
              options: [
                "Close it — no point keeping a card you don't use",
                "Keep it open — closing it can hurt your score",
                "Max it out and pay it off to boost your score",
                "Transfer the balance to a newer card",
              ],
              correct: 1,
              explanation: "That card's 5 years of age is working for you. Closing it removes that history and reduces your available credit, which raises your utilization — both hurt your score.",
            },
          ]}
        />
      );

    case "tyc-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Tracking Your Credit · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Credit Karma — Useful but Not Perfect
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Credit Karma is the tool I use and the one I recommend starting
            with. It&apos;s free, it doesn&apos;t hurt your credit to check it, and it
            gives you a real-time look at where you stand. If you don&apos;t have an
            account, go create one right now. It takes five minutes.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Once you&apos;re in, you&apos;ll see your score — but there&apos;s one important
            thing to understand before you put too much weight on that number.
          </p>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">Credit Karma shows VantageScore — not FICO</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Most lenders use FICO when you actually apply for credit. Credit
              Karma uses VantageScore, which is a different model calculated
              differently. Your Credit Karma score and your bank&apos;s FICO score
              can be 10 to 30 points apart. Don&apos;t panic if you see a gap —
              that&apos;s normal. Use Credit Karma as a direction tracker, not the
              exact number you&apos;ll see on every application.
            </p>
          </div>

          <p className="mb-4 text-base font-semibold text-foreground">The 6 factors Credit Karma breaks down for you:</p>
          <div className="mb-8 flex flex-col gap-3">
            {[
              {
                label: "Payment History",
                body: "Do you pay on time? This is the biggest factor — 35% of your score. Credit Karma will show you if you have any missed or late payments on record.",
              },
              {
                label: "Credit Utilization",
                body: "How much of your available credit you're using across all your cards. The rule: stay under 30%. Under 10% is ideal. This updates every month as your balances change.",
              },
              {
                label: "Credit Age",
                body: "The average age of all your open accounts. Older is better. This is why you don't close cards you no longer use — their age is still helping you.",
              },
              {
                label: "Hard Inquiries",
                body: "Every time you applied for a new card or loan. Hard inquiries stay on your report for 2 years, but they only impact your score for about 12 months. Too many in a short window looks risky to lenders.",
              },
              {
                label: "Derogatory Marks",
                body: "Late payments, collections, bankruptcies — anything negative on your file. These do the most damage and can stay on your report for 7 years. If you see one you don't recognize, that needs to be disputed.",
              },
              {
                label: "Total Accounts",
                body: "The number of credit accounts you have open and your overall credit mix — cards, loans, auto, etc. Having a variety of account types over time helps, but this is the least impactful of the six.",
              },
            ].map(({ label, body }) => (
              <div key={label} className="rounded-xl border border-border p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">{label}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 rounded-xl p-5" style={{ background: "var(--brand-600)", opacity: 0.92 }}>
            <p className="mb-1 font-semibold text-white">The habit: check it once a month</p>
            <p className="text-sm leading-relaxed text-white/80">
              Checking your own credit is a soft pull — it never hurts your
              score. Set a reminder to check Credit Karma once a month. You&apos;re
              not obsessing over the number; you&apos;re making sure nothing changed
              that you didn&apos;t expect. Fraud and errors happen, and catching them
              early matters.
            </p>
          </div>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "Clean minimal screenshot mockup of a credit score app dashboard showing a circular score gauge at 712, with 6 factor bars below labeled Payment History, Credit Utilization, Credit Age, Hard Inquiries, Derogatory Marks, Total Accounts, flat UI design, muted green and white color scheme, no real logos" */}
          <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: Credit Karma dashboard mockup ]</p>
          </div>
        </div>
      );

    case "tyc-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Tracking Your Credit · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The 3 Bureaus: Equifax, TransUnion & Experian
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            There are three major credit bureaus in the US — Equifax,
            TransUnion, and Experian. They&apos;re separate companies that each
            collect and maintain their own credit files on you. Think of them
            as three independent scorekeepers tracking the same game.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Your score can be slightly different across all three. That&apos;s
            normal, and here&apos;s why.
          </p>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "Three clean minimal cards side by side labeled Equifax, TransUnion, and Experian, each with a different credit score number (e.g. 718, 724, 711), flat minimal design, muted colors, no real logos" */}
          <div className="mb-8 flex h-36 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: Three bureau score cards ]</p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">Not every lender reports to all three</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              When you open a credit card or take out a loan, that creditor
              chooses which bureau(s) they report your activity to. Some report
              to all three. Some only report to one or two. That means one
              bureau might have an account on file that another doesn&apos;t — which
              is exactly why your scores can differ between them.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-3">
            {[
              {
                bureau: "Equifax",
                note: "One of the two bureaus Credit Karma shows you.",
              },
              {
                bureau: "TransUnion",
                note: "The other bureau Credit Karma shows. Often the one with the most up-to-date account data.",
              },
              {
                bureau: "Experian",
                note: "Not shown on Credit Karma. Often the bureau mortgage lenders pull when you apply for a home loan. Worth checking separately.",
              },
            ].map(({ bureau, note }) => (
              <div key={bureau} className="flex items-start gap-4 rounded-xl border border-border p-4">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--brand-600)" }}
                >
                  {bureau[0]}
                </div>
                <div>
                  <p className="mb-0.5 font-semibold text-foreground">{bureau}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">Applying for a mortgage? They pull all three.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mortgage lenders typically pull your score from all three bureaus
              and use your middle score — not the highest, not the lowest. So
              if your scores are 710, 725, and 740, they use 725. That&apos;s
              another reason to make sure all three reports are clean and
              accurate before you apply for anything big.
            </p>
          </div>
        </div>
      );

    case "tyc-3":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Tracking Your Credit · Lesson 3
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            The Two Rules That Move Your Score
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            We covered the 5 factors in How Credit Works. This is where we
            slow down on the two that matter most — the ones you can actually
            control right now — and make sure they&apos;re clear before moving on.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            65% of your score comes down to just two things: whether you pay
            on time, and how much of your credit limit you&apos;re using.
            Everything else is important, but these two will either build your
            score or destroy it.
          </p>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "Two large stat cards side by side: left card shows '35%' with label 'Payment History', right card shows '30%' with label 'Credit Utilization', clean flat design, muted olive green accent color, minimal white background" */}
          <div className="mb-8 flex h-36 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: 35% payment history + 30% utilization cards ]</p>
          </div>

          <div className="mb-5 rounded-xl border border-border p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: "var(--brand-600)" }}>35%</span>
              <p className="text-lg font-bold text-foreground">Rule #1 — Pay on time, every time</p>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Payment history is the single biggest factor in your score. One
              missed payment — even one — can drop a good score by 50 to 100
              points and stays on your report for seven years. It doesn&apos;t
              matter if the balance was $20 or $2,000. The late payment itself
              is what does the damage.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The simplest fix: set up autopay for at least the minimum payment
              on every card and loan you have. Not the full balance if you
              can&apos;t swing it — just the minimum. That&apos;s all it takes to keep
              your payment history clean while you work on the rest.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ background: "var(--brand-600)" }}>30%</span>
              <p className="text-lg font-bold text-foreground">Rule #2 — Stay under 30%</p>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Credit utilization is how much of your available credit you&apos;re
              using. If your total credit limit across all your cards is
              $10,000 and you have $3,000 in balances, you&apos;re at 30%. That&apos;s
              the maximum you want to be carrying if you care about your score.
              Ideally you want to be under 10%.
            </p>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              This is the one that trips people up most. You can pay on time
              every single month and still tank your score if your cards are
              maxed out. The balance matters just as much as the payment.
            </p>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick example</p>
              <div className="flex flex-col gap-2">
                {[
                  { limit: "$10,000", balance: "$1,000", util: "10%", status: "Excellent", color: "text-green-500" },
                  { limit: "$10,000", balance: "$3,000", util: "30%", status: "OK — don't go higher", color: "text-yellow-500" },
                  { limit: "$10,000", balance: "$5,000", util: "50%", status: "Hurting your score", color: "text-orange-500" },
                  { limit: "$10,000", balance: "$9,000", util: "90%", status: "Serious damage", color: "text-red-500" },
                ].map(({ limit, balance, util, status, color }) => (
                  <div key={util} className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">{limit} limit · {balance} balance</span>
                    <span className="font-mono font-semibold text-foreground">{util}</span>
                    <span className={`text-right text-xs ${color}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            When you open Credit Karma and look at your score breakdown, these
            are the two numbers to watch first. If payment history is marked
            poor or utilization is above 30%, that&apos;s your starting point.
            Fix those two and everything else gets easier.
          </p>
        </div>
      );

    case "tyc-4":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Tracking Your Credit · Lesson 4
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Your Credit Report — and How to Pull It Free
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Your credit score is the number. Your credit report is the full
            story behind that number — every account you&apos;ve ever opened, every
            payment you&apos;ve made or missed, every time someone pulled your
            credit, and any negative marks that are on file.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Think of it this way: the report is your entire credit history
            written out. The score is just a number that summarizes it. Credit
            Karma gives you your score and a view of your accounts, but pulling
            your actual report gives you the full picture — and you need to
            look at it at least a few times a year.
          </p>

          <div className="mb-8 rounded-xl border-2 p-6 text-center" style={{ borderColor: "var(--brand-600)" }}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-600)" }}>The only official free report site</p>
            <p className="mb-3 text-xl font-bold text-foreground">annualcreditreport.com</p>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
              Federally authorized. Free reports from all three bureaus —
              Equifax, TransUnion, and Experian. You can pull them weekly at
              no cost. Not monthly, not annually — weekly. Use it.
            </p>
          </div>

          <p className="mb-4 text-base font-semibold text-foreground">When you pull your report, look for these:</p>
          <div className="mb-8 flex flex-col gap-3">
            {[
              {
                item: "Accounts you don't recognize",
                why: "If there's a credit card or loan in your name that you never opened, someone may have used your identity. Dispute it immediately.",
              },
              {
                item: "Late payments marked incorrectly",
                why: "Sometimes a payment that went through on time gets reported late by mistake. This is more common than you'd think and it's disputable.",
              },
              {
                item: "Old debts that should be gone",
                why: "Most negative items fall off your report after 7 years. If something older than that is still showing up, it shouldn't be there.",
              },
              {
                item: "Correct personal information",
                why: "Wrong addresses or misspelled names can indicate mixed files — where another person's credit history got attached to yours.",
              },
            ].map(({ item, why }) => (
              <div key={item} className="rounded-xl border border-border p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">{item}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{why}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">Found an error? You can dispute it for free.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Each bureau has an online dispute process. You submit the error,
              they investigate, and if it&apos;s wrong it gets removed. Removing one
              incorrect late payment or a collection that isn&apos;t yours can push
              your score up significantly — sometimes 20 to 50 points. We cover
              this in more detail in Protecting Your Credit.
            </p>
          </div>
        </div>
      );

    case "tyc-quiz":
      return (
        <QuizBlock
          sectionLabel="Tracking Your Credit"
          onPass={onQuizPass}
          questions={[
            {
              question: "Credit Karma shows your VantageScore. What scoring model do most lenders actually use when you apply for credit?",
              options: [
                "VantageScore — same thing",
                "FICO",
                "Experian Score",
                "TransUnion Score",
              ],
              correct: 1,
              explanation: "Most lenders use FICO when evaluating applications. Credit Karma's VantageScore is a useful tracker but can differ from your FICO score by 10–30 points — that gap is normal.",
            },
            {
              question: "You have $8,000 in total available credit across your cards. What's the most you should carry as a balance to stay in the healthy range?",
              options: [
                "$4,000 (50%)",
                "$3,200 (40%)",
                "$2,400 (30%)",
                "$800 (10%)",
              ],
              correct: 2,
              explanation: "Stay under 30% utilization — that's $2,400 on an $8,000 limit. Under 10% ($800) is even better, but 30% is the line you don't want to cross.",
            },
            {
              question: "Where can you pull your free official credit reports from all three bureaus?",
              options: [
                "creditkarma.com",
                "experian.com",
                "annualcreditreport.com",
                "myfico.com",
              ],
              correct: 2,
              explanation: "annualcreditreport.com is the only federally authorized source for free reports from all three bureaus. You can pull them weekly at no cost.",
            },
          ]}
        />
      );

    case "pyc-1":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Protecting Your Credit · Lesson 1
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Freeze Your Credit — Do This Now
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            A credit freeze is the single most effective thing you can do to
            protect yourself. It locks your credit file so that no lender can
            pull your credit and no new account can be opened in your name —
            even if someone has your Social Security number. It&apos;s completely
            free, it doesn&apos;t affect your score at all, and it takes about 10
            minutes to set up.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            If you haven&apos;t done this yet, stop here and do it before you finish
            this lesson.
          </p>

          <div className="mb-8 flex flex-col gap-3">
            {[
              {
                bureau: "Equifax",
                url: "equifax.com/personal/credit-report-services/credit-freeze",
                note: "Create an account, go to Security Freeze, and activate it.",
              },
              {
                bureau: "TransUnion",
                url: "transunion.com/credit-freeze",
                note: "Create an account or log in, then add a freeze under your security settings.",
              },
              {
                bureau: "Experian",
                url: "experian.com/freeze/center.html",
                note: "Create an account, go to Freeze Center, and select Add a Security Freeze.",
              },
            ].map(({ bureau, url, note }) => (
              <div key={bureau} className="rounded-xl border border-border p-4">
                <div className="mb-1 flex items-center gap-2">
                  <div
                    className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: "var(--brand-600)" }}
                  >
                    {bureau[0]}
                  </div>
                  <p className="font-semibold text-foreground">{bureau}</p>
                </div>
                <p className="mb-1 font-mono text-xs text-muted-foreground/70">{url}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">When you want to apply for something, unfreeze first</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A freeze doesn&apos;t mean your credit is locked forever. When you
              actually want to apply for a card, loan, or apartment, you just
              log in to each bureau and temporarily lift the freeze. Takes a
              few minutes. Once the application is done, freeze it again. It&apos;s
              a minor inconvenience that&apos;s completely worth it.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">Fraud alert — the lighter version</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              If you&apos;re not ready to fully freeze, a fraud alert is a step down.
              It doesn&apos;t block lenders — it just tells them to take extra steps
              to verify your identity before opening anything. Easier to manage
              but not as airtight. You can place one at any bureau and they&apos;re
              required to notify the other two. Lasts 1 year. A freeze is
              still better.
            </p>
          </div>

          {/* AI IMAGE PLACEHOLDER
              Prompt: "Three clean minimal cards showing Equifax, TransUnion, and Experian each with a green lock icon and the word 'Frozen' underneath, flat UI design, muted olive green color scheme, no real logos" */}
          <div className="flex h-36 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">[ Visual: All 3 bureaus frozen ]</p>
          </div>
        </div>
      );

    case "pyc-2":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Protecting Your Credit · Lesson 2
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Why Good Credit Makes You a Target
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            Here&apos;s the irony nobody tells you — the better your credit gets,
            the more valuable your identity becomes to steal. A scammer with a
            750-score identity can open $15,000 to $20,000 in credit in a
            single afternoon. They&apos;re not going after people with 500 scores.
            They want yours.
          </p>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            This is especially true for military members and veterans. Steady
            income, VA benefits, and the fact that you move frequently and
            sometimes deploy for months at a time makes you a specific target.
            Fraud can go undetected for a long time when you&apos;re in a different
            country and not checking your accounts.
          </p>

          <p className="mb-4 text-base font-semibold text-foreground">How they get to you:</p>
          <div className="mb-8 flex flex-col gap-3">
            {[
              {
                title: "Phishing emails and texts",
                body: "Fake emails that look exactly like they're from your bank, the VA, or a credit card company. They get you to click a link and enter your info. Real institutions will never ask for your password or full SSN in an email.",
              },
              {
                title: "Fake credit card offers",
                body: "You get an offer that looks too good — 0% APR, no annual fee, huge limit. You fill out the application and you just handed someone your name, address, date of birth, and SSN.",
              },
              {
                title: "Data breaches",
                body: "Your info gets exposed when a company you've done business with gets hacked. You didn't do anything wrong — your name, email, and sometimes SSN just ended up in a database that got sold on the dark web.",
              },
              {
                title: "Fraud while deployed",
                body: "You're overseas for 6 months and someone back home opens 3 cards in your name. By the time you get back, they've maxed them out and disappeared. Freezing your credit before you deploy eliminates this.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-border p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <p className="mb-4 text-base font-semibold text-foreground">Red flags to watch for on Credit Karma:</p>
          <div className="mb-8 flex flex-col gap-2">
            {[
              "A hard inquiry from a lender you've never heard of",
              "A new account you don't recognize",
              "Your score drops suddenly with no explanation",
              "Bills or collection notices for accounts you never opened",
              "Credit Karma sends you an alert about a new account",
            ].map((flag) => (
              <div key={flag} className="flex items-start gap-3 rounded-lg border border-border px-4 py-3">
                <span className="mt-0.5 text-red-500">●</span>
                <p className="text-sm text-muted-foreground">{flag}</p>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            Any one of these is worth investigating immediately. Don&apos;t assume
            it&apos;s a glitch or wait to see what happens. The next lesson covers
            exactly what to do if you think something is wrong.
          </p>
        </div>
      );

    case "pyc-3":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Protecting Your Credit · Lesson 3
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            If It Happens to You
          </h1>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Identity theft feels overwhelming when it hits. The most important
            thing is to move fast and stay organized. Here&apos;s the exact order
            of what to do.
          </p>

          <div className="mb-8 flex flex-col gap-4">
            {[
              {
                step: "1",
                title: "Freeze all 3 bureaus immediately",
                body: "Don't wait to confirm anything. The moment something looks wrong — an inquiry you don't recognize, an account you didn't open — freeze all three bureaus right now. It stops anything else from being opened while you figure out what happened.",
              },
              {
                step: "2",
                title: "Go to IdentityTheft.gov",
                body: "This is the FTC's official identity theft recovery site. You report what happened and it builds a personalized recovery plan for you — including pre-filled dispute letters you can send to the bureaus and creditors. It's free and it's the fastest way to get organized.",
              },
              {
                step: "3",
                title: "Dispute the fraudulent account with the bureau",
                body: "Each bureau has an online dispute process. You flag the account as fraudulent, provide a brief explanation, and they're required to investigate within 30 days. If they can't verify it's legitimate, it gets removed. Do this on every bureau that's showing the account.",
              },
              {
                step: "4",
                title: "Contact the creditor directly",
                body: "Call the company that issued the fraudulent account — not just the bureau. Tell them you're a victim of identity theft and the account was not opened by you. Ask them to close it and remove it from your report. Most companies have a fraud department for exactly this.",
              },
              {
                step: "5",
                title: "Keep records of everything",
                body: "Save every confirmation number, every email, every letter. If this goes to a dispute process, documentation is everything. Take screenshots, write down the date and time of every call, and get names when you talk to someone.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-xl border border-border p-5">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "var(--brand-600)" }}
                >
                  {step}
                </div>
                <div>
                  <p className="mb-1 font-semibold text-foreground">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border p-5">
            <p className="mb-2 font-semibold text-foreground">What about disputing legitimate errors?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Not everything wrong on your report is fraud. Sometimes a payment
              gets marked late by mistake, an old debt that should have fallen
              off is still showing, or a balance is reported incorrectly. The
              process is the same — dispute it through the bureau online,
              explain the error, and they investigate. If it&apos;s wrong, it gets
              fixed. A single corrected error can move your score 20 to 50
              points. Always worth doing.
            </p>
          </div>
        </div>
      );

    case "pyc-4":
      return (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Protecting Your Credit · Lesson 4
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Services & Habits That Keep You Safe
          </h1>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Freezing your credit is the foundation. These are the extra layers
            — tools and habits that make it significantly harder for anyone to
            get to you in the first place.
          </p>

          <p className="mb-4 text-base font-semibold text-foreground">Services worth knowing about</p>
          <div className="mb-8 flex flex-col gap-4">
            {[
              {
                name: "DeleteMe",
                cost: "~$129/yr",
                what: "Data broker sites like Spokeo, Whitepages, and BeenVerified buy and sell your personal info — your name, address, phone number, relatives. Scammers use these to build a profile on you before they strike. DeleteMe submits removal requests to all of them on your behalf and keeps doing it since they re-add you over time. You can do it manually for free but it's extremely tedious.",
              },
              {
                name: "Privacy.com",
                cost: "Free",
                what: "Generates a virtual card number for online purchases so your real card number is never exposed to a website. If that site gets breached, the virtual number is useless to anyone. A must-have for online shopping.",
              },
              {
                name: "Have I Been Pwned",
                cost: "Free",
                what: "Go to haveibeenpwned.com and enter your email. It tells you if your email appeared in any known data breaches. If it has, change the password for that account immediately and anywhere you used the same password.",
              },
              {
                name: "Aura / LifeLock",
                cost: "Paid",
                what: "All-in-one identity protection services that monitor your SSN, bank accounts, credit, and the dark web — and come with identity theft insurance up to $1 million if something happens. Worth it if you want everything in one place and peace of mind.",
              },
            ].map(({ name, cost, what }) => (
              <div key={name} className="rounded-xl border border-border p-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold text-foreground">{name}</p>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{cost}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{what}</p>
              </div>
            ))}
          </div>

          <p className="mb-4 text-base font-semibold text-foreground">The habits that actually matter</p>
          <div className="mb-8 flex flex-col gap-3">
            {[
              {
                habit: "Never carry your Social Security card",
                detail: "Leave it home. If your wallet gets stolen, your SSN should not be in it.",
              },
              {
                habit: "Set up transaction alerts on every account",
                detail: "Every credit card and bank account should text or email you for every charge. You'll know within seconds if something hits that wasn't you.",
              },
              {
                habit: "Use a different password for every account",
                detail: "One breach shouldn't unlock everything. Use a password manager like Bitwarden (free) or 1Password so you only have to remember one master password.",
              },
              {
                habit: "Set a PIN with your phone carrier",
                detail: "SIM swap fraud is when a scammer calls your carrier, pretends to be you, and gets your phone number transferred to their SIM. Then they use 'forgot password' to take over your email and bank accounts. A carrier PIN blocks this. Call your carrier and set one today.",
              },
              {
                habit: "Don't use public WiFi for financial accounts",
                detail: "Coffee shop, airport, hotel — don't check your bank or credit cards on public networks. Use your phone's hotspot instead.",
              },
              {
                habit: "Shred financial mail before throwing it away",
                detail: "Anything with your name, account number, or address gets shredded — not just tossed. Dumpster diving is a real thing.",
              },
            ].map(({ habit, detail }) => (
              <div key={habit} className="rounded-xl border border-border p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">{habit}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            You don&apos;t have to do all of this at once. Start with the freeze if
            you haven&apos;t, set up transaction alerts today, and add the rest over
            time. Each layer you add makes you a harder target. The goal isn&apos;t
            perfection — it&apos;s making it not worth the effort for anyone to
            come after you.
          </p>
        </div>
      );

    case "pyc-quiz":
      return (
        <QuizBlock
          sectionLabel="Protecting Your Credit"
          onPass={onQuizPass}
          questions={[
            {
              question: "A credit freeze costs money and will lower your credit score — true or false?",
              options: [
                "True — there's usually a small fee",
                "False — it's free and has zero impact on your score",
                "True — it shows up as a derogatory mark",
                "False — but it does temporarily lower your score",
              ],
              correct: 1,
              explanation: "Credit freezes are completely free on all 3 bureaus and have absolutely no impact on your credit score. There's no downside to doing it right now.",
            },
            {
              question: "You're about to deploy for 6 months. What's the best thing to do for your credit before you leave?",
              options: [
                "Close all your credit cards so they can't be used",
                "Do nothing — you can deal with anything when you get back",
                "Freeze your credit on all 3 bureaus before you leave",
                "Ask a family member to monitor your accounts",
              ],
              correct: 2,
              explanation: "Freezing all 3 bureaus before deploying means nobody can open new credit in your name while you're gone. You can unfreeze when you return. Closing cards would hurt your score and asking someone else to monitor is not reliable.",
            },
            {
              question: "You see a hard inquiry on Credit Karma from a company you've never heard of. What do you do first?",
              options: [
                "Ignore it — hard inquiries fall off after 2 years anyway",
                "Wait a month to see if anything else shows up",
                "Freeze your credit and check for any new accounts you didn't open",
                "Call your bank",
              ],
              correct: 2,
              explanation: "An inquiry you don't recognize is a red flag. Freeze first to stop anything else from opening, then investigate. Don't wait — fraud moves fast.",
            },
          ]}
        />
      );

    default:
      return (
        <div>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
            Coming Soon
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            This lesson is still being written. Check back soon.
          </p>
        </div>
      );
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CreditBasicsPage() {
  const [activeLessonId, setActiveLessonId] = useState("my-story-1");
  const [expandedSections, setExpandedSections] = useState<string[]>(["my-story"]);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("cb-completed") ?? "[]");
    } catch {
      return [];
    }
  });
  const [unlockedSectionIds, setUnlockedSectionIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["my-story"];
    try {
      return JSON.parse(localStorage.getItem("cb-unlocked") ?? '["my-story"]');
    } catch {
      return ["my-story"];
    }
  });

  useEffect(() => {
    localStorage.setItem("cb-completed", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("cb-unlocked", JSON.stringify(unlockedSectionIds));
  }, [unlockedSectionIds]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Compute sections with dynamic lock state
  const sections = SECTIONS.map((s) => ({
    ...s,
    locked: !unlockedSectionIds.includes(s.id),
  }));

  // Only lessons from unlocked sections are navigable
  const navigableLessons = sections
    .filter((s) => !s.locked)
    .flatMap((s) =>
      s.lessons.map((l) => ({ ...l, sectionId: s.id, locked: false }))
    );

  const activeIndex = navigableLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = activeIndex > 0 ? navigableLessons[activeIndex - 1] : null;
  const nextLesson =
    activeIndex < navigableLessons.length - 1 ? navigableLessons[activeIndex + 1] : null;

  // Figure out if this is the last lesson of a no-quiz section
  const activeSection = sections.find((s) =>
    s.lessons.some((l) => l.id === activeLessonId)
  );
  const isLastLessonOfNoQuizSection =
    activeSection?.noQuiz &&
    activeSection.lessons[activeSection.lessons.length - 1].id === activeLessonId;

  // True only when on the very last lesson of the entire course
  const lastSection = SECTIONS[SECTIONS.length - 1];
  const lastLesson = lastSection.lessons[lastSection.lessons.length - 1];
  const isFinalLesson = activeLessonId === lastLesson.id;

  const nextSectionIndex = activeSection
    ? SECTIONS.findIndex((s) => s.id === activeSection.id) + 1
    : -1;
  const nextSection = nextSectionIndex < SECTIONS.length ? SECTIONS[nextSectionIndex] : null;

  // Progress: count completed non-quiz lessons across ALL sections
  const totalLessons = SECTIONS.flatMap((s) => s.lessons).filter(
    (l) => !("isQuiz" in l && l.isQuiz)
  ).length;
  const progressPct = Math.round((completedLessons.length / totalLessons) * 100);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const goToLesson = (id: string) => {
    setActiveLessonId(id);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0 });
  };

  const unlockNextSection = (currentSectionId: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === currentSectionId);
    const next = idx >= 0 && idx + 1 < SECTIONS.length ? SECTIONS[idx + 1] : null;
    if (!next) return;
    setUnlockedSectionIds((prev) => prev.includes(next.id) ? prev : [...prev, next.id]);
    setExpandedSections((prev) => prev.includes(next.id) ? prev : [...prev, next.id]);
  };

  const handleQuizPass = () => {
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons((prev) => [...prev, activeLessonId]);
    }
    if (activeSection) unlockNextSection(activeSection.id);
  };

  const markComplete = () => {
    const updated = completedLessons.includes(activeLessonId)
      ? completedLessons
      : [...completedLessons, activeLessonId];
    setCompletedLessons(updated);

    // If last lesson of a no-quiz section → unlock next section
    if (isLastLessonOfNoQuizSection && nextSection) {
      setUnlockedSectionIds((prev) =>
        prev.includes(nextSection.id) ? prev : [...prev, nextSection.id]
      );
      setExpandedSections((prev) =>
        prev.includes(nextSection.id) ? prev : [...prev, nextSection.id]
      );
      goToLesson(nextSection.lessons[0].id);
      return;
    }

    if (nextLesson) goToLesson(nextLesson.id);
  };

  const isCompleted = completedLessons.includes(activeLessonId);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background">

      {/* ── Top bar ── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">

        {/* Left: back + course title */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-semibold text-foreground">Credit Basics</span>
        </div>

        {/* Right: progress + user + theme toggle */}
        <div className="flex items-center gap-4">
          {/* Progress bar + % */}
          <div className="flex items-center gap-2">
            <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, background: "var(--brand-600)" }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{progressPct}%</span>
          </div>

          {/* User avatar + name */}
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
              {mockUser.name[0]}
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
              {mockUser.name}
            </span>
          </div>

          <ThemeToggle />

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground lg:hidden"
          >
            <BookOpen className="size-4" />
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside
          className={`${
            mobileSidebarOpen ? "flex" : "hidden"
          } w-[280px] shrink-0 flex-col border-r border-border lg:flex`}
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Sections
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {sections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              const completedCount = section.lessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;

              return (
                <div key={section.id}>
                  <button
                    onClick={() => !section.locked && toggleSection(section.id)}
                    disabled={section.locked}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors ${
                      section.locked
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      {section.locked ? (
                        <Lock className="size-3.5 shrink-0 text-muted-foreground" />
                      ) : completedCount === section.lessons.length ? (
                        <CheckCircle2 className="size-3.5 shrink-0 text-green-500" />
                      ) : (
                        <Circle className="size-3.5 shrink-0 text-muted-foreground" />
                      )}
                      <span className="truncate text-sm font-medium text-foreground">
                        {section.title}
                      </span>
                    </div>
                    {!section.locked && (
                      <div className="ml-2 flex shrink-0 items-center gap-2">
                        <span className="text-[11px] text-muted-foreground">
                          {completedCount}/{section.lessons.length}
                        </span>
                        <ChevronDown
                          className={`size-3.5 text-muted-foreground transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    )}
                  </button>

                  {isExpanded && !section.locked && (
                    <div className="pb-1">
                      {section.lessons.map((lesson) => {
                        const isActive = lesson.id === activeLessonId;
                        const isDone = completedLessons.includes(lesson.id);
                        const isQuiz = "isQuiz" in lesson && lesson.isQuiz;

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => goToLesson(lesson.id)}
                            className={`flex w-full items-center gap-2.5 py-2 pr-4 text-left text-sm transition-colors ${
                              isActive
                                ? "bg-muted/60 font-medium text-foreground"
                                : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                            }`}
                            style={
                              isActive
                                ? {
                                    borderLeft: "2px solid var(--brand-600)",
                                    paddingLeft: "calc(2.25rem - 2px)",
                                  }
                                : { borderLeft: "2px solid transparent", paddingLeft: "2.25rem" }
                            }
                          >
                            {isDone ? (
                              <CheckCircle2 className="size-3.5 shrink-0 text-green-500" />
                            ) : isQuiz ? (
                              <div className="size-3.5 shrink-0 rounded-sm border border-muted-foreground/40" />
                            ) : (
                              <Circle className="size-3.5 shrink-0 opacity-40" />
                            )}
                            <span className="truncate leading-snug">{lesson.title}</span>
                            {isQuiz && (
                              <span className="ml-auto shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                Quiz
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl px-6 py-10 sm:px-10 sm:py-14">
              <LessonContent lessonId={activeLessonId} onQuizPass={handleQuizPass} />
            </div>
          </div>

          {/* ── Bottom nav ── */}
          <div className="shrink-0 border-t border-border bg-background px-6 py-3">
            <div className="mx-auto flex max-w-2xl items-center justify-between">

              {/* Prev */}
              {prevLesson ? (
                <button
                  onClick={() => goToLesson(prevLesson.id)}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                  <span className="hidden sm:inline">{prevLesson.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <div />
              )}

              {/* Complete / Next */}
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <>
                    <span className="flex items-center gap-1.5 text-sm text-green-600">
                      <CheckCircle2 className="size-4" />
                      Completed
                    </span>
                    {/* After last no-quiz lesson: show next section CTA */}
                    {isLastLessonOfNoQuizSection && nextSection && (
                      <button
                        onClick={() => goToLesson(nextSection.lessons[0].id)}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span>{nextSection.title}</span>
                        <ChevronRight className="size-4" />
                      </button>
                    )}
                    {/* Normal next lesson */}
                    {!isLastLessonOfNoQuizSection && nextLesson && (
                      <button
                        onClick={() => goToLesson(nextLesson.id)}
                        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span className="hidden sm:inline">{nextLesson.title}</span>
                        <span className="sm:hidden">Next</span>
                        <ChevronRight className="size-4" />
                      </button>
                    )}
                    {/* Last lesson of the entire course */}
                    {isFinalLesson && (
                      <Link
                        href="/courses"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "var(--brand-600)" }}
                      >
                        Start Credit Cards 101
                        <ChevronRight className="size-4" />
                      </Link>
                    )}
                  </>
                ) : (
                  <Button size="sm" onClick={markComplete}>
                    {isLastLessonOfNoQuizSection && nextSection
                      ? `Complete & Start ${nextSection.title}`
                      : nextLesson
                      ? "Complete & Continue"
                      : "Mark Complete"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
