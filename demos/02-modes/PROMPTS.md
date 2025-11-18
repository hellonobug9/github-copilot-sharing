# GitHub Copilot Modes và Chat Types

## TL;DR

**4 Modes:**
- **Ask** → Hỏi, giải thích, debug, snippet (⭐ token thấp)
- **Edit** → Sửa 1 đoạn/file cụ thể, có diff review (⭐⭐ token trung bình)
- **Agent** → Task lớn nhiều file, nửa tự động (⭐⭐⭐ token cao)
- **Plan** → Bẻ nhỏ task, lên kế hoạch (⭐⭐–⭐⭐⭐ tùy độ chi tiết)

**2 Chat Types:**
- **Chat View** (⌃⌘I) → Hỏi chung, tìm hiểu, best practices
- **Inline Chat** (⌘I) → Giải thích/sửa code ngay tại editor

**Rule of thumb:**
> Dùng mode nhỏ nhất đáp ứng được nhu cầu. Ask trước → Edit nếu cần → Agent nếu thực sự cần nhiều files.

---

## Phần 1: Chat View vs Inline Chat

### Chat View (⌃⌘I) – Sidebar chat window

**Khi nào dùng:**
- Hỏi về kiến thức, best practices, thư viện
- Tìm hiểu cách làm một việc gì đó
- Hỏi về architecture, patterns
- Cần câu trả lời dài, có giải thích

**Ưu điểm:**
- ✅ Không làm phiền editor
- ✅ Keep chat history
- ✅ Dễ copy-paste code từ answer
- ✅ Có thể attach files, @workspace

**Ví dụ:**
```
How do I implement debouncing in React?
What's the difference between useMemo and useCallback?
@workspace How is authentication implemented in this project?
Explain the Repository pattern and show me an example
```

---

### Inline Chat (⌘I) – Chat ngay trong editor

**Khi nào dùng:**
- Giải thích đoạn code đang select
- Refactor/modify code cụ thể
- Fix lỗi trong function
- Generate code dựa trên context xung quanh

**Ưu điểm:**
- ✅ Không rời editor
- ✅ Auto có context của selection + file
- ✅ Apply changes trực tiếp
- ✅ Review diff ngay tại chỗ

**Ví dụ workflow:**

1. **Select** function cần refactor
2. **⌘I** mở Inline Chat
3. Gõ prompt:
   ```
   Refactor this to be more readable. Keep behavior exactly the same.
   ```
4. Review diff → Accept hoặc Discard

---

### So sánh nhanh

