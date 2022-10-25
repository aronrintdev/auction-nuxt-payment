<template>
  <div>
    <div class="d-none d-md-block combination-div">
      <div class="d-flex flex-column py-4">
        <div class="d-flex">
          <div class="col-md-6 d-flex flex-column pl-3 justify-content-between">
            <div class="title-combination ml-4">
              {{ $t('trades.create_listing.vendor.wants.combination_no') }} {{ combination.combination_id }}
            </div>
            <div>
              <object 
                v-if="selectedCombination.product.image"
                :data="selectedCombination.product.image"
                class="img-fluid pointer"
                type="image/png"
              >
                <img class="img-fluid pointer" :src="fallbackImgUrl" alt="image"/>
              </object>
              <img v-else class="large-image-combination pointer" :src="fallbackImgUrl" alt="image"/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex flex-column pr-3">
              <div v-if="!editRemove" class="d-flex justify-content-end mb-5">
                <div 
                  role="button" 
                  @click="editWant"
                  class="d-flex align-items-center"
                >
                  <img 
                    :src="require('~/assets/img/icons/pencil-gray.svg')" 
                    height="15" 
                    width="15" 
                  >
                  <span class="edit-label ml-2">{{ $t('common.edit') }}</span>
                </div>
                <div
                  role="button" 
                  @click="deleteWant"
                  class="d-flex align-items-center"
                >
                  <img 
                    :src="require('~/assets/img/icons/Delete.svg')" 
                    height="15" 
                    width="15" 
                    class="ml-5" 
                  >
                  <span class="delete-label ml-2">{{ $t('common.delete') }}</span>
                </div>
              </div>
              <div v-else class="d-flex justify-content-end mb-5">
                <img
                  v-if="selected"
                  @click="$emit('select', combination.combination_id, 'remove')"
                  role="button"
                  :src="require('~/assets/img/icons/red-minus.svg')" 
                  height="22" 
                  width="22" 
                >
                <img
                  v-else
                  @click="$emit('select', combination.combination_id, 'add')"
                  role="button"
                  :src="require('~/assets/img/icons/gray-plus.svg')" 
                  height="22" 
                  width="22" 
                >
              </div>
              <div class="mt-2 text-bold">
                {{ selectedCombination.product.name }}
              </div>
              <div class="name-desktop">
                <span class="text-uppercase">{{ $t('trades.create_listing.vendor.wants.sku') }}:</span>
                {{ selectedCombination.product.sku }}
              </div>
              <div class="name-desktop">
                {{ $t('sell.confirm_listing.table_columns.colorway') }}:
                {{ selectedCombination.product.colorway }}
              </div>
              <div class="name-desktop">
                {{ $t('trades.create_listing.vendor.wants.box') }}:
                {{ selectedCombination.packaging_condition.name }}
              </div>
              <div class="text-bold">{{ $t('trades.create_listing.vendor.wants.lowest_ask') }}: 
                ${{ selectedCombination.product.estimated_market_value }}
              </div>

            </div>
          </div>
        </div>
        
        <div class="col-md-12 d-flex px-5">
          <b-col 
            v-for="(item, index) in combinationItems"
            :key="item.id" 
            class="d-flex flex-column align-items-center"
          >
            <object 
              v-if="item.product.image" 
              :data="item.product.image"
              class="item-image-combination pointer"
              type="image/png"
              @click="setCombinationSelectedItem(index)"
            >
              <img class="item-image-combination mb-2 pointer" :src="fallbackImgUrl" alt="image"/>
            </object>
            <img 
              v-else 
              alt="image"
              class="item-image-combination mb-2 pointer" 
              :src="fallbackImgUrl"
              @click="setCombinationSelectedItem(index)"
            />
            <div class="">
              <div v-if="selectedItemIndex === index" class="bar-combination"></div>
            </div>
          </b-col>
        </div>
        <div class="col-md-12 d-flex">
          <div class="text-bold ml-auto mr-auto mt-3">{{
              $t('trades.create_listing.vendor.wants.total_est_value')
            }}:   ${{ estValue(combinationItems) }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex row d-md-none custom-shadow rounded mx-sm-2">
      <div 
        class="col-4 d-flex flex-column align-items-end pb-3"
        :style="{'padding-top': '20px'}"
      >
        <img 
          width="16"
          height="16"
          :src="require('assets/img/icons/draft-list-image.svg')"
        />
        <object 
          v-if="selectedCombination.product.image"
          :data="selectedCombination.product.image"
          class="img-fluid pointer"
          type="image/png"
        >
          <img class="img-fluid pointer" :src="fallbackImgUrl" alt="image"/>
        </object>
      </div>
      <div class="col-7 py-3">
        <div class="combination-mobile">
          {{ $t('trades.create_listing.vendor.wants.combination_no') }}{{ combination.combination_id }}
        </div>
        <div class="name">
          {{ selectedCombination.product.name }}
        </div>
        <div class="name">
          <span class="text-uppercase">{{ $t('trades.create_listing.vendor.wants.sku') }}:</span>
          {{ selectedCombination.product.sku }}
        </div>
        <div class="name">
          {{ $t('sell.confirm_listing.table_columns.colorway') }}:
          {{ selectedCombination.product.colorway }}
        </div>
        <div class="name">
          {{ $t('home_page.size') }}: {{ selectedCombination.size.size }}
        </div>
        <div class="name">
          {{ $t('trades.create_listing.vendor.wants.box') }}:
          {{ selectedCombination.packaging_condition.name }}
        </div>

        <div v-if="combinationItems.length > 1" class="mt-2 d-flex justify-content-center">
          <div
            v-for="(item, idx) in combinationItems"
            :key="idx"
          >
            <div 
              role="button"
              @click="setCombinationSelectedItem(idx)"
              :class="{ 'slider-active': idx === selectedItemIndex }" 
              class="slider-item"
            >
            </div>
          </div>
        </div>

        <div class="value">{{
            $t('trades.create_listing.vendor.wants.total_est_value')
          }}:   ${{ estValue(combination.combination_items) }}
        </div>
      </div>
      <div class="d-md-none">
        <img 
          v-if="!editRemove" 
          class="more" 
          :src="require('assets/img/icons/More.svg')" 
          @click="isModalOpen = true"
        />
        <div v-else class="d-flex justify-content-end mb-5">
          <img
            v-if="selected"
            @click="$emit('select', combination.combination_id, 'remove')"
            class="more"
            role="button"
            :src="require('~/assets/img/icons/red-minus.svg')" 
            height="19" 
            width="19" 
          >
          <img
            v-else
            @click="$emit('select', combination.combination_id, 'add')"
            role="button"
            class="more"
            :src="require('~/assets/img/icons/gray-plus.svg')" 
            height="19" 
            width="19" 
          >
        </div>
      </div>
    </div>
    <ActionsModal
      :isOpen="isModalOpen"
      :product="selectedCombination"
      :combinationId="combination.combination_id"
      @closed="isModalOpen = false"
      @opened="isModalOpen = true"
    />
  </div>
</template>

<script>
import { PRODUCT_FALLBACK_URL } from '~/static/constants';
import ActionsModal from '~/components/modal/ActionsModal'

export default {
  name: 'CombinationItemCard',
  components: {
    ActionsModal
  },
  props: {
    combination: {
      type: Object,
      default: () => {},
    },
    editRemove:{
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    console.log('selectedCombination', this.combination);
    return {
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      selectedCombination: this.combination.combination_items[0],
      combinationItems: this.combination.combination_items,
      isModalOpen: false,
      selectedItemIndex: 0
    }
  },
  methods:{
    toggleSelect(checked) {
      this.$emit('select', this.combination.combination_id, checked)
    },
    deleteWant() {
      this.$emit('click', this.combination.combination_id, 'delete_combination')
    },
    editWant() {
        this.$store.commit('trade/setUpdateCombination', this.combination)
        this.$emit('click', this.combination, 'edit_combination')
    },
    /**
     * This function is used to return estimated total value
     * param combination contain list of items
     */
    estValue(combinationLists) {
      return combinationLists.reduce((a, b) => a + b.product.estimated_market_value, 0)
    },
    /**
     * This function is used to set combination want
     * item detail in variable to display detail in template
     * @param combinationIndex
     * @param itemIndex
     */
    setCombinationSelectedItem(combinationIndex) {
      this.selectedCombination = this.combination.combination_items[combinationIndex]
      this.selectedItemIndex = combinationIndex
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.more
  position: absolute
  right: 5px
  top: 7px
  @media (min-width: 576px)
    right: 15px

.value
  font-family: 'Montserrat'
  font-weight: 600
  font-size: 12px
  margin-top: 20px
  color: #000
  
.name, .name-desktop
  font-family: $font-sp-pro
  font-weight: 500
  font-size: 11px
  color: $color-gray-6

.name-desktop
  font-size: 13px
  line-height: 20px

.combination-mobile
  font-family: $font-sp-pro
  font-weight: 600
  font-size: 14px
  color: #000

.slider-item
  width: 4px
  height: 4px
  border-radius: 25px
  background: $color-gray-47
  margin-right: 4px

.slider-active
  background: #000

.custom-shadow
  box-shadow: 0px 1px 4px rgb(0 0 0 / 25%)

.combination-div
  margin-left: 24px
  margin-right: 24px

</style>