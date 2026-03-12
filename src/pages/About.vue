<template>
  <div class="about-page" dir="rtl">
    <AppHeader />
    <AboutHero />
    <AboutStory />
    <AboutVisionMission />
    <AboutValues />
    <AboutCTA />
    <SiteFooter />
  </div>
</template>

<script setup>
import AppHeader          from "@/components/home/Header.vue";
import SiteFooter         from "@/components/home/Footer.vue";
import AboutHero          from "@/components/about/Abouthero.vue";
import AboutStory         from "@/components/about/AboutStory.vue";
import AboutVisionMission from "@/components/about/AboutVisionMission.vue";
import AboutValues        from "@/components/about/AboutValues.vue";
import AboutCTA           from "@/components/about/AboutCTA.vue";
</script>