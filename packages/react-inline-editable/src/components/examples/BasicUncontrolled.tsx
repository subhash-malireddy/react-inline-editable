import { InlineEditable } from "@/index";

//consider that this value comes from the server or as a prop
let displayValue = "Click to edit (uncontrolled)";

export function BasicUncontrolled() {
  return (
    <div>
      <h3>Basic Uncontrolled</h3>
      <p>
        No <code>value</code> or <code>onChange</code> needed. The value is read
        from the DOM on save via <code>onSave</code> callback.
      </p>
      <div className="example-interactive">
        <InlineEditable
          onSave={(newValue, _helpers) => {
            console.log("Saved:", newValue);
            displayValue = newValue;
          }}
        >
          <InlineEditable.Preview>{displayValue}</InlineEditable.Preview>
          <InlineEditable.Write defaultValue={displayValue} />
        </InlineEditable>
      </div>
    </div>
  );
}
