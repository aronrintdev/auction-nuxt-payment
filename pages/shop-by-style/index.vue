<template>
  <div class="container container-shop-by-style h-auto">
    <div class="d-none d-sm-block">
      <div class="text-right mr-5">
        <Button
          to="/shop-by-style/archive"
          variant="link"
          class="btn-draft"
          underlinedText
          >{{ $t('shop_by_style.archive') }} ({{ styleCount }})</Button
        >
      </div>
      <div class="d-flex justify-content-between align-items-center mmt-8">
        <h2 class="title">{{ $t('shop_by_style.title') }}</h2>
      </div>

      <div class="text-center position-relative d-flex offset-sm-4 mt-10">
        <NavGroup
          v-model="type"
          :data="typeOptions"
          nav-key="shop-by-style-type"
          class="mt-0 w-345"
          @change="handleTypeChange"
        />
        <Button
          ref="btnFilter"
          v-b-toggle.collapse-filters
          variant="light"
          size="lg"
          class="btn-filters position-absolute top-0"
        >
          {{ $tc('common.filter', 1) }}
        </Button>
      </div>

      <b-collapse v-if="filters" id="collapse-filters">
        <ShopByStyleFilter
          class="mt-3"
          @close="closeFilter()"
          @apply="applyFilter"
        />
      </b-collapse>
    </div>
    <div class="d-block d-sm-none">
      <ResponsivenessFilter :currentType="type" @renderStyles="getStyles" />
    </div>
    <div v-if="type === 'look'" class="styles-grid mt-1 look-view">
      <div
        v-for="(style, index) in styles"
        :key="index"
        class="p-0 mobile-styles"
      >
        <ShopByStyleCard
          :style-id="style.id"
          :image-url="style.image"
          class="style-card"
        ></ShopByStyleCard>
      </div>
    </div>
    <div v-else class="styles-grid mt-1 mobile-styles look-view">
      <template v-for="(style, index) in styles">
        <div v-if="index == 1" :key="index" class="p-0 mobile-styles">
          <ShopByStyleCard
            :style-id="style.id"
            :image-url="style.image"
            class="style-card"
          />
        </div>
      </template>
      <template v-for="(style, index) in styles">
        <div v-if="index != 1" :key="index" class="mobile-styles">
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
import { Button } from '~/components/common'
import NavGroup from '~/components/shop-by-style/StyleNav'
import ShopByStyleFilter from '~/components/shop-by-style/Filter'
import ShopByStyleCard from '~/components/shop-by-style/Card'
import { TYPE } from '~/static/constants/shop-by-style'
import ResponsivenessFilter from '~/components/shop-by-style/ResponsivenessFilter'

export default {
  components: {
    NavGroup,
    Button,
    ShopByStyleFilter,
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
          label: this.$tc('home.trending', 2),
          value: 'grid',
        },
        {
          label: this.$tc('common.best_seller', 2),
          value: 'best_seller',
        },
      ],
      page: 1,
      perPage: null,
      styles: null,
      styleCount: 0,
      filters: false,
    }
  },

  mounted() {
    this.fetchStyles()
    this.fetchStyleStatusCount()
  },

  methods: {
    getStyles(stylesList) {
      this.styles = stylesList
    },
    // fetch styles as per selected category
    async fetchStyles(filters = '') {
      await this.$axios
        .get('shop-by-style', {
          params: {
            selectedType: this.type,
            pageName: 'BROWSE',
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

    // fetch styles count by passing a status name
    fetchStyleStatusCount() {
      this.$axios
        .get('/shop-by-style/count')
        .then((res) => {
          this.styleCount = res.data.archived
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

    applyFilter(filters) {
      this.fetchStyles(filters)
    },

    closeFilter() {
      this.$refs.btnFilter.$el.click()
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.styles-grid
  display: grid
  grid-template-columns: repeat(5, 182px)
  @media (max-width: 576px)
    margin: 0 16px
    grid-template-columns: repeat(3, 115px)


.mt-10
  margin-top: 10px
.w-345
  width: 345px
.mmt-8
  margin-top: -8px
.look-view
  @media (min-width: 576px)
    margin: 0 178px !important
.container-shop-by-style
  max-width: 1440px
  padding: 64px 86px 64px 87px

  .title
    @include heading-2
    font-weight: $medium
    text-transform: none
  .archive
    font-size: 16px

  .btn-filters
    right: 0
    width: 179px
    margin-top: -5px
    font-weight: $normal
    font-size: 16px

  .row
    > div
      .style-card
        margin-bottom: 20px

@media (max-width: 768px)
  .container-shop-by-style
    .btn-filters
      margin-top: 10px
      position: relative !important

@media (max-width: 576px)
  .container-shop-by-style
    padding: 0
@media (max-width: 460px)
  .container-shop-by-style
    .row
      > div
        .style-card
          margin-bottom: 0
</style>
