<template>
  <section class="ch-section" ref="elRef" dir="rtl">
    <div class="ch-bg"></div>
    <div class="ch-mesh"></div>
    <div class="ch-orb ch-orb-1"></div>
    <div class="ch-orb ch-orb-2"></div>
    <div class="ch-ghost-num" aria-hidden="true">05</div>

    <div class="ch-particles">
      <span v-for="n in 10" :key="n" class="ch-particle" :style="pStyle(n)"></span>
    </div>

    <div class="ch-container">
      <div class="ch-content" :class="{ visible }">
        <div class="ch-eyebrow">
          <span class="ch-pulse"></span>
          تواصل معنا · Contact
        </div>
        <h1 class="ch-title">
          دعنا نسمع<br>
          <span class="ch-accent">فكرتك</span>
        </h1>
        <p class="ch-desc">
          سواء كان لديك مشروع جاهز أو مجرد فكرة في البداية — نحن هنا.
          ردنا يصلك خلال <strong>24 ساعة</strong>.
        </p>

        <div class="ch-badges">
          <span v-for="b in badges" :key="b" class="ch-badge">{{ b }}</span>
        </div>
      </div>

      <!-- Right: floating response-time card -->
      <div class="ch-card" :class="{ visible }">
        <div class="ch-card-inner">
          <div class="ch-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke="#00B894" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div class="ch-card-label">متوسط وقت الرد</div>
          <div class="ch-card-time">أقل من ٢ ساعة</div>
          <div class="ch-card-divider"></div>
          <div class="ch-card-row" v-for="stat in cardStats" :key="stat.label">
            <span class="ch-card-dot"></span>
            <span class="ch-card-stat-label">{{ stat.label }}</span>
            <span class="ch-card-stat-val">{{ stat.val }}</span>
          </div>
          <div class="ch-card-avail">
            <span class="ch-avail-dot"></span>
            متاح الآن · فريق نمو
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom wave divider -->
    <div class="ch-wave">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 60 C360 0 1080 0 1440 60 L1440 60 L0 60Z" fill="#F5F6FA"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from "@/composables/useReveal";
const { elRef, visible } = useReveal(0.1, 200);

function pStyle(n) {
  return {
    left: `${(n * 21 + 5) % 92}%`,
    top: `${(n * 33 + 9) % 80}%`,
    width: `${(n % 3) + 2}px`,
    height: `${(n % 3) + 2}px`,
    animationDelay: `${(n % 5) * 0.85}s`,
    animationDuration: `${3.5 + (n % 4) * 1.3}s`,
  };
}

const badges = ["استشارة مجانية", "رد سريع", "بدون التزام", "سرية تامة"];
const cardStats = [
  { label: "مشاريع منجزة", val: "+120" },
  { label: "رضا العملاء",  val: "98٪"  },
  { label: "سنوات خبرة",  val: "٣+"   },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.ch-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 10rem 0 5rem;
  overflow: hidden;
  color: white;
}
.ch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(150deg, #0d1b35 0%, #1A2B4C 55%, #0f2044 100%);
}
.ch-mesh {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,184,148,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,184,148,0.05) 1px, transparent 1px);
  background-size: 54px 54px;
  animation: meshD 28s linear infinite;
}
@keyframes meshD { to { background-position: 54px 54px; } }

.ch-orb { position: absolute; border-radius: 50%; filter: blur(85px); pointer-events: none; }
.ch-orb-1 {
  width: 650px; height: 650px; top: -220px; right: -120px;
  background: radial-gradient(circle, rgba(0,184,148,0.17), transparent 65%);
  animation: oA 11s ease-in-out infinite;
}
.ch-orb-2 {
  width: 400px; height: 400px; bottom: 0; left: -80px;
  background: radial-gradient(circle, rgba(44,62,107,0.45), transparent 65%);
  animation: oB 14s ease-in-out infinite;
}
@keyframes oA { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-45px,55px);} }
@keyframes oB { 0%,100%{transform:translate(0,0);} 50%{transform:translate(55px,-45px);} }

.ch-ghost-num {
  position: absolute; bottom: -1rem; left: -1rem;
  font-size: clamp(12rem, 24vw, 20rem);
  font-weight: 900; line-height: 1; letter-spacing: -0.06em;
  color: rgba(255,255,255,0.022); pointer-events: none; user-select: none;
}

