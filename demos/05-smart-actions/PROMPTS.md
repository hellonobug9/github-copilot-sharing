# Smart Actions – Thao Tác Thông Minh

## TL;DR

**Smart Actions** = AI features tích hợp sẵn trong VS Code, không cần chat

| Action | Khi nào | Cách dùng |
|--------|---------|-----------|
| Generate commit msg | Commit code | Click ✨ icon |
| Fix with Copilot | Có lỗi TS/ESLint | 💡 Quick Fix |
| Generate docs | Cần JSDoc | `/**` + Enter |
| Generate tests | Cần test | Context menu |
| Explain code | Hiểu code | Context menu |

**Rule:**
> Công việc lặp lại → Smart Actions! Không chat, chỉ click.

---

## 1. Generate Commit Messages

**Workflow:**
1. Stage changes (⌃⇧G)
2. Click ✨ icon bên commit box
3. Review → Edit nếu cần → Commit

**Ví dụ:**
```diff
+ const price = item.price * (1 - item.discount);
```
→ Copilot: `feat: apply discount to price calculation`

**Best Practice:**
- ✅ Review message trước commit
- ✅ Stage related changes cùng nhau
- ⚠️ Edit nếu Copilot hiểu sai

---

## 2. Fix with Copilot

**Workflow:**
1. Có lỗi TypeScript/ESLint
2. Click 💡 (lightbulb) hoặc ⌘.
3. Chọn "Fix using Copilot"
4. Review → Accept/Reject

**Ví dụ:**
```typescript
// Error: Property 'middleName' does not exist on type 'User'
const name = user.middleName;
```
→ Copilot suggest:
```typescript
const name = user.middleName || '';
// hoặc
const name = 'middleName' in user ? user.middleName : '';
```

**Best Practice:**
- ✅ Quick fix cho lỗi đơn giản
- ⚠️ Review logic fix phức tạp
- ❌ Không dùng cho security issues (tự sửa)

---

## 3. Generate Docs

**Workflow:**
1. Đặt cursor trên function
2. Gõ `/**` → Enter
3. Copilot generate JSDoc
4. Review → chỉnh sửa

**Ví dụ:**
```typescript
/**
 * Calculates shipping fee
 * @param weight - Weight in kg
 * @param distance - Distance in km
 * @param isPremium - Premium membership
 * @returns Shipping fee
 */
function calculateShippingFee(weight, distance, isPremium) {
  ...
}
```

---

## 4. Generate Tests

**Workflow:**
1. Select function/class
2. Right-click → Copilot → Generate Tests
3. Review tests → Add edge cases

**Hoặc Chat:**
```
/tests Generate unit tests for #selection
```

---

## 5. Explain/Review Code

**Context menu actions:**
- **Explain This** → Giải thích code
- **Review Selection** → Review code quality
- **Find Related** → Tìm code liên quan

**Ví dụ:**
Select complex function → Right-click → "Copilot" → "Explain This"

---

## 6. Smart Rename

**Workflow:**
1. Select variable/function
2. F2 (Rename Symbol)
3. Copilot suggest better names
4. Pick or type custom name

---

## Demo Scenarios (để present)

### Demo 1: Commit Message
1. Make changes
2. Stage → Click ✨
3. Review → Commit

### Demo 2: Fix Error
1. Có TypeScript error
2. 💡 → Fix with Copilot
3. Accept fix

### Demo 3: Generate Docs
1. Function không có docs
2. `/**` + Enter
3. JSDoc appears

### Demo 4: Generate Tests
1. Select function
2. Right-click → Generate Tests
3. Review → Save

---

## Best Practices

### ✅ DO
- Use cho repetitive tasks
- Review generated code
- Combine với chat khi cần

### ⚠️ DON'T
- Blind accept fixes
- Skip review commit messages
- Dùng cho critical security code

---

## Tóm Lại

| Smart Action | Shortcut/Action | Use Case |
|--------------|-----------------|----------|
| Commit msg | ✨ icon | Auto-generate commits |
| Fix error | 💡 Quick Fix | Fix TS/ESLint |
| Docs | `/**` + Enter | Generate JSDoc |
| Tests | Context menu | Generate tests |
| Explain | Context menu | Understand code |

**Câu nhớ:**
> Smart Actions = No chat needed. Click → Done!
