<template>
  <b-container fluid>
    <!-- Top Banner -->
    <b-row>
      <b-col md="12" class="px-0 d-flex align-items-center banner-wrapper">
        <div class="pl-5 heading-7-medium">{{ $t('rewards.rewards_faq') }}</div>
      </b-col>
    </b-row><!-- End of Top Banner -->

    <!-- Back To Rewards Link -->
    <b-row class="mt-4 px-5">
      <b-col md="12">
        <b-button variant="link" to="/profile/rewards" class="pl-0">
          <span>
            <b-img :src="require('~/assets/img/shopping-cart/arrow-left.svg')"></b-img>&nbsp;
            {{ $t('rewards.back_to_rewards') }}
          </span>
        </b-button>
      </b-col>
    </b-row><!-- End of Back To Rewards Link -->

    <!-- FAQ Collapse List Items -->
    <b-row v-for="item in faqItems" :key="item.id" class="mt-5 px-5">
      <b-col md="12">
        <b-row>
          <b-col
            v-b-toggle="`accordion-${item.id}`"
            md="12"
            class="d-flex align-items-center"
            @click="handleClickEvent(item.id)"
          >
            <PlusSymbolSVG v-if="visibleFaq !== item.id" />
            <MinusSymbolSVG v-else />
            <span class="body-2-bold ml-4">{{ item.question.question_en }}</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-card no-body class="mb-0 shadow-none ml-3">
              <b-collapse
                :id="`accordion-${item.id}`"
                accordion="faq-accordion"
                role="tabpanel"
              >
                <b-card-body class="pb-0">
                  <b-card-text>{{ item.answer.answer_en }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row><!-- End of FAQ Collapse List Items -->
  </b-container>
</template>

<script>
import PlusSymbolSVG from '~/assets/img/rewards/plus_symbol.svg?inline'
import MinusSymbolSVG from '~/assets/img/rewards/minus_symbol.svg?inline'

export default {
  name: 'FAQ',
  components: { MinusSymbolSVG, PlusSymbolSVG },
  layout: 'Profile',
  data() {
    return {
      visibleFaq: '',
      faqItems: [],
    }
  },
  mounted() {
    this.getFaqs()
  },
  methods: {
    getFaqs() {
      this.$axios.get('faqs', { handleError: false })
        .then(response => {
          this.faqItems = response.data.data
        })
      .catch(error => {
        this.$toasted.error(error)
      })
    },
    handleClickEvent(itemId) {
      if (this.visibleFaq === itemId) {
        this.visibleFaq = ''
      } else {
        this.visibleFaq = itemId
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Top banner wrapper helper class */
.banner-wrapper
  background-color: $color-white-4
  width: 100%
  height: 200px
  background-position: center
  background-size: cover
  position: relative
</style>
