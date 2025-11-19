# Copilot Modes và Chat Types

## TL;DR

### 2 Chat Types

| Type | Shortcut | Dùng khi |
|------|----------|----------|
| **Chat View** | ⌃⌘I | Hỏi kiến thức, @workspace, keep history |
| **Inline Chat** | ⌘I | Sửa code tại chỗ, có context tự động |

### 4 Modes (trong Chat View)

| Mode | Token | Best For | Example |
|------|-------|----------|---------|
| **Ask** | ⭐ | Hỏi, hiểu, debug | "Explain this error" |
| **Edit** | ⭐⭐ | Sửa 1 file | "Refactor this function" |
| **Agent** | ⭐⭐⭐ | Multi-file | "Migrate JS to TS" |
| **Plan** | ⭐⭐~ | Roadmap | "Plan migration strategy" |

**Rule:**
> Code cụ thể → Inline Chat. Hỏi chung → Chat View.  
> Ask → Edit → Agent (chỉ khi thực sự cần nhiều files)

---

## 1. Chat View vs Inline Chat

| Khía cạnh | Chat View (⌃⌘I) | Inline Chat (⌘I) |
|-----------|-----------------|------------------|
| Vị trí | Sidebar | Trong editor |
| Context tự động | Không | Selection + file |
| Dùng cho | Hỏi kiến thức | Sửa code |
| Apply changes | Copy-paste | Direct apply |
| History | ✅ | ❌ |
| Attachment | @workspace, #file | Implicit selection |

### Ví dụ

**Chat View:**
```
@workspace How is authentication implemented?
What's the difference between useMemo and useCallback?
```

**Inline Chat:**
1. Select function
2. ⌘I → "Refactor to be more readable"
3. Review diff → Accept

---

## 2. 4 Modes Chi Tiết

### Ask Mode ⭐

**Dùng cho:**
- Giải thích code/errors
- Hỏi best practices
- Debug, tìm hiểu cách làm

**Ví dụ:**
```
Explain this TypeScript error
How do I debounce a search input in React?
@workspace Where is the API client configured?
```

**Không dùng cho:**
- ❌ Task cần thực thi code (→ Edit/Agent)

---

### Edit Mode ⭐⭐

**Dùng cho:**
- Refactor 1 file/function
- Add types, error handling
- Convert code (class → functional, JS → TS)

**Workflow:**
1. Select code/file
2. Edit mode → gõ prompt
3. Review diff → Accept/Reject

**Ví dụ:**
```
Refactor this function to be more readable
Add proper error handling and logging
Convert this to async/await
```

**Best Practice:**
- Chia nhỏ, edit từng phần
- Prompt rõ ràng (keep behavior, don't rename...)
- Review kỹ diff, test sau khi apply

---

### Agent Mode ⭐⭐⭐

**Dùng cho:**
- Task multi-file (migration, refactor toàn bộ)
- Dọn nợ kỹ thuật (remove unused, update deprecated APIs)
- Feature cần touch nhiều files

**Ví dụ:**
```
Migrate this project from JavaScript to TypeScript
Convert all class components to functional components
Add error tracking with Sentry throughout the app
```

**Best Practice:**
- Kết hợp Plan mode trước
- Giới hạn scope (only src/features/auth/)
- Review cẩn thận, commit từng phần
- Có backup (commit/branch trước)

**Không dùng cho:**
- ❌ Task đơn giản (→ Edit)
- ❌ Task mơ hồ ("make code better")
- ❌ Task nguy hiểm không có tests

---

### Plan Mode ⭐⭐–⭐⭐⭐

**Dùng cho:**
- Lập roadmap cho task lớn
- Task mơ hồ cần break down
- Chuẩn bị cho Agent mode

**Ví dụ:**
```
Plan a safe migration from Axios to Fetch
Plan how to add TypeScript gradually
Break down this feature request into implementable tasks
```

**Workflow:**
1. Plan mode → Copilot đưa numbered steps
2. Review plan, adjust nếu cần
3. Execute từng bước với Edit/Agent
4. Test sau mỗi step

---

## 3. Chọn Mode Nào?

### Decision Tree

```
├─ Chỉ hỏi/hiểu → Ask
├─ Sửa 1 file/đoạn → Edit
├─ Task lớn nhiều files
│  ├─ Biết rõ làm gì → Agent
│  └─ Chưa rõ → Plan → Agent
└─ Task 1-2 dòng → Inline Chat
```

### Ví dụ Thực Tế

| Task | Mode |
|------|------|
| "Giải thích lỗi này" | Ask |
| "Refactor function này" | Edit |
| "Add logging toàn bộ services" | Agent |
| "Migrate React Router v5→v6" | Plan → Agent |
| "Đổi tên biến" | Inline Chat |

---

## Demo Scenarios (để present)

### Demo 1: Chat View vs Inline Chat
- Chat View: "What's the best way to handle API errors?" → Học cách
- Inline Chat: Select function → ⌘I → "Add error handling" → Làm ngay

### Demo 2: Ask Mode
```
@workspace How is user authentication implemented?
```
→ Copilot scan codebase, giải thích flow

### Demo 3: Edit Mode
1. Select function phức tạp
2. Edit mode → "Refactor: extract helpers, better names"
3. Review diff → Accept

### Demo 4: Agent vs Edit
**Task: Add error handling to all API calls**
- Edit: Mở từng file, edit từng function (chậm)
- Agent: "Add try-catch to all API calls in src/api/" (auto)

### Demo 5: Plan → Agent
1. Plan: "Plan migration from Redux to Zustand" → Get numbered steps
2. Agent: "Execute step 2 of the plan" → Implement từng bước

---

## Best Practices

1. **Start small, scale up:** Ask → Edit → Agent
2. **Prompt rõ ràng:** "Refactor to async/await, add error handling, keep signature"
3. **Review mọi thay đổi:** Đừng blind accept
4. **Test sau mỗi change:** Tests, linter, manual test
5. **Commit thường xuyên:** Dễ rollback
6. **Kết hợp modes:** Ask → Plan → Agent → Edit

---

## Tóm Lại

| Mode | Token | Dùng khi |
|------|-------|----------|
| **Ask** | ⭐ | Hỏi, giải thích, học |
| **Edit** | ⭐⭐ | Sửa 1 file/đoạn |
| **Agent** | ⭐⭐⭐ | Task lớn nhiều files |
| **Plan** | ⭐⭐–⭐⭐⭐ | Lập roadmap |

**Câu nhớ:**
> Chat View cho kiến thức, Inline Chat cho code. Ask để hỏi, Edit để sửa, Agent cho task lớn, Plan trước khi làm!
