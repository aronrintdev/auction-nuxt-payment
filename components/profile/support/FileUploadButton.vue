<template>
  <div class="cursor-pointer file-upload" @click="clicked">
    <img :src="require('/assets/img/icons/clip.svg')" alt="">
    <span class="mx-1">({{$t('contact_us.optional')}})</span>
    <div class="d-none">
      <input ref="file" type="file" @change="changed"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUploadButton',
  methods: {
    clicked(e) {
      this.$refs.file.click()
    },
    changed(e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.file-upload
  min-width: 109px
</style>
