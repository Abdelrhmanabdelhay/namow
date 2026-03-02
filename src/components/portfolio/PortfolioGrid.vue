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

      <!-- Projects grid -->
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
            @click="openModal(project)"
          >
            <div class="pg-card-tilt" :style="tilts[project.id]">
              <div class="pg-img-zone">
                <div class="pg-visual" :style="{ background: project.gradient }">
                  <div class="pg-film-num">{{ String(i + 1).padStart(2, '0') }}</div>
                  <div class="pg-mock-browser">
                    <div class="pg-mock-bar">
                      <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
                      <span class="pg-mock-url">{{ project.url }}</span>
                    </div>
                    <div class="pg-mock-body">
                      <div class="pg-mock-nav">
                        <div class="mn-logo"></div>
                        <div class="mn-links"><div v-for="n in 4" :key="n" class="mn-link"></div></div>
                      </div>
                      <div class="pg-mock-hero">
                        <div class="mh-line w-65"></div>
                        <div class="mh-line w-45"></div>
                        <div class="mh-btns">
                          <div class="mh-btn green"></div>
                          <div class="mh-btn outline"></div>
                        </div>
                      </div>
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
                <div class="pg-cat-pill">
                  <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#00B894"/></svg>
                  {{ project.category }}
                </div>
                <Transition name="overlay-fade">
                  <div v-if="hoveredCard === project.id" class="pg-hover-overlay">
                    <div class="pho-inner">
                      <div class="pho-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                      </div>
                      <span class="pho-cta">اضغط لمزيد من التفاصيل</span>
                    </div>
                  </div>
                </Transition>
              </div>
              <div class="pg-card-body">
                <div class="pg-tags">
                  <span v-for="tag in project.tags" :key="tag" class="pg-tag">{{ tag }}</span>
                </div>
                <h3 class="pg-card-title">{{ project.title }}</h3>
                <p class="pg-card-desc">{{ project.desc }}</p>
                <div class="pg-card-footer">
                  <div class="pg-result-pill">
                    <span>{{ project.resultIcon }}</span>
                    {{ project.result }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- ══ PROJECT DETAIL MODAL ══ -->
    <Teleport to="body">
      <Transition name="modal-transition">
        <div v-if="modalProject" class="pm-backdrop" @click.self="closeModal">
          <div class="pm-panel" :class="{ open: modalOpen }">

            <button class="pm-close" @click="closeModal" aria-label="إغلاق">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div class="pm-scroll">

              <!-- Hero -->
              <div class="pm-hero" :style="{ background: modalProject.gradient }">
                <div class="pm-hero-num">{{ String(modalProject.id).padStart(2, '0') }}</div>
                <div class="pm-big-browser">
                  <div class="pm-bb-bar">
                    <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
                    <span class="pm-bb-url">{{ modalProject.url }}</span>
                  </div>
                  <div class="pm-bb-body">
                    <div class="pm-bb-nav">
                      <div class="mn-logo"></div>
                      <div class="mn-links"><div v-for="n in 5" :key="n" class="mn-link"></div></div>
                    </div>
                    <div class="pm-bb-hero-row">
                      <div class="pm-bb-left">
                        <div class="pm-bb-line w-70"></div>
                        <div class="pm-bb-line w-50"></div>
                        <div class="pm-bb-line w-60"></div>
                        <div class="pm-bb-btns">
                          <div class="mh-btn green big"></div>
                          <div class="mh-btn outline big"></div>
                        </div>
                      </div>
                      <div class="pm-bb-right">
                        <div class="pm-bb-img-mock"></div>
                      </div>
                    </div>
                    <div class="pm-bb-cards">
                      <div v-for="n in 4" :key="n" class="pm-bb-card">
                        <div class="pmc-icon big"></div>
                        <div class="pmc-line w-80"></div>
                        <div class="pmc-line w-55"></div>
                        <div class="pmc-line w-40"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pm-cat-badge">{{ modalProject.resultIcon }} {{ modalProject.category }}</div>
              </div>

              <!-- Content -->
              <div class="pm-content">

                <div class="pm-title-row">
                  <div class="pm-tags">
                    <span v-for="tag in modalProject.tags" :key="tag" class="pg-tag large">{{ tag }}</span>
                  </div>
                  <h2 class="pm-title">{{ modalProject.title }}</h2>
                </div>

                <p class="pm-desc-full">{{ modalProject.fullDesc }}</p>

                <div class="pm-features">
                  <div v-for="feat in modalProject.features" :key="feat.label" class="pm-feat">
                    <div class="pm-feat-icon">{{ feat.icon }}</div>
                    <div class="pm-feat-body">
                      <div class="pm-feat-title">{{ feat.label }}</div>
                      <div class="pm-feat-sub">{{ feat.sub }}</div>
                    </div>
                  </div>
                </div>

                <div class="pm-stats">
                  <div v-for="stat in modalProject.stats" :key="stat.label" class="pm-stat">
                    <div class="pm-stat-val">{{ stat.val }}</div>
                    <div class="pm-stat-label">{{ stat.label }}</div>
                  </div>
                </div>

                <div class="pm-result-banner">
                  <div class="pm-result-icon-wrap">{{ modalProject.resultIcon }}</div>
                  <div>
                    <div class="pm-result-label">النتيجة المحققة</div>
                    <div class="pm-result-val">{{ modalProject.result }}</div>
                  </div>
                </div>

                <div class="pm-purchase-card">
                  <div class="pm-price-row">
                    <div class="pm-price-info">
                      <div class="pm-price-label">يبدأ من</div>
                      <div class="pm-price">{{ modalProject.price }}</div>
                      <div class="pm-price-note">{{ modalProject.priceNote }}</div>
                    </div>
                    <div class="pm-delivery-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      التسليم خلال {{ modalProject.delivery }}
                    </div>
                  </div>

                  <a
                    :href="`https://wa.me/962776627928?text=${encodeURIComponent('مرحباً، أنا مهتم بـ ' + modalProject.title + '. أريد معرفة المزيد والبدء بالمشروع.')}`"
                    target="_blank"
                    rel="noopener"
                    class="pm-wa-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.855L0 24l6.335-1.521A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.803 9.803 0 0 1-5.034-1.388l-.36-.214-3.735.897.934-3.617-.235-.375A9.79 9.79 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                    </svg>
                    اطلب هذا المشروع عبر واتساب
                  </a>

                  <p class="pm-wa-note">سيصلك رد خلال ساعتين · استشارة مجانية · بدون التزام</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useRevealMany } from "@/composables/useReveal";

