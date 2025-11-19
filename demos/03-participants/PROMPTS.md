# Participants – Các "Chuyên Gia" trong Copilot

## TL;DR

**Participants** = các "chuyên gia" chuyên biệt trong Copilot:

| Participant | Chuyên về | Ví dụ |
|-------------|-----------|-------|
| **@workspace** | Codebase | "Where is auth implemented?" |
| **@terminal** | Shell commands | "How to grep in all files?" |
| **@vscode** | VS Code features | "Enable format on save?" |
| **@github** | GitHub repos/CI | "Find React testing libs" |

**Rule:**
> Tag đúng chuyên gia → câu trả lời đúng!

---

## 1. @terminal – Shell Commands Expert

**Dùng cho:**
- Giải thích commands
- Suggest commands
- Fix shell errors
- Explain output

**Ví dụ:**
```
@terminal What does this do? git rebase -i HEAD~3
@terminal How to find all .ts files modified in last 7 days?
@terminal I got error: "zsh: command not found: npm"
@terminal What's the difference between npm ci vs npm install?
```

**Best Practice:**
- ✅ Copy full error message
- ✅ Hỏi trước khi chạy command lạ
- ⚠️ Review trước khi chạy (đặc biệt `rm`, `sudo`)

---

## 2. @vscode – VS Code Features Expert

**Dùng cho:**
- Find settings
- Recommend extensions
- Show shortcuts
- Troubleshoot issues

**Ví dụ:**
```
@vscode How to enable auto-save?
@vscode What extensions for React development?
@vscode Shortcut to open terminal?
@vscode Why is IntelliSense not working?
```

**Best Practice:**
- ✅ Hỏi về productivity features
- ✅ Customize workflow
- ✅ Optimize settings

---

## 3. @github – GitHub Expert

**Dùng cho:**
- Search repos
- Explain PRs/issues
- Setup GitHub Actions
- Repo statistics

**Ví dụ:**
```
@github Find popular React component libraries
@github Summarize this PR: [URL]
@github Show GitHub Actions workflow for Next.js deployment
@github Most starred TypeScript projects?
```

**Best Practice:**
- ✅ Research before implementing
- ✅ Learn from popular repos
- ✅ Setup CI/CD

---

## 4. Kết Hợp Participants

**Nhiều participants cùng lúc:**
```
@workspace @terminal How to run tests for auth module?
@github Find React testing libraries
@workspace Which one fits our current setup?
```

---

## 5. Best Practices

### Chọn đúng participant
❌ `@github How to fix TypeScript error?`  
✅ `@workspace Why is this TypeScript error happening?`

### Không cần @ cho câu hỏi chung
```
How to use async/await?  ← Không cần @
@workspace How does this project handle async?  ← Cần @
```

### Review suggestions
- Participants vẫn là AI, có thể sai
- Đặc biệt cẩn thận với `@terminal` commands

---

## Demo Scenarios (để present)

### Demo 1: Join Project Mới
```
@workspace What is this project? Main features?
@workspace @terminal How to install and run locally?
@vscode What extensions should I install?
@workspace Where to start reading code?
```

### Demo 2: Debug Production Issue
```
@workspace Where is error logging configured?
@terminal How to check server logs?
@workspace Find function causing error
```

### Demo 3: Research & Implement
```
@github Find authentication libraries for React
@workspace Which one fits our architecture?
@terminal How to install and configure?
```

---

## Tóm Lại

| Participant | Khi Nào | Ví Dụ |
|-------------|---------|-------|
| @workspace | Code trong repo | "Where is X?" |
| @terminal | Shell commands | "How to grep?" |
| @vscode | VS Code | "Format on save?" |
| @github | Repos/CI/CD | "Find React libs" |

**Câu nhớ:**
> Tag đúng chuyên gia → trả lời đúng!
