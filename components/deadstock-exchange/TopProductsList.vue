<template>
  <div class="promotions-category-page">
    <div class="d-flex promotions-category-page-title">

      <div class="text-uppercase text-center px-5 promotions-category-page-title-content">

      </div>
      <div class="mt-4 promotions-category-page-title-after">
      </div>
    </div>
    <div v-if="loading" class="d-flex align-items-center justify-content-center h-500">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-if="!loading && !currentSweepStake" class="d-flex align-items-center justify-content-center my-5">
      <h3>{{ $t('promotions.not_found') }} {{ $t('promotions.sweepstakes') }}</h3>
    </div>

  </div>
</template>
<script>
import {mapGetters} from 'vuex';

import {Loader} from '~/components/common';

export default {
  name: 'TopProductsList',
  components: {
    Loader,
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      promotions: 'promotions/getPromotions',
    }),
    currentSweepStake() {
      return this.promotions.length ? this.promotions[0] : null
    },
    entries() {
      return this.currentSweepStake && this.$auth.user ? this.currentSweepStake.promotion_entries.filter(entry => entry.user_id === this.$auth.user.id).length : 0
    },
  },
  methods: {
    learnMore() {
      this.$router.push({
        path: `/promotions/${this.currentSweepStake.id}`
      })
    }
  }
};
</script>
