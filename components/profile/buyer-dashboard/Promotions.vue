<template>
  <div class="promotions bg-white p-4 br-10 shadow-sm">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="fs-20 fw-7 font-primary mb-0">
        {{ $t('buyer_dashboard.promotions.title') }}
      </h2>
      <nuxt-link to='/promotions'
        class="font-secondary fs-16 fw-4 border-bottom border-primary mb-0"
        >{{ $t('buyer_dashboard.promotions.view_promotions') }}</nuxt-link>
    </div>
    <div class="container">
      <div class="row my-4">
        <div
          class="col-md-6 d-flex flex-column justify-content-center my-4 my-sm-0"
        >
          <h2 class="fs-30 fw-7 font-primary mb-0 text-center text-sm-left">
            {{promotions.name}}
          </h2>
          <div class="divider bg-dark w-25 my-4 mx-auto mx-sm-0"></div>
          <div>
            <CountdownTimer :countDownToTime='countDownToTime' />
          </div>
          <div
            class="your-entries d-flex gap-2 align-items-center justify-content-center justify-content-sm-start"
          >
            <img src="~/assets/img/icons/profile/entries.svg" />
            <h4 class="fs-18 fw-7 font-primary mb-0 mt-1">
              {{ $t('buyer_dashboard.promotions.your_entries') }}
            </h4>
            <h4 class="text-orange fs-18 fw-7 font-primary mb-0 mt-1">{{promotions.entries_count}}</h4>
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center">
          <div class="car-main justify-content-center d-flex">
            <img
              :src="promotions.promotion_image"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountdownTimer from './CountdownTimer'
export default {
  name: 'Promotions',
  components: { CountdownTimer },
  data(){
    return {
      promotions: [],
      countDownToTime: ''
    }
  },
  mounted(){
    this.getPromotion()
  },
  methods:{
    getPromotion(){
      this.$axios
        .get('/dashboard/buyer/promotions')
        .then((res) => {
          this.promotions = res.data.data[0]
          this.countDownToTime = new Date(Date.parse( this.promotions.end_at+' 00:00:00' ));
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.divider
  height: 2px
.car-main img
  width: 500px
.text-orange
  color: $color-orange-11
</style>