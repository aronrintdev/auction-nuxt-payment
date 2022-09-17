<template>
  <div>
    <Header />
    <div class="container-fluid p-0">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  name: 'IndexLayout',

  components: { Header, Footer },

  async fetch() {
    await this.fetchWishLists()
  },

  fetchOnServer: false,

  methods: {
    ...mapActions({
      fetchWishLists: 'wish-list/fetchWishLists',
    }),
  },
}
</script>
