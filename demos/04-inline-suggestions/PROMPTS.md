# Inline Suggestions – Gợi Ý Code Khi Gõ

## TL;DR

**Inline Suggestions** = "cái bóng ma xám" hiện ra khi đang gõ code

- Đây là **tính năng tiết kiệm thời gian nhất** của Copilot
- Không cần mở chat, không cần đánh prompt
- Chỉ cần gõ → Tab → xong

**3 cách accept:**
- **Tab** → Accept toàn bộ (nhanh nhất)
- **Ctrl + →** → Accept từng từ (kiểm soát tốt)
- **Alt + ]** → Xem suggestion khác

**Rule of thumb:**
> Viết comment hoặc function name rõ ràng → Copilot suggest ngay!

---

## 1. Inline Suggestions là gì?

Khi bạn gõ code, Copilot suggest code **ngay tại cursor** dưới dạng **ghost text** (chữ xám mờ).

### Kiểu suggestions

#### Single-line completion
```typescript
const user = getUserById(|)
                          ↑ cursor
```

Copilot suggest:
```typescript
const user = getUserById(userId);
```

---

#### Multi-line completion
```typescript
function calculateTotal(|)
                        ↑ cursor
```

Copilot suggest:
```typescript
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}
```

---

#### Whole function từ comment
```typescript
// Calculate the total price with discount and tax
|
```

Copilot suggest:
```typescript
function calculateTotalPrice(price: number, discount: number, taxRate: number): number {
  const discountedPrice = price * (1 - discount);
  const total = discountedPrice * (1 + taxRate);
  return total;
}
```

---

## 2. Cách trigger Inline Suggestions

### Pattern 1: Viết comment rõ ràng

#### Todo comment

```typescript
// TODO: Validate email format and check domain
|
```

→ Tab → Copilot suggest implementation:
```typescript
function validateEmail(email: string, allowedDomains: string[]): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
}
```

---

#### Inline comment

```typescript
function processPayment(amount: number) {
  // Calculate fee based on payment method
  |
}
```

→ Copilot suggest:
```typescript
  const fee = amount < 100 ? 2.99 : amount * 0.029;
```

---

### Pattern 2: Function signature + JSDoc

```typescript
/**
 * Formats a date to Vietnamese locale
 * @param date - Date object to format
 * @param includeTime - Whether to include time
 * @returns Formatted date string
 */
function formatDate(date: Date, includeTime: boolean = false): string {
  |
}
```

→ Copilot suggest full implementation dựa trên JSDoc

---

### Pattern 3: Đặt tên function rõ ràng

```typescript
function getUserFullName(|)
```

→ Copilot suggest:
```typescript
function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
```

Tên function tốt → Copilot hiểu intent → Suggest chính xác

---

### Pattern 4: Viết test case, Copilot suggest implementation

```typescript
test('should calculate shipping fee correctly', () => {
  expect(calculateShippingFee(10, 100, false)).toBe(15);
  expect(calculateShippingFee(10, 100, true)).toBe(12);
});

// Copilot sẽ suggest implementation của calculateShippingFee
function calculateShippingFee(|)
```

→ Copilot đọc test → suggest implementation pass tests

---

### Pattern 5: Repetitive code

Viết 2-3 dòng tương tự, Copilot học pattern:

```typescript
const getUsers = () => api.get('/users');
const getPosts = () => api.get('/posts');
const getComments = |
```

→ Copilot suggest: `() => api.get('/comments');`

---

## 3. Cách Accept Suggestions

### Tab – Accept toàn bộ

**Khi nào dùng:**
- Suggestion **đúng hoàn toàn**
- Muốn nhanh nhất

**Shortcut:** `Tab`

**Ví dụ:**
```typescript
const total = items.reduce((sum, item) =>
  ↑ suggestion: sum + item.price, 0);
```

→ `Tab` → accept tất cả

---

### Ctrl + → – Accept từng từ

**Khi nào dùng:**
- Suggestion **đúng một nửa**
- Muốn kiểm soát từng phần
- Cần chỉnh sửa nhẹ

**Shortcut:** `Ctrl + →` (hoặc `Cmd + →` trên macOS)

**Ví dụ:**
```typescript
const userName = user.firstName + " " + user.lastName
                 ↑ Ctrl+→     ↑ Ctrl+→  ↑ Stop, sửa thành middleName
```

→ Accept từng token → có thể dừng giữa chừng để edit

---

### Alt + ] – Xem suggestion khác

**Khi nào dùng:**
- Suggestion hiện tại không ưng
- Muốn xem alternatives

**Shortcuts:**
- `Alt + ]` → Next suggestion
- `Alt + [` → Previous suggestion

**Ví dụ:**

Suggestion 1:
```typescript
const result = data.filter(item => item.active);
```

