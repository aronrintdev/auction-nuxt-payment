<template>
  <div class="d-flex align-items-center">
    <div :style="{'width': width}" class="d-flex align-items-start justify-content-between field">
      <div class="body-5-normal text-nowrap text-truncate ">
        {{ text }}
      </div>
      <copy-svg class="copy-btn" @click="copyToClipboard(text)"/>
    </div>
    <div class="ml-3">
      <slot name="after">
      </slot>
    </div>
  </div>
</template>

<script>
import copySvg from 'assets/img/purchases/copy.svg?inline'
import clipboardMixin from '~/plugins/mixins/clipboard';

export default {
  name: 'CopyAbleField',
  components: {copySvg},
  mixins: [clipboardMixin],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.field
  background: $color-white-5
  border-radius: 6px
  padding: 8px 14px
  color: $color-black-1

.copy-btn
  margin-left: 24px
</style>
