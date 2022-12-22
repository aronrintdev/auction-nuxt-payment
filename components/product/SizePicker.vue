<template>
  <div class="position-relative w-100 mw-100 w-md-auto container px-4 px-sm-0">
    <div
      v-if="viewMode === 'carousel'"
      class="position-relative mx-auto carousel-wrapper"
      :style="wrapperStyle"
    >
      <b-row>
        <b-col
          md="12"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="select-size">
            {{ $t('products.select_size') }}*<span class="d-sm-none">:</span>
            <span class="ml-2 body-8-normal text-red">{{ errorText }}</span>
          </div>

          <slot name="all-sizes-btn">
            <div
              v-if="!singleMode"
              class="view-all-btn"
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
                {{ $t('products.all_sizes') }}
              </span>
            </div>
          </slot>
        </b-col>
      </b-row>

      <client-only>
        <Carousel
          ref="sizeCarousel"
          :loop="true"
          :nav="true"
          :center="true"
          :margin="38"
          :responsive="{
            0: { items: xsCount, nav: false, center: xsCenter },
            576: { items: 6, nav: false },
            1268: { items: 3, nav: false },
          }"
          :mouse-drag="mouseDrag"
          :show-arrows="arrowsVisible"
          :nav-text="['', '']"
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
                class="d-flex align-items-center justify-content-center mx-auto card mb-2"
                :style="cardStyle"
              >
                {{ size.size }}
              </div>
              <div class="price">
                {{ getPriceBySize(size.id) | toRoundedCurrency }}
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
              <b-img
                :src="require('~/assets/img/icons/arrow-right-gray.svg')"
              />
            </div>
          </template>
        </Carousel>
      </client-only>
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
            class="d-flex align-items-center justify-content-center mx-auto card mb-2"
            @click="handleSizeSelect(size.id)"
          >
            {{ size.size }}
          </div>
          <div class="text-center price">
            {{ getPriceBySize(size.id) | toRoundedCurrency }}
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
      default: true,
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
  @include body-10-regular
  color: $color-black-1
  @media (min-width: 576px)
    font-family: $font-montserrat-serif
    font-weight: $regular
    font-style: $normal
    font-size: 13px
    @include body-8-normal
    text-transform: uppercase

.all-sizes
  @include body-10-regular
  color: $color-black-1
  @media (min-width: 576px)
    margin-top: 32px
    @include body-8-medium
    color: $color-blue-30

.icon-text
  font-size: 14px !important
  font-weight: $medium !important
  color: $color-black-1 !important,

.text-color-blue-30
  color: $color-blue-30

.size-label-responsive
  @include body-10
  display: block !important
  color: $color-black-1
  left: 0
  top: 0
  @media (min-width: 576px)
    @include body-8-normal
    text-transform: uppercase

.icon-text-responsive
  font-size: 13px !important
  font-weight: $regular !important
  color: $color-black-1 !important
  @media (min-width: 576px)
    color: $color-blue-30 !important
    font-weight: $medium !important

.owl-carousel
  .owl-item
    width: 70px !important

.container
  .carousel-wrapper
    max-width: 100%
    @media (min-width: 576px)
      padding-top: 24px

  .size-carousel::v-deep
    max-width: 100%
    padding: 0
    margin-top: 8px

    >span .owl-nav
      display: block !important

    .owl-carousel

      .item
        cursor: pointer
        margin: 0 !important
        &.active
          .card
            border: 1px solid $color-black-4
            border-radius: 4px

          .price
            display: none

          &::after
            content: " "
            border-bottom: 2px solid $color-blue-5
            margin-top: 11px
            display: block
            margin-left: auto
            margin-right: auto
            width: 49px
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
        margin-right: -30px !important
        margin-top: -71px !important
        @media (min-width: 576px)
          margin-right: -30px !important
          margin-top: -73px !important

      &.owl-prev
        float: left
        width: auto
        margin-top: 13px !important
        margin-left: -30px !important
        @media (min-width: 576px)
          margin-top: 18px !important
          margin-left: -30px !important

    .card
      @include body-9-medium
      border: 1px solid $color-gray-26
      border-radius: 4px
      width: 49px
      height: 49px
      color: $color-black-4
      background-color: transparent
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
        border: 1px solid $color-gray-26
        color: $color-black-4
        box-shadow: none
        background-color: transparent
        border-radius: 4px
        @media (min-width: 576px)
          @include body-2-medium
          width: 64px
          height: 64px

      .price
        @include body-13-normal
        margin-top: 12px
        color: $color-gray-20

    .close-btn
      right: 0
      top: 0

@media (max-width: 768px)
  .container
    .all-sizes
      .item
        width: 25%

.edit-item
  .view-all-btn
    top: -2px
</style>
