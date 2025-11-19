# Model Selection – Chọn AI Model Phù Hợp

## TL;DR

VS Code Copilot hỗ trợ nhiều AI models:
- **Claude 3.5 Sonnet** → Code generation, refactor (fast, balanced)
- **GPT-4o** → Creative tasks, documentation, explanations (fast)
- **o1-preview** → Complex algorithms, architecture design (slow, smart)
- **o1-mini** → Quick reasoning, debugging logic (medium speed)

**Rule of thumb:**

| Task | Model phù hợp | Lý do |
|------|---------------|-------|
| Code thường ngày | Claude 3.5 Sonnet | Fast, good balance |
| Explain/docs | GPT-4o | Good at natural language |
| Complex algorithm | o1-preview | Deep reasoning |
| Quick debug | o1-mini | Fast reasoning, cheap |

> Task đơn giản → Claude/GPT-4o. Task phức tạp cần think deep → o1-preview. Cần nhanh + rẻ → o1-mini.

---

## 1. Available Models

### Overview

| Model | Provider | Speed | Cost | Best For |
|-------|----------|-------|------|----------|
| **Claude 3.5 Sonnet** | Anthropic | ⚡ Fast | ⭐⭐ Medium | Code gen, refactor |
| **GPT-4o** | OpenAI | ⚡ Fast | ⭐⭐ Medium | Docs, explanations |
| **o1-preview** | OpenAI | 🐢 Slow | ⭐⭐⭐ High | Algorithms, design |
| **o1-mini** | OpenAI | ⚡⚡ Medium | ⭐ Low | Quick reasoning |

---

### Cách switch models

1. Mở Chat View
2. Click vào model dropdown (góc trên bên trái)
3. Chọn model

Hoặc:
- Settings → "github.copilot.model"

---

## 2. Claude 3.5 Sonnet

### Điểm mạnh

- ✅ **Code generation rất tốt**
- ✅ Hiểu context codebase tốt
- ✅ Fast response time
- ✅ Balanced giữa speed và quality
- ✅ Tốt với TypeScript, React, Node.js

### Điểm yếu

- ⚠️ Không đặc biệt với complex algorithms
- ⚠️ Deep reasoning kém hơn o1-preview

### Dùng cho

**1. Code generation hằng ngày**
```
Generate a React component for user profile card with avatar, name, bio
```

**2. Refactoring**
```
Refactor this function to use async/await and add proper error handling
```

**3. Convert code**
```
Convert this JavaScript code to TypeScript with proper types
```

**4. Add features**
```
Add pagination support to this API endpoint
```

### Ví dụ prompt

```
Create a custom React hook for debouncing user input
```

**Claude output:**
```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

✅ Clean, practical code

---

## 3. GPT-4o

### Điểm mạnh

- ✅ **Natural language tasks** rất tốt
- ✅ Explanations chi tiết
- ✅ Documentation quality cao
- ✅ Creative với naming, comments
- ✅ Fast response

### Điểm yếu

- ⚠️ Code generation kém hơn Claude một chút
- ⚠️ Có thể verbose (dài dòng)

### Dùng cho

**1. Explain code/concepts**
```
Explain how React useEffect works with dependencies
```

**2. Write documentation**
```
Write comprehensive README for this project
```

**3. Generate examples**
```
Show me 5 examples of using Promise.all in real scenarios
```

**4. Brainstorm**
```
Suggest 10 feature ideas for a task management app
```

### Ví dụ prompt

```
Explain the difference between useMemo and useCallback with examples
```

**GPT-4o output:**
```markdown
## useMemo vs useCallback

Both are React hooks for optimization, but they memoize different things:

### useMemo - Memoizes **values**

Caches the **result** of a computation.

**Use case:** Expensive calculations

**Example:**
```typescript
const expensiveValue = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);
```

Without useMemo: Calculation runs on every render
With useMemo: Calculation only runs when `items` changes

### useCallback - Memoizes **functions**

Caches the **function instance** itself.

**Use case:** Passing callbacks to optimized child components

**Example:**
```typescript
const handleClick = useCallback(() => {
  console.log('Clicked', userId);
}, [userId]);

return <ChildComponent onClick={handleClick} />;
```

Without useCallback: New function instance on every render → child re-renders
With useCallback: Same function instance if `userId` unchanged → no re-render

### Rule of thumb:

- **useMemo**: "This calculation is expensive"
- **useCallback**: "This function is passed to optimized children"
```

✅ Clear explanations, good examples

---

## 4. o1-preview

### Điểm mạnh

- ✅ **Deep reasoning** - "thinks" before answering
- ✅ Tốt với complex algorithms
- ✅ System design, architecture
- ✅ Giải quyết bài toán logic phức tạp
- ✅ Trade-off analysis

### Điểm yếu

- ⚠️ **Rất chậm** (30s - 2 phút)
- ⚠️ **Tốn token nhiều**
- ⚠️ Free tier có **giới hạn requests/day**
- ⚠️ Overkill cho tasks đơn giản

### Dùng cho

**1. Algorithm design**
```
Design an efficient algorithm to find the k-th largest element in a stream of integers
```

**2. Architecture decisions**
```
Design a scalable caching strategy for an e-commerce site that handles:
- Cache invalidation across multiple servers
- Rate limiting per user
- Concurrent requests to same resource
- Memory constraints

