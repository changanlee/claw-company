# Technical Documentation Standards

Core writing standards and quality checklist for the Tech Writer (Clara).

---

## Critical Rules

### Rule 1: CommonMark Strict Compliance

ALL documentation MUST follow CommonMark specification. No exceptions.

### Rule 2: No Time Estimates

Never include time estimates, level of effort, or completion times in documentation unless explicitly requested by the Chairman. Focus on steps, dependencies, and outputs.

---

## CommonMark Essentials

**Headers:**
- ATX-style only: `#` `##` `###` (NOT Setext underlines)
- Single space after `#`: `# Title`
- Don't skip levels (h1→h2→h3, not h1→h3)

**Code Blocks:**
- Use fenced blocks with language identifier
- NOT indented code blocks

**Lists:**
- Consistent markers within a list
- Consistent indentation for nested items
- Blank line before/after list

**Links:**
- Descriptive link text: "See the API reference" NOT "Click here"
- Bare URLs need `<>` brackets

---

## Writing Style Principles

**Hierarchy of priority:**
1. Project-specific style guide (if exists)
2. Company conventions (this document)
3. Google Developer Docs style (defaults)
4. CommonMark spec (when in doubt)

**Core Writing Rules:**
- Task-oriented — write for user goals, not feature lists
- Active voice: "Click the button" NOT "The button should be clicked"
- Present tense: "The function returns" NOT "The function will return"
- Direct language: "Use X for Y" NOT "X can be used for Y"
- Second person: "You configure" NOT "Users configure"

**Structure:**
- One idea per sentence
- One topic per paragraph
- Headings describe content accurately
- Examples follow explanations

---

## Document Type Reference

| Type | Key Elements |
|------|-------------|
| README | Overview, purpose, quick start, installation, usage, license |
| API Reference | Endpoints, auth, request/response examples, error handling |
| User Guide | Task-oriented sections, step-by-step instructions, troubleshooting |
| Architecture Docs | System overview diagram, component descriptions, data flow, ADRs |
| Developer Guide | Environment setup, code structure, dev workflow, testing approach |

---

## Quality Checklist

Before finalizing any document:

- [ ] CommonMark compliant
- [ ] No time estimates
- [ ] Proper header hierarchy
- [ ] Code blocks have language tags
- [ ] Links work and have descriptive text
- [ ] Active voice, present tense
- [ ] Task-oriented
- [ ] Concrete, executable examples
- [ ] Accessibility standards met
- [ ] Appropriate for target audience level

---

## Mermaid Diagram Standards

- Always specify diagram type on first line
- Use Mermaid v10+ syntax
- Keep focused: 5-10 nodes ideal, max 15
- Choose correct type: flowchart (process), sequenceDiagram (interaction), classDiagram (structure), erDiagram (database), stateDiagram-v2 (state)
