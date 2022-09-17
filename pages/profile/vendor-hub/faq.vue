<template>
  <div class="vendor-page h-100 d-flex flex-column">
    <div class="title-area">
      <h1 class="title">
        {{ $t('vendor_hub.faqs.title') }}
      </h1>
    </div>
    <div class="bg-white d-flex flex-column h-100 p-4">
      <div class="d-flex align-items-center w-25" role="button" @click="goVendor">
        <img :src="require('~/assets/img/shopping-cart/arrow-left.svg')">
        <span class="ml-2 back-text">{{ $t('vendor_hub.faqs.back') }}</span>
      </div>
      <div class="d-flex flex-column mt-5">
        <div v-for="(item, ind) in faqs" :key="ind" class="d-flex flex-column">
          <div class="d-flex align-items-center title-text" role="button" @click="openFaq(item.id)">
            <img v-if="!item.isOpen" :src="require('~/assets/img/icons/plus_blue.svg')" height="15">
            <img v-else :src="require('~/assets/img/icons/minus-blue.svg')" height="15"  width="15">
            <span class="ml-2">{{ item.question }}</span>
          </div>
          <div v-if="item.isOpen" class="body-text mt-2 mb-5">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Faqs',
  layout: 'Profile',
  data() {
    return {
      faqs: []
    }
  },
  mounted() {
    this.getFaqs({faq_for: 'vendor'}).then(res => {
      this.faqs = res.data.data
    })
  },
  methods: {
    ...mapActions({
      getFaqs: 'vendor-hub/fetchFaqs'
    }),
    goVendor(){
      this.$router.push('/profile/vendor-hub')
    },

    /**
     *  Thi methods is called when user clicks to FAQ
     *  and it opens faq description by changing isOpen property,
     *  and closing rest of faqs.
     * @param faqID
     */
    openFaq(faqID) {
      this.faqs = this.faqs.map(faq => {
        if (faq.id === faqID){
          faq.isOpen = !faq.isOpen
        }else{
          faq.isOpen = false
        }
        return faq
      })
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.title-text
  @include body-2
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold

.body-text
  @include body-8
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  color: $color-gray-5
  margin-bottom: 20px

.back-text
  @include body-2
  color: $color-blue-2
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  text-align: center

.bg-blue-2.btn
  background: $color-blue-2
  border: 1px solid $color-blue-2

.title-area
  padding: 80px 120px

.title
  @include heading-4
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold

.vendor-page
  background-color: $color-gray-1
  height: 100vh
</style>
