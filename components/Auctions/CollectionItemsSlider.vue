<template>
  <carousel
    ref="carousel"
    class="carousel collection-item-carousel slide-fade"
    :responsive="{
      0: { items: 3, nav: false, center: false, margin: 15 },
    }"
    :mouse-drag="true"
    :dots="false"
    :loop="true"
    @changed="onSlide"
  >
    <template #default>
      <div v-for="(item, idx) in data" :key="idx" class="slide">
        <Thumb :product="item.inventory.product" />
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
    items(newV) {
      this.$refs.carousel?.destroy();
      this.$nextTick(() => this.$refs.carousel?.create());
      this.data = newV;
    }
  },
  mounted() {
    this.data = this.items;
  },
  methods: {
    onSlide(event) {
      if (event.item.index !== 0) {
        let index = event.item.index - event.page.size
        const count = event.item.count
        if (index >= count) {
          index -= count;
        }
        if (index < 0) {
          index += count;
        }
        this.activeIndex = index
      } else {
        this.activeIndex = 0
      }
      this.$emit('change', this.activeIndex)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~/assets/css/_variables'
  .collection-item-carousel::v-deep
    .owl-carousel
      .owl-item
        width: 100px
        height: 110px
        border-radius: 4px
        &:not(.active) + .active
          &::after
            content: ''
            display: block
            margin-top: 4px
            margin-left: 20px
            width: 60px
            height: 2px
            background-color: $color-blue-19
</style>
