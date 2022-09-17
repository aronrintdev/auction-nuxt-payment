<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card">
        <b-row>
          <b-col md="2" class="d-flex align-items-center">
            <img
              width="41"
              height="26"
              :src="getImage"
              alt="..."
            />
          </b-col>
          <b-col md="5" class="d-flex align-items-center">
            <div class="body-5-normal">{{ number }}</div>
          </b-col>
          <b-col md="4" class="d-flex align-items-center">
            <div class="body-5-normal">
              &dollar;{{ amount | formatPrice }}
            </div>
          </b-col>
          <b-col md="1" class="d-flex flex-column">
            <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
            <CloseSquaredRed v-if="clearable" class="btn-action mt-1" role="button" @click="$emit('clear')" />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'
import CloseSquaredRed from '~/assets/img/icons/close_squared_red.svg?inline'

export default {
  name: 'GiftCardDetailsCard',
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
    number: {
      type: String,
      required: true,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
      validator(value) {
        return value > 0
      },
      default: null,
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    getImage: (vm) => {
      try {
        return require(`~/assets/img/preferences/giftcard/${vm.image}`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/gift-card-logo.png')
      }
    },
  }
}
</script>