Analyze trade-offs of different approaches.
```

**3. Complex debugging**
```
This distributed system has a race condition. Analyze the code and suggest solutions:
[paste complex multi-threaded code]
```

**4. Optimization**
```
Optimize this database query for a table with 100M rows:
[paste query]

Consider indexes, query planning, and alternative approaches.
```

### Ví dụ prompt

```
Design a rate limiting system that:
- Supports multiple rate limit rules (per user, per IP, per API key)
- Scales to millions of requests per second
- Has minimal latency overhead
- Is distributed across multiple servers

Analyze trade-offs of different approaches.
```

**o1-preview output:**
```markdown
Let me analyze different approaches for distributed rate limiting:

## Approach 1: Token Bucket with Redis

**Architecture:**
- Central Redis cluster stores token counts
- Each API server checks Redis before allowing requests
- Atomic operations ensure consistency

**Pros:**
- Simple to implement
- Consistent across all servers
- Easy to monitor

**Cons:**
- Redis becomes bottleneck at extreme scale
- Network latency to Redis on every request (~1-2ms)
- Single point of failure (mitigated with Redis Cluster)

**Good for:** Up to ~100K RPS

## Approach 2: Leaky Bucket with Local Cache + Eventual Consistency

**Architecture:**
- Each server maintains local token bucket
- Sync state to Redis periodically (every 100ms)
- Accept small inconsistencies

**Pros:**
- Very low latency (local check only)
- Scales to millions of RPS
- Redis only for sync, not on critical path

**Cons:**
- Slightly inaccurate (user might exceed limit by ~10% during sync window)
- More complex implementation
- Requires careful tuning

**Good for:** >100K RPS, can tolerate small errors

## Approach 3: Distributed Counter with Consistent Hashing

**Architecture:**
- Partition key space across servers using consistent hashing
- Each request routes to deterministic server based on user ID
- No central Redis for hot path

**Pros:**
- Horizontally scalable
- No single point of failure
- Sub-millisecond latency

**Cons:**
- Complex to implement
- Rebalancing on server add/remove
- Requires cluster management

**Good for:** Extreme scale (>1M RPS), mission-critical

## Recommendation:

For most cases: **Approach 2** (Local + Eventual Consistency)

Reasoning:
- Balances performance, scalability, complexity
- 10% error margin acceptable for rate limiting
- Easy to tune sync frequency vs accuracy
- Redis only for coordination, not bottleneck

Implementation sketch:
[detailed pseudocode follows...]
```

✅ Deep analysis, considers trade-offs, practical recommendation

---

## 5. o1-mini

### Điểm mạnh

- ✅ **Fast reasoning** - có khả năng reason nhưng nhanh hơn o1-preview
- ✅ **Rẻ token** nhất trong các reasoning models
- ✅ Tốt cho debugging, logic issues
- ✅ Good balance giữa speed và reasoning

### Điểm yếu

- ⚠️ Reasoning không sâu bằng o1-preview
- ⚠️ Less creative

### Dùng cho

**1. Quick debugging**
```
Why is this loop not terminating?
[paste code]
```

**2. Logic issues**
```
Find the bug in this conditional logic:
[paste code]
```

**3. Code review**
```
Review this function for potential issues
```

**4. Quick algorithm questions**
```
What's the time complexity of this code?
```

### Ví dụ prompt

```
Why does this infinite loop happen?

```typescript
let i = 0;
while (i < 10) {
  console.log(i);
  i += 0.1;
  if (i === 5) break;
}
```
```

**o1-mini output:**
```
The loop is infinite because of **floating-point precision issues**.

**Problem:**
`i` is incremented by 0.1, but 0.1 cannot be represented exactly in binary floating-point.

After multiple additions:
- i = 4.9 (ok)
- i = 5.0? No, it's actually 4.999999999999999 or 5.000000000000001
- i === 5 never true due to precision error
- Loop continues forever

**Fix 1: Use epsilon comparison**
```typescript
if (Math.abs(i - 5) < 0.0001) break;
```

**Fix 2: Use integer counter**
```typescript
for (let i = 0; i < 100; i++) {
  const value = i * 0.1;
  console.log(value);
  if (i === 50) break;
}
```

**Fix 3: Avoid floating-point in loop condition**
```typescript
for (let i = 0; i < 50; i++) {
  const value = i / 10;
  console.log(value);
}
```

Recommended: Fix 2 or 3
```

✅ Quick, correct diagnosis + practical fixes

---

## 6. Khi nào dùng model nào?

### Decision Tree

```
Task của bạn là gì?

├─ Code generation thường ngày (components, functions, refactor)
│  └─ ✅ Claude 3.5 Sonnet (default choice)
│
├─ Explain concepts, write docs, brainstorm
│  └─ ✅ GPT-4o
│
├─ Complex algorithm, architecture design, trade-off analysis
│  └─ ✅ o1-preview (accept slow speed)
│
└─ Quick debugging, logic issues, code review
   └─ ✅ o1-mini
