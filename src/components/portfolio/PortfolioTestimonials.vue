<template>
  <section class="pt-section" dir="rtl" ref="elRef">
    <!-- Background -->
    <div class="pt-bg"></div>
    <div class="pt-mesh"></div>
    <div class="pt-orb"></div>

    <div class="pt-container">

      <!-- Header -->
      <div class="pt-header" :class="{ visible }">
        <div class="pt-label">ماذا قال عنا عملاؤنا</div>
        <h2 class="pt-title">شهادات <em>حقيقية</em></h2>
        <p class="pt-sub">أكثر من 120 عميل وثّقوا تجربتهم معنا — إليك بعضها.</p>
      </div>

      <!-- Overall rating badge -->
      <div class="pt-rating-badge" :class="{ visible }">
        <div class="prb-score">4.9</div>
        <div class="prb-right">
          <div class="prb-stars">
            <span v-for="n in 5" :key="n" class="prb-star">★</span>
          </div>
          <div class="prb-count">من أصل 98 تقييم</div>
        </div>
        <div class="prb-divider"></div>
        <div class="prb-platforms">
          <span class="prb-plat">Google</span>
          <span class="prb-plat">Facebook</span>
        </div>
      </div>

      <!-- Carousel -->
      <div class="pt-carousel-wrap" :class="{ visible }">
        <!-- Overflow mask (separate from arrows) -->
        <div class="pt-carousel-overflow">
          <div class="pt-track" :style="trackStyle" @touchstart="onTouchStart" @touchend="onTouchEnd">
          <div
            v-for="(t, i) in testimonials"
            :key="t.id"
            class="pt-card"
            :class="{ active: i === activeIdx }"
          >
            <!-- Quote mark -->
            <div class="pt-quote-mark">"</div>

            <!-- Stars -->
            <div class="pt-stars">
              <span v-for="s in t.rating" :key="s" class="pt-star filled">★</span>
              <span v-for="s in (5 - t.rating)" :key="`e${s}`" class="pt-star empty">★</span>
            </div>

            <!-- Review text -->
            <p class="pt-text">{{ t.text }}</p>

            <!-- Reviewer -->
            <div class="pt-reviewer">
              <div class="pt-avatar" :style="{ background: t.avatarGradient }">
                {{ t.name.charAt(0) }}
              </div>
              <div class="pt-reviewer-info">
                <div class="pt-reviewer-name">{{ t.name }}</div>
                <div class="pt-reviewer-role">{{ t.role }}</div>
              </div>
              <div class="pt-verified">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#00B894">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                عميل موثّق
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- Prev / Next -->
        <button class="pt-arrow pt-prev" @click="prev" :disabled="activeIdx === 0" aria-label="السابق">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <button class="pt-arrow pt-next" @click="next" :disabled="activeIdx === testimonials.length - 1" aria-label="التالي">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </div>

      <!-- Dots -->
      <div class="pt-dots" :class="{ visible }">
        <button
          v-for="(_, i) in testimonials"
          :key="i"
          class="pt-dot"
          :class="{ active: i === activeIdx }"
          @click="activeIdx = i"
          :aria-label="`انتقل لتقييم ${i + 1}`"
        ></button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useReveal } from "@/composables/useReveal";

const { elRef, visible } = useReveal(0.12);

const activeIdx  = ref(0);
let   autoTimer  = null;
let   touchStartX = 0;

