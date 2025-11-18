# Workspace Context, `@workspace` và `#codebase`

## TL;DR

- Copilot **không chỉ nhìn file đang mở**, nó cố gắng hiểu **cả repo** thông qua workspace context
- **Workspace context** = index của toàn bộ codebase (files, functions, classes, symbols)
- Dùng **`@workspace`** hoặc **`#codebase`** để hỏi về toàn bộ repo
- Có 3 loại index: **Remote** (GitHub/Azure), **Local** (máy local), **Basic** (fallback)

---

## 1. Workspace context là gì?

Hiểu đơn giản:

Copilot build một **index cho repo** của bạn gồm:
- Tên file, folder structure
- Class, function, interface, type definitions
- Nội dung text trong files
- Symbol relationships (ai gọi ai, ai extend ai)

Khi bạn hỏi câu hỏi, Copilot:
1. **Search trên index** để tìm phần liên quan
2. **Đọc những file đó**
3. **Gửi context lên AI model** để trả lời

Vì vậy:
- Cùng một câu hỏi ở repo A vs repo B → câu trả lời khác nhau
- Copilot hiểu được **architecture, patterns, conventions** của từng repo

---

## 2. Copilot lấy context từ đâu?

Thứ tự ưu tiên (giống dev thật):

### Cao nhất
1. **Code đang bôi đen (selection)** - đang focus vào đây
2. **File đang mở trong editor** - đang nhìn
3. **Cursor position** - vị trí đang code

### Trung bình  
4. **Files gần đây đã mở** - vừa làm việc
5. **Related files** - files import/được import bởi file hiện tại
6. **Workspace index** - toàn bộ repo

### Lưu ý đặc biệt
- **File bị `.gitignore`** vẫn được đọc nếu:
  - Đang mở file đó, hoặc
  - Đang select code trong file đó
- **File quá lớn** (>1MB) có thể bị skip
- **Binary files** không được index

**Câu ngắn gọn**: Cái gì bạn đang nhìn, Copilot cũng cố gắng nhìn theo.

---

## 3. Ba loại Index: Remote / Local / Basic

### 🌐 Remote Index (Khuyên dùng cho GitHub/Azure DevOps repos)

**Khi nào dùng:**
- Repo đang ở trên **GitHub** hoặc **Azure DevOps**
- Repo lớn (>2500 files)
- Team nhiều người (share index)

**Ưu điểm:**
- ✅ Scale được repo rất lớn (không giới hạn số file)
- ✅ Search semantic thông minh (dựa trên GitHub Code Search)
- ✅ Build 1 lần, cả team dùng chung
- ✅ Tự động update khi có commit mới

**Cách bật:**
1. Login GitHub trong VS Code (Account icon bên trái)
2. Mở repo có trên GitHub
3. Lần đầu dùng `@workspace` → popup hỏi quyền → Accept
4. Hoặc chạy command: **"GitHub Copilot: Build Remote Workspace Index"**

**Kiểm tra status:**
- Nhìn status bar (góc dưới phải)
- Hoặc hover vào Copilot icon

---

### 💻 Local Index (Cho repos local hoặc private)

**Khi nào dùng:**
- Repo local, không push lên GitHub
- Repo private không muốn dùng remote index
- Repo nhỏ đến trung bình (<2500 files)

**Giới hạn:**
- ⚠️ Tối đa **~2500 files** được index semantic
- ⚠️ Build trên máy local → tốn tài nguyên
- ⚠️ Mỗi máy phải build riêng (không share được)

**Cách build:**
- **< 750 files**: VS Code tự động build
- **750-2500 files**: Phải chạy command thủ công
  - Command: **"GitHub Copilot: Build Local Workspace Index"**
  - Hoặc popup sẽ hỏi bạn khi mở `@workspace` lần đầu

**Thời gian build:**
- Nhỏ (500 files): ~30s - 1 phút
- Trung bình (1500 files): ~2-3 phút
- Lớn (2500 files): ~5-10 phút

---

### 📄 Basic Index (Fallback tự động)

**Khi nào dùng:**
- Repo **> 2500 files** và không có remote index
- Local index build failed
- Copilot tự động fallback

**Đặc điểm:**
- ⚠️ Search dựa vào **text matching** nhiều hơn semantic
- ⚠️ Kém thông minh hơn remote/local index
- ✅ Vẫn hoạt động, nhưng kết quả không tốt bằng

**Câu ngắn gọn**: 
> Remote index (best) > Local index (good) > Basic index (okay)

---

## 4. `@workspace` vs `#codebase` – Khác nhau thế nào?

