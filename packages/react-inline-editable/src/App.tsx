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
      <header className="mb-12 pb-8 border-b border-border">
        <h1 className="text-rust-dark">React Inline Editable</h1>
        <p className="text-text-muted text-lg">
          Minimalistic, polymorphic, and zero-dependency inline editing
          primitives with sensible defaults.
        </p>
      </header>

      <main className="space-y-12">
        <section>
          <BasicControlled />
        </section>

        <section>
          <BasicUncontrolled />
        </section>

        <section>
          <WithEditTrigger />
        </section>

        <section>
          <WithExplicitControls />
        </section>

        <section>
          <HeadingExample />
        </section>

        <section>
          <TextareaExample />
        </section>

        <section>
          <DoubleClickMode />
        </section>

        <section>
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
