<template>
  <header
    :class="[
      'fixed w-full z-50 transition-all duration-700 ease-out',
      scrolled ? 'scrolled' : ''
    ]"
    class="site-header"
    dir="rtl"
  >
    <div class="header-bg" :class="{ active: scrolled }"></div>
    <div class="accent-line" :class="{ shrink: scrolled }"></div>

    <div class="header-inner">

      <!-- Logo → / -->
      <RouterLink to="/" class="logo-wrap">
        <span class="logo-mark">N</span>
        <h1 class="logo-text">نمو</h1>
        <span class="logo-dot"></span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="main-nav">
        <RouterLink
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          class="nav-link"
          active-class="nav-link--active"
          exact-active-class="nav-link--exact-active"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <span class="nav-label">{{ item.label }}</span>
          <span class="nav-underline"></span>
        </RouterLink>
      </nav>

      <!-- Actions -->
      <div class="actions">
        <button @click="toggleDark" class="theme-btn" :aria-label="dark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'">
          <span class="theme-icon" :class="{ spin: animating }">
            <svg v-if="dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </span>
        </button>

        <!-- CTA → /contact -->
        <RouterLink to="/contact" class="cta-btn">
          <span class="cta-text">ابدأ الآن</span>
          <span class="cta-arrow">←</span>
          <span class="cta-fill"></span>
        </RouterLink>
      </div>

      <!-- Hamburger -->
      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <RouterLink
        v-for="(item, i) in navItems"
        :key="i"
        :to="item.to"
        class="mobile-link"
        active-class="mobile-link--active"
        :style="{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }"
        @click="menuOpen = false"
      >
        <span>{{ item.label }}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const dark     = ref(false);
const scrolled = ref(false);
const menuOpen = ref(false);
const animating = ref(false);

// ── Matches your router exactly ──────────────────────
const navItems = [
  { label: "الرئيسية",  to: "/" },
  { label: "عن نمو",    to: "/about" },
  { label: "خدماتنا",  to: "/services" },
  { label: "أعمالنا",  to: "/portfolio" },
  { label: "اتصل بنا", to: "/contact" },
];
// ─────────────────────────────────────────────────────

