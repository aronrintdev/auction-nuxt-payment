<template>
  <section class="shop_by_brand">
    <SectionHeader class="px-2"
                   :title="$t('mobile_search.shop_by_brand')"
                   to="/shop"
                   full-width
    />
    <div class="px-2 mt-4 mb-5">
      <a @click="$router.push('/shop')">
        <img :src="require('~/assets/img/mobile-search/shop_by_brand.png')" class="w-100" />
      </a>
    </div>
  </section>
</template>
