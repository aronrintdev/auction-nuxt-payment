<template>
  <!-- Shopping Bag Title -->
  <b-row class="title-wrapper">
    <b-col sm="12" md="12" :class="{ 'text-center': textCenter }" class="d-flex align-items-center justify-content-center">
      <slot name="back-arrow">
        <ArrowLeftGray17SVG v-if="backLink" class="back-arrow" @click="$emit('click')" />
      </slot>
      <span class="body-12-bold">{{ title }}&nbsp;</span>
      <span class="body-12-normal">{{ additionalTitle }}</span>
    </b-col>
  </b-row>
  <!-- End of Shopping Bag Title -->
</template>

<script>
import LocaleMessage from 'vue-i18n'
import ArrowLeftGray17SVG from '~/assets/img/shopping-cart/arrow-left-gray-17.svg?inline'
import shoppingCartMixin from '~/plugins/mixins/shopping-cart'

export default {
  name: 'ShoppingBagTitle',
  components: { ArrowLeftGray17SVG },
  mixins: [shoppingCartMixin],
  props: {
    title: {
      type: [String, LocaleMessage],
      required: true,
      default: '',
    },
    additionalTitle: {
      type: [String, LocaleMessage],
      required: false,
      default: '',
    },
    backLink: {
      type: Boolean,
      default: false,
    },
    textCenter: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="sass" scoped>
.title-wrapper
  margin: 8px 18px 0

.back-arrow
  position: absolute
  left: 0
</style>
