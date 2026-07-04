"use client";

import { useState } from "react";
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
      { id: "hcw-2", title: "How Your Score Is Calculated" },
      { id: "hcw-3", title: "Good Score vs. Bad Score" },
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
      { id: "tyc-3", title: "Credit Report vs. Credit Score" },
      { id: "tyc-4", title: "How to Pull Your Free Reports" },
      { id: "tyc-quiz", title: "Quiz", isQuiz: true },
    ],
  },
  {
    id: "protecting-your-credit",
    title: "Protecting Your Credit",
    noQuiz: false,
    lessons: [
      { id: "pyc-1", title: "Credit Freezes" },
      { id: "pyc-2", title: "Fraud Alerts" },
      { id: "pyc-3", title: "Disputing Errors on Your Report" },
      { id: "pyc-quiz", title: "Quiz", isQuiz: true },
    ],
  },
];

// ─── Lesson content ──────────────────────────────────────────────────────────

function LessonContent({ lessonId }: { lessonId: string }) {
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
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Why Credit Matters · Quiz
          </p>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            Knowledge Check
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Quiz coming soon. This will test what you learned in Why Credit
            Matters before unlocking the next section.
          </p>
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">Quiz questions will appear here.</p>
          </div>
        </div>
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
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [unlockedSectionIds, setUnlockedSectionIds] = useState<string[]>(["my-story"]);
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
      // Navigate to first lesson of next section
      goToLesson(nextSection.lessons[0].id);
      return;
    }

    // Otherwise go to next navigable lesson
    if (nextLesson) {
      goToLesson(nextLesson.id);
    }
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
              <LessonContent lessonId={activeLessonId} />
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
