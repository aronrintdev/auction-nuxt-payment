<template>
  <div class="container-shop-by-style mx-auto vh-100">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title">{{ $t('shop_by_style.title') }}</h2>
      <Button
        to="/shop-by-style/archive"
        variant="link"
        class="btn-draft"
        underlinedText
        >{{ $t('shop_by_style.archive') }} {{ styleCount }}</Button
      >
    </div>

    <div class="text-center mt-1 position-relative pt-2">
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
        class="btn-filters position-absolute top-0"
      >
        {{ $tc('common.filter', 1) }}
      </Button>
    </div>

    <b-collapse id="collapse-filters">
      <ShopByStyleFilter
        class="mt-3"
        @close="closeFilter()"
        @apply="applyFilter"
      />
    </b-collapse>

    <b-row v-if="type === 'look'" class="mt-5">
      <b-col v-for="(style, index) in styles" :key="index" md="3" sm="6">
        <ShopByStyleCard
          :style-id="style.id"
          :image-url="style.image"
          class="style-card"
        ></ShopByStyleCard>
      </b-col>
    </b-row>
    <b-row v-else class="mt-5">
      <template v-for="(style, index) in styles">
        <b-col v-if="index == 1" :key="index" lg="6" md="8">
          <ShopByStyleCard
            :style-id="style.id"
            :image-url="style.image"
            class="style-card"
          />
        </b-col>
      </template>
      <template v-for="(style, index) in styles">
        <b-col v-if="index != 1" :key="index" lg="3" md="6">
          <ShopByStyleCard
            :style-id="style.id"
            :image-url="style.image"
            class="style-card"
          />
        </b-col>
      </template>
    </b-row>
  </div>
</template>
<script>
import { NavGroup, Button } from '~/components/common'
import ShopByStyleFilter from '~/components/shop-by-style/Filter'
import ShopByStyleCard from '~/components/shop-by-style/Card'
import { TYPE } from '~/static/constants/shop-by-style'

export default {
  components: { NavGroup, Button, ShopByStyleFilter, ShopByStyleCard },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {
      type: TYPE,
      typeOptions: [
        {
          label: this.$tc('common.look', 2),
          value: TYPE,
        },
        {
          label: this.$tc('common.outfit_grid', 2),
          value: 'grid',
        },
      ],
      page: 1,
      perPage: null,
      styles: null,
      styleCount: 0,
    }
  },

  mounted() {
    this.fetchStyles()
    this.fetchStyleStatusCount()
  },

  methods: {
    // fetch styles as per selected category
    async fetchStyles() {
      await this.$axios
        .get('shop-by-style', {
          params: {
            selectedType: this.type,
          },
        })
        .then((res) => {
          this.styles = res.data.data
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

    closeFilter() {
      this.$refs.btnFilter.$el.click()
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-shop-by-style
  max-width: 1440px
  padding: 80px 86px

  .title
    @include heading-2
    font-weight: $medium
    text-transform: none
  .archive
    font-size: 16px

  .btn-filters
    right: 0

  .row
    margin-left: -27px
    margin-right: -27px

    > div
      padding-left: 27px
      padding-right: 27px

      .style-card
        margin-bottom: 70px

@media (max-width: 768px)
  .container-shop-by-style
    .btn-filters
      position: relative
      margin-top: 20px
      width: 200px
      max-width: 100%

@media (max-width: 576px)
  .container-shop-by-style
    padding: 30px
</style>
