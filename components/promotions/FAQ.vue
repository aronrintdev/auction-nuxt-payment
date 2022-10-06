<template>
  <div class="mx-auto d-flex align-items-center justify-content-between my-5 p-4 faq">
    <span class="body-7-medium text-info">{{ $t('promotions.faq_title') }}</span>
    <nuxt-link to="/faqs/promotions">
      <img src="~/assets/img/home/view-more.png"/>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'PromotionsFAQ',
};
</script>
