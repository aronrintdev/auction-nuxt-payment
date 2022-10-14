<template>
  <div class="sneaker-reward-page vh-100">
    <div class="d-flex align-items-center ">
      <MobileSearchInput class="flex-grow-1" @input="searchChanged"/>
      <filter-svg class="ml-3" role="button"
                  @click="mobileFiltersOpen = !mobileFiltersOpen"></filter-svg>
    </div>

    <div class="d-flex flex-column">
      <div class="title">
        {{ $t('rewards.sneaker_page.claim') }}
      </div>
      <div class="desc">
        {{ $t('rewards.sneaker_page.select') }}
      </div>
    </div>


    <MobileBottomSheet
        :height="'90%'"
        :open="mobileFiltersOpen"
        :title="$t('rewards.sneaker_page.filter_by').toString()"
        @closed="mobileFiltersOpen = false"
        @opened="mobileFiltersOpen = true"
    >
      <template #default>
        <div class="d-flex flex-column align-items-center justify-content-between h-88 w-100 filters">
          <div>

          </div>
          <div class="w-100 d-flex justify-content-between">
            <Button
                class="filter-button"
                pill
                variant="outline-dark"
                @click="mobileFiltersOpen = false"
            >
              {{ $t('notifications.reset') }}
            </Button>

            <Button
                :disabled="loading"
                class="filter-button apply-filters"
                pill
                variant="dark-blue"
                @click="getInventories"
            >
              {{ $t('notifications.apply_filters') }}
            </Button>
          </div>
        </div>
      </template>
    </MobileBottomSheet>
  </div>
</template>

<script>
import MobileSearchInput from '~/components/mobile/MobileSearchInput';
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import Button from '~/components/common/Button';

export default {
  name: 'SneakerReward',
  components: {Button, MobileBottomSheet, MobileSearchInput, filterSvg},
  layout: 'Profile',
  data() {
    return {
      loading: false,
      mobileFiltersOpen: false,
      search: ''
    }
  },
  methods: {
    searchChanged(s) {
      this.search = s
    },
    getInventories() {

    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.sneaker-reward-page
  background-color: $color-white-1
  padding: 7px 16px

  .title
    margin-top: 32px
    @include body-17-bold
    font-family: $font-montserrat

  .desc
    margin-top: 2px
    @include body-1424
    font-weight: $regular
    font-family: $font-family-sf-pro-display
    color: $color-gray-4

.filters
  padding: 28px 21px

.h-88
  height: 92%

</style>
