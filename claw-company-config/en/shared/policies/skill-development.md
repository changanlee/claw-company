# Skill Development and Approval Process

## What is a Skill

A Skill is an executable capability module for an Agent (defined as SKILL.md in the skills/ directory), enabling the Agent to handle specific task types. Examples: CFO's bookkeeping Skill, CIO's portfolio monitoring Skill.

## New Skill Proposal

### Trigger Sources

- CHRO weekly review discovers capability gaps (recurring task failures or no dedicated Skill)
- CAO audit discovers process deficiencies requiring new Skill reinforcement
- CEO raises requirements based on Chairman's instructions
- Chairman directly requests

### Proposal Format

```
Skill Name: <skill-name>
Target Agent: <agent-id>
Problem Solved: <describe the capability gap or requirement>
Functionality: <what the Skill does, how it is triggered>
Input/Output: <expected input format and output results>
Dependencies: <required tools or external services>
Estimated Token Cost Impact: <estimated consumption per execution>
```

## Approval Process

| Phase | Owner | Description |
|-------|-------|-------------|
| Proposal | CHRO / CAO / CEO | Propose Skill requirements and specifications |
| Drafting | CHRO | Write SKILL.md draft |
| Technical Review | CTO | Confirm technical feasibility, security, compatibility with existing architecture |
| Compliance Review | CAO | Confirm Skill does not violate security red lines or approval authority |
| Approval | CEO | Yellow-light approval (standard Skills) |
| Final Approval | Chairman | Red-light approval (Skills involving external API integration, payment operations, or high cost) |

## Deployment

1. CHRO places the approved SKILL.md into the corresponding skills/ directory
2. Notify the target Agent that the new Skill is ready
3. Record in policies/changelog.md (tier-2 notification)

## Modifying Existing Skills

- Modifying a deployed Skill follows the same approval process as creating a new one
- Exception: Pure text revisions (no functional logic changes) can be done directly by CHRO with tier-3 notification

## Deactivating / Removing Skills

- CHRO discovers during weekly review that a Skill has not been used for over 30 days
- Propose deactivation → CEO approves → Archive SKILL.md → Record in changelog.md
