import "./App.css";
import { BasicControlled } from "./components/examples/BasicControlled";
import { BasicUncontrolled } from "./components/examples/BasicUncontrolled";
import { WithEditTrigger } from "./components/examples/WithEditTrigger";
import { WithExplicitControls } from "./components/examples/WithExplicitControls";
import { HeadingExample } from "./components/examples/HeadingExample";
import { TextareaExample } from "./components/examples/TextareaExample";
import { DoubleClickMode } from "./components/examples/DoubleClickMode";
import { CustomStyling } from "./components/examples/EditableMessage";
import { DocsNav } from "./components/DocsNav";
import { Hero } from "./components/docs/Hero";
import { Installation } from "./components/docs/Installation";
import { LayoutStability } from "./components/docs/LayoutStability";
import { APIReference } from "./components/docs/APIReference";
import { TriggerComposition } from "./components/docs/TriggerComposition";
import { Accessibility } from "./components/docs/Accessibility";

const navSections = [
  {
    title: "Getting Started",
    items: [
      { id: "hero", label: "Introduction" },
      { id: "installation", label: "Installation" },
    ],
  },
  {
    title: "Examples",
    items: [
      { id: "basic-controlled", label: "Basic Controlled" },
      { id: "basic-uncontrolled", label: "Basic Uncontrolled" },
      { id: "with-edit-trigger", label: "With Edit Trigger" },
      { id: "with-explicit-controls", label: "With Explicit Controls" },
      { id: "heading-example", label: "Heading Example" },
      { id: "textarea-example", label: "Textarea Example" },
      { id: "double-click-mode", label: "Double Click Mode" },
      { id: "custom-styling", label: "Custom Styling" },
    ],
  },
  {
    title: "Guides",
    items: [
      { id: "layout-stability", label: "Layout Stability" },
      { id: "trigger-composition", label: "Trigger Composition" },
      { id: "accessibility", label: "Accessibility" },
    ],
  },
  {
    title: "API",
    items: [{ id: "api-reference", label: "API Reference" }],
  },
];

function App() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto lg:pr-80">
      <main className="space-y-16">
        <Hero />

        <Installation />

        <section id="examples" className="mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: "var(--color-rust-dark)" }}
          >
            Examples
          </h2>
          <div className="space-y-16">
            <section id="basic-controlled" className="example-section">
              <BasicControlled />
            </section>

            <section id="basic-uncontrolled" className="example-section">
              <BasicUncontrolled />
            </section>

            <section id="with-edit-trigger" className="example-section">
              <WithEditTrigger />
            </section>

            <section id="with-explicit-controls" className="example-section">
              <WithExplicitControls />
            </section>

            <section id="heading-example" className="example-section">
              <HeadingExample />
            </section>

            <section id="textarea-example" className="example-section">
              <TextareaExample />
            </section>

            <section id="double-click-mode" className="example-section">
              <DoubleClickMode />
            </section>

            <section id="custom-styling" className="example-section">
              <CustomStyling />
            </section>
          </div>
        </section>

        <section id="guides" className="mb-16">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: "var(--color-rust-dark)" }}
          >
            Guides
          </h2>
          <div className="space-y-16">
            <LayoutStability />

            <TriggerComposition />

            <Accessibility />
          </div>
        </section>

        <APIReference />
      </main>

      <footer className="mt-16 pt-8 border-t border-border text-text-muted text-sm">
        <p>Built with zero external dependencies. MIT License.</p>
      </footer>

      <DocsNav sections={navSections} />
    </div>
  );
}

export default App;
