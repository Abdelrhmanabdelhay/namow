<template>
  <section class="pg-section" dir="rtl">
    <div class="pg-bg-dots"></div>

    <div class="pg-container">
      <!-- Section header -->
      <div class="pg-header" ref="headerRef" :class="{ visible: headerVisible }">
        <div class="pg-section-label">مشاريعنا</div>
        <h2 class="pg-section-title">أعمال تتحدث<br><em>عن نفسها</em></h2>
      </div>

      <!-- Filter tabs -->
      <div class="pg-filters" ref="filtersRef" :class="{ visible: filtersVisible }">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="pg-filter-btn"
          :class="{ active: activeFilter === cat.key }"
          @click="setFilter(cat.key)"
        >
          <span class="pg-filter-count">{{ getCategoryCount(cat.key) }}</span>
          {{ cat.label }}
        </button>
      </div>

      <!-- Projects grid — staggered masonry-style -->
      <div class="pg-grid" ref="gridRef">
        <TransitionGroup name="project-fade">
          <div
            v-for="(project, i) in filteredProjects"
            :key="project.id"
            class="pg-card"
            :class="[`pg-card--${project.size}`, { visible: gridVisible }]"
            :style="{ transitionDelay: `${i * 90}ms` }"
            @mousemove="onTilt($event, project.id)"
            @mouseleave="resetTilt(project.id)"
            @mouseenter="hoveredCard = project.id"
          >
            <div class="pg-card-tilt" :style="tilts[project.id]">

              <!-- ── Image zone ── -->
              <div class="pg-img-zone">
                <!-- Gradient visual with mock browser -->
                <div class="pg-visual" :style="{ background: project.gradient }">
                  <!-- Film-strip number -->
                  <div class="pg-film-num">{{ String(i + 1).padStart(2, '0') }}</div>

                  <!-- Mock browser window -->
                  <div class="pg-mock-browser">
                    <div class="pg-mock-bar">
                      <span class="dot r"></span>
                      <span class="dot y"></span>
                      <span class="dot g"></span>
                      <span class="pg-mock-url">{{ project.url }}</span>
                    </div>
                    <div class="pg-mock-body">
                      <!-- Nav line -->
                      <div class="pg-mock-nav">
                        <div class="mn-logo"></div>
                        <div class="mn-links">
                          <div v-for="n in 4" :key="n" class="mn-link"></div>
                        </div>
                      </div>
                      <!-- Hero lines -->
                      <div class="pg-mock-hero">
                        <div class="mh-line w-65"></div>
                        <div class="mh-line w-45"></div>
                        <div class="mh-btns">
                          <div class="mh-btn green"></div>
                          <div class="mh-btn outline"></div>
                        </div>
                      </div>
                      <!-- Cards row -->
                      <div class="pg-mock-cards">
                        <div v-for="n in 3" :key="n" class="pg-mock-card">
                          <div class="pmc-icon"></div>
                          <div class="pmc-line w-80"></div>
                          <div class="pmc-line w-55"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Category pill -->
                <div class="pg-cat-pill">
                  <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#00B894"/></svg>
                  {{ project.category }}
                </div>

                <!-- ── Hover overlay with CTA ── -->
                <Transition name="overlay-fade">
                  <div v-if="hoveredCard === project.id" class="pg-hover-overlay">
                    <div class="pho-inner">
                      <div class="pho-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                      </div>
                      <a :href="project.link" target="_blank" rel="noopener" class="pho-btn">
                        شاهد المشروع
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- ── Card body ── -->
              <div class="pg-card-body">
                <div class="pg-card-top">
                  <div class="pg-tags">
                    <span v-for="tag in project.tags" :key="tag" class="pg-tag">{{ tag }}</span>
                  </div>
                  <a :href="project.link" target="_blank" rel="noopener" class="pg-ext-link" :title="project.title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>

                <h3 class="pg-card-title">{{ project.title }}</h3>
                <p class="pg-card-desc">{{ project.desc }}</p>

                <div class="pg-card-footer">
                  <div class="pg-result-pill">
                    <span class="pg-result-icon">{{ project.resultIcon }}</span>
                    {{ project.result }}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </TransitionGroup>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRevealMany } from "@/composables/useReveal";

const { refs, visibles } = useRevealMany(["header", "filters", "grid"], 0.12);
const headerRef     = refs.header;
const filtersRef    = refs.filters;
const gridRef       = refs.grid;
const headerVisible  = visibles.header;
const filtersVisible = visibles.filters;
const gridVisible    = visibles.grid;

const activeFilter = ref("all");
const hoveredCard  = ref(null);
const tilts        = ref({});

