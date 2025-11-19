# Smart Actions – Các Thao Tác Thông Minh

## TL;DR

**Smart Actions** = các tính năng AI được tích hợp sẵn trong VS Code, không cần chat

**Các actions hay dùng:**
- **Generate commit messages** → Tự động viết commit message từ diff
- **Fix with Copilot** → Fix lỗi TypeScript/ESLint ngay tại chỗ
- **Generate docs** → Tạo JSDoc/docstring tự động
- **Generate tests** → Tạo unit tests từ implementation
- **Explain/Review code** → Context menu trong editor
- **Smart rename** → Đổi tên biến/function an toàn

**Rule of thumb:**
> Công việc lặp lại → dùng Smart Actions! Không cần mở chat, chỉ cần click.

---

## 1. Smart Actions là gì?

**Smart Actions** = các tính năng AI được **tích hợp ngay trong VS Code UI**, không phải là chat.

Khác với Chat:
- **Chat**: Mở chat → gõ prompt → nhận answer
- **Smart Actions**: Click button/context menu → AI làm ngay

Ưu điểm:
- ✅ Không cần nghĩ prompt
- ✅ Nhanh hơn chat
- ✅ Context tự động (file, selection, error)
- ✅ Kết quả ngay lập tức

---

## 2. Generate Commit Messages

### Cách dùng

1. Stage changes trong Git (⌃⇧G)
2. Click vào icon ✨ (sparkle) bên cạnh commit message box
3. Copilot đọc diff → generate commit message
4. Review message → Edit nếu cần → Commit

### Ví dụ

**Diff:**
```typescript
// Before
const price = item.price * item.quantity;

// After
const price = item.price * item.quantity * (1 - item.discount);
```

**Copilot generate:**
```
feat: apply discount to item price calculation
```

---

**Diff:**
```typescript
// Added
import { logger } from './logger';

// Modified
try {
  await api.post('/users', data);
} catch (error) {
  logger.error('Failed to create user', error);
  throw error;
}
```

**Copilot generate:**
```
feat: add error logging to user creation

- Import logger utility
- Log errors when user creation fails
```

---

### Best Practices

✅ **DO: Review message trước khi commit**
- Copilot có thể hiểu sai intent
- Edit message nếu không chính xác

---

✅ **DO: Stage changes có liên quan với nhau**
- Commit message tốt khi changes cohesive
- Tránh stage quá nhiều thay đổi không liên quan

---

✅ **DO: Follow Conventional Commits**

Copilot thường generate theo format:
```
<type>: <description>

[optional body]
```

Types phổ biến:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `test:` - Add/update tests
- `chore:` - Build, dependencies, etc.

---

⚠️ **DON'T: Blind commit generated messages**
- Đọc kỹ message
- Ensure describe đúng changes

---

### Settings

Enable/disable commit message generation:
```json
{
  "github.copilot.editor.enableCommitMessageGeneration": true
}
```

---

## 3. Fix Errors with Copilot

### Cách dùng

1. Có lỗi đỏ trong editor (TypeScript, ESLint, etc.)
2. Click vào 💡 (lightbulb) hoặc hover lên lỗi
3. Chọn **"Fix using Copilot"**
4. Review suggestions → Apply

Hoặc:
- Đặt cursor ở lỗi → `⌘.` (Quick Fix) → "Fix using Copilot"

### Ví dụ

#### Fix TypeScript error

**Lỗi:**
```typescript
Property 'email' does not exist on type 'User'
```

**Code:**
```typescript
interface User {
  id: string;
  name: string;
}

const userEmail = user.email; // ❌ Error
```

**Copilot suggest fixes:**

**Option 1:** Add property to interface
```typescript
interface User {
  id: string;
  name: string;
  email: string; // ✅ Added
}
```

**Option 2:** Use optional chaining
```typescript
const userEmail = user?.email;
```

**Option 3:** Check if property exists
```typescript
const userEmail = 'email' in user ? user.email : undefined;
```

---

#### Fix ESLint error

**Lỗi:**
```
'React' must be in scope when using JSX
```

**Copilot suggest:**
```typescript
import React from 'react'; // ✅ Add import
```

---

#### Fix missing return type

**Lỗi:**
```
Function lacks return type annotation
```

**Code:**
```typescript
function getUser(id: string) { // ❌ Missing return type
  return database.users.find(u => u.id === id);
}
```

**Copilot suggest:**
```typescript
function getUser(id: string): User | undefined { // ✅ Added return type
  return database.users.find(u => u.id === id);
}
```

---

### Best Practices

✅ **DO: Review suggestions carefully**
- Copilot có thể suggest nhiều options
- Chọn cái phù hợp nhất với context

---

✅ **DO: Dùng cho lỗi simple/mechanical**
- Type errors
- Missing imports
- Unused variables
- ESLint fixes

---

⚠️ **DON'T: Dùng cho lỗi logic phức tạp**
- Business logic bugs
- Algorithm issues
→ Nên dùng Ask mode để hiểu lỗi trước

---

## 4. Generate Documentation (JSDoc)

### Cách dùng

#### Option 1: Inline suggestion

