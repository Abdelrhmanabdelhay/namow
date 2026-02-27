<template>
  <div class="services-page" dir="rtl">
    <AppHeader />
    <ServicesHero />
    <ServicesWebDesign />
    <ServicesContentManagement />
    <ServicesCTA />
    <SiteFooter />
  </div>
</template>

<script setup>
import AppHeader                from "@/components/home/Header.vue";
import SiteFooter               from "@/components/home/Footer.vue";
import ServicesHero             from "@/components/services/ServicesHero.vue";
import ServicesWebDesign        from "@/components/services/ServicesWebDesign.vue";
import ServicesContentManagement from "@/components/services/ServicesContentManagement.vue";
import ServicesCTA              from "@/components/services/ServicesCTA.vue";
</script>