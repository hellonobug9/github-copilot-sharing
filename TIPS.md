# Tips Sử Dụng GitHub Copilot Hiệu Quả

## Nguyên tắc vàng

**Đừng đưa một prompt siêu to. Hãy chia bài toán lớn thành nhiều bài toán nhỏ, rồi đưa cho Copilot xử lý từng phần.**

---

## Quick Decision Guide

### Chọn tool phù hợp

```
Đang làm gì?

├─ Đang gõ code
│  └─ ✅ Inline Suggestions (Tab)
│
├─ Cần sửa đoạn code này
│  └─ ✅ Inline Chat (⌘I)
│
├─ Hỏi về kiến thức / best practices
│  └─ ✅ Chat View - Ask mode (⌃⌘I)
│
├─ Cần refactor 1 file
│  └─ ✅ Chat View - Edit mode
│
├─ Task lớn nhiều files
│  ├─ Chưa rõ cách làm → Plan mode trước
│  └─ Đã rõ cách làm → Agent mode
│
└─ Công việc lặp lại (commit msg, generate docs)
   └─ ✅ Smart Actions (right-click)
```

---

## Tips theo tình huống

### 🎯 Khi viết code mới

1. **Viết comment rõ ràng** → Tab accept suggestion
2. **Đặt tên function có ý nghĩa** → Copilot hiểu intent
3. **Viết types/interfaces trước** → Suggestions chính xác hơn

```typescript
// ❌ Tệ
function calc(a, b) {

// ✅ Tốt
// Calculate total price including 10% tax and apply discount
function calculateTotalWithTax(price: number, discountRate: number): number {
```

---

### 🔍 Khi tìm hiểu codebase

1. **Build index** ngay khi mở repo mới
2. **Dùng `@workspace`** để hỏi về architecture
3. **Hỏi từng phần**, không hỏi "explain everything"

```
✅ Tốt:
@workspace Where is the user authentication logic implemented?
@workspace How does the payment processing flow work?

❌ Tệ:
@workspace Explain the entire codebase
```

---

### 🛠️ Khi refactor code

1. **Ask mode trước** để hiểu approach
2. **Edit mode** để refactor từng phần nhỏ
3. **Review diff cẩn thận** trước khi accept
4. **Chạy tests** sau mỗi change

```
Step 1: Ask "What's the best way to refactor this?"
Step 2: Edit từng function một
Step 3: Test
Step 4: Commit
```

---

### 🐛 Khi debug

1. **Copy full error message** + stack trace
2. **Ask Copilot explain** trước khi fix
3. **Understand root cause** rồi mới implement fix

```
❌ Tệ:
"Fix this error"

✅ Tốt:
"Explain this error and suggest fixes:
[paste full error + code context]"
```

---

### ✅ Khi viết tests

1. **Generate tests từ implementation** (nhanh)
2. **Hoặc TDD**: Viết tests trước → Copilot suggest implementation
3. **Review generated tests** - thêm edge cases

```
// Generate tests:
Select function → Right-click → Generate Tests

// TDD:
Write test cases → Copilot suggests impl to pass tests
```

---

### 👥 Khi làm team

1. **Tạo `.github/copilot-instructions.md`** cho project conventions
2. **Commit instructions vào repo** - cả team dùng chung
3. **Update instructions** khi conventions thay đổi

---

## Tips tăng tốc độ

### ⚡ Shortcuts quan trọng

| Action | Shortcut | Khi nào dùng |
|--------|----------|--------------|
| Inline Chat | `⌘I` | Sửa code tại chỗ |
| Chat View | `⌃⌘I` | Hỏi chung chung |
| Accept suggestion | `Tab` | Suggestion đúng |
| Accept từng từ | `Ctrl + →` | Muốn customize |
| Next suggestion | `Alt + ]` | Xem alternatives |
| Quick Fix | `⌘.` | Fix lỗi nhanh |
| Rename | `F2` | Đổi tên an toàn |

---

### 🎨 Patterns viết prompt tốt

**✅ Cụ thể > Chung chung**
```
❌ "Make this better"
✅ "Refactor this function to use async/await and add error handling"
```

**✅ Có context > Không context**
```
❌ "Create a user component"
✅ "Create a user profile card component similar to #codebase existing components"
```

**✅ Chia nhỏ > Prompt to**
```
❌ "Build a complete authentication system with JWT, refresh tokens, password reset, email verification, and OAuth"

✅ Step-by-step:
1. "Create JWT token generation and validation"
2. "Add refresh token logic"
3. "Implement password reset flow"
...
```

---

## Token efficiency tips

### Giảm token consumption

1. **Dùng mode nhỏ nhất phù hợp**
   - Ask (⭐) < Edit (⭐⭐) < Agent (⭐⭐⭐)

2. **Inline suggestions không tốn chat tokens**
   - Ưu tiên Tab completion trước

3. **Chọn model phù hợp**
   - 80% tasks: Claude 3.5 Sonnet
   - Explain: GPT-4o
   - Complex: o1-preview (tốn token nhiều)

4. **Viết prompt ngắn gọn**
   - Cụ thể nhưng concise
   - Không repeat context

---

## Common mistakes to avoid

### ❌ Đừng:

1. **Accept mọi suggestion mù quáng**
   - Review code trước khi accept
   - Đặc biệt với business logic, security

2. **Hỏi quá chung chung**
   - "How does this work?" → Quá vague
   - Hỏi cụ thể về một khía cạnh

3. **Dùng Agent mode cho tasks nhỏ**
   - Lãng phí token
   - Edit mode là đủ

4. **Copy-paste code không hiểu**
   - Ask Copilot explain trước
   - Understand trước khi apply

5. **Không test sau khi refactor**
   - Copilot có thể sai
   - Luôn chạy tests

6. **Quên commit thường xuyên**
   - Commit từng small change
   - Dễ rollback nếu cần

---

## Remember

### Core principles

1. **Break problems small** - Chia nhỏ vấn đề
2. **Use minimal tools** - Dùng tool nhỏ nhất đủ dùng
3. **Understand context** - Cung cấp context rõ ràng
4. **Iterate often** - Làm từng bước, test thường xuyên
5. **Review everything** - Không trust AI 100%

### Quick reference

```
Đang gõ code      → Tab (inline suggestions)
Sửa code tại chỗ  → ⌘I (inline chat)
Hỏi kiến thức     → Ask mode
Refactor 1 file   → Edit mode
Task nhiều files  → Agent mode (sau khi Plan)
Công việc lặp lại → Smart Actions
```

---

**Câu nhớ tổng:**
> Chia nhỏ, dùng đúng tool, cung cấp context, review kỹ, test thường xuyên!