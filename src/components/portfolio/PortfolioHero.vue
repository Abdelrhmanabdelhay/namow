<template>
  <section class="ph-section" ref="elRef" dir="rtl">
    <!-- Layered backgrounds -->
    <div class="ph-bg"></div>
    <div class="ph-mesh"></div>
    <div class="ph-orb ph-orb-1"></div>
    <div class="ph-orb ph-orb-2"></div>
    <div class="ph-orb ph-orb-3"></div>

    <!-- Diagonal accent beam -->
    <div class="ph-beam"></div>

    <!-- Giant ghost number -->
    <div class="ph-ghost-num" aria-hidden="true">04</div>

    <!-- Floating particles -->
    <div class="ph-particles">
      <span v-for="n in 12" :key="n" class="ph-particle" :style="particleStyle(n)"></span>
    </div>

    <div class="ph-container">
      <!-- Left: text block -->
      <div class="ph-text" :class="{ visible }">
        <div class="ph-eyebrow">
          <span class="ph-pulse"></span>
          معرض الأعمال · Portfolio
        </div>

        <h1 class="ph-title">
          آخر<br>
          <span class="ph-title-stroke">أعمالنا</span>
        </h1>

        <p class="ph-desc">
          كل مشروع يحكي قصة نجاح حقيقية.
          نفخر بكل موقع صمّمناه وكل علامة تجارية بنيناها
          مع عملائنا في الأردن والوطن العربي.
        </p>

        <!-- Tags cloud -->
        <div class="ph-tags">
          <span v-for="tag in tags" :key="tag" class="ph-badge">{{ tag }}</span>
        </div>
      </div>

      <!-- Right: floating stats card -->
      <div class="ph-stats-card" :class="{ visible }">
        <div class="psc-inner">
          <div class="psc-label">إنجازاتنا بالأرقام</div>
          <div class="psc-grid">
            <div v-for="(s, i) in stats" :key="i" class="psc-item" :style="{ animationDelay: `${i * 120 + 600}ms` }">
              <span class="psc-val">{{ s.val }}</span>
              <span class="psc-key">{{ s.key }}</span>
            </div>
          </div>
          <div class="psc-footer">
            <span class="psc-stars">★★★★★</span>
            <span class="psc-rating">4.9 / 5.0 · تقييم العملاء</span>
          </div>
        </div>
        <!-- Decorative corner accent -->
        <div class="psc-corner"></div>
      </div>
    </div>

    <!-- Scrolling ticker -->
    <div class="ph-ticker" aria-hidden="true">
      <div class="ph-ticker-track">
        <span v-for="n in 4" :key="n" class="ph-ticker-set">
          <span v-for="item in tickerItems" :key="item" class="ph-tick-item">
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#00B894"/></svg>
            {{ item }}
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from "@/composables/useReveal";

const { elRef, visible } = useReveal(0.1, 200);

function particleStyle(n) {
  return {
    left:              `${(n * 19 + 7) % 90}%`,
    top:               `${(n * 31 + 11) % 80}%`,
    width:             `${(n % 3) + 2}px`,
    height:            `${(n % 3) + 2}px`,
    animationDelay:    `${(n % 5) * 0.9}s`,
    animationDuration: `${4 + (n % 4) * 1.2}s`,
  };
}

const stats = [
  { val: "+120", key: "مشروع منجز" },
  { val: "98%",  key: "رضا العملاء" },
  { val: "3 أيام", key: "متوسط التسليم" },
  { val: "4.9★", key: "التقييم العام" },
];

const tags = ["تصميم مواقع", "متاجر إلكترونية", "هوية بصرية", "SEO", "إدارة محتوى"];

const tickerItems = [
  "تصميم احترافي", "واجهات عصرية", "تجربة مستخدم", "ظهور في جوجل",
  "دعم مستمر", "أسعار شفافة", "تسليم سريع", "ذكاء اصطناعي",
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

/* ── Section ── */
.ph-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 10rem 0 0;
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
}

