<template>
  <b-col class="vendor-preferences-body">
    <div class="vd-preferences-slider">
      <h1 class="vd-preferences-slider-heading">
        {{categoryDetail.name}} {{ $t('faqs.faq') }}
      </h1>
    </div>
    <b-container fluid>
      <b-row class="component-row">
        <!-- Content -->
        <SecurityFaqComponent @updateTitle='updateTitle' />
        <!-- ./Content -->
      </b-row>
    </b-container>
  </b-col>
</template>

<script>

import SecurityFaqComponent from '~/components/profile/security/SecurityFaqComponent';

export default {
  name: 'faqs',
  components: {
    SecurityFaqComponent
  },
  layout: 'Profile',
  middleware: 'auth',
  data(){
    return {
      categoryDetail: ''
    }
  },
  methods:{
    updateTitle(row){
      this.categoryDetail = row[0]
    }
  }
}
</script>
