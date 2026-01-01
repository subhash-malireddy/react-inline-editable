import "./App.css";
import InlineEditable from "./index";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Inline Editable - Development Playground</h1>

      <section style={{ marginTop: "2rem" }}>
        <h2>Component Demo</h2>
        <InlineEditable />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h3>Instructions:</h3>
        <ul>
          <li>
            Build your component in <code>src/index.tsx</code>
          </li>
          <li>Test it here in this playground</li>
          <li>
            Run <code>pnpm dev</code> for hot reload
          </li>
          <li>
            Run <code>pnpm build</code> to build the library
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