const testimonials = [
  {
    id: 1,
    name: "أحمد الزعبي",
    role: "صاحب مطعم الأصيل",
    rating: 5,
    text: "فريق نمو غيّر واجهة مطعمي كلياً. الموقع الجديد أنيق، سريع، ونظام الحجز وفّر عليّ ساعات يومياً. العملاء يُثنون على التصميم باستمرار.",
    avatarGradient: "linear-gradient(135deg, #00B894, #1A2B4C)",
  },
  {
    id: 2,
    name: "د. سارة الحمدان",
    role: "طبيبة أسنان، عيادة درة",
    rating: 5,
    text: "أحترف جداً في التعامل. سلّموا الموقع في أقل من أسبوع، وكان أفضل مما توقعت. نظام الحجز التلقائي قلّل المكالمات بنسبة كبيرة جداً.",
    avatarGradient: "linear-gradient(135deg, #55E6C1, #2C3E6B)",
  },
  {
    id: 3,
    name: "محمود البطاينة",
    role: "مدير شركة بناء للمقاولات",
    rating: 5,
    text: "كنت متردداً في البداية، لكن بعد رؤية النتيجة أصبحت من أشد المعجبين. الموقع يعكس احترافية شركتنا تماماً وجلب لنا عملاء جدد.",
    avatarGradient: "linear-gradient(135deg, #1A2B4C, #00B894)",
  },
  {
    id: 4,
    name: "ليلى النسور",
    role: "مؤسسة متجر الزعفران",
    rating: 5,
    text: "متجري الإلكتروني تجاوز توقعاتي بكثير. التصميم فاخر وسهل الاستخدام، ومنذ الإطلاق ارتفعت مبيعاتي بشكل ملحوظ جداً.",
    avatarGradient: "linear-gradient(135deg, #00B894, #55E6C1)",
  },
  {
    id: 5,
    name: "عمر الشيخ",
    role: "مدير أكاديمية رواد",
    rating: 5,
    text: "الفريق فهم احتياجاتنا من اللحظة الأولى. المنصة التعليمية تعمل بسلاسة تامة، وطلابنا يُعبّرون عن رضاهم عن واجهة الاستخدام باستمرار.",
    avatarGradient: "linear-gradient(135deg, #2C3E6B, #55E6C1)",
  },
];

const trackStyle = computed(() => ({
  transform: `translateX(${activeIdx.value * 100}%)`,
}));

function next() {
  if (activeIdx.value < testimonials.length - 1) activeIdx.value++;
  else activeIdx.value = 0;
}
function prev() {
  if (activeIdx.value > 0) activeIdx.value--;
  else activeIdx.value = testimonials.length - 1;
}
function onTouchStart(e) { touchStartX = e.touches[0].clientX; }
function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
}

function startAuto() { autoTimer = setInterval(next, 5500); }
function stopAuto()  { clearInterval(autoTimer); }

onMounted(startAuto);
onUnmounted(stopAuto);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.pt-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 8rem 0 9rem;
  overflow: hidden;
  color: white;
}

.pt-bg {
  position: absolute; inset: 0;
  background: linear-gradient(150deg, #1A2B4C 0%, #0f2044 50%, #162540 100%);
}
.pt-mesh {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,184,148,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,184,148,0.04) 1px, transparent 1px);
  background-size: 52px 52px;
  animation: meshDrift 28s linear infinite;
}
@keyframes meshDrift { to { background-position: 52px 52px; } }
.pt-orb {
  position: absolute; width: 600px; height: 600px;
  top: -200px; left: 50%; transform: translateX(-50%);
  border-radius: 50%; filter: blur(100px);
  background: radial-gradient(circle, rgba(0,184,148,0.12), transparent 65%);
  pointer-events: none;
}

.pt-container {
  position: relative; z-index: 2;
  max-width: 860px; margin: 0 auto; padding: 0 2rem;
  display: flex; flex-direction: column; align-items: center;
}

