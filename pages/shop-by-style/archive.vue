<template>
  <div class="container-shop-by-style mx-auto">
    <div class="d-none d-sm-block">
      <div class="d-flex justify-content-between align-items-center">
          <Button to="/shop-by-style"
              variant="link"
          >{{ $t('shop_by_style.back_to_featured_style') }}</Button>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <h2 class="title">{{ $t('shop_by_style.title_archive') }}</h2>
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
          class="btn-filters position-absolute"
        >
          {{ $tc('common.filter', 1) }}
        </Button>
      </div>

      <b-collapse  v-if="filters" id="collapse-filters">
        <ArchiveFilter
          class="mt-3"
          @close="closeFilter()"
          @apply="applyFilter"
        />
      </b-collapse>
    </div>
    <div class="d-block d-sm-none">
      <ResponsivenessFilter 
        :date="showDate"
      />
    </div>
    <b-row v-if="type === TYPE" class="mt-5 ml-0 mr-0">
      <b-col v-for="(style, index) in styles" :key="index" md="3" sm="6">
        <ShopByStyleCard
          :style-id="style.id"
          :image-url="style.image"
          class="style-card"
        ></ShopByStyleCard> 
      </b-col>
    </b-row>
    <b-row  v-else class="mt-5 ml-0 mr-0">
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
import ArchiveFilter from '~/components/shop-by-style/ArchiveFilter'
import ShopByStyleCard from '~/components/shop-by-style/Card'
import { ARCHIVED, TYPE } from '~/static/constants/shop-by-style'
import ResponsivenessFilter from '~/components/shop-by-style/ResponsivenessFilter'

export default {
  components: { NavGroup, Button, ArchiveFilter, ShopByStyleCard, ResponsivenessFilter },

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
          value: 'best_seller'
        }
      ],
      page: 1,
      perPage: null,
      styles: null,
      filters: null,
      showDate: true
    }
  },

  mounted() {
    this.fetchStyles()
  },

  methods: {
    // fetch styles as per selected category
    async fetchStyles() {
      await this.$axios
        .get('/shop-by-style', {
          params: {
            selectedType: this.type,
            status: ARCHIVED
          }
        })
        .then((res) => {
          this.styles = res.data.data
          if(this.styles.length) {
            this.filters = true
          }
        })
        .catch(error => {
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
    }
  }
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
    top: 0

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
      position: relative !important
      margin-top: 20px
      width: 200px
      max-width: 100%

@media (max-width: 576px)
  .container-shop-by-style
    padding: 0
</style>