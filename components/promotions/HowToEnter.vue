<template>
  <div :class="{'flex-column my-2 ': isScreenXS, 'my-5': !isScreenXS}"
       class=" d-flex align-items-center justify-content-center shop-now">
    <div :class="mobileClass" class="body-1-bold mx-3 header-text">{{ $t('promotions.how_to_enter') }}</div>
    <div :class="mobileClass" class="body-3-regular mx-3 subtitle-text">{{
        $t('promotions.how_to_enter_content')
      }}
    </div>
    <Button
        v-if="!isScreenXS"
        class="px-5 mx-3"
        to="/shop"
        variant="dark"
    >
      {{ $t('promotions.show_now') }}
    </Button>
  </div>
</template>
<script>
import Button from '~/components/common/Button'
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'PromotionsHowToEnter',
  components: {
    Button,
  },
  mixins: [screenSize]
};
</script>
<style lang="sass" scoped>
@import "~/assets/css/variables"
.header-text
  &.mobile
    @include body-28
    font-family: $font-montserrat
    font-style: normal
    font-weight: $bold
    color: $color-blue-22f

.subtitle-text
  &.mobile
    margin-top: 23px
    text-align: center
    width: 100%
    @include body-10
    font-family: $font-montserrat
    font-style: normal
    font-weight: $normal
    color: $color-black-1

</style>


