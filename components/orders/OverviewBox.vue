<template>
    <div class="overview-box col align-middle mx-1">
        <div class="d-md-flex d-block h-100">
            <div class="box-icon d-none d-md-block"><img :src="icon" alt=""></div>
            <div class="text-md-left text-center d-flex d-md-block flex-column justify-content-between h-100">
                <div class="box-title">{{ label }}</div>
                <div class="box-value">${{ value.toFixed(2) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OverviewBox',
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: '---'
        },
        icon: {
            type: String,
            default: require('~/assets/img/orders/total-sales.svg')
        }
    }
}
</script>

<style scoped lang="sass">
@import '/assets/css/variables'

.overview-box
    height: 81px
    background: $white
    border-radius: 10px
    padding: 20px

.box-icon
    margin-right: 20px

.box-title
    font-family: $font-family-sf-pro-display
    font-weight: $regular
    @include body-8

.box-value
    font-family: $font-montserrat
    @include body-1-bold

@media (max-width: 992px)
    .overview-box
      box-shadow: inset 0px 1px 4px #FFFFFF
      filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.31))
      border-radius: 8px
      padding: 10px

    .box-title
      font-family: $font-montserrat
      color: #4A4A4A
      font-size: 12px

    .box-value
        font-size: 15px

</style>
