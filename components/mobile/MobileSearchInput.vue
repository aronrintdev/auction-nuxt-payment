<template>
  <div>
    <b-input-group class="search-box mt-2 d-flex align-items-center px-3">
      <b-input-group-prepend>
        <search-icon class="search-icon"/>
      </b-input-group-prepend>

      <b-form-input v-model="text" :placeholder="$t('notifications.search')" class="text-input py-0"></b-form-input>

      <b-input-group-append>
        <clearIcon v-if="clearActive" @click="text = ''"/>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import searchIcon from '~/assets/img/profile/notifications/mobile-search.svg?inline';
import clearIcon from '~/assets/img/profile/notifications/clear.svg?inline';

export default {
  name: 'MobileSearchInput',
  components: {searchIcon, clearIcon},
  data() {
    return {
      text: '',
      clearActive: false
    }
  },
  watch: {
    text(val) {
      this.$emit('input', val)
      this.clearActive = !!val
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.search-box
  background-color: $color-white-5
  border-radius: 8px
  height: 33px

.text-input
  @include body-9
  font-family: $font-montserrat
  font-weight: $regular
  color: $color-black-1
  letter-spacing: 0.06em
  outline: none
  height: 33px

</style>
