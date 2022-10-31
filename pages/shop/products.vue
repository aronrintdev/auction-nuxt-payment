<template>
  <div>
    <p v-if="$fetchState.pending">Fetching planets....</p>
    <p v-else-if="$fetchState.error">Error while fetching planets</p>
    <ul v-else>
      <li v-for="planet in planets" :key="planet.slug">
        <NuxtLink :to="planet.slug">
          {{ planet.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  layout: 'IndexLayout',
  fetchOnServer: false,
  async fetch() {
    this.planets = await fetch('https://api.nuxtjs.dev/planets').then((res) =>
      res.json()
    )
  },
  data() {
    return {
      planets: [],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-shop
  @media (min-width: 1024px)
    .scroll-to-top
      display: flex !important
      bottom: -100px
      right: 60px
      border: 2px solid $color-blue-20
      width: 40px
      aspect-ratio: 1
      z-index: 1020
      transition: 0.5s all ease-in-out
      &.scrolled
        bottom: 40px
  .no-items-found
    img
      width: 130px
    &-title
      @include heading-7
      color: $color-gray-5
      font-family: $font-sp-pro
    &-subtitle
      @include body-1-regular
      font-family: $font-sp-pro
      color: $black
::v-deep .section-header
  @media (max-width: 576px)
    margin: 30px 12.5px
</style>
  