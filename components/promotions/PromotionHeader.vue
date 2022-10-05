<template>
  <div class="d-flex align-items-center justify-content-between">
    <div>
      <div class="title-text">{{ title }}</div>
      <div class="deadline-text mt-1">{{ $t('promotions.deadline') }}&colon; {{ formattedDate }}</div>
    </div>
    <div v-if="entries" class="entries-wrapper px-2 py-1 d-flex flex-column justify-content-center align-items-center">
      <div class="d-flex align-items-center justify-content-between w-100">
        <img :src="require('~/assets/img/promotions/entries.svg')" alt="entries" class="ml-1"/>
        <span class="entry-count mr-2 mt-1">
          {{ entries }}
        </span>
      </div>
      <div class="entries-text">
        {{ $t('promotions.your_entries') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromotionHeader',
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

.title-text
  @include body-4
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-1

.entry-count
  @include body-2
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  color: $color-black-1

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
