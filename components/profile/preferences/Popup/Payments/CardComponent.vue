<template>
  <!-- User Card component on Card details Input -->
  <!-- https://www.npmjs.com/package/vue-paycard -->
  <b-row class="justify-content-center d-flex">
    <vue-paycard :value-fields="valuefields" />
  </b-row>
  <!-- User Card component on Card details Input -->
</template>
<script>
export default {
  name: 'CardComponent',

  props: {
    valuefields: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
