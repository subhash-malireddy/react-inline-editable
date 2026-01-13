# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2026-01-11

### Added

- Initial release of `@progressive-villager/react-inline-editable`
- `InlineEditable` compound component with flexible composition pattern
  - `InlineEditable.Preview` - Displays content when not in edit mode (polymorphic, defaults to `<span>`)
  - `InlineEditable.Write` - Input element for editing (polymorphic, defaults to `<input>`)
  - `InlineEditable.EditTrigger` - Button to manually trigger edit mode
  - `InlineEditable.SaveTrigger` - Button to manually save changes
  - `InlineEditable.CancelTrigger` - Button to manually cancel editing
  - `InlineEditable.Controls` - Wrapper component for grouping trigger buttons
- `useInlineEdit` hook for programmatic control of inline editing state
- Support for both controlled and uncontrolled input patterns
- Configurable activation modes: `click`, `dblclick`, `enter`, `none`
- Configurable deactivation modes: `blur`, `esc`, `enter`, `cmd+enter`, `none`
- Polymorphic props support - render as any HTML element with full TypeScript type safety
- Zero external dependencies - pure React implementation
- Full TypeScript support with comprehensive type definitions
- Sensible defaults for different input types (input/select vs textarea)

[Unreleased]: https://github.com/subhash-malireddy/react-inline-editable/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/subhash-malireddy/react-inline-editable/releases/tag/v0.0.1
