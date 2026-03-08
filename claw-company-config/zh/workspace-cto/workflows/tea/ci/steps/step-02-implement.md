---
name: step-02-implement
description: "建立 CI 配置"
next-step: ./step-03-verify.md
output-file: null
template: null
---

# 步驟 2：建立 CI 配置

**進度：步驟 2 / 共 3 步** — 下一步：驗證管線運作

## 目標

根據閘門設計，建立 CI/CD 配置檔案。

## 執行規則

- 📖 讀完整個步驟檔案再開始行動
- 🚫 不預讀後續步驟
- 🚫 不跳步、不合併步驟

## 執行指令

### 1. 識別 CI 平台

確認專案使用的 CI/CD 平台：

- GitHub Actions（`.github/workflows/`）
- GitLab CI（`.gitlab-ci.yml`）
- 其他（CircleCI、Jenkins 等）

### 2. 建立 PR 檢查 Workflow

建立 PR 觸發的 CI 配置：

```yaml
# 觸發條件：PR 建立或更新
# 步驟：checkout → install → lint → type-check → test:unit → coverage check
```

- 配置快取（node_modules / pip cache）
- 配置覆蓋率門檻
- 配置狀態 badge

### 3. 建立 Staging 部署 Workflow

建立合併到開發分支的 CI 配置：

```yaml
# 觸發條件：push to develop/staging
# 步驟：checkout → install → test:all → build → deploy → smoke-test
```

- 配置環境變數和 secrets
- 配置部署步驟
- 配置安全掃描

### 4. 建立 Production 部署 Workflow

建立 production 部署的 CI 配置：

```yaml
# 觸發條件：push to main / release tag
# 步驟：checkout → install → test:all → build → deploy → smoke-test
```

- 配置手動審批（如需要）
- 配置回滾機制
- 配置通知

### 5. 配置共用設定

建立共用的 CI 配置元素：

- 共用的環境變數
- 可重用的 workflow / job
- 矩陣策略（多版本測試）

## 完成條件

- ✅ PR 檢查 workflow 已建立
- ✅ Staging 部署 workflow 已建立
- ✅ Production 部署 workflow 已建立
- ✅ 共用設定已配置

## 下一步

確認完成條件滿足後，讀取並遵循：`./step-03-verify.md`
