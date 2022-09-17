<template>
  <b-button v-if="backLink" class="custom-link pl-0" variant="link" @click="$emit('click')">
    <img :src="require('~/assets/img/icons/back-btn-slim.svg')" alt="back-button">
    &nbsp;
    <span class="text-capitalize">
      {{ $t(text) }}
    </span>
  </b-button>
</template>

<script>
export default {
  name: 'BackButton',

  props: {
    backLink: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: 'shopping_cart.back'
    }
  }
}
</script>