<template>
  <b-row class="vh-100">
    <b-col md="12">
      <b-row class="h-100">
        <b-col offset-md="1" class="d-flex pt-300 col-md-10">
          <b-row class="mt-100">
            <b-col md="12">
              <div class="right-heading-bold">
                {{ $t('terms.title') }}
              </div>
              <div class="body-5-normal text-color-gray-38 mt-3">
                {{ $t('terms.text') }}
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: 'Terms',
  layout: 'Auth',
  data() {
    return {}
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.left-heading-bold
  color: black
  font-style: normal
  font-weight: $bold
  font-size: 36px
  line-height: 44px

.right-heading-bold
  color: black
  font-style: normal
  font-weight: $bold
  font-size: 42px
  line-height: 51px
  padding-top: 20px
</style>
