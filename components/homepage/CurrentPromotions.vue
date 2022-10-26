<template>
  <div class="p-0 section-wrapper">
    <div class="d-none d-md-block">
      <SectionHeader
        :title="$t('home_page.current_promotions')"
        :desc="$t('home_page.current_promotions_description')"
        :label="$t('home_page.view_more_promotions')"
        to="/shop"
      />
    </div>
    <div class="d-block d-md-none">
      <SectionHeader
        :title="$t('home_page.current_promos')"
        :desc="$t('home_page.trade_desc')"
        :label="$t('home_page.view_more_promotions')"
        to="/shop"
      />
    </div>
    <div v-if="promotions.length === 3" class="row promos-wrapper d-none d-md-flex">
      <div class="col-6 col-md-4 d-flex">
        <img
          v-for="(row, index) in promotions"
          :key="`feature-${index}`"
          :src="row.imageUrl"
          class="promotions-images pl-3"
          width='100%'
        />
      </div>
    </div>
    <div  class="row promos-wrapper d-flex overflow-hidden mx-1">
      <div v-if='promotions.length === 2' class="col-6 col-md-6">
        <img
          width="100%"
          height='575px'
          :src="promotions[0].imageUrl"
        />
      </div>
      <div v-if='promotions.length === 2' class="col-6 col-md-6 border-left">
        <img
          width="100%"
          height='575px'
          :src="promotions[1].imageUrl"
        />
      </div>
      <div v-if='promotions.length === 1' class="d-flex border-top col-12 pt-2 mt-2 mt-md-0">
        <img
          width="100%"
          height='575px'
          :src="promotions[0].imageUrl"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CurrentPromotions',
  data() {
    return {
      promotions: [],
      features: [
        {
          imageUrl: require('~/assets/img/home/promotions/promotion1.png'),
        },
        {
          imageUrl: require('~/assets/img/home/promotions/promotion2.png'),
        },
        {
          imageUrl: require('~/assets/img/home/promotions/promotion3.png'),
        }
      ]
    }
  },
  mounted(){
    this.getPromotions()
  },
  methods:{
    getPromotions(){
      const date = new Date();
	    const toDayDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate();
      this.$axios
        .get('/promotions', {
          start_at: toDayDate,
        })
        .then((res) => {
          const promotions = res.data.data.data
          let i = 0;
          for (const property in promotions) {
            i++
            if(i<=3){
              const row = {'imageUrl': promotions[property].promotion_image};
              this.promotions.push(row)
            }
          }
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
.promos-wrapper
  margin-top: 18px
</style>
