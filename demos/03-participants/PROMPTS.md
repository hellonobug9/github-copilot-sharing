# Participants – Các "Chuyên Gia" trong Copilot

## TL;DR

**Participants** = các "chuyên gia" chuyên biệt trong Copilot Chat:
- **`@workspace`** → Chuyên gia về codebase (đã học ở Demo 01)
- **`@terminal`** → Chuyên gia về terminal commands
- **`@vscode`** → Chuyên gia về VS Code (settings, extensions, shortcuts)
- **`@github`** → Chuyên gia về GitHub (repos, issues, PRs)

**Rule of thumb:**
> Có dấu @ → đang gọi một chuyên gia vào chat!

---

## 1. Participants là gì?

Hiểu đơn giản:

**Participant** = một AI "chuyên gia" được train để trả lời câu hỏi về 1 domain cụ thể.

Khi bạn tag `@participant` trong chat:
- Copilot chuyển câu hỏi cho "chuyên gia" đó
- Chuyên gia có context và tools riêng để trả lời tốt hơn

Giống như trong team:
- Hỏi về database → tag @database-expert
- Hỏi về frontend → tag @frontend-expert
- Hỏi về devops → tag @devops-expert

Trong Copilot:
- Hỏi về codebase → `@workspace`
- Hỏi về terminal → `@terminal`
- Hỏi về VS Code → `@vscode`
- Hỏi về GitHub → `@github`

---

## 2. `@terminal` – Terminal Expert

### Dùng để làm gì?

Chuyên gia về **shell commands, terminal operations**.

**Capabilities:**
- Giải thích commands
- Suggest command phù hợp
- Fix shell errors
- Explain command output

### Ví dụ sử dụng

#### Giải thích commands

```
@terminal What does this command do?
git rebase -i HEAD~3
```

Copilot giải thích:
- Interactive rebase
- Chỉnh sửa 3 commits gần nhất
- Options: pick, squash, reword, drop, etc.

---

#### Suggest command phù hợp

```
@terminal How do I find all TypeScript files modified in the last 7 days?
```

Copilot suggest:
```bash
find . -name "*.ts" -mtime -7
# Hoặc dùng git:
git log --since="7 days ago" --name-only --pretty=format: | grep "\.ts$" | sort -u
```

---

#### Fix shell errors

```
@terminal I got this error: "zsh: command not found: npm"
How to fix?
```

Copilot suggest:
- Check if Node.js installed: `node --version`
- Install Node.js/npm nếu chưa có
- Check PATH: `echo $PATH`
- Reload shell: `source ~/.zshrc`

---

#### Explain command output

```
@terminal What does this output mean?
[paste terminal output]
```

Copilot phân tích output và giải thích.

---

### Best Practices với `@terminal`

✅ **DO: Copy error messages vào**

```
@terminal I got this error when running npm install:
[paste full error]
```
→ Copilot sẽ diagnose và suggest fix

---

✅ **DO: Hỏi trước khi chạy command lạ**

```
@terminal Is this command safe to run?
rm -rf node_modules/.cache
```
→ Tránh phá repo

---

✅ **DO: Ask for alternatives**

```
@terminal What's the difference between these commands?
npm ci vs npm install
```

---

⚠️ **DON'T: Run suggested commands blindly**

- Review command trước khi chạy
- Đặc biệt với `rm`, `sudo`, `curl | sh`

---

### Demo Scenarios

**Demo 1: Giải thích git command phức tạp**

```
@terminal Explain this git command step by step:
git log --graph --oneline --decorate --all
```

---

**Demo 2: Tìm command để làm X**

```
@terminal How do I compress a folder to .tar.gz?
```

→ Copilot suggest: `tar -czf archive.tar.gz folder_name/`

---

**Demo 3: Debug shell script error**

```
@terminal Why is this bash script failing?
[paste script and error]
```

---

## 3. `@vscode` – VS Code Expert