onMounted(() => {
  dark.value = localStorage.theme === "dark";
  if (dark.value) document.documentElement.classList.add("dark");
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function toggleDark() {
  animating.value = true;
  setTimeout(() => (animating.value = false), 500);
  dark.value = !dark.value;
  document.documentElement.classList.toggle("dark");
  localStorage.theme = dark.value ? "dark" : "light";
}
function handleScroll() {
  scrolled.value = window.scrollY > 30;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');

.site-header {
  font-family: 'Tajawal', sans-serif;
  position: fixed;
  width: 100%;
  z-index: 50;
}

/* Background */
.header-bg {
  position: absolute; inset: 0;
  background: rgba(255,255,255,0);
  backdrop-filter: blur(0px);
  border-bottom: 1px solid transparent;
  transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
}
.header-bg.active {
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(24px) saturate(180%);
  border-bottom-color: rgba(0,0,0,0.06);
  box-shadow: 0 1px 40px rgba(0,0,0,0.07);
}
:global(.dark) .header-bg.active {
  background: rgba(10,10,15,0.85);
  border-bottom-color: rgba(255,255,255,0.06);
  box-shadow: 0 1px 40px rgba(0,0,0,0.4);
}

/* Accent line */
.accent-line {
  position: absolute; top: 0; right: 0;
  height: 3px; width: 100%;
  background: linear-gradient(90deg, transparent 0%, #22c55e 40%, #16a34a 60%, transparent 100%);
  transition: width 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s;
}
.accent-line.shrink { width: 60%; right: 20%; opacity: 0.7; }

/* Inner layout */
.header-inner {
  position: relative;
  max-width: 1280px; margin: 0 auto; padding: 0 2rem;
  height: 72px;
  display: flex; align-items: center; justify-content: space-between; gap: 2rem;
}

/* Logo */
.logo-wrap {
  display: flex; align-items: center; gap: 0.4rem;
  text-decoration: none; user-select: none;
}
.logo-mark {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 800; font-size: 1.1rem; letter-spacing: -0.5px;
  box-shadow: 0 4px 14px rgba(34,197,94,0.4);
  transition: transform 0.3s, box-shadow 0.3s;
}
.logo-wrap:hover .logo-mark {
  transform: rotate(-5deg) scale(1.08);
  box-shadow: 0 6px 20px rgba(34,197,94,0.5);
}
.logo-text {
  font-size: 1.5rem; font-weight: 800; color: #111; letter-spacing: -0.5px;
  transition: color 0.3s;
}
:global(.dark) .logo-text { color: #f8fafc; }
.logo-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #22c55e; margin-bottom: 16px;
  animation: pulse-dot 2.5s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.6); opacity: 0.6; }
}

/* Desktop nav */
.main-nav { display: none; gap: 0.25rem; }
@media (min-width: 768px) { .main-nav { display: flex; } }

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 0.95rem; font-weight: 500;
  color: #374151; text-decoration: none; border-radius: 8px;
  transition: color 0.25s, background 0.25s; overflow: hidden;
  animation: fadeSlideDown 0.5s both;
}
@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
:global(.dark) .nav-link { color: #d1d5db; }

/* hover + active-class applied by RouterLink */
.nav-link:hover,
.nav-link--active {
  color: #16a34a;
  background: rgba(34,197,94,0.07);
}
:global(.dark) .nav-link:hover,
:global(.dark) .nav-link--active {
  color: #4ade80;
  background: rgba(74,222,128,0.08);
}

/* Underline visible when active */
.nav-link--active .nav-underline,
.nav-link--exact-active .nav-underline {
  transform: scaleX(1) !important;
}

.nav-underline {
  position: absolute; bottom: 6px; right: 1rem; left: 1rem;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 2px;
  transform: scaleX(0); transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.nav-link:hover .nav-underline { transform: scaleX(1); }

/* Actions */
.actions { display: flex; align-items: center; gap: 0.75rem; }

.theme-btn {
  width: 40px; height: 40px; border-radius: 10px;
  border: 1.5px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.5); color: #374151;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.3s;
}
:global(.dark) .theme-btn {
  border-color: rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05); color: #d1d5db;
}
.theme-btn:hover {
  background: rgba(34,197,94,0.1); border-color: #22c55e;
  color: #16a34a; transform: scale(1.05);
}
.theme-icon svg { width: 18px; height: 18px; }
.theme-icon.spin svg {
  animation: spinOnce 0.5s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes spinOnce {
  from { transform: rotate(-90deg) scale(0.5); opacity: 0; }
  to   { transform: rotate(0deg) scale(1); opacity: 1; }
}

.cta-btn {
  display: none;
  align-items: center; gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  background: #111; color: white;
  border-radius: 12px; font-size: 0.9rem; font-weight: 600;
  text-decoration: none; position: relative; overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}
:global(.dark) .cta-btn { background: #f0fdf4; color: #14532d; }
@media (min-width: 768px) { .cta-btn { display: flex; } }

.cta-fill {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  transform: translateX(110%);
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  z-index: 0; border-radius: inherit;
}
.cta-btn:hover .cta-fill { transform: translateX(0); }
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(34,197,94,0.35); }
.cta-text, .cta-arrow { position: relative; z-index: 1; transition: transform 0.3s; }
.cta-btn:hover .cta-arrow { transform: translateX(-4px); }

/* Hamburger */
.hamburger {
  display: flex; flex-direction: column; gap: 5px;
  width: 36px; height: 36px;
  justify-content: center; align-items: center;
  background: none; border: none; cursor: pointer; padding: 4px;
}
@media (min-width: 768px) { .hamburger { display: none; } }

.hamburger span {
  display: block; height: 2px; background: #374151;
  border-radius: 2px; transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
  transform-origin: center;
}
:global(.dark) .hamburger span { background: #d1d5db; }
.hamburger span:nth-child(1) { width: 24px; }
.hamburger span:nth-child(2) { width: 18px; }
.hamburger span:nth-child(3) { width: 24px; }
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; background: #16a34a; }
.hamburger.open span:nth-child(2) { transform: scaleX(0); opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; background: #16a34a; }

/* Mobile menu */
.mobile-menu {
  position: absolute; top: 100%; right: 0; left: 0;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  padding: 0.5rem 1.5rem 1.5rem;
  display: flex; flex-direction: column; gap: 0.25rem;
  transform: translateY(-10px); opacity: 0; pointer-events: none;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
:global(.dark) .mobile-menu {
  background: rgba(10,10,15,0.95);
  border-bottom-color: rgba(255,255,255,0.06);
}
.mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: all; }

.mobile-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.9rem 1rem; border-radius: 10px;
  color: #374151; text-decoration: none;
  font-size: 1rem; font-weight: 500;
  opacity: 0; transform: translateX(16px);
  transition: opacity 0.3s, transform 0.3s, background 0.2s, color 0.2s;
}
:global(.dark) .mobile-link { color: #d1d5db; }
.mobile-menu.open .mobile-link { opacity: 1; transform: translateX(0); }
.mobile-link:hover,
.mobile-link--active { background: rgba(34,197,94,0.08); color: #16a34a; }
:global(.dark) .mobile-link--active { color: #4ade80; }
</style>