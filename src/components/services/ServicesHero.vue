<template>
  <section class="services-hero" dir="rtl" ref="sectionRef">

    <div class="bg-split"></div>
    <div class="geo geo-1"></div>
    <div class="geo geo-2"></div>
    <div class="geo geo-3"></div>
    <div class="geo geo-4"></div>
    <div class="dot-grid"></div>

    <div class="container">
      <div class="hero-inner" :class="{ visible: visible }">

        <!-- Left: text -->
        <div class="hero-text">
          <div class="tag">
            <span class="tag-pulse"></span>
            <span>خدماتنا المتكاملة</span>
          </div>

          <h1 class="hero-title">
            <span class="title-small">نبني</span>
            <span class="title-big">حضورك <em>الرقمي</em></span>
            <span class="title-small">من الصفر</span>
          </h1>

          <p class="hero-desc">
            من أول سطر كود إلى آخر كلمة محتوى — نقدّم لك كل ما تحتاجه لتتفوق على منافسيك في الفضاء الرقمي.
          </p>

          <div class="hero-actions">
            <a href="#services" class="btn-discover">
              <span>اكتشف الخدمات</span>
              <span class="btn-icon">↓</span>
            </a>
            <a href="/contact" class="btn-consult">احجز استشارة مجانية</a>
          </div>
        </div>

        <!-- Right: floating UI preview cards -->
        <div class="hero-visual">
          <div class="visual-card visual-card-1">
            <div class="vc-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <div class="vc-info">
              <div class="vc-title">تصميم المواقع</div>
              <div class="vc-bar"><span class="vc-fill"></span></div>
            </div>
            <div class="vc-stat">100%</div>
          </div>

          <div class="visual-card visual-card-2">
            <div class="vc-icon vc-icon-alt">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div class="vc-info">
              <div class="vc-title">إدارة المحتوى</div>
              <div class="vc-bar"><span class="vc-fill vc-fill-alt" style="width:92%!important"></span></div>
            </div>
            <div class="vc-stat vc-stat-alt">92%</div>
          </div>

          <div class="float-badge">
            <span class="fb-num">+120</span>
            <span class="fb-label">مشروع ناجح</span>
          </div>

          <div class="float-rating">
            <div class="fr-stars">★★★★★</div>
            <div class="fr-label">تقييم عملاؤنا</div>
          </div>
        </div>

      </div>
    </div>

    <div class="curve-bottom">
      <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,0 C480,90 960,90 1440,0 L1440,90 L0,90 Z" fill="currentColor"/>
      </svg>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const sectionRef = ref(null);
const visible    = ref(false);
let observer;
onMounted(() => {
  observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) visible.value = true; }, { threshold: 0.1 });
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.services-hero {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  min-height: 100vh;
  display: flex; align-items: center;
  background: #0d1f3c;
  overflow: hidden;
  color: white;
  padding: 8rem 0 7rem;
}

.bg-split {
  position: absolute; inset: 0;
  background: linear-gradient(125deg, #0d1f3c 0%, #0d1f3c 48%, #009e7a 48%, #00B894 100%);
}
.dark .services-hero { background: #060f1e; }

.geo { position: absolute; pointer-events: none; border-radius: 50%; }
.geo-1 { width: 500px; height: 500px; top: -120px; left: -120px; border: 1px solid rgba(0,184,148,0.15); animation: spin 20s linear infinite; }
.geo-2 { width: 300px; height: 300px; top: 10%; right: 30%; border: 1px solid rgba(255,255,255,0.05); animation: spin 14s linear infinite reverse; }
.geo-3 { width: 180px; height: 180px; bottom: 15%; left: 22%; border: 1px solid rgba(0,184,148,0.2); animation: floatY 6s ease-in-out infinite; }
.geo-4 { width: 80px; height: 80px; top: 32%; left: 42%; background: rgba(0,184,148,0.07); border-radius: 18px; animation: floatY 4s ease-in-out infinite 1s; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }

.dot-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
  background-size: 30px 30px;
}

.container { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 0 2.5rem; width: 100%; }

.hero-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
}
.hero-inner.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 900px) { .hero-inner { grid-template-columns: 1fr; gap: 3rem; } }

.hero-text { display: flex; flex-direction: column; align-items: flex-start; }

.tag {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(0,184,148,0.15); border: 1px solid rgba(0,184,148,0.3);
  color: #55E6C1; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em;
  padding: 0.35rem 1rem; border-radius: 100px; margin-bottom: 2rem;
}
.tag-pulse {
  width: 7px; height: 7px; border-radius: 50%; background: #00B894;
  animation: blink 2s ease-in-out infinite; box-shadow: 0 0 8px rgba(0,184,148,0.8);
}
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }

