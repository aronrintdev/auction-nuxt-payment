<template>
  <b-container fluid class="container-heatcheck">
    <div v-if="loading" class="loading">
      <div class="spinner-border text-light" role="status">
        <span class="sr-only">{{ $t('heatcheck.Loading') }}</span>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-md-6 mt-4 heat-certified">
          <h3
            class="justify-content-start"
            :class="statusClass[heatCheck.status]"
          >
            {{ heatCheck.status }}
          </h3>
          <h3 class="b-name">
            {{ heatCheck.product_detail.brand }}
          </h3>
          <p class="item-heading">{{ heatCheck.product_detail.name }}</p>
          <div class="ls"></div>
          <div class="p-detail mb-5">
            <h5 class="item-heading mb-2">
              {{ $t('heatcheck.product_approve.product_details') }}
            </h5>
            <p>{{ $t('heatcheck.size') }} {{ heatCheck.size_id }}</p>
            <p>{{ $t('heatcheck.sku') }} {{ heatCheck.product_detail.sku }}</p>
            <p>
              {{ $t('heatcheck.product_approve.colorway') }}:
              {{ heatCheck.product_detail.colorway }}
            </p>
          </div>
          <div class="date mt-2">
            <span :class="statusClass[heatCheck.status]">{{
              getDate(heatCheck.created_at, 'day')
            }}</span>
            <span>/{{ getDate(heatCheck.created_at, 'month') }}</span>
            <span>/{{ getDate(heatCheck.created_at, 'year') }}</span>
          </div>
        </div>
        <div class="col-md-6 pr-4">
          <div class="text-right">
            <div class="share-icon">
              <img
                src="~/assets/img/icons/profile/share.png"
                alt=""
                @click="revertShareBox"
              />
            </div>
            <div v-if="ShareBox" id="share_dropdown" class="social-dropdown">
              <h5>{{ $t('heatcheck.share') }}</h5>
              <div class="icons">
                <a href=""
                  ><img src="~/assets/img/icons/profile/twitter.png"
                /></a>
                <a href=""><img src="~/assets/img/icons/profile/fb.png" /></a>
                <a href=""
                  ><img src="~/assets/img/icons/profile/instagram.png"
                /></a>
                <label
                  ><img
                    src="~/assets/img/icons/profile/link.png"
                    @click="revertLinkBox"
                /></label>
              </div>
            </div>
            <div
              v-if="LinkBox"
              id="link_box"
              class="input-group url-field my-3"
            >
              <input
                id="urlAddress"
                type="text"
                class="form-control"
                placeholder="https://deadstock.com/2567"
                value="https://deadstock.com/2567"
                aria-label="https://deadstock.com/2567"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <span
                  id="basic-addon2"
                  class="input-group-text"
                  @click="copyText()"
                  @mouseout="
                    tooltipText = $t('heatcheck.product_approve.copy_text')
                  "
                  >{{ $t('heatcheck.product_approve.copy') }}</span
                >
                <b-tooltip target="basic-addon2">{{ tooltipText }}</b-tooltip>
              </div>
            </div>
          </div>
          <div
            class="text-right passed inconclusive notVerify failed pending mt-5"
          >
            <img :src="imagesAddress[heatCheck.status]" alt="" />
          </div>
          <div class="main-img mx-auto">
            <img
              :src="heatCheck.product_detail.image"
              alt=""
              class="main-product-image"
            />
          </div>
        </div>
      </div>
      <!-- Resubmit Confirm Modal Close -->
      <div class="row-border mt-5"></div>
      <carousel
        v-if="heatCheck.images.length > 0"
        class="carousel shop-by-brand slide-fade"
        :loop="true"
        :nav="true"
        :margin="10"
        :responsive="{ 0: { items: 3 }, 600: { items: 3 }, 1000: { items: 5 } }"
      >
        <div v-for="image in heatCheck.images" :key="image.id" class="item">
          <img :src="image.url" height="180" width="100%" />
          <p class="item-description">{{ image.name }}</p>
        </div>
      </carousel>
    </div>
  </b-container>
