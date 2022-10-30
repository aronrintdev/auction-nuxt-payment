<template>
  <div class="accordion" role="tablist">
    <div v-for="{id, title, body} in data" :key="id" class="mb-2">
      <div class="p-2 d-flex align-items-center justify-content-between justify-content-md-start" role="tab">
        <img :src="getIcon(id)" alt="icon" class="order-1 order-md-0"/>
        <span v-b-toggle="id" block class="accordion-title order-0 order-md-1">{{ title }}</span>
      </div>
      <b-collapse :id="id" accordion="my-accordion" role="tabpanel" @shown="shown(id)" @hide="hide">
        <b-card-text class="accordion-body">{{ body }}</b-card-text>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    data: {
      type: Array,
      default() {
        return [{id: 'random_id', title: 'Accordion Title', body: 'Accordion body with large text body'}]
      }
    },
  },
  data() {
    return {
      plus: require('~/assets/img/icons/plus-sign.svg'),
      minus: require('~/assets/img/icons/minus-sign.svg'),
      currentCollapseId: ''
    }
  },
  methods: {
    getIcon(collapseId) {
      return (this.currentCollapseId === collapseId) ? this.minus : this.plus;
    },
    shown(id){
      this.currentCollapseId = id;
    },
    hide(){
      this.currentCollapseId = '';
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

::v-deep .card-text
  padding-left: 37px
  padding-bottom: 30px

.accordion-title
  font-family: $font-family-sf-pro-display
  padding-left: 15px
  font-style: normal
  font-weight: $bold
  font-size: 20px
  line-height: 24px

.accordion-body
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 15px
  line-height: 18px
  color: $color-gray-5

@media (max-width: 767px)
  .accordion-title
    color: $color-blue-20
    @include body-8-normal
</style>
