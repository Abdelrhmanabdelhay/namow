<template>
  <section id="services" class="services-section" dir="rtl" ref="sectionRef">

    <!-- Animated background grid -->
    <div class="bg-grid"></div>

    <!-- Floating shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>

    <!-- Traveling highlight beam -->
    <div class="beam"></div>

    <div class="container">

      <!-- Header -->
      <div class="section-header" :class="{ visible: headerVisible }" ref="headerRef">
        <div class="label-pill">
          <span class="pill-dot"></span>
          ما نقدمه
        </div>
        <h2 class="section-title">خدماتنا المتكاملة</h2>
        <p class="section-sub">حلول رقمية شاملة تغطي كل احتياجات حضورك الرقمي.</p>
      </div>

      <!-- Cards -->
      <div class="cards-grid">
        <div
          v-for="(service, i) in services"
          :key="i"
          class="service-card"
          :class="[`card-${i}`, { visible: cardsVisible }]"
          :style="{ transitionDelay: `${i * 180}ms` }"
          @mouseenter="activeCard = i"
          @mouseleave="activeCard = null"
        >
          <!-- Card number -->
          <span class="card-num">0{{ i + 1 }}</span>

          <!-- Icon with orbit ring -->
          <div class="icon-area">
            <div class="orbit-ring" :class="{ spin: activeCard === i }"></div>
            <div class="icon-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="service.paths"
              ></svg>
            </div>
          </div>

          <!-- Content -->
          <h3 class="card-title">{{ service.title }}</h3>
          <p class="card-desc">{{ service.desc }}</p>

          <!-- Tags animate in on hover -->
          <div class="card-tags">
            <span
              v-for="(tag, ti) in service.tags"
              :key="tag"
              class="tag"
              :style="{ transitionDelay: activeCard === i ? `${ti * 60}ms` : '0ms' }"
              :class="{ 'tag-visible': activeCard === i }"
            >{{ tag }}</span>
          </div>

          <!-- Animated CTA arrow -->
          <div class="card-cta" :class="{ show: activeCard === i }">
            <span class="cta-text">اعرف أكثر</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

          <!-- Hover glow -->
          <div class="card-glow"></div>
          <!-- Bottom gradient bar -->
          <div class="card-bottom-bar"></div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="stats-row" :class="{ visible: cardsVisible }">
        <div v-for="(stat, i) in stats" :key="i" class="stat-item" :style="{ transitionDelay: `${i * 100 + 600}ms` }">
          <span class="stat-val">{{ stat.val }}</span>
          <span class="stat-desc">{{ stat.desc }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const sectionRef = ref(null);
const headerRef = ref(null);
const headerVisible = ref(false);
const cardsVisible = ref(false);
const activeCard = ref(null);

let observer;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.value) headerVisible.value = true;
          if (entry.target === sectionRef.value) cardsVisible.value = true;
        }
      });
    },
    { threshold: 0.12 }
  );
  if (headerRef.value) observer.observe(headerRef.value);
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());