| Khía cạnh | Chat View (⌃⌘I) | Inline Chat (⌘I) |
|-----------|-----------------|------------------|
| Vị trí | Sidebar | Trong editor |
| Context tự động | Không | Selection + file |
| Dùng cho | Hỏi kiến thức | Sửa code |
| Apply changes | Phải copy-paste | Direct apply |
| History | Có | Không |
| Attachment | Có (@workspace, #file) | Có (implicit selection) |

**Rule of thumb:**
- Câu hỏi về code cụ thể → **Inline Chat**
- Câu hỏi về kiến thức/best practice → **Chat View**

---

## Phần 2: 4 Modes của Copilot

### Mode là gì?

Trong Chat View, có 4 modes khác nhau:
- **Ask** – Hỏi đáp, giải thích
- **Edit** – Sửa code có kiểm soát
- **Agent** – Làm task lớn tự động
- **Plan** – Lập kế hoạch

Chọn mode bằng dropdown ở Chat View (góc trên bên trái).

---

## 1. Ask Mode

### Dùng để làm gì?

Mode **chat thông thường** để:
- Hỏi về code, lỗi, concepts
- Giải thích code
- Xin ví dụ, gợi ý
- Tìm hiểu cách làm

### Ưu điểm

- ⭐ **Token thấp nhất** (chỉ hỏi, không sửa code)
- Nhanh, ít side effect
- Hợp để onboard, debug, học

### Dùng cho

**Giải thích:**
```
Explain what this function does in simple terms
Explain this TypeScript error and how to fix it
What's the difference between Promise.all and Promise.allSettled?
```

**Hỏi cách làm:**
```
How do I debounce a search input in React?
Show me a simple example of React Query for GET and POST
What's the best way to handle form validation in Next.js?
```

**Tóm tắt:**
```
Summarize this file
List the responsibilities of this component
What are the main dependencies of this module?
```

**Debug:**
```
Why is this test failing?
What could cause this memory leak?
Help me understand this error: [paste error]
```

### Không nên dùng Ask cho

❌ **Task lớn cần thực thi:**
```
Refactor the whole project to TypeScript
Migrate this codebase to a new framework
```
→ Ask chỉ cho **advice**, không thực sự làm. Dùng Agent cho những việc này.

### Best Practice với Ask

1. **Hỏi cụ thể, có context:**
   ```
   ❌ How do I use React Query?
   ✅ How do I use React Query to fetch user data and handle loading/error states?
   ```

2. **Paste code nếu cần:**
   - Copy đoạn code vào chat
   - Hoặc dùng `#file`, `#selection`

3. **Dùng để chuẩn bị trước khi Edit/Agent:**
   - Hiểu code trước → sửa sau
   - Hỏi approach tốt nhất trước khi implement

4. **Yêu cầu ngắn gọn nếu cần:**
   ```
   Give me a shorter summary
   Explain in bullet points
   Show me just the code without explanation
   ```

---

## 2. Edit Mode

### Dùng để làm gì?

**Sửa/refactor** một đoạn code hoặc file cụ thể với **diff review**.

Workflow:
1. Chọn code (hoặc open file)
2. Mở Chat → chọn **Edit mode**
3. Gõ prompt mô tả thay đổi
4. Copilot suggest diff
5. Review → Accept/Reject

### Ưu điểm

- ⭐⭐ **Token trung bình** (1 file/đoạn)
- **Kiểm soát tốt** với diff review
- Hợp cho refactor, optimize từng phần

### Dùng cho

**Refactor:**
```
Refactor this function to be more readable
Extract this logic to a custom hook
Convert this to async/await
Split this component into smaller components
```

**Nâng chất lượng:**
```
Add proper error handling and logging
Add JSDoc comments for this API
Add TypeScript types to this file
Add input validation for this function
```

**Chuyển đổi:**
```
Convert this component from JavaScript to TypeScript
Convert this class component to functional component
Convert these callbacks to async/await
```

### Không nên dùng Edit cho

❌ **Chọn quá nhiều code:**
- File 1000+ dòng → khó review diff
- Better: Chia nhỏ, edit từng phần

❌ **Task multi-file:**
```
Refactor entire project using this pattern
```
→ Dùng Agent mode

### Best Practice với Edit

1. **Chia nhỏ:**
   - Edit từng function/component một
   - Dễ review, dễ revert

2. **Prompt rõ ràng:**
   ```
   Refactor this function to be more readable.
   Do not change the external behavior.
   Do not rename the function or its parameters.
   ```

3. **Review kỹ diff:**
   - Đọc từng dòng thay đổi
   - Ensure logic không đổi

4. **Test sau khi apply:**
   - Chạy tests
   - Chạy linter
   - Đảm bảo app vẫn hoạt động

---

## 3. Agent Mode

### Dùng để làm gì?

Mode "trợ lý tự động" cho **task lớn, multi-file**.

Agent có thể:
- Đọc nhiều files trong workspace
- Mở/đóng files
- Đề xuất và áp dụng nhiều thay đổi
- Chạy commands, install packages

### Ưu điểm

- ⭐⭐⭐ **Mạnh nhất** trong 4 modes
- Nhìn được big picture
- Giảm nhiều việc lặp lại

### Dùng cho

**Migration:**
```
Migrate this project from JavaScript to TypeScript step by step
Upgrade React Router v5 to v6 across the project
Convert all class components to functional components
```

**Dọn nợ kỹ thuật:**
```
Find all usages of this deprecated function and replace with new API
Remove all unused imports across the codebase
Refactor all API calls to use the new fetch wrapper
```

**Feature multi-file:**
```
Add a simple audit log system for all write operations
Implement i18n support across all user-facing text
Add error tracking with Sentry throughout the app
```

### Không nên dùng Agent cho

❌ **Task đơn giản:**
```
Rename this variable
Add a null check here
```
→ Lãng phí token, dùng Edit mode

❌ **Task mơ hồ:**
```
Make the code better
Improve performance everywhere
```
→ Agent không biết làm gì, tốn token vô ích

❌ **Task nguy hiểm không có tests:**
```
Change how authentication works everywhere
```
→ Rủi ro cao, khó rollback

### Best Practice với Agent

1. **Kết hợp với Plan mode:**
   - Dùng Plan trước để có roadmap
   - Dùng Agent để execute từng bước

2. **Giới hạn scope:**
   ```
   Only touch files in src/features/auth/
   Do not modify any test files
   Only update React components, not utility functions
   ```

3. **Review cẩn thận:**
   - Xem từng file thay đổi
   - Chạy tests sau mỗi batch
   - Commit từng phần, đừng commit tất cả 1 lúc

4. **Có backup:**
   - Commit code hiện tại trước khi dùng Agent
   - Hoặc tạo branch mới

---

## 4. Plan Mode

### Dùng để làm gì?

**Lập kế hoạch, bẻ nhỏ task** thay vì làm ngay.

Plan mode sẽ:
- Phân tích yêu cầu
- Đề xuất các bước cụ thể
- Giúp quyết định dùng mode nào cho từng bước

### Ưu điểm

- ⭐⭐–⭐⭐⭐ **Token tùy độ chi tiết**
- Giảm risk
- Cho dev control over approach

### Dùng cho

**Task mơ hồ:**
```
Help me plan a safe way to migrate API client from Axios to Fetch
Create a step-by-step plan to refactor this feature without breaking existing behavior
Plan how to introduce feature flags to this application
```

**Refactor roadmap:**
```
Plan how to extract this monolithic component into smaller components
Given this codebase, plan how to add TypeScript gradually
Plan a migration from Redux to Zustand
```

**Chuẩn bị cho Agent:**
```
Plan the steps to implement user authentication from scratch
Break down this feature request into implementable tasks
```

### Không nên dùng Plan cho

❌ **Task rất nhỏ:**
```
Rename this variable
Add a console.log here
```
→ Overkill, làm thẳng luôn

❌ **Muốn Plan + Execute cùng lúc:**
- Plan chỉ cho roadmap, không execute
- Tách: **Plan → Agent/Edit**

### Best Practice với Plan

1. **Yêu cầu output rõ ràng:**
   ```
   Give me a numbered list of steps
   For each step, indicate whether to use Ask/Edit/Agent mode
   Highlight potential risks for each step
   ```

2. **Review plan trước khi execute:**
   - Đọc kỹ từng bước
   - Adjust nếu cần
   - Bổ sung steps bị missing

3. **Execute từng bước một:**
   - Không làm hết plan 1 lúc
   - Làm step 1 → test → step 2 → test

4. **Update plan nếu gặp vấn đề:**
   - Plan ban đầu có thể không perfect
   - Adjust và continue

---

## Chọn Mode nào?

### Decision Tree

```
Task của bạn là gì?

├─ Chỉ cần hiểu/hỏi
│  └─ ✅ Ask mode
│
├─ Sửa 1 đoạn code/file
│  └─ ✅ Edit mode
│
├─ Task lớn nhiều files
│  ├─ Biết rõ cần làm gì
│  │  └─ ✅ Agent mode
│  │
│  └─ Chưa rõ approach
│     └─ ✅ Plan mode trước → Agent mode sau
│
└─ Task đơn giản 1-2 dòng
   └─ Dùng Inline Chat hoặc inline suggestions
```

### Ví dụ thực tế

| Task | Mode phù hợp | Lý do |
|------|-------------|-------|
| "Giải thích lỗi này" | Ask | Chỉ cần giải thích |
| "Refactor function này" | Edit | 1 function, cần review diff |
| "Add logging toàn bộ services" | Agent | Nhiều files |
| "Migrate React Router v5→v6" | Plan → Agent | Task lớn, cần roadmap |
| "Đổi tên biến" | Inline Chat | Quá nhỏ cho modes |
| "So sánh 2 approaches" | Ask | Cần advice, chưa implement |

---

## Demo Scenarios (để present)

### Demo 1: Chat View vs Inline Chat

**Scenario A: Dùng Chat View**

Mở Chat View → hỏi:
```
What's the best way to handle API errors in React?
```
→ Copilot giải thích approaches, cho examples

**Scenario B: Dùng Inline Chat**

1. Có function handle API call nhưng chưa có error handling
2. Select function → ⌘I
3. Prompt:
   ```
   Add proper error handling with try-catch and user-friendly error messages
   ```
4. Review diff → Accept

**So sánh:**
- Chat View: Học cách làm
- Inline Chat: Làm ngay

---

### Demo 2: Ask Mode

Hỏi trong Chat View (Ask mode):
```
@workspace How is user authentication implemented in this project?
```

Copilot sẽ:
- Scan codebase
- Tìm auth-related files
- Giải thích flow: login → token → API calls → logout

---

### Demo 3: Edit Mode

1. Mở file có function dài, phức tạp
2. Select function
3. Chat View → Edit mode
4. Prompt:
   ```
   Refactor this function:
   - Extract reusable logic to helper functions
   - Add better variable names
   - Keep behavior exactly the same
   ```
5. Review diff với nhiều changes
6. Accept → function sạch hơn

---

### Demo 4: Agent Mode vs Edit Mode

**Task: Add error handling to all API calls**

**Nếu dùng Edit mode:**
- Phải mở từng file
- Select từng function
- Edit từng cái một
- Tốn thời gian

**Nếu dùng Agent mode:**
```
Add try-catch error handling to all API calls in the src/api/ folder.
Log errors to console.error and show user-friendly messages.
```
→ Agent tự:
- Scan folder
- Mở từng file
- Thêm error handling
- Show tất cả changes

---

### Demo 5: Plan Mode → Agent Mode

**Task lớn:** "Migrate Redux to Zustand"

**Step 1: Plan**

Chat View → Plan mode:
```
Plan a safe migration from Redux to Zustand for this React app
```

Copilot đưa plan:
```
1. Install Zustand
2. Create Zustand store for one slice (e.g., user slice)
3. Replace Redux hooks with Zustand hooks in components using that slice
4. Test thoroughly
5. Repeat for remaining slices
6. Remove Redux dependencies
```

**Step 2: Execute với Agent**

Agent mode:
```
Execute step 2 of the plan: Create Zustand store for the user slice
```

→ Test → Continue step 3, 4, 5...

---

## So sánh tổng quan 4 Modes

| Mode | Token Cost | Control | Speed | Best For |
|------|-----------|---------|-------|----------|
| **Ask** | ⭐ Thấp | Full | Nhanh | Hỏi, học, debug |
| **Edit** | ⭐⭐ Trung | High | Trung | Refactor 1 file/đoạn |
| **Agent** | ⭐⭐⭐ Cao | Medium | Chậm | Task multi-file |
| **Plan** | ⭐⭐–⭐⭐⭐ Varies | Full | Nhanh | Roadmap cho task lớn |

---

## Best Practices Chung

### 1️⃣ Start small, scale up

- Ask trước để hiểu
- Edit cho changes nhỏ
- Agent khi thực sự cần nhiều files

### 2️⃣ Prompt rõ ràng

❌ Tệ:
```
Make this better
```

✅ Tốt:
```
Refactor this function to:
- Use async/await instead of promises
- Add error handling with try-catch
- Add JSDoc comments
- Keep the same function signature
```

### 3️⃣ Review mọi thay đổi

- Edit mode: Review diff
- Agent mode: Review từng file changed
- Đừng blind accept

### 4️⃣ Test sau mỗi change

- Chạy tests
- Manual test
- Check linter

### 5️⃣ Commit thường xuyên

- Commit sau mỗi successful change
- Dễ rollback nếu có vấn đề

### 6️⃣ Kết hợp modes

```
Ask → hiểu approach
Plan → lên roadmap
Agent → execute
Edit → fine-tune từng phần
```

---

## Tóm lại

### Chat Types

| Type | Shortcut | Dùng khi |
|------|----------|----------|
| **Chat View** | ⌃⌘I | Hỏi kiến thức, @workspace, keep history |
| **Inline Chat** | ⌘I | Sửa code ngay tại editor |

### Modes

| Mode | Token | Dùng khi |
|------|-------|----------|
| **Ask** | ⭐ | Hỏi, giải thích, học |
| **Edit** | ⭐⭐ | Sửa 1 file/đoạn |
| **Agent** | ⭐⭐⭐ | Task lớn nhiều files |
| **Plan** | ⭐⭐–⭐⭐⭐ | Lập roadmap |

**Câu nhớ:**
> Chat View cho kiến thức, Inline Chat cho code. Ask để hỏi, Edit để sửa, Agent cho task lớn, Plan trước khi làm!
