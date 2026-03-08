---
name: task-breakdown
description: "Task Breakdown: Break down into executable tasks based on workflow scale"
next-step: ./step-04-dispatch.md
output-file: output/planning/task-breakdown.md
template: null
---

# Step 3: Task Breakdown

**Progress: Step 3 of 5**

## Goal

Break down the technical design into concrete executable development tasks. Lean workflow: Atlas breaks down directly. Full workflow: PM produces PRD, Architect produces tech spec, then break into epics.

## Execution Rules

- 📖 Read the entire step file before taking action
- 🚫 Do not pre-read subsequent steps
- 🚫 Do not skip steps

## Instructions

### Lean Workflow

Atlas breaks down brainstorming results directly into concrete executable tasks. Each task includes:

- **Description**: Task goal and scope
- **Acceptance Criteria**: Clear completion conditions
- **Expected Output**: Specific deliverables

### Full Workflow

#### 1. Spawn PM Engineer

- Read `engineers/roster.md` to confirm PM engineer definition.
- Spawn PM engineer (`engineers/pm.md`).
- Task: Write PRD based on the brainstorming technical design document.
- Output: Structured PRD with user stories, acceptance criteria, priorities.
- **Approval Gate (Yellow)**: Submit PRD to CEO for review. Continue only after CEO approval.

#### 2. Spawn Architect Engineer

- Read `engineers/roster.md` to confirm Architect engineer definition.
- Spawn Architect engineer (`engineers/architect.md`).
- Task: Produce technical specification and architecture plan based on PRD.
- Output: Technical specification document, architecture decision records, component decomposition.
- **Approval Gate (Yellow)**: Submit architecture plan to CEO for review. Continue only after CEO approval.

#### 3. Atlas Breaks into Epics

- Based on PRD and technical specification, break down into independently executable Epics and tasks.
- Spawn Scrum Master engineer (`engineers/scrum-master.md`) to assist with breakdown if needed.
- Read `engineers/roster.md` to match each task with an appropriate engineer role.

## Completion Criteria

- [ ] Lean: Tasks broken down, each with description, acceptance criteria, expected output
- [ ] Full: PRD produced and passed CEO review (yellow gate)
- [ ] Full: Architecture plan produced and passed CEO review (yellow gate)
- [ ] Full: Epics and tasks fully broken down
- [ ] All tasks matched with appropriate engineer roles

## Next Step

👉 Proceed to [Step 4: Dispatch](./step-04-dispatch.md)