/* ── BG Layers ── */
.ph-bg {
  position: absolute; inset: 0;
  background: linear-gradient(150deg, #0d1b35 0%, #1A2B4C 40%, #0f2044 70%, #162540 100%);
}
.ph-mesh {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,184,148,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,184,148,0.05) 1px, transparent 1px);
  background-size: 56px 56px;
  animation: meshDrift 30s linear infinite;
}
@keyframes meshDrift { to { background-position: 56px 56px; } }

.ph-orb {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
}
.ph-orb-1 {
  width: 700px; height: 700px; top: -250px; right: -150px;
  background: radial-gradient(circle, rgba(0,184,148,0.18), transparent 65%);
  animation: orbA 12s ease-in-out infinite;
}
.ph-orb-2 {
  width: 500px; height: 500px; bottom: 0; left: -150px;
  background: radial-gradient(circle, rgba(44,62,107,0.5), transparent 65%);
  animation: orbB 15s ease-in-out infinite;
}
.ph-orb-3 {
  width: 350px; height: 350px; top: 40%; left: 38%;
  background: radial-gradient(circle, rgba(85,230,193,0.07), transparent 65%);
  animation: orbC 8s ease-in-out infinite;
}
@keyframes orbA { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-50px,60px);} }
@keyframes orbB { 0%,100%{transform:translate(0,0);} 50%{transform:translate(60px,-50px);} }
@keyframes orbC { 0%,100%{transform:scale(1);} 50%{transform:scale(1.4);} }

.ph-beam {
  position: absolute;
  top: -200px; left: -100px; right: -100px; bottom: -200px;
  background: linear-gradient(105deg, transparent 30%, rgba(0,184,148,0.04) 50%, transparent 70%);
  animation: beamSweep 18s ease-in-out infinite;
  pointer-events: none;
}
@keyframes beamSweep {
  0%,100% { transform: skewX(0deg) translateX(0); }
  50%     { transform: skewX(2deg) translateX(60px); }
}

/* Giant ghost number */
.ph-ghost-num {
  position: absolute;
  bottom: -1rem; left: -1rem;
  font-size: clamp(14rem, 28vw, 22rem);
  font-weight: 900; line-height: 1;
  color: rgba(255,255,255,0.024);
  pointer-events: none; user-select: none;
  letter-spacing: -0.06em;
}

/* Particles */
.ph-particles { position: absolute; inset: 0; pointer-events: none; }
.ph-particle {
  position: absolute; border-radius: 50%;
  background: rgba(255,255,255,0.4);
  animation: twinkle ease-in-out infinite alternate;
}
@keyframes twinkle {
  from { opacity: 0.05; transform: scale(0.7); }
  to   { opacity: 0.5; transform: scale(1.4); }
}

/* ── Container ── */
.ph-container {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto; padding: 0 2rem 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
}
@media (max-width: 900px) { .ph-container { grid-template-columns: 1fr; } }

/* ── Text block ── */
.ph-text {
  opacity: 0; transform: translateY(36px);
  transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
}
.ph-text.visible { opacity: 1; transform: translateY(0); }

.ph-eyebrow {
  display: inline-flex; align-items: center; gap: 0.6rem;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.16em;
  color: #55E6C1; text-transform: uppercase; margin-bottom: 1.75rem;
}
.ph-pulse {
  width: 8px; height: 8px; border-radius: 50%; background: #00B894; flex-shrink: 0;
  animation: pulseDot 2s ease-in-out infinite;
}
@keyframes pulseDot {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,184,148,0.5); }
  60%     { box-shadow: 0 0 0 9px rgba(0,184,148,0); }
}

.ph-title {
  font-size: clamp(4rem, 9vw, 7.5rem);
  font-weight: 900; line-height: 0.95; letter-spacing: -4px;
  margin-bottom: 1.75rem;
  color: white;
}
/* Stroke-only text — the "impossible" effect */
.ph-title-stroke {
  display: block;
  color: transparent;
  -webkit-text-stroke: 2.5px #00B894;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px rgba(0,184,148,0.3));
}

