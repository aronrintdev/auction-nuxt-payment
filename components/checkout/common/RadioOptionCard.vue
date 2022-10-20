<template>
  <!-- Radio Option Card -->
  <b-row>
    <b-col md="12">
      <b-card class="custom-card">
        <b-row>
          <b-col md="6" class="d-flex align-items-center">
            <b-form-radio
              :disabled="disabled"
              :checked="checked"
              :name="name"
              :value="value"
              :text="text"
              @change="$emit('change', value)"
            >
              <slot name="text">{{ text }}</slot>
            </b-form-radio
            >
          </b-col>
          <b-col v-if="typeof imageUrls === 'string'" md="6" class="d-flex align-items-center">
            <img
              class="ml-auto"
              :src="getImageUrl(imageUrls)"
              alt="..."
            />
          </b-col>
          <b-col v-else md="6" class="d-flex align-items-center">
            <img
              v-for="url in imageUrls" :key="url"
              class="ml-auto"
              :src="getImageUrl(url)"
              alt="..."
            />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row><!-- End of Radio Option Card -->
</template>

<script>
export default {
  name: 'RadioOptionCard',
  props: {
    checked: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    value: {
      type: String,
      required: true,
      default: null,
    },
    text: {
      type: String,
      required: true,
      default: '',
    },
    imageUrls: {
      type: [String, Array],
      required: true,
      default: '',
    }
  },
  mounted() {
    if(this.checked){
      this.$emit('change', this.value)
    }
  },
  methods: {
    getImageUrl(imageUrl) {
      try {
        return require(`~/assets/img/shopping-cart/${imageUrl}`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/visa-logo.png')
      }
    },
  }
}
</script>
