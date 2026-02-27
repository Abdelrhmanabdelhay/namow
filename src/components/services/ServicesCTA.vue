<template>
  <section class="cta-section" dir="rtl" ref="sectionRef">
    <div class="container">

      <div class="cta-card" :class="{ visible: visible }">

        <!-- Background elements -->
        <div class="card-noise"></div>
        <div class="card-orb card-orb-1"></div>
        <div class="card-orb card-orb-2"></div>
        <div class="card-grid"></div>

        <!-- Left: text -->
        <div class="card-left">
          <div class="cta-tag">
            <span class="tag-dot"></span>
            استشارة مجانية
          </div>

          <h2 class="cta-title">
            هل أنت مستعد<br/>للبدء <em>الآن؟</em>
          </h2>

          <p class="cta-sub">
            تواصل معنا اليوم واحصل على استشارة مجانية 100٪ لمعرفة كيف نطور حضورك الرقمي.
          </p>

          <div class="cta-actions">
            <a href="/contact" class="btn-primary">
              <span class="btn-shine"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>احجز استشارة مجانية</span>
            </a>

            <a href="/contact" class="btn-secondary">
              تحدث مع فريقنا
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Right: trust signals -->
        <div class="card-right">
          <div
            v-for="(t, i) in trust"
            :key="i"
            class="trust-block"
            :style="{ transitionDelay: `${i * 100 + 400}ms` }"
          >
            <div class="tb-icon" v-html="t.icon"></div>
            <div class="tb-text">
              <div class="tb-num">{{ t.num }}</div>
              <div class="tb-label">{{ t.label }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
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
    { threshold: 0.2 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());

const trust = [
  {
    num: "100%",
    label: "استشارة مجانية",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
  },
  {
    num: "24h",
    label: "رد سريع مضمون",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  },
  {
    num: "+120",
    label: "مشروع ناجح",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  },
  {
    num: "5★",
    label: "تقييم عملاؤنا",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
  },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.cta-section {
  font-family: 'Tajawal', sans-serif;
  background: #F5F6FA; padding: 0 0 8rem;
}
.dark .cta-section { background: #0d1526; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 2.5rem; }

/* ── Main card ── */
.cta-card {
  position: relative; overflow: hidden;
  background: #0d1f3c; border-radius: 28px;
  padding: 4.5rem;
  display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center;
  opacity: 0; transform: translateY(48px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 40px 80px rgba(13,31,60,0.3);
}
.cta-card.visible { opacity: 1; transform: translateY(0); }
@media (max-width: 860px) { .cta-card { grid-template-columns: 1fr; padding: 3rem 2rem; } }

/* Background layers */
.card-noise {
  position: absolute; inset: 0; opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
.card-orb {
  position: absolute; border-radius: 50%; pointer-events: none; filter: blur(60px);
}
.card-orb-1 {
  width: 400px; height: 400px; top: -150px; left: -100px;
  background: radial-gradient(circle, rgba(0,184,148,0.2), transparent 70%);
}
.card-orb-2 {
  width: 300px; height: 300px; bottom: -100px; right: 100px;
  background: radial-gradient(circle, rgba(44,62,107,0.3), transparent 70%);
}
.card-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ── Left ── */
.card-left { position: relative; z-index: 1; }

.cta-tag {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(0,184,148,0.15); border: 1px solid rgba(0,184,148,0.3);
  color: #55E6C1; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em;
  padding: 0.3rem 0.9rem; border-radius: 100px; margin-bottom: 1.75rem;
}
.tag-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #00B894;
  animation: pulse 2s ease-in-out infinite; box-shadow: 0 0 8px rgba(0,184,148,0.7);
}
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.6);opacity:.5} }

.cta-title {
  font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 900;
  color: white; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 1.25rem;
}
.cta-title em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.cta-sub {
  font-size: 1rem; color: rgba(255,255,255,0.6); line-height: 1.8;
  max-width: 420px; margin-bottom: 2.5rem;
}

.cta-actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }

.btn-primary {
  position: relative; overflow: hidden;
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: #00B894; color: white;
  padding: 0.85rem 1.85rem; border-radius: 12px;
  font-family: 'Tajawal', sans-serif; font-size: 0.95rem; font-weight: 700;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  box-shadow: 0 6px 24px rgba(0,184,148,0.4);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,184,148,0.5); }
.btn-shine {
  position: absolute; top: 0; left: -80px; bottom: 0; width: 60px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: skewX(-20deg);
  animation: shine 3s ease-in-out infinite 1s;
}
@keyframes shine { 0%{left:-80px} 40%,100%{left:110%} }

.btn-secondary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: rgba(255,255,255,0.65); font-size: 0.9rem; font-weight: 600;
  text-decoration: none; border-bottom: 1px dashed rgba(255,255,255,0.25);
  padding-bottom: 2px; transition: color 0.2s, border-color 0.2s;
}
.btn-secondary:hover { color: white; border-color: white; }
.btn-secondary svg { transition: transform 0.3s; }
.btn-secondary:hover svg { transform: translateX(-4px); }

/* ── Right: trust blocks ── */
.card-right {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  min-width: 300px;
}
@media (max-width: 860px) { .card-right { min-width: unset; } }

.trust-block {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px; padding: 1.25rem;
  display: flex; flex-direction: column; gap: 0.75rem;
  transition: background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  opacity: 0; transform: translateY(20px);
}
.cta-card.visible .trust-block { opacity: 1; transform: translateY(0); }
.trust-block:hover { background: rgba(0,184,148,0.08); border-color: rgba(0,184,148,0.2); transform: translateY(-4px); }

.tb-icon { color: #00B894; }
.tb-num {
  font-size: 1.6rem; font-weight: 900; letter-spacing: -1px;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1;
}
.tb-label { font-size: 0.78rem; color: rgba(255,255,255,0.55); font-weight: 500; margin-top: 2px; }
</style>