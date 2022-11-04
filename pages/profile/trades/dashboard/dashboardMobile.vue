<template>
  <div class="container-dashboard d-flex justify-content-center align-content-center mt-5 mb-5">
    <div>
     <div class="list-box ml-2 p-1" @click="$router.push('/profile/trades/dashboard/alltradelistings')">
       <div class="heading-trade-listing mt-2 ml-2 ">{{$t('trades.my_trade_listings')}}</div>
       <div class="mt-2 d-flex justify-content-center align-content-center">
         <img src="~/assets/img/tradeIcon.svg" />
       </div>
       <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
         {{$t('trades.the_listings_you_have_created')}}
       </div>
     </div>
      <div class="list-box ml-2 p-1"  @click="$router.push('/profile/trades/dashboard/alloffers')">
        <div class="heading-trade-listing mt-2 ml-2">{{$t('trades.my_trade_offer')}}</div>
        <div class="mt-2 d-flex justify-content-center align-content-center">
          <img src="~/assets/img/tradeOfferIcon.svg" />
        </div>
        <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
          {{$t('trades.all_offers_on_trade_your_and_their_listings')}}
        </div>
      </div>
    </div>
    <div>
      <div class="list-box p-1" @click="$router.push('/profile/trades/wants')">
        <div class="heading-trade-listing mt-2 ml-2">{{$t('trades.wants_list')}}</div>
        <div class="mt-2 d-flex justify-content-center align-content-center">
          <img src="~/assets/img/heart.svg" />
        </div>
        <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
          {{$t('trades.wants_list_contains_items_saved_from_your_listings')}}
        </div>
      </div>
      <div class="list-box p-1" @click="$router.push('/profile/trades/preferences')">
        <div class="heading-trade-listing mt-2 ml-2">{{$t('trades.trade_preferences')}}</div>
        <div class="mt-2 d-flex justify-content-center align-content-center">
          <img src="~/assets/img/preference.svg" />
        </div>
        <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
          {{$t('trades.manage_all_aspects_of_your_trades')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components:{

  },
  layout: 'Profile',
  data(){
    return {

    }
  },
  mounted() {
  },
  methods:{
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.container-dashboard
  width: 350px
  height: auto
.list-box
  width: 160px
  height: 150px
  border: 2px solid $color-gray-75
.heading-trade-listing
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 14px
.sub-heading
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  font-size: 12px
</style>
