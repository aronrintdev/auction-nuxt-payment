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
      faqs: [],
      category: '',
      categoryDetail: '',
    }
  },
  created() {
    this.faqs = [];
  },
  mounted(){
    this.category = this.$route.params.faqs;
    this.getFaqs();
  },
  methods: {
    getFaqs(){
      this.$axios
        .get('/faqs/categories/'+this.category)
        .then((response) => {
          this.categoryDetail = response.data.data[0].category_details;
          this.updateTitle();
          response.data.data[0].questions[0].question_details.forEach(element => {
            console.log(element)
            this.faqs.push({'id':'faq-'+element.id, 'title': element.question,'body': element.answer})
          });
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
    },
    updateTitle(){
      this.$emit('updateTitle', this.categoryDetail);
    }
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