.ph-desc {
  font-size: 1.05rem; color: rgba(255,255,255,0.55);
  line-height: 1.85; max-width: 440px; margin-bottom: 2.25rem;
}

.ph-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.ph-badge {
  display: inline-flex; align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.65);
  font-size: 0.78rem; font-weight: 600;
  padding: 0.35rem 0.9rem; border-radius: 100px;
  backdrop-filter: blur(4px);
  transition: background 0.3s, border-color 0.3s, color 0.3s;
}
.ph-badge:hover {
  background: rgba(0,184,148,0.15);
  border-color: rgba(0,184,148,0.4);
  color: #55E6C1;
}

/* ── Stats card ── */
.ph-stats-card {
  opacity: 0; transform: translateX(-30px) translateY(20px);
  transition: opacity 1s 0.25s cubic-bezier(0.16,1,0.3,1), transform 1s 0.25s cubic-bezier(0.16,1,0.3,1);
  position: relative;
}
.ph-stats-card.visible {
  opacity: 1; transform: translateX(0) translateY(0);
  animation: cardFloat 5s 1.5s ease-in-out infinite;
}
@keyframes cardFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-16px);} }

.psc-inner {
  position: relative; z-index: 1;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 26px; padding: 2.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
  overflow: hidden;
}
.psc-inner::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,184,148,0.1), transparent);
  pointer-events: none;
}

.psc-label {
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
  color: rgba(255,255,255,0.35); text-transform: uppercase;
  margin-bottom: 1.75rem;
}

.psc-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 1.5rem; margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.psc-item {
  opacity: 0; transform: translateY(12px);
  animation: statReveal 0.6s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes statReveal { to { opacity: 1; transform: translateY(0); } }

.ph-stats-card.visible .psc-item { animation-play-state: running; }

.psc-val {
  display: block; font-size: 2rem; font-weight: 900;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  letter-spacing: -1px; line-height: 1;
}
.psc-key {
  display: block; font-size: 0.75rem; color: rgba(255,255,255,0.4);
  font-weight: 500; margin-top: 0.3rem;
}

.psc-footer {
  display: flex; align-items: center; gap: 0.75rem;
}
.psc-stars { font-size: 0.9rem; color: #FFD700; letter-spacing: 2px; }
.psc-rating { font-size: 0.75rem; color: rgba(255,255,255,0.4); font-weight: 500; }

/* Decorative corner */
.psc-corner {
  position: absolute; top: 0; right: 0;
  width: 120px; height: 120px;
  background: radial-gradient(circle at top right, rgba(0,184,148,0.15), transparent 70%);
  border-radius: 0 26px 0 0;
  pointer-events: none;
}

/* ── Ticker ── */
.ph-ticker {
  position: relative; z-index: 2;
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(6px);
  padding: 1rem 0;
  overflow: hidden;
}
.ph-ticker::before,
.ph-ticker::after {
  content: '';
  position: absolute; top: 0; bottom: 0; z-index: 3; width: 80px;
  pointer-events: none;
}
.ph-ticker::before {
  right: 0;
  background: linear-gradient(to left, rgba(13,27,53,0.9), transparent);
}
.ph-ticker::after {
  left: 0;
  background: linear-gradient(to right, rgba(13,27,53,0.9), transparent);
}

.ph-ticker-track {
  display: flex; white-space: nowrap;
  animation: tickerRun 32s linear infinite;
}
@keyframes tickerRun { to { transform: translateX(-25%); } }

.ph-ticker-set { display: inline-flex; }
.ph-tick-item {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0 2.25rem;
  font-size: 0.8rem; font-weight: 600;
  color: rgba(255,255,255,0.38); letter-spacing: 0.04em;
}
</style>