### Dùng để làm gì?

Chuyên gia về **VS Code: settings, extensions, shortcuts, features**.

**Capabilities:**
- Explain VS Code features
- Find settings
- Recommend extensions
- Show shortcuts
- Troubleshoot VS Code issues

### Ví dụ sử dụng

#### Tìm settings

```
@vscode How do I enable auto-save?
```

Copilot suggest:
```
Settings → "Files: Auto Save" → Set to "afterDelay"
Hoặc trong settings.json:
"files.autoSave": "afterDelay"
```

---

#### Recommend extensions

```
@vscode What extensions should I install for React development?
```

Copilot suggest:
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier
- Auto Rename Tag
- ...

---

#### Show shortcuts

```
@vscode What's the shortcut to open integrated terminal?
```

Copilot answer:
- macOS: `⌃` + `` ` ``
- Windows/Linux: `Ctrl` + `` ` ``

---

#### Troubleshoot issues

```
@vscode Why is IntelliSense not working for my TypeScript project?
```

Copilot suggest checks:
- TypeScript extension enabled?
- `tsconfig.json` present?
- Workspace trust enabled?
- Reload window

---

### Best Practices với `@vscode`

✅ **DO: Hỏi về features ít biết**

```
@vscode What are the best features of VS Code for productivity?
```

→ Learn about Timeline view, Breadcrumbs, Zen mode, etc.

---

✅ **DO: Customize workflow**

```
@vscode How do I create a custom keyboard shortcut?
```

---

✅ **DO: Optimize settings**

```
@vscode What settings should I change for better performance?
```

---

### Demo Scenarios

**Demo 1: Tìm setting cho format on save**

```
@vscode How do I auto-format code on save?
```

→ `"editor.formatOnSave": true`

---

**Demo 2: Recommend extensions for task**

```
@vscode I'm working with Markdown files. What extensions help?
```

→ Markdown All in One, Markdown Preview Enhanced, etc.

---

**Demo 3: Troubleshoot extension conflict**

```
@vscode Two extensions are conflicting. How do I debug?
```

→ Disable one by one, check Extension Bisect feature

---

## 4. `@github` – GitHub Expert

### Dùng để làm gì?

Chuyên gia về **GitHub: repos, issues, PRs, actions**.

**Capabilities:**
- Search GitHub repos
- Explain PRs/issues
- Suggest GitHub Actions workflows
- Repo statistics

### Ví dụ sử dụng

#### Search repos

```
@github Find popular React component libraries on GitHub
```

Copilot list:
- Material-UI
- Ant Design
- Chakra UI
- ...

---

#### Explain PR/Issue

```
@github Summarize this pull request: [URL]
```

Copilot đọc PR và tóm tắt:
- Changes made
- Files affected
- Purpose

---

#### Suggest GitHub Actions

```
@github Show me a GitHub Actions workflow for deploying Next.js to Vercel
```

Copilot generate workflow YAML.

---

#### Repo statistics

```
@github What are the most starred TypeScript projects?
```

---

### Best Practices với `@github`

✅ **DO: Research before implementing**

```
@github Find libraries for handling authentication in React
```

→ Compare options trước khi chọn

---

✅ **DO: Learn from popular repos**

```
@github How does [famous-repo] handle error boundaries?
```

---

✅ **DO: Setup CI/CD**

```
@github Show me a GitHub Actions workflow for running tests on PR
```

---

### Demo Scenarios

**Demo 1: Tìm similar projects**

```
@github Find open source projects similar to Notion
```

---

**Demo 2: Setup GitHub Actions**

```
@github Create a workflow to lint and test on every push
```

---

**Demo 3: Research best practices**

```
@github How do popular Next.js projects structure their folders?
```

---

## 5. So sánh các Participants

