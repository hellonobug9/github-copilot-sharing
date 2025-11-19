# Custom Instructions – Cá Nhân Hóa Copilot

## TL;DR

**Custom Instructions** = file `.github/copilot-instructions.md` để "dạy" Copilot quy tắc riêng

**Không có instructions:**  
→ Copilot suggest theo general best practices

**Có instructions:**  
→ Copilot suggest theo **quy tắc của bạn**

**Rule:**
> Team có conventions riêng → viết custom instructions → cả team được lợi!

---

## 1. Custom Instructions Là Gì?

File markdown chứa rules, conventions mà Copilot phải follow:

```
.github/copilot-instructions.md
```

Copilot sẽ:
- Đọc instructions
- Apply vào suggestions & chat
- Generate code theo style của bạn

---

## 2. Khi Nào Dùng?

### ✅ Nên dùng khi:
- Team có coding conventions riêng
- Project có architecture cụ thể
- Muốn enforce best practices
- Dùng tech stack/framework đặc biệt

### ⚠️ Không cần khi:
- Project nhỏ, 1 người
- Follow standard conventions
- Chưa có conventions cố định

---

## 3. Cách Tạo

### Bước 1: Tạo file
```bash
mkdir -p .github
touch .github/copilot-instructions.md
```

### Bước 2: Viết instructions

**Template cơ bản:**
```markdown
# Project Coding Conventions

## File Structure
- Features: `src/features/<feature>/`
- Components: `src/components/`
- Utils: `src/utils/`

## Naming Conventions
- Components: PascalCase
- Hooks: `use` prefix
- Constants: UPPER_SNAKE_CASE

## Code Style
- Use TypeScript strict mode
- Prefer functional components
- Use named exports

## Testing
- Every feature must have tests
- Use Jest + React Testing Library
```

---

## 4. Ví Dụ Instructions

### Example 1: React Project
```markdown
# React Project Guidelines

## Component Structure
- One component per file
- Props interface above component
- Export at bottom

## State Management
- Use Zustand for global state
- React Query for server state
- Local state with useState

## Styling
- Use Tailwind CSS
- No inline styles
- Component variants with cva

## Error Handling
- Use error boundaries
- Log errors to Sentry
- Show user-friendly messages
```

### Example 2: Next.js API Routes
```markdown
# API Route Conventions

## Structure
```
/api
  /users
    GET.ts    # List users
    POST.ts   # Create user
    /[id]
      GET.ts  # Get user
      PUT.ts  # Update user
      DELETE.ts
```

## Response Format
```json
{
  "success": boolean,
  "data": any,
  "error": string | null
}
```

## Error Handling
- 400: Bad request (validation)
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error
```

### Example 3: Security Rules
```markdown
# Security Requirements

## Authentication
- Always validate JWT tokens
- Check user permissions
- Never trust client data

## Data Validation
- Validate all inputs with Zod
- Sanitize user-generated content
- Use parameterized queries

## Secrets
- Never hardcode secrets
- Use environment variables
- Never log sensitive data
```

---

## 5. Hiệu Quả Của Instructions

### Trước khi có instructions:

**Prompt:** "Create a user component"

**Copilot:**
```typescript
export default function User() {
  return <div>User</div>;
}
```

### Sau khi có instructions:

**Trong `.github/copilot-instructions.md`:**
```markdown
- Use named exports
- Props interface above component
- Use TypeScript
```

**Prompt:** "Create a user component"

**Copilot:**
```typescript
interface UserProps {
  name: string;
  email: string;
}

export function User({ name, email }: UserProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
```

---

## 6. Best Practices

### ✅ DO
1. **Specific, actionable rules**
   ```markdown
   ✅ Use named exports
   ❌ Write good code
   ```

2. **Include examples**
   ```markdown
   ## Function Naming
   Use verb + noun pattern:
   - getUserById()
   - createOrder()
   - updateProfile()
   ```

3. **Update khi conventions thay đổi**

4. **Commit vào repo** → Cả team dùng chung

### ⚠️ DON'T
1. Viết quá chung chung
2. Quá dài (> 500 lines)
3. Mâu thuẫn với nhau

---

## 7. Demo Scenarios (để present)

### Demo 1: Trước/Sau Instructions

**Setup:**
1. Generate component không có instructions
2. Thêm instructions file
3. Generate lại → see difference

### Demo 2: Team Convention

**Scenario:** Team quy định:
- API responses phải có format cố định
- Error handling theo pattern riêng

**Instructions:**
```markdown
## API Response Format
```json
{ "success": boolean, "data": any, "error": string | null }
```

**Generate API route → Copilot follow format**

---

## Tóm Lại

| Khía cạnh | Chi tiết |
|-----------|----------|
| **File location** | `.github/copilot-instructions.md` |
| **Dùng khi nào** | Team có conventions riêng |
| **Lợi ích** | Consistent code, cả team cùng style |
| **Format** | Markdown, specific rules + examples |

**Câu nhớ:**
> Custom instructions = Onboard Copilot vào team của bạn!
