# Testing & Debugging – Viết Test và Debug với Copilot

## TL;DR

**Testing với Copilot:**
- Viết code trước → bảo Copilot tạo tests
- Hoặc viết test cases trước → Copilot suggest implementation (TDD)
- Generate test boilerplate nhanh, thêm edge cases sau

**Debugging với Copilot:**
- Có lỗi → hỏi Copilot giải thích + suggest fix
- Test fail → hỏi Copilot tại sao fail
- Copilot analyze error messages, stack traces

**Rule of thumb:**
> Implementation xong → generate tests. Test fail → hỏi Copilot tại sao.

---

## Phần 1: Generate Tests

### 1.1. Generate Unit Tests từ Implementation

#### Cách làm

**Option 1: Context menu**
1. Select function/class cần test
2. Right-click → **"Copilot"** → **"Generate Tests"**
3. Review tests → Save

**Option 2: Chat**
```
/tests Generate unit tests for #selection
```

**Option 3: Inline Chat**
1. Select function
2. `⌘I` (Inline Chat)
3. Prompt: `Generate unit tests for this function`

---

#### Ví dụ 1: Pure Function

**Code:**
```typescript
function calculateShippingFee(
  weight: number,
  distance: number,
  isPremium: boolean
): number {
  const baseFee = weight * 0.5 + distance * 0.1;
  return isPremium ? baseFee * 0.8 : baseFee;
}
```

**Select → Generate Tests:**

**Copilot output:**
```typescript
import { calculateShippingFee } from './shipping';

describe('calculateShippingFee', () => {
  it('should calculate base fee correctly', () => {
    expect(calculateShippingFee(10, 100, false)).toBe(15);
    // 10 * 0.5 + 100 * 0.1 = 5 + 10 = 15
  });

  it('should apply 20% discount for premium users', () => {
    expect(calculateShippingFee(10, 100, true)).toBe(12);
    // 15 * 0.8 = 12
  });

  it('should handle zero weight', () => {
    expect(calculateShippingFee(0, 100, false)).toBe(10);
  });

  it('should handle zero distance', () => {
    expect(calculateShippingFee(10, 0, false)).toBe(5);
  });

  it('should handle both zero', () => {
    expect(calculateShippingFee(0, 0, false)).toBe(0);
  });
});
```

---

#### Ví dụ 2: Function với Error Handling

**Code:**
```typescript
function parseJSON<T>(text: string): T {
  if (!text || text.trim() === '') {
    throw new Error('Input cannot be empty');
  }
  
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
}
```

**Copilot generate tests:**
```typescript
describe('parseJSON', () => {
  it('should parse valid JSON', () => {
    const result = parseJSON<{ name: string }>('{"name":"John"}');
    expect(result).toEqual({ name: 'John' });
  });

  it('should throw error for empty string', () => {
    expect(() => parseJSON('')).toThrow('Input cannot be empty');
  });

  it('should throw error for whitespace only', () => {
    expect(() => parseJSON('   ')).toThrow('Input cannot be empty');
  });

  it('should throw error for invalid JSON', () => {
    expect(() => parseJSON('{invalid}')).toThrow('Invalid JSON');
  });

  it('should parse arrays', () => {
    const result = parseJSON<number[]>('[1,2,3]');
    expect(result).toEqual([1, 2, 3]);
  });
});
```

---

### 1.2. Generate Tests với Mocks

**Code với external dependencies:**
```typescript
class UserService {
  constructor(private db: Database, private logger: Logger) {}

  async createUser(data: CreateUserInput): Promise<User> {
    this.logger.info('Creating user', data);
    
    const user = await this.db.users.create(data);
    
    this.logger.info('User created', { id: user.id });
    return user;
  }
}
```

