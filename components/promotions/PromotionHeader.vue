<template>
  <div class="d-flex align-items-center justify-content-between mx-1">
    <div>
      <div :class="`title-text mt-1 ${(isSingle && isScreenXS) && 'single text-nowrap'}`">{{ title }}</div>
      <div v-if="!isSingle" class="deadline-text mt-1">{{ $t('promotions.deadline') }}&colon; {{ formattedDate }}</div>
    </div>
    <div v-if="entries"
         :class="`entries-wrapper px-2 py-1 d-flex flex-column justify-content-center align-items-center ${(isSingle && isScreenXS) && 'single'}`">
      <div class="d-flex align-items-center justify-content-between w-100">
        <img :src="require('~/assets/img/promotions/entries.svg')" alt="entries" class="ml-1"/>
        <span v-if="isSingle" class="entries-text mt-1"> {{ $t('promotions.your_entries') }} </span>
        <span :class="`${isSingle? 'single mr-0': ' mr-1'}`" class="entry-count mt-1">
          {{ entries }}
        </span>
      </div>
      <div v-if="!isSingle" class="entries-text">
        {{ $t('promotions.your_entries') }}
      </div>
    </div>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'PromotionHeader',
  mixins: [screenSize],
  props: {
    entries: {
      type: [Number, null],
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    deadline: {
      type: String,
      default: ''
    },
    isSingle: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    formattedDate() {
      return new Date(this.deadline).toLocaleString('default', {month: 'long', day: '2-digit', year: 'numeric'})
    }
  }
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"

.entries-wrapper
  background: $color-gray-1
  border-radius: 10px
  width: 100px

  &.single
    width: 90%
    background: transparent

.title-text
  @include body-4
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-1

  &.single
    @include body-17
    font-weight: $bold


.entry-count
  @include body-2
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  color: $color-black-1

  &.single
    padding: 7px 6px
    background: $color-gray-1
    border-radius: 5px

.entries-text
  @include body-9
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  color: $color-black-1

.deadline-text
  @include body-9
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  color: $color-gray-5

</style>
