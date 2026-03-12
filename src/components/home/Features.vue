<template>
  <section id="features" class="features-section" dir="rtl" ref="sectionRef">

    <!-- Floating orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Animated grid lines -->
    <div class="grid-lines">
      <span v-for="n in 6" :key="n" class="grid-line" :style="{ animationDelay: `${n * 0.4}s` }"></span>
    </div>

    <div class="container">

      <!-- Header with reveal -->
      <div class="section-header" :class="{ visible: headerVisible }" ref="headerRef">
        <div class="eyebrow">
          <span class="eyebrow-line"></span>
          لماذا نمو؟
          <span class="eyebrow-line eyebrow-line-reverse"></span>
        </div>
        <h2 class="section-title">
          مزايا <em>Namow</em>
        </h2>
        <p class="section-sub">
          نقدم لك ثلاثة عوامل تجعل موقعك يتفوق على المنافسين.
        </p>
      </div>

      <!-- Cards -->
      <div class="features-grid">
        <div
          v-for="(item, i) in features"
          :key="i"
          class="feature-card"
          :class="{ visible: cardsVisible }"
          :style="{ transitionDelay: `${i * 150}ms` }"
          @mousemove="handleMouseMove($event, i)"
          @mouseleave="handleMouseLeave(i)"
          :ref="el => cardRefs[i] = el"
        >
          <!-- Mouse spotlight -->
          <div class="spotlight" :style="spotlights[i]"></div>

          <!-- Shimmer sweep on hover -->
          <div class="shimmer"></div>

          <div class="card-accent-top"></div>

          <!-- Animated icon -->
          <div class="icon-box">
            <div class="icon-ring-pulse"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26" height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              v-html="item.paths"
            ></svg>
          </div>

          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>

          <!-- Animated stat counter -->
          <div class="card-stat">
            <span class="stat-num">{{ item.stat }}</span>
            <span class="stat-label">{{ item.statLabel }}</span>
          </div>

          <!-- Animated progress bar -->
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{
                width: cardsVisible ? item.progress + '%' : '0%',
                transitionDelay: `${i * 150 + 600}ms`
              }"
            ></div>
          </div>

          <div class="card-glow"></div>
        </div>
      </div>

      <!-- Animated bottom deco -->
      <div class="bottom-deco" :class="{ visible: cardsVisible }">
        <span v-for="n in 7" :key="n" class="deco-bar" :style="{ animationDelay: `${(n - 1) * 120}ms` }"></span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

const sectionRef = ref(null);
const headerRef = ref(null);
const cardRefs = ref([]);
const spotlights = reactive({ 0: {}, 1: {}, 2: {} });
const headerVisible = ref(false);
const cardsVisible = ref(false);

function handleMouseMove(e, i) {
  const card = cardRefs.value[i];
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  spotlights[i] = {
    background: `radial-gradient(260px circle at ${x}% ${y}%, rgba(0,184,148,0.14), transparent 70%)`,
    opacity: "1"
  };
}
function handleMouseLeave(i) {
  spotlights[i] = { opacity: "0" };
}

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
    { threshold: 0.15 }
  );
  if (headerRef.value) observer.observe(headerRef.value);
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());

