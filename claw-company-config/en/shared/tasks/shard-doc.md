# Shard Document

## Purpose

Split a large markdown file into independent smaller files by second-level headings (##), and build an index.

## How to Execute

1. **Read the target file** — Analyze its heading structure.

2. **Splitting strategy:**
   - Default split by `##` (second-level headings), each becoming an independent file
   - Filenames derived from kebab-case conversion of the heading
   - Preserve the original file's frontmatter into index.md

3. **Build index** — Create an index.md in the same directory, linking to each split file.

4. **Execute the split** — Use the write tool to create files, use the edit tool to replace the original file with the index.
