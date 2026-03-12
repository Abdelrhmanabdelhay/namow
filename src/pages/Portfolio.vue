<template>
  <div class="portfolio-page">
    <Header />
    <PortfolioHero />
    <PortfolioGrid />
    <PortfolioTestimonials />
    <PortfolioCTA />
  </div>
</template>

<script setup>
import Header               from "@/components/home/Header.vue";
import PortfolioHero         from "@/components/portfolio/PortfolioHero.vue";
import PortfolioGrid         from "@/components/portfolio/PortfolioGrid.vue";
import PortfolioTestimonials from "@/components/portfolio/PortfolioTestimonials.vue";
import PortfolioCTA          from "@/components/portfolio/PortfolioCTA.vue";
</script>

<style scoped>
.portfolio-page {
  font-family: 'Tajawal', sans-serif;
  /* All sections are dark — no background needed on wrapper */
}
</style>