<template>
  <section id="services" class="svc-section" dir="rtl" ref="sectionRef">
    <div class="container">

      <!-- Section label -->
      <div class="svc-label" :class="{ visible: visible }">
        <span class="label-num">01</span>
        <span class="label-line"></span>
        <span class="label-text">الخدمة الأولى</span>
      </div>

      <div class="svc-layout" :class="{ visible: visible }">

        <!-- ══ LEFT: big title block ══ -->
        <div class="svc-left">
          <div class="icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
            </svg>
            <div class="icon-glow"></div>
          </div>

          <h2 class="svc-title">تصميم<br/>المواقع</h2>

          <p class="svc-desc">
            نصمم مواقع تعكس هوية علامتك التجارية وتجذب عملاءك — احترافية، سريعة، ومتوافقة مع كل الأجهزة.
          </p>

          <!-- Stat pill -->
          <div class="big-stat">
            <span class="bs-num">+80</span>
            <div class="bs-meta">
              <span class="bs-label">موقع</span>
              <span class="bs-sub">مُسلَّم بنجاح</span>
            </div>
          </div>

          <!-- Progress -->
          <div class="prog-row">
            <span class="prog-label">معدل رضا العملاء</span>
            <span class="prog-val">100%</span>
          </div>
          <div class="prog-track">
            <div class="prog-fill" :style="{ width: visible ? '100%' : '0%' }"></div>
          </div>

          <div class="cta-row">
            <a href="/contact" class="btn-main">
              <span class="btn-bg"></span>
              <span class="btn-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                اطلب السعر
              </span>
              <span class="btn-arr">←</span>
            </a>
            <a href="/contact" class="link-more">استفسر عن التفاصيل</a>
          </div>
        </div>

        <!-- ══ RIGHT: packages + features ══ -->
        <div class="svc-right">

          <!-- Starting price badge -->
          <div class="price-badge">
            <span class="pb-from">يبدأ من</span>
            <span class="pb-num">250</span>
            <span class="pb-cur">د.أ</span>
          </div>

          <!-- Package cards — vertical stack with left accent -->
          <div class="pkg-stack">
            <div
              v-for="(pkg, i) in packages"
              :key="i"
              class="pkg-card"
              :class="{ 'pkg-card--hot': pkg.featured }"
              :style="{ transitionDelay: `${i * 90 + 300}ms` }"
            >
              <div class="pkg-accent"></div>
              <div class="pkg-body">
                <div class="pkg-icon" v-html="pkg.icon"></div>
                <div class="pkg-info">
                  <div class="pkg-name">{{ pkg.name }}</div>
                  <div class="pkg-detail">{{ pkg.detail }}</div>
                </div>
                <div class="pkg-right-side">
                  <div class="pkg-price">{{ pkg.price }} <span>د.أ</span></div>
                  <div v-if="pkg.featured" class="pkg-hot-tag">الأشهر</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Features pills -->
          <div class="feats-heading">ما يشمله التصميم</div>
          <div class="feats-pills">
            <span v-for="f in features" :key="f" class="feat-pill">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ f }}
            </span>
          </div>

        </div>

      </div>

    </div>

    <!-- Subtle separator -->
    <div class="svc-sep"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const sectionRef = ref(null);
const visible    = ref(false);
let observer;
onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) visible.value = true; },
    { threshold: 0.12 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());

const features = [
  "تصميم متجاوب مع جميع الأجهزة",
  "تحسين محركات بحث SEO",
  "استضافة سنة مجانية",
  "لوحة تحكم سهلة",
  "شهادة SSL مجانية",
];

