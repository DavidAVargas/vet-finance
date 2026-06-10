export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
      <p className="mb-8 text-sm text-muted-foreground">Last updated: April 2026</p>

      <div className="flex flex-col gap-8 text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Overview</h2>
          <p>
            By using Vet Finance you agree to these terms. We&apos;ve kept them as simple
            and straightforward as possible — no legal maze, just the basics.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Use of the Site</h2>
          <ul className="flex flex-col gap-2 pl-4">
            <li>• Vet Finance is an educational resource. Content on this site is for informational purposes only and does not constitute financial advice</li>
            <li>• You are responsible for your own financial decisions</li>
            <li>• You agree not to misuse the site or attempt to access it in unauthorized ways</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Free Military Access</h2>
          <p>
            Free access to educational content is provided to verified active duty service
            members and veterans. Misrepresenting your military status to gain free access
            is a violation of these terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Intellectual Property</h2>
          <p>
            All content on Vet Finance — text, design, graphics — is owned by Vet Finance.
            You may not reproduce or redistribute it without permission.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Disclaimer</h2>
          <p>
            Vet Finance provides educational content only. We are not a licensed financial
            advisor, bank, or credit counselor. Always do your own research and consult a
            professional before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Changes to These Terms</h2>
          <p>
            We may update these terms as the site grows. We&apos;ll always post the latest
            version here with an updated date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
          <p>
            Questions? Contact information will be updated as the site grows.
          </p>
        </section>
      </div>
    </div>
  );
}