Press `Alt + ]` → Suggestion 2:
```typescript
const result = data.filter(({ active }) => active);
```

Press `Alt + ]` → Suggestion 3:
```typescript
const result = data.filter(item => item.active === true);
```

→ Chọn suggestion thích hợp nhất

---

### Esc – Reject suggestion

**Khi nào dùng:**
- Suggestion **sai hoàn toàn**
- Muốn tự viết để giữ quyền kiểm soát
- Copilot đang "làm phiền"

**Shortcut:** `Esc`

**Lưu ý:** Gõ tiếp → suggestion mới sẽ hiện lại

---

## 4. Tips để có Suggestions tốt hơn

### ✅ DO: Viết comment bằng tiếng Anh rõ ràng

❌ Tệ:
```typescript
// do stuff
```

✅ Tốt:
```typescript
// Calculate total price including discount and tax
// Discount is percentage (0-1), tax rate is percentage (0-1)
```

---

### ✅ DO: Đặt tên biến/function có ý nghĩa

❌ Tệ:
```typescript
function calc(a, b, c) {
```

✅ Tốt:
```typescript
function calculateTotalPrice(price, discountRate, taxRate) {
```

→ Copilot hiểu intent → suggest chính xác

---

### ✅ DO: Cung cấp context xung quanh

```typescript
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Copilot sẽ dùng interface này để suggest
function formatUserName(user: User): string {
  |
}
```

---

### ✅ DO: Viết type/interface trước

```typescript
type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';

interface PaymentOptions {
  method: PaymentMethod;
  amount: number;
  currency: string;
}

// Copilot hiểu types → suggest đúng
function processPayment(options: PaymentOptions) {
  |
}
```

---

### ⚠️ DON'T: Accept mọi suggestion mù quáng

- **Review code** trước khi accept
- Đặc biệt với:
  - Business logic phức tạp
  - Security-related code
  - Edge cases

---

### ⚠️ DON'T: Dùng tên biến vô nghĩa

```typescript
const a = 10;
const b = 5;
const c = a + b; // Copilot không biết c là gì
```

→ Copilot không có context → suggest ngẫu nhiên

---

### ⚠️ DON'T: Expect Copilot biết business logic riêng

```typescript
// Calculate loyalty points based on our tier system
// (Copilot không biết tier system của bạn như thế nào)
```

→ Phải mô tả rõ rules:
```typescript
// Calculate loyalty points:
// - Bronze tier: 1 point per $10
// - Silver tier: 1.5 points per $10
// - Gold tier: 2 points per $10
function calculateLoyaltyPoints(amount: number, tier: 'bronze' | 'silver' | 'gold'): number {
  |
}
```

---

## 5. Advanced Patterns

### Pattern 1: Generate boilerplate from existing code

Có code này:
```typescript
const handleSubmit = async (data: FormData) => {
  try {
    await api.post('/users', data);
    toast.success('User created');
  } catch (error) {
    toast.error('Failed to create user');
  }
};
```

Viết tiếp:
```typescript
const handleUpdate = |
```

→ Copilot suggest pattern tương tự:
```typescript
const handleUpdate = async (data: FormData) => {
  try {
    await api.put(`/users/${data.id}`, data);
    toast.success('User updated');
  } catch (error) {
    toast.error('Failed to update user');
  }
};
```

---

### Pattern 2: Complete array/object patterns

```typescript
const statusColors = {
  pending: 'yellow',
  approved: 'green',
  rejected: |
```

→ Copilot suggest: `'red',`

Copilot học pattern → complete remaining items.

---

### Pattern 3: Generate test cases from implementation

