<template>
  <div class="position-relative w-100 w-md-auto container px-0">
    <div
      v-if="viewMode === 'carousel'"
      class="position-relative mx-auto carousel-wrapper"
    >
      <b-row>
        <b-col md="12" class="d-flex justify-content-between align-items-center px-0">
          <span class="select-size text-uppercase">{{ $t('products.select_size') }}</span>

          <Button
            v-if="!singleMode"
            variant="link"
            class="view-all-btn body-8-medium"
            size="sm"
            @click="handleViewAllClick"
          >
            <template #default>
              <span class="all-sizes">{{ $t('products.all_sizes') }}</span>
            </template>
          </Button>
        </b-col>
      </b-row>

      <client-only>
        <Carousel
          ref="sizeCarousel"
          :loop="true"
          :nav="true"
          :center="true"
          :margin="10"
          :responsive="{
            0: { items: xsCount, nav: false, center: xsCenter },
            600: { items: 3, nav: false },
            1268: { items: 5, nav: false },
          }"
          :mouse-drag="false"
          :nav-text="['', '']"
          :dots="false"
          class="carousel slide-fade text-center position-relative size-carousel"
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
              >
                {{ size.size }}
              </div>
              <div class="price">
                {{ getPriceBySize(size.id) | toCurrency }}
              </div>
            </div>
          </template>

          <template #prev>
            <div v-if="arrowsVisible" class="owl-nav owl-prev">
              <img
                :src="require('~/assets/img/icons/arrow-left-gray.svg')"
              />
            </div>
          </template>

          <template #next>
            <div v-if="arrowsVisible" class="owl-nav owl-next">
              <img
                :src="require('~/assets/img/icons/arrow-right-gray.svg')"
              />
            </div>
          </template>
        </Carousel>
      </client-only>
    </div>

    <div v-if="viewMode === 'all'" class="mx-auto position-relative all-sizes">
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
            {{ size.size }}
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
import { Button } from '~/components/common'
import {API_PROD_URL} from '~/static/constants/environments'

export default {
  name: 'ProductSizePicker',

  components: { Button },

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
    arrowsVisible: {
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
  font-weight: 500
  font-size: 15px
  color: #000

.all-sizes
  color: $color-blue-30
  font-size: 15px

.container
  .carousel-wrapper
    max-width: 100%
    padding-top: 24px

  .size-carousel::v-deep
    max-width: 100%
    padding: 0 20px
    margin-top: 8px

    @media only screen and (max-width: 1290px)
      width: 400px

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
            width: 63px
            border-bottom: 2px solid $color-blue-5
            margin-top: 11px
            display: block
            margin-left: auto
            margin-right: auto

    .owl-nav
      margin-bottom: 0px
      cursor: pointer

      [class*='owl-']
        background: none

      &.owl-next
        float: right
        width: auto
        margin-right: -30px !important
        margin-top: -80px !important

      &.owl-prev
        margin-left: -30px !important
        margin-top: 18px !important
        float: left
        width: auto

    .card
      @include body-2-medium
      border: 1px solid $color-gray-21
      border-radius: 10px
      width: 64px
      height: 64px
      color: $color-black-4
      background-color: $color-white-1
      box-shadow: none

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
        @include body-2-medium
        width: 70px
        height: 70px
        border: 1px solid $color-gray-21
        color: $color-black-4
        box-shadow: none
        background-color: $color-white-1
        border-radius: 10px

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
@media (max-width: 450px)
  .container
    .all-sizes
      .item
        width: 50%
</style>
