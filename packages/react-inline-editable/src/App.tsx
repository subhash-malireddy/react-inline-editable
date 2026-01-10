import "./App.css";
import { BasicControlled } from "./examples/core-examples/BasicControlled";
import { WithEditTrigger } from "./examples/core-examples/WithEditTrigger";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Inline Editable - Examples</h1>

      <section style={{ marginTop: "2rem" }}>
        <BasicControlled />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <WithEditTrigger />
      </section>
    </div>
  );
}

export default App;
