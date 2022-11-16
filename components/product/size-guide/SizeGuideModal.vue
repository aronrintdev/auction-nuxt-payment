<template>
  <MobileBottomSheet
    :open="isOpen"
    :headerStyle="{ display: 'none !important' }"
    :height="'90%'"
    @closed="$emit('closed')"
  >
    <div class="font-sf-pro">
      <div class="d-flex flex-column border-b justify-content-center text-center">
        <div class="header">{{ $t('products.size_guide') }}</div>
        <div class="sub-header text-capitalize">
          {{ product.category.name }}
        </div>
      </div>

      <div class="pb-3">
        <div class="overall-fit">
          <img src="~/assets/img/icons/arcticons_tapemeasure.svg" />
          <span class="ml-2">{{ $t('auctions.frontpage.overall_fit') }}</span>
        </div>
        <div class="d-flex px-30">
          <div class="w-40">
            <div class="size-line"></div>
            <div class="line-label">{{ $t('products.runs_small') }}</div>
          </div>
          <div class="w-20">
            <div class="size-line-active"></div>
            <div class="line-label text-center">{{ $t('products.true_to_size') }}</div>
          </div>
          <div class="w-40">
            <div class="size-line"></div>
            <div class="line-label text-right">{{ $t('products.runs_large') }}</div>
          </div>
        </div>

        <div class="d-flex flex-column pb-3">
          <div class="table-header d-flex align-items-center justify-content-between">
            <div 
              v-for="(item, idx) in tableHeaders"
              :key="idx" 
              class="col"  
            >
              {{ item }}
            </div>
          </div>
          <div
            v-for="(row, i) in tableData"
            :key="i"
            class="table-row d-flex align-items-center justify-content-between"
            :class="{ 
              'bg-light-gray': i % 2 !== 0, 
              'row-active': i === selectedSizeIndex 
            }"
          >
            <div
              v-for="(el, j) in row"
              :key="j"
              class="col"
            >
              {{ el }}
            </div>
          </div>

        </div>

      </div>
    </div>
  </MobileBottomSheet>
</template>

<script>
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'
import { SIZE_GUIDE_ITEMS } from '~/static/constants/sizes' 

export default {
  name: 'SizeGuideModal',

  components: {
    MobileBottomSheet
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      required: true
    },
    selectedSize: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data() {
    const size = this.product.sizes.find(el => el.id === this.selectedSize)
    const tableData = []
    const count = Object.keys(SIZE_GUIDE_ITEMS[0]).length
    let selectedSizeIndex = null
    for (let i = 1; i < count; i++) {
      const tmp = []
      for (let j = 0; j < SIZE_GUIDE_ITEMS.length; j++) {
        const item = SIZE_GUIDE_ITEMS[j][`s${i}`]
        if (item === size.size && !selectedSizeIndex) {
          selectedSizeIndex = i - 1
        }
        tmp.push(item)
      }
      tableData.push(tmp)
    }
    return {
      tableHeaders: SIZE_GUIDE_ITEMS.reduce((acc, item) => {
        acc.push(item.type)
        return acc
      }, []),
      tableData,
      selectedSizeIndex
    };
  },

  watch: {  
    selectedSize(newItem, old) {
      this.findSelectedIndexRow()
    }
  },

  methods: {
    findSelectedIndexRow() {
      const size = this.product.sizes.find(el => el.id === this.selectedSize).size
      let newIndex = null
      for (let i = 0; i < this.tableData.length; i++) {
        const found = this.tableData[i].find(el => el === size)
        if (found) {
          newIndex = i
          break;
        }
      }
      this.selectedSizeIndex = newIndex
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.table-row, .table-header
  div
    text-align: center
    color: $color-black-1

.bg-light-gray
  background: $color-gray-21

.row-active
  background: $color-blue-20
  div
    color: $color-white-1

.table-header
  @include body-10-medium
  height: 48px
  padding-left: 20px
  padding-right: 20px
  border-top: 0.5px solid $color-gray-4
  border-bottom: 0.5px solid $color-gray-4
  margin-top: 19px

.table-row
  @include body-10-regular
  height: 40px
  padding-left: 20px
  padding-right: 20px

.w-40
  width: 40%

.w-20
  width: 20%

.px-30
  padding-left: 30px
  padding-right: 30px

.size-line, .size-line-active
  background: $color-gray-21
  height: 7px

.size-line-active
  background: $color-blue-19

.line-label
  @include body-10
  font-weight: $light
  color: $color-black-1
  margin-top: 8px

.overall-fit
  @include body-10-normal
  color: $color-black-1
  padding: 12px 30px 0 30px

.font-sf-pro
  font-family: $font-family-sf-pro-display

.sub-header
  @include body-5-normal
  color: $color-gray-25

.header
  @include body-17-medium
  color: $color-black-1

.border-b
  border-bottom: 0.5px solid $color-gray-47
  padding-bottom: 12px

.size-table
  flex-direction: column
  .size-sticky-col
    display: flex
    width: 100%
  &-content
    width: 100%
    overflow: hidden
  &-row
    flex: 1
    .size-table-cell
      flex: none
      &:nth-child(even)
        background: $color-gray-75
  &-cell
    @include body-21
    font-family: $font-family-sf-pro-display
    letter-spacing: -0.02em
    flex: 1
    height: 30px
    min-width: unset

</style>