Cả hai đều nói với Copilot: **"Nhìn toàn bộ repo!"**

### `@workspace` – Gọi "chuyên gia codebase" vào chat

**Cú pháp:**
```
@workspace Where is the authentication logic implemented?
```

**Đặc điểm:**
- Là một **participant** riêng (như @terminal, @vscode)
- Được thiết kế để trả lời câu hỏi về **toàn bộ codebase**
- Có khả năng:
  - Search toàn repo
  - Đọc nhiều files
  - Phân tích structure, patterns
  - Đề xuất nơi nên thêm code mới

**Dùng khi:**
- Hỏi về architecture, flow, patterns
- Tìm implementation của một feature
- Hỏi "nên thêm code ở đâu?"
- Onboarding vào codebase mới

**Ví dụ:**
```
@workspace How does user authentication work in this app?
@workspace Where should I add the new payment gateway integration?
@workspace Find all components that use the useAuth hook
@workspace Explain the data flow from API to UI in this project
```

---

### `#codebase` – Include codebase context vào prompt

**Cú pháp:**
```
How do I add error handling similar to #codebase patterns?
```

**Đặc điểm:**
- Là một **variable/reference** (như #file, #selection)
- Bổ sung context từ codebase vào prompt của bạn
- Dùng được trong **mọi mode**: Ask, Edit, Agent

**Dùng khi:**
- Muốn Copilot suggest code theo style của repo hiện tại
- Trong Edit mode muốn refactor theo patterns có sẵn
- Trong Agent mode muốn maintain consistency

**Ví dụ:**
```
Refactor this function to follow #codebase error handling patterns
Generate a new API endpoint similar to #codebase existing endpoints
Add logging to this service using #codebase logging conventions
```

---

### So sánh nhanh

| Khía cạnh | `@workspace` | `#codebase` |
|-----------|--------------|-------------|
| Kiểu | Participant | Variable/Reference |
| Dùng ở đâu | Chat view, Inline chat | Mọi prompt (Ask/Edit/Agent) |
| Mục đích | Hỏi về codebase | Include context vào prompt |
| Trả lời | Explanation, suggestions | Code theo style repo |
| Ví dụ | "Where is X?" | "Do this like #codebase" |

**Rule of thumb:**
- Hỏi về codebase → `@workspace`
- Muốn code theo style repo → `#codebase`

---

## 5. Các câu hỏi hay với `@workspace`

### 🔍 Tìm implementation

```
@workspace Where is the login functionality implemented?
@workspace Find all API endpoints related to user management
@workspace Which files handle payment processing?
@workspace Show me examples of React components using the useQuery hook
```

### 🏗️ Hiểu architecture

```
@workspace Explain the overall architecture of this application
@workspace How does data flow from the backend to the frontend?
@workspace What are the main layers/modules in this codebase?
@workspace Explain the authentication and authorization flow
```

### 📍 Hỏi "nên thêm code ở đâu"

```
@workspace Where should I add a new user registration feature?
@workspace I need to add audit logging - which layer should I modify?
@workspace Where is the best place to add input validation for forms?
```

### 🔗 Tìm patterns và conventions

```
@workspace How are API calls typically structured in this project?
@workspace What's the naming convention for React components?
@workspace Show me how error handling is done across the codebase
@workspace What testing patterns does this project use?
```

### 🐛 Debug và troubleshoot

```
@workspace Why might the user session be expiring early?
@workspace Find potential memory leaks in data fetching logic
@workspace Are there any unused imports or dead code?
```

---

## 6. Tips để có kết quả tốt hơn

### ✅ DO: Hỏi cụ thể

❌ Tệ:
```
@workspace How does this work?
```

✅ Tốt:
```
@workspace How does the payment processing flow work from checkout to confirmation?
```

---

### ✅ DO: Dùng đúng terminology của project

Nếu project dùng "Service" thay vì "Manager", hỏi:
```
@workspace Where is the UserService implemented?
```

Không hỏi:
```
@workspace Where is the UserManager?
```

---

### ✅ DO: Hỏi theo layers/modules

```
@workspace What are all the controllers in the backend?
@workspace List all custom React hooks in the frontend
@workspace Show me the database models
```

---

### ✅ DO: Kết hợp với context khác

```
@workspace How do I refactor this #selection to match the project patterns?
@workspace Explain how #file fits into the overall architecture
```

---

### ⚠️ DON'T: Hỏi quá chung chung

❌ Tránh:
```
@workspace Tell me everything about this codebase
@workspace What does this project do?
```

Tốt hơn: Chia nhỏ thành nhiều câu hỏi cụ thể.

---

### ⚠️ DON'T: Expect Copilot biết code chưa commit

Copilot chỉ biết:
- Code đã save
- Code trong working directory

Không biết:
- Code trong đầu bạn chưa viết
- Code ở branch khác chưa merge
- Code đã xóa/chưa commit

---

## 7. Troubleshooting Index

### Vấn đề: `@workspace` không hoạt động tốt

**Check list:**

1. **Index đã build chưa?**
   - Chạy command: "GitHub Copilot: Build Remote/Local Workspace Index"
   - Đợi build xong (check status bar)

2. **Repo quá lớn và đang dùng local index?**
   - Nếu >2500 files → nên dùng remote index
   - Push repo lên GitHub → enable remote index

3. **Files quan trọng bị gitignore?**
   - Mở file đó ra → Copilot vẫn đọc được
   - Hoặc temporary remove khỏi .gitignore

4. **Cache cũ?**
   - Chạy command: "Developer: Reload Window"
   - Hoặc rebuild index

---

### Vấn đề: Build index chậm quá

**Giải pháp:**

1. **Dùng remote index thay vì local** (nếu có thể)
2. **Exclude folders không cần thiết** trong `.gitignore`:
   ```
   node_modules/
   dist/
   build/
   .next/
   coverage/
   ```
3. **Đợi build trong lúc làm việc khác** - không block workflow

---

### Vấn đề: Search không tìm thấy file rõ ràng có trong repo

**Nguyên nhân có thể:**

1. File chưa được index (quá mới)
   → Save file → rebuild index

2. File tên không chuẩn hoặc special characters
   → Mở file trực tiếp → dùng #file

3. File trong subfolder sâu
   → Hỏi cụ thể hơn với path: 
   ```
   @workspace Find the config file in src/config/
   ```

---

## 8. Best Practices

### 1️⃣ Build index sớm

- Mở repo mới → build index ngay
- Đừng đợi đến khi cần dùng

### 2️⃣ Dùng remote index cho repos team

- Cả team hưởng lợi
- Không tốn tài nguyên máy local
- Luôn up-to-date

### 3️⃣ Kết hợp `@workspace` với các participant khác

```
@workspace @terminal How do I run the tests for the authentication module?
```

### 4️⃣ Dùng `#codebase` trong Edit/Agent mode

- Maintain consistency
- Copilot học patterns từ code có sẵn

### 5️⃣ Rebuild index khi có thay đổi lớn

- Thêm nhiều files mới
- Refactor lớn
- Merge branch lớn

Chạy:
```
Command: GitHub Copilot: Rebuild Index
```

---

## Demo Scenarios (để present)

### Demo 1: Onboarding vào codebase mới

1. Mở repo chưa từng làm việc
2. Chat view → hỏi:
   ```
   @workspace Give me an overview of this project's architecture
   ```
3. Follow-up:
   ```
   @workspace Where is the main entry point?
   @workspace What are the key dependencies?
   ```

---

### Demo 2: Tìm nơi thêm feature mới

1. Giả sử cần thêm "forgot password" feature
2. Hỏi:
   ```
   @workspace Where should I add a forgot password feature? Show me related auth code.
   ```
3. Copilot sẽ:
   - Point đến auth module
   - Show existing login/signup code
   - Suggest nơi nên thêm

---

### Demo 3: Hiểu một flow phức tạp

1. Hỏi về data flow:
   ```
   @workspace Explain how user data flows from the registration form to the database
   ```
2. Copilot sẽ trace:
   - Frontend component
   - API call
   - Backend controller
   - Database model

---

### Demo 4: So sánh `@workspace` vs `#codebase`

**Scenario A: Hỏi về code (dùng `@workspace`)**
```
@workspace How is error handling done in API calls?
```
→ Copilot giải thích patterns có sẵn

**Scenario B: Viết code mới (dùng `#codebase`)**

Select một function → Inline Chat:
```
Refactor this to use #codebase error handling patterns
```
→ Copilot gen code theo style repo

---

## Tóm lại

| Khái niệm | Giải thích ngắn gọn |
|-----------|---------------------|
| **Workspace Context** | Index của toàn bộ repo để Copilot hiểu codebase |
| **Remote Index** | Build trên GitHub, cho repos lớn, cả team dùng |
| **Local Index** | Build trên máy, cho repos <2500 files |
| **Basic Index** | Fallback khi không có remote/local |
| **`@workspace`** | Participant để hỏi về codebase |
| **`#codebase`** | Reference để include context vào prompt |

**Câu nhớ:**
> Index tốt → `@workspace` thông minh → Dev hiểu code nhanh hơn!
