<template>
  <div>
    <h1>{{ $route.params.product }}</h1>
  </div>
</template>
<script>
export default {
  name: 'ShopByStyleProductDetails',
  layout: 'IndexLayout',
  fetch() {},
  mounted() {
    // http://localhost:3000/shop-by-style?id=3&&product=123
  },
}
</script>
