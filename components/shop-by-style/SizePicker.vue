<template>
  <div class="position-relative w-100 mw-100 w-md-auto container px-4 px-sm-0">
    <div
      v-if="viewMode === 'carousel'"
      class="position-relative mx-auto carousel-wrapper"
      :style="wrapperStyle"
    >
      <div class="d-flex justify-content-between align-items-center size-picker-header">
        <span class="select-size">
          {{ $t('products.select_size') }}<span class="d-sm-none">:</span>
          <span class="ml-2 body-8-normal text-red">{{ errorText }}</span>
        </span>
        <slot name="all-sizes-btn">
          <div
            v-if="!singleMode"
            class="position-absolute view-all-btn"
            @click="handleViewAllClick"
          >
            <img
              width="18"
              height="18"
              :src="require('~/assets/img/icons/eye2.svg')"
              class="d-sm-none"
              :class="iconClass"
            />
            <span class="all-sizes" :class="iconTextClass" role="button">
              {{ $t('shop_by_style.general.all_sizes') }}
            </span>
          </div>
        </slot>
      </div>
      <Carousel
        ref="sizeCarousel"
        :loop="true"
        :nav="false"
        :center="true"
        :margin="37"
        :responsive="{
          0: {
            items: xsCount,
            nav: false,
            center: xsCenter,
            margin: 17,
            loop: true,
          },
          576: { items: 6, nav: false },
          1268: { items: 5, nav: false },
        }"
        :mouse-drag="mouseDrag"
        :show-arrows="arrowsVisible"
        :dots="false"
        :autoWidth="true"
        class="carousel slide-fade text-center position-relative size-carousel"
        :style="carouselContainerStyle"
      >
        <template #default>
          <div
            v-for="(size, index) in sizes"
            :key="`size-${size.type}-${size.id}`"
            :data-size="size.id"
            :data-position="index"
            :class="`item ${
              value === size.id ? 'active' : ''
            } user-select-none`"
          >
            <div
              class="d-flex align-items-center justify-content-center mx-auto card"
              :style="cardStyle"
            >
            {{ (size.size - Math.floor(size.size)) !== 0 ? size.size : parseInt(size.size).toFixed(1) }}
            </div>
            <div class="price">
              {{ getPriceBySize(size.id) | toCurrency }}
            </div>
          </div>
        </template>

        <template #prev>
          <div class="owl-nav owl-prev" :style="arrowStyle">
            <b-img :src="require('~/assets/img/icons/arrow-left-gray.svg')" />
          </div>
        </template>

        <template #next>
          <div class="owl-nav owl-next" :style="arrowStyle">
            <b-img :src="require('~/assets/img/icons/arrow-right-gray.svg')" />
          </div>
        </template>
      </Carousel>
    </div>

    <div
      v-if="viewMode === 'all'"
      class="mx-auto position-relative all-sizes"
      :class="allSizesClass"
    >
      <div class="items-wrapper">
        <div
          v-for="size in sizes"
          :key="`size-${size.type}-${size.id}`"
          :class="`d-inline-block item ${value === size.id ? 'active' : ''}`"
        >
          <div
            class="d-flex align-items-center justify-content-center mx-auto card"
            @click="handleSizeSelect(size.id)"
          >
          {{ (size.size - Math.floor(size.size)) !== 0 ? size.size : parseInt(size.size).toFixed(1) }}
          </div>
          <div class="text-center price">
            {{ getPriceBySize(size.id) | toCurrency }}
          </div>
        </div>
      </div>

      <b-button
        v-if="!singleMode"
        variant="link"
        class="position-absolute p-0 close-btn"
        @click="handleCloseClick"
      >
        <img
          :src="require('~/assets/img/icons/close.svg')"
          :alt="$t('common.close')"
        />
      </b-button>
    </div>
  </div>
</template>

<script>
import { API_PROD_URL } from '~/static/constants/environments'

export default {
  name: 'ProductSizePicker',

  props: {
    sizes: {
      type: Array,
      required: true,
    },
    value: {
      type: [Number, String],
      default: null,
    },
    viewMode: {
      type: String,
      default: 'carousel', // 2 modes: 'all', 'carousel'
    },
    prices: {
      type: Array,
      default: () => [],
    },
    singleMode: {
      type: Boolean,
      default: false,
    },
    selectSizeLabelClass: {
      type: String,
      default: '',
    },
    iconTextClass: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: '',
    },
    cardStyle: {
      type: Object,
      default: () => {},
    },
    cardWrapperStyle: {
      type: Object,
      default: () => {},
    },
    arrowStyle: {
      type: Object,
      default: () => {},
    },
    carouselContainerStyle: {
      type: Object,
      default: () => {},
    },
    wrapperStyle: {
      type: Object,
      default: () => {},
    },
    arrowsVisible: {
      type: Boolean,
      default: false,
    },
    mouseDrag: {
      type: Boolean,
      default: true,
    },
    xsCenter: {
      type: Boolean,
      default: false,
    },
    xsCount: {
      type: Number,
      default: 2,
    },
    errorText: {
      type: String,
      default: null,
    },
    allSizesClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      API_PROD_URL,
    }
  },
  watch: {
    prices() {
      this.$nextTick(() => {
        this.$refs.sizeCarousel?.refresh()
      })
    },
    sizes() {
      this.$nextTick(() => {
        this.$refs.sizeCarousel?.destroy()
      })
      this.$nextTick(() => {
        this.$refs.sizeCarousel?.create()
      })
    },
  },

  mounted() {
    // Bind event handlers when user click size in carousel
    $(document).on('click', '.size-carousel .item', this.handleSizeClick)
    if (this.value) {
      const size = this.sizes.find((i) => i.id === this.value)
      this.$nextTick(() =>
        this.$refs.sizeCarousel?.goTo(this.sizes.indexOf(size))
      )
    }
  },

  beforeDestroy() {
    $(document).off('click', '.size-carousel .item', this.handleSizeClick)
  },

  methods: {
    // Emit update event to parent component when user select size
    updateSize(sizeId) {
      this.$emit('update', sizeId)
      this.$emit('input', sizeId)
      this.$nextTick(() => {
        const position = $(
          '.size-carousel .item[data-size="' + sizeId + '"]'
        ).data('position')

        // Update carousel position to center selected size box and refresh carousel
        this.$refs.sizeCarousel?.goTo(position)
        this.$refs.sizeCarousel?.refresh()
      })
    },

    // Event handler when user select size in carousel
    handleSizeClick(event) {
      const sizeId = String($(event.target).closest('.item').data('size'))
      if (sizeId) {
        this.updateSize(parseInt(sizeId))
      }
    },

    // Emit view mode change event and switches to `view all` mode
    handleViewAllClick() {
      this.$emit('changeViewMode', 'all')
    },

    // Event handler to close `view all` mode
    handleCloseClick() {
      this.$emit('changeViewMode', 'carousel')
    },

    // Event handler when user select size in `view all` mode
    handleSizeSelect(sizeId) {
      this.handleCloseClick()
      this.updateSize(sizeId)
    },

    // Get min price for a given size among listing items
    getPriceBySize(sizeId) {
      return this.prices.find((i) => String(i.size_id) === String(sizeId))
        ?.price
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.select-size
  @include body-10-normal
  color: $color-black-1
  @media (min-width: 576px)
    @include body-8-normal
    text-transform: uppercase

.all-sizes
  @include body-10-normal
  color: $color-black-1
  @media (min-width: 576px)
    @include body-8-medium
    color: $color-blue-30

.icon-text
  font-size: 14px
  font-weight: $medium
  color: $color-black-1

.text-color-blue-30
  color: $color-blue-30
.size-label-responsive
  @include body-10
  display: block
  color: $color-black-1
  left: 0
  top: 0
  @media (min-width: 576px)
    @include body-8-normal
    text-transform: uppercase
.icon-text-responsive
  font-size: 13px
  font-weight: $regular
  color: $color-black-1
  @media (min-width: 576px)
    color: $color-blue-30
    font-weight: $medium
.owl-carousel
  .owl-item
    width: 70px
    marging-right: 38px !important
.container
  .carousel-wrapper
    max-width: 100%
  .size-carousel::v-deep
    max-width: 100%
    padding: 0
    margin-top: 8px
    >span .owl-nav
      display: block
    .owl-carousel
      .item
        cursor: pointer
        margin: 0
        magin-right: 25px
        .card
          border-radius: 4px
        &.active
          .card
            border: 1px solid $color-black-4
            width: 52px
            height: 52px
          .price
            display: none
          &::after
            content: " "
            border-bottom: 2px solid $color-blue-19
            margin-top: 15px
            display: block
            margin-left: auto
            margin-right: auto
            width: 36px
            @media (min-width: 576px)
              width: 63px
    .owl-nav
      margin-bottom: 0px
      cursor: pointer
      [class*='owl-']
        background: none
      &.owl-next
        float: right
        width: auto
        margin-top: -71px
        @media (min-width: 576px)
          margin-right: -30px
          margin-top: -80px
      &.owl-prev
        float: left
        width: auto
        margin-top: 13px
        @media (min-width: 576px)
          margin-top: 18px
          margin-left: -30px
    .card
      @include body-9-medium
      border: 1px solid $color-gray-21
      border-radius: 10px
      width: 49px
      height: 49px
      color: $color-black-4
      background-color: $color-white-1
      box-shadow: none
      @media (min-width: 576px)
        @include body-2-medium
        width: 64px
        height: 64px
    .price
      @include body-13-normal
      margin-top: 8px
      color: $color-gray-20
  .view-all-btn
    right: 0
    top: 0
  .all-sizes
    max-width: 100%
    .items-wrapper
      max-height: 450px
      overflow-y: scroll
    .item
      width: 20%
      margin-bottom: 17px
      cursor: pointer
      &.active
        vertical-align: top
        .card
          border-color: $color-black-4
        .price
          display: none
        &::after
          content: " "
          width: 53px
          border-bottom: 2px solid $color-blue-5
          margin-top: 11px
          display: block
          margin-left: auto
          margin-right: auto
      .card
        @include body-9-medium
        width: 49px
        height: 49px
        border: 1px solid $color-gray-21
        color: $color-black-4
        box-shadow: none
        background-color: $color-white-1
        border-radius: 10px
        @media (min-width: 576px)
          @include body-2-medium
          width: 64px
          height: 64px
      .price
        @include body-13-normal
        margin-top: 12px
        color: $color-gray-20
    .close-btn
      right: 8px
      top: -38px
@media (max-width: 768px)
  .container
    .all-sizes
      .item
        width: 25%
.edit-item
  .view-all-btn
    top: -2px
</style>
