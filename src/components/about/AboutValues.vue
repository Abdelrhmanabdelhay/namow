<template>
  <section class="values-section" ref="elRef">
    <div class="values-bg-mesh"></div>
    <div class="values-orb"></div>

    <div class="values-container">

      <div class="section-header" :class="{ visible }">
        <div class="section-label">قيمنا</div>
        <h2 class="values-title">ما يجعلنا <em>مختلفين</em></h2>
        <p class="values-sub">ثلاثة مبادئ تحكم كل قرار نتخذه وكل مشروع ننجزه.</p>
      </div>

      <div class="values-grid">
        <div
          v-for="(val, i) in values"
          :key="i"
          class="value-card"
          :class="{ visible }"
          :style="{ transitionDelay: `${i * 150}ms` }"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          <div class="val-spotlight" :class="{ active: hovered === i }"></div>
          <div class="val-bg-num">0{{ i + 1 }}</div>

          <div class="val-icon-wrap">
            <div class="val-icon-ring" :class="{ spin: hovered === i }"></div>
            <div class="val-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26" height="26"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                v-html="val.paths"
              ></svg>
            </div>
          </div>

          <h3 class="val-title">{{ val.title }}</h3>
          <p class="val-tagline">{{ val.tagline }}</p>
          <p class="val-desc">{{ val.desc }}</p>
          <div class="val-bottom-bar"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useReveal } from "@/composables/useReveal";

const { elRef, visible } = useReveal(0.12);
const hovered = ref(null);

const values = [
  {
    title: "الشفافية",
    tagline: "لا مفاجآت، أبداً",
    desc: "أسعار واضحة وباقات محددة منذ البداية. تعرف بالضبط ما ستدفع وما ستحصل عليه.",
    paths: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`
  },
  {
    title: "الالتزام",
    tagline: "نعد فنفي",
    desc: "نلتزم بالمواعيد ونسلم ما وعدنا به. سمعتنا مبنية على الوفاء بكل وعد نقطعه.",
    paths: `<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`
  },
  {
    title: "التطور",
    tagline: "دائماً في الطليعة",
    desc: "نواكب أحدث تقنيات الذكاء الاصطناعي ونوظفها في تحسين مواقعنا وتجربة المستخدم.",
    paths: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`
  },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.values-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 8rem 0;
  background: linear-gradient(135deg, #1A2B4C 0%, #131e35 50%, #2C3E6B 100%);
  overflow: hidden;
  color: white;
}

.values-bg-mesh {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,184,148,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,184,148,0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: meshDrift 20s linear infinite;
}
@keyframes meshDrift { from{background-position:0 0;} to{background-position:48px 48px;} }

.values-orb {
  position: absolute; width: 700px; height: 700px;
  top: -200px; left: -100px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,184,148,0.12), transparent 65%);
  filter: blur(80px); pointer-events: none;
  animation: orbFloat 12s ease-in-out infinite;
}
@keyframes orbFloat { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-40px,50px);} }

.values-container {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto; padding: 0 2rem;
}

.section-header {
  text-align: center; margin-bottom: 4rem;
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.section-header.visible { opacity: 1; transform: translateY(0); }

.section-label {
  display: inline-block; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.14em; color: #55E6C1; text-transform: uppercase;
  margin-bottom: 1rem; padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(85,230,193,0.3);
}

.values-title {
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 900;
  color: white; letter-spacing: -1px; margin-top: 0.75rem; margin-bottom: 0.5rem;
}
.values-title em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.values-sub {
  font-size: 1rem; color: rgba(255,255,255,0.5);
  max-width: 400px; margin: 0 auto; line-height: 1.75;
}

.values-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem; margin-top: 4rem;
}
@media (max-width: 900px) { .values-grid { grid-template-columns: 1fr; } }

.value-card {
  position: relative; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09); border-radius: 22px;
  padding: 2.5rem 2rem 2rem; overflow: hidden;
  opacity: 0; transform: translateY(40px);
  transition:
    opacity 0.7s cubic-bezier(0.16,1,0.3,1),
    transform 0.7s cubic-bezier(0.16,1,0.3,1),
    border-color 0.4s, box-shadow 0.4s;
}
.value-card.visible { opacity: 1; transform: translateY(0); }
.value-card:hover {
  transform: translateY(-8px) !important;
  border-color: rgba(0,184,148,0.35);
  box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,184,148,0.1);
}

.val-spotlight {
  position: absolute; inset: 0;
  background: radial-gradient(400px circle at 50% 0%, rgba(0,184,148,0.12), transparent 70%);
  opacity: 0; transition: opacity 0.4s; border-radius: inherit;
}
.val-spotlight.active { opacity: 1; }

.val-bg-num {
  position: absolute; bottom: -0.5rem; left: 1rem;
  font-size: 6rem; font-weight: 900;
  color: rgba(255,255,255,0.03); line-height: 1;
  user-select: none; pointer-events: none; letter-spacing: -4px;
}

.val-icon-wrap {
  position: relative; width: 60px; height: 60px; margin-bottom: 1.75rem;
}
.val-icon-ring {
  position: absolute; inset: -8px; border-radius: 50%;
  border: 1.5px dashed rgba(0,184,148,0.25);
  opacity: 0; transition: opacity 0.4s;
}
.val-icon-ring.spin {
  opacity: 1;
  animation: spinRing 5s linear infinite;
}
@keyframes spinRing { to { transform: rotate(360deg); } }

.val-icon {
  width: 60px; height: 60px; border-radius: 17px;
  background: linear-gradient(135deg, rgba(0,184,148,0.18), rgba(85,230,193,0.07));
  border: 1.5px solid rgba(0,184,148,0.22);
  display: flex; align-items: center; justify-content: center;
  color: #00B894;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s;
}
.value-card:hover .val-icon { transform: scale(1.1) rotate(-5deg); border-color: #00B894; }

.val-title {
  font-size: 1.3rem; font-weight: 800; color: white;
  margin-bottom: 0.3rem; transition: color 0.3s;
}
.value-card:hover .val-title { color: #55E6C1; }

.val-tagline {
  font-size: 0.8rem; font-weight: 700; color: #00B894;
  letter-spacing: 0.05em; margin-bottom: 0.85rem; text-transform: uppercase;
}

.val-desc { font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.8; }

.val-bottom-bar {
  position: absolute; bottom: 0; left: 10%; right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00B894, transparent);
  opacity: 0; transition: opacity 0.4s; border-radius: 2px;
}
.value-card:hover .val-bottom-bar { opacity: 0.7; }
</style>