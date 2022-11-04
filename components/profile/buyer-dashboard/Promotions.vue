<template>
  <div :class="mobileClass" class="promotions bg-white pt-4 p-sm-4 br-10">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="fs-20 fw-7 font-primary mb-0 title">
        {{ $t('buyer_dashboard.promotions.title') }}
      </h2>
      <nuxt-link
          to="/promotions"
          class="font-secondary fs-16 fw-4 border-bottom border-primary mb-0 d-none d-sm-block"
      >{{ $t('buyer_dashboard.promotions.view_promotions') }}
      </nuxt-link
      >
    </div>
    <div class="container">
      <div v-if="promotion && !loading" class="row mt-4 my-sm-4">
        <div
            class="col-md-5 col-xs-offset-1 d-flex align-items-center align-items-sm-baseline flex-sm-column justify-content-center my-4 my-sm-0 order-2 order-sm-1"
        >
          <h2
              class="fs-30 fw-7 font-primary mb-0 text-left promotion-title mr-2 mr-sm-0 text-nowrap text-truncate mr-1"
          >
            {{ promotion.name }}
          </h2>
          <div
              class="divider bg-dark w-25 my-4 mx-auto mx-sm-0 d-none d-sm-block"
          ></div>
          <div v-if="countDownToTime" class="d-none d-sm-block">
            <CountdownTimer :countDownToTime="countDownToTime"/>
          </div>
          <div
              class="your-entries d-flex gap-2 align-items-center justify-content-center justify-content-sm-start"
          >
            <img src="~/assets/img/icons/profile/entries.svg" />
            <h4 class="fs-18 fw-7 font-primary mb-0 mt-1 description">
              {{ $t('buyer_dashboard.promotions.your_entries') }}
            </h4>
            <h4 class="text-orange fs-18 fw-7 font-primary mb-0 mt-1">
              {{ promotion.entries_count }}
            </h4>
          </div>
        </div>
        <div class="col-md-5  d-flex justify-content-center order-1 order-sm-2">
          <div class="car-main justify-content-center d-flex">
            <img :src="promotion.promotion_image" class="img-fluid"/>
          </div>
        </div>
        <div class="d-sm-none d-inline-block order-3 w-100 text-center ">
          <b-button
              :class="{
              'my-3' :!isScreenXS
            }"
              class=" px-4 py-2 font-primary fs-12 fw-6 border"
              variant="outline-secondary"
              pill
              to="/promotions"
          >{{ $t('buyer_dashboard.promotions.view_promotions') }}
          </b-button
          >
        </div>
      </div>
      <div v-if="!loading && !promotion" class="d-flex align-items-center justify-content-center my-4">
        <div class="fs-20 fw-7 font-primary ">
          {{ $t('buyer_dashboard.promotions.no_active') }}
        </div>
      </div>
      <div v-if="loading" class="d-flex align-items-center justify-content-center my-4">
        <Loader :loading="loading"></Loader>
      </div>
    </div>
  </div>
</template>
<script>
import CountdownTimer from './CountdownTimer'
import screenSize from '~/plugins/mixins/screenSize';
import Loader from '~/components/common/Loader';
export default {
  name: 'Promotions',
  components: {Loader, CountdownTimer},
  mixins: [screenSize],
  data() {
    return {
      promotion: null,
      countDownToTime: null,
      loading: false
    }
  },
  mounted() {
    this.getPromotion()
  },
  methods: {
    getPromotion() {
      this.loading = true
      this.$axios
          .get('/dashboard/buyer/promotions')
          .then((res) => {
            this.promotion = res.data.data
            if (this.promotion) {
              this.countDownToTime = this.$moment(this.promotion.end_at).endOf('day').valueOf()
            }
          })
          .catch((err) => {
            this.logger.logToServer(err.response)
          }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.promotions
  &.mobile
    margin-top: 14px
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px
    padding: 21px 7px

.divider
  height: 2px
.car-main img
  width: 500px
.text-orange
  color: $color-orange-11
@media (max-width: 576px)
  .title
    font-size: 14px
    font-weight: $bold
    color: $color-gray-69
    text-align: center
    width: 100%
  .promotion-title
    font-size: 18px
  .description
    font-size: 12px
    white-space: nowrap
  .your-entries
    column-gap: 4px
</style>
