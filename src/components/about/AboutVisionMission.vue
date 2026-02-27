<template>
  <section class="vm-section" ref="elRef">
    <div class="vm-container">

      <div class="section-header" :class="{ visible }">
        <div class="section-label">توجهنا</div>
        <h2 class="vm-title">رؤيتنا ورسالتنا</h2>
      </div>

      <div class="vm-grid">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="vm-card"
          :class="{ visible }"
          :style="{ transitionDelay: `${i * 200}ms` }"
        >
          <div class="vm-card-bg"></div>
          <div class="vm-number">0{{ i + 1 }}</div>

          <div class="vm-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28" height="28"
              viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              v-html="card.paths"
            ></svg>
          </div>

          <h3 class="vm-card-title">{{ card.title }}</h3>
          <p class="vm-card-text">{{ card.text }}</p>
          <div class="vm-card-accent"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useReveal } from "@/composables/useReveal";

const { elRef, visible } = useReveal(0.12);

const cards = [
  {
    title: "رؤيتنا",
    text: "أن نكون الشريك الرقمي الأول للشركات الناشئة في الأردن والوطن العربي.",
    paths: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`
  },
  {
    title: "رسالتنا",
    text: "نقدم حلولاً رقمية متكاملة تجمع بين التصميم المبتكر والدعم المستمر لضمان نجاح عملائنا.",
    paths: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`
  },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.vm-section {
  font-family: 'Tajawal', sans-serif;
  padding: 8rem 0;
  background: #F5F6FA;
  color: #1A2B4C;
}

.vm-container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

.section-header {
  text-align: center; margin-bottom: 4rem;
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.section-header.visible { opacity: 1; transform: translateY(0); }

.section-label {
  display: inline-block; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.14em; color: #00B894; text-transform: uppercase;
  margin-bottom: 1rem; padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0,184,148,0.3);
}

.vm-title {
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 900;
  color: #1A2B4C; letter-spacing: -1px; margin-top: 0.75rem;
}

.vm-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
}
@media (max-width: 700px) { .vm-grid { grid-template-columns: 1fr; } }

.vm-card {
  position: relative; background: white;
  border: 1.5px solid rgba(26,43,76,0.07); border-radius: 22px;
  padding: 2.5rem; overflow: hidden;
  opacity: 0; transform: translateY(36px);
  transition:
    opacity 0.7s cubic-bezier(0.16,1,0.3,1),
    transform 0.7s cubic-bezier(0.16,1,0.3,1),
    border-color 0.4s, box-shadow 0.4s;
}
.vm-card.visible { opacity: 1; transform: translateY(0); }
.vm-card:hover {
  border-color: rgba(0,184,148,0.35);
  box-shadow: 0 20px 50px rgba(26,43,76,0.08), 0 0 0 1px rgba(0,184,148,0.08);
  transform: translateY(-6px) !important;
}

.vm-card-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 120%, rgba(0,184,148,0.07), transparent);
  opacity: 0; transition: opacity 0.4s;
}
.vm-card:hover .vm-card-bg { opacity: 1; }

.vm-number {
  position: absolute; top: 1.5rem; left: 1.75rem;
  font-size: 0.72rem; font-weight: 700;
  color: rgba(0,184,148,0.4); letter-spacing: 0.05em;
}

.vm-icon {
  width: 56px; height: 56px; border-radius: 15px;
  background: linear-gradient(135deg, rgba(0,184,148,0.14), rgba(85,230,193,0.06));
  border: 1.5px solid rgba(0,184,148,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #00B894; margin-bottom: 1.5rem;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s;
}
.vm-card:hover .vm-icon { transform: scale(1.1) rotate(-4deg); border-color: #00B894; }

.vm-card-title {
  font-size: 1.25rem; font-weight: 800; color: #1A2B4C;
  margin-bottom: 0.75rem; transition: color 0.3s;
}
.vm-card:hover .vm-card-title { color: #00B894; }

.vm-card-text { font-size: 0.95rem; color: #5a6a85; line-height: 1.8; }

.vm-card-accent {
  position: absolute; top: 0; left: 12%; right: 12%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00B894, transparent);
  opacity: 0; transition: opacity 0.4s; border-radius: 2px;
}
.vm-card:hover .vm-card-accent { opacity: 1; }
</style>