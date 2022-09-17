<template>
  <div class="tags-input-root position-relative">
    <div
      class="d-flex flex-wrap align-items-center"
      :class="{
        [wrapperClass + ' tags-input']: true,
        active: isInputActive,
      }"
    >
      <span
        v-for="(tag, index) in innerTags"
        :key="index"
        class="
          tags-input-badge
          tags-input-badge-pill
          tags-input-badge-selected-default
        "
      >
        <slot
          name="selected-tag"
          :tag="tag"
          :index="index"
          @click.prevent.stop="remove(index)"
        >
          <span v-html="tag"></span>
          <a
            href="#"
            role="button"
            class="tags-input-remove d-inline-block position-absolute"
            @click.prevent.stop="remove(index)"
          ></a>
        </slot>
      </span>
      <!-- Input field -->
      <input
        v-if="!readOnly && !isLimit"
        ref="inputtag"
        v-model="newTag"
        type="email"
        class="new-tag ml-2 border-0"
        :placeholder="placeholder"
        @keydown.delete.stop="removeLastTag"
        @keyup.enter.stop="addNew"
        @blur="handleInputBlur"
        @keyup.space="handleOnSpace"
        @keydown.enter.prevent="addNew"
      />
      <!-- End of Input field -->
    </div>
  </div>
</template>

<script>
import { validate } from 'vee-validate'
export default {
  name: 'InputTags',

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    addTagsOnBlur: {
      type: Boolean,
      default: false,
    },
    addTagsOnSpace: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: -1,
    },
    allowDuplicates: {
      type: Boolean,
      default: false,
    },
    beforeAdding: {
      type: Function,
      default: () => true,
    },

    wrapperClass: {
      type: String,
      default: 'tags-input-wrapper-default',
    },
  },

  data() {
    return {
      newTag: '',
      isInputActive: false,
      innerTags: [...this.value],
    }
  },

  computed: {
    isLimit: (vm) => {
      return vm.limit > 0 && Number(vm.limit) === vm.innerTags.length
    },
  },

  watch: {
    value() {
      this.innerTags = [...this.value]
    },
  },

  methods: {
    /**
     * Focus.
     */
    focusNewTag() {
      if (this.readOnly || !this.$refs.inputtag) {
        return
      }
      this.$refs.inputtag.focus()
    },
    /**
     * Add tags on space
     */
    handleOnSpace() {
      if (!this.addTagsOnSpace) {
        return false
      }
      this.addNew()
    },
    handleInputFocus() {
      this.isInputActive = true
    },

    /**
     * Add a tag
     */
    addNew(e) {
      if (!this.addTagsOnSpace || !this.addTagsOnBlur) {
        return false
      }

      if (this.addTagsOnSpace) {
        if (this.newTag.endsWith(' ')) {
          // The space shouldn't actually be inserted
          this.newTag = this.newTag.trim()
        }
      }

      const tag = this.newTag
      // Validate the email input field.
      validate(tag, 'required|email').then((result) => {
        // If the input is valid.
        if (result.valid) {
          if (tag && (this.allowDuplicates || !this.innerTags.includes(tag))) {
            this.innerTags.push(tag)
            this.newTag = ''
            this.tagChange()

            e && e.preventDefault()
          }
        } else {
          return false
        }
      })
    },

    /**
     * Remove tag.
     */
    remove(index) {
      this.innerTags.splice(index, 1)
      this.tagChange()
    },

    /**
     * Remove last tag.
     */
    removeLastTag() {
      if (this.newTag) {
        return
      }
      this.innerTags.pop()
      this.tagChange()
    },

    /**
     * Process the onblur event.
     */
    handleInputBlur(e) {
      this.$emit('blur', e)
      if (this.addTagsOnBlur) {
        // Add the inputed tag
        this.addNew(e)
      }
    },

    tagChange() {
      this.$emit('update:tags', this.innerTags)
      this.$emit('input', this.innerTags)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
/* The input */
.tags-input

  & input
    flex: 1
    background: transparent

  & input:focus
    outline: none

  & input[type='text']
    color: $color-gray-19

  &-wrapper-default
    padding: 0.5em 0.25em
    max-height: 39px
    overflow: auto
    background: $color-white-1
    border: 1px solid transparent
    border-radius: 0.25em
    border-color: $light-gray

  &-wrapper-default.active
    border: 1px solid $color-blue-25
    box-shadow: 0 0 0 0.2em $color-blue-26
    outline: 0 none

  /* The tag badges & the remove icon */

  & span
    margin-right: 0.3em

  &-remove
    right: 0.3em
    top: 0.3em
    padding: 0.5em
    overflow: hidden
    background: $color-white-1
    border-radius: 50%

  &-remove:focus
    outline: none

  &-remove:before,

  &-remove:after
    content: ''
    position: absolute
    width: 75%
    left: 0.15em
    background: $color-black-1
    height: 2px
    margin-top: -1px

  &-remove:before
    transform: rotate(45deg)

  &-remove:after
    transform: rotate(-45deg)

  /* Tag badge styles */

  &-badge
    position: relative
    display: inline-block
    padding: 0.25em 0.4em
    @include body-5-bold
    text-align: center
    white-space: nowrap
    vertical-align: baseline
    border-radius: 0.25em
    overflow: hidden
    text-overflow: ellipsis

  &-badge-pill
    padding-right: 1.25em
    padding-left: 0.6em
    border-radius: 10em

  &-badge-pill.disabled
    padding-right: 0.6em

  &-badge-selected-default
    color: $color-black-6
    background: $color-white-15
    border-radius: 4px
</style>