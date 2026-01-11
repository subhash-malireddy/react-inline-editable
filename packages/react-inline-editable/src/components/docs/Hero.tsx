export function Hero() {
  return (
    <section id="hero" className="mb-16">
      <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--color-rust-dark)" }}>
        React Inline Editable
      </h1>
      <p className="text-xl mb-6" style={{ color: "var(--color-text-muted)" }}>
        Minimalistic, polymorphic, and zero-dependency inline editing primitives
        with sensible defaults.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="https://github.com/subhash-malireddy/react-inline-editable"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          style={{
            backgroundColor: "var(--color-rust)",
            color: "white",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-rust-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-rust)";
          }}
        >
          View on GitHub
        </a>
        <a
          href="#installation"
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors border"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-cream-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