function onTilt(e, id) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width  - 0.5;
  const y = (e.clientY - rect.top)  / rect.height - 0.5;
  tilts.value[id] = {
    transform: `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.025,1.025,1.025)`,
    transition: "transform 0.08s linear",
  };
}
function resetTilt(id) {
  hoveredCard.value = null;
  tilts.value[id] = {
    transform: "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)",
    transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
  };
}

function setFilter(key) {
  activeFilter.value = key;
}

const categories = [
  { key: "all",      label: "جميع الأعمال" },
  { key: "website",  label: "مواقع تعريفية" },
  { key: "store",    label: "متاجر إلكترونية" },
  { key: "identity", label: "هوية بصرية" },
];

const projects = [
  {
    id: 1,
    title: 'موقع مطعم "الأصيل"',
    desc: "تصميم عصري ومتجاوب مع قائمة طعام تفاعلية ونظام حجز طاولات يقلل المكالمات الهاتفية بنسبة 60٪.",
    category: "موقع تعريفي", filter: "website", size: "large",
    tags: ["UI/UX", "حجز أونلاين", "متجاوب"],
    url: "aseel-restaurant.jo", link: "#",
    result: "↑ 60٪ حجوزات أونلاين", resultIcon: "🍽️",
    gradient: "linear-gradient(135deg, #0d1b35 0%, #00B894 130%)",
  },
  {
    id: 2,
    title: 'عيادة "درّة الأسنان"',
    desc: "تصميم نظيف وهادئ يبث الثقة مع نظام حجز مواعيد مدمج وتذكيرات تلقائية.",
    category: "موقع تعريفي", filter: "website", size: "medium",
    tags: ["نظام حجز", "Healthcare"],
    url: "durra-dental.jo", link: "#",
    result: "↓ 45٪ مكالمات الحجز", resultIcon: "🦷",
    gradient: "linear-gradient(135deg, #1A2B4C 0%, #55E6C1 130%)",
  },
  {
    id: 3,
    title: 'شركة "بناء" للمقاولات',
    desc: "موقع احترافي مع معرض مشاريع تفاعلي وصفحة طلب عروض تساعد على الحصول على عملاء جدد.",
    category: "موقع تعريفي", filter: "website", size: "medium",
    tags: ["B2B", "معرض صور"],
    url: "binaa-co.jo", link: "#",
    result: "↑ 3× استفسارات جديدة", resultIcon: "🏗️",
    gradient: "linear-gradient(135deg, #2C3E6B 0%, #1A2B4C 100%)",
  },
  {
    id: 4,
    title: 'متجر "الزعفران" للعطور',
    desc: "تجربة تسوق فاخرة مع صور احترافية للمنتجات ودفع آمن وشحن ذكي.",
    category: "متجر إلكتروني", filter: "store", size: "large",
    tags: ["eCommerce", "دفع إلكتروني", "فاخر"],
    url: "zaafaran-store.jo", link: "#",
    result: "↑ 2.4× معدل التحويل", resultIcon: "🧴",
    gradient: "linear-gradient(135deg, #00B894 0%, #0d1b35 130%)",
  },
  {
    id: 5,
    title: 'هوية شركة "نور" للاستشارات',
    desc: "هوية بصرية متكاملة — شعار، ألوان، خطوط، قوالب — تعكس الاحترافية والثقة.",
    category: "هوية بصرية", filter: "identity", size: "small",
    tags: ["هوية", "شعار", "Brand"],
    url: "noor-consulting.jo", link: "#",
    result: "هوية بصرية متكاملة", resultIcon: "✨",
    gradient: "linear-gradient(135deg, #55E6C1 0%, #2C3E6B 110%)",
  },
  {
    id: 6,
    title: '"أكاديمية رواد" للتدريب',
    desc: "منصة تعليمية مع نظام تسجيل بالكورسات ومتابعة التقدم وشهادات قابلة للمشاركة.",
    category: "موقع تعريفي", filter: "website", size: "small",
    tags: ["LMS", "تعليم", "منصة"],
    url: "ruwad-academy.jo", link: "#",
    result: "↑ 80٪ تسجيلات إضافية", resultIcon: "🎓",
    gradient: "linear-gradient(135deg, #1A2B4C 0%, #00B894 120%)",
  },
];

const filteredProjects = computed(() =>
  activeFilter.value === "all"
    ? projects
    : projects.filter(p => p.filter === activeFilter.value)
);