**Copilot generate tests với mocks:**
```typescript
import { UserService } from './UserService';

describe('UserService', () => {
  let service: UserService;
  let mockDb: jest.Mocked<Database>;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    mockDb = {
      users: {
        create: jest.fn(),
      },
    } as any;

    mockLogger = {
      info: jest.fn(),
    } as any;

    service = new UserService(mockDb, mockLogger);
  });

  it('should create user successfully', async () => {
    const input = { name: 'John', email: 'john@example.com' };
    const expectedUser = { id: '1', ...input };

    mockDb.users.create.mockResolvedValue(expectedUser);

    const result = await service.createUser(input);

    expect(mockDb.users.create).toHaveBeenCalledWith(input);
    expect(mockLogger.info).toHaveBeenCalledTimes(2);
    expect(result).toEqual(expectedUser);
  });

  it('should log before and after creation', async () => {
    const input = { name: 'John', email: 'john@example.com' };
    mockDb.users.create.mockResolvedValue({ id: '1', ...input });

    await service.createUser(input);

    expect(mockLogger.info).toHaveBeenNthCalledWith(1, 'Creating user', input);
    expect(mockLogger.info).toHaveBeenNthCalledWith(2, 'User created', { id: '1' });
  });
});
```

---

### 1.3. Test-Driven Development (TDD)

Viết tests trước, Copilot suggest implementation.

#### Workflow

**Step 1: Viết test cases**
```typescript
describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for email without @', () => {
    expect(validateEmail('testexample.com')).toBe(false);
  });

  it('should return false for email without domain', () => {
    expect(validateEmail('test@')).toBe(false);
  });
});
```

**Step 2: Copilot suggest implementation**

Khi bạn bắt đầu viết function:
```typescript
function validateEmail(email: string): boolean {
  |  // Cursor here
}
```

→ Copilot suggest implementation pass tests:
```typescript
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

---

## Phần 2: Debug với Copilot

### 2.1. Explain Errors

#### Cách dùng

Khi có error:
1. Copy error message
2. Chat với Copilot:
   ```
   Explain this error and how to fix:
   [paste error]
   ```

---

#### Ví dụ 1: TypeScript Error

**Error:**
```
Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
```

**Code:**
```typescript
interface User {
  name?: string;
}

function greet(name: string) {
  return `Hello, ${name}`;
}

const user: User = { name: 'John' };
greet(user.name); // ❌ Error
```

**Hỏi Copilot:**
```
Why am I getting this TypeScript error?

Type 'string | undefined' is not assignable to type 'string'

Code:
[paste code]
```

**Copilot explain:**
```
The error occurs because `user.name` is optional (type `string | undefined`),
but `greet()` expects a `string` (non-optional).

Solutions:

1. Use non-null assertion (if you're sure it exists):
   greet(user.name!);

2. Provide default value:
   greet(user.name || 'Guest');

3. Check before calling:
   if (user.name) {
     greet(user.name);
   }

4. Change function signature to accept optional:
   function greet(name?: string) {
     return `Hello, ${name || 'Guest'}`;
   }

Recommended: Option 2 or 4 for safety.
```

---

#### Ví dụ 2: Runtime Error

**Error:**
```
TypeError: Cannot read property 'length' of undefined
    at calculateAverage (utils.js:12:24)
```

**Code:**
```typescript
function calculateAverage(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}

calculateAverage(undefined); // ❌ Error
```

**Hỏi Copilot:**
```
Explain this error and suggest a fix:

TypeError: Cannot read property 'length' of undefined

[paste code]
```

**Copilot suggest:**
```
The error occurs because `numbers` is `undefined`, and you're trying to
access `numbers.length`.

Fix with validation:

```typescript
function calculateAverage(numbers) {
  // Add validation
  if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
    return 0; // or throw Error, or return null
  }

  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}
```

Or with TypeScript types:

```typescript
function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}
```

This prevents passing `undefined` at compile time.
```

---

### 2.2. Debug Failing Tests

#### Workflow

1. Test fails
2. Copy test code + error
3. Ask Copilot why test fails

---

#### Ví dụ

**Test:**
```typescript
it('should apply discount correctly', () => {
  expect(calculatePrice(100, 0.2)).toBe(80);
});
```

**Error:**
```
Expected: 80
Received: 20
```

**Hỏi Copilot:**
```
This test is failing:

```typescript
it('should apply discount correctly', () => {
  expect(calculatePrice(100, 0.2)).toBe(80);
});
```

Expected: 80
Received: 20

Implementation:
```typescript
function calculatePrice(price: number, discount: number): number {
  return price * discount;
}
```

Why is it failing?
```

**Copilot explain:**
```
The test expects 80 (100 with 20% discount), but the function returns 20.

Issue: The function multiplies price by discount (100 * 0.2 = 20),
but it should subtract the discount amount from the price.

Correct implementation:

```typescript
function calculatePrice(price: number, discount: number): number {
  return price * (1 - discount);
  // 100 * (1 - 0.2) = 100 * 0.8 = 80 ✅
}
```

Or more explicit:

```typescript
function calculatePrice(price: number, discountRate: number): number {
  const discountAmount = price * discountRate;
  return price - discountAmount;
}
```
```

---

### 2.3. Debug Complex Logic

**Code với bug:**
```typescript
function findDuplicates(arr: number[]): number[] {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    }
    seen.add(num);
  }
  
  return Array.from(duplicates);
}

