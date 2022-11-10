<template>
  <div>
    <div v-if="width <=500">
          <b-card class="custom-card">
            <div class="d-flex">
              <div class="images-squard">
                <img
                  :src="getCardBrandLogo"
                  alt="..."
                  width="50"
                />
                <div class="body-5-normal">
                  {{ $t('shopping_cart.ending_in') }}&colon;&nbsp;{{ cardLastDigits }}
                </div>
                <div class="body-5-normal">
                  {{ $t('shopping_cart.exp') }}&colon;&nbsp;{{ cardExpiryDate }}
                </div>
              </div>
              <div>
                <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
                <CloseSquaredRed v-if="clearable" class="btn-action mt-1" role="button" @click="$emit('clear')" />
              </div>
            </div>
          </b-card>
    </div>
    <div v-else>
      <b-row>
        <b-col md="12">
          <b-card class="custom-card">
            <b-row>
              <b-col md="2" class="d-flex align-items-center">
                <img
                  :src="getCardBrandLogo"
                  alt="..."
                  width="50"
                />
              </b-col>
              <b-col md="5" class="d-flex align-items-center mt-2">
                <div class="body-5-normal">
                  {{ $t('shopping_cart.ending_in') }}&colon;&nbsp;{{ cardLastDigits }}
                </div>
              </b-col>
              <b-col md="4" class="d-flex align-items-center mt-1">
                <div class="body-5-normal">
                  {{ $t('shopping_cart.exp') }}&colon;&nbsp;{{ cardExpiryDate }}
                </div>
              </b-col>
              <b-col md="1" class="d-flex flex-column mt-2">
                <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
                <CloseSquaredRed v-if="clearable" class="btn-action mt-1" role="button" @click="$emit('clear')" />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'
import CloseSquaredRed from '~/assets/img/icons/close_squared_red.svg?inline'

export default {
  name: 'PaymentCardDetailsCard',
  components: { PencilSquaredBlueSvg, CloseSquaredRed },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    cardLastDigits: {
      type: String,
      required: true,
      default: '',
    },
    cardExpiryDate: {
      type: String,
      required: true,
      default: '',
    },
    cardBrand: {
      type: String,
      required: true,
      default: '',
    },
  },
  data(){
    return {
      width:''
    }
  },
  mounted() {
    this.width = window.innerWidth
  },
  computed: {
    getCardBrandLogo(vm) {
      try {
        return require(`~/assets/img/shopping-cart/${vm.cardBrand}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/visa-logo.png')
      }
    }
  }
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.images-squard
  width: 300px
</style>
