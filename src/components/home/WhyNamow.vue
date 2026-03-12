<template>
  <section id="why" class="why-section" dir="rtl" ref="sectionRef">

    <!-- Background layers -->
    <div class="bg-gradient"></div>
    <div class="bg-mesh"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <!-- Floating dots -->
    <div class="dots-field">
      <span v-for="n in 20" :key="n" class="dot" :style="dotStyle(n)"></span>
    </div>

    <div class="container">

      <!-- Left: text column -->
      <div class="text-col" :class="{ visible: visible }">

        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          تميّزنا
        </div>

        <h2 class="headline">
          لماذا<br>
          <em>نمو</em>؟
        </h2>

        <p class="body-text">
          لأننا لا نصمم مجرد موقع، بل نبني تجربة رقمية متكاملة ترفع من قيمة علامتك التجارية وتوفّر لك وقتك وجهدك.
        </p>

        <!-- Mini stats -->
        <div class="mini-stats">
          <div v-for="(s, i) in miniStats" :key="i" class="mini-stat" :style="{ transitionDelay: `${i * 120 + 500}ms` }" :class="{ visible: visible }">
            <span class="mini-val">{{ s.val }}</span>
            <span class="mini-label">{{ s.label }}</span>
          </div>
        </div>

      </div>

      <!-- Right: cards column -->
      <div class="cards-col">
        <div
          v-for="(item, i) in reasons"
          :key="i"
          class="reason-card"
          :class="{ visible: visible }"
          :style="{ transitionDelay: `${i * 160 + 200}ms` }"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          <!-- Left accent bar -->
          <div class="card-bar" :class="{ active: hovered === i }"></div>

          <!-- Icon -->
          <div class="card-icon" :class="{ bounce: hovered === i }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22" height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              v-html="item.paths"
            ></svg>
          </div>

          <!-- Text -->
          <div class="card-text">
            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-desc">{{ item.desc }}</p>
          </div>

          <!-- Arrow -->
          <div class="card-arrow" :class="{ show: hovered === i }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

          <!-- Shimmer -->
          <div class="card-shimmer"></div>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const sectionRef = ref(null);
const visible = ref(false);
const hovered = ref(null);

function dotStyle(n) {
  return {
    left: `${(n * 17 + 5) % 95}%`,
    top: `${(n * 23 + 8) % 90}%`,
    width: `${(n % 3) * 2 + 2}px`,
    height: `${(n % 3) * 2 + 2}px`,
    animationDelay: `${(n % 7) * 0.6}s`,
    animationDuration: `${3 + (n % 4)}s`,
    opacity: 0.08 + (n % 5) * 0.04
  };
}

let observer;
onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) visible.value = true; },
    { threshold: 0.15 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());

const miniStats = [
  { val: "+120", label: "مشروع" },
  { val: "98%", label: "رضا العملاء" },
  { val: "5★", label: "تقييم" }
];

const reasons = [
  {
    title: "خبرة في السوق الأردني",
    desc: "نفهم طبيعة السوق المحلي واحتياجاته، ونبني حلولاً مصممة خصيصاً لجمهورك.",
    paths: `<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>`
  },
  {
    title: "أسعار شفافة وباقات واضحة",
    desc: "لا مفاجآت في الفواتير — باقات محددة المعالم تعرف منها بالضبط ما ستحصل عليه.",
    paths: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`
  },
  {
    title: "دعم فني مستمر بعد التسليم",
    desc: "ما يميّزنا عن المنافسين: فريقنا لا يختفي بعد تسليم الموقع، بل يبقى شريكاً دائماً لك.",
    paths: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>`
  },
  {
    title: "نستخدم أحدث تقنيات الذكاء الاصطناعي",
    desc: "نوظّف الذكاء الاصطناعي في تحسين الأداء وتحليل البيانات وتطوير تجربة المستخدم.",
    paths: `<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>`
  }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.why-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 8rem 0 9rem;
  overflow: hidden;
  color: white;
}