// Test
console.log(findDuplicates([1, 2, 2, 3, 3, 3]));
// Expected: [2, 3]
// Actual: [2, 3] ✅ Works

console.log(findDuplicates([1, 1, 1]));
// Expected: [1]
// Actual: [1] ✅ Works

console.log(findDuplicates([1, 2, 1, 3, 2]));
// Expected: [1, 2]
// Actual: [1, 2] ✅ Works
```

Seems to work, but có edge case bug. Ask Copilot review:

**Prompt:**
```
Review this function for potential bugs:

[paste code]
```

**Copilot response:**
```
The function works for most cases, but has a subtle issue:

If the array is very large with many duplicates, the function will add
every duplicate occurrence to the Set. However, Sets automatically
deduplicate, so this is not actually a bug, just inefficient.

More efficient version:

```typescript
function findDuplicates(arr: number[]): number[] {
  const counts = new Map<number, number>();
  
  // Count occurrences
  for (const num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }
  
  // Return numbers that appear more than once
  return Array.from(counts.entries())
    .filter(([_, count]) => count > 1)
    .map(([num, _]) => num);
}
```

This only iterates the Map once at the end, rather than calling
`duplicates.add()` for every duplicate occurrence.
```

---

### 2.4. Analyze Stack Traces

**Error with stack trace:**
```
Error: Database connection failed
    at DatabaseConnection.connect (db.ts:45:13)
    at UserService.getUser (service.ts:23:28)
    at UserController.handleGetUser (controller.ts:15:32)
    at Router.handle (express.ts:234:16)
```

**Hỏi Copilot:**
```
Analyze this stack trace and suggest where to look for the issue:

[paste stack trace]
```

**Copilot analyze:**
```
The error originates from `DatabaseConnection.connect()` at line 45 in `db.ts`.

The call chain is:
1. Express router handles request
2. UserController.handleGetUser() is called
3. UserService.getUser() is called
4. DatabaseConnection.connect() fails

**Where to investigate:**

1. **db.ts:45** - Check database connection logic:
   - Are connection credentials correct?
   - Is the database server running?
   - Network connectivity issues?

2. **service.ts:23** - Check if connection is being awaited:
   ```typescript
   // ❌ Bad - Not awaited
   const user = connection.connect();
   
   // ✅ Good
   await connection.connect();
   ```

3. **Check environment variables**:
   - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD

**Quick checks:**
- `console.log(process.env.DB_HOST)` - ensure vars are loaded
- Try connecting manually with same credentials
- Check database logs
```

---

## Phần 3: Best Practices

### 3.1. Testing Best Practices

#### ✅ DO: Generate tests sớm

Viết function → generate tests ngay
→ Catch bugs sớm

```
1. Write function
2. Generate tests
3. Run tests
4. Fix failing tests
5. Commit
```

---

#### ✅ DO: Review generated tests

Copilot tạo tests là **starting point**, không phải final.

**Check:**
- Coverage đủ chưa? (happy path + edge cases)
- Assertions đúng chưa?
- Test names rõ ràng chưa?

---

#### ✅ DO: Add edge cases manually

Copilot có thể miss edge cases:

```typescript
// Copilot generate:
describe('divide', () => {
  it('should divide numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
});

// ✅ Add edge case:
it('should throw error when dividing by zero', () => {
  expect(() => divide(10, 0)).toThrow('Division by zero');
});
```

---

#### ⚠️ DON'T: Expect perfect tests

Generated tests:
- ✅ Good for happy path
- ⚠️ May miss edge cases
- ⚠️ May not test error handling thoroughly

→ Review và improve

---

### 3.2. Debugging Best Practices

#### ✅ DO: Provide full context

Khi hỏi Copilot:
- Paste error message đầy đủ
- Paste code liên quan
- Paste test cases (nếu có)

❌ Tệ:
```
Why is my function not working?
```

✅ Tốt:
```
This function returns wrong result:

[paste function]

Test that fails:
[paste test]

Expected: 10
Actual: 5

Why?
```

---

#### ✅ DO: Ask for explanations first

Trước khi fix:
1. Hiểu tại sao lỗi → Ask Copilot explain
2. Hiểu approach to fix
3. Implement fix

Đừng blind apply fixes without understanding.

---

#### ✅ DO: Use `@workspace` for codebase-specific issues

```
@workspace Why might user sessions be expiring early?
```

→ Copilot scan codebase, tìm session-related code

---

## Demo Scenarios

### Demo 1: Generate Tests Workflow

1. Viết function:
   ```typescript
   function fibonacci(n: number): number {
     if (n <= 1) return n;
     return fibonacci(n - 1) + fibonacci(n - 2);
   }
   ```

2. Select function → Right-click → Generate Tests

3. Review generated tests:
   ```typescript
   describe('fibonacci', () => {
     it('should return 0 for n=0', () => {
       expect(fibonacci(0)).toBe(0);
     });
     it('should return 1 for n=1', () => {
       expect(fibonacci(1)).toBe(1);
     });
     it('should calculate fibonacci numbers correctly', () => {
       expect(fibonacci(5)).toBe(5); // 0,1,1,2,3,5
       expect(fibonacci(10)).toBe(55);
     });
   });
   ```

4. Thêm edge case:
   ```typescript
   it('should throw for negative numbers', () => {
     expect(() => fibonacci(-1)).toThrow();
   });
   ```

---

### Demo 2: Debug Failing Test

1. Test fails:
   ```
   Expected: [1, 2, 3]
   Received: [3, 2, 1]
   ```

2. Ask Copilot:
   ```
   Why is this test failing?
   [paste test + implementation]
   ```

3. Copilot explain issue

4. Fix code

5. Rerun test → pass

---

### Demo 3: TDD Workflow

1. Write test first:
   ```typescript
   it('should validate strong password', () => {
     expect(isStrongPassword('Ab1!')).toBe(false); // Too short
     expect(isStrongPassword('Abcdefg1')).toBe(false); // No special char
     expect(isStrongPassword('Abcdefg1!')).toBe(true); // Strong
   });
   ```

2. Copilot suggest implementation để pass test

3. Run test → adjust if needed

---

## Tóm lại

### Testing

| Task | Cách làm | Tool |
|------|----------|------|
| Generate tests | Select code → Context menu | Smart Action |
| TDD | Write test first → Copilot suggest impl | Inline Chat |
| Add test cases | Chat với Copilot | Ask mode |

### Debugging

| Task | Cách làm | Tool |
|------|----------|------|
| Explain error | Paste error → Ask Copilot | Chat |
| Fix failing test | Paste test + error → Ask why | Chat |
| Debug logic | Ask Copilot review code | Ask mode |
| Analyze stack trace | Paste trace → Ask for analysis | Chat |

**Câu nhớ:**
> Code xong → gen tests. Test fail → ask Copilot. Lỗi khó → explain rồi mới fix!
