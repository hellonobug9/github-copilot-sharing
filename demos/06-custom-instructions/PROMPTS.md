# Custom Instructions – Cá Nhân Hóa Copilot

## TL;DR

**Custom Instructions** = file `.github/copilot-instructions.md` để "dạy" Copilot hiểu quy tắc riêng của team/project

**Không có instructions:**
→ Copilot suggest theo general best practices

**Có instructions:**
→ Copilot suggest theo **quy tắc của bạn**

**Rule of thumb:**
> Team có conventions riêng → viết custom instructions → cả team được lợi!

---

## 1. Custom Instructions là gì?

**Custom Instructions** = một file markdown chứa rules, conventions, patterns mà bạn muốn Copilot follow.

File path:
```
.github/copilot-instructions.md
```

Khi có file này:
- Copilot đọc instructions
- Apply vào mọi suggestions, chat responses
- Generate code theo đúng style/conventions của bạn

Giống như:
- Onboard một dev mới → đưa style guide
- Onboard Copilot → đưa custom instructions

---

## 2. Khi nào nên dùng Custom Instructions?

### ✅ Nên dùng khi:

**1. Team có coding conventions riêng**
- Naming conventions khác standard
- File structure đặc biệt
- Import order rules

**2. Project có architecture cụ thể**
- Clean Architecture layers
- Specific folder structure
- Dependency rules

**3. Muốn enforce best practices**
- Security patterns
- Error handling standards
- Testing requirements

**4. Team dùng tech stack đặc biệt**
- Custom framework
- Internal libraries
- Specific patterns

---

### ⚠️ Không cần dùng khi:

- Project nhỏ, một người code
- Follow standard conventions (không có gì đặc biệt)
- Còn đang thử nghiệm, chưa có conventions cố định

---

## 3. Cách tạo Custom Instructions

### Bước 1: Tạo file

```bash
mkdir -p .github
touch .github/copilot-instructions.md
```

---

### Bước 2: Viết instructions

**Template cơ bản:**

```markdown
# Project Coding Conventions

## File Structure
[Mô tả cách organize files]

## Naming Conventions
[Quy tắc đặt tên]

## Code Style
[Style preferences]

## Architecture Rules
[Dependency rules, layers]

## Common Patterns
[Patterns hay dùng với examples]
```

---

### Bước 3: Commit vào repo

```bash
git add .github/copilot-instructions.md
git commit -m "docs: add Copilot custom instructions"
git push
```

→ Cả team đều dùng chung instructions!

---

## 4. Ví dụ Real-World Instructions

### Ví dụ 1: React Project Conventions

```markdown
# React Project Coding Conventions

## File Structure

All React components must be in `src/components/`:
```
src/components/
  ComponentName/
    ComponentName.tsx       # Component
    ComponentName.test.tsx  # Tests
    ComponentName.module.css # Styles
    index.ts                # Re-export
```

## Naming Conventions

- **Components**: PascalCase (`UserProfile`, `ProductCard`)
- **Hooks**: camelCase with "use" prefix (`useAuth`, `useFetch`)
- **Utilities**: camelCase (`formatDate`, `validateEmail`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)

## Code Style

- **Always use named exports**, never default exports
- **All functions must have explicit return types**
- **Use functional components with hooks**, no class components
- **Prefer const over let**, never use var

## Common Patterns

### API Calls

Always use our custom `apiClient`:

```typescript
// ✅ Good
import { apiClient } from '@/lib/api';
const users = await apiClient.get<User[]>('/users');

// ❌ Bad
fetch('/api/users')
```

### Error Handling

Always use try-catch with proper error typing:

```typescript
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  if (error instanceof ApiError) {
    logger.error('API error:', error.message);
    throw error;
  }
  throw new UnexpectedError(error);
}
```

### State Management

Use Zustand stores in `src/stores/`:

```typescript
// ✅ Good
import { useAuthStore } from '@/stores/auth';
const { user, login, logout } = useAuthStore();

// ❌ Bad - Don't use Redux or Context API
```
```

---

### Ví dụ 2: Clean Architecture Project

```markdown
# Clean Architecture Guidelines

## Layer Structure

This project follows Clean Architecture with strict dependency rules:

```
domain/         # Entities, business logic (no external dependencies)
application/    # Use cases, services (can import from domain only)
infrastructure/ # APIs, database, external services
presentation/   # UI components, pages (can import from all layers)
```

## Dependency Rules

### Critical: Never violate these rules

1. **Domain layer** → No dependencies on other layers
2. **Application layer** → Can only import from `domain/`
3. **Infrastructure layer** → Can import from `domain/` and `application/`
4. **Presentation layer** → Can import from all layers

### Examples

```typescript
// ✅ Good - Application uses Domain
// application/use-cases/CreateUser.ts
import { User } from '../../domain/entities/User';

