# react-inline-editable

A zero-dependency and unstyled React component library for inline editing with flexible composition patterns and sensible defaults.

## Features

- 🎯 **Zero Dependencies** - Pure React implementation
- ➰ **Flexible Composition** - Uses compound components pattern
- 🔄 **Controlled & Uncontrolled** - Support for both patterns
- 📝 **TypeScript** - Full type safety with polymorphic props
- 🎛️ **Customizable** - Configurable activation and deactivation modes

## Installation

```bash
npm install @progressive-villager/react-inline-editable
# or
pnpm add @progressive-villager/react-inline-editable
# or
yarn add @progressive-villager/react-inline-editable
```

## Quick Start

### Controlled
```tsx
import { InlineEditable } from "@progressive-villager/react-inline-editable";

function App() {
  const [value, setValue] = useState("Click to edit");

  return (
    <InlineEditable>
      <InlineEditable.Preview>{value}</InlineEditable.Preview>
      <InlineEditable.Write
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InlineEditable>
  );
}
```
### Uncontrolled
```tsx
import { InlineEditable } from "@progressive-villager/react-inline-editable";

async function saveToServer(value: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
  // Simulate success
  console.log("Saved to server:", value);
  return value;
}

const defaultValue = "value from server or a prop";

function App() {
  return (
    <InlineEditable onSave={saveToServer}>
      <InlineEditable.Preview>{defaultValue}</InlineEditable.Preview>
      <InlineEditable.Write
        defaultvalue={defaultValue}
      />
    </InlineEditable>
  );
}
```

## Documentation

For complete documentation, examples, and API reference, visit the [documentation site](https://subhash-malireddy.github.io/react-inline-editable/).

## License

MIT