</template>
<script>
export default {
  name: 'Public',
  layout: 'IndexLayout',
  data() {
    return {
      tooltipText: 'Copy text',
      category: 'all',
      action: 'none',
      hasSearchResult: false,
      apiUrl: process.env.API_URL,
      searchText: null,
      itemId: '',
      heatCheck: {
        created_at: '',
        category_id: '',
        product_detail: {},
        images: {},
      },
      loading: false,
      shareDescription: this.$t('wish_lists.share_description'),
      shareUrl: process.env.APP_URL + '/wish-lists/',
      ShareBox: false,
      LinkBox: false,
      type: '',
      statusClass: {
        Pending: 'pending',
        Passed: 'passed',
        Failed: 'failed',
        Draft: 'draft',
        Inconclusive: 'inconclusive',
        'Cannot Verify': 'notVerify',
      },
      imagesAddress: {
        Pending:
          'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/pending.png',
        Passed:
          'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/status.png',
        Failed:
          'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/failed.png',
        Inconclusive:
          'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/inconclusive.png',
        'Cannot Verify':
          'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/cannotverify.png',
      },
      additionalImages: [],
      notSubmitImages: [
        {
          name: 'DATE STAMP',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/date-stamp-new.png',
        },
        {
          name: 'SHOE INSERT',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/show-insert-new.png',
        },
        {
          name: 'LACE BAGS',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/lace-bag-new.png',
        },
        {
          name: 'HANG TAGS',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/hang-tag-new.png',
        },
        {
          name: 'MISC',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/top.png',
        },
      ],
    }
  },
  mounted() {
    // After component mounted load brands array
    this.init()
  },

  methods: {
    init() {
      this.itemId = this.$route.query.id
      this.ItemDetail()
    },

    // Get Previous Page selected Detail
    ItemDetail() {
      this.loading = true
      this.$axios
        .get(`/heatchecks/${this.itemId}/detail`)
        .then((response) => {
          this.heatCheck = response.data

          const additionaImages = [
            'DATE STAMP',
            'SHOE INSERT',
            'LACE BAGS',
            'HANG TAGS',
            'MISC 9876',
            'FOOTBED',
          ]
          this.additionalImages = response.data.images.filter((image) =>
            additionaImages.includes(image.name)
          )
          this.additionalImages.forEach((element) => {
            element.setBorder = 'image position-relative text-center'
          })

          // Filter addtional images that user not submitted
          const selectedAdditionalImages = this.additionalImages.map(
            (o) => o.name
          )
          const filtered = this.notSubmitImages.filter(
            (row) => !selectedAdditionalImages.includes(row.name)
          )
          this.notSubmitImages = filtered
          this.notSubmitImages.forEach((element) => {
            element.setBorder = 'image position-relative text-center'
          })
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },

    // Copy share url value
    copyText() {
      const copyText = document.getElementById('urlAddress')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      navigator.clipboard
        .writeText(copyText.value)
        .then(() => {
          this.tooltipText = 'Copied'
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },

    revertShareBox() {
      if (this.LinkBox === true) {
        this.LinkBox = false
      }
      this.ShareBox = !this.ShareBox
    },
    revertLinkBox() {
      this.LinkBox = !this.LinkBox
    },
    getDate(val, type) {
      const myArray = val.split('/')
      if (type === 'day') {
        return myArray[1]
      } else if (type === 'month') {
        return myArray[0]
      } else {
        return myArray[2]
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'
.container-heatcheck
  max-width: 100%

.b-name
  font-family: $font-family-futura
  font-style: normal
  font-weight: $normal
  font-size: 68px
  line-height: 90px
  letter-spacing: 0.22em
  color: $color-gray-5
.item-heading
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 22px
  line-height: 29px
  letter-spacing: 0.09em
  color: $color-gray-28
.ls
  width: 30px
  border: 4px solid $color-gray-5
  margin: 25px 0
.p-detail p
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  font-size: 14px
  line-height: 150%
  color: $color-black-1
  margin: 0

.date
  display: flex
  align-items: baseline

.date span:nth-child(2),
.date span:nth-child(3)
  font-family: $font-family-impact
  font-style: normal
  font-weight: $bolder
  font-size: 20px
  line-height: 24px
  letter-spacing: 0.045em
  color: $color-gray-5
.date span:first-child
  font-family: $font-family-impact
  font-style: normal
  font-weight: $bolder
  font-size: 36px
  line-height: 44px
  letter-spacing: 0.045em

.row-border
  border: 1px solid $color-gray-5
  height: 0px
.social-dropdown
  background: $color-white-1
  box-shadow: 0px 2px 4px $color-black-rgb2
  border-radius: 12px
  width: 190px
  margin-left: auto
  text-align: left
  padding: 10px 15px
#share_dropdown
  position: absolute
  right: 0.5rem
#link_box
  position: absolute
  right: 0.5rem
  top: 7.7rem
.social-dropdown img
  margin-right: 12px
.main-img
  margin-top: -125px
  text-align: center
.url-field
  width: 300px
  margin-left: auto
.url-field input
  background: $color-white-1
  border: 0.5px solid $color-black-1
  box-sizing: border-box
  border-radius: 5px
.url-field span
  background: $color-blue-2
  border-radius: 0px 5px 5px 0px
  color: $color-white-1
  padding:8px 12px 6px 12px
.plus-icon
  text-align: right
  display: block
.red-border
  border: 1px solid $color-red-3
  box-sizing: border-box
  border-radius: 5px
.collapseble button
  overflow-anchor: none
  background: none
  border: none
  padding-left: 0
.passed
  color: $color-green-3
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
  text-transform: uppercase
.inconclusive
  color: $color-gray-4
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
  text-transform: uppercase
.notVerify
  color: $color-red-rgb1
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
  text-transform: uppercase
.failed
  color: $color-red-rgb1
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
  text-transform: uppercase
.pending
  color: $color-red-rgb1
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 48px
  text-transform: uppercase
.draft
  color: $color-blue-2
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
  text-transform: uppercase
.auth-numb
  font-style: normal
  font-weight: $bold
  font-size: 16px
  line-height: 19px
  text-decoration-line: underline
  color: $color-black-1
  padding-top: 10px

.passed, .draft, .failed, .notVerify, .pending, .inconclusive
  display: flex
  justify-content: flex-end
  align-items: center
  text-align: center

.id
    display: flex
    justify-content: center
    align-items: center
    padding-top: 50px

.id p:hover
  cursor: pointer
  color: $color-gray-6

.container-heatcheck td.prod-img img
    width: 100px
    height: 100%

.status-date
  padding-top: 50px

.product-decription
  display: flex
  justify-content: center

.pending
    padding-top: 35px

.width-17
    width: 17%

.width-10
    width: 10%

.center
    text-align: center

.share-icon img:hover
  cursor: pointer

.item-description
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 21px
  text-align: center
  color: $color-black-1
  margin-top: 15px

.main-product-image
  height: 350px
  width: 350px
</style>
