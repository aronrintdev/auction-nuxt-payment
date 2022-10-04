<template>
  <div>
    <b-modal id="wantItems" :hide-footer="true" :hide-header="true" size="lg">
        <div class="row text-left title d-flex text-center align-items-center">
          <b-col class="text-left">
           {{$t('trades.trade_arena.items_wanted')}}
          </b-col>
          <b-col class="text-right">
            <b-icon icon="x-lg" aria-hidden="true" role="button" @click="$bvModal.hide('wantItems')"></b-icon>
          </b-col>
        </div>
        <div class="col-md-12 d-flex">
          <div class="col-md-6">
            <img class="large-image" :src="selected_item.product | getProductImageUrl"/>
          </div>
          <div class="col-md-6 d-block text-left text-div">
            <div class="text-bold">
              {{selected_item.product.name}}
            </div>
            <div class="">
              {{$t('trades.trade_arena.sku')}}: {{selected_item.product.sku}}
            </div>
            <div>
              {{$t('trades.trade_arena.colorway')}}: {{selected_item.product.colorway}},{{selected_item.size.size}}
            </div>
            <div>
              {{$t('trades.trade_arena.condition')}}: {{selected_item.packaging_condition.name}}
            </div>
            <div class="text-bold">{{$t('trades.trade_arena.lowest_ask')}}: ${{(selected_item.product.retail_price/100).toFixed(2)}}</div>
          </div>
        </div>
        <div class="col-md-12 d-flex justify-content-center">
          <div v-for="(item,index) in wants" :key="index" class="ml-4" role="button">
            <img class="item-image-wants-modal" :src="item.product | getProductImageUrl" @click="changeSelected(item,index)"/>
            <div v-if="selected_index == index" class="bar"></div>
          </div>
        </div>
        <div class="col-md-12 d-flex">
          <div class="text-bold ml-auto mr-auto mt-1">{{ $t('trades.trade_arena.total_est_value') }}: ${{ sumVal }}</div>
        </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'TraderWants',
  props:{
    wants: {
      type: Array,
      required: true,
    }
  },
  data(){
    return {
      selected_item: this.wants[0],
      selected_index: 0,
    }
  },
  computed: {
    /**
     * This computed property is used to return sum of
     * total estimated value
     * @returns {null|*}
     */
    sumVal(){
      const price = this.wants.map((item) => item.product.retail_price)
      if(price.length) {
        return (price.reduce((a, b) => a + b, 0)/100).toFixed(2)
      }
      return null
    }
  },
  methods:{
    /**
     * This function is used to change selected item in wants list
     * @param data
     * @param index
     */
    changeSelected(data,index){
      this.selected_item = data
      this.selected_index = index
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'


.modal-lg,
.modal-xl
  max-width: 593px

.title
  font-family: $font-montserrat
  font-style: normal
  @include body-17-medium
  color: $color-black-1
  padding-left: 25px
</style>
