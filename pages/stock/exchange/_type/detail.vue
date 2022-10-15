<template>
  <div class="px-3 mt-5">
     <ProductDetail/>
  </div>
</template>
<script>

import ProductDetail from '~/components/Exchange/ProductDetail.vue'
export default {
  components: { ProductDetail },
  layout(context) {
    return context.$auth.user ? 'Profile' : 'IndexLayout'
  },
}
</script>
