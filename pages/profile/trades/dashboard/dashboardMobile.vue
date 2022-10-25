<template>
  <div class="container-dashboard d-flex justify-content-center align-content-center mt-5 mb-5">
    <div>
     <div class="list-box">
       <div class="heading-trade-listing mt-2 ml-2">My Trade Listing</div>
       <div class="mt-2 d-flex justify-content-center align-content-center">
         <img src="~/assets/img/tradeIcon.svg" />
       </div>
       <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
         The Listings you have created
       </div>
     </div>
      <div class="list-box">
        <div class="heading-trade-listing mt-2 ml-2">My Trade Offers</div>
        <div class="mt-2 d-flex justify-content-center align-content-center">
          <img src="~/assets/img/tradeOfferIcon.svg" />
        </div>
        <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
          All Offers on Trade Your and Their Listings
        </div>
      </div>
    </div>
    <div>
      <div class="list-box">
        <div class="heading-trade-listing mt-2 ml-2">Wants List</div>
        <div class="mt-2 d-flex justify-content-center align-content-center">
          <img src="~/assets/img/heart.svg" />
        </div>
        <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
          Wants List contains items saved from your listings
        </div>
      </div>
      <div class="list-box">
        <div class="heading-trade-listing mt-2 ml-2">Trade Preferences</div>
        <div class="mt-2 d-flex justify-content-center align-content-center">
          <img src="~/assets/img/preference.svg" />
        </div>
        <div class="mt-2 d-flex justify-content-center align-content-center sub-heading">
          Manage all aspects of your trades
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
  border: 1px solid grey
.list-box
  width: 160px
  border: 2px solid #F4F4F4
.heading-trade-listing
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 700
  font-size: 14px
.sub-heading
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 400
  font-size: 12px
</style>
