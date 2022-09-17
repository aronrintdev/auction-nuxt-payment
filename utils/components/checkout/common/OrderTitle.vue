<template>
  <!-- Order Title -->
  <b-row>
    <b-col md="12">
      <span class="heading-1-medium d-block">{{ title }}</span>
      <b-button
        v-if="backLink"
        class="custom-link pl-0"
        variant="link"
        @click="$emit('click')"
        >&lt;&nbsp;<span class="text-lowercase">{{
          $t('shopping_cart.back')
        }}</span></b-button
      >
    </b-col> </b-row
  ><!-- End of Order Title -->
</template>

<script>
import LocaleMessage from 'vue-i18n'
import shoppingCartMixin from '~/plugins/mixins/shopping-cart'

export default {
  name: 'OrderTitle',
  mixins: [shoppingCartMixin],
  props: {
    title: {
      type: [String, LocaleMessage],
      required: true,
      default: '',
    },
    backLink: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
