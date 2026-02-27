<template>
  <section class="about-hero" ref="elRef">
    <div class="hero-bg"></div>
    <div class="hero-mesh"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="ring ring-1"></div>
    <div class="ring ring-2"></div>

    <div class="particles">
      <span v-for="n in 14" :key="n" class="particle" :style="particleStyle(n)"></span>
    </div>

    <div class="hero-container">
      <!-- Left: text -->
      <div class="hero-content" :class="{ visible }">
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          تعرف علينا
        </div>
        <h1 class="hero-title">من <em>نحن</em></h1>
        <p class="hero-sub">
          وكالة رقمية أردنية انطلقت من إربد لتمكين الشركات الصغيرة والمتوسطة
          من امتلاك حضور رقمي قوي بجودة عالية وأسعار منافسة.
        </p>
        <div class="scroll-hint">
          <div class="scroll-line"></div>
          <span>تمرير</span>
        </div>
      </div>

      <!-- Right: floating stats card -->
      <div class="hero-card" :class="{ visible }">
        <div class="card-inner">
          <div class="city-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            إربد، الأردن 🇯🇴
          </div>
          <div class="card-year">منذ ٢٠٢٤</div>
          <div class="card-stat-grid">
            <div class="cs-item" v-for="s in stats" :key="s.val">
              <span class="cs-val">{{ s.val }}</span>
              <span class="cs-label">{{ s.label }}</span>
            </div>
          </div>
          <div class="card-logo-row">
            <span class="cl-mark">N</span>
            <span class="cl-name">نمو</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from "@/composables/useReveal";

const { elRef, visible } = useReveal(0.1, 200);

function particleStyle(n) {
  return {
    left: `${(n * 17 + 5) % 94}%`,
    top:  `${(n * 29 + 7) % 86}%`,
    width:  `${(n % 3) + 2}px`,
    height: `${(n % 3) + 2}px`,
    animationDelay:    `${(n % 5) * 0.8}s`,
    animationDuration: `${3 + (n % 4) * 1.5}s`,
  };
}

const stats = [
  { val: "+120",   label: "مشروع" },
  { val: "98%",    label: "رضا العملاء" },
  { val: "3 أيام", label: "متوسط التسليم" },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.about-hero {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  min-height: 100vh;
  padding: 9rem 0 6rem;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #1A2B4C 0%, #14213a 50%, #2C3E6B 100%);
}
.hero-mesh {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,184,148,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,184,148,0.06) 1px, transparent 1px);
  background-size: 52px 52px;
  animation: meshDrift 25s linear infinite;
}
@keyframes meshDrift { from{background-position:0 0;} to{background-position:52px 52px;} }

.orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); pointer-events: none;
}
.orb-1 {
  width: 550px; height: 550px; top: -180px; right: -120px;
  background: radial-gradient(circle, rgba(0,184,148,0.2), transparent 65%);
  animation: orbA 10s ease-in-out infinite;
}
.orb-2 {
  width: 400px; height: 400px; bottom: -100px; left: -100px;
  background: radial-gradient(circle, rgba(44,62,107,0.5), transparent 65%);
  animation: orbB 13s ease-in-out infinite;
}
@keyframes orbA { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-40px,50px);} }
@keyframes orbB { 0%,100%{transform:translate(0,0);} 50%{transform:translate(50px,-40px);} }

.ring {
  position: absolute; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.07);
  left: 50%; top: 50%;
  transform: translate(-50%,-50%) scale(0);
  animation: ringPulse 7s ease-out infinite;
  pointer-events: none;
}
.ring-1 { width: 500px; height: 500px; }
.ring-2 { width: 800px; height: 800px; animation-delay: 3.5s; }
@keyframes ringPulse {
  0%   { transform: translate(-50%,-50%) scale(0.3); opacity: 0.5; }
  100% { transform: translate(-50%,-50%) scale(1);   opacity: 0; }
}

.particles { position: absolute; inset: 0; pointer-events: none; }
.particle {
  position: absolute; border-radius: 50%;
  background: rgba(255,255,255,0.35);
  animation: twinkle ease-in-out infinite alternate;
}
@keyframes twinkle {
  from { opacity: 0.1; transform: scale(0.8); }
  to   { opacity: 0.6; transform: scale(1.3); }
}

.hero-container {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto; padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
  color: white; width: 100%;
}
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

/* Content */
.hero-content {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
}
.hero-content.visible { opacity: 1; transform: translateY(0); }

.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em;
  color: #55E6C1; margin-bottom: 1.25rem;
}
.eyebrow-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #00B894;
  animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,184,148,0.5); }
  50%      { box-shadow: 0 0 0 8px rgba(0,184,148,0); }
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900; letter-spacing: -2px; line-height: 1.05;
  margin-bottom: 1.5rem;
}
.hero-title em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.hero-sub {
  font-size: 1.05rem; color: rgba(255,255,255,0.65);
  line-height: 1.85; max-width: 420px; margin-bottom: 2.5rem;
}

.scroll-hint {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.75rem; color: rgba(255,255,255,0.35); letter-spacing: 0.08em;
}
.scroll-line {
  width: 32px; height: 1px;
  background: linear-gradient(90deg, rgba(0,184,148,0.6), transparent);
  position: relative; overflow: hidden;
}
.scroll-line::after {
  content: ''; position: absolute; top: 0; left: -100%;
  width: 100%; height: 100%; background: #00B894;
  animation: scrollSlide 2s ease-in-out infinite;
}
@keyframes scrollSlide { 0%{left:-100%;} 100%{left:100%;} }

/* Floating card */
.hero-card {
  opacity: 0; transform: translateX(-30px) translateY(20px);
  transition: opacity 1s 0.3s cubic-bezier(0.16,1,0.3,1), transform 1s 0.3s cubic-bezier(0.16,1,0.3,1);
}
.hero-card.visible {
  opacity: 1; transform: translateX(0) translateY(0);
  animation: cardFloat 5s 1.3s ease-in-out infinite;
}
@keyframes cardFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }

.card-inner {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 24px; padding: 2.5rem;
  backdrop-filter: blur(16px);
  box-shadow: 0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04);
}

.city-badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: rgba(0,184,148,0.15); border: 1px solid rgba(0,184,148,0.3);
  color: #55E6C1; font-size: 0.8rem; font-weight: 600;
  padding: 0.3rem 0.8rem; border-radius: 100px; margin-bottom: 0.75rem;
}

.card-year {
  font-size: 0.75rem; color: rgba(255,255,255,0.35);
  margin-bottom: 2rem; font-weight: 500;
}

.card-stat-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1rem; margin-bottom: 2rem; padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.cs-item { text-align: center; }
.cs-val {
  display: block; font-size: 1.4rem; font-weight: 900;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  letter-spacing: -0.5px;
}
.cs-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); font-weight: 500; }

.card-logo-row { display: flex; align-items: center; gap: 0.5rem; }
.cl-mark {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 900; font-size: 1rem;
}
.cl-name { font-size: 1.2rem; font-weight: 800; color: white; letter-spacing: -0.3px; }
</style>