<template>
  <b-col cols="12">
    <b-row class="mt-md-4 mt-4">
      <b-col cols="12">
        <div class="ph-30">
          <div class="mb-4">
            <NuxtLink to="/profile/security">
              <div class="d-flex align-baseline">
                <img :src="require('~/assets/img/icons/back-arrow.svg')"/>
                <span class="back-text pl-2">{{ $t('features.2fa_security.back_to_security') }}</span>
              </div>
            </NuxtLink>
          </div>

          <accordion :data="faqs"/>
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import Accordion from '~/components/common/Accordion';

export default {
  name: 'SecurityFaqComponent',
  components: {
    Accordion
  },
  data() {
    return {
      faqs: []
    }
  },
  created() {
    this.faqs = [
      {
        'id': 'faq-1',
        'title': this.$t('2fa_faqs.faq_1.title').toString(),
        'body': this.$t('2fa_faqs.faq_1.body').toString()
      },
      {
        'id': 'faq-2',
        'title': this.$t('2fa_faqs.faq_2.title').toString(),
        'body': this.$t('2fa_faqs.faq_2.body').toString()
      },
      {
        'id': 'faq-3',
        'title': this.$t('2fa_faqs.faq_3.title').toString(),
        'body': this.$t('2fa_faqs.faq_3.body').toString()
      },
      {
        'id': 'faq-4',
        'title': this.$t('2fa_faqs.faq_4.title').toString(),
        'body': this.$t('2fa_faqs.faq_4.body').toString()
      }
    ];
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'

.ph-30
  padding: 0 30px

.back-text
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 20px
  line-height: 24px
  color: $color-blue-20

</style>