const services = [
  {
    title: "تصميم المواقع",
    desc: "نصمم مواقع إلكترونية احترافية سريعة ومتجاوبة مع جميع الأجهزة، تعكس هوية علامتك وتحوّل الزوار إلى عملاء.",
    tags: ["UI/UX", "Responsive", "سرعة فائقة"],
    paths: `<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>`
  },
  {
    title: "إدارة المحتوى",
    desc: "ندير محتوى موقعك بالكامل من تحديثات دورية وكتابة مقالات وإدارة SEO، حتى تركّز أنت على نمو مشروعك.",
    tags: ["SEO", "محتوى", "تحليلات"],
    paths: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>`
  },
  {
    title: "هوية بصرية",
    desc: "بناء هوية متكاملة تعبر عن رؤيتك وتميّزك في السوق بشكل احترافي ومؤثر يبقى في الذاكرة.",
    tags: ["شعار", "ألوان", "موشن"],
    paths: `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><line x1="2" y1="12" x2="22" y2="12"/>`
  }
];

const stats = [
  { val: "+120", desc: "مشروع منجز" },
  { val: "98%", desc: "رضا العملاء" },
  { val: "4.9★", desc: "تقييم المنصات" },
  { val: "3 أيام", desc: "متوسط التسليم" }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

.services-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 7rem 0 8rem;
  background: #FFFFFF;
  overflow: hidden;
  color: #1A2B4C;
}
.dark .services-section { background: #0d1526; color: #f0f4ff; }

/* ── Animated background grid ── */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,184,148,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,184,148,0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridShift 20s linear infinite;
}
@keyframes gridShift {
  0%   { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

/* ── Floating shapes ── */
.shape {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(50px);
}
.shape-1 {
  width: 450px; height: 450px;
  top: -100px; right: -100px;
  background: radial-gradient(circle, rgba(0,184,148,0.14), transparent 70%);
  animation: shapeFloat1 10s ease-in-out infinite;
}
.shape-2 {
  width: 350px; height: 350px;
  bottom: -80px; left: -80px;
  background: radial-gradient(circle, rgba(44,62,107,0.12), transparent 70%);
  animation: shapeFloat2 13s ease-in-out infinite;
}
.shape-3 {
  width: 200px; height: 200px;
  top: 50%; left: 40%;
  background: radial-gradient(circle, rgba(85,230,193,0.1), transparent 70%);
  animation: shapeFloat3 6s ease-in-out infinite;
}
@keyframes shapeFloat1 {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(-40px, 50px); }
}
@keyframes shapeFloat2 {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(50px, -40px); }
}
@keyframes shapeFloat3 {
  0%,100% { transform: scale(1); opacity: 0.5; }
  50%      { transform: scale(1.5); opacity: 1; }
}

/* Beam */
.beam {
  position: absolute;
  top: 0; left: -200px;
  width: 200px; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,184,148,0.04), transparent);
  animation: beamTravel 8s ease-in-out infinite;
}
@keyframes beamTravel {
  0%   { left: -200px; }
  100% { left: 110%; }
}

/* ── Container ── */
.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ── Header ── */
.section-header {
  text-align: center;
  margin-bottom: 4.5rem;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.section-header.visible { opacity: 1; transform: translateY(0); }

.label-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,184,148,0.08);
  border: 1px solid rgba(0,184,148,0.22);
  color: #00B894;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.35rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.25rem;
  animation: pillBreathe 3s ease-in-out infinite;
}
@keyframes pillBreathe {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,184,148,0); }
  50%      { box-shadow: 0 0 0 6px rgba(0,184,148,0.1); }
}

.pill-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #00B894;
  animation: dotBlink 2s ease-in-out infinite;
}
@keyframes dotBlink {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.3; transform: scale(0.7); }
}

.section-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: #1A2B4C;
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 1rem;
}
.dark .section-title { color: #f0f4ff; }

.section-sub {
  font-size: 1.05rem;
  color: #5a6a85;
  max-width: 440px;
  margin: 0 auto;
  line-height: 1.7;
}
.dark .section-sub { color: #9ca3af; }

/* ── Cards grid ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 900px) { .cards-grid { grid-template-columns: 1fr; } }

/* ── Card ── */
.service-card {
  position: relative;
  background: #FFFFFF;
  border: 1.5px solid rgba(26,43,76,0.08);
  border-radius: 22px;
  padding: 2.25rem 2rem 4rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transform: translateY(50px) rotateX(6deg);
  transition:
    opacity 0.7s cubic-bezier(0.16,1,0.3,1),
    transform 0.7s cubic-bezier(0.16,1,0.3,1),
    border-color 0.4s,
    box-shadow 0.4s;
  transform-style: preserve-3d;
}
.dark .service-card {
  background: rgba(26,43,76,0.3);
  border-color: rgba(255,255,255,0.07);
}
.service-card.visible {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}
.service-card:hover {
  transform: translateY(-10px) !important;
  border-color: rgba(0,184,148,0.35);
  box-shadow: 0 24px 60px rgba(26,43,76,0.12), 0 0 0 1px rgba(0,184,148,0.08);
}
.dark .service-card:hover {
  box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,184,148,0.12);
}

.card-1 { margin-top: 1.5rem; }
@media (max-width: 900px) { .card-1 { margin-top: 0; } }

/* Card number */
.card-num {
  position: absolute;
  top: 1.5rem; left: 1.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #00B894;
  opacity: 0.45;
  letter-spacing: 0.05em;
  transition: opacity 0.3s;
}
.service-card:hover .card-num { opacity: 0.8; }

/* ── Icon ── */
.icon-area {
  position: relative;
  width: 56px; height: 56px;
}
.orbit-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1.5px dashed rgba(0,184,148,0.3);
  opacity: 0;
  transition: opacity 0.4s;
}
.orbit-ring.spin {
  opacity: 1;
  animation: orbitSpin 4s linear infinite;
}
@keyframes orbitSpin {
  to { transform: rotate(360deg); }
}

.icon-wrap {
  width: 56px; height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(0,184,148,0.13), rgba(85,230,193,0.06));
  border: 1.5px solid rgba(0,184,148,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00B894;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, border-color 0.3s;
}
.service-card:hover .icon-wrap {
  transform: scale(1.1) rotate(-4deg);
  border-color: #00B894;
  background: linear-gradient(135deg, rgba(0,184,148,0.22), rgba(85,230,193,0.1));
}

/* Text */
.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1A2B4C;
  transition: color 0.3s;
}
.dark .card-title { color: #f0f4ff; }
.service-card:hover .card-title { color: #00B894; }

.card-desc {
  font-size: 0.9rem;
  color: #5a6a85;
  line-height: 1.75;
}
.dark .card-desc { color: #9ca3af; }

/* Tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
}
.tag {
  font-size: 0.74rem;
  font-weight: 600;
  padding: 0.22rem 0.65rem;
  border-radius: 100px;
  background: rgba(0,184,148,0.07);
  border: 1px solid rgba(0,184,148,0.15);
  color: #00B894;
  opacity: 0.6;
  transform: translateY(4px);
  transition: opacity 0.3s, transform 0.3s, background 0.3s;
}
.tag.tag-visible {
  opacity: 1;
  transform: translateY(0);
}

/* CTA */
.card-cta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  color: #00B894;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.card-cta.show { opacity: 1; transform: translateY(0); }

/* Glow */
.card-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse 80% 60% at 50% 120%, rgba(0,184,148,0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.service-card:hover .card-glow { opacity: 1; }

/* Bottom bar */
.card-bottom-bar {
  position: absolute;
  bottom: 0; left: 8%; right: 8%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00B894, transparent);
  opacity: 0;
  transition: opacity 0.4s;
  border-radius: 2px;
}
.service-card:hover .card-bottom-bar { opacity: 0.7; }

/* ── Stats row ── */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(26,43,76,0.07);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.dark .stats-row { border-top-color: rgba(255,255,255,0.06); }
.stats-row.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 600px) {
  .stats-row { flex-wrap: wrap; gap: 1.5rem; }
}

.stat-item {
  text-align: center;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.stats-row.visible .stat-item {
  opacity: 1;
  transform: translateY(0);
}
.stat-val {
  display: block;
  font-size: 1.8rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}
.stat-desc {
  display: block;
  font-size: 0.8rem;
  color: #8a9ab5;
  margin-top: 0.2rem;
  font-weight: 500;
}
</style>