.hero-title { display: flex; flex-direction: column; margin-bottom: 1.75rem; }
.title-small { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 700; color: rgba(255,255,255,0.45); letter-spacing: 0; line-height: 1.2; }
.title-big {
  font-size: clamp(3rem, 5.5vw, 4.8rem);
  font-weight: 900; line-height: 1.05; letter-spacing: -2px; color: white;
}
.title-big em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.hero-desc { font-size: 1rem; line-height: 1.85; color: rgba(255,255,255,0.6); max-width: 400px; margin-bottom: 2.5rem; }

.hero-actions { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; }

.btn-discover {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: #00B894; color: white; padding: 0.85rem 1.75rem; border-radius: 12px;
  font-family: 'Tajawal', sans-serif; font-size: 0.95rem; font-weight: 700; text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  box-shadow: 0 6px 24px rgba(0,184,148,0.4);
}
.btn-discover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,184,148,0.5); }
.btn-icon { animation: bounce 1.5s ease-in-out infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }

.btn-consult {
  font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.6);
  text-decoration: none; border-bottom: 1px dashed rgba(255,255,255,0.25); padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.btn-consult:hover { color: white; border-color: white; }

/* ── Visual cards ── */
.hero-visual { position: relative; height: 340px; }
@media (max-width: 900px) { .hero-visual { height: 260px; } }

.visual-card {
  position: absolute;
  background: rgba(255,255,255,0.07); backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 18px;
  padding: 1.2rem 1.4rem; display: flex; align-items: center; gap: 1rem;
}
.visual-card-1 { top: 30px; right: 0; left: 20px; animation: cardFloat1 5s ease-in-out infinite; }
.visual-card-2 { bottom: 30px; right: 20px; left: 50px; animation: cardFloat2 5s ease-in-out infinite 1.2s; }
@keyframes cardFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes cardFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

.vc-icon {
  flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px;
  background: rgba(0,184,148,0.2); color: #00B894;
  display: flex; align-items: center; justify-content: center;
}
.vc-icon-alt { background: rgba(44,62,107,0.5); color: #7ea8e8; }
.vc-info { flex: 1; }
.vc-title { font-size: 0.85rem; font-weight: 700; color: white; margin-bottom: 0.5rem; }
.vc-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
.vc-fill {
  display: block; height: 100%; width: 100%; border-radius: 4px;
  background: linear-gradient(90deg, #00B894, #55E6C1);
  animation: grow 2s 1s cubic-bezier(0.16,1,0.3,1) both;
}
.vc-fill-alt { background: linear-gradient(90deg, #4a7ab5, #7ea8e8); }
@keyframes grow { from { width: 0 !important; } }
.vc-stat {
  font-size: 1.25rem; font-weight: 900;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.vc-stat-alt { background: linear-gradient(135deg, #4a7ab5, #7ea8e8); -webkit-background-clip: text; background-clip: text; }

.float-badge {
  position: absolute; top: 0; left: 0;
  background: linear-gradient(135deg, #00B894, #00a37a); color: white;
  border-radius: 16px; padding: 0.75rem 1.1rem; text-align: center;
  box-shadow: 0 10px 28px rgba(0,184,148,0.45);
  animation: badgeFloat 4s ease-in-out infinite 0.5s;
}
@keyframes badgeFloat { 0%,100%{transform:rotate(-3deg) translateY(0)} 50%{transform:rotate(-3deg) translateY(-12px)} }
.fb-num { display: block; font-size: 1.6rem; font-weight: 900; letter-spacing: -1px; line-height: 1; }
.fb-label { display: block; font-size: 0.65rem; font-weight: 600; opacity: 0.85; margin-top: 2px; }

.float-rating {
  position: absolute; bottom: 0; left: 10px;
  background: rgba(255,255,255,0.1); backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.15); border-radius: 12px;
  padding: 0.6rem 1rem; text-align: center;
  animation: badgeFloat 4s ease-in-out infinite 2s;
}
.fr-stars { color: #FFD700; font-size: 0.8rem; letter-spacing: 2px; }
.fr-label { font-size: 0.62rem; color: rgba(255,255,255,0.65); font-weight: 500; margin-top: 3px; }

.curve-bottom { position: absolute; bottom: 0; left: 0; right: 0; height: 90px; color: #F5F6FA; pointer-events: none; }
.dark .curve-bottom { color: #0d1526; }
.curve-bottom svg { width: 100%; height: 100%; }
</style>