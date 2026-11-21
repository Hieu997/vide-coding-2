---
name: tao-page
description: Tạo một trang landing hoàn chỉnh (HTML/CSS/JS thuần, responsive) theo cấu trúc dự án, gồm Banner giới thiệu, Thông tin nổi bật, Tiện ích/Giá trị và khu vực Kêu gọi hành động/Liên hệ, kèm JavaScript tương tác. Dùng khi người dùng gõ /tao-page hoặc yêu cầu tạo trang/landing page mới.
argument-hint: "[mô tả trang, ví dụ: dự án căn hộ The Riverside Quận 2]"
---

# /tao-page – Tạo landing page mới

Yêu cầu của người dùng: **$ARGUMENTS**

Nếu yêu cầu trống, tạo một trang giới thiệu dự án bất động sản mẫu và **không hỏi lại**.
Nếu có mô tả, suy ra: chủ đề, đối tượng khách hàng, giọng văn, màu chủ đạo (nếu được nêu) và mục tiêu chuyển đổi
(để lại số điện thoại, đặt lịch xem nhà, nhận báo giá, tải tài liệu...).

## Bước 1 – Đọc bối cảnh

1. Đọc `.claude/CLAUDE.md` để nắm quy tắc dự án và làm theo.
2. Đọc phần `:root` của `src/css/styles.css` để dùng lại biến màu, font, bo góc cho đồng bộ thương hiệu
   (trừ khi người dùng yêu cầu màu khác).
3. Đặt `slug` cho trang: tiếng Việt không dấu, chữ thường, nối bằng `-` (ví dụ `the-riverside-quan-2`).
   Nếu `src/pages/<slug>/` đã tồn tại, thêm hậu tố `-2`, `-3`... – **không ghi đè** trang cũ.

## Bước 2 – Tạo file

```
src/pages/<slug>/
├── index.html
├── css/style.css
└── js/main.js
```

Ảnh dùng URL Unsplash (`https://images.unsplash.com/photo-<id>?w=1200&q=70&auto=format&fit=crop`)
kèm ảnh dự phòng `https://picsum.photos/seed/<seed>/1200/800` qua `onerror`. Không tạo file ảnh.

### `index.html` – bố cục bắt buộc (theo thứ tự)

1. **Header** cố định: logo, menu neo tới các section, nút CTA chính, nút hamburger (`aria-label`, `aria-expanded`) cho mobile.
2. **Banner giới thiệu (Hero)**: ảnh nền + lớp phủ tối, tiêu đề `h1` hấp dẫn, mô tả 1–2 câu, 2 nút (CTA chính + xem thêm),
   dải số liệu nhanh (3–4 chỉ số, ví dụ diện tích, số căn, giá từ...).
3. **Thông tin nổi bật**: 3–6 thẻ điểm nổi bật (icon/emoji, tiêu đề, mô tả ngắn) hoặc khối ảnh + nội dung xen kẽ.
4. **Tiện ích / Giá trị**: lưới tiện ích hoặc lợi ích cho khách hàng; có thể thêm tab phân loại (nội khu / ngoại khu).
5. Section bổ trợ **phù hợp nội dung** (chọn 1–3, không bắt buộc): bảng giá/mặt bằng, thư viện ảnh (lightbox),
   tiến độ/timeline, đánh giá khách hàng, FAQ dạng accordion, vị trí (bản đồ Google Maps nhúng iframe).
6. **Kêu gọi hành động / Liên hệ**: tiêu đề thuyết phục + form (họ tên, số điện thoại, email tùy chọn, nhu cầu)
   + thông tin hotline/địa chỉ. Đây là mục tiêu chuyển đổi của trang.
7. **Footer**: thông tin liên hệ, liên kết, bản quyền, ghi chú "dữ liệu minh họa" nếu là nội dung mẫu.
8. **Nút liên hệ nổi** (gọi điện / Zalo) ở góc dưới và nút **lên đầu trang**.

Yêu cầu HTML: `lang="vi"`, `<meta viewport>`, `<title>` và `<meta name="description">` theo nội dung,
thẻ ngữ nghĩa (`header`, `main`, `section`, `footer`), mỗi section có `id` để neo menu, chỉ một `h1`.
Nạp `css/style.css` trong `<head>` và `js/main.js` bằng `<script defer>`.

### `css/style.css`

- Biến ở `:root` (màu chính, chữ, nền phụ, bo góc, đổ bóng, khoảng cách). Không hard-code màu rải rác.
- Mobile-first; breakpoint `min-width: 640px`, `768px`, `1024px`. `.container { max-width: 1140px; padding: 0 16px }`.
- Class đặt theo BEM. Dùng Grid/Flex; không có cuộn ngang ở 360px.
- Chữ co giãn bằng `clamp()`; nút bấm cao tối thiểu 44px trên mobile.
- Hiệu ứng: hover nhẹ, class `.reveal` / `.reveal.is-visible` cho hiệu ứng hiện dần.
- Tôn trọng `@media (prefers-reduced-motion: reduce)` (tắt animation, transition).

### `js/main.js` – tương tác bắt buộc

Viết JS thuần, bọc trong `document.addEventListener("DOMContentLoaded", ...)`, chia hàm `initXxx()` cho từng tính năng:

- `initNav()`: mở/đóng menu mobile (cập nhật `aria-expanded`), đóng khi bấm link; header đổi kiểu khi cuộn;
  đánh dấu link menu của section đang xem.
- `initSmoothScroll()`: cuộn mượt tới anchor, trừ chiều cao header.
- `initReveal()`: `IntersectionObserver` thêm `.is-visible` khi phần tử vào khung nhìn.
- `initCounters()`: đếm số tăng dần cho dải số liệu khi xuất hiện.
- `initForm()`: kiểm tra họ tên bắt buộc, số điện thoại Việt Nam (`/^(0|\+84)(3|5|7|8|9)\d{8}$/`), email nếu có;
  hiện lỗi ngay dưới ô nhập, chống gửi trùng, hiện thông báo (toast) khi thành công rồi reset form.
  Không có backend: ghi chú `// TODO: gửi dữ liệu tới API` tại chỗ gửi.
- `initBackToTop()`: hiện nút khi cuộn quá 1 màn hình.
- Các tính năng của section bổ trợ đã chọn (tab, accordion, lightbox đóng bằng Esc/bấm nền, slider...).

Bảo mật: không chèn dữ liệu người dùng nhập vào `innerHTML`, dùng `textContent`. Bọc `localStorage` trong try/catch nếu dùng.

## Bước 3 – Nội dung

- Viết nội dung tiếng Việt có dấu, cụ thể, phù hợp chủ đề – **không dùng lorem ipsum**.
- Số liệu, tên, giá, số điện thoại là dữ liệu minh họa hợp lý (hotline dạng `0900 000 000`);
  không dùng tên thương hiệu/dự án có thật trừ khi người dùng cung cấp.

## Bước 4 – Kiểm tra và báo cáo

1. Mỗi file dưới 500 dòng; đường dẫn tương đối đúng; mọi `href="#id"` đều có section tương ứng.
2. Chạy `node --check src/pages/<slug>/js/main.js` để bắt lỗi cú pháp.
3. Báo cho người dùng (tiếng Việt, ngắn gọn): đường dẫn các file đã tạo, danh sách section, các tương tác,
   và cách xem: `npx serve src` rồi mở `/pages/<slug>/`.
