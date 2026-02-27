<template>
  <section class="story-section" ref="elRef">
    <div class="story-bg-accent"></div>
    <div class="story-container">

      <!-- Left: interactive timeline -->
      <div class="timeline-col" :class="{ visible }">
        <div class="timeline">
          <div
            v-for="(ev, i) in timeline"
            :key="i"
            class="tl-item"
            :class="{ active: activeItem === i }"
            :style="{ transitionDelay: `${i * 120}ms` }"
            @mouseenter="activeItem = i"
          >
            <div class="tl-dot">
              <span class="tl-dot-inner"></span>
            </div>
            <div class="tl-body">
              <span class="tl-year">{{ ev.year }}</span>
              <h4 class="tl-title">{{ ev.title }}</h4>
              <p class="tl-desc">{{ ev.desc }}</p>
            </div>
          </div>
          <div class="tl-line"></div>
        </div>
      </div>

      <!-- Right: story text -->
      <div class="story-text-col" :class="{ visible }">
        <div class="section-label">قصتنا</div>
        <h2 class="story-title">رحلة بدأت<br><em>بفكرة</em> صغيرة</h2>
        <div class="story-body">
          <p>
            <strong>نمو</strong> هي وكالة دروب سيرفس أردنية متخصصة في تصميم المواقع وإدارة المحتوى.
            انطلقنا من إربد بهدف تمكين الشركات الصغيرة والمتوسطة من امتلاك حضور رقمي قوي
            بأسعار منافسة وجودة عالية.
          </p>
          <p>
            نؤمن أن الموقع الإلكتروني ليس مجرد بطاقة تعريف، بل هو <em>أداة نمو حقيقية</em>
            لأعمالك. لذلك نبني كل موقع وكأنه مشروعنا الخاص.
          </p>
        </div>
        <div class="quote-block">
          <div class="quote-mark">"</div>
          <p class="quote-text">نؤمن أن كل شركة صغيرة تستحق حضوراً رقمياً يليق بطموحها.</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useReveal } from "@/composables/useReveal";

const { elRef, visible } = useReveal(0.12);
const activeItem = ref(0);

const timeline = [
  { year: "٢٠٢٤", title: "انطلاقة نمو",    desc: "بدأنا من إربد بفريق صغير وحلم كبير." },
  { year: "٢٠٢٤", title: "أول ٥٠ مشروع",  desc: "أكملنا خمسين موقعاً لعملاء من مختلف القطاعات." },
  { year: "٢٠٢٥", title: "توسع الخدمات",  desc: "أضفنا إدارة المحتوى والذكاء الاصطناعي لخدماتنا." },
  { year: "٢٠٢٦", title: "+١٢٠ مشروع",    desc: "نواصل النمو ونستهدف السوق العربي." },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.story-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 8rem 0;
  background: #FFFFFF;
  overflow: hidden;
  color: #1A2B4C;
}
.story-bg-accent {
  position: absolute; top: 0; right: 0;
  width: 40%; height: 100%;
  background: linear-gradient(135deg, transparent 50%, rgba(0,184,148,0.04));
  pointer-events: none;
}

.story-container {
  max-width: 1200px; margin: 0 auto; padding: 0 2rem;
  display: grid; grid-template-columns: 1fr 1.2fr;
  gap: 6rem; align-items: start;
}
@media (max-width: 900px) { .story-container { grid-template-columns: 1fr; gap: 3rem; } }

/* Timeline column */
.timeline-col {
  opacity: 0; transform: translateX(30px);
  transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  position: relative; padding-top: 1rem;
}
.timeline-col.visible { opacity: 1; transform: translateX(0); }

.timeline { position: relative; display: flex; flex-direction: column; gap: 0; }

.tl-line {
  position: absolute; right: 11px; top: 12px; bottom: 12px;
  width: 2px;
  background: linear-gradient(180deg, #00B894, rgba(0,184,148,0.1));
  border-radius: 2px;
}

.tl-item {
  display: flex; gap: 1.25rem;
  padding: 1.25rem 0 1.25rem 0.5rem;
  position: relative; cursor: default; transition: all 0.3s;
}
.tl-dot {
  flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
  border: 2px solid rgba(0,184,148,0.3); background: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.3s, transform 0.3s;
  position: relative; z-index: 1; margin-top: 2px;
}
.tl-dot-inner {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(0,184,148,0.3); transition: all 0.3s;
}
.tl-item.active .tl-dot { border-color: #00B894; transform: scale(1.15); }
.tl-item.active .tl-dot-inner {
  background: #00B894;
  box-shadow: 0 0 0 4px rgba(0,184,148,0.15);
}

.tl-body { flex: 1; }
.tl-year {
  font-size: 0.72rem; font-weight: 700; color: #00B894;
  letter-spacing: 0.1em; display: block; margin-bottom: 0.2rem;
}
.tl-title {
  font-size: 1rem; font-weight: 700; color: #1A2B4C;
  margin-bottom: 0.25rem; transition: color 0.3s;
}
.tl-item.active .tl-title { color: #00B894; }
.tl-desc { font-size: 0.85rem; color: #6b7280; line-height: 1.65; }

/* Story text column */
.story-text-col {
  opacity: 0; transform: translateX(-30px);
  transition: opacity 0.9s 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.9s 0.2s cubic-bezier(0.16,1,0.3,1);
}
.story-text-col.visible { opacity: 1; transform: translateX(0); }

.section-label {
  display: inline-block; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.14em; color: #00B894; text-transform: uppercase;
  margin-bottom: 1rem; padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0,184,148,0.3);
}

.story-title {
  font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 900;
  color: #1A2B4C; letter-spacing: -1px; line-height: 1.15; margin-bottom: 1.75rem;
}
.story-title em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.story-body p {
  font-size: 1rem; color: #5a6a85; line-height: 1.9; margin-bottom: 1.25rem;
}
.story-body strong { color: #1A2B4C; font-weight: 700; }
.story-body em { font-style: normal; color: #00B894; font-weight: 600; }

.quote-block {
  margin-top: 2rem; padding: 1.5rem 1.75rem;
  background: linear-gradient(135deg, rgba(0,184,148,0.06), rgba(85,230,193,0.03));
  border: 1px solid rgba(0,184,148,0.15); border-radius: 16px; position: relative;
}
.quote-mark {
  font-size: 4rem; line-height: 1; color: #00B894; opacity: 0.3;
  position: absolute; top: 0.5rem; right: 1.25rem; font-family: Georgia, serif;
}
.quote-text {
  font-size: 1rem; color: #2C3E6B; font-weight: 600;
  line-height: 1.75; font-style: italic;
}
</style>