function getCategoryCount(key) {
  return key === "all"
    ? projects.length
    : projects.filter(p => p.filter === key).length;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.pg-section {
  font-family: 'Tajawal', sans-serif;
  position: relative;
  padding: 7rem 0 9rem;
  background: #0d1b35;
  overflow: hidden;
  color: white;
}

.pg-bg-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

.pg-container {
  position: relative; z-index: 1;
  max-width: 1280px; margin: 0 auto; padding: 0 2rem;
}

/* ── Section header ── */
.pg-header {
  margin-bottom: 3rem;
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
}
.pg-header.visible { opacity: 1; transform: translateY(0); }

.pg-section-label {
  display: inline-block;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
  color: #00B894; text-transform: uppercase;
  margin-bottom: 0.75rem; padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0,184,148,0.3);
}

.pg-section-title {
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 900; color: white; letter-spacing: -1.5px; line-height: 1.1;
}
.pg-section-title em {
  font-style: normal;
  background: linear-gradient(135deg, #00B894, #55E6C1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

/* ── Filters ── */
.pg-filters {
  display: flex; gap: 0.6rem; flex-wrap: wrap;
  margin-bottom: 3.5rem;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.7s 0.1s cubic-bezier(0.16,1,0.3,1), transform 0.7s 0.1s cubic-bezier(0.16,1,0.3,1);
}
.pg-filters.visible { opacity: 1; transform: translateY(0); }

.pg-filter-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 1.3rem;
  border-radius: 100px;
  border: 1.5px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.5);
  font-family: 'Tajawal', sans-serif;
  font-size: 0.86rem; font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.pg-filter-btn:hover {
  border-color: rgba(0,184,148,0.5); color: #55E6C1;
  transform: translateY(-2px);
  background: rgba(0,184,148,0.08);
}
.pg-filter-btn.active {
  background: #00B894; border-color: #00B894; color: white;
  box-shadow: 0 4px 20px rgba(0,184,148,0.35);
  transform: translateY(-2px);
}
.pg-filter-count {
  background: rgba(255,255,255,0.15);
  border-radius: 100px;
  padding: 0.1rem 0.45rem;
  font-size: 0.7rem; font-weight: 700; min-width: 20px; text-align: center;
}
.pg-filter-btn.active .pg-filter-count { background: rgba(255,255,255,0.25); }

/* ── Grid ── */
.pg-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 1024px) {
  .pg-grid { grid-template-columns: repeat(6, 1fr); }
  .pg-card--large, .pg-card--medium, .pg-card--small { grid-column: span 3 !important; }
}
@media (max-width: 640px) {
  .pg-grid { grid-template-columns: 1fr; }
  .pg-card--large, .pg-card--medium, .pg-card--small { grid-column: span 1 !important; }
}

/* Asymmetric column spans — alternates for editorial feel */
.pg-card--large:nth-child(odd)  { grid-column: span 7; }
.pg-card--large:nth-child(even) { grid-column: span 5; }
.pg-card--medium { grid-column: span 5; }
.pg-card--small  { grid-column: span 4; }

/* ── Card ── */
.pg-card {
  opacity: 0; transform: translateY(44px) scale(0.96);
  transition:
    opacity 0.7s cubic-bezier(0.16,1,0.3,1),
    transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.pg-card.visible { opacity: 1; transform: translateY(0) scale(1); }

.pg-card-tilt {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 22px; overflow: hidden;
  display: flex; flex-direction: column;
  transform-style: preserve-3d;
  transition: border-color 0.4s, box-shadow 0.4s;
}
.pg-card:hover .pg-card-tilt {
  border-color: rgba(0,184,148,0.3);
  box-shadow: 0 24px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,184,148,0.12);
}

/* ── Image zone ── */
.pg-img-zone {
  position: relative;
  padding-top: 55%;
  overflow: hidden;
  flex-shrink: 0;
}
.pg-card--large .pg-img-zone  { padding-top: 48%; }
.pg-card--small .pg-img-zone  { padding-top: 62%; }

.pg-visual {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.pg-card:hover .pg-visual { transform: scale(1.05); }

/* Film strip number */
.pg-film-num {
  position: absolute;
  bottom: 0.6rem; left: 0.75rem;
  font-size: 4.5rem; font-weight: 900; line-height: 1;
  color: rgba(255,255,255,0.1);
  pointer-events: none; user-select: none;
  letter-spacing: -3px;
}

/* Mock browser */
.pg-mock-browser {
  width: 88%; max-width: 310px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px; overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 56px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2);
}
.pg-mock-bar {
  display: flex; align-items: center; gap: 0.35rem;
  padding: 0.55rem 0.8rem;
  background: rgba(0,0,0,0.25); border-bottom: 1px solid rgba(255,255,255,0.07);
}
.dot {
  width: 8px; height: 8px; border-radius: 50%;
}
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }
.pg-mock-url {
  flex: 1; text-align: center;
  background: rgba(255,255,255,0.07); border-radius: 4px;
  padding: 0.18rem 0.5rem;
  font-size: 0.6rem; color: rgba(255,255,255,0.35);
}

