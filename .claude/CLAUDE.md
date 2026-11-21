# AnCư Land – Landing page Bất động sản

Landing page demo cho kênh mua bán / cho thuê nhà đất. Toàn bộ dữ liệu là **dữ liệu minh họa**.

## Công nghệ

- HTML5 + CSS3 + JavaScript thuần (ES2020), **không framework, không bước build**.
- Font: Google Fonts (Roboto). Ảnh: Unsplash, ảnh dự phòng từ picsum.photos.
- Chạy local: `npx serve src` hoặc `python3 -m http.server -d src 8080`, rồi mở http://localhost:8080.

## Cấu trúc thư mục

```
landing-bds/
├── .claude/
│   ├── CLAUDE.md          # Quy tắc & kiến trúc dự án (file này)
│   └── skills/tao-page/   # Skill /tao-page – sinh landing page mới vào src/pages/<slug>/
├── src/                   # Mã nguồn – thư mục gốc khi deploy
│   ├── index.html         # Trang duy nhất, chứa toàn bộ khung HTML các section
│   ├── css/
│   │   └── styles.css     # Toàn bộ style, biến màu ở :root
│   ├── js/
│   │   ├── data.js        # Dữ liệu tĩnh: TYPES, LISTINGS, PROJECTS, LOCATIONS, NEWS, PARTNERS
│   │   └── script.js      # Logic render + tương tác
│   ├── assets/
│   │   └── images/        # Ảnh local (logo, icon, ảnh thay thế)
│   └── pages/<slug>/      # Landing page con do /tao-page tạo (index.html, css/style.css, js/main.js)
├── docs/                  # Tài liệu bổ sung (chỉ tạo khi cần)
└── .gitignore
```

## Kiến trúc

- **Thứ tự nạp script**: `data.js` trước, `script.js` sau (cuối `<body>`). `script.js` dùng các hằng số toàn cục từ `data.js`.
- **State** tập trung trong object `state` ở `script.js`: `mode` (`ban` | `thue` | `duan`), `shown` (số tin đang hiện), `saved` (Set id tin đã lưu).
- **Render**: mỗi section có hàm render riêng, sinh HTML bằng template string rồi gán vào container theo `id`
  (`#listingGrid`, `#projectTrack`, `#locationGrid`, `#newsList`, `#partnerList`).
- **Lọc tin** (`filtered()`): theo tab mode, thành phố, loại nhà đất, khoảng giá, diện tích, từ khóa.
  Khoảng giá/diện tích dùng chuỗi `"min-max"` trong `value` của `<option>`.
- **Lưu trữ**: chỉ dùng `localStorage` qua `safeGet` / `safeSet` (luôn bọc try/catch).
- **Các section** trong `index.html`: Header → Hero/Search → Tin tức → Tin đăng → Dự án (carousel) → Địa điểm → Tiện ích → Doanh nghiệp → Newsletter → Footer.

### Mô hình dữ liệu tin đăng (`LISTINGS`)

```js
{ mode: "ban" | "thue", type, title, price, area, city, district, photos, vip?, days, unit? }
```

- `price`: đơn vị **tỷ**. Tin cho thuê có `unit: "triệu/tháng"` và `price` vẫn lưu theo tỷ (ví dụ `0.009` = 9 triệu).
- `days`: số ngày từ lúc đăng (0 = hôm nay).

## Quy tắc code

1. **Ngôn ngữ**: nội dung hiển thị tiếng Việt có dấu; tên biến/hàm tiếng Anh, camelCase; hằng dữ liệu viết HOA.
2. **CSS**: đặt tên class theo BEM (`block__element--modifier`). Dùng biến ở `:root` (`--primary`, `--text`, `--radius`...), không hard-code màu mới.
   Giữ nhóm comment theo section (`/* Header */`, `/* Hero */`...). Responsive đặt ở cuối file.
3. **JS**: không thêm thư viện ngoài nếu chưa thống nhất. Dùng helper `$()` để chọn phần tử. Mỗi section một hàm render.
   Thêm dữ liệu mới vào `data.js`, không nhúng dữ liệu trong `script.js`.
4. **Bảo mật**: dữ liệu do người dùng nhập (ô tìm kiếm, form) không được chèn thẳng vào `innerHTML` – dùng `textContent` hoặc escape.
5. **Ảnh**: luôn có `alt`, `loading="lazy"` và ảnh dự phòng (`imgTag()` đã xử lý `onerror`).
6. **Khả năng truy cập**: nút chỉ có icon phải có `aria-label`; giữ đúng thứ tự heading (h2 cho section).
7. **Responsive**: kiểm tra ở mobile (≤ 480px), tablet (≤ 768px), desktop; không để cuộn ngang.
8. **Kích thước file**: mỗi file < 500 dòng. Khi `script.js` hoặc `styles.css` vượt ngưỡng, tách theo section
   (ví dụ `js/listings.js`, `css/header.css`) và cập nhật thứ tự nạp trong `index.html`.
9. **Đường dẫn**: dùng đường dẫn tương đối tính từ `src/index.html` (`css/...`, `js/...`, `assets/images/...`).

## Quy trình làm việc

- Đọc file trước khi sửa; chỉ làm đúng phần được yêu cầu.
- Sau khi sửa: mở trang ở local, kiểm tra Console không lỗi, thử tab tìm kiếm, bộ lọc, nút "Mở rộng", carousel, lưu tin.
- Không commit file `.env`, khóa API hay thông tin cá nhân.
