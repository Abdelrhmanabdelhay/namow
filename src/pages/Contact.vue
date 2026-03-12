<template>
  <div class="contact-page" dir="rtl">
    <AppHeader />
    <ContactHero />

    <!-- Main section: form + info side by side -->
    <section class="cp-main">
      <div class="cp-bg-accent"></div>
      <div class="cp-container">
        <!-- Form column -->
        <div class="cp-form-col">
          <ContactForm />
        </div>
        <!-- Info column -->
        <div class="cp-info-col">
          <ContactInfo />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AppHeader          from "@/components/home/Header.vue";

import ContactHero from "@/components/contact/ContactHero.vue";
import ContactForm from "@/components/contact/ContactForm.vue";
import ContactInfo from "@/components/contact/ContactInfo.vue";
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.contact-page {
  font-family: 'Tajawal', sans-serif;
}

.cp-main {
  position: relative;
  background: #F5F6FA;
  padding: 5rem 0 8rem;
  overflow: hidden;
}

.cp-bg-accent {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 60% at 75% 30%, rgba(0,184,148,0.06), transparent 65%);
  pointer-events: none;
}

.cp-container {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto; padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 4rem;
  align-items: start;
}

@media (max-width: 960px) {
  .cp-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  /* On mobile, show info before form */
  .cp-info-col  { order: -1; }
}
</style>