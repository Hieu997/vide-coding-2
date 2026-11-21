const $ = (s) => document.querySelector(s);
const FALLBACK = (seed) => `https://picsum.photos/seed/${seed}/600/450`;
const imgTag = (src, seed, alt = "") =>
  `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK(seed)}'">`;

const state = { mode: "ban", shown: 8, saved: new Set(JSON.parse(safeGet("saved") || "[]")) };

function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function formatPrice(l) {
  if (l.unit) return `${(l.price * 1000).toLocaleString("vi-VN")} ${l.unit}`;
  return `${l.price.toLocaleString("vi-VN")} tỷ`;
}

/* ---------- Search tabs & filters ---------- */
function fillTypes() {
  $("#fType").innerHTML = `<option value="">Loại nhà đất</option>` +
    TYPES[state.mode].map((t) => `<option>${t}</option>`).join("");
}

document.querySelectorAll(".search__tab").forEach((tab) =>
  tab.addEventListener("click", () => {
    document.querySelectorAll(".search__tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    state.mode = tab.dataset.tab;
    fillTypes();
    if (state.mode === "duan") return $("#projects").scrollIntoView();
    state.shown = 8;
    renderListings();
  })
);

function inRange(val, range) {
  if (!range) return true;
  const [a, b] = range.split("-").map(Number);
  return val >= a && val < b;
}

function filtered() {
  const kw = $("#keyword").value.trim().toLowerCase();
  const city = $("#city").value;
  const type = $("#fType").value;
  const price = $("#fPrice").value;
  const area = $("#fArea").value;
  const mode = state.mode === "duan" ? "ban" : state.mode;
  return LISTINGS.filter((l) =>
    l.mode === mode &&
    (city === "Toàn quốc" || l.city === city) &&
    (!type || l.type === type) &&
    (l.unit || inRange(l.price, price)) &&
    inRange(l.area, area) &&
    (!kw || `${l.title} ${l.district} ${l.city}`.toLowerCase().includes(kw))
  );
}

["#city", "#fType", "#fPrice", "#fArea"].forEach((s) => $(s).addEventListener("change", () => renderListings()));
$("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  renderListings();
  $("#listings").scrollIntoView();
});
$("#resetFilters").addEventListener("click", () => {
  ["#fType", "#fPrice", "#fArea"].forEach((s) => ($(s).value = ""));
  $("#city").value = "Toàn quốc"; $("#keyword").value = "";
  renderListings();
});

/* ---------- Listings ---------- */
function listingCard(l, i) {
  const id = LISTINGS.indexOf(l);
  const on = state.saved.has(id);
  const when = l.days === 0 ? "Đăng hôm nay" : `Đăng ${l.days} ngày trước`;
  return `<article class="card">
    <div class="card__img">${imgTag(U(IMGS[id % IMGS.length]), "bds" + id, l.title)}
      ${l.vip ? '<span class="card__tag">VIP</span>' : ""}
      <span class="card__photos">📷 ${l.photos}</span></div>
    <div class="card__body">
      <h3 class="card__title">${l.title}</h3>
      <div class="card__meta"><span>${formatPrice(l)}</span><span>${l.area} m²</span></div>
      <div class="card__loc">📍 ${l.district}, ${l.city}</div>
      <div class="card__foot"><span>${when}</span>
        <button class="fav ${on ? "on" : ""}" data-id="${id}" aria-label="Lưu tin">${on ? "♥" : "♡"}</button></div>
    </div></article>`;
}

function renderListings() {
  const list = filtered();
  $("#listingGrid").innerHTML = list.length
    ? list.slice(0, state.shown).map(listingCard).join("")
    : `<div class="empty">Không tìm thấy bất động sản phù hợp. Hãy thử thay đổi bộ lọc.</div>`;
  $("#resultInfo").textContent = `Hiện có ${list.length} tin đăng phù hợp`;
  $("#loadMore").style.display = list.length > state.shown ? "" : "none";
}

$("#loadMore").addEventListener("click", () => { state.shown += 8; renderListings(); });

$("#listingGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".fav");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
  safeSet("saved", JSON.stringify([...state.saved]));
  updateSaved();
  renderListings();
  toast(state.saved.has(id) ? "Đã lưu tin" : "Đã bỏ lưu tin");
});

function updateSaved() { $("#savedCount").textContent = state.saved.size; }

/* ---------- News ---------- */
function renderNews(active = 0) {
  const n = NEWS[active];
  const img = $("#newsImg");
  img.onerror = () => { img.onerror = null; img.src = FALLBACK("news" + active); };
  img.src = U(IMGS[(active + 3) % IMGS.length]).replace("w=600", "w=900");
  $("#newsTitle").textContent = n.title;
  $("#newsTime").textContent = "🕒 " + n.time;
  $("#newsList").innerHTML = NEWS.map((x, i) =>
    `<li data-i="${i}" class="${i === active ? "active" : ""}">${x.title}</li>`).join("");
}
$("#newsList").addEventListener("mouseover", (e) => {
  const li = e.target.closest("li");
  if (li && !li.classList.contains("active")) renderNews(Number(li.dataset.i));
});
document.querySelectorAll(".news__tab").forEach((t) => t.addEventListener("click", () => {
  document.querySelectorAll(".news__tab").forEach((x) => x.classList.remove("active"));
  t.classList.add("active");
}));

/* ---------- Projects carousel ---------- */
$("#projectTrack").innerHTML = PROJECTS.map((p, i) => `<article class="card">
  <div class="card__img">${imgTag(U(IMGS[(i + 6) % IMGS.length]), "prj" + i, p.title)}</div>
  <div class="card__body">
    <span class="status">${p.status}</span>
    <h3 class="card__title" style="min-height:auto">${p.title}</h3>
    <div class="card__meta" style="font-size:14px">${p.price}</div>
    <div class="card__loc">📐 ${p.area} · 📍 ${p.loc}</div>
  </div></article>`).join("");

const track = $("#projectTrack");
const step = () => track.firstElementChild.offsetWidth + 20;
$("#prjNext").addEventListener("click", () => track.scrollBy({ left: step() }));
$("#prjPrev").addEventListener("click", () => track.scrollBy({ left: -step() }));

/* ---------- Locations, partners ---------- */
$("#locationGrid").innerHTML = LOCATIONS.map((l) =>
  `<a href="#listings" class="loc" style="background-image:url('${U(l.img).replace("w=600", "w=900")}'), url('${FALLBACK(l.name)}')">
    <div><h3>${l.name}</h3><p class="small">${l.count} tin đăng</p></div></a>`).join("");

$("#partnerList").innerHTML = PARTNERS.map((p) => `<a href="#" class="partner">${p}</a>`).join("");

/* ---------- Misc ---------- */
$("#menuToggle").addEventListener("click", () => $("#nav").classList.toggle("open"));
$("#nav").addEventListener("click", () => $("#nav").classList.remove("open"));
$("#newsletter").addEventListener("submit", (e) => {
  e.preventDefault(); e.target.reset(); toast("Đăng ký nhận tin thành công!");
});

fillTypes();
renderListings();
renderNews();
updateSaved();
