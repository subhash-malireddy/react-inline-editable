import { useEffect, useState, useRef } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface DocsNavProps {
  sections: NavSection[];
}

// Function to handle smooth scrolling to a section
function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80; // Account for any fixed headers
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

export function DocsNav({ sections }: DocsNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    // Menu stays open - user can click outside or toggle button to close
  };

  return (
    <>
      {/* Desktop Navigation - Fixed on the right */}
      <nav className="hidden lg:block fixed top-24 right-8 w-60 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div
          className="backdrop-blur-sm rounded-lg p-4 shadow-sm"
          style={{
            backgroundColor: "rgba(245, 239, 220, 0.5)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-3 uppercase tracking-wide whitespace-nowrap"
            style={{ color: "var(--color-rust-dark)" }}
          >
            On this page
          </h2>
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.title}>
                <h3
                  className="text-xs font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className="w-full text-left px-3 py-2 rounded-md text-sm transition-colors"
                        style={{ color: "var(--color-text-muted)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--color-text)";
                          e.currentTarget.style.backgroundColor =
                            "var(--color-cream-dark)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            "var(--color-text-muted)";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Floating Menu Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 text-white rounded-full shadow-lg transition-colors flex items-center justify-center"
        style={{ backgroundColor: "var(--color-rust)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-rust-dark)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-rust)";
        }}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile Popover Menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed bottom-24 right-6 z-40 w-64 rounded-lg shadow-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
          style={{
            backgroundColor: "var(--color-cream-dark)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-3 uppercase tracking-wide whitespace-nowrap"
            style={{ color: "var(--color-rust-dark)" }}
          >
            On this page
          </h2>
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.title}>
                <h3
                  className="text-xs font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className="w-full text-left px-3 py-2 rounded-md text-sm transition-colors"
                        style={{ color: "var(--color-text-muted)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--color-text)";
                          e.currentTarget.style.backgroundColor =
                            "var(--color-cream)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            "var(--color-text-muted)";
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
