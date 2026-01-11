# react-inline-editable

A zero-dependency and unstyled React component library for inline editing with flexible composition patterns and senisible defaults.

## Features

- 🎯 **Zero Dependencies** - Pure React implementation
- ➰ **Flexible Composition** - Uses compound components pattern
- 🔄 **Controlled & Uncontrolled** - Support for both patterns
- 📝 **TypeScript** - Full type safety with polymorphic props
- 🎛️ **Customizable** - Configurable activation and deactivation modes

## Installation

```bash
npm install react-inline-editable
# or
pnpm add react-inline-editable
# or
yarn add react-inline-editable
```

## Quick Start

```tsx
import { InlineEditable } from "react-inline-editable";

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

## Documentation

For complete documentation, examples, and API reference, visit the [documentation site](https://subhash-malireddy.github.io/react-inline-editable/).

## License

MIT
