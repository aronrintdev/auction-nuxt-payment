<template>
  <div class="sneaker-size-page">
    <div class="d-flex align-items-center justify-content-between">
      <span class="select-size">{{ $t('rewards.product_page.select_size') }}</span>
      <span class="points">{{ $t('rewards.point_pts', {points: selectedReward.redemption_points}) }}</span>
    </div>
    <div class="image d-flex align-items-center justify-content-center px-4">
      <ProductThumb v-if="!has360Images" :product="selectedSneaker" :src="selectedSneaker.image" class="product-thumb"/>
      <ProductImageViewerMagic360 v-if="has360Images" :product="selectedSneaker"/>
    </div>
    <div class="description">
      <div class="body-3-medium name">{{ selectedSneaker.name }}</div>
      <div class="body-5-medium sku">{{ $t('common.sku') }}: {{ selectedSneaker.sku }}</div>
      <div class="body-5-regular condition">{{ $t('common.box_condition') }}:</div>
    </div>
    <ProductSizePicker
        :arrows-visible="false"
        :prices="pricesBySize"
        :sizes="sizes"
        :value="currentSize"
        :viewMode="sizeViewMode"
        :xs-center="true"
        :xs-count="5"
        class="size-picker"
        @changeViewMode="handleSizeViewModeChange"
        @update="handleSizeChange"
    />

    <div class="details expandable-card">
      <FilterAccordion :title="$t('products.product_details').toString()">

      </FilterAccordion>
    </div>
    <div class="guide expandable-card">
      <FilterAccordion :title="$t('products.size_guide').toString()">

      </FilterAccordion>
    </div>

    <div class="d-flex align-items-center justify-content-center">
      <Button
          :disabled="!currentSize"
          class="next"
          pill
          variant="dark-blue"
          @click="modalOpen = true"
      >
        {{ $t('common.next') }}
      </Button>
    </div>

    <MobileBottomSheet
        :has-header-divider="false"
        :height="'60%'"
        :open="modalOpen"
        :title="''"
        @closed="modalOpen = false"
        @opened="modalOpen = true"
    >
      <template #default>
        <div v-if="selectedReward"
             class="redeem-body d-flex flex-column align-items-center justify-content-around h-88 w-100 px-5 ">
          <i18n class="redeem-title text-center mb-22" path="rewards.sneaker_page.confirm" tag="div">
            <template #sneaker>
              <span class="font-weight-bold">{{ $t('rewards.sneaker_page.this_sneaker') }}</span>
            </template>
          </i18n>
          <ProductThumb :product="selectedSneaker" :src="selectedSneaker.image"
                        class="product-thumb-modal d-flex align-items-center justify-content-center"/>
          <div class="text-center body-5-regular">
            <div class="body-8-medium">{{ selectedSneaker.name }}</div>
            <div class="mt-1">{{ selectedSneaker.colorway }}</div>
            <div class="mt-1">{{ $tc('common.size', 1) }}: {{ currentSize }}</div>
          </div>
          <Button
              class="mb-22 redeem-button"
              pill
              variant="dark-blue"
              @click="redeemOk"
          >
            {{ $t('rewards.redeem') }}
          </Button>

          <Button
              variant="link-blue"
              @click="modalOpen = false"
          >
            {{ $t('common.cancel') }}
          </Button>

        </div>
      </template>
    </MobileBottomSheet>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import ProductThumb from '~/components/product/Thumb';
import ProductSizePicker from '~/components/product/SizePicker';
import FilterAccordion from '~/components/mobile/FilterAccordion';
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360';
import Button from '~/components/common/Button';
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';

export default {
  name: 'SneakerRewardSize',
  components: {MobileBottomSheet, Button, ProductImageViewerMagic360, FilterAccordion, ProductSizePicker, ProductThumb},
  layout: 'Profile',
  data() {
    return {
      modalOpen: false,
      sizeViewMode: 'carousel',
      currentSize: null
    }
  },
  computed: {
    ...mapGetters({
      selectedSneaker: 'rewards/getSelectedSneaker',
      selectedReward: 'rewards/getRedeemed'
    }),
    sizes() {
      return this.selectedSneaker?.sizes || []
    },
    has360Images() {
      return this.selectedSneaker?.has360Images
    },
    pricesBySize() {
      return this.product?.lowest_prices?.filter(
          (i) => i.packaging_condition_id === this.currentCondition
      )
    }
  },
  mounted() {
    if (!this.selectedReward) {
      this.$router.push('/profile/sneaker-reward')
    }
  },
  methods: {
    redeemOk() {
    //  TODO continue to checkout when ready
    },
    handleSizeViewModeChange(mode) {
      this.sizeViewMode = mode
    },
    handleSizeChange(sizeId) {
      if (sizeId) {
        this.currentSize = sizeId
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

.sneaker-size-page
  background-color: $color-white-1
  padding: 28px 38px
  font-family: $font-montserrat
  font-style: normal

  .h-88
    height: 95%

  .select-size
    @include body-17-bold

  .description
    .name
      margin-top: 40px

    .sku
      margin-top: 10px
      color: $color-blue-20

    .condition
      margin-top: 9px
      color: $color-gray-5


  .points
    @include body-3-medium
    font-style: normal
    color: $color-blue-20

  ::v-deep.expandable-card
    background: $color-white-1
    box-shadow: 0 1px 2px rgba($color-black-1, 0.25)
    border-radius: 8px
    padding: 20px

    .title
      color: $color-black-1

  .details
    margin-top: 18px

  .guide
    margin-top: 13px

  .next
    margin-top: 39px
    width: 216px

::v-deep.size-picker
  .size-carousel
    width: 100%
    margin-inline: 0
    padding-inline: 0

    .owl-carousel
      .item
        &.active
          &:after
            width: 52px
            border-bottom: 2px solid $color-blue-19
            margin-left: auto
            margin-right: auto

          .card
            @include body-17
            width: 52px
            height: 52px
            border: 1px solid $color-black-1

    .card
      @include body-9
      width: 49px
      height: 49px
      border: 1px solid $color-gray-3
      border-radius: 4px
      font-family: $font-montserrat
      font-style: normal
      font-weight: $medium
      color: $color-black-4

::v-deep.product-thumb-modal
  img
    width: 155px

.redeem-title
  @include body-17-regular

.redeem-button
  width: 216px

.redeem-body
  font-family: $font-family-sf-pro-display
</style>
