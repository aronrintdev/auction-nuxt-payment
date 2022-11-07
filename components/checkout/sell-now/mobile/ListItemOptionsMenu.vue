<template>
  <b-row>
    <b-col cols="12" sm="12">
      <!-- Top Title -->
      <b-row>
        <b-col cols="3" sm="3" class="d-flex align-items-center justify-content-center pr-0">
          <b-img :src="sellItem.image" width="62" height="50" />
        </b-col>
        <b-col cols="9" sm="9" class="pl-0">
          <!-- Shopping Bag Title -->
          <b-row class="title-wrapper">
            <b-col sm="12" md="12" class="px-0">
              <span class="body-12-bold">{{ name }}&nbsp;</span>
            </b-col>
          </b-row>
          <!-- End of Shopping Bag Title -->

          <!-- Sub Title -->
          <b-row class="subtitle-wrapper">
            <b-col cols="12" sm="12">
              <div class="body-5-normal text-gray-25">
                {{ subTitle }}
              </div>
            </b-col>
          </b-row>
          <!-- End of Sub Title -->
        </b-col>
      </b-row>
      <!-- End of Top Title -->

      <b-row class="options-wrapper">
        <b-col cols="12" sm="12">
          <b-list-group>
            <b-list-group-item @click="handleEditProductClick">
              <b-row>
                <b-col cols="8" sm="8">
                  <span class="text-black body-17-normal">{{ $t('sell_now.edit_product') }}</span>
                </b-col>
                <b-col cols="4" sm="4" class="text-right">
                  <ArrowRightBlackSVG />
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item @click="$parent.close()">
              <b-row>
                <b-col cols="12" sm="12">
                  <span class="text-black body-17-normal">{{ $t('sell_now.cancel') }}</span>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ArrowRightBlackSVG from '~/assets/img/shopping-cart/arrow-right-black.svg?inline'

export default {
  name: 'ListItemOptionsMenu',
  components: { ArrowRightBlackSVG },
  computed: {
    ...mapGetters({
      sellItem: 'sell-now/getSellingItem',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    name: (vm) => {
      return vm.sellItem.name.substr(0, 26)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    subTitle(vm) {
      return vm.colorWay
        + ' | '
        + vm.$t('shopping_cart.box_condition')
        + ': '
        + vm.boxCondition
        + ' | '
        + vm.$t('shopping_cart.size')
        + ': '
        + vm.sellItem.size.size
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    colorWay: (vm) => {
      return vm.sellItem.colorWay.substr(0, 4)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    boxCondition: (vm) => {
      return vm.sellItem.packaging_condition.name.substr(0, 10)
    },
  },
  methods: {
    handleEditProductClick() {
      this.$parent.close()
      this.$router.push('/profile/inventory')
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.title-wrapper
  margin: 0

.subtitle-wrapper
  margin-top: 7px

.options-wrapper
  margin-top: 16px

  .list-group-item
    padding: 17px 20px
    border-color: $color-gray-23b

    &:last-child
      border-bottom: none

    &:hover, &:active, &:focus
      background: $color-gray-23b
</style>
