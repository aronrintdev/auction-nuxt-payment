<template>
  <b-row class="my-2 selected-file px-2" :class="variant">
    <b-col sm="1" class="d-flex align-items-center justify-content-center">
      <img :src="require('~/assets/img/profile/vendor-hub/attachment-black.svg')" class="file-icon" alt="">
    </b-col>
    <b-col sm="9" class="file-name overflow-hidden text-truncate">{{ file.name }}</b-col>
    <b-col sm="2" class="d-flex justify-content-end">
      <Button
        variant="link"
        class="delete-button mr-2"
        :disabled="disabled"
        @click="handleClick"
      >
        {{ deleteAction ? $t('vendor_hub.delete'): $t('vendor_hub.view') }}
      </Button>
    </b-col>
  </b-row>
</template>

<script>
import {Button} from '~/components/common';

export default {
  name: 'SelectedFile',
  components: {Button},
  props: {
    file: {
      type: Object,
      required: true
    },
    variant: {
      type: String,
      default: 'gray'  // gray, white
    },
    deleteAction:{
      type: Boolean,
      default: true
    },
    disabled:{
      type: Boolean,
      default: true
    }
  },
  methods:{
    handleClick(e){
      e.preventDefault()
      this.$emit(this.deleteAction? 'delete' : 'view')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.file-icon
  transform: scale(1.3)

.file-name
  @include body-4
  color: $color-black-1
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.selected-file
  align-content: center
  height: 43px
  box-shadow: 0 2px 4px rgba($color-black-1, 0.15)
  border-radius: 4px

.selected-file.white
  background: $color-white-1

.selected-file.gray
  background: $color-white-5

.delete-button.btn
  @include body-4
  color: $color-blue-1
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
</style>