1. Đặt cursor trên function
2. Gõ `/**` → Enter
3. Copilot generate JSDoc template
4. Tab accept

#### Option 2: Context menu

1. Select function
2. Right-click → **"Copilot"** → **"Generate Docs"**
3. Review → Apply

### Ví dụ

**Function:**
```typescript
function calculateShippingFee(weight: number, distance: number, isPremium: boolean): number {
  const baseFee = weight * 0.5 + distance * 0.1;
  return isPremium ? baseFee * 0.8 : baseFee;
}
```

**Gõ `/**` + Enter:**

**Copilot generate:**
```typescript
/**
 * Calculates the shipping fee based on weight, distance, and premium status
 * @param weight - The weight of the package in kilograms
 * @param distance - The shipping distance in kilometers
 * @param isPremium - Whether the customer has premium membership (20% discount)
 * @returns The calculated shipping fee
 * @example
 * calculateShippingFee(10, 100, false) // Returns 15
 * calculateShippingFee(10, 100, true)  // Returns 12
 */
function calculateShippingFee(weight: number, distance: number, isPremium: boolean): number {
  const baseFee = weight * 0.5 + distance * 0.1;
  return isPremium ? baseFee * 0.8 : baseFee;
}
```

---

### Best Practices

✅ **DO: Generate docs cho public APIs**
- Exported functions
- Public methods
- Library interfaces

---

✅ **DO: Review và improve generated docs**
- Thêm examples nếu cần
- Clarify edge cases
- Add links to related docs

---

⚠️ **DON'T: Over-document trivial code**
```typescript
/**
 * Gets the user's name
 * @returns The user's name
 */
getName(): string {
  return this.name;
}
```
→ Self-explanatory, không cần docs

---

## 5. Generate Tests

### Cách dùng

1. Select function/class cần test
2. Right-click → **"Copilot"** → **"Generate Tests"**
3. Copilot generate test file
4. Review → Edit nếu cần

Hoặc dùng Chat:
```
/tests Generate tests for #selection
```

### Ví dụ

**Function:**
```typescript
function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

**Select → Generate Tests:**

**Copilot generate:**
```typescript
import { isValidEmail } from './validation';

