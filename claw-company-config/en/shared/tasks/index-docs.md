# Build Index

## Purpose

Scan all markdown files in a specified directory and generate or update an index.md.

## How to Execute

1. List all .md files in the directory (excluding index.md itself).
2. Read each file's title (the first # heading) and frontmatter.
3. Generate index.md:

```markdown
# {Directory Name} Index

| File | Title | Type | Last Updated |
|------|-------|------|-------------|
| [filename.md](./filename.md) | {title} | {type} | {date} |
```
