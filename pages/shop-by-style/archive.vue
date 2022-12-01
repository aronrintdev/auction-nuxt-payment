<template>
  <div class="container container-shop-by-style pb-5">
    <div class="d-none d-sm-block">
      <div class="d-flex justify-content-between align-items-center">
        <Button to="/shop-by-style" variant="link">{{
          $t('shop_by_style.back_to_featured_style')
        }}</Button>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-30">
        <h2 class="title mb-0">{{ $t('shop_by_style.title_archive') }}</h2>
      </div>

      <div class="d-flex align-items-center nav-group-wrapper">
        <NavGroup
          v-model="type"
          :data="typeOptions"
          nav-key="shop-by-style-type"
          @change="handleTypeChange"
        />

        <Button
          ref="btnFilter"
          v-b-toggle.collapse-filters
          variant="light"
          size="lg"
          class="filter-button"
        >
          {{ $tc('common.filter', 1) }}
        </Button>
      </div>

      <b-collapse v-if="filters" id="collapse-filters">
        <ArchiveFilter
          class="mt-3"
          @close="closeFilter()"
          @apply="applyFilter"
        />
      </b-collapse>
    </div>
    <div class="d-block d-sm-none"><ResponsivenessFilter :date="showDate" />
    </div>
    <div v-if="type === TYPE" class="styles-warpper">
      <div v-for="(style, index) in styles" :key="index">
        <ShopByStyleCard
          :style-id="style.id"
          :image-url="style.image"
          class="style-card"
        ></ShopByStyleCard>
      </div>
    </div>
    <div v-else class="styles-warpper">
      <template v-for="(style, index) in styles">
        <div v-if="index == 1" :key="index">
          <ShopByStyleCard
            :style-id="style.id"
            :image-url="style.image"
            class="style-card"
          />
        </div>
      </template>
      <template v-for="(style, index) in styles">
        <div v-if="index != 1" :key="index">
          <ShopByStyleCard
            :style-id="style.id"
            :image-url="style.image"
            class="style-card"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { NavGroup, Button } from '~/components/common'
import ArchiveFilter from '~/components/shop-by-style/ArchiveFilter'
import ShopByStyleCard from '~/components/shop-by-style/Card'
import { ARCHIVED, TYPE } from '~/static/constants/shop-by-style'
import ResponsivenessFilter from '~/components/shop-by-style/ResponsivenessFilter'

export default {
  components: {
    NavGroup,
    Button,
    ArchiveFilter,
    ShopByStyleCard,
    ResponsivenessFilter,
  },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {
      type: TYPE,
      typeOptions: [
        {
          label: this.$tc('common.all', 2),
          value: TYPE,
        },
        {
          label: this.$tc('common.best_seller', 2),
          value: 'best_seller',
        },
      ],
      page: 1,
      perPage: null,
      styles: null,
      filters: null,
      showDate: true,
    }
  },

  mounted() {
    this.fetchStyles()
  },

  methods: {
    // fetch styles as per selected category
    async fetchStyles(filters = '') {
      await this.$axios
        .get('/shop-by-style', {
          params: {
            selectedType: this.type,
            status: ARCHIVED,
            filters,
          },
        })
        .then((res) => {
          this.styles = res.data.data
          if (this.styles.length) {
            this.filters = true
          }
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
    },
    handleTypeChange(value) {
      this.type = value
      this.page = 1
      this.fetchStyles()
    },

    closeFilter() {
      this.$refs.btnFilter.$el.click()
    },

    applyFilter(filters) {
      this.fetchStyles(filters)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-shop-by-style
  @media (min-width: 576px)
    margin-top: 31px
  .mt-30
    margin-top: 30px
  .title
    @include heading-2
    font-weight: $medium
    text-transform: none
  .archive
    font-size: 16px

  .btn-filters
    right: 0
    top: 0

  .row
    margin-left: -27px
    margin-right: -27px

    > div
      padding-left: 27px
      padding-right: 27px

      .style-card
        margin-bottom: 70px
  .nav-group-wrapper
    margin-top: 10px
  .nav-group::v-deep
    margin: 0 auto
  .styles-warpper
    max-width: max-content
    margin: 0 auto
    display: grid
    grid-template-columns: repeat(5, 195px)
    row-gap: 8px
    margin-top: 74px
    @media (max-width: 576px)
      grid-template-columns: repeat(3, 115px)
      column-gap: 0
      margin-top: 0
  .filter-button
    width: 180px
    height: 46px
@media (max-width: 768px)
  .container-shop-by-style
    .btn-filters
      position: relative !important
      margin-top: 20px
      width: 200px
      max-width: 100%

@media (max-width: 576px)
  .container-shop-by-style
    padding: 0
</style>
