export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: April 2026</p>

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
          <ul className="flex flex-col gap-2 pl-4">
            <li>• <span className="font-medium text-foreground">Email address</span> — when you join our waitlist or sign up for notifications</li>
            <li>• <span className="font-medium text-foreground">Military status</span> — when you verify through ID.me or Login.gov (coming soon)</li>
            <li>• <span className="font-medium text-foreground">Usage data</span> — pages visited, time on site, general analytics (no personally identifiable info)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">How We Use Your Information</h2>
          <ul className="flex flex-col gap-2 pl-4">
            <li>• To send you updates about courses, the card, and community events — only if you opted in</li>
            <li>• To verify military status for free access to content</li>
            <li>• To improve the site and understand what content is most useful</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">What We Don't Do</h2>
          <ul className="flex flex-col gap-2 pl-4">
            <li>• We do not sell your data to anyone</li>
            <li>• We do not share your information with third parties except as required to operate the service</li>
            <li>• We do not spam you</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Your Rights</h2>
          <p>
            You can request to have your data deleted at any time by contacting us. You can
            also unsubscribe from any emails at any time via the unsubscribe link in the email.
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
