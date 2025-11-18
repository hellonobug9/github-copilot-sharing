# GitHub Copilot Sharing - AI Agent Instructions

This repository contains educational materials and demonstrations for teaching GitHub Copilot features and best practices. All content is in **Vietnamese**.

## Repository Structure

```
demos/
├── 01-context/              # ⭐ Workspace context, @workspace vs #codebase, indexing
├── 02-modes/                # ⭐ Ask/Edit/Agent/Plan modes + Chat View vs Inline Chat
├── 03-participants/         # @terminal, @vscode, @github participants
├── 04-inline-suggestions/   # Tab completion, ghost text, acceptance strategies
├── 05-smart-actions/        # Commit messages, fix errors, generate docs/tests
├── 06-custom-instructions/  # .github/copilot-instructions.md customization
├── 07-testing-debugging/    # Generate tests, debug with Copilot
└── 08-model-picker/         # Claude vs GPT-4o vs o1-preview/mini selection
```

Each demo folder contains:
- `PROMPTS.md` - Teaching materials in Vietnamese (TL;DR, examples, best practices)
- `index.ts` - Sample code placeholders for live demonstrations (often empty)
- `README.md` - Optional deeper explanations (only when needed)

## Content Philosophy

### Core Teaching Principle (from `TIPS.md`)
Vietnamese: "Đừng đưa một prompt siêu to. Hãy chia bài toán lớn thành nhiều bài toán nhỏ, rồi đưa cho Copilot xử lý từng phần."

**Translation**: Don't give giant prompts. Break large problems into smaller ones and let Copilot handle each part.

## Key Concepts Overview

### 1. Context System (`01-context/`)
- **Workspace indexing**: Remote (GitHub) > Local (< 2500 files) > Basic (fallback)
- **`@workspace`**: Participant for repo-wide queries ("Where is auth implemented?")
- **`#codebase`**: Reference to include codebase patterns in any prompt

### 2. Modes & Chat Types (`02-modes/`)
**Modes:**
| Mode | Token Cost | Use For |
|------|-----------|---------|
| Ask | ⭐ Low | Questions, explanations |
| Edit | ⭐⭐ Medium | Refactor 1 file/section |
| Agent | ⭐⭐⭐ High | Multi-file tasks |
| Plan | ⭐⭐–⭐⭐⭐ Varies | Break down complex tasks |

**Chat Types:**
- **Chat View** (⌃⌘I): General queries, keep history
- **Inline Chat** (⌘I): Edit code directly in editor

**Key principle**: Use minimal mode needed. Ask → Edit → Agent (only if truly multi-file).

### 3. Participants (`03-participants/`)
- **`@terminal`**: Shell commands, explain errors
- **`@vscode`**: VS Code settings, extensions, shortcuts
- **`@github`**: Search repos, GitHub Actions, PRs

### 4. Inline Suggestions (`04-inline-suggestions/`)
- **Tab**: Accept all
- **Ctrl + →**: Accept word-by-word
- **Alt + ]**: Next suggestion
- **Best practice**: Clear comments + meaningful names → better suggestions

### 5. Smart Actions (`05-smart-actions/`)
No chat needed, just click:
- Generate commit messages (✨ icon in Git)
- Fix errors (💡 Quick Fix)
- Generate docs (`/**` + Enter)
- Generate tests (Context menu)

### 6. Custom Instructions (`06-custom-instructions/`)
Create `.github/copilot-instructions.md` to teach Copilot:
- Team conventions
- Architecture rules
- Security patterns
- Project-specific patterns

### 7. Testing & Debugging (`07-testing-debugging/`)
- Generate tests from implementation
- TDD: Write tests first → Copilot suggests implementation
- Debug: Paste error → Ask Copilot explain + fix

### 8. Model Selection (`08-model-picker/`)
| Model | Speed | Best For |
|-------|-------|----------|
| Claude 3.5 Sonnet | ⚡ Fast | Daily coding (default) |
| GPT-4o | ⚡ Fast | Explanations, docs |
| o1-preview | 🐢 Slow | Complex algorithms, design |
| o1-mini | ⚡⚡ Medium | Quick debugging |

## Demo Teaching Structure

### Priority Sequence (for presentations)
**Foundation (must teach):**
1. `01-context/` - Understanding workspace context
2. `02-modes/` - When to use which mode

**Daily Productivity:**
3. `04-inline-suggestions/` - Fastest way to code
4. `05-smart-actions/` - No-chat productivity boost
5. `03-participants/` - Specialized experts

**Advanced:**
6. `06-custom-instructions/` - Team/project customization
7. `07-testing-debugging/` - Quality assurance
8. `08-model-picker/` - Optimization

### Consistent Format in PROMPTS.md
```markdown
# Title

## TL;DR
[Quick summary with table/bullets]

**Rule of thumb:**
> [One sentence to remember]

---

## 1. [Concept Name]
[Explanation]

### Ví dụ
[Vietnamese examples with code]

### Best Practices
✅ DO: [Good practices]
⚠️ DON'T: [Anti-patterns]

---

## Demo Scenarios (để present)
[Step-by-step demo instructions]

---

## Tóm lại
[Summary table]

**Câu nhớ:**
> [Memorable Vietnamese phrase]
```

## Best Practices for AI Agents

### Content Guidelines
1. **Vietnamese only** for teaching materials (PROMPTS.md)
2. **Code examples in English** (industry standard)
3. **Keep explanations practical** - focus on daily work scenarios
4. **Include concrete examples** - not just theory

### Structure Guidelines
1. **TL;DR at top** - busy people need quick reference
2. **"Rule of thumb"** - one-sentence decision rule
3. **Tables for comparisons** - visual clarity
4. **Demo scenarios** - step-by-step for presenters
5. **"Câu nhớ"** - memorable Vietnamese phrase at end

### When Editing
1. **Respect Vietnamese tone** - conversational, not academic
2. **Maintain consistency** across demos (format, terminology)
3. **Test prompts work** before documenting
4. **Keep demos simple** - placeholder code only

### Token Efficiency (Meta)
Following our own teaching:
- Small edits → Edit mode
- Multiple related changes → Agent mode
- New demos → Plan first, then implement
- Use `#codebase` to maintain consistency

## Common Tasks

| Task | Location | Notes |
|------|----------|-------|
| Add new demo | Create `demos/09-xxx/PROMPTS.md` | Follow format, update this file |
| Update concepts | Modify specific `PROMPTS.md` | Keep Vietnamese, add examples |
| Fix examples | Edit code blocks in PROMPTS.md | Ensure they work |
| Add teaching tips | Add to "Demo Scenarios" section | Step-by-step format |

## Quick Reference

**Teaching sequence**: 01 → 02 → 04 → 05 → 03 → 06 → 07 → 08

**Core message**: Break problems small, use minimal tools, understand context, iterate often

**Target audience**: Vietnamese developers learning GitHub Copilot for daily productivity