Có function:
```typescript
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

Bắt đầu viết test:
```typescript
describe('isValidEmail', () => {
  it('should return true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });
  
  it(|
```

→ Copilot suggest remaining test cases:
```typescript
  it('should return false for invalid email without @', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });
  
  it('should return false for email without domain', () => {
    expect(isValidEmail('test@')).toBe(false);
  });
```

---

### Pattern 4: Generate JSDoc from function signature

```typescript
function calculateShippingFee(weight: number, distance: number, isPremium: boolean): number {
```

Đặt cursor lên trên function, gõ `/**` → Enter:

```typescript
/**
 * |
 * @param weight
 * @param distance
 * @param isPremium
 * @returns
 */
```

→ Copilot suggest:
```typescript
/**
 * Calculates the shipping fee based on weight, distance, and premium status
 * @param weight - Weight of the package in kg
 * @param distance - Distance to destination in km
 * @param isPremium - Whether the customer has premium membership
 * @returns The calculated shipping fee
 */
```

---

## 6. Common Issues và Giải pháp

### Issue 1: Copilot không suggest gì cả

**Nguyên nhân:**
- Copilot disabled
- Extension chưa login
- File type không support

**Giải pháp:**
1. Check Copilot icon ở status bar (góc dưới phải)
2. Ensure đã login GitHub
3. Check file extension (`.js`, `.ts`, `.py` supported)

---

### Issue 2: Suggestions không chính xác

**Nguyên nhân:**
- Thiếu context
- Tên biến/function không rõ ràng
- Comment không đủ chi tiết

**Giải pháp:**
1. Viết comment chi tiết hơn
2. Đổi tên biến/function rõ ràng hơn
3. Thêm type/interface definitions
4. Esc → gõ lại với context tốt hơn

---

### Issue 3: Suggestions quá chậm

**Nguyên nhân:**
- Network lag
- Large file
- Complex context

**Giải pháp:**
1. Check internet connection
2. Đơn giản hóa context xung quanh
3. Restart VS Code nếu cần

---

### Issue 4: Muốn disable Copilot temporarily

**Giải pháp:**
- Click Copilot icon ở status bar
- Chọn "Disable Completions" for this file/workspace/globally

---

## 7. Settings để optimize Inline Suggestions

### Enable/Disable Inline Suggestions

```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": false,  // Disable for Markdown
    "plaintext": false
  }
}
```

---

### Delay trước khi show suggestions

```json
{
  "editor.inlineSuggest.delay": 100  // milliseconds (default: 0)
}
```

Tăng delay nếu suggestions "làm phiền" khi đang gõ nhanh.

---

### Show suggestions manual only

```json
{
  "editor.inlineSuggest.showToolbar": "always"
}
```

→ Suggestions chỉ hiện khi bấm shortcut (Alt + \)

---

## 8. Demo Scenarios

### Demo 1: Generate function from comment

1. Viết comment:
   ```typescript
   // Calculate the Fibonacci number at position n using recursion
   ```

2. Enter → Copilot suggest:
   ```typescript
   function fibonacci(n: number): number {
     if (n <= 1) return n;
     return fibonacci(n - 1) + fibonacci(n - 2);
   }
   ```

3. Tab accept

---

### Demo 2: Complete repetitive code

1. Viết 2 dòng:
   ```typescript
   const userSchema = z.object({ name: z.string(), email: z.string() });
   const postSchema = z.object({ title: z.string(), content: z.string() });
   ```

2. Viết tiếp:
   ```typescript
   const commentSchema = |
   ```

3. Copilot suggest:
   ```typescript
   const commentSchema = z.object({ text: z.string(), authorId: z.string() });
   ```

---

### Demo 3: Accept từng từ với Ctrl+→

1. Suggestion:
   ```typescript
   const fullName = user.firstName + " " + user.lastName;
   ```

2. Ctrl+→ accept `user.firstName`
3. Gõ `.middleName + " " +`
4. Ctrl+→ accept remaining

→ Result:
```typescript
const fullName = user.firstName + " " + user.middleName + " " + user.lastName;
```

---

### Demo 4: Xem multiple suggestions với Alt+]

1. Viết:
   ```typescript
   const sortedUsers = |
   ```

2. Suggestion 1: `users.sort((a, b) => a.name.localeCompare(b.name));`
3. Alt+] → Suggestion 2: `[...users].sort((a, b) => a.age - b.age);`
4. Alt+] → Suggestion 3: `users.slice().sort((a, b) => b.createdAt - a.createdAt);`

→ Chọn cái phù hợp nhất

---

## Best Practices Summary

### ✅ DO

1. **Viết comment rõ ràng** (English)
2. **Đặt tên biến/function có ý nghĩa**
3. **Cung cấp types/interfaces**
4. **Review suggestions trước khi accept**
5. **Dùng Ctrl+→ để accept từng phần**
6. **Try Alt+] để xem alternatives**

### ⚠️ DON'T

1. **Accept mù quáng** mọi suggestion
2. **Dùng tên biến vô nghĩa** (a, b, temp)
3. **Expect Copilot biết business logic riêng** không giải thích
4. **Skip review** với security/business logic code

---

## Tóm lại

| Action | Shortcut | Khi nào dùng |
|--------|----------|--------------|
| **Accept toàn bộ** | `Tab` | Suggestion đúng hoàn toàn |
| **Accept từng từ** | `Ctrl + →` | Muốn kiểm soát, chỉnh sửa |
| **Next suggestion** | `Alt + ]` | Xem alternatives |
| **Previous suggestion** | `Alt + [` | Quay lại suggestion trước |
| **Reject** | `Esc` | Suggestion sai, muốn tự viết |
| **Manual trigger** | `Alt + \` | Force show suggestion |

**Câu nhớ:**
> Comment tốt + Tên rõ ràng + Tab = Code nhanh gấp đôi!