```

---

### Ví dụ thực tế

| Task | Model | Lý do |
|------|-------|-------|
| "Create a login form component" | Claude 3.5 | Standard code gen |
| "Explain React context" | GPT-4o | Explanation task |
| "Design a distributed cache" | o1-preview | Complex system design |
| "Why is this function returning undefined?" | o1-mini | Quick debug |
| "Refactor this messy code" | Claude 3.5 | Code refactor |
| "Write README for this project" | GPT-4o | Documentation |
| "Optimize this sorting algorithm" | o1-preview | Algorithm optimization |
| "Find the bug in this if-statement" | o1-mini | Simple logic bug |

---

## 7. Token Cost và Free Tier Limits

### Free Tier (Copilot Free)

- **Limited completions per month**
- **Limited chat interactions per month**
- **o1-preview/o1-mini có giới hạn thấp hơn**

### Paid Tiers

- **Copilot Individual**: Higher limits
- **Copilot Business**: Even higher limits
- **o1-models vẫn đắt hơn** Claude/GPT-4o

### Best practice để tiết kiệm token

**1. Dùng model phù hợp**
- Đừng dùng o1-preview cho tasks đơn giản
- Default: Claude 3.5 Sonnet

**2. Viết prompts ngắn gọn**
- Cụ thể, không dài dòng
- Avoid redundancy

**3. Dùng inline suggestions khi có thể**
- Không tốn chat tokens
- Nhanh hơn

**4. Review output trước khi regenerate**
- Đừng spam regenerate
- Clarify prompt thay vì re-ask

---

## 8. Best Practices

### 1️⃣ Start với Claude 3.5 Sonnet (default)

80% tasks → Claude là đủ

Switch models chỉ khi:
- Cần explanation chi tiết → GPT-4o
- Task rất phức tạp → o1-preview
- Debug nhanh → o1-mini

---

### 2️⃣ Switch model giữa conversation

Có thể switch model giữa chat:
```
Step 1 (Claude): Generate this function
[review output]

Step 2 (o1-preview): Analyze performance bottlenecks
[detailed analysis]

Step 3 (Claude): Implement optimization
```

---

### 3️⃣ Evaluate output quality

Nếu Claude cho kết quả không tốt:
1. Improve prompt (often the issue)
2. Try GPT-4o
3. Last resort: o1-preview

Đừng assume "model khác = tốt hơn"

---

### 4️⃣ Check free tier limits

Nếu hit limits:
- Wait for reset (monthly)
- Upgrade to paid tier
- Use inline suggestions more

---

## 9. Demo Scenarios

### Demo 1: So sánh models cho cùng 1 task

**Task:** "Explain closures in JavaScript"

**Claude 3.5 Sonnet:**
```
Closures are functions that remember variables from their outer scope...
[concise, practical explanation]
```

**GPT-4o:**
```
# Understanding Closures in JavaScript

A closure is a powerful concept...
[detailed, structured explanation with multiple examples]
```

**o1-preview:**
```
Let me break down closures systematically...
[deep dive into lexical scope, execution contexts, use cases, gotchas]
```

→ GPT-4o best cho explanation tasks

---

### Demo 2: Complex task cần o1-preview

**Task:**
```
Design a consensus algorithm for a distributed key-value store that tolerates Byzantine failures
```

**Claude/GPT-4o:**
→ Generic answer, không sâu

**o1-preview:**
→ Detailed analysis of Raft vs Paxos vs PBFT, trade-offs, implementation considerations

---

### Demo 3: Quick debug với o1-mini

**Task:**
```
Why is this array empty?

const results = [];
[1,2,3].forEach(n => {
  setTimeout(() => results.push(n), 0);
});
console.log(results); // []
```

**o1-mini:**
```
The array is empty because `console.log` executes immediately,
but `setTimeout` callbacks execute later (asynchronously).

By the time callbacks run, console.log has already printed.

Fix with Promise.all:
[code example]
```

✅ Fast, correct answer

---

## Tóm lại

### Model Comparison

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| **Claude 3.5** | ⚡⚡⚡ | ⭐⭐ | Code gen (default) |
| **GPT-4o** | ⚡⚡⚡ | ⭐⭐ | Explanations, docs |
| **o1-preview** | 🐢 | ⭐⭐⭐ | Complex algorithms, design |
| **o1-mini** | ⚡⚡ | ⭐ | Quick debugging, reasoning |

### Quick Reference

| Task Type | Use Model | Why |
|-----------|-----------|-----|
| Daily coding | Claude 3.5 | Fast, balanced |
| Explain/Docs | GPT-4o | Best at natural language |
| System design | o1-preview | Deep reasoning |
| Quick debug | o1-mini | Fast + cheap |

**Câu nhớ:**
> 80% tasks dùng Claude. Explain → GPT-4o. Complex → o1-preview. Debug nhanh → o1-mini.
