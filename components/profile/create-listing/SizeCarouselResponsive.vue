<template>
  <div class="position-relative w-auto container">
    <div
      v-if="viewMode == 'carousel'"
      class="position-relative mx-auto carousel-wrapper w-100"
    >
      <b-row class="carousel-wrapper-title">
        <b-col md="12 px-0">
          <span class="text-uppercase select-size-text" :class="isScreenXS ? 'body-10-regular font-monserrat' : 'body-8-normal'">
            {{ $t('products.select_size') }}*
          </span>

          <Button
            v-if="!singleMode"
            variant="link"
            class="position-absolute view-all-btn ml-auto body-8-medium"
            size="sm"
            icon="eye2.svg"
            @click="handleViewAllClick"
          >
            <template #default>
              <span class="text-color-blue-30">{{ $t('products.all_sizes') }}</span>
            </template>
          </Button>
        </b-col>
      </b-row>

      <client-only>
        <Carousel
          ref="sizeCarousel"
          :loop="true"
          :nav="true"
          :margin="5"
          :responsive="{
            0: { items: 5, nav: false, center: true },
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
                class="d-flex align-items-center justify-content-center card mx-auto p-0"
              >
                {{ size.size }}
              </div>
              <div class="price">
                {{ getPriceBySize(size.id) | toCurrency }}
              </div>
            </div>
          </template>

          <template #prev>
            <div class="owl-nav owl-prev">
              <img
                :src="require('~/assets/img/icons/product/arrow-left.svg')"
              />
            </div>
          </template>

          <template #next>
            <div class="owl-nav owl-next">
              <img
                :src="require('~/assets/img/icons/product/arrow-right.svg')"
              />
            </div>
          </template>
        </Carousel>
      </client-only>
    </div>

    <div v-if="viewMode == 'all'" class="mx-auto position-relative all-sizes">
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
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'SizeCarouselResponsive',

  components: { Button },

  mixins: [screenSize],

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

.container
  .carousel-wrapper
    width: 270px
    max-width: 100%
    padding-top: 24px

  .size-carousel::v-deep
    max-width: 100%
    margin-top: 8px

    @media (min-width: 300px)  and (max-width: 500px)
      width: 350px

    >span .owl-nav
      display: block !important

    .owl-carousel
      .item
        cursor: pointer

        &.active
          .card
            border-color: $color-black-4
            width: 52px
            height: 52px


          .price
            display: none

          &::after
            content: " "
            border-bottom: 3px solid $color-blue-5
            margin-top: -3px
            display: block
            margin-left: auto
            margin-right: auto
            width: 36px
            height: 0px
            border: 2px solid #7196B1

    .owl-nav
      margin-bottom: 0px
      cursor: pointer

      [class*='owl-']
        background: none

      &.owl-next
        float: right
        width: auto
        margin-right: -30px !important
        margin-top: -75px !important

      &.owl-prev
        margin-left: -25px !important
        margin-top: 6px !important
        float: left
        width: auto

    .card
      width: 49px
      height: 49px
      border: 1px solid $color-gray-3
      border-radius: 4px

    .price
      font-family: $font-family-montserrat
      font-style: normal
      @include body-18-bold
      text-align: center
      letter-spacing: 0.005em
      text-transform: uppercase
      color: $color-gray-20
      margin-top: -5px

  .view-all-btn
    right: 0
    top: 0

  .all-sizes
    padding-top: 24px
    width: 486px
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
          border-bottom: 3px solid $color-blue-5
          margin-top: 11px
          display: block
          margin-left: auto
          margin-right: auto

      .card
        font-family: $font-family-montserrat
        font-style: normal
        @include body-17-medium
        display: flex
        align-items: center
        text-align: right
        color: $color-black-1
        width: 52px
        height: 52px
        border: 3px solid $color-gray-21
        box-shadow: none
        background-color: $color-white-1
        border-radius: 10px

      .price
        font-family: $font-montserrat
        font-style: normal
        @include body-18-bold
        text-align: center
        letter-spacing: 0.005em
        text-transform: uppercase
        color: $color-gray-20
        margin-top: 2px

    .close-btn
      right: 0
      top: 0

.font-monserrat
  font-family: $font-montserrat
.select-size-text
  font-family: $font-family-montserrat
  font-style: $normal
  font-weight: $regular
  @include body-10
</style>
