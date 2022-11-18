<template>
  <b-modal
    :id="id"
    :centered="centered"
    :hide-header="hideHeader"
    :hide-footer="hideFooter"
    :header-class="`${headerClass} ${noHeaderBorder && 'border-bottom-0'}`"
    :footer-class="`${footerClass} ${noFooterBorder && 'border-top-0'}`"
    no-stacking
    :body-class="`px-4 py-3`"
    :modal-class="modalClass"
    :size="size"
    :hide-backdrop="hideBackdrop"
    @shown="$emit('shown')"
    @hidden="$emit('hidden')"
  >
    <template
      #modal-header="{ close }"
      :class="{ 'modal-header': false, 'no-border': noBorder }"
    >
      <slot name="header"></slot>

      <Button variant="link" class="btn-close" @click="close()">
        <img src="~/assets/img/icons/close.svg" />
      </Button>
    </template>
    <template #default="{}">
      <slot />
    </template>
    <template #modal-footer="{ hide }">
      <slot name="footer" :hide="hide" />
    </template>
  </b-modal>
</template>
<script>
import Button from '~/components/common/Button.vue'

export default {
  name: 'Modal',

  components: { Button },

  props: {
    id: {
      type: String,
      required: true,
    },
    centered: {
      type: Boolean,
      default: true,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    hideBackdrop: {
      type: Boolean,
      default: false,
    },
    noHeaderBorder: {
      type: Boolean,
      default: false,
    },
    noFooterBorder: {
      type: Boolean,
      default: false,
    },
    modalClass: {
      type: String,
      default: '',
    },
    headerClass: {
      type: String,
      default: '',
    },
    footerClass: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md', // 'sm', 'md', 'lg', 'xl'
    },
  },
}
</script>
<style lang="sass" scoped>
.btn-close::v-deep
  float: right
  text-align: right
  margin-left: auto
</style>
