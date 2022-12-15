<template>
  <!-- Order Title -->
  <b-row class="order-title-wrapper">
    <b-col md="12">
      <span class="heading-3-bold d-block">{{ title }}</span>
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
import emitEventMixin from '~/plugins/mixins/emit-event'

export default {
  name: 'OrderTitle',
  mixins: [ emitEventMixin ],
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

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.order-title-wrapper
  font-family: $font-sf-pro-text
</style>
