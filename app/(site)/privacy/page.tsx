export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: October 2026</p>

      <div className="flex flex-col gap-8 text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Overview</h2>
          <p>
            Vet Finance is committed to protecting your privacy. This policy explains what
            information we collect, how we use it, and how we keep it safe. We will never
            sell your data. Period.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Information We Collect</h2>
          <ul className="flex list-disc flex-col gap-2 pl-4">
            <li><span className="font-medium text-foreground">Account information</span> — your name and email address when you create an account</li>
            <li><span className="font-medium text-foreground">Your background</span> — what you choose during setup (for example, active duty, veteran, or supporter). This is self-reported and isn&apos;t verified</li>
            <li><span className="font-medium text-foreground">Invite code</span> — the code you used to join the beta</li>
            <li><span className="font-medium text-foreground">Course progress</span> — which lessons you&apos;ve completed, so you can pick up where you left off</li>
            <li><span className="font-medium text-foreground">Feedback</span> — anything you post on the feedback board, along with your name</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">How We Use Your Information</h2>
          <ul className="flex list-disc flex-col gap-2 pl-4">
            <li>To run your account and save your course progress</li>
            <li>To tailor content to your background</li>
            <li>To improve the site based on the feedback you share</li>
            <li>We don&apos;t currently send marketing emails. If we ever do, it will only be with your permission</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">What We Don&apos;t Do</h2>
          <ul className="flex list-disc flex-col gap-2 pl-4">
            <li>We do not sell your data to anyone</li>
            <li>We do not share your information with third parties except the providers that run the service, such as our sign-in provider (Clerk) and our hosting and database providers</li>
            <li>We do not spam you</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Your Rights</h2>
          <p>
            You can request to have your account and data deleted at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
          <p>
            Questions about this policy? Reach out to us directly. Contact information will
            be updated as the site grows.
          </p>
        </section>
      </div>
    </div>
  );
}