const features = [
  {
    title: "تصميم احترافي",
    desc: "مواقع عصرية متوافقة مع جميع الأجهزة، تعكس هوية علامتك التجارية باحترافية عالية.",
    stat: "100%",
    statLabel: "توافق الأجهزة",
    progress: 100,
    paths: `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>`
  },
  {
    title: "ظهور في البحث",
    desc: "نضمن لك ترتيباً متقدماً في نتائج جوجل من خلال أفضل ممارسات SEO الحديثة.",
    stat: "TOP",
    statLabel: "نتائج جوجل",
    progress: 92,
    paths: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`
  },
  {
    title: "دعم مستمر",
    desc: "فريقنا متواجد لخدمتك حتى بعد تسليم الموقع — دعم فني متواصل لا ينقطع.",
    stat: "24/7",
    statLabel: "دعم فني",
    progress: 100,
    paths: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>`
  }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.features-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 8rem 0 9rem;
  background: #F5F6FA;
  overflow: hidden;
  color: #1A2B4C;
}
.dark .features-section { background: #0d1526; color: #f0f4ff; }

/* ── Floating orbs ── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
}
.orb-1 {
  width: 500px; height: 500px;
  top: -150px; right: -100px;
  background: radial-gradient(circle, rgba(0,184,148,0.18), transparent 70%);
  animation: orbFloat1 9s ease-in-out infinite;
}
.orb-2 {
  width: 400px; height: 400px;
  bottom: -100px; left: -80px;
  background: radial-gradient(circle, rgba(44,62,107,0.15), transparent 70%);
  animation: orbFloat2 11s ease-in-out infinite;
}
.orb-3 {
  width: 300px; height: 300px;
  top: 40%; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(85,230,193,0.1), transparent 70%);
  animation: orbFloat3 7s ease-in-out infinite;
}
@keyframes orbFloat1 {
  0%,100% { transform: translate(0,0) scale(1); }
  33%      { transform: translate(-30px, 40px) scale(1.05); }
  66%      { transform: translate(20px, -20px) scale(0.95); }
}
@keyframes orbFloat2 {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(40px, -50px); }
}
@keyframes orbFloat3 {
  0%,100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
  50%      { transform: translateX(-50%) scale(1.3); opacity: 1; }
}

/* ── Animated grid lines ── */
.grid-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.grid-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(0,184,148,0.12) 40%, rgba(0,184,148,0.12) 60%, transparent);
  animation: lineReveal 2.5s ease-in-out both;
  transform: scaleY(0);
  transform-origin: top;
}
.grid-line:nth-child(1) { left: 16%; }
.grid-line:nth-child(2) { left: 32%; }
.grid-line:nth-child(3) { left: 48%; }
.grid-line:nth-child(4) { left: 64%; }
.grid-line:nth-child(5) { left: 80%; }
.grid-line:nth-child(6) { right: 5%; }
@keyframes lineReveal {
  to { transform: scaleY(1); }
}

/* ── Container ── */
.container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;
}

/* ── Header ── */
.section-header {
  text-align: center;
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #00B894;
  margin-bottom: 1.5rem;
}
.eyebrow-line {
  display: block;
  width: 28px; height: 1.5px;
  background: linear-gradient(90deg, transparent, #00B894);
}
.eyebrow-line-reverse {
  background: linear-gradient(90deg, #00B894, transparent);
}

.section-title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 900;
  color: #1A2B4C;
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin-bottom: 1.25rem;
}
.dark .section-title { color: #f0f4ff; }
.section-title em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.section-sub {
  font-size: 1rem;
  color: #5a6a85;
  max-width: 420px;
  margin: 0 auto;
  line-height: 1.75;
}
.dark .section-sub { color: #9ca3af; }

/* ── Grid ── */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 900px) { .features-grid { grid-template-columns: 1fr; } }

/* ── Card ── */
.feature-card {
  position: relative;
  background: #FFFFFF;
  border: 1.5px solid rgba(26,43,76,0.08);
  border-radius: 24px;
  padding: 2.5rem 2rem 2rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(48px) scale(0.96);
  transition:
    opacity 0.7s cubic-bezier(0.16,1,0.3,1),
    transform 0.7s cubic-bezier(0.16,1,0.3,1),
    border-color 0.4s,
    box-shadow 0.4s;
}
.dark .feature-card {
  background: rgba(26,43,76,0.3);
  border-color: rgba(255,255,255,0.07);
}
.feature-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.feature-card:hover {
  transform: translateY(-10px) scale(1.01) !important;
  border-color: rgba(0,184,148,0.4);
  box-shadow: 0 24px 60px rgba(26,43,76,0.12), 0 0 0 1px rgba(0,184,148,0.1);
}
.dark .feature-card:hover {
  box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,184,148,0.15);
}

/* Spotlight */
.spotlight {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 0;
}

/* Shimmer sweep */
.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(0,184,148,0.07) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: none;
  z-index: 0;
  border-radius: inherit;
}
.feature-card:hover .shimmer {
  transform: translateX(100%);
  transition: transform 0.6s ease-in-out;
}

