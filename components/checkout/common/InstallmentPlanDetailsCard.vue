<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card">
        <b-row>
          <b-col md="2" class="d-flex align-items-center">
            <img
              :src="getInstallmentPlanLogo"
              alt="..."
            />
          </b-col>
          <b-col md="5" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('shopping_cart.installment_plan') }}&nbsp;
            </div>
          </b-col>
          <b-col md="4" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('shopping_cart.date') }}&colon;&nbsp;{{
                installmentPlanDate
              }}
            </div>
            <div class="body-5-normal"></div>
          </b-col>
          <b-col md="1" class="d-flex flex-column">
            <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
            <CloseSquaredRed v-if="clearable" class="btn-action mt-1" role="button" @click="$emit('clear')" />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row
  >
</template>

<script>
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'
import CloseSquaredRed from '~/assets/img/icons/close_squared_red.svg?inline'

export default {
  name: 'InstallmentPlanDetailsCard',
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
    installmentPlanDate: {
      type: String,
      default: '',
    },
    installmentPlanType: {
      type: String,
      default: '',
    }
  },
  computed: {
    getInstallmentPlanLogo(vm) {
      try {
        return require(`~/assets/img/shopping-cart/${vm.installmentPlanType}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/affirm-logo.png')
      }
    }
  }
}
</script>
