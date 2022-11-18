<template>
  <section class="shop_by_style">
    <SectionHeader class="px-2"
                   :title="$t('shop_by_style.title')"
                   :label="$t('banner.view_more_trending')"
                   to="/shop-by-style"
                   full-width
    />
    <div class="px-2 mt-4 mb-5">
      <a @click="$router.push('/shop-by-style')"><img :src="require('~/assets/img/mobile-search/created_for_you.png')" class="w-100" /></a>
    </div>
  </section>
</template>
