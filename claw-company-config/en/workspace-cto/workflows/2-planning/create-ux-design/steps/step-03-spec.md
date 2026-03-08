---
name: step-03-spec
description: "UI component specs, interaction patterns, responsive design, accessibility"
next-step: ./step-04-complete.md
---

# Step 3: UI Component Specifications

**Progress: Step 3 of 4** — Next: Final Output

## Objective

Define UI component specifications, interaction patterns, responsive design strategy, and accessibility standards.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip or merge steps

## Execution Instructions (sequential, no skipping)

### 1. UI component specifications

Define UI components for each page:

- **Layout components**: Header, Footer, Sidebar, Content Area
- **Form components**: Input, Select, Checkbox, Radio, DatePicker
- **Data display**: Table, Card, List, Chart
- **Feedback components**: Toast, Modal, Loading, Empty State
- **Navigation components**: Tab, Breadcrumb, Pagination, Menu

Each component needs: states (default/hover/active/disabled/error), size variants, content constraints.

### 2. Interaction patterns

Define global interaction standards:

- **Loading patterns**: Skeleton / Spinner / Progressive loading
- **Error handling**: UI feedback for form validation, network errors, permission errors
- **Animations and transitions**: Page transitions, component entry/exit animation direction
- **Gesture support**: Swipe, long press, drag (if applicable)
- **Keyboard shortcuts**: Keyboard operation support (if applicable)

### 3. Responsive design

Define responsive breakpoints and strategy:

- **Breakpoint definitions**: Mobile (< 768px) / Tablet (768-1024px) / Desktop (> 1024px)
- **Layout changes**: Layout adjustment strategy at each breakpoint
- **Component adaptation**: How specific components render at different breakpoints
- **Touch adaptation**: Minimum touch target size (44x44px)

### 4. Accessibility design

Define accessibility standards (WCAG 2.1 AA):

- **Color contrast**: Text to background contrast ratio (4.5:1 minimum)
- **Keyboard navigation**: All features operable via keyboard
- **Screen readers**: ARIA labels and semantic HTML
- **Focus management**: Focus order and visibility

### 5. Update frontmatter

Add `step-03-spec` to `steps-completed`.

## Completion Criteria

- ✅ UI component specs defined (with states and variants)
- ✅ Interaction patterns specified
- ✅ Responsive design strategy established
- ✅ Accessibility standards set

## Next Step

After confirming completion criteria are met, read and follow: `./step-04-complete.md`
