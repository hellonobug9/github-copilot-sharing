# Inline Suggestions – Gợi Ý Code Khi Gõ

## TL;DR

**Inline Suggestions** = "ghost text xám" khi đang gõ code

**3 cách accept:**
| Action | Shortcut | Khi nào |
|--------|----------|---------|
| Accept toàn bộ | `Tab` | Đúng hoàn toàn |
| Accept từng từ | `Ctrl + →` | Muốn kiểm soát |
| Xem suggestion khác | `Alt + ]` / `[` | Tìm alternative |
| Reject | `Esc` | Sai hoặc tự viết |

**Rule:**
> Comment tốt + Tên rõ ràng + Tab = Code nhanh gấp đôi!

---

## 1. Inline Suggestions Là Gì?

Ghost text xuất hiện khi gõ code:

```typescript
function calculateTotal(|)  ← cursor
// Copilot suggest:
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

---

## 2. Cách Trigger Suggestions

### Pattern 1: Comment rõ ràng
```typescript
// Calculate total price with discount and tax
|  ← Copilot suggest implementation
```

### Pattern 2: Function name + JSDoc
```typescript
/**
 * Formats date to Vietnamese locale
 * @param date - Date to format
 * @returns Formatted string
 */
function formatDate(date: Date): string {
  |  ← Copilot suggest full implementation
}
```

### Pattern 3: Repetitive pattern
```typescript
const getUsers = () => api.get('/users');
const getPosts = () => api.get('/posts');
const getComments = |  ← Copilot learns pattern
```

### Pattern 4: Test-first
```typescript
test('should validate email', () => {
  expect(validateEmail('test@email.com')).toBe(true);
});

function validateEmail(|  ← Copilot suggests passing implementation
```

---

## 3. Accept Strategies

### Tab – Accept All
- Nhanh nhất
- Dùng khi suggestion đúng 100%

### Ctrl + → – Accept Word by Word
- Kiểm soát tốt
- Có thể stop giữa chừng để sửa

**Ví dụ:**
```typescript
const name = user.firstName + " " + user.lastName
             ↑ Ctrl+→     ↑ Stop, sửa thành middleName
```

### Alt + ] – Cycle Suggestions
- Xem alternatives
- Pick cái phù hợp nhất

---

## 4. Tips Để Có Suggestions Tốt

### ✅ DO
1. **Comment bằng tiếng Anh, rõ ràng**
   ```typescript
   // Calculate loyalty points: Bronze 1x, Silver 1.5x, Gold 2x
   ```

2. **Tên biến/function có ý nghĩa**
   ```typescript
   ✅ function calculateTotalPrice(price, discount, tax)
   ❌ function calc(a, b, c)
   ```

3. **Cung cấp types/interfaces**
   ```typescript
   interface User { firstName: string; lastName: string; }
   function formatName(user: User) {  // Copilot có context
   ```

4. **Review trước khi accept**
   - Đặc biệt security/business logic

### ⚠️ DON'T
1. Accept mù quáng
2. Dùng tên vô nghĩa (a, b, temp)
3. Expect Copilot biết business logic riêng mà không giải thích

---

## Demo Scenarios (để present)

### Demo 1: Comment → Function
```typescript
// Calculate Fibonacci at position n using recursion
|
```
→ Tab → Full function

### Demo 2: Repetitive Code
```typescript
const userSchema = z.object({ name: z.string() });
const postSchema = z.object({ title: z.string() });
const commentSchema = |  ← Copilot continues pattern
```

### Demo 3: Accept Word-by-Word
1. Suggestion: `const name = user.firstName + " " + user.lastName`
2. Ctrl+→ accept parts, stop để sửa

### Demo 4: Multiple Suggestions
```typescript
const sorted = |
```
- Alt+] → See options: `sort by name`, `sort by age`, `sort by date`
- Pick best one

---

## Common Issues

| Issue | Giải pháp |
|-------|-----------|
| Không suggest | Check Copilot icon, login, file type |
| Suggest sai | Comment chi tiết hơn, tên rõ hơn |
| Quá chậm | Check network, simplify context |
| Muốn disable | Click Copilot icon → Disable |

---

## Tóm Lại

| Shortcut | Action |
|----------|--------|
| `Tab` | Accept all |
| `Ctrl + →` | Accept word |
| `Alt + ]` / `[` | Next/prev suggestion |
| `Esc` | Reject |
| `Alt + \` | Manual trigger |

**Câu nhớ:**
> Comment tốt + Tên rõ = Suggestions chính xác!