// ❌ Bad - Domain importing from Infrastructure
// domain/entities/User.ts
import { database } from '../../infrastructure/database'; // NEVER DO THIS
```

## Folder Naming

- Use **kebab-case** for all folders: `user-management/`, `order-processing/`
- Group by feature, not by type

## When suggesting code:

- Always ask which layer the code belongs to
- Respect dependency rules
- Use dependency injection for services
- Keep business logic in domain layer
```

---

### Ví dụ 3: Security-Focused Project

```markdown
# Security Guidelines

## Authentication

All API endpoints must check authentication:

```typescript
// ✅ Good
export async function handler(req: AuthenticatedRequest) {
  const user = req.user; // Already validated by middleware
  // ... implementation
}

// ❌ Bad - No auth check
export async function handler(req: Request) {
  // Direct implementation without auth
}
```

## Input Validation

All user inputs must be validated with Zod:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// ✅ Good
const input = UserSchema.parse(req.body);

// ❌ Bad
const { email, password } = req.body; // No validation
```

## Sensitive Data

Never log sensitive data:

```typescript
// ✅ Good
logger.info('User logged in', { userId: user.id });

// ❌ Bad
logger.info('User logged in', { user }); // Contains password, email, etc.
```

## SQL Queries

Always use parameterized queries:

```typescript
// ✅ Good
db.query('SELECT * FROM users WHERE id = ?', [userId]);

// ❌ Bad
db.query(`SELECT * FROM users WHERE id = ${userId}`); // SQL injection risk
```
```

---

## 5. Best Practices cho Instructions

### ✅ DO: Viết ngắn gọn, dễ hiểu

**Mục tiêu:** 1-3 pages, không viết essay

❌ Tệ: Wall of text, lý thuyết dài dòng

✅ Tốt: Bullet points, examples cụ thể

---

### ✅ DO: Có examples cho mỗi rule

**Không chỉ nói "Don't do X", mà show:**
- ❌ Bad example
- ✅ Good example

```markdown
## Error Handling

❌ Bad:
```typescript
const data = await fetchData(); // No error handling
```

✅ Good:
```typescript
try {
  const data = await fetchData();
  return data;
} catch (error) {
  logger.error('Failed to fetch data', error);
  throw new DataFetchError(error);
}
```
```

---

### ✅ DO: Prioritize important rules

**Đặt rules quan trọng nhất lên đầu:**
- Security rules
- Architecture constraints
- Critical conventions

**Rules ít quan trọng để sau:**
- Code formatting (có linter lo)
- Personal preferences

---

### ✅ DO: Update thường xuyên

Conventions thay đổi → update file:
- New patterns được adopt
- Old patterns deprecated
- Team learn new best practices

```bash
git add .github/copilot-instructions.md
git commit -m "docs: update Copilot instructions - add new API patterns"
```

---

### ⚠️ DON'T: Copy-paste generic style guides

❌ Đừng copy Airbnb style guide, Google style guide vào đây

→ Copilot đã biết những cái đó rồi

✅ Chỉ viết những gì **đặc biệt** với project của bạn

---

### ⚠️ DON'T: Quá chi tiết về formatting

❌ Tệ:
```markdown
- Use 2 spaces for indentation
- Max line length 80 characters
- Semicolons required
```

→ Để Prettier/ESLint lo việc này

✅ Tốt: Focus vào business logic, architecture, patterns

---

### ⚠️ DON'T: Conflict với tooling

Nếu có ESLint rule `"quotes": ["error", "single"]`:

❌ Đừng viết: "Always use double quotes"
→ Conflict, confusing

✅ Trust tooling, đừng repeat trong instructions

---

## 6. Testing Instructions

### Cách test

1. **Viết instructions**
2. **Mở Copilot Chat**
3. **Test với prompts:**

```
Create a new API endpoint for user registration following project conventions
```

4. **Check output:**
   - Có follow file structure không?
   - Có dùng đúng naming conventions không?
   - Có follow patterns trong instructions không?

5. **Refine instructions nếu cần**

---

### Ví dụ test

**Instructions:**
```markdown
## API Endpoints

All API endpoints must:
- Be in `src/api/` folder
- Use Zod for validation
- Return standardized response format
```

**Test prompt:**
```
Create a new API endpoint to get user profile by ID
```

**Expected output:**
```typescript
// src/api/users/profile.ts
import { z } from 'zod';

const ParamsSchema = z.object({
  id: z.string().uuid(),
});