/* ── Background ── */
.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1A2B4C 0%, #0d1a30 45%, #2C3E6B 100%);
}
.bg-mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,184,148,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,184,148,0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: meshMove 20s linear infinite;
}
@keyframes meshMove {
  from { background-position: 0 0; }
  to   { background-position: 48px 48px; }
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
}
.orb-1 {
  width: 500px; height: 500px;
  top: -150px; left: -100px;
  background: radial-gradient(circle, rgba(0,184,148,0.2), transparent 65%);
  animation: orbA 9s ease-in-out infinite;
}
.orb-2 {
  width: 400px; height: 400px;
  bottom: -100px; right: -80px;
  background: radial-gradient(circle, rgba(85,230,193,0.12), transparent 65%);
  animation: orbB 11s ease-in-out infinite;
}
@keyframes orbA {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(50px, 60px); }
}
@keyframes orbB {
  0%,100% { transform: translate(0,0); }
  50%      { transform: translate(-40px, -50px); }
}

/* Floating dots */
.dots-field { position: absolute; inset: 0; pointer-events: none; }
.dot {
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: dotFloat ease-in-out infinite alternate;
}
@keyframes dotFloat {
  from { transform: translateY(0); }
  to   { transform: translateY(-12px); }
}

/* ── Layout ── */
.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; gap: 3rem; }
}

/* ── Text column ── */
.text-col {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
}
.text-col.visible { opacity: 1; transform: translateX(0); }

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #55E6C1;
  margin-bottom: 1.5rem;
}
.eyebrow-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #00B894;
  animation: eyebrowPulse 2s ease-in-out infinite;
}
@keyframes eyebrowPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,184,148,0.4); }
  50%      { box-shadow: 0 0 0 6px rgba(0,184,148,0); }
}

.headline {
  font-size: clamp(2.8rem, 5.5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 1.5rem;
  color: white;
}
.headline em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.body-text {
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.85;
  margin-bottom: 2.5rem;
  max-width: 380px;
}

/* Mini stats */
.mini-stats {
  display: flex;
  gap: 2rem;
}
.mini-stat {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.mini-stat.visible { opacity: 1; transform: translateY(0); }

.mini-val {
  display: block;
  font-size: 1.7rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 0.2rem;
}
.mini-label {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.45);
  font-weight: 500;
}

/* ── Cards column ── */
.cards-col {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.reason-card {
  position: relative;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 18px;
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  overflow: hidden;
  opacity: 0;
  transform: translateX(-36px);
  transition:
    opacity 0.7s cubic-bezier(0.16,1,0.3,1),
    transform 0.7s cubic-bezier(0.16,1,0.3,1),
    border-color 0.3s,
    background 0.3s,
    box-shadow 0.3s;
  backdrop-filter: blur(8px);
}
.reason-card.visible { opacity: 1; transform: translateX(0); }
.reason-card:hover {
  background: rgba(0,184,148,0.1);
  border-color: rgba(0,184,148,0.35);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,184,148,0.1);
  transform: translateX(-6px) !important;
}

/* Accent bar */
.card-bar {
  position: absolute;
  right: 0; top: 12%; bottom: 12%;
  width: 3px;
  border-radius: 3px;
  background: linear-gradient(180deg, #00B894, #55E6C1);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
}
.card-bar.active { transform: scaleY(1); }

/* Icon */
.card-icon {
  flex-shrink: 0;
  width: 48px; height: 48px;
  border-radius: 13px;
  background: linear-gradient(135deg, rgba(0,184,148,0.18), rgba(85,230,193,0.08));
  border: 1px solid rgba(0,184,148,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00B894;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s;
}
.card-icon.bounce {
  animation: iconBounce 0.5s cubic-bezier(0.34,1.56,0.64,1);
  border-color: #00B894;
}
@keyframes iconBounce {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.2) rotate(-6deg); }
  70%  { transform: scale(0.95) rotate(3deg); }
  100% { transform: scale(1) rotate(0); }
}

/* Card text */
.card-text { flex: 1; }
.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
  transition: color 0.3s;
}
.reason-card:hover .card-title { color: #55E6C1; }

.card-desc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.65;
}

/* Arrow */
.card-arrow {
  flex-shrink: 0;
  color: #00B894;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.card-arrow.show { opacity: 1; transform: translateX(0); }

/* Shimmer */
.card-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(0,184,148,0.06) 50%, transparent 65%);
  transform: translateX(-100%);
  border-radius: inherit;
}
.reason-card:hover .card-shimmer {
  transform: translateX(100%);
  transition: transform 0.6s ease-in-out;
}
</style>