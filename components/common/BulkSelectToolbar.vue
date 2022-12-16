<template>
  <div v-if="active" class="bulk-select-toolbar-wrapper">
    <div v-if="successLabel" class="d-flex align-items-center w-100">
      <div class="mx-3">
        <Icon
          src="close-circle.svg"
          hoverSrc="close-circle.svg"
          width="16"
          height="16"
          @click="$emit('close')"
        />
      </div>
      <div class="mx-3 text-center flex-grow-1">
        {{ successLabel }}
      </div>
      <div class="mr-4 ml-2">
        <Button
          variant="link"
          :disabled="actionDisabled"
          class="text-decoration-underline"
          @click="$emit('undo')"
        >
          {{ $t('common.undo') }}
        </Button>
      </div>
    </div>
    <div v-else class="d-flex align-items-center w-100">
      <div class="mx-3">
        <Icon
          src="minus-toolbar.svg"
          hoverSrc="minus-toolbar.svg"
          width="16"
          height="16"
          @click="$emit('close')"
        />
      </div>
      <div class="mr-3">
        {{
          $t('common.n_item_selected', {
            n: selected.length,
            unit: unitLabel,
          }).toLowerCase()
        }}
      </div>
      <div class="ml-auto ml-md-2 mr-3 mr-md-0">
        <Button
          variant="link"
          class="text-decoration-underline"
          @click="$emit('deselectAll')"
        >
          {{ $t('common.deselect') }}
        </Button>
      </div>
      <div v-if="error" class="mx-5 error-msg pl-4 pr-4" >{{ error }}</div>
      <div v-if="selected.length > 0" class="flex-grow-1 text-right mr-4">
        <Button
          :disabled="actionDisabled"
          variant="link"
          class="continue-btn"
          @click="$emit('submit')"
        >
          {{ actionLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '~/components/common/Icon'
import Button from '~/components/common/Button'

export default {
  name: 'BulkSelectToolbar',

  components: { Icon, Button },

  props: {
    active: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => [],
    },
    actionDisabled: {
      type: Boolean,
      default: false,
    },
    unitLabel: {
      type: String,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
    actionLabel: {
      type: String,
      default: null,
    },
    successMessage: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      successLabel: null,
    }
  },

  watch: {
    successMessage (val) {
      if(val && typeof val === 'string'){
        this.successLabel = val
      }
    }
  },

  methods: {
    showSuccess(label) {
      this.successLabel = label
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bulk-select-toolbar-wrapper
  @include body-4-normal
  background-color: $color-black-7
  color: $color-white-1
  font-family: $font-sp-pro
  display: flex
  align-items: center
  z-index: 4
  padding: 13px 0 12px
  border-radius: 4px 4px 0px 0px
  position: sticky
  bottom: 0
  margin: 0 -51px
  width: auto

  .btn
    @include body-4-normal
    color: $color-white-1
    font-family: $font-sp-pro
    color: $white
    &.continue-btn
      border: 1px solid $white
      border-radius: 7px
      width: 159px
      height: 33px

.error-msg
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-regular
  color: $color-red-3
  background: $color-white-1

</style>
