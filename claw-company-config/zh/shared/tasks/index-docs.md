# 建立索引

## 目的

掃描指定目錄下的所有 markdown 檔案，生成或更新 index.md 索引。

## 執行方式

1. 列出目錄下所有 .md 檔案（排除 index.md 本身）。
2. 讀取每個檔案的標題（第一個 # 標題）和 frontmatter。
3. 生成 index.md：

```markdown
# {目錄名稱} 索引

| 檔案 | 標題 | 類型 | 最後更新 |
|------|------|------|---------|
| [filename.md](./filename.md) | {標題} | {type} | {date} |
```