.pg-mock-body { padding: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }

/* Nav */
.pg-mock-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 0.4rem;
}
.mn-logo { width: 24px; height: 10px; border-radius: 3px; background: rgba(0,184,148,0.6); }
.mn-links { display: flex; gap: 0.3rem; }
.mn-link { width: 18px; height: 5px; border-radius: 2px; background: rgba(255,255,255,0.12); }

/* Hero */
.pg-mock-hero { display: flex; flex-direction: column; gap: 0.35rem; padding: 0.5rem 0; }
.mh-line {
  height: 6px; border-radius: 3px; background: rgba(255,255,255,0.15);
  animation: pulse 2.5s ease-in-out infinite;
}
.w-65 { width: 65%; } .w-45 { width: 45%; }
@keyframes pulse { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
.mh-btns { display: flex; gap: 0.35rem; margin-top: 0.25rem; }
.mh-btn { height: 16px; border-radius: 4px; }
.mh-btn.green { width: 55px; background: rgba(0,184,148,0.7); }
.mh-btn.outline { width: 40px; background: rgba(255,255,255,0.12); }

/* Cards */
.pg-mock-cards { display: flex; gap: 0.3rem; }
.pg-mock-card {
  flex: 1; background: rgba(255,255,255,0.06);
  border-radius: 5px; padding: 0.4rem;
  display: flex; flex-direction: column; gap: 0.25rem;
}
.pmc-icon { width: 14px; height: 14px; border-radius: 4px; background: rgba(0,184,148,0.4); }
.pmc-line { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.12); }
.w-80 { width: 80%; } .w-55 { width: 55%; }

/* Category pill */
.pg-cat-pill {
  position: absolute; top: 1rem; right: 1rem;
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: rgba(13,27,53,0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.8); font-size: 0.7rem; font-weight: 600;
  padding: 0.3rem 0.75rem; border-radius: 100px;
}

/* Hover overlay */
.pg-hover-overlay {
  position: absolute; inset: 0;
  background: rgba(13,27,53,0.88);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
}
.pho-inner {
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
}
.pho-icon {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(0,184,148,0.15); border: 1.5px solid rgba(0,184,148,0.3);
  display: flex; align-items: center; justify-content: center; color: #00B894;
}
.pho-btn {
  display: inline-flex; align-items: center; gap: 0.55rem;
  background: #00B894; color: white;
  padding: 0.75rem 1.6rem; border-radius: 12px;
  font-family: 'Tajawal', sans-serif; font-size: 0.9rem; font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0,184,148,0.4);
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
}
.pho-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 14px 36px rgba(0,184,148,0.5); }

/* ── Card body ── */
.pg-card-body {
  padding: 1.5rem 1.75rem 1.75rem;
  display: flex; flex-direction: column; gap: 0.7rem;
}

.pg-card-top {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;
}
.pg-tags { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.pg-tag {
  font-size: 0.68rem; font-weight: 600; color: #55E6C1;
  background: rgba(85,230,193,0.1); border: 1px solid rgba(85,230,193,0.18);
  padding: 0.2rem 0.55rem; border-radius: 100px;
}
.pg-ext-link {
  color: rgba(255,255,255,0.25); flex-shrink: 0;
  transition: color 0.25s, transform 0.25s;
}
.pg-ext-link:hover { color: #00B894; transform: translateY(-2px); }

.pg-card-title {
  font-size: 1.1rem; font-weight: 800; color: white;
  line-height: 1.3; transition: color 0.3s;
}
.pg-card:hover .pg-card-title { color: #55E6C1; }

.pg-card-desc {
  font-size: 0.86rem; color: rgba(255,255,255,0.45); line-height: 1.75;
}

.pg-card-footer { margin-top: 0.25rem; }
.pg-result-pill {
  display: inline-flex; align-items: center; gap: 0.45rem;
  background: rgba(0,184,148,0.1); border: 1px solid rgba(0,184,148,0.2);
  color: #00B894; font-size: 0.76rem; font-weight: 700;
  padding: 0.3rem 0.8rem; border-radius: 100px;
}

/* ── Transitions ── */
.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.3s; }
.overlay-fade-enter-from,
.overlay-fade-leave-to { opacity: 0; }

.project-fade-enter-active { transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }
.project-fade-leave-active { transition: all 0.3s; position: absolute; }
.project-fade-enter-from   { opacity: 0; transform: translateY(20px) scale(0.97); }
.project-fade-leave-to     { opacity: 0; transform: scale(0.95); }
.project-fade-move         { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
</style>