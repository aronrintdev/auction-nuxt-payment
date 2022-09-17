<template>
  <button
    v-b-tooltip.hover
    :title="tooltipText"
    :class="`btn btn-${variant} ${block && 'btn-block'} ${pill && 'btn-pill'} ${
      blackText && 'black-text'
    } ${whiteText && 'white-text'} ${underlinedText && 'underlined-text'} ${
      size && 'btn-' + size
    } ${pressed === true && 'active'} ${!!iconOnly && 'btn-icon'} ${
      border && 'border-' + border
    }`"
    :disabled="disabled"
    @click="handleClick"
  >
    <Icon
      v-if="icon && iconPos === 'left'"
      :src="icon"
      :hoverSrc="iconHover"
      :width="iconWidth"
      :height="iconHeight"
      :class="`${!iconOnly && 'mr-2'} ${iconClass} icon`"
      disable-hover
      tabindex="-1"
    />
    <slot></slot>
    <Icon
      v-if="icon && iconPos === 'right'"
      :src="icon"
      :hoverSrc="iconHover"
      :width="iconWidth"
      :height="iconHeight"
      :class="`${!iconOnly && 'ml-2'} ${iconClass} icon`"
      disable-hover
      tabindex="-1"
    />
  </button>
</template>
<script>
import Icon from '~/components/common/Icon'

export default {
  name: 'Button',

  components: { Icon },

  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    block: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    blackText: {
      type: Boolean,
      default: false,
    },
    whiteText: {
      type: Boolean,
      default: false,
    },
    underlinedText: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null, // enum: ['sm', 'lg']
    },
    pressed: {
      type: Boolean,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    tooltipText: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
    iconHover: {
      type: String,
      default: null,
    },
    iconWidth: {
      type: [String, Number],
      default: 18,
    },
    iconHeight: {
      type: [String, Number],
      default: 18,
    },
    iconPos: {
      type: String,
      default: 'left', // 'left', 'right'
    },
    iconClass: {
      type: String,
      default: '',
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    border: {
      type: String,
      default: 'normal', // 'normal', 'thick'
    },
  },

  methods: {
    handleClick(event) {
      this.$emit('click', event)

      if (this.to) {
        this.$router.push(this.to)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/_variables';
@import '~/assets/css/common/buttons';

.btn {
  @include body-8-medium;
  cursor: pointer;
  user-select: none;
  height: $button-medium-height;
  padding: 0px 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.btn-pill {
    border-radius: 21px;
  }

  &.btn-block {
    display: block;
    width: 100%;
  }

  &.underlined-text {
    text-decoration: underline;
  }

  &.btn-blue {
    @include button-colors(
      $background: $color-blue-2,
      $foreground: $color-white-1,
      $border: $color-blue-2,
      $background-hover: $color-blue-2,
      $foreground-hover: $color-white-1,
      $border-hover: $color-blue-2,
      $background-active: $color-blue-2,
      $foreground-active: $color-white-1,
      $border-active: $color-blue-2,
      $background-disabled: $color-ui-primary-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-primary-disabled
    );
    border: 1px solid $color-blue-2;
  }

  &.btn-primary {
    @include button-colors(
      $background: $color-ui-primary,
      $foreground: $color-white-1,
      $border: $color-ui-primary,
      $background-hover: $color-ui-primary-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-primary,
      $background-active: $color-ui-primary-dark,
      $foreground-active: $color-white-1,
      $border-active: $color-ui-primary-dark,
      $background-disabled: $color-ui-primary-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-primary-disabled
    );
    border: 1px solid $color-ui-primary;
  }

  &.btn-primary-color-disabled {
    @include button-colors(
      $background: $color-ui-primary-disabled,
      $foreground: $color-white-1,
      $border: $color-ui-primary-disabled,
      $background-hover: $color-ui-primary-disabled,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-primary-disabled,
      $background-active: $color-ui-primary-disabled,
      $foreground-active: $color-white-1,
      $border-active: $color-ui-primary-disabled,
      $background-disabled: $color-ui-primary-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-primary-disabled
    );
    border: 1px solid $color-ui-primary-disabled;
  }

  &.btn-outline-primary {
    @include button-colors(
      $background: $color-transparent,
      $foreground: $color-ui-primary,
      $border: $color-ui-primary,
      $background-hover: $color-ui-primary-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-primary-hover,
      $background-active: $color-transparent,
      $foreground-active: $color-ui-primary-dark,
      $border-active: $color-ui-primary-dark,
      $background-disabled: $color-transparent,
      $foreground-disabled: $color-ui-primary-disabled,
      $border-disabled: $color-ui-primary-disabled
    );
    border: 1px solid $color-ui-primary;
  }

  &.btn-secondary {
    @include button-colors(
      $background: $color-ui-secondary,
      $foreground: $color-white-1,
      $border: $color-ui-secondary,
      $background-hover: $color-ui-secondary-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-secondary,
      $background-active: $color-ui-secondary-dark,
      $foreground-active: $color-white-1,
      $border-active: $color-ui-secondary-dark,
      $background-disabled: $color-ui-secondary-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-secondary-disabled
    );
    border: 1px solid $color-ui-secondary;
  }

  &.btn-outline-secondary {
    @include button-colors(
      $background: $color-transparent,
      $foreground: $color-ui-secondary,
      $border: $color-ui-secondary,
      $background-hover: $color-ui-secondary-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-secondary-hover,
      $background-active: $color-transparent,
      $foreground-active: $color-ui-secondary-dark,
      $border-active: $color-ui-secondary-dark,
      $background-disabled: $color-transparent,
      $foreground-disabled: $color-ui-secondary-disabled,
      $border-disabled: $color-ui-secondary-disabled
    );
    border: 1px solid $color-ui-secondary;
  }

  &.btn-danger {
    @include button-colors(
      $background: $color-ui-danger,
      $foreground: $color-white-1,
      $border: $color-ui-danger,
      $background-hover: $color-ui-danger-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-danger,
      $background-active: $color-ui-danger-dark,
      $foreground-active: $color-white-1,
      $border-active: $color-ui-danger-dark,
      $background-disabled: $color-ui-danger-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-danger-disabled
    );
    border: 1px solid $color-ui-danger;
  }

  &.btn-outline-danger {
    @include button-colors(
      $background: $color-white-1,
      $foreground: $color-ui-danger,
      $border: $color-ui-danger,
      $background-hover: $color-ui-danger-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-danger-hover,
      $background-active: $color-white-1,
      $foreground-active: $color-ui-danger-dark,
      $border-active: $color-ui-danger-dark,
      $background-disabled: $color-white-1,
      $foreground-disabled: $color-ui-danger-disabled,
      $border-disabled: $color-ui-danger-disabled
    );
    border: 1px solid $color-ui-danger;
  }

  &.btn-warning {
    @include button-colors(
      $background: $color-ui-warning,
      $foreground: $color-white-1,
      $border: $color-ui-warning,
      $background-hover: $color-ui-warning-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-warning-hover,
      $background-active: $color-ui-warning-dark,
      $foreground-active: $color-white-1,
      $border-active: $color-ui-warning-dark,
      $background-disabled: $color-ui-warning-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-warning-disabled
    );
    border: 1px solid $color-ui-warning;
  }

  &.btn-outline-warning {
    @include button-colors(
      $background: $color-white-1,
      $foreground: $color-ui-warning,
      $border: $color-ui-warning,
      $background-hover: $color-ui-warning-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-warning-hover,
      $background-active: $color-white-1,
      $foreground-active: $color-ui-warning-dark,
      $border-active: $color-ui-warning-dark,
      $background-disabled: $color-white-1,
      $foreground-disabled: $color-ui-warning-disabled,
      $border-disabled: $color-ui-warning-disabled
    );
    border: 1px solid $color-ui-warning;
  }

  &.btn-info {
    @include button-colors(
      $background: $color-ui-info,
      $foreground: $color-white-1,
      $border: $color-ui-info,
      $background-hover: $color-ui-info-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-info-hover,
      $background-active: $color-ui-info-dark,
      $foreground-active: $color-white-1,
      $border-active: $color-ui-info-dark,
      $background-disabled: $color-ui-info-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-info-disabled
    );
    border: 1px solid $color-ui-info;
  }

  &.btn-outline-info {
    @include button-colors(
      $background: $color-white-1,
      $foreground: $color-ui-info,
      $border: $color-ui-info,
      $background-hover: $color-ui-info-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-info-hover,
      $background-active: $color-white-1,
      $foreground-active: $color-ui-info-dark,
      $border-active: $color-ui-info-dark,
      $background-disabled: $color-white-1,
      $foreground-disabled: $color-ui-info-disabled,
      $border-disabled: $color-ui-info-disabled
    );
    border: 1px solid $color-ui-info;
  }

  &.btn-link {
    @include body-4-regular;
    color: $color-black-1;
    height: auto;
    padding: 0;
  }

  &.btn-dark {
    @include button-colors(
      $background: $color-ui-dark,
      $foreground: $color-white-1,
      $border: $color-ui-dark,
      $background-hover: $color-ui-dark-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-dark,
      $background-active: $color-ui-dark-dark,
      $foreground-active: $color-white-1,
      $border-active: $color-ui-dark-dark,
      $background-disabled: $color-ui-dark-disabled,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-ui-dark-disabled
    );
    border: 1px solid $color-ui-dark;
  }

  &.btn-outline-dark {
    @include button-colors(
      $background: $color-white-1,
      $foreground: $color-ui-dark,
      $border: $color-ui-dark,
      $background-hover: $color-ui-dark-hover,
      $foreground-hover: $color-white-1,
      $border-hover: $color-ui-dark,
      $background-active: $color-white-1,
      $foreground-active: $color-ui-dark-dark,
      $border-active: $color-ui-dark-dark,
      $background-disabled: $color-white-1,
      $foreground-disabled: $color-ui-dark-disabled,
      $border-disabled: $color-ui-dark-disabled
    );
    border: 1px solid $color-ui-dark;
  }

  &.btn-white {
    @include button-colors(
      $background: $color-ui-white,
      $foreground: $color-black-1,
      $border: $color-ui-white,
      $background-hover: $color-ui-white-hover,
      $foreground-hover: $color-black-1,
      $border-hover: $color-ui-white-hover,
      $background-active: $color-ui-white-dark,
      $foreground-active: $color-black-1,
      $border-active: $color-ui-white-dark,
      $background-disabled: $color-ui-white-disabled,
      $foreground-disabled: $color-black-1,
      $border-disabled: $color-ui-white-disabled
    );
    border: 1px solid $color-ui-white;
  }

  &.btn-light {
    @include button-colors(
      $background: $color-ui-light,
      $foreground: $color-black-1,
      $border: $color-ui-light,
      $background-hover: $color-ui-light-hover,
      $foreground-hover: $color-black-1,
      $border-hover: $color-ui-light-hover,
      $background-active: $color-ui-light-dark,
      $foreground-active: $color-black-1,
      $border-active: $color-ui-light-dark,
      $background-disabled: $color-ui-light-disabled,
      $foreground-disabled: $color-black-1,
      $border-disabled: $color-ui-light-disabled
    );
    border: 1px solid $color-ui-white;
  }

  &.btn-light-gray {
    @include button-colors(
      $background: $color-gray-46,
      $foreground: $color-black-1,
      $border: $color-gray-46,
      $background-hover: $color-gray-23,
      $foreground-hover: $color-black-1,
      $border-hover: $color-gray-23,
      $background-active: $color-gray-46,
      $foreground-active: $color-black-1,
      $border-active: $color-gray-46,
      $background-disabled: $color-gray-23,
      $foreground-disabled: $color-black-1,
      $border-disabled: $color-gray-23
    );
    border: 1px solid $color-gray-46;
  }

  &.btn-dark-blue {
    @include button-colors(
      $background: $color-blue-20,
      $foreground: $color-white-1,
      $border: $color-blue-20,
      $background-hover: $color-blue-22,
      $foreground-hover: $color-white-1,
      $border-hover: $color-blue-22,
      $background-active: $color-blue-22,
      $foreground-active: $color-white-1,
      $border-active: $color-blue-22,
      $background-disabled: $color-blue-23,
      $foreground-disabled: $color-white-1,
      $border-disabled: $color-blue-23
    );
    border: 1px solid $color-blue-20;
  }

  &.btn-outline-dark-blue {
    @include button-colors(
      $background: $color-white-1,
      $foreground: $color-blue-20,
      $border: $color-blue-20,
      $background-hover: $color-blue-20,
      $foreground-hover: $color-white-1,
      $border-hover: $color-blue-20,
      $background-active: $color-white-1,
      $foreground-active: $color-blue-20,
      $border-active: $color-blue-20,
      $background-disabled: $color-white-1,
      $foreground-disabled: $color-blue-2,
      $border-disabled: $color-blue-2
    );
    border: 1px solid $color-blue-20;
  }
  &.btn-transparent {
    @include button-colors(
      $background: $color-white-1,
      $foreground: $color-black-1,
      $border: $color-gray-4,
      $background-hover: $color-white-1,
      $foreground-hover: $color-black-1,
      $border-hover: $color-gray-4,
      $background-active: $color-white-1,
      $foreground-active: $color-black-1,
      $border-active: $color-gray-4,
      $background-disabled: $color-white-1,
      $foreground-disabled: $color-black-1,
      $border-disabled: $color-gray-4
    );
    border: 1px solid $color-gray-4;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }

  &.btn-grey-light {
    @include button-colors(
      $background: $color-white-1,
      $foreground: $color-black-1,
      $border: $color-gray-4,
      $background-hover: $color-white-1,
      $foreground-hover: $color-black-1,
      $border-hover: $color-gray-4,
      $background-active: $color-white-1,
      $foreground-active: $color-black-1,
      $border-active: $color-gray-4,
      $background-disabled: $color-white-1,
      $foreground-disabled: $color-black-1,
      $border-disabled: $color-gray-4
    );
    border: 1px solid $color-gray-4;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }

  &.btn-icon {
    width: 40px;
    height: 40px;
    padding: 0;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

    &:hover,
    &:active,
    &:active:focus {
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    }
  }

  &:hover:not(:active):not(:focus) {
    .icon::v-deep {
      &.pointer-cursor {
        .icon-hovered {
          display: block;
        }

        .icon-default {
          display: none;
        }
      }
    }
  }

  &.btn-sm {
    @include body-5-medium;
    height: 30px;
  }

  &.border-normal {
    border-width: 1px;
  }

  &.border-thick {
    border-width: 3px;
  }

  &.black-text {
    color: $color-black-1;
  }

  &.white-text {
    color: $color-white-1;
  }
}
</style>
