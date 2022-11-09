<template>
  <carousel
    ref="carousel"
    class="carousel collection-item-carousel slide-fade"
    :responsive="{
      0: { items: 3, autoWidth: true, nav: false, center: false, margin: 15 },
    }"
    :mouse-drag="true"
    :dots="false"
    :loop="false"
  >
    <template #default>
      <div v-for="(item, idx) in data" :key="idx" class="slide" :class="{ active: activeIndex === idx }" @click="selectItem(idx)">
        <Thumb :product="item.inventory.product" overlay />
        <div v-if="activeIndex === idx" class="bar"></div>
      </div>
    </template>
  </carousel>
</template>
<script>
import Thumb from '../product/Thumb.vue'

export default {
  name: 'CollectionItemsSlider',
  components: {
    Thumb
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: [],
      activeIndex: 0,
    };
  },
  watch: {
    data(newV) {
      this.$refs.carousel?.destroy();
      this.$nextTick(() => this.$refs.carousel?.create());
      this.data = newV;
    }
  },
  mounted() {
    this.data = this.items;
  },
  methods: {
    selectItem(idx) {
      this.activeIndex = idx
      this.$emit('change', idx)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~/assets/css/_variables'
  .collection-item-carousel::v-deep
    max-width: 100%
    width: auto
    .owl-carousel
      .owl-item
        width: 90px
        height: 110px
        .slide
          width: 90px
          height: 90px
          .thumb-wrapper
            border-radius: 4px
            background: transparent
            img
              padding: 8px
            &:hover
              cursor: pointer
              .overlay
                background: rgba(0, 0, 0, 0.1)
            .overlay
              background: rgba(0, 0, 0, 0.05)
              transition: background 0.5s ease
        .bar
          margin-top: 10px
          margin-left: 15px
          width: 60px
          height: 2px
          background-color: $color-blue-19
      @media (max-width: 576px)
        .owl-item
          .bar
            margin-top: 8px
</style>
