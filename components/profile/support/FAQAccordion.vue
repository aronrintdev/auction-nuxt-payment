<template>
  <div>
    <Accordion :data="faqs"/>
  </div>
</template>
<script>
import Accordion from '~/components/common/Accordion'

export default {
  name: 'FAQAccordion',
  components: {Accordion},
  data() {
    return {
      questions: []
    }
  },
  computed: {
    faqs(){
      return this.questions.map(x => {
        return {
          id: `faq-${x.id}`,
          title: x.question_details[0].question,
          body: x.question_details[0].answer
        }
      })
    }
  },
  mounted() {
    this.fetchFaqs()
  },
  methods: {
    fetchFaqs() {
      this.$axios.get('/faqs/categories/support')
        .then(({data}) => {
          this.questions = data.data[0].questions
        })
        .catch(err => {
          this.logger.logToServer(err.response)
        })
    }
  },
}
</script>
