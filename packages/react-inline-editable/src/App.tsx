import "./App.css";
import { BasicControlled } from "./components/examples/BasicControlled";
import { BasicUncontrolled } from "./components/examples/BasicUncontrolled";
import { WithEditTrigger } from "./components/examples/WithEditTrigger";
import { WithExplicitControls } from "./components/examples/WithExplicitControls";
import { HeadingExample } from "./components/examples/HeadingExample";
import { TextareaExample } from "./components/examples/TextareaExample";
import { DoubleClickMode } from "./components/examples/DoubleClickMode";
import { EditableMessage } from "./components/examples/EditableMessage";
import { DocsNav } from "./components/DocsNav";

const navItems = [
  { id: "basic-controlled", label: "Basic Controlled" },
  { id: "basic-uncontrolled", label: "Basic Uncontrolled" },
  { id: "with-edit-trigger", label: "With Edit Trigger" },
  { id: "with-explicit-controls", label: "With Explicit Controls" },
  { id: "heading-example", label: "Heading Example" },
  { id: "textarea-example", label: "Textarea Example" },
  { id: "double-click-mode", label: "Double Click Mode" },
  { id: "editable-message", label: "Editable Message" },
];

function App() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto lg:pr-80">
      <header className="mb-12 pb-4 border-b border-border">
        <h1 className="text-rust-dark">React Inline Editable</h1>
        <p className="text-text-muted text-lg">
          Minimalistic, polymorphic, and zero-dependency inline editing
          primitives with sensible defaults.
        </p>
      </header>

      <main className="space-y-16">
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

        <section id="editable-message" className="example-section">
          <EditableMessage />
        </section>
      </main>

      <footer className="mt-16 pt-8 border-t border-border text-text-muted text-sm">
        <p>Built with zero external dependencies. MIT License.</p>
      </footer>

      <DocsNav items={navItems} />
    </div>
  );
}

export default App;
