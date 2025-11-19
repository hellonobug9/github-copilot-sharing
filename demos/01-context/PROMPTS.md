# Workspace Context, `@workspace` và `#codebase`

## Copilot hiểu cả repo như thế nào?

**Workspace context** = Copilot build index cho toàn bộ repo (files, functions, symbols)

→ Hỏi câu hỏi ở repo A vs repo B → câu trả lời khác nhau

---

## 3 loại Index

| Loại | Khi nào dùng | Cách bật |
|------|--------------|----------|
| **Remote** 🌐 | Repo trên GitHub, >2500 files, team | Lần đầu dùng `@workspace` → Accept popup |
| **Local** 💻 | Repo local, <2500 files | Command: Build Local Index |
| **Basic** 📄 | Fallback tự động | Không cần làm gì |

**Best:** Remote > Local > Basic

---

## `@workspace` vs `#codebase`

### `@workspace` = Hỏi về codebase

```
@workspace Where is the login functionality?
@workspace How does the payment flow work?
@workspace Where should I add the new feature?
```

### `#codebase` = Code theo style repo

```
Refactor this to follow #codebase patterns
Generate endpoint similar to #codebase
```

**Rule:** Hỏi → `@workspace`, Code theo style → `#codebase`

---

## Tips hỏi tốt

✅ **Cụ thể:**
```
@workspace How does payment processing work from checkout to confirmation?
```

❌ **Chung chung:**
```
@workspace How does this work?
```

✅ **Theo layers:**
```
@workspace List all controllers in backend
@workspace Show custom React hooks
```

---

## Demo nhanh

### Demo 1: Onboard repo mới
```
@workspace Give me an overview of this project
@workspace Where is the main entry point?
```

### Demo 2: Tìm nơi add feature
```
@workspace Where should I add forgot password feature?
```

### Demo 3: So sánh
```
@workspace How is error handling done?  (hỏi)
Refactor using #codebase patterns       (code)
```

---

**Câu nhớ:**
> Index tốt → `@workspace` thông minh → Hiểu code nhanh hơn!
