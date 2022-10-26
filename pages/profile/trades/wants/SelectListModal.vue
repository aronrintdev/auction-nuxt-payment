<template>
  <MobileBottomSheet
    :max-height="'50%'"
    :open="isOpen"
    @closed="$emit('closed', selectedItems)"
    @opened="$emit('opened')"
    :headerStyle="{
      display: 'none !important'
    }"
  >
    <div class="font-sf-pro">
      <div
        class="d-flex flex-column pb-3 text-center"
        :style="{
        }"
      >
        <div class="title">{{ $t('common.select_list') }}</div>
        <div class="sub-title">{{ $t('common.add_to_general') }}</div>
      </div>
      <div>
        <div
          v-for="(list) in listOptions"
          :key="list.value"
          class="item"
          :class="{ 
            selected: selectedItems.includes(list.value), 
            'border-top-0': selectedItems.includes(list.value),
            'text-white': selectedItems.includes(list.value)
          }"
          @click="onSelectItem(list.value)"
        >
          {{ list.text }}
        </div>
        <div class="item justify-content-between" @click="addCombination()">
          {{ $t('trades.wants_listing.create_combination', { count: '' }) }}
          <img 
            @click="addCombination()" 
            :src="require('~/assets/img/icons/product/Add.svg')"
            alt=""
          />
        </div>
      </div>
    </div>
  </MobileBottomSheet>
</template>

<script>
import { mapGetters } from 'vuex';
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'

export default {
  name: 'SelectListModal',

  components: {
    MobileBottomSheet
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      listOptions: [
        { text: this.$t('trades.wants_listing.general_wants'), value: 'general_wants' }
      ],
      selectedItems: []
    };
  },

  computed: {
    ...mapGetters({
      getCombinationsId: 'trade/getCombinationsId'
    })
  },

  mounted() {
    this.combinationOptions();
  },

  methods: {
    combinationOptions() {
      this.$axios.get('trades/wants', {
        params: {
          type: 'combinations',
          page: 1,
          category: '',
          size_types: '',
          sizes: '',
          perPage: 200
        }
      })
      .then((response) => { 
        response.data.data.data.forEach((item) => {
          if (item.combination_items.length > 0) {
            this.listOptions.push({
              text: this.$t('trades.wants_listing.create_combination', { count: item.combination_id }),
              value: 'combination_item ' + item.combination_id
            })
          }
        });
      })
      .catch((err) => {
        this.$toasted.error(this.$t(err.response.data.error))
      })
    },

    addCombination() {
      this.listOptions.push({
        text: this.$t('trades.wants_listing.create_combination', {count: this.listOptions.length}),
        value: 'combination_item ' + this.listOptions.length
      })
    },

    onSelectItem(value) {
      const index = this.selectedItems.findIndex((v) => v === value);
      if (index !== -1) {
        const newList = []
        for (let i = 0; i < this.selectedItems.length; i++) {
          if (i !== index) {
            newList.push(this.selectedItems[i]);
          }
        }
        this.selectedItems = newList;
      } else {
        this.selectedItems.push(value)
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.font-sf-pro
  font-family: $font-family-sf-pro-display

.title
  font-weight: 600
  font-size: 17px
  color: #000

.sub-title
  font-weight: 400
  font-size: 15px
  margin-top: 4px
  color: #000

.item
  border-top: 1px solid $color-gray-4
  height: 54px
  display: flex
  align-items: center
  padding-left: 14px
  padding-right: 14px
  font-size: 14px
  color: #000

.selected
  background: $color-blue-20

</style>