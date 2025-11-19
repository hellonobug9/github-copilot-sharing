# Testing & Debugging – Viết Test và Debug với Copilot

## TL;DR

**Testing:**
- Code xong → Generate tests
- Hoặc TDD: Tests trước → Copilot suggest implementation

**Debugging:**
- Có lỗi → Paste vào Copilot → Explain + Fix
- Test fail → Hỏi Copilot tại sao

**Rule:**
> Implementation xong → generate tests. Test fail → hỏi Copilot.

---

## 1. Generate Tests

### Cách 1: Context Menu
1. Select function/class
2. Right-click → Copilot → Generate Tests
3. Review → Save

### Cách 2: Chat
```
/tests Generate unit tests for #selection
```

### Cách 3: Inline Chat
1. Select function
2. ⌘I → "Generate unit tests"

---

### Ví Dụ

**Code:**
```typescript
function calculateShipping(weight: number, distance: number, isPremium: boolean): number {
  const base = weight * 0.5 + distance * 0.1;
  return isPremium ? base * 0.8 : base;
}
```

**Generate Tests →**
```typescript
describe('calculateShipping', () => {
  it('calculates base fee correctly', () => {
    expect(calculateShipping(10, 100, false)).toBe(15);
  });

  it('applies premium discount', () => {
    expect(calculateShipping(10, 100, true)).toBe(12);
  });

  it('handles zero weight', () => {
    expect(calculateShipping(0, 100, false)).toBe(10);
  });
});
```

---

## 2. Test-Driven Development (TDD)

### Workflow:
1. Viết test cases trước
2. Copilot suggest implementation to pass tests
3. Run tests → Refine

### Ví Dụ

**Step 1: Write test**
```typescript
test('validateEmail returns true for valid emails', () => {
  expect(validateEmail('test@example.com')).toBe(true);
  expect(validateEmail('invalid')).toBe(false);
});
```

**Step 2: Copilot suggests implementation**
```typescript
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

**Step 3: Run test → Pass ✅**

---

## 3. Debugging với Copilot

### Scenario 1: Explain Error

**Có lỗi:**
```
TypeError: Cannot read property 'name' of undefined
  at getUserName (user.ts:10:15)
```

**Hỏi Copilot:**
```
Explain this error and how to fix:
[paste error + relevant code]
```

**Copilot:**
- Giải thích: `user` is undefined
- Suggest fix: Add null check

---

### Scenario 2: Test Failing

**Test fail:**
```
Expected: 15
Received: 16
```

**Hỏi Copilot:**
```
Why is this test failing?
#selection (include test + implementation)
```

**Copilot:**
- Phân tích logic
- Point out discrepancy
- Suggest fix

---

### Scenario 3: Performance Issue

```
@workspace Why is this function slow?
#selection
```

Copilot analyze:
- Identify O(n²) loop
- Suggest optimization

---

## 4. Best Practices

### Testing
✅ **DO:**
- Generate tests sau implementation
- Review & add edge cases
- Use TDD cho complex logic
- Generate mocking code

⚠️ **DON'T:**
- Blind accept generated tests
- Skip manual review
- Forget to run tests

### Debugging
✅ **DO:**
- Paste full error + stack trace
- Include relevant code context
- Ask for explanation first, then fix
- Use `@workspace` để tìm related code

⚠️ **DON'T:**
- Apply fixes blindly
- Skip understanding root cause
- Ignore suggested edge cases

---

## 5. Advanced: Mocking & Integration Tests

### Generate Mocks

**Prompt:**
```
Generate Jest mocks for this API client
#selection
```

**Copilot:**
```typescript
jest.mock('./api', () => ({
  fetchUser: jest.fn(),
  createUser: jest.fn(),
}));
```

### Generate Integration Tests

**Prompt:**
```
/tests Generate integration tests for this API route
#file:api/users/route.ts
```

---

## Demo Scenarios (để present)

### Demo 1: Generate Tests from Code
1. Write function
2. Select → Generate Tests
3. Review → Run

### Demo 2: TDD Workflow
1. Write test case
2. Copilot suggest implementation
3. Test passes

### Demo 3: Debug Error
1. Have error message
2. Paste to Copilot
3. Get explanation + fix

### Demo 4: Test Failing
1. Test fails
2. Ask Copilot why
3. Fix based on suggestion

---

## Tóm Lại

| Task | Action |
|------|--------|
| **Generate tests** | Context menu / `/tests` |
| **TDD** | Write tests first → Copilot implements |
| **Explain error** | Paste error → Ask Copilot |
| **Test failing** | Show test + code → Ask why |
| **Performance** | `@workspace` + ask for optimization |

**Câu nhớ:**
> Tests = Safety net. Copilot = Net builder!
