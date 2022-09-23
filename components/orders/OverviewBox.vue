<template>
    <div class="overview-box col align-middle mx-1">
        <div class="d-md-flex d-block">
            <div class="box-icon d-none d-md-block"><img :src="icon" alt=""></div>
            <div class="text-md-left text-center">
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
@import 'bootstrap/scss/functions'
@import 'bootstrap/scss/variables'
@import 'bootstrap/scss/mixins'
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


@include media-breakpoint-down(md)
    .overview-box
        padding: 10px

    .box-title
        font-size: 14px

    .box-value
        font-size: 15px

</style>
