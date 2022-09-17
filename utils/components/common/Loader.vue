<template>
  <div v-if="loading" class="d-flex justify-content-center align-items-center">
    <b-spinner
      :label="`${$t('login.loading')}...`"
      variant="secondary"
      type="grow"
    ></b-spinner>
  </div>
</template>
<script>
export default {
  name: 'Loader',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
