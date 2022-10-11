<template>
  <div class="promotions-category-page">
    <div class="d-flex promotions-category-page-title">
      <div class="text-uppercase text-center px-5 promotions-category-page-title-content">
        {{ $t('promotions.current_sweepstakes') }}
      </div>
      <div class="mt-4 promotions-category-page-title-after">
      </div>
    </div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <!-- <div v-if="!loading && !currentSweepStake" class="d-flex align-items-center justify-content-center my-5">
      <h3>{{ $t('promotions.not_found') }} {{ $t('promotions.sweepstakes') }}</h3>
    </div> -->
    <!-- <div class="text-center d-flex align-items-center my-4 terms-and-conditions">
      <div class="body-5-regular px-4">
        {{ $t('promotions.want_to_know_more') }}&nbsp;<nuxt-link to="/terms">
        <strong>{{ $t('promotions.terms_and_conditions') }}</strong></nuxt-link>
      </div>
    </div> -->


  </div>
</template>
<script>
// import Button from '~/components/common/Button'
import {Loader} from '~/components/common';

export default {
  name: 'TopProductsList',
  components: {
    Loader,
    // Button
  },
  props: {
    title:{
      type:String,
      default:null
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {},
  methods: {
    learnMore() {
      this.$router.push({
        path: `/promotions/${this.currentSweepStake.id}`
      })
    }
  }
};
</script>