/* Top accent */
.card-accent-top {
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00B894, transparent);
  opacity: 0;
  transition: opacity 0.4s;
  border-radius: 2px;
}
.feature-card:hover .card-accent-top { opacity: 1; }

/* ── Icon ── */
.icon-box {
  position: relative;
  z-index: 1;
  width: 58px; height: 58px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(0,184,148,0.15), rgba(85,230,193,0.06));
  border: 1.5px solid rgba(0,184,148,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  color: #00B894;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s;
}
.feature-card:hover .icon-box {
  transform: scale(1.12) rotate(-5deg);
  border-color: #00B894;
}

/* Pulse ring on icon */
.icon-ring-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 20px;
  border: 1.5px solid rgba(0,184,148,0.3);
  opacity: 0;
  transform: scale(0.85);
  transition: none;
}
.feature-card:hover .icon-ring-pulse {
  animation: iconPulse 1s ease-out forwards;
}
@keyframes iconPulse {
  0%   { opacity: 0.8; transform: scale(0.85); }
  100% { opacity: 0;   transform: scale(1.3); }
}

/* ── Text ── */
.card-title {
  position: relative; z-index: 1;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1A2B4C;
  margin-bottom: 0.6rem;
  transition: color 0.3s;
}
.dark .card-title { color: #f0f4ff; }
.feature-card:hover .card-title { color: #00B894; }

.card-desc {
  position: relative; z-index: 1;
  font-size: 0.92rem;
  color: #5a6a85;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}
.dark .card-desc { color: #9ca3af; }

/* ── Stat ── */
.card-stat {
  position: relative; z-index: 1;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.stat-num {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}
.stat-label {
  font-size: 0.8rem;
  color: #8a9ab5;
  font-weight: 500;
}

/* ── Progress bar ── */
.progress-track {
  position: relative; z-index: 1;
  height: 4px;
  border-radius: 4px;
  background: rgba(0,184,148,0.12);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #00B894, #55E6C1);
  width: 0;
  transition: width 1.2s cubic-bezier(0.16,1,0.3,1);
  position: relative;
}
.progress-fill::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 20px; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6));
  animation: progressShine 2s ease-in-out infinite 1.2s;
}
@keyframes progressShine {
  0%   { transform: translateX(0); opacity: 0; }
  50%  { opacity: 1; }
  100% { transform: translateX(-60px); opacity: 0; }
}

/* Bottom glow */
.card-glow {
  position: absolute;
  bottom: 0; left: 10%; right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00B894, transparent);
  opacity: 0;
  transition: opacity 0.4s;
  border-radius: 2px;
}
.feature-card:hover .card-glow { opacity: 0.6; }

/* ── Bottom deco ── */
.bottom-deco {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 6px;
  margin-top: 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s 0.5s, transform 0.8s 0.5s cubic-bezier(0.16,1,0.3,1);
}
.bottom-deco.visible { opacity: 1; transform: translateY(0); }

.deco-bar {
  display: block;
  width: 4px;
  border-radius: 4px;
  background: rgba(0,184,148,0.45);
  animation: barPulse 1.6s ease-in-out infinite;
}
.deco-bar:nth-child(1) { height: 10px; }
.deco-bar:nth-child(2) { height: 18px; }
.deco-bar:nth-child(3) { height: 26px; }
.deco-bar:nth-child(4) { height: 32px; background: rgba(0,184,148,0.8); }
.deco-bar:nth-child(5) { height: 26px; }
.deco-bar:nth-child(6) { height: 18px; }
.deco-bar:nth-child(7) { height: 10px; }
@keyframes barPulse {
  0%,100% { opacity: 0.4; transform: scaleY(0.7); }
  50%      { opacity: 1;   transform: scaleY(1); }
}
</style>