// Dữ liệu minh họa (demo) cho landing page
const U = (id) => `https://images.unsplash.com/photo-${id}?w=600&q=70&auto=format&fit=crop`;

const TYPES = {
  ban: ["Căn hộ chung cư", "Nhà riêng", "Nhà mặt phố", "Biệt thự, liền kề", "Đất nền dự án", "Đất", "Shophouse"],
  thue: ["Căn hộ chung cư", "Nhà riêng", "Nhà mặt phố", "Phòng trọ", "Văn phòng", "Kho, nhà xưởng"],
  duan: ["Căn hộ chung cư", "Khu đô thị mới", "Biệt thự nghỉ dưỡng", "Khu phức hợp", "Văn phòng"],
};

const IMGS = [
  "1600596542815-ffad4c1539a9", "1600585154340-be6161a56a0c", "1512917774080-9991f1c4c750",
  "1564013799919-ab600027ffc6", "1570129477492-45c003edd2be", "1580587771525-78b9dba3b914",
  "1568605114967-8130f3a36994", "1502672260266-1c1ef2d93688", "1522708323590-d24dbb6b0267",
  "1493809842364-78817add7ffb", "1545324418-cc1a3fa10c00", "1560448204-e02f11c3d0e2",
];

const LISTINGS = [
  { mode: "ban", type: "Căn hộ chung cư", title: "Bán căn hộ 2PN view sông, full nội thất, sổ hồng lâu dài", price: 4.2, area: 72, city: "Hồ Chí Minh", district: "Quận 7", photos: 12, vip: true, days: 0 },
  { mode: "ban", type: "Nhà riêng", title: "Nhà phố 4 tầng hẻm xe hơi, gần chợ, tiện kinh doanh", price: 6.8, area: 60, city: "Hồ Chí Minh", district: "Gò Vấp", photos: 8, days: 1 },
  { mode: "ban", type: "Biệt thự, liền kề", title: "Biệt thự song lập khu compound an ninh, hồ bơi riêng", price: 22, area: 240, city: "Hà Nội", district: "Long Biên", photos: 20, vip: true, days: 0 },
  { mode: "ban", type: "Đất", title: "Đất thổ cư mặt tiền đường nhựa 12m, sổ sẵn công chứng ngay", price: 2.1, area: 120, city: "Bình Dương", district: "Thuận An", photos: 5, days: 3 },
  { mode: "ban", type: "Nhà mặt phố", title: "Mặt phố trung tâm, vỉa hè rộng, cho thuê dòng tiền tốt", price: 35, area: 85, city: "Hà Nội", district: "Hoàn Kiếm", photos: 10, vip: true, days: 2 },
  { mode: "ban", type: "Căn hộ chung cư", title: "Chung cư 3PN tầng trung, ban công Đông Nam, gần trường học", price: 5.5, area: 98, city: "Hà Nội", district: "Cầu Giấy", photos: 14, days: 1 },
  { mode: "ban", type: "Đất nền dự án", title: "Đất nền ven biển, hạ tầng hoàn thiện, giá đầu tư", price: 3.2, area: 100, city: "Đà Nẵng", district: "Ngũ Hành Sơn", photos: 7, days: 4 },
  { mode: "ban", type: "Shophouse", title: "Shophouse 5 tầng mặt đại lộ, bàn giao hoàn thiện mặt ngoài", price: 16.5, area: 110, city: "Hải Phòng", district: "Hồng Bàng", photos: 9, days: 5 },
  { mode: "thue", type: "Căn hộ chung cư", title: "Cho thuê căn hộ studio đầy đủ nội thất, vào ở ngay", price: 0.009, area: 35, city: "Hồ Chí Minh", district: "Bình Thạnh", photos: 9, days: 0, unit: "triệu/tháng" },
  { mode: "thue", type: "Nhà riêng", title: "Cho thuê nhà nguyên căn 3PN, có sân để ô tô", price: 0.018, area: 80, city: "Hà Nội", district: "Tây Hồ", photos: 6, vip: true, days: 1, unit: "triệu/tháng" },
  { mode: "thue", type: "Văn phòng", title: "Văn phòng hạng B, sàn trống 150m², miễn phí phí quản lý 3 tháng", price: 0.045, area: 150, city: "Hồ Chí Minh", district: "Quận 3", photos: 11, days: 2, unit: "triệu/tháng" },
  { mode: "thue", type: "Phòng trọ", title: "Phòng trọ mới xây, có gác, giờ giấc tự do, gần đại học", price: 0.0035, area: 22, city: "Đà Nẵng", district: "Hải Châu", photos: 4, days: 0, unit: "triệu/tháng" },
];

const PROJECTS = [
  { title: "The Riverside Residence", loc: "Quận 2, Hồ Chí Minh", area: "12,5 ha", status: "Đang mở bán", price: "Từ 65 triệu/m²" },
  { title: "Green Park City", loc: "Hoàng Mai, Hà Nội", area: "30 ha", status: "Đang mở bán", price: "Từ 48 triệu/m²" },
  { title: "Ocean Bay Villas", loc: "Sơn Trà, Đà Nẵng", area: "8 ha", status: "Sắp mở bán", price: "Từ 25 tỷ/căn" },
  { title: "Sunrise Central", loc: "Dĩ An, Bình Dương", area: "5,2 ha", status: "Đang mở bán", price: "Từ 35 triệu/m²" },
  { title: "Harbor Skyline", loc: "Ngô Quyền, Hải Phòng", area: "4 ha", status: "Đã bàn giao", price: "Từ 40 triệu/m²" },
  { title: "Lotus Garden", loc: "Thủ Đức, Hồ Chí Minh", area: "15 ha", status: "Sắp mở bán", price: "Đang cập nhật" },
];

const LOCATIONS = [
  { name: "TP. Hồ Chí Minh", count: "68.215", img: "1583417319070-4a69db38a482" },
  { name: "Hà Nội", count: "59.410", img: "1555921015-5532091f6026" },
  { name: "Đà Nẵng", count: "9.832", img: "1559592413-7cec4d0cae2b" },
  { name: "Bình Dương", count: "8.104", img: "1545324418-cc1a3fa10c00" },
  { name: "Hải Phòng", count: "4.560", img: "1480714378408-67cf0d13bc1b" },
];

const NEWS = [
  { title: "Thị trường căn hộ cuối năm: nguồn cung mới tăng, giá ổn định", time: "2 giờ trước" },
  { title: "Lãi suất vay mua nhà giảm nhẹ, người mua ở thực hưởng lợi", time: "5 giờ trước" },
  { title: "Hạ tầng giao thông kết nối thúc đẩy bất động sản vùng ven", time: "1 ngày trước" },
  { title: "Kinh nghiệm kiểm tra pháp lý trước khi đặt cọc mua đất", time: "1 ngày trước" },
  { title: "Xu hướng thuê căn hộ dịch vụ tại các thành phố lớn", time: "2 ngày trước" },
];

const PARTNERS = ["An Phát Group", "Hưng Thịnh Land", "Đại Việt Homes", "Sao Mai Corp", "Phú Gia Realty", "Kim Long Invest"];
