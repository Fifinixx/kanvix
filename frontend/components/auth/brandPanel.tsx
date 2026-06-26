const FEATURES = [
  "Real-time collaborative editing",
  "Shared documents and workspaces",
  "Inline comments and mentions",
];

export default function BrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
      {/* subtle decorative glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

      <div className="relative flex items-center gap-2">
        <span className="text-4xl font-semibold tracking-tight">KANVIX</span>
      </div>

      <div className="relative space-y-6">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight">
          Collaborate in real time,
          <br />
          wherever your team is.
        </h1>
        <ul className="space-y-3">
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm text-primary-foreground/90"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-sm text-primary-foreground/70">
        © {new Date().getFullYear()} KANVIX
      </p>
    </div>
  );
}
