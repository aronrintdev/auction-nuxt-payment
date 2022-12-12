<template>
  <!-- Dynamic Component Rendering for your address section -->
  <component :is="renderedComponent" class="address-component-responsive"></component>
  <!-- End of Dynamic Component Rendering -->
</template>

<script>
import YourAddress from './YourAddress.vue'
import AddressForm from './AddressForm.vue'
import AddressList from './AddressList.vue'
import { GOOGLE_MAPS_BASE_URL } from '~/static/constants'


export default {
  name: 'AddressComponent',

  components: {
    YourAddress,
    AddressForm,
    AddressList
  },

  data() {
    return {
      renderedComponent: YourAddress.name
    }
  },

  mounted() {
     this.injectGoogleMapsApi()
  },

  created() {
    this.$nuxt.$on('renderComponent', (componentName) => {
      this.renderedComponent = componentName
    })
  },

  methods: {
    // Inject Google Maps Api (if it doesn't exist)
    injectGoogleMapsApi() {
      if (!window.google) {
        const scriptTag = this.createScriptTag()
        scriptTag.src = GOOGLE_MAPS_BASE_URL
        this.insertScript(scriptTag)
      }
      return false
    },

    // Create a new script tag without the src attribute.
    createScriptTag() {
      const scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.async = true
      return scriptTag
    },

    // Insert a new script tag before the first found script tag.
    insertScript(scriptTag) {
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
    },
  },
}
</script>