const packages = [
  {
    name: "أساسي", detail: "5 صفحات", price: "250", featured: false,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>`
  },
  {
    name: "متقدم", detail: "10 صفحات", price: "450", featured: true,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  },
  {
    name: "متجر إلكتروني", detail: "متجر كامل", price: "700", featured: false,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`
  },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.svc-section {
  font-family: 'Tajawal', sans-serif;
  background: #F5F6FA;
  padding: 6rem 0 5rem;
  position: relative;
}
.dark .svc-section { background: #0d1526; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 2.5rem; }

/* ── Label row ── */
.svc-label {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 3.5rem;
  opacity: 0; transform: translateX(20px);
  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.svc-label.visible { opacity: 1; transform: translateX(0); }
.label-num {
  font-size: 3rem; font-weight: 900; color: rgba(0,184,148,0.15); letter-spacing: -2px; line-height: 1;
}
.dark .label-num { color: rgba(0,184,148,0.1); }
.label-line { flex: none; width: 40px; height: 2px; background: linear-gradient(90deg, #00B894, transparent); }
.label-text { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; color: #00B894; }

/* ── Layout ── */
.svc-layout {
  display: grid; grid-template-columns: 380px 1fr; gap: 5rem; align-items: start;
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.8s 0.1s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.1s cubic-bezier(0.16,1,0.3,1);
}
.svc-layout.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 900px) { .svc-layout { grid-template-columns: 1fr; gap: 3rem; } }

/* ── Left ── */
.svc-left { display: flex; flex-direction: column; }

.icon-wrap {
  position: relative; width: 64px; height: 64px; border-radius: 20px;
  background: linear-gradient(135deg, #00B894, #009e7a);
  display: flex; align-items: center; justify-content: center;
  color: white; margin-bottom: 2rem;
  box-shadow: 0 8px 28px rgba(0,184,148,0.4);
}
.icon-glow {
  position: absolute; inset: -8px; border-radius: 26px;
  background: radial-gradient(circle, rgba(0,184,148,0.2), transparent 70%);
  animation: glowPulse 2.5s ease-in-out infinite;
}
@keyframes glowPulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }

.svc-title {
  font-size: clamp(2.8rem, 5vw, 4rem); font-weight: 900;
  color: #1A2B4C; letter-spacing: -2px; line-height: 1.05;
  margin-bottom: 1.25rem;
}
.dark .svc-title { color: #f0f4ff; }

.svc-desc { font-size: 0.95rem; color: #5a6a85; line-height: 1.8; margin-bottom: 2.5rem; }
.dark .svc-desc { color: #9ca3af; }

.big-stat {
  display: flex; align-items: center; gap: 1rem;
  background: linear-gradient(135deg, rgba(0,184,148,0.08), rgba(85,230,193,0.04));
  border: 1.5px solid rgba(0,184,148,0.15); border-radius: 16px;
  padding: 1.1rem 1.5rem; margin-bottom: 1.75rem; width: fit-content;
}
.dark .big-stat { background: rgba(0,184,148,0.06); border-color: rgba(0,184,148,0.12); }
.bs-num {
  font-size: 2.6rem; font-weight: 900; letter-spacing: -2px;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1;
}
.bs-meta { display: flex; flex-direction: column; }
.bs-label { font-size: 1rem; font-weight: 800; color: #1A2B4C; }
.dark .bs-label { color: #f0f4ff; }
.bs-sub { font-size: 0.75rem; color: #8a9ab5; }

.prog-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.prog-label { font-size: 0.8rem; color: #5a6a85; }
.dark .prog-label { color: #9ca3af; }
.prog-val { font-size: 0.8rem; font-weight: 700; color: #00B894; }
.prog-track { height: 5px; border-radius: 5px; background: rgba(0,184,148,0.1); overflow: hidden; margin-bottom: 2.5rem; }
.prog-fill {
  height: 100%; border-radius: 5px;
  background: linear-gradient(90deg, #00B894, #55E6C1);
  width: 0; transition: width 1.4s cubic-bezier(0.16,1,0.3,1) 0.5s;
}

.cta-row { display: flex; align-items: center; gap: 1.5rem; }

.btn-main {
  position: relative;
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: #1A2B4C; color: white;
  padding: 0.8rem 1.7rem; border-radius: 12px;
  font-family: 'Tajawal', sans-serif; font-size: 0.95rem; font-weight: 700;
  text-decoration: none; overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  box-shadow: 0 4px 18px rgba(26,43,76,0.3);
}
.dark .btn-main { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); }
.btn-main:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(26,43,76,0.35); }
.btn-bg {
  position: absolute; inset: 0; border-radius: inherit;
  background: linear-gradient(135deg, #00B894, #009e7a);
  transform: scaleX(0); transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.btn-main:hover .btn-bg { transform: scaleX(1); }
.btn-text { position: relative; z-index: 1; display: flex; align-items: center; gap: 0.5rem; }
.btn-arr { position: relative; z-index: 1; transition: transform 0.3s; }
.btn-main:hover .btn-arr { transform: translateX(-4px); }

.link-more {
  font-size: 0.85rem; font-weight: 600; color: #00B894; text-decoration: none;
  border-bottom: 1px dashed rgba(0,184,148,0.4); padding-bottom: 1px; transition: opacity 0.2s;
}
.link-more:hover { opacity: 0.7; }

/* ── Right ── */
.svc-right { display: flex; flex-direction: column; }

.price-badge {
  display: inline-flex; align-items: baseline; gap: 0.4rem;
  background: #1A2B4C; color: white; border-radius: 14px;
  padding: 0.75rem 1.4rem; width: fit-content; margin-bottom: 1.75rem;
  box-shadow: 0 6px 20px rgba(26,43,76,0.2);
}
.dark .price-badge { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
.pb-from { font-size: 0.75rem; color: rgba(255,255,255,0.6); }
.pb-num {
  font-size: 2rem; font-weight: 900; letter-spacing: -1px;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pb-cur { font-size: 0.8rem; color: rgba(255,255,255,0.6); }

/* Package cards */
.pkg-stack { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 2rem; }

.pkg-card {
  position: relative; border-radius: 14px; overflow: hidden;
  background: white; border: 1.5px solid rgba(26,43,76,0.07);
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s, border-color 0.3s;
  opacity: 0; transform: translateX(30px);
}
.dark .pkg-card { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.07); }
.svc-layout.visible .pkg-card { opacity: 1; transform: translateX(0); }
.pkg-card:hover { transform: translateX(-5px); box-shadow: 0 8px 24px rgba(0,184,148,0.1); border-color: rgba(0,184,148,0.25); }

.pkg-card--hot {
  border-color: rgba(0,184,148,0.4);
  background: linear-gradient(135deg, rgba(0,184,148,0.05), rgba(85,230,193,0.02));
  box-shadow: 0 4px 20px rgba(0,184,148,0.08);
}
.dark .pkg-card--hot { background: rgba(0,184,148,0.07); }

.pkg-accent {
  position: absolute; top: 0; bottom: 0; right: 0; width: 3px;
  background: rgba(0,184,148,0.15);
  transition: background 0.3s;
}
.pkg-card--hot .pkg-accent { background: #00B894; }
.pkg-card:hover .pkg-accent { background: #00B894; }

.pkg-body {
  display: flex; align-items: center; gap: 0.85rem;
  padding: 1rem 1.25rem; padding-left: 0.9rem;
}
.pkg-icon { color: #00B894; flex-shrink: 0; }
.pkg-info { flex: 1; }
.pkg-name { font-size: 0.9rem; font-weight: 700; color: #1A2B4C; }
.dark .pkg-name { color: #f0f4ff; }
.pkg-detail { font-size: 0.75rem; color: #8a9ab5; }
.pkg-right-side { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; }
.pkg-price {
  font-size: 1.1rem; font-weight: 900; color: #1A2B4C; letter-spacing: -0.5px;
}
.dark .pkg-price { color: #f0f4ff; }
.pkg-price span { font-size: 0.7rem; color: #8a9ab5; font-weight: 600; }
.pkg-hot-tag {
  background: #00B894; color: white;
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.07em;
  padding: 0.15rem 0.5rem; border-radius: 100px;
}

/* Feature pills */
.feats-heading { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #8a9ab5; margin-bottom: 0.85rem; }
.feats-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.feat-pill {
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: rgba(0,184,148,0.08); border: 1px solid rgba(0,184,148,0.15);
  color: #1A2B4C; font-size: 0.78rem; font-weight: 600;
  padding: 0.3rem 0.75rem; border-radius: 100px;
  transition: background 0.2s, border-color 0.2s;
}
.dark .feat-pill { color: #d1d5db; background: rgba(0,184,148,0.06); }
.feat-pill:hover { background: rgba(0,184,148,0.15); border-color: rgba(0,184,148,0.3); }
.feat-pill svg { color: #00B894; }

/* Separator */
.svc-sep {
  margin: 5rem 2.5rem 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,184,148,0.2), transparent);
}
</style>