describe('isValidEmail', () => {
  it('should return true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('should return false for invalid email without @', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  it('should return false for email without domain', () => {
    expect(isValidEmail('test@')).toBe(false);
  });

  it('should return false for email with spaces', () => {
    expect(isValidEmail('test @example.com')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});
```

---

### Best Practices

✅ **DO: Review generated tests**
- Check coverage
- Thêm edge cases nếu thiếu
- Ensure assertions đúng

---

✅ **DO: Generate tests cho pure functions trước**
- Input → Output deterministic
- Dễ test
- Copilot generate tốt hơn

---

⚠️ **DON'T: Expect perfect tests**
- Generated tests là starting point
- Cần bổ sung business logic tests
- Thêm integration tests nếu cần

---

## 6. Explain Code

### Cách dùng

1. Select đoạn code cần giải thích
2. Right-click → **"Copilot"** → **"Explain This"**
3. Chat panel mở với explanation

Hoặc:
- Select code → `⌘I` (Inline Chat) → "Explain this code"

### Ví dụ

**Code:**
```typescript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

**Copilot explain:**
```
This code uses the `useCallback` hook from React to memoize a callback function.

- The callback function calls `doSomething(a, b)`
- The dependency array `[a, b]` means the callback is recreated only when `a` or `b` changes
- This optimization prevents unnecessary re-renders in child components that receive this callback as a prop
- Without `useCallback`, a new function instance would be created on every render

Use case: Pass this callback to optimized child components (e.g., wrapped in React.memo)
```

---

### Best Practices

✅ **DO: Dùng khi onboard vào codebase mới**
- Hiểu code người khác viết
- Learn patterns mới

---

✅ **DO: Dùng cho complex code**
- Regex phức tạp
- Algorithms
- Unfamiliar APIs

---

## 7. Smart Rename (Symbol Rename)

### Cách dùng

1. Đặt cursor vào variable/function name
2. `F2` → Rename Symbol
3. Gõ tên mới → Enter
4. VS Code rename **tất cả references** trong project

**Copilot enhance:**
- Suggest tên phù hợp hơn
- Follow naming conventions của project

### Ví dụ

**Before:**
```typescript
const d = new Date();
const ts = d.getTime();
```

**Rename `d` với Copilot suggestion:**
```typescript
const currentDate = new Date();
const ts = currentDate.getTime();
```

**Rename `ts` với Copilot suggestion:**
```typescript
const currentDate = new Date();
const timestamp = currentDate.getTime();
```

---

### Best Practices

✅ **DO: Dùng F2 thay vì find-replace**
- F2 rename across files
- Type-safe
- Không miss references

---

✅ **DO: Follow project naming conventions**
- camelCase for variables/functions
- PascalCase for classes/components
- UPPER_CASE for constants

---

## 8. Code Review với Copilot

### Cách dùng

1. Select đoạn code
2. Right-click → **"Copilot"** → **"Review and Comment"**
3. Copilot analyze và suggest improvements

Hoặc dùng Chat:
```
Review this code for potential issues: #selection
```

### Ví dụ

**Code:**
```typescript
function processUser(user: any) {
  const name = user.name;
  const email = user.email;
  console.log('Processing: ' + name);
  return { name, email };
}
```

**Copilot review:**
```
Issues found:

1. **Type safety**: Parameter `user` is typed as `any`. Should use a proper interface.

2. **Null safety**: No null checks for `user.name` and `user.email`. Could cause runtime errors.

3. **Logging**: Using console.log in production code. Consider using a proper logger.

4. **String concatenation**: Using `+` for string concatenation. Modern approach: template literals.

Suggested refactor:

```typescript
interface User {
  name: string;
  email: string;
}

function processUser(user: User): { name: string; email: string } {
  if (!user?.name || !user?.email) {
    throw new Error('Invalid user data');
  }
  
  logger.info(`Processing user: ${user.name}`);
  return { name: user.name, email: user.email };
}
```
```

---

### Best Practices

✅ **DO: Review generated feedback**
- Không phải mọi suggestion đều cần apply
- Context matters

---

✅ **DO: Dùng cho code review routine**
- Trước khi commit
- Trước khi create PR

---

## 9. Semantic Search (Find Related Code)

### Cách dùng

1. `⌘⇧F` (Search panel)
2. Gõ natural language query thay vì regex
3. Copilot find related code semantically

### Ví dụ

**Query:** "authentication logic"

→ Copilot find:
- `/auth/login.ts`
- `/middleware/auth.ts`
- `/utils/validateToken.ts`

Không chỉ match text "authentication", mà hiểu semantic.

---

### Best Practices

✅ **DO: Dùng natural language**
```
❌ Tệ: ".*auth.*"
✅ Tốt: "authentication and authorization logic"
```

---

✅ **DO: Kết hợp với @workspace**
```
@workspace Where is the authentication logic?
```

---

## 10. All Smart Actions Summary

| Action | Cách trigger | Dùng khi |
|--------|-------------|----------|
| **Generate Commit Message** | Click ✨ icon ở Git | Có staged changes |
| **Fix with Copilot** | `⌘.` ở error | Có TypeScript/ESLint error |
| **Generate Docs** | `/**` + Enter | Cần JSDoc cho function |
| **Generate Tests** | Context menu | Cần tests cho function |
| **Explain Code** | Context menu | Không hiểu code |
| **Smart Rename** | `F2` | Đổi tên variable/function |
| **Code Review** | Context menu | Review code trước commit |
| **Semantic Search** | `⌘⇧F` | Tìm related code |

---

## Demo Scenarios

### Demo 1: Generate Commit Message

1. Make changes to code
2. Stage changes (`⌘K` `⌘S`)
3. Click ✨ icon
4. Review message → Commit

---

### Demo 2: Fix TypeScript Error

1. Có lỗi: `Property 'xyz' does not exist on type 'ABC'`
2. Click 💡 lightbulb
3. Select "Fix using Copilot"
4. Review suggestions → Apply

---

### Demo 3: Generate Docs

1. Có function không có docs
2. Đặt cursor trên function
3. Gõ `/**` → Enter
4. Tab accept generated JSDoc

---

### Demo 4: Generate Tests

1. Select function
2. Right-click → Copilot → Generate Tests
3. Review generated tests → Save

---

### Demo 5: Workflow hoàn chỉnh

**Scenario:** Viết một feature mới

1. **Write code** với inline suggestions
2. **Generate docs** với `/**` + Enter
3. **Generate tests** với context menu
4. **Review code** với Copilot review
5. **Fix errors** với Fix using Copilot
6. **Stage changes** → Generate commit message
7. **Commit** và done!

→ Toàn bộ workflow dùng Smart Actions, rất nhanh.

---

## Best Practices Chung

### 1️⃣ Dùng Smart Actions cho repetitive tasks

- Generate commit messages
- Generate docs
- Generate tests boilerplate

→ Tiết kiệm thời gian, maintain consistency

---

### 2️⃣ Review mọi output

- AI có thể sai
- Đặc biệt với:
  - Commit messages (business context)
  - Tests (edge cases)
  - Fixes (side effects)

---

### 3️⃣ Kết hợp Smart Actions với Chat

- Smart Actions cho quick tasks
- Chat cho complex tasks cần explanation

---

### 4️⃣ Learn shortcuts

- `F2` - Rename
- `⌘.` - Quick Fix
- `/**` + Enter - Generate docs
- Click ✨ - Generate commit message

→ Workflow nhanh hơn

---

## Tóm lại

**Smart Actions** = AI features được tích hợp sẵn trong VS Code UI

**Top 5 actions hay dùng nhất:**

1. **Generate Commit Messages** → Viết commit message tự động
2. **Fix with Copilot** → Fix lỗi TypeScript/ESLint
3. **Generate Docs** → Tạo JSDoc tự động
4. **Generate Tests** → Tạo unit tests boilerplate
5. **Explain Code** → Hiểu code nhanh

**Câu nhớ:**
> Right-click → Copilot menu → Chọn action → Done! Không cần mở chat.
