<template>
  <b-container fluid class="container-heatcheck">
    <div v-if="loading" class="loading">
      <div class="spinner-border text-light" role="status">
        <span class="sr-only">{{ $t('heatcheck.Loading') }}</span>
      </div>
    </div>
    <div>
      <nuxt-link to="/heat-check/listing" class="black-color">
        <i class="fa fa-angle-left mr-3"></i
        >{{ $t('heatcheck.product_approve.back_to_check_profile') }}
      </nuxt-link>

      <div class="row">
        <div class="col-md-6 mt-4 heat-certified">
          <h3
            id="justify-content-start"
            class="text-uppercase"
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
        <div class="col-md-6">
          <div v-if="heatCheck.status !== 'Pending'" class="text-right">
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
                  ><img src="~/assets/img/icons/profile/twitter.png" alt=""
                /></a>
                <a href=""
                  ><img src="~/assets/img/icons/profile/fb.png" alt=""
                /></a>
                <a href=""
                  ><img src="~/assets/img/icons/profile/instagram.png" alt=""
                /></a>
                <label
                  ><img
                    src="~/assets/img/icons/profile/link.png"
                    alt=""
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
                v-model="shareLink"
                type="text"
                class="form-control"
                placeholder="getShareLink"
                aria-label="https://deadstock.com/2567"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <span
                  id="basic-addon2"
                  class="input-group-text"
                  @click="copyText()"
                  @mouseout="tooltipText = 'Copy text'"
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
          <div class="main-img">
            <img
              :src="heatCheck.product_detail.image"
              alt=""
              height="350px"
              width="350px"
            />
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div
          v-if="resubmitHeatCheck && resubmitHeatCheck.images_status.length > 0"
          class="col-md-6"
        >
          <h5>{{ $t('heatcheck.product_approve.please_resubmit') }}:</h5>
          <div class="row flex-wrap">
            <div
              v-for="product in resubmitHeatCheck.images_status"
              :key="product.id"
              class="col-2 mr-2 p-0"
            >
              <div class="upload-icon">
                <label for="front" class="label"
                  ><i
                    class="fa fa-plus-circle plus-icon"
                    @click="
                      checkValue(
                        product.images.id,
                        product.images.name,
                        'resumitted',
                        product.heat_check_resubmission_id
                      )
                    "
                  ></i
                ></label>
                <input
                  id="front"
                  type="file"
                  class="d-none"
                  @change="uploadFile($event.target.files)"
                />
                <p class="item-img text-md-center">
                  <img :src="product.images.url" height="70px" width="80px" />
                </p>
              </div>
              <p class="title-items-populate text-md-center">
                {{ product.images.name }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="notSubmitImages.length > 0" class="col-md-6">
          <h5>{{ $t('heatcheck.product_approve.please_submit') }}:</h5>
          <div class="row">
            <div
              v-for="product in notSubmitImages"
              :key="product.name"
              class="col-2 mr-1"
            >
              <div class="upload-icon">
                <label for="front" class="label"
                  ><i
                    class="fa fa-plus-circle plus-icon"
                    @click="
                      checkValue(
                        0,
                        product.name,
                        'new',
                        product.heat_check_resubmission_id
                      )
                    "
                  ></i
                ></label>
                <input
                  id="front"
                  type="file"
                  class="d-none"
                  @change="uploadFile($event.target.files)"
                />
                <p class="item-img text-md-center">
                  <img :src="product.image" height="70px" width="80px" />
                </p>
              </div>
              <p class="title-items-populate text-md-center">
                {{ product.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="collapseble">
        <b-button v-b-toggle.collapse-3 class="m-1"
          >{{ $t('heatcheck.product_approve.more_detail') }}
          <i class="fa fa-angle-down"></i
        ></b-button>
        <b-collapse id="collapse-3" visible>
          <b-card>{{ heatCheck.notes }}</b-card>
          <div v-if="resubmitHeatCheck.comments !== ''">
            {{ $t('heatcheck.product_detail.admin_notes') }}
            <b-card>{{ resubmitHeatCheck.comments }}</b-card>
          </div>
        </b-collapse>
      </div>
      <div class="row">
        <div class="col-12 text-center my-4">
          <button v-b-modal.modal-submit class="bbg-btn">
            {{ $t('heatcheck.product_approve.resubmit_heat_check') }}
          </button>
        </div>
      </div>
      <!-- Resubmit Confirm Modal Start -->
      <b-modal
        id="modal-submit"
        hide-footer
        content-class="modal-submitasdfasdf"
      >
        <p class="my-4 modal-text">
          {{ $t('heatcheck.listing.sure_result') }}
        </p>
        <button
          ref="submitRequestModal"
          class="blue-btn"
          @click="updateHeatCheck()"
        >
          {{ $t('heatcheck.listing.submit') }}
        </button>
        <button class="black-btn" @click="$bvModal.hide('modal-submit')">
          {{ $t('heatcheck.listing.cancel') }}
        </button>
      </b-modal>
      <b-modal
        id="modal-submited"
        ref="submitSuccessModal"
        content-class="text-center modal-submited"
      >
        <p class="my-4">{{ $t('heatcheck.listing.heatcheck_submit') }}</p>
        <img :src="require(`~/assets/img/heat-submited.png`)" />
      </b-modal>

      <!-- Resubmit Confirm Modal Close -->
      <div class="clearfix">
        <p class="auth_text pull-left">
          {{ $t('heatcheck.product_approve.authentication_photos') }}
        </p>
      </div>
      <div class="row-border"></div>
      <div class="carosel mx-auto my-0">
        <carousel
          v-if="heatCheck.images.length > 0"
          class="carousel shop-by-brand slide-fade"
          :loop="false"
          :nav="true"
          :margin="10"
          :responsive="{
            0: { items: 3 },
            600: { items: 3 },
            1000: { items: 5 },
          }"
        >
          <div
            v-for="image in heatCheck.images"
            :key="image.id"
            class="item mr-1"
          >
            <img :src="image.url" height="180" width="100%" />
            <p class="item-description">{{ image.name }}</p>
          </div>
        </carousel>
      </div>
      <div v-if="otherheatCheck.length > 0" class="products_table">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col" class="width-17 center">
                {{ $t('heatcheck.listing.heat_check_id') }}
              </th>
              <th scope="col" class="width-10 center">
                {{ $t('heatcheck.listing.product') }}
              </th>
              <th scope="col" class="center">
                {{ $t('heatcheck.detail') }}
              </th>
              <th scope="col" class="width-10 center">
                {{ $t('heatcheck.listing.date') }}
              </th>
              <th scope="col" class="width-17 center">
                {{ $t('heatcheck.listing.status') }}
              </th>
            </tr>
          </thead>
          <tbody class="table_body">
            <tr
              v-for="product in otherheatCheck"
              :key="product.id"
              class="tbody_row"
            >
              <th
                class="id"
                scope="row alignment"
                @click="productApprove(product.id)"
              >
                <p>#{{ product.id }}</p>
              </th>
              <td class="prod-img">
                <img :src="product.product_detail.image" alt="" />
              </td>
              <td
                class="product-decription d-flex justify-content-center align-items-center"
              >
                <tr>
                  <h4 class="pro-heading">{{ product.product_detail.name }}</h4>
                  <p class="parah">
                    {{ $t('heatcheck.sku') }}: {{ product.product_detail.sku }}
                  </p>
                  <p class="pro-size-color">
                    {{ $t('heatcheck.color') }}:
                    {{ product.product_detail.colorway }}
                  </p>
                </tr>
              </td>
              <td class="status-date">
                {{ product.product_detail.created_at }}
              </td>
              <td :class="statusClass[product.status]">
                <div>
                  {{ product.status }}
                  <div
                    v-if="product.status === draft"
                    class="complete_draft d-flex justify-content-start align-items-center"
                    @click="completeCheck(item.id)"
                  >
                    <label
                      >{{ $t('heatcheck.heatcheck_complete') }}
                      <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </label>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </b-container>
</template>
<script>
import S3 from 'aws-s3'
import { HEATCHECK_STATUS_DRAFT } from '~/static/constants'

export default {
  name: 'ProductApprove',
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      tooltipText: 'Copy text',
      category: 'all',
      action: 'none',
      hasSearchResult: false,
      apiUrl: process.env.API_URL,
      searchText: null,
      draft: HEATCHECK_STATUS_DRAFT,
      itemId: '',
      heatCheck: {
        status: '',
        created_at: '',
        category_id: '',
        product_detail: {},
        images: {},
      },
      otherheatCheck: [],
      resubmitHeatCheck: { comments: '', images_status: [] },
      products: [],
      selected: [],
      currentPage: 1,
      perPage: 0,
      totalCount: 0,
      loading: false,
      ShareBox: false,
      LinkBox: false,
      resubmitSelectId: '',
      resubmitData: [],
      selectedName: '',
      type: '',
      heat_check_resubmission_id: 0,
      statusClass: {
        Pending: 'pending',
        Passed: 'passed',
        Failed: 'failed',
        Draft: 'draft',
        'Pending Payment': 'Pending-payment',
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
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/datestamp.svg',
        },
        {
          name: 'SHOE INSERT',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/shoe-insert.svg',
        },
        {
          name: 'LACE BAGS',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/lace-bag.svg',
        },
        {
          name: 'HANG TAGS',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/hangtag.svg',
        },
        {
          name: 'MISC',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/mice.svg',
        },
      ],
      additionalImagesNames: [
        'DATE STAMP',
        'SHOE INSERT',
        'LACE BAGS',
        'HANG TAGS',
        'MISC',
      ],
      shareLink: '',
    }
  },
  computed: {
    config() {
      return {
        bucketName: process.env.AWS_BUCKET,
        dirName: process.env.DIRNAME_HEATCHECK,
        region: process.env.AWS_DEFAULT_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    },
    S3Client() {
      return new S3(this.config)
    },
  },
  mounted() {
    // After component mounted load brands array
    this.init()
  },

  methods: {
    init() {
      this.itemId = this.$route.query.id
      this.ItemDetail()
      this.OtherItemDetails()
      this.getResubmitHeatCheck()
      this.getShareLink()
    },
    // Redirect to detail page
    productApprove(id) {
      this.$route.query.id = id
      this.$router.push({
        path: `/heat-check/product-detail?id=${id}`,
      })
      this.init()
    },

    show() {
      this.$viewerApi({
        images: this.heatCheck.images,
      })
    },

    // Open file input form
    openFileUploader() {
      this.$refs.input_file.click()
    },

    // Products dropdown "Click" event listener
    selectProduct(sku) {
      const index = this.products.findIndex((p) => p.sku === sku)
      this.product = this.products[index]
      this.hasSearchResult = false
    },

    // Get Previous Page selected Detail
    ItemDetail() {
      this.loading = true
      this.$axios
        .get(`/heatchecks/${this.itemId}/detail`)
        .then((response) => {
          this.heatCheck = response.data

          this.additionalImages = response.data.images.filter((image) =>
            this.additionalImagesNames.includes(image.name)
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

    OtherItemDetails() {
      this.loading = true
      this.$axios
        .get(`/heatchecks/${this.itemId}/get-other`)
        .then((response) => {
          this.otherheatCheck = response.data.data
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },

    getResubmitHeatCheck() {
      this.loading = true
      this.$axios
        .get(`/heatchecks/${this.itemId}/resubmit-images`)
        .then((response) => {
          if (response.data?.id > 0) this.resubmitHeatCheck = response.data
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },

    checkValue(id, name, type, heatCheckResubmissionId) {
      this.type = type
      this.resubmitSelectId = id
      this.selectedName = name
      this.heat_check_resubmission_id = heatCheckResubmissionId
    },

    newFileName() {
      return Math.random().toString().slice(2)
    },

    // upload file to Amazon S3 bucket
    uploadFile(files) {
      if (this.type === 'resumitted') {
        const indexFind = this.resubmitHeatCheck.images_status.findIndex(
          ({ images }) => images.id === this.resubmitSelectId
        )

        if (indexFind !== -1) {
          const file = files[0]
          const S3Client = new S3(this.config)
          S3Client.uploadFile(file, this.newFileName())
            .then((data) => {
              this.resubmitHeatCheck.images_status[indexFind].images.url =
                data.location
              this.resubmitData.push({
                name: this.resubmitHeatCheck.images_status[indexFind].images
                  .name,
                url: data.location,
                type: 'resubmit',
                id: this.resubmitSelectId,
                heat_check_resubmission_id: this.heat_check_resubmission_id,
              })
            })
            .catch((err) => {
              this.$toasted.error(this.$t(err.response.data.error))
            })
        }
      } else {
        const indexFind = this.notSubmitImages.findIndex(
          (element) => element.name === this.selectedName
        )
        if (indexFind !== -1) {
          const file = files[0]
          const S3Client = new S3(this.config)
          S3Client.uploadFile(file, this.newFileName())
            .then((data) => {
              this.notSubmitImages[indexFind].image = data.location
              this.resubmitData.push({
                name: this.selectedName,
                url: data.location,
                type: 'new',
              })
            })
            .catch((err) => {
              this.$toasted.error(this.$t(err))
            })
        }
      }
    },

    // update new user selected images to database
    updateHeatCheck() {
      // this.loading = true;
      this.$root.$emit('bv::hide::modal', 'modal-submit', '#submitRequestModal')
      this.$axios
        .put(`/heatchecks/${this.itemId}/resubmit-images`, {
          id: this.itemId,
          images: this.resubmitData,
        })
        .then((res) => {
          this.init()
          this.loading = false
          this.$root.$emit(
            'bv::show::modal',
            'modal-submited',
            '#submitSuccessModal'
          )
        })
        .catch((error) => {
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
          this.$toasted.error(error)
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
    getShareLink() {
      this.shareLink =
        process.env.APP_URL + '/heat-check/public?id=' + this.$route.query.id
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
.title-heat-populated
  font-weight: $bold
  font-size: 24px
  font-family: $font-family-montserrat
  display: flex
  align-items: center
.example-right
  border-radius: 40px
  box-sizing: border-box
  padding-top: 5px
.example-photos
  font-family: $font-family-montserrat
  font-size: 16px
.upload-product-image
  font-weight: $medium
  font-size: 18px
  letter-spacing: -0.02em
  text-transform: capitalize
  align-items: center
.required-option
  font-weight: $regular
  font-size: 12px
  text-transform: capitalize
  letter-spacing: -0.02em
  align-items: center
.lachakmagya
  background: $color-white-1
.col3
  flex: 0 0 22.0%
  max-width: 22.0%
  align-items: center
.pic-item
  margin-right: 15px
.bg-white.padd-12
  min-height: 200px
  max-height: 230px
  border-radius: 4px 4px 0px 0px
.padd-12
  padding: 12px
.pic-titel
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  font-size: 10px
  line-height: 12px
  text-align: center
  letter-spacing: -0.02em
  text-transform: capitalize
  color: $color-black-1
  margin-bottom: 15px
.bg-white
  background-color: $color-white-1
.bg-grey
  background: $color-gray-3
  border-radius: 0px 0px 4px 4px
.g-title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 42px
  line-height: 59px
  text-transform: uppercase
  color: $color-green-3
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
  font-size: 24px
  line-height: 29px
  letter-spacing: 0.09em
  color: $color-gray-28
.ls
  width: 30px
  border: 4px solid $color-gray-5
  margin: 30px 0
.p-detail p
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  font-size: 14px
  line-height: 150%
  color: $color-black-1
  margin: 2px 0

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
.auth_text
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 20px
  color: $color-black-1
  display: flex
  align-items: center
.py-4
  margin-top: 53px
.number_text
  margin-left: 700px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold
  font-size: 16px
  color: $color-white-1
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
.inconclusive
  color: $color-gray-4
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
.notVerify
  color: $color-red-rgb1
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
.failed
  color: $color-red-rgb1
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
.pending,.Pending-payment
  color: $color-organge-rgb-1
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 32px
.draft
  color: $color-blue-2
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $bold
  font-size: 32px
  line-height: 59px
.auth-numb
  font-style: normal
  font-weight: $bold
  font-size: 16px
  line-height: 19px
  text-decoration-line: underline
  color: $color-black-1
  padding-top: 10px

.passed,.draft,.failed,.notVerify,
.pending,.inconclusive,.Pending-payment
  display: flex
  justify-content: center
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
  padding-top: 3.3rem

.pending
    padding-top: 35px

.width-17
    width: 17%

.width-10
    width: 10%

.center
    text-align: center

.modal-text
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 150%
  text-align: center
  color: $color-black-1
  margin: auto 5px

.blue-btn
  border: none
  width: 147px
  height: 38px
  background: $color-blue-2
  box-shadow: 0px 4px 4px $color-black-rgb1
  border-radius: 21px
  font-style: normal
  font-weight: $medium
  font-size: 16px
  line-height: 20px
  line-height: 19px
  align-items: center
  color: $color-white-1


.black-btn
  font-style: normal
  font-weight: $medium
  font-size: 16px
  line-height: 19px
  color: $color-black-1
  margin-left: 15px
  width: 147px
  height: 38px
  background: $color-white-1
  box-shadow: 0px 4px 4px $color-black-rgb1
  border-radius: 21px
  border: 1px solid $color-black-1

.share-icon img:hover
  cursor: pointer

.title-items-populate
  font-weight: $regular
  font-size: 10px
  line-height: 12px
  color: $color-black-1

.item-description
  font-style: normal
  font-weight: $regular
  font-size: 18px
  line-height: 21px
  text-align: center
  color: $color-black-1
  margin-top: 15px
.black-color
  color: $color-black-1

.plus-icon
  text-align: right
  display: block
  position: absolute
  cursor: pointer
  top: 25px
  right: 22px

.w-46
  width: 46%

#justify-content-start
  justify-content: flex-start

.bbg-btn
  background: $color-blue-2
  border-color: $color-blue-2

.complete_draft
  max-height: 20px
  font-size: 10px
  color: $color-gray-6
  border-bottom: 1px solid $color-gray-6
  cursor: pointer
.carosel
  max-width: 1100px
  margin: 0 auto

.complete_draft :hover
  cursor: pointer
</style>