const { refs, visibles } = useRevealMany(["header", "filters", "grid"], 0.12);
const headerRef      = refs.header;
const filtersRef     = refs.filters;
const gridRef        = refs.grid;
const headerVisible  = visibles.header;
const filtersVisible = visibles.filters;
const gridVisible    = visibles.grid;

const activeFilter = ref("all");
const hoveredCard  = ref(null);
const tilts        = ref({});

// ── Modal ─────────────────────────────────────
const modalProject = ref(null);
const modalOpen    = ref(false);

function openModal(project) {
  modalProject.value = project;
  nextTick(() => { modalOpen.value = true; });
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modalOpen.value = false;
  setTimeout(() => { modalProject.value = null; }, 400);
  document.body.style.overflow = "";
}

// ── Tilt ──────────────────────────────────────
function onTilt(e, id) {
  const rect = e.currentTarget.getBoundingClientRect();
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

function setFilter(key) { activeFilter.value = key; }

// ── Data ──────────────────────────────────────
const categories = [
  { key: "all",      label: "جميع الأعمال" },
  { key: "website",  label: "مواقع تعريفية" },
  { key: "store",    label: "متاجر إلكترونية" },
  { key: "identity", label: "هوية بصرية" },
];

const projects = [
  {
    id: 1, size: "large", filter: "website",
    category: "موقع تعريفي",
    title: 'موقع مطعم "الأصيل"',
    desc: "تصميم عصري مع قائمة طعام تفاعلية ونظام حجز طاولات.",
    fullDesc: "أعدنا تصميم الحضور الرقمي لمطعم الأصيل بالكامل. الموقع الجديد يعكس هوية المطعم الأصيلة بتصميم عصري يجمع بين الأناقة والسهولة. نظام الحجز الذكي يتيح للعملاء حجز طاولاتهم مباشرة دون الحاجة للاتصال.",
    tags: ["UI/UX", "حجز أونلاين", "متجاوب"],
    url: "aseel-restaurant.jo",
    result: "↑ 60٪ حجوزات أونلاين", resultIcon: "🍽️",
    gradient: "linear-gradient(135deg, #0d1b35 0%, #00B894 130%)",
    price: "٢٥٠ دينار", priceNote: "شامل التصميم والبرمجة والرفع", delivery: "٥ أيام",
    features: [
      { icon: "📱", label: "تصميم متجاوب",     sub: "يعمل على جميع الأجهزة" },
      { icon: "📅", label: "نظام حجز ذكي",     sub: "حجز مباشر بدون مكالمات" },
      { icon: "🍔", label: "قائمة تفاعلية",    sub: "مع صور وأسعار قابلة للتحديث" },
      { icon: "⚡", label: "سرعة تحميل عالية", sub: "أقل من ٢ ثانية" },
    ],
    stats: [
      { val: "٦٠٪", label: "زيادة الحجوزات" },
      { val: "٣×",  label: "زيارات الموقع" },
      { val: "٥",   label: "أيام التسليم" },
    ],
  },
  {
    id: 2, size: "medium", filter: "website",
    category: "موقع تعريفي",
    title: 'عيادة "درّة الأسنان"',
    desc: "تصميم نظيف يبث الثقة مع نظام حجز مواعيد مدمج.",
    fullDesc: "صممنا موقع العيادة ليعطي انطباعاً أولياً احترافياً يريح المريض قبل وصوله. نظام الحجز الإلكتروني مدمج بالكامل مع التذكيرات التلقائية عبر SMS وواتساب.",
    tags: ["نظام حجز", "Healthcare", "SMS"],
    url: "durra-dental.jo",
    result: "↓ 45٪ مكالمات الحجز", resultIcon: "🦷",
    gradient: "linear-gradient(135deg, #1A2B4C 0%, #55E6C1 130%)",
    price: "٢٢٠ دينار", priceNote: "شامل نظام الحجز والتذكيرات", delivery: "٤ أيام",
    features: [
      { icon: "🦷", label: "بروفايل الأطباء",  sub: "صفحة تعريفية لكل طبيب" },
      { icon: "📲", label: "تذكيرات تلقائية",  sub: "SMS + واتساب قبل الموعد" },
      { icon: "📋", label: "نموذج الحجز",       sub: "اختيار الطبيب والوقت والتخصص" },
      { icon: "🔒", label: "SSL وأمان كامل",   sub: "حماية بيانات المرضى" },
    ],
    stats: [
      { val: "٤٥٪", label: "تراجع المكالمات" },
      { val: "٩٨٪", label: "رضا العملاء" },
      { val: "٤",   label: "أيام التسليم" },
    ],
  },
  {
    id: 3, size: "medium", filter: "website",
    category: "موقع تعريفي",
    title: 'شركة "بناء" للمقاولات',
    desc: "موقع احترافي مع معرض مشاريع تفاعلي وصفحة طلب عروض.",
    fullDesc: "أنشأنا حضوراً رقمياً قوياً لشركة بناء يعكس ضخامة مشاريعها. معرض الصور التفاعلي يعرض مشاريع الشركة بأسلوب سينمائي، وصفحة طلب عروض الأسعار تحوّل الزوار إلى عملاء.",
    tags: ["B2B", "معرض صور", "عروض أسعار"],
    url: "binaa-co.jo",
    result: "↑ 3× استفسارات جديدة", resultIcon: "🏗️",
    gradient: "linear-gradient(135deg, #2C3E6B 0%, #1A2B4C 100%)",
    price: "٢٨٠ دينار", priceNote: "شامل معرض الصور وطلبات العروض", delivery: "٦ أيام",
    features: [
      { icon: "🖼️", label: "معرض مشاريع",      sub: "عرض سينمائي للصور والفيديو" },
      { icon: "📄", label: "طلب عروض أسعار",  sub: "نموذج ذكي يصل مباشرة للبريد" },
      { icon: "🏆", label: "صفحة الإنجازات",   sub: "أرقام وإحصائيات الشركة" },
      { icon: "🗺️", label: "خريطة المشاريع",   sub: "توزيع جغرافي للمشاريع المنجزة" },
    ],
    stats: [
      { val: "٣×",  label: "الاستفسارات" },
      { val: "٢٠+", label: "مشروع معروض" },
      { val: "٦",   label: "أيام التسليم" },
    ],
  },
  {
    id: 4, size: "large", filter: "store",
    category: "متجر إلكتروني",
    title: 'متجر "الزعفران" للعطور',
    desc: "تجربة تسوق فاخرة مع صور احترافية ودفع آمن وشحن ذكي.",
    fullDesc: "بنينا متجراً إلكترونياً يليق بفخامة منتجات الزعفران. التصميم يحاكي تجربة التسوق في متاجر العطور الراقية — صور المنتجات بجودة عالية، وصفات تفصيلية، ونظام دفع آمن.",
    tags: ["eCommerce", "دفع إلكتروني", "فاخر", "شحن"],
    url: "zaafaran-store.jo",
    result: "↑ 2.4× معدل التحويل", resultIcon: "🧴",
    gradient: "linear-gradient(135deg, #00B894 0%, #0d1b35 130%)",
    price: "٣٨٠ دينار", priceNote: "شامل بوابة الدفع ولوحة التحكم", delivery: "٧ أيام",
    features: [
      { icon: "💳", label: "دفع آمن متعدد",   sub: "فيزا، ماستر، كلك، كاش" },
      { icon: "📦", label: "إدارة الشحن",       sub: "تتبع الطلبات والتوصيل" },
      { icon: "🛍️", label: "سلة ذكية",         sub: "كوبونات وعروض وخصومات" },
      { icon: "📊", label: "لوحة تحكم كاملة", sub: "مبيعات، مخزون، عملاء" },
    ],
    stats: [
      { val: "٢.٤×", label: "معدل التحويل" },
      { val: "٤٠٪",  label: "زيادة المبيعات" },
      { val: "٧",    label: "أيام التسليم" },
    ],
  },
  {
    id: 5, size: "small", filter: "identity",
    category: "هوية بصرية",
    title: 'هوية شركة "نور" للاستشارات',
    desc: "هوية بصرية متكاملة — شعار، ألوان، خطوط، قوالب.",
    fullDesc: "صممنا الهوية البصرية الكاملة لنور من الصفر. الشعار يعبّر عن الثقة والاحترافية، ودليل الهوية يضمن الاتساق على جميع المواد المطبوعة والرقمية.",
    tags: ["هوية", "شعار", "Brand Guidelines"],
    url: "noor-consulting.jo",
    result: "هوية بصرية متكاملة", resultIcon: "✨",
    gradient: "linear-gradient(135deg, #55E6C1 0%, #2C3E6B 110%)",
    price: "١٨٠ دينار", priceNote: "شامل الملفات الكاملة بكل الصيغ", delivery: "٣ أيام",
    features: [
      { icon: "🎨", label: "شعار احترافي",      sub: "٣ اقتراحات + تعديلات لا محدودة" },
      { icon: "🎨", label: "دليل الألوان",       sub: "باليت ألوان كامل مع الكودات" },
      { icon: "📐", label: "قوالب الاستخدام",   sub: "بطاقات، ورق رسمي، صور سوشيال" },
      { icon: "📁", label: "جميع الصيغ",         sub: "AI, SVG, PNG, PDF جاهزة للطباعة" },
    ],
    stats: [
      { val: "٣", label: "اقتراحات شعار" },
      { val: "∞", label: "تعديلات" },
      { val: "٣", label: "أيام التسليم" },
    ],
  },
  {
    id: 6, size: "small", filter: "website",
    category: "موقع تعريفي",
    title: '"أكاديمية رواد" للتدريب',
    desc: "منصة تعليمية مع تسجيل بالكورسات ومتابعة التقدم.",
    fullDesc: "طورنا منصة تعليمية متكاملة لأكاديمية رواد تتيح للطلاب التسجيل والدفع وحضور المحاضرات واستلام الشهادات — كل ذلك من مكان واحد.",
    tags: ["LMS", "تعليم", "شهادات"],
    url: "ruwad-academy.jo",
    result: "↑ 80٪ تسجيلات إضافية", resultIcon: "🎓",
    gradient: "linear-gradient(135deg, #1A2B4C 0%, #00B894 120%)",
    price: "٣٢٠ دينار", priceNote: "شامل منصة LMS الكاملة", delivery: "٨ أيام",
    features: [
      { icon: "📚", label: "إدارة الكورسات",   sub: "رفع فيديو، PDF، اختبارات" },
      { icon: "🎓", label: "شهادات تلقائية",   sub: "شهادة رقمية عند الإتمام" },
      { icon: "💰", label: "نظام الدفع",        sub: "اشتراكات وكورسات مدفوعة" },
      { icon: "📈", label: "متابعة التقدم",     sub: "لوحة متابعة للطالب والمشرف" },
    ],
    stats: [
      { val: "٨٠٪",  label: "زيادة التسجيلات" },
      { val: "٥٠٠+", label: "طالب مسجل" },
      { val: "٨",    label: "أيام التسليم" },
    ],
  },
];

const filteredProjects = computed(() =>
  activeFilter.value === "all"
    ? projects
    : projects.filter(p => p.filter === activeFilter.value)
);

function getCategoryCount(key) {
  return key === "all" ? projects.length : projects.filter(p => p.filter === key).length;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

/* ── Grid section ── */
.pg-section {
  font-family: 'Tajawal', sans-serif;
  position: relative; padding: 7rem 0 9rem;
  background: #0d1b35; overflow: hidden; color: white;
}
.pg-bg-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 28px 28px; pointer-events: none;
}
.pg-container { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
.pg-header { margin-bottom: 3rem; opacity: 0; transform: translateY(24px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
.pg-header.visible { opacity: 1; transform: translateY(0); }
.pg-section-label { display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; color: #00B894; text-transform: uppercase; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(0,184,148,0.3); }
.pg-section-title { font-size: clamp(2.2rem, 4.5vw, 3.5rem); font-weight: 900; color: white; letter-spacing: -1.5px; line-height: 1.1; }
.pg-section-title em { font-style: normal; background: linear-gradient(135deg, #00B894, #55E6C1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.pg-filters { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 3.5rem; opacity: 0; transform: translateY(16px); transition: opacity 0.7s 0.1s cubic-bezier(0.16,1,0.3,1), transform 0.7s 0.1s cubic-bezier(0.16,1,0.3,1); }
.pg-filters.visible { opacity: 1; transform: translateY(0); }
.pg-filter-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.3rem; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5); font-family: 'Tajawal', sans-serif; font-size: 0.86rem; font-weight: 600; cursor: pointer; transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); }
.pg-filter-btn:hover { border-color: rgba(0,184,148,0.5); color: #55E6C1; transform: translateY(-2px); background: rgba(0,184,148,0.08); }
.pg-filter-btn.active { background: #00B894; border-color: #00B894; color: white; box-shadow: 0 4px 20px rgba(0,184,148,0.35); transform: translateY(-2px); }
.pg-filter-count { background: rgba(255,255,255,0.15); border-radius: 100px; padding: 0.1rem 0.45rem; font-size: 0.7rem; font-weight: 700; min-width: 20px; text-align: center; }
.pg-filter-btn.active .pg-filter-count { background: rgba(255,255,255,0.25); }
.pg-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.5rem; align-items: start; }
@media (max-width: 1024px) { .pg-grid { grid-template-columns: repeat(6, 1fr); } .pg-card--large, .pg-card--medium, .pg-card--small { grid-column: span 3 !important; } }
@media (max-width: 640px) { .pg-grid { grid-template-columns: 1fr; } .pg-card--large, .pg-card--medium, .pg-card--small { grid-column: span 1 !important; } }
.pg-card--large:nth-child(odd)  { grid-column: span 7; }
.pg-card--large:nth-child(even) { grid-column: span 5; }
.pg-card--medium { grid-column: span 5; }
.pg-card--small  { grid-column: span 4; }
.pg-card { opacity: 0; transform: translateY(44px) scale(0.96); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
.pg-card.visible { opacity: 1; transform: translateY(0) scale(1); }
.pg-card-tilt { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 22px; overflow: hidden; display: flex; flex-direction: column; transform-style: preserve-3d; transition: border-color 0.4s, box-shadow 0.4s; }
.pg-card:hover .pg-card-tilt { border-color: rgba(0,184,148,0.3); box-shadow: 0 24px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,184,148,0.12); }
.pg-img-zone { position: relative; padding-top: 55%; overflow: hidden; flex-shrink: 0; }
.pg-card--large .pg-img-zone { padding-top: 48%; }
.pg-card--small .pg-img-zone { padding-top: 62%; }
.pg-visual { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 1.5rem; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
.pg-card:hover .pg-visual { transform: scale(1.05); }
.pg-film-num { position: absolute; bottom: 0.6rem; left: 0.75rem; font-size: 4.5rem; font-weight: 900; line-height: 1; color: rgba(255,255,255,0.1); pointer-events: none; user-select: none; letter-spacing: -3px; }
.pg-mock-browser { width: 88%; max-width: 310px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; overflow: hidden; backdrop-filter: blur(10px); box-shadow: 0 20px 56px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2); }
.pg-mock-bar { display: flex; align-items: center; gap: 0.35rem; padding: 0.55rem 0.8rem; background: rgba(0,0,0,0.25); border-bottom: 1px solid rgba(255,255,255,0.07); }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.r { background: #ff5f57; } .dot.y { background: #febc2e; } .dot.g { background: #28c840; }
.pg-mock-url { flex: 1; text-align: center; background: rgba(255,255,255,0.07); border-radius: 4px; padding: 0.18rem 0.5rem; font-size: 0.6rem; color: rgba(255,255,255,0.35); }
.pg-mock-body { padding: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
.pg-mock-nav { display: flex; align-items: center; justify-content: space-between; padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 0.4rem; }
.mn-logo { width: 24px; height: 10px; border-radius: 3px; background: rgba(0,184,148,0.6); }
.mn-links { display: flex; gap: 0.3rem; }
.mn-link { width: 18px; height: 5px; border-radius: 2px; background: rgba(255,255,255,0.12); }
.pg-mock-hero { display: flex; flex-direction: column; gap: 0.35rem; padding: 0.5rem 0; }
.mh-line { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.15); animation: pulse 2.5s ease-in-out infinite; }
.w-65 { width: 65%; } .w-45 { width: 45%; } .w-70 { width: 70%; } .w-50 { width: 50%; } .w-60 { width: 60%; } .w-80 { width: 80%; } .w-55 { width: 55%; } .w-40 { width: 40%; }
@keyframes pulse { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
.mh-btns { display: flex; gap: 0.35rem; margin-top: 0.25rem; }
.mh-btn { height: 16px; border-radius: 4px; }
.mh-btn.green { width: 55px; background: rgba(0,184,148,0.7); }
.mh-btn.outline { width: 40px; background: rgba(255,255,255,0.12); }
.mh-btn.big { height: 20px; }
.mh-btn.green.big { width: 70px; }
.mh-btn.outline.big { width: 55px; }
.pg-mock-cards { display: flex; gap: 0.3rem; }
.pg-mock-card { flex: 1; background: rgba(255,255,255,0.06); border-radius: 5px; padding: 0.4rem; display: flex; flex-direction: column; gap: 0.25rem; }
.pmc-icon { width: 14px; height: 14px; border-radius: 4px; background: rgba(0,184,148,0.4); }
.pmc-icon.big { width: 20px; height: 20px; }
.pmc-line { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.12); }
.pg-cat-pill { position: absolute; top: 1rem; right: 1rem; display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(13,27,53,0.75); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); font-size: 0.7rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 100px; }
.pg-hover-overlay { position: absolute; inset: 0; background: rgba(13,27,53,0.88); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; }
.pho-inner { display: flex; flex-direction: column; align-items: center; gap: 0.9rem; }
.pho-icon { width: 52px; height: 52px; border-radius: 50%; background: rgba(0,184,148,0.15); border: 1.5px solid rgba(0,184,148,0.3); display: flex; align-items: center; justify-content: center; color: #00B894; }
.pho-cta { font-family: 'Tajawal', sans-serif; font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.85); }
.pg-card-body { padding: 1.5rem 1.75rem 1.75rem; display: flex; flex-direction: column; gap: 0.7rem; }
.pg-tags { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.pg-tag { font-size: 0.68rem; font-weight: 600; color: #55E6C1; background: rgba(85,230,193,0.1); border: 1px solid rgba(85,230,193,0.18); padding: 0.2rem 0.55rem; border-radius: 100px; }
.pg-tag.large { font-size: 0.78rem; padding: 0.3rem 0.8rem; }
.pg-card-title { font-size: 1.1rem; font-weight: 800; color: white; line-height: 1.3; transition: color 0.3s; }
.pg-card:hover .pg-card-title { color: #55E6C1; }
.pg-card-desc { font-size: 0.86rem; color: rgba(255,255,255,0.45); line-height: 1.75; }
.pg-card-footer { margin-top: 0.25rem; }
.pg-result-pill { display: inline-flex; align-items: center; gap: 0.45rem; background: rgba(0,184,148,0.1); border: 1px solid rgba(0,184,148,0.2); color: #00B894; font-size: 0.76rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 100px; }

/* transitions */
.overlay-fade-enter-active, .overlay-fade-leave-active { transition: opacity 0.3s; }
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }
.project-fade-enter-active { transition: all 0.5s cubic-bezier(0.16,1,0.3,1); }
.project-fade-leave-active { transition: all 0.3s; position: absolute; }
.project-fade-enter-from { opacity: 0; transform: translateY(20px) scale(0.97); }
.project-fade-leave-to { opacity: 0; transform: scale(0.95); }
.project-fade-move { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }

/* ══ MODAL ══ */
.pm-backdrop {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(5,12,28,0.78); backdrop-filter: blur(8px);
  display: flex; align-items: flex-end; justify-content: center;
}
@media (min-width: 768px) { .pm-backdrop { align-items: center; padding: 2rem; } }

.pm-panel {
  font-family: 'Tajawal', sans-serif;
  position: relative; width: 100%; max-width: 780px; max-height: 92vh;
  background: #0d1b35; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 28px 28px 0 0; overflow: hidden;
  display: flex; flex-direction: column;
  transform: translateY(70px); opacity: 0;
  transition: transform 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.35s;
  color: white;
  box-shadow: 0 -20px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,184,148,0.1);
}
@media (min-width: 768px) {
  .pm-panel { border-radius: 28px; transform: translateY(40px) scale(0.96); }
}
.pm-panel.open { transform: translateY(0) scale(1); opacity: 1; }
.pm-panel::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2.5px;
  background: linear-gradient(90deg, #00B894, #55E6C1, #00B894);
  background-size: 200%; animation: gradShift 4s linear infinite; z-index: 10;
}
@keyframes gradShift { to { background-position: 200%; } }

.pm-close {
  position: absolute; top: 1.1rem; left: 1.1rem;
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.6); cursor: pointer; z-index: 20;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.25s, color 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.pm-close:hover { background: rgba(229,62,62,0.15); color: #fc8181; transform: rotate(90deg) scale(1.1); }

.pm-scroll { overflow-y: auto; flex: 1; }
.pm-scroll::-webkit-scrollbar { width: 4px; }
.pm-scroll::-webkit-scrollbar-thumb { background: rgba(0,184,148,0.3); border-radius: 4px; }

.pm-hero {
  position: relative; height: 240px; overflow: hidden;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
@media (min-width: 640px) { .pm-hero { height: 300px; } }
.pm-hero-num {
  position: absolute; bottom: -0.5rem; left: 1rem;
  font-size: 9rem; font-weight: 900; line-height: 1;
  color: rgba(255,255,255,0.07); pointer-events: none; user-select: none; letter-spacing: -6px;
}
.pm-big-browser {
  width: 70%; max-width: 420px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px; overflow: hidden; backdrop-filter: blur(12px);
  box-shadow: 0 30px 80px rgba(0,0,0,0.5);
}
.pm-bb-bar { display: flex; align-items: center; gap: 0.35rem; padding: 0.65rem 1rem; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.06); }
.pm-bb-url { flex: 1; text-align: center; background: rgba(255,255,255,0.07); border-radius: 4px; padding: 0.2rem 0.6rem; font-size: 0.64rem; color: rgba(255,255,255,0.3); }
.pm-bb-body { padding: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem; }
.pm-bb-nav { display: flex; align-items: center; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 0.35rem; }
.pm-bb-hero-row { display: flex; gap: 0.75rem; align-items: center; padding: 0.5rem 0; }
.pm-bb-left { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
.pm-bb-right { flex-shrink: 0; }
.pm-bb-img-mock { width: 70px; height: 55px; border-radius: 8px; background: rgba(255,255,255,0.1); }
.pm-bb-line { height: 7px; border-radius: 3px; background: rgba(255,255,255,0.15); animation: pulse 2.5s ease-in-out infinite; }
.pm-bb-btns { display: flex; gap: 0.4rem; margin-top: 0.3rem; }
.pm-bb-cards { display: flex; gap: 0.35rem; }
.pm-bb-card { flex: 1; background: rgba(255,255,255,0.06); border-radius: 6px; padding: 0.5rem; display: flex; flex-direction: column; gap: 0.3rem; }
.pm-cat-badge { position: absolute; bottom: 1.2rem; right: 1.2rem; background: rgba(13,27,53,0.8); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); color: white; font-size: 0.78rem; font-weight: 700; padding: 0.4rem 0.9rem; border-radius: 100px; }

.pm-content { padding: 2rem 2rem 2.5rem; display: flex; flex-direction: column; gap: 1.75rem; }
.pm-title-row { display: flex; flex-direction: column; gap: 0.75rem; }
.pm-title { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 900; color: white; line-height: 1.2; }
.pm-desc-full { font-size: 0.95rem; color: rgba(255,255,255,0.6); line-height: 1.85; background: rgba(255,255,255,0.03); border-right: 3px solid #00B894; padding: 1rem 1.25rem; border-radius: 0 12px 12px 0; }
.pm-features { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
@media (max-width: 480px) { .pm-features { grid-template-columns: 1fr; } }
.pm-feat { display: flex; align-items: flex-start; gap: 0.85rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 1rem 1.1rem; transition: border-color 0.25s, background 0.25s; }
.pm-feat:hover { background: rgba(0,184,148,0.07); border-color: rgba(0,184,148,0.2); }
.pm-feat-icon { font-size: 1.4rem; flex-shrink: 0; line-height: 1; }
.pm-feat-title { font-size: 0.88rem; font-weight: 700; color: white; }
.pm-feat-sub { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.15rem; }
.pm-stats { display: flex; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; }
.pm-stat { flex: 1; padding: 1.25rem 1rem; text-align: center; border-left: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); }
.pm-stat:last-child { border-left: none; }
.pm-stat-val { font-size: 1.6rem; font-weight: 900; background: linear-gradient(135deg, #00B894, #55E6C1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
.pm-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-top: 0.35rem; font-weight: 600; }
.pm-result-banner { display: flex; align-items: center; gap: 1.25rem; background: rgba(0,184,148,0.08); border: 1.5px solid rgba(0,184,148,0.2); border-radius: 16px; padding: 1.25rem 1.5rem; }
.pm-result-icon-wrap { font-size: 2rem; line-height: 1; flex-shrink: 0; }
.pm-result-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
.pm-result-val { font-size: 1.1rem; font-weight: 900; color: #00B894; margin-top: 0.2rem; }
.pm-purchase-card { background: rgba(255,255,255,0.04); border: 1.5px solid rgba(0,184,148,0.2); border-radius: 20px; padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem; }
.pm-price-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.pm-price-label { font-size: 0.72rem; color: rgba(255,255,255,0.35); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
.pm-price { font-size: 2rem; font-weight: 900; background: linear-gradient(135deg, #00B894, #55E6C1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin: 0.2rem 0; }
.pm-price-note { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
.pm-delivery-badge { display: inline-flex; align-items: center; gap: 0.45rem; background: rgba(0,184,148,0.1); border: 1px solid rgba(0,184,148,0.2); color: #00B894; font-size: 0.78rem; font-weight: 700; padding: 0.5rem 1rem; border-radius: 100px; white-space: nowrap; }
.pm-wa-btn { display: flex; align-items: center; justify-content: center; gap: 0.75rem; background: #25D366; color: white; padding: 1.1rem; border-radius: 16px; text-decoration: none; font-family: 'Tajawal', sans-serif; font-size: 1.05rem; font-weight: 800; box-shadow: 0 8px 30px rgba(37,211,102,0.35); transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s; position: relative; overflow: hidden; }
.pm-wa-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent); transform: translateX(-100%); transition: transform 0.45s; border-radius: inherit; }
.pm-wa-btn:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 16px 44px rgba(37,211,102,0.5); }
.pm-wa-btn:hover::before { transform: translateX(0); }
.pm-wa-note { text-align: center; font-size: 0.75rem; color: rgba(255,255,255,0.3); }

.modal-transition-enter-active, .modal-transition-leave-active { transition: opacity 0.38s; }
.modal-transition-enter-from, .modal-transition-leave-to { opacity: 0; }
</style>