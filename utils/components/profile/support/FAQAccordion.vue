<template>
  <div>
    <Accordion :data="getTranslatedFAQs" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Accordion from '~/components/common/Accordion'
import { LANG } from '~/static/constants'
export default {
  name: 'FAQAccordion',
  components: { Accordion },
  data() {
    return {
      faqs: [],
    }
  },
  computed: { 
    ...mapState(['locale']),
    getTranslatedFAQs() {
      return this.faqs.map((data) => {
        return {
          id: `faq-${data.id}`,
          title: `${
            this.locale === LANG.EN
              ? data.question.question_en
              : this.locale === LANG.FR
              ? data.question.question_fr
              : data.question.question_es
          }`,
          body: `${
            this.locale === LANG.EN
              ? data.answer.answer_en
              : this.locale === LANG.FR
              ? data.answer.answer_fr
              : data.answer.answer_es
          }`,
        }
      })
    },
  },
  mounted() {
    this.getFAQ()
  },
  methods: {
    getFAQ() {
      this.$axios
        .get('/faqs')
        .then(({ data }) => {
          this.faqs = data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>
