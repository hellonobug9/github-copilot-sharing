# Model Selection – Chọn AI Model Phù Hợp

## TL;DR

VS Code Copilot hỗ trợ nhiều models:

| Model | Speed | Best For |
|-------|-------|----------|
| **Claude 3.5 Sonnet** | ⚡ Fast | Daily coding (default) |
| **GPT-4o** | ⚡ Fast | Explanations, docs |
| **o1-preview** | 🐢 Slow | Complex algorithms, design |
| **o1-mini** | ⚡⚡ Medium | Quick debugging |

**Rule:**
> Đơn giản → Claude/GPT-4o. Phức tạp → o1-preview. Nhanh rẻ → o1-mini.

---

## 1. Cách Switch Models

1. Mở Chat View
2. Click model dropdown (góc trên trái)
3. Chọn model

---

## 2. Claude 3.5 Sonnet ⭐ (Mặc định)

**Dùng cho:**
- Code generation hằng ngày
- Refactoring
- Convert code (JS → TS)
- Add features

**Điểm mạnh:**
- ✅ Fast response
- ✅ Hiểu context tốt
- ✅ Balanced quality/speed
- ✅ Tốt với TS, React, Node.js

**Ví dụ:**
```
Create a React hook for debouncing input
Refactor this to async/await
Add pagination to this API
```

---

## 3. GPT-4o

**Dùng cho:**
- Explanations, documentation
- Creative tasks (naming, design)
- Natural language heavy tasks
- Learning/teaching

**Điểm mạnh:**
- ✅ Excellent explanations
- ✅ Good with English
- ✅ Creative suggestions

**Ví dụ:**
```
Explain this algorithm in simple terms
Suggest better variable names
Write user-facing docs for this API
```

---

## 4. o1-preview

**Dùng cho:**
- Complex algorithms
- Architecture design
- Optimization problems
- Deep reasoning needed

**Điểm mạnh:**
- ✅ Deep reasoning
- ✅ Handle complex logic
- ✅ Better at math/algorithms

**Điểm yếu:**
- ⚠️ Slow (10-30 seconds)
- ⚠️ High token cost

**Ví dụ:**
```
Design an efficient caching strategy for this system
Implement Dijkstra's shortest path algorithm
Optimize this algorithm for large datasets
Plan a microservices architecture
```

---

## 5. o1-mini

**Dùng cho:**
- Quick reasoning tasks
- Debugging logic
- Small optimizations
- When need fast + cheap

**Điểm mạnh:**
- ✅ Faster than o1-preview
- ✅ Cheaper
- ✅ Good reasoning for size

**Ví dụ:**
```
Why is this conditional always true?
Find the bug in this logic
Suggest a simpler approach
```

---

## 6. Decision Tree

```
Task của bạn:

├─ Code thường ngày, refactor
│  └─ Claude 3.5 Sonnet (default)
│
├─ Giải thích, docs, learning
│  └─ GPT-4o
│
├─ Algorithm phức tạp, architecture
│  └─ o1-preview (chấp nhận chậm)
│
└─ Debug nhanh, logic đơn giản
   └─ o1-mini
```

---

## 7. Ví Dụ Thực Tế

| Task | Model | Lý do |
|------|-------|-------|
| "Create CRUD API" | Claude 3.5 | Daily code gen |
| "Explain clean architecture" | GPT-4o | Explanation |
| "Design distributed cache" | o1-preview | Complex design |
| "Why is this if always false?" | o1-mini | Quick debug |
| "Refactor this class" | Claude 3.5 | Standard refactor |
| "Write technical docs" | GPT-4o | Documentation |
| "Implement A* pathfinding" | o1-preview | Complex algorithm |

---

## 8. When to Switch

### Stick với Claude (default) khi:
- Coding bình thường
- Không có vấn đề gì
- Cần nhanh

### Switch sang GPT-4o khi:
- Cần explanation chi tiết
- Writing docs
- Creative naming

### Switch sang o1-preview khi:
- Algorithm phức tạp
- System design
- Claude/GPT-4o không handle được

### Switch sang o1-mini khi:
- Cần reasoning nhẹ
- o1-preview quá chậm
- Budget tight

---

## Best Practices

### ✅ DO
- Dùng Claude cho most tasks (default)
- Switch sang o1-preview cho complex problems
- Use GPT-4o cho explanations
- Try o1-mini trước o1-preview nếu unsure

### ⚠️ DON'T
- Dùng o1-preview cho simple tasks (lãng phí)
- Expect o1-preview nhanh
- Forget models có strengths khác nhau

---

## Demo Scenarios (để present)

### Demo 1: Same Prompt, Different Models

**Prompt:** "Explain how React useEffect works"

- Claude 3.5: Good technical explanation
- GPT-4o: More beginner-friendly, detailed
- o1-preview: Deep dive with edge cases (but slow)

### Demo 2: Complex vs Simple Task

**Simple:** "Add error handling to this function"
→ Claude 3.5 (fast, good enough)

**Complex:** "Design a rate-limiting system with Redis"
→ o1-preview (need deep thought)

---

## Tóm Lại

| Model | Speed | Use For |
|-------|-------|---------|
| Claude 3.5 | ⚡ | Daily code (default) |
| GPT-4o | ⚡ | Docs, explain |
| o1-preview | 🐢 | Complex algorithms |
| o1-mini | ⚡⚡ | Quick debug |

**Câu nhớ:**
> Claude cho code. GPT-4o cho explain. o1-preview cho think deep. o1-mini cho quick think!