| Participant | Chuyên về | Ví dụ câu hỏi |
|-------------|-----------|---------------|
| **@workspace** | Codebase hiện tại | "Where is authentication implemented?" |
| **@terminal** | Shell commands | "How do I grep for a string in all files?" |
| **@vscode** | VS Code features | "How do I enable Vim mode?" |
| **@github** | GitHub repos/features | "Find popular React hooks libraries" |

---

## 6. Kết hợp nhiều Participants

Có thể dùng nhiều participants trong 1 prompt:

### Ví dụ 1: `@workspace` + `@terminal`

```
@workspace @terminal How do I run the tests for the authentication module?
```

→ `@workspace` tìm test files
→ `@terminal` suggest command: `npm test -- auth.test.ts`

---

### Ví dụ 2: `@github` + `@workspace`

```
@github Find React testing libraries
@workspace Which one would fit best with our current setup?
```

---

## 7. Best Practices Chung

### 1️⃣ Chọn đúng participant cho câu hỏi

❌ Tệ:
```
@github How do I fix this TypeScript error?
```
→ `@github` không phải chuyên gia về TypeScript errors

✅ Tốt:
```
@workspace Why is this TypeScript error happening?
```

---

### 2️⃣ Không cần participant cho mọi câu hỏi

Nếu câu hỏi chung chung:
```
How do I use async/await in JavaScript?
```
→ Không cần `@...`, Copilot tự trả lời được

Nếu câu hỏi specific:
```
@workspace How does this project handle async operations?
```

---

### 3️⃣ Kết hợp participant với context khác

```
@terminal How do I run #file in watch mode?
```

```
@vscode Show me settings for #selection syntax highlighting
```

---

### 4️⃣ Participant không phải magic

- Vẫn là AI, có thể sai
- Review suggestions trước khi apply
- Đặc biệt với `@terminal` commands

---

## 8. Tình huống thực tế

### Tình huống 1: Setup dự án mới

```
Step 1: @github Find popular Next.js starter templates
Step 2: @terminal Clone and setup the chosen template
Step 3: @workspace Explain the project structure
Step 4: @vscode Recommend extensions for this stack
```

---

### Tình huống 2: Debug production issue

```
Step 1: @workspace Where is the error logging configured?
Step 2: @terminal How do I check logs on the server?
Step 3: @workspace Find the function causing the error
Step 4: Ask mode to understand the bug
```

---

### Tình huống 3: Learn new codebase

```
Step 1: @workspace Give me an overview of this project
Step 2: @workspace Where is the main entry point?
Step 3: @workspace How is routing configured?
Step 4: @terminal How do I run this locally?
```

---

## Demo Script (để present)

### Demo Full Workflow: Setup + Run + Debug

**Scenario:** Join một project mới, chưa biết gì

#### Step 1: Understand project

```
@workspace What is this project about? What are the main features?
```

---

#### Step 2: Setup instructions

```
@workspace @terminal How do I install dependencies and run this locally?
```

→ Copilot:
```bash
npm install
npm run dev
```

---

#### Step 3: VS Code setup

```
@vscode What extensions should I install for this project?
```

→ Copilot suggest based on `package.json`, file types

---

#### Step 4: Explore codebase

```
@workspace Where should I start reading the code?
```

→ Points to main entry, key modules

---

#### Step 5: Run into error

```
@terminal I got this error: [paste error]
How to fix?
```

→ Copilot suggest fix

---

#### Step 6: Learn more

```
@github Are there similar projects I can learn from?
```

---

## Tóm lại

| Participant | Gọi khi nào | Ví dụ |
|-------------|-------------|-------|
| **@workspace** | Hỏi về code trong repo | "Where is X implemented?" |
| **@terminal** | Cần shell command/fix error | "How to grep in files?" |
| **@vscode** | Hỏi về VS Code | "How to enable format on save?" |
| **@github** | Research repos/setup CI/CD | "Find React libraries" |

**Câu nhớ:**
> Mỗi participant là một chuyên gia. Tag đúng người, được câu trả lời đúng!