export async function getUserProfile(req: Request) {
  const { id } = ParamsSchema.parse(req.params);
  
  const user = await db.users.findUnique({ where: { id } });
  
  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }
  
  return {
    success: true,
    data: user,
  };
}
```

✅ Follow folder structure
✅ Use Zod validation
✅ Standardized response format

---

## 7. Advanced: Scope-Specific Instructions

Có thể có instructions khác nhau cho từng folder:

### Workspace-level (áp dụng cho toàn repo)

```
.github/copilot-instructions.md
```

### Folder-level (áp dụng cho folder cụ thể)

```
src/api/.copilot-instructions.md       # Rules for API code
src/components/.copilot-instructions.md # Rules for components
tests/.copilot-instructions.md          # Rules for tests
```

**Use case:** Backend vs Frontend có conventions khác nhau

---

## 8. Examples by Project Type

### Next.js Project

```markdown
# Next.js Project Guidelines

## App Router

We use Next.js 14 App Router (not Pages Router):

- Pages: `app/[route]/page.tsx`
- Layouts: `app/[route]/layout.tsx`
- API Routes: `app/api/[route]/route.ts`

## Server vs Client Components

Default to Server Components. Only add `'use client'` when needed:

```typescript
// ✅ Server Component (default)
export default function ProfilePage() {
  // Server-side data fetching
}

// ✅ Client Component (when using hooks/interactivity)
'use client';
export default function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

## Data Fetching

Use Server Actions, not API routes:

```typescript
// ✅ Good - Server Action
'use server';
export async function createUser(data: FormData) {
  const user = await db.user.create({ ... });
  revalidatePath('/users');
  return user;
}

// ❌ Bad - API route for simple CRUD
// app/api/users/route.ts
```
```

---

### Node.js Backend Project

```markdown
# Node.js Backend Guidelines

## Project Structure

```
src/
  routes/      # Express routes
  controllers/ # Business logic
  services/    # External API calls, complex operations
  models/      # Database models
  middlewares/ # Express middlewares
  utils/       # Helper functions
```

## Error Handling

All async functions must use try-catch:

```typescript
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ success: false, error: error.message });
    } else {
      logger.error('User creation failed', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
};
```

## Database

Use Prisma ORM:

```typescript
// ✅ Good
const user = await prisma.user.findUnique({ where: { id } });

// ❌ Bad - Raw SQL
const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
```
```

---

## 9. Demo Scenarios

### Demo 1: Before vs After Instructions

**Scenario:** Generate a new React component

**Before (no instructions):**

Prompt: `Create a UserCard component`

Output:
```typescript
// UserCard.tsx (file đơn lẻ, không follow structure)
export default function UserCard({ user }) { // default export, no types
  return <div>{user.name}</div>;
}
```

---

**After (with instructions):**

Instructions specify:
- Component folder structure
- Named exports only
- Explicit types

Output:
```typescript
// src/components/UserCard/UserCard.tsx
interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return <div className={styles.card}>{user.name}</div>;
}

// src/components/UserCard/index.ts
export { UserCard } from './UserCard';
```

✅ Follow structure, named export, typed!

---

### Demo 2: Architecture Enforcement

**Instructions:**
```markdown
## Architecture

Never import infrastructure code into domain layer.
```

**Test prompt:**
```
Create a User entity in the domain layer
```

**Before instructions:**
```typescript
// domain/User.ts
import { database } from '../infrastructure/database'; // ❌ Violates rule

export class User {
  async save() {
    await database.users.create(this); // ❌ Domain shouldn't know about DB
  }
}
```

**After instructions:**
```typescript
// domain/User.ts
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}
  
  // Pure domain logic only, no DB operations
  isValidEmail(): boolean {
    return /\S+@\S+\.\S+/.test(this.email);
  }
}
```

✅ No infrastructure dependencies!

---

## Best Practices Summary

### ✅ DO

1. **Viết ngắn gọn** (1-3 pages)
2. **Có examples** cho mỗi rule
3. **Prioritize** important rules
4. **Update thường xuyên**
5. **Test instructions** với real prompts
6. **Commit vào repo** để cả team dùng

### ⚠️ DON'T

1. **Copy generic style guides**
2. **Quá chi tiết về formatting** (để linter lo)
3. **Conflict với tooling** (ESLint, Prettier)
4. **Viết quá dài**, không ai đọc

---

## Tóm lại

**Custom Instructions** = file `.github/copilot-instructions.md` để customize Copilot behavior

**Use cases:**
- Team conventions
- Project architecture
- Security patterns
- Tech stack specifics

**Format:**
- Markdown file
- Short & concise
- Examples for each rule
- Focus on what's unique to your project

**Workflow:**
1. Create `.github/copilot-instructions.md`
2. Write conventions with examples
3. Commit to repo
4. Test with Copilot
5. Refine iteratively

**Câu nhớ:**
> Instructions rõ ràng → Copilot suggest đúng style → Cả team consistent!
