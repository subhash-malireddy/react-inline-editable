import "./App.css";
import { BasicControlled } from "./components/examples/BasicControlled";
import { BasicUncontrolled } from "./components/examples/BasicUncontrolled";
import { WithEditTrigger } from "./components/examples/WithEditTrigger";
import { WithExplicitControls } from "./components/examples/WithExplicitControls";
import { HeadingExample } from "./components/examples/HeadingExample";
import { TextareaExample } from "./components/examples/TextareaExample";
import { DoubleClickMode } from "./components/examples/DoubleClickMode";
import { EditableMessage } from "./components/examples/EditableMessage";

function App() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-12 pb-4 border-b border-border">
        <h1 className="text-rust-dark">React Inline Editable</h1>
        <p className="text-text-muted text-lg">
          Minimalistic, polymorphic, and zero-dependency inline editing
          primitives with sensible defaults.
        </p>
      </header>

      <main className="space-y-16">
        <section className="example-section">
          <BasicControlled />
        </section>

        <section className="example-section">
          <BasicUncontrolled />
        </section>

        <section className="example-section">
          <WithEditTrigger />
        </section>

        <section className="example-section">
          <WithExplicitControls />
        </section>

        <section className="example-section">
          <HeadingExample />
        </section>

        <section className="example-section">
          <TextareaExample />
        </section>

        <section className="example-section">
          <DoubleClickMode />
        </section>

        <section className="example-section">
          <EditableMessage />
        </section>
      </main>

      <footer className="mt-16 pt-8 border-t border-border text-text-muted text-sm">
        <p>Built with zero external dependencies. MIT License.</p>
      </footer>
    </div>
  );
}

export default App;
