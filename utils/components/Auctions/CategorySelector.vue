<template>
  <div class="px-3 col-12 new-auction-collection-step">
    <div class="step-header">
      <div class="step-header-title">{{ $t('create_listing.auction.collection.step1.title') }}</div>
      <div class="step-header-desc">{{ $t('create_listing.auction.collection.step1.desc') }}</div>
    </div>
    <div class="d-flex categories">
      <div v-for="category in categories" :key="category._id" class="category">
        <div class="category-title">{{ category.name }}</div>
        <div class="category-img" @click="selectCategory(category.name)">
          <img :src="require(`~/assets/img/auctions/auctions-${category.name}.png`)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'CategorySelector',
  data () {
    return {
      categories: []
    }
  },
  mounted() {
    // Get categories list
    this.$axios.get(`${process.env.DEV2_API_URL}/categories`)
      .then(res => {
        this.categories = res.data
      })
  },
  methods: {
    // Select product category
    selectCategory(category) {
      this.$emit('can-continue', { category });
    }
  }
}
</script>