/* ── Header ── */
.pt-header {
  text-align: center; margin-bottom: 2.5rem;
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.pt-header.visible { opacity: 1; transform: translateY(0); }

.pt-label {
  display: inline-block; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.15em; color: #00B894; text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.pt-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 900;
  color: white; letter-spacing: -1px; line-height: 1.1;
}
.pt-title em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pt-sub { font-size: 0.95rem; color: rgba(255,255,255,0.45); margin-top: 0.75rem; }

/* Rating badge */
.pt-rating-badge {
  display: inline-flex; align-items: center; gap: 1.25rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px; padding: 0.75rem 1.75rem;
  margin-bottom: 3.5rem;
  backdrop-filter: blur(8px);
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.7s 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.7s 0.2s cubic-bezier(0.16,1,0.3,1);
}
.pt-rating-badge.visible { opacity: 1; transform: translateY(0); }

.prb-score {
  font-size: 2rem; font-weight: 900;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1;
}
.prb-stars { display: flex; gap: 0.15rem; margin-bottom: 0.2rem; }
.prb-star { color: #FFD700; font-size: 0.95rem; }
.prb-count { font-size: 0.72rem; color: rgba(255,255,255,0.4); font-weight: 500; }
.prb-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.1); }
.prb-platforms { display: flex; flex-direction: column; gap: 0.2rem; }
.prb-plat { font-size: 0.72rem; color: rgba(255,255,255,0.4); font-weight: 600; }

/* ── Carousel ── */
.pt-carousel-wrap {
  position: relative; width: 100%;
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.8s 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.3s cubic-bezier(0.16,1,0.3,1);
  padding: 0 2.5rem; /* room for arrows on both sides */
  box-sizing: border-box;
}
.pt-carousel-wrap.visible { opacity: 1; transform: translateY(0); }

.pt-carousel-overflow {
  overflow: hidden;
  border-radius: 24px;
}

.pt-track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.77,0,0.175,1);
  width: 100%;
}

.pt-card {
  min-width: 100%; padding: 3rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 24px; box-sizing: border-box;
  backdrop-filter: blur(16px);
  position: relative; overflow: hidden;
  transition: border-color 0.4s;
}
.pt-card::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 110%, rgba(0,184,148,0.08), transparent);
  pointer-events: none;
}
.pt-card.active { border-color: rgba(0,184,148,0.2); }

.pt-quote-mark {
  position: absolute; top: 1.5rem; left: 2rem;
  font-size: 7rem; line-height: 1; font-family: Georgia, serif;
  color: rgba(0,184,148,0.12); pointer-events: none; user-select: none;
}

.pt-stars { display: flex; gap: 0.2rem; margin-bottom: 1.5rem; }
.pt-star { font-size: 1.05rem; }
.pt-star.filled { color: #FFD700; }
.pt-star.empty  { color: rgba(255,255,255,0.15); }

.pt-text {
  font-size: 1.05rem; color: rgba(255,255,255,0.8);
  line-height: 1.9; margin-bottom: 2rem; position: relative; z-index: 1;
  font-style: italic;
}

.pt-reviewer {
  display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
}
.pt-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 800; color: white;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3); flex-shrink: 0;
}
.pt-reviewer-name { font-size: 0.95rem; font-weight: 800; color: white; }
.pt-reviewer-role { font-size: 0.78rem; color: rgba(255,255,255,0.45); margin-top: 0.15rem; }
.pt-verified {
  margin-right: auto; display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.72rem; color: #00B894; font-weight: 600;
  background: rgba(0,184,148,0.1); border: 1px solid rgba(0,184,148,0.2);
  padding: 0.25rem 0.7rem; border-radius: 100px;
}

/* Arrows */
.pt-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 42px; height: 42px; border-radius: 50%;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.12);
  color: white; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  z-index: 10;
}
.pt-arrow:hover:not(:disabled) {
  background: rgba(0,184,148,0.2); border-color: #00B894;
  transform: translateY(-50%) scale(1.1);
}
.pt-arrow:disabled { opacity: 0.25; cursor: not-allowed; }
.pt-prev { right: 0; }
.pt-next { left: 0; }

/* Dots */
.pt-dots {
  display: flex; gap: 0.5rem; margin-top: 2rem;
  opacity: 0; transition: opacity 0.5s 0.5s;
}
.pt-dots.visible { opacity: 1; }

.pt-dot {
  width: 8px; height: 8px; border-radius: 100px;
  background: rgba(255,255,255,0.2); border: none; cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.pt-dot.active {
  width: 28px; background: #00B894;
  box-shadow: 0 0 10px rgba(0,184,148,0.5);
}
</style>