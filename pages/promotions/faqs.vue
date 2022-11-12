<template>
  <b-container fluid>
    <b-row>
      <b-col class="px-0 mt-4 d-flex align-items-center banner-wrapper" md="12">
        <div class="pl-5 heading-1-bold">{{ $t('promotions.promotions_faq') }}</div>
      </b-col>
    </b-row>

    <b-row class="mt-4 px-5">
      <b-col md="12">
        <b-button class="pl-0" to="/promotions" variant="link">
          <span>
            <b-img :src="require('~/assets/img/shopping-cart/arrow-left.svg')"></b-img>&nbsp;
            {{ $t('promotions.back_to_promotions') }}
          </span>
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-4 px-5">
      <b-col>
        <Accordion :data="faqs"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Accordion from '~/components/common/Accordion';

export default {
  name: 'Faqs',
  components: {Accordion},
  layout(context) {
    return context.$auth.user ? 'Profile' : 'IndexLayout'
  },
  data() {
    return {
      faqs: []
    }
  },
  mounted() {
    this.getFaqs()
  },
  methods: {
    // TODO change API to get filtered faqs for promotions only when new FAQS api ready
    getFaqs() {
      this.$axios.get('faqs/categories/promotions').then(res => {
        this.faqs = res.data.data
        console.log('log data is',this.faqs);
      }).catch(error => {
        this.$toasted.error(error)
        console.log('log data is',error);
      })
    },
  }
}
</script>