.ch-particles { position: absolute; inset: 0; pointer-events: none; }
.ch-particle {
  position: absolute; border-radius: 50%; background: rgba(255,255,255,0.4);
  animation: twinkle ease-in-out infinite alternate;
}
@keyframes twinkle { from{opacity:0.05;transform:scale(0.7);} to{opacity:0.5;transform:scale(1.4);} }

/* Layout */
.ch-container {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto; padding: 0 2rem 4rem;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
}
@media (max-width: 900px) { .ch-container { grid-template-columns: 1fr; gap: 2.5rem; } }

/* Content */
.ch-content {
  opacity: 0; transform: translateY(32px);
  transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
}
.ch-content.visible { opacity: 1; transform: translateY(0); }

.ch-eyebrow {
  display: inline-flex; align-items: center; gap: 0.55rem;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.15em;
  color: #55E6C1; text-transform: uppercase; margin-bottom: 1.5rem;
}
.ch-pulse {
  width: 8px; height: 8px; border-radius: 50%; background: #00B894; flex-shrink: 0;
  animation: pulseDot 2s ease-in-out infinite;
}
@keyframes pulseDot {
  0%,100%{box-shadow:0 0 0 0 rgba(0,184,148,0.5);}
  60%{box-shadow:0 0 0 9px rgba(0,184,148,0);}
}

.ch-title {
  font-size: clamp(3.5rem, 8vw, 6.5rem); font-weight: 900;
  line-height: 0.95; letter-spacing: -3px; margin-bottom: 1.5rem;
  color: white;
}
.ch-accent {
  display: block;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 28px rgba(0,184,148,0.3));
}

.ch-desc {
  font-size: 1.05rem; color: rgba(255,255,255,0.55);
  line-height: 1.85; max-width: 420px; margin-bottom: 2rem;
}
.ch-desc strong { color: #55E6C1; font-weight: 700; }

.ch-badges { display: flex; flex-wrap: wrap; gap: 0.55rem; }
.ch-badge {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6); font-size: 0.78rem; font-weight: 600;
  padding: 0.35rem 0.9rem; border-radius: 100px; backdrop-filter: blur(4px);
  transition: all 0.3s;
}
.ch-badge:hover { background: rgba(0,184,148,0.14); border-color: rgba(0,184,148,0.35); color: #55E6C1; }

/* Floating card */
.ch-card {
  opacity: 0; transform: translateX(-24px) translateY(16px);
  transition: opacity 1s 0.25s cubic-bezier(0.16,1,0.3,1), transform 1s 0.25s cubic-bezier(0.16,1,0.3,1);
}
.ch-card.visible {
  opacity: 1; transform: translateX(0) translateY(0);
  animation: cardFloat 5s 1.3s ease-in-out infinite;
}
@keyframes cardFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }

.ch-card-inner {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.11); border-radius: 24px;
  padding: 2.5rem; backdrop-filter: blur(20px);
  box-shadow: 0 28px 70px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
}
.ch-card-icon {
  width: 56px; height: 56px; border-radius: 16px;
  background: rgba(0,184,148,0.14); border: 1.5px solid rgba(0,184,148,0.25);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
}
.ch-card-label {
  font-size: 0.72rem; color: rgba(255,255,255,0.35); font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.3rem;
}
.ch-card-time {
  font-size: 1.6rem; font-weight: 900; color: white;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin-bottom: 1.5rem;
}
.ch-card-divider { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 1.25rem; }

.ch-card-row {
  display: flex; align-items: center; gap: 0.6rem;
  margin-bottom: 0.6rem;
}
.ch-card-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(0,184,148,0.6); flex-shrink: 0; }
.ch-card-stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.4); flex: 1; }
.ch-card-stat-val { font-size: 0.9rem; font-weight: 800; color: white; }

.ch-card-avail {
  display: inline-flex; align-items: center; gap: 0.5rem;
  margin-top: 1.25rem;
  background: rgba(0,184,148,0.1); border: 1px solid rgba(0,184,148,0.2);
  color: #00B894; font-size: 0.75rem; font-weight: 700;
  padding: 0.4rem 0.9rem; border-radius: 100px;
}
.ch-avail-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #00B894;
  animation: pulseDot 1.8s ease-in-out infinite;
}

/* Wave */
.ch-wave {
  position: absolute; bottom: -1px; left: 0; right: 0; z-index: 3;
  line-height: 0;
}
.ch-wave svg { width: 100%; height: 60px; display: block; }
</style>