<template>
  <b-container fluid class="container-heatcheck">
    <div v-if="$auth.loggedIn === true" class="d-none">
      {{ (userAuth = true) }}
    </div>
    <div v-else class="d-none">{{ (userAuth = false) }}</div>
    <div>
      <i class="fa fa-angle-left mr-1 gray-color"></i>
      <nuxt-link to="/heat-check/new" class="black-color">
        {{ $t('heatcheck.listing.back_to_search') }}
      </nuxt-link>
      {{ itemId }}
      <div class="row">
        <div class="col-12 mt-4">
          <h3 class="title-heat-populated pb-4">
            {{ $t('heatcheck.product_detail.title') }}
          </h3>
          <h3 class="title-heat-populated">
            {{ main_product.name }}
          </h3>
        </div>
        <div class="col-md-6 heat-populated">
          <p class="title-model-heat mb-0">
            {{ $t('heatcheck.sku') }}: {{ main_product.sku }}
          </p>
          <p class="title-model-heat mt-0">
            {{ $t('heatcheck.color') }}: {{ main_product.colorway }}
          </p>
          <div class="populated-items-img text-md-center">
            <img :src="main_product.image" alt="" class="main-product-image" />
          </div>
          <div v-if="loading" class="loading">
            <div class="spinner-border text-light" role="status">
              <span class="sr-only">{{ $t('heatcheck.Loading') }}</span>
            </div>
          </div>
          <div class="disclaimer-note">
            <div class="my-4 clearfix">
              <div class="item-size-populated-shows pull-left">
                <div
                  class="col-12 col-md-12 mt-md-12 col-sm-6 filter-customselect mt-2"
                >
                  <CustomSelect
                    :default="selectedSizeId"
                    :options="formatedSizes"
                    @input="selectSize"
                  ></CustomSelect>
                </div>
              </div>
              <div class="example-right">
                <button
                  class="example-photos bb-btn pull-right mr-3"
                  @click="$bvModal.show('modal-5')"
                >
                  <i class="fa fa-eye"></i>
                  {{ $t('heatcheck.product_detail.example_photos') }}
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-12 addinational-notes-col pull-left">
            <p class="additional-notes">
              {{ $t('heatcheck.product_detail.additional_notes') }}
            </p>
          </div>
          <div class="col-md-12 txt-area-col pull-left">
            <div class="text-area-div">
              <div class="form-group txt-area-border">
                <textarea
                  id="exampleFormControlTextarea1"
                  v-model="notes"
                  class="form-control textarea"
                  rows="4"
                  :placeholder="$t('heatcheck.insert_notes')"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="cancelBtn">
            <button
              class="populated-submit-cncl mx-auto"
              @click="$bvModal.show('modal-4')"
            >
              {{ $t('heatcheck.product_detail.cancel') }}
            </button>
          </div>
        </div>
        <div class="bModal">
          <b-modal id="modal-1" hide-footer class="text-center">
            <h5>{{ $t('heatcheck.product_detail.upload_failed') }}</h5>
            <p class="my-4">
              {{ $t('heatcheck.product_detail.please_upload') }}<br />{{
                $t('heatcheck.product_detail.please_upload')
              }}
            </p>
            <button class="mx-auto my-4 button">
              {{ $t('heatcheck.product_detail.upload_another') }}
            </button>
          </b-modal>
        </div>

        <!-- Main Products Start -->
        <div class="col-md-6 mt-4">
          <div class="main-section-populated">
            <div class="upload-product-image-section">
              <p class="upload-product-image">
                {{ $t('heatcheck.product_detail.main_product_images') }}*<br />
                <span class="required-option"
                  >({{ $t('heatcheck.product_detail.required_size') }})</span
                >
              </p>
            </div>
            <div class="row">
              <div
                v-for="(item, index) in getMainImages"
                :key="'main' + index"
                :class="item.border"
              >
                <div class="upload-icon">
                  <label for="front" class="lable"
                    ><i
                      class="fa fa-plus-circle plus-icon"
                      @click="userSelected(item.name)"
                    ></i
                  ></label>
                  <input
                    id="front"
                    type="file"
                    class="d-none"
                    @change="checkFileSize($event.target.files)"
                  />
                  <p class="item-img text-md-center">
                    <img :src="item.image" width="50" height="50" />
                  </p>
                </div>
                <p class="title-items-populate text-md-center">
                  {{ item.name }}
                </p>
              </div>
            </div>
            <!-- Main Products End -->
            <!-- Additional Images Start -->
            <div class="upload-product-image-section">
              <p class="upload-product-image">
                {{ $t('heatcheck.product_detail.addtional_image') }}<br />
                <span class="required-option"
                  >({{
                    $t('heatcheck.product_detail.please_provide_photos')
                  }})</span
                >
              </p>
            </div>
            <div class="row">
              <div
                v-for="(item, index) in getAdditionalImages"
                :key="'additional' + index"
                class="col2 populated-items-heat pull-left"
              >
                <div class="upload-icon">
                  <label for="front" class="lable"
                    ><i
                      class="fa fa-plus-circle plus-icon"
                      @click="userSelected(item.name)"
                    ></i
                  ></label>
                  <input
                    id="front"
                    type="file"
                    class="d-none"
                    @change="checkFileSize($event.target.files)"
                  />
                  <p class="item-img text-md-center">
                    <img :src="item.image" height="50" width="50" />
                  </p>
                </div>
                <p class="title-items-populate text-md-center">
                  {{ item.name }}
                </p>
              </div>
            </div>
            <!-- Additional Images End -->

            <div class="col-md-12 pull-left mt-4">
              <b-modal
                id="modal-2"
                ref="modal-2"
                hide-footer
                class="text-center"
              >
                <h5>{{ $t('heatcheck.product_detail.save_as_draft') }}</h5>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
              </b-modal>
              <b-modal
                id="modal-3"
                ref="modal-3"
                hide-footer
                class="text-center"
              >
                <h5>{{ $t('heatcheck.product_detail.sure_to_submit') }}</h5>
                <button
                  class="mx-auto my-4 bbg-btn"
                  @click="handleSubmit('Pending Payment')"
                >
                  {{ $t('heatcheck.product_detail.submit') }}
                </button>
                <button
                  class="mx-auto my-4 button"
                  @click="$bvModal.hide('modal-3')"
                >
                  {{ $t('heatcheck.product_detail.go_back') }}
                </button>
              </b-modal>
              <b-modal id="modal-4" hide-footer class="text-center">
                <h5>{{ $t('heatcheck.product_detail.sure_to_cancel') }}</h5>
                <h5>{{ $t('heatcheck.product_detail.changes_lost') }}</h5>
                <button
                  class="mx-auto my-4 bbg-btn"
                  @click="cancelAndRedirect()"
                >
                  {{ $t('heatcheck.product_detail.cancel') }}
                </button>
                <button
                  class="mx-auto my-4 button"
                  @click="$bvModal.hide('modal-4')"
                >
                  {{ $t('heatcheck.product_detail.go_back') }}
                </button>
              </b-modal>
              <b-modal
                id="image-size-error"
                ref="image-size-error"
                hide-footer
                class="text-center"
              >
                <h5>{{ $t('heatcheck.product_detail.upload_failed') }}</h5>
                <h5>{{ $t('heatcheck.product_detail.errors.file_error') }}</h5>
                <button
                  class="mx-auto my-4 bbg-btn"
                  @click="$bvModal.hide('image-size-error')"
                >
                  {{ $t('heatcheck.product_detail.upload_another') }}
                </button>
              </b-modal>
              <b-modal
                id="modal-5"
                hide-footer
                modal-class="modal-fullscreen modal-5"
              >
                <h3 class="title-heat-populated text-left">
                  {{ $t('heatcheck.product_detail.example_photoes') }}
                </h3>
                <div class="row">
                  <div class="col-md-12 heat-populated">
                    <h5 class="mt-4 my-2 text-left">
                      {{ $t('heatcheck.product_detail.main_product_image') }}
                    </h5>
                  </div>
                  <div
                    v-for="(item, index) in mainImages"
                    :key="'primary' + index"
                    class="col-md-3 mt-4"
                  >
                    <div class="card example-photos-cards">
                      <p class="text-center mt-2 title">{{ item.name }}</p>
                      <div class="text-center d-flex justify-content-center">
                        <img
                          :src="item.image"
                          class="card-img-top mb-4 mt-4 prodct-modal-img"
                          alt="..."
                        />
                      </div>
                      <div class="card-body example-photos-body">
                        <p class="card-text example-photos-desc">
                          {{ $t('heatcheck.product_detail.description') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 heat-populated">
                    <h5 class="mt-4 my-2 text-left">
                      {{ $t('heatcheck.product_detail.addtional_image') }}
                    </h5>
                  </div>
                  <div
                    v-for="(item, index) in additionalImages"
                    :key="'secondary' + index"
                    class="col-md-3 mt-4"
                  >
                    <div class="card example-photos-cards">
                      <p class="text-center mt-2 title">{{ item.name }}</p>
                      <div class="text-center d-flex justify-content-center">
                        <img
                          :src="item.image"
                          class="card-img-top mb-4 mt-4 prodct-modal-img"
                          alt="..."
                        />
                      </div>
                      <div class="card-body example-photos-body">
                        <p class="card-text example-photos-desc">
                          {{ $t('heatcheck.product_detail.description') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </b-modal>
              <b-modal
                id="modal-submited"
                ref="submitSuccessModal"
                content-class="text-center modal-submited"
                ok-only
              >
                <p class="my-4">
                  {{ $t('heatcheck.product_detail.success.msg') }}
                </p>
                <img :src="require(`~/assets/img/heat-submited.png`)" />
              </b-modal>
              <b-modal
                id="loginModal"
                ref="loginModal"
                hide-footer
                class="text-center"
                size="lg"
              >
                <Login
                  showHeaderFooter="false"
                  classVal="col-md-12 col-xs-12 loginmain"
                  @isLogin="loggedIn"
                />
              </b-modal>
              <button
                class="populated-submit-btn bb-btn"
                @click="handleSubmit(HEATCHECK_STATUS_DRAFT)"
              >
                {{ $t('heatcheck.product_detail.save_as_draft') }}
              </button>
              <button
                class="populated-submit-btn bbg-btn ml-4"
                @click="$bvModal.show('modal-3')"
              >
                {{ $t('heatcheck.product_detail.submit_heat_check') }}
              </button>
              <div v-if="showError" class="error_div">
                <p class="error_msg">
                  {{ $t('heatcheck.product_detail.errors.msg1') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import S3 from 'aws-s3'
import Login from '~/pages/login'
import CustomSelect from '~/components/common/CustomSelect.vue'
import {
  HEATCHECK_FIRST_TIME_PRICE,
  HEATCHECK_SECOND_TIME_PRICE,
  HEATCHECK_STATUS_DRAFT,
} from '~/static/constants'

export default {
  name: 'ProductDetail',
  components: {
    Login,
    CustomSelect,
  },
  layout: 'Profile',
  data() {
    return {
      userAuth: null,
      isLogin: this.$auth.loggedIn,
      sku: null,
      main_product: '',
      category: 'all',
      action: 'none',
      hasSearchResult: false,
      apiUrl: process.env.API_URL,
      searchText: null,
      selectedSizeId: '',
      itemId: null,
      newListType: null,
      newListName: '',
      listProducts: [],
      products: [],
      selected: [],
      currentPage: 1,
      perPage: 0,
      totalCount: 0,
      loading: false,
      notes: '',
      status: '',
      mainProducts: [],
      additionalProducts: [],
      currentSelectionName: '',
      selectedImages: [],
      productSizes: 0,
      formatedSizes: { '': this.$t('product_page.select_size') },
      showError: false,
      showLoginPage: false,
      heatcheckPrice: HEATCHECK_FIRST_TIME_PRICE,
      mainImages: [
        {
          name: 'FRONT',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/front.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'INSIDE',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/inside.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'OUTSIDE',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/out.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'BACK',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/back.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'TOP',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/top.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'FOOTBED STICHING',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/footbed.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'SIZE TAG',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/size-tag.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'INSOLE (TOP)',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/insoles-top.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'INSOLE (BOTTOM)',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/insole-bottom.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'BOTTOM',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/bottom.svg',
          border: 'col2 populated-items-heat pull-left',
        },
        {
          name: 'BOX LABEL',
          image:
            'https://heatcheck-v2-dev.s3.us-east-2.amazonaws.com/heatcheck/sample-icons/box-label.svg',
          border: 'col2 populated-items-heat pull-left',
        },
      ],
      additionalImages: [
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
    }
  },
  computed: {
    ...mapGetters({
      getMainImages: 'heat-check/getMainImages',
      getAdditionalImages: 'heat-check/getAdditionalImages',
      getSelectedImages: 'heat-check/getSelectedImages',
      getCheckoutStatus: 'heat-check/getCheckoutStatus',
      getSku: 'heat-check/getSku',
    }),
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
    this.itemId = this.$route.query.id
    this.sku = this.$route.query.sku
    this.resetData()
    if (this.sku !== undefined) {
      this.getMainProduct()
    } else {
      this.resetData()
      this.draftDetail()
    }
    this.checkExistingHeatCheck()
  },
  methods: {
    ...mapActions({
      setMainImage: 'heat-check/addMainImage',
      resetData: 'heat-check/resetData',
      updateErrorClass: 'heat-check/updateErrorClass',
      updateCheckoutStatus: 'heat-check/updateCheckoutStatus',
      setSku: 'heat-check/updateSku',
      addOrderProducts: 'order-details/addOrderProducts',
      addShoppingProduct: 'shopping-cart/addProduct',
      emptyCart: 'order-details/removeProducts',
      removeProducts: 'shopping-cart/removeProducts',
    }),
    loggedIn(status) {
      if (status === 'true') {
        this.handleSubmit(this.status)
      }
    },
    clearData() {
      this.resetData({})
    },
    cancelAndRedirect() {
      this.resetData()
      if (this.$auth.loggedIn)
        this.$router.push({ path: '/heat-check/listing' })
      else this.$router.push({ path: '/heat-check/new' })
    },
    newFileName() {
      return Math.random().toString().slice(2)
    },
    checkExistingHeatCheck() {
      if (this.isLogin) {
        this.$axios
          .get('/heatchecks/check-existing')
          .then((response) => {
            if (response.total > 0)
              this.heatcheckPrice = HEATCHECK_FIRST_TIME_PRICE
            else this.heatcheckPrice = HEATCHECK_SECOND_TIME_PRICE
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.error))
          })
      } else {
        this.heatcheckPrice = HEATCHECK_FIRST_TIME_PRICE
      }
    },
    userSelected(imgName) {
      this.currentSelectionName = imgName
    },

    // check the size of user uploaded file
    async checkFileSize(files) {
      let width, height
      const _URL = window.URL || window.webkitURL
      const img = new Image()
      const that = this
      img.onload = await function () {
        width = this.width
        height = this.height
        if (width > 400 && height > 400) {
          that.uploadFile(files)
        } else {
          that.$root.$emit(
            'bv::show::modal',
            'image-size-error',
            '#image-size-error'
          )
        }
      }
      img.onerror = function () {
        this.$toasted.error('not a valid file: ' + files[0].type)
      }
      if (files[0] !== undefined) {
        img.src = _URL.createObjectURL(files[0])
      }
    },

    // upload file to Amazon bucket
    uploadFile(files) {
      this.loading = true
      const file = files[0]
      const S3Client = new S3(this.config)

      S3Client.uploadFile(file, this.newFileName())
        .then((data) => {
          const row = {
            currentSelectionName: this.currentSelectionName,
            image: data.location,
          }
          this.setMainImage(row)
          this.loading = false
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
          this.loading = false
        })
    },
    handleSubmit(status) {
      this.status = status
      this.loading = true
      this.$root.$emit('bv::hide::modal', 'modal-3', '#modal-3')
      const uploadData = {
        user_id: this.$store.state.auth.user.id,
        product_id: this.main_product.id,
        notes: this.notes,
        category_id: this.main_product.category.id,
        size_id: this.selectedSizeId,
        status: this.status,
        heatcheckId: this.itemId,
        images: this.getSelectedImages,
        comments: 'This is test comments',
      }
      // selectedNames array is used to store user selected images name
      const selecedNames = []
      this.getSelectedImages.forEach((element) => {
        selecedNames.push(element.name)
      })
      const notSelectedItems = this.getMainImages.filter(
        (item) => !selecedNames.includes(item.name)
      )

      const images = [...this.getMainImages]

      // set red border on non selected images
      notSelectedItems.forEach((element) => {
        const index = images.indexOf(element)
        const newelement = {
          ...element,
          border: 'col2 populated-items-heat pull-left error',
        }
        images[index] = newelement
      })
      this.updateErrorClass(images)

      this.updateCheckoutStatus('true')
      this.setSku(this.main_product.sku)

      if (
        (notSelectedItems.length > 0 || this.selectedSizeId <= 0) &&
        status !== HEATCHECK_STATUS_DRAFT
      ) {
        this.showError = true
        this.loading = false
      } else if (this.userAuth) {
        this.$axios
          .post('/heatchecks', uploadData)
          .then((response) => {
            this.updateCheckoutStatus('false')
            this.setSku('')
            this.loading = false
            if (this.status === 'Pending') {
              this.$root.$emit(
                'bv::show::modal',
                'modal-submited',
                '#submitSuccessModal'
              )
            } else {
              this.$root.$emit('bv::show::modal', 'modal-2', '#modal-2')
            }
            const product = [
              {
                image: this.main_product.image,
                listing_item_id: 0,
                name: this.main_product.name,
                sku: this.main_product.sku,
                colorWay: this.main_product.colorway,
                price: this.heatcheckPrice,
                quantity: 1,
              },
            ]
            this.addOrderProducts(product)
            this.removeProducts()
            const cartRow = {
              image: this.main_product.image,
              listing_item_id: 0,
              name: this.main_product.name,
              sku: this.main_product.sku,
              colorWay: this.main_product.colorway,
              price: this.heatcheckPrice * 100,
              quantity: 1,
            }
            this.$store.dispatch('shopping-cart/addProduct', cartRow)
            if (this.status === HEATCHECK_STATUS_DRAFT) {
              this.$router.push({ path: '/heat-check/listing' })
            } else {
              this.$router.push({
                path: `/checkout/heat-check?sku=${this.sku}&id=${response.data.id.id}`,
              })
            }
          })
          .catch((error) => {
            this.loading = false
            for (const err in error.response.data.message) {
              this.$toasted.error(error.response.data.message[err])
            }
          })
      } else {
        this.$root.$emit('bv::hide::modal', 'modal-3', '#modal-3')
        this.$root.$emit('bv::show::modal', 'loginModal', '#modal-3')
      }
    },
    async getMainProduct() {
      this.loading = true
      await this.$axios
        .get(`products/${this.sku}/details`)
        .then((response) => {
          this.main_product = response.data
          this.productSizes = response.data.sizes
          this.formateSizes()
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },

    formateSizes() {
      this.formatedSizes[0] = this.$t('product_page.select_size')
      for (let i = 0; i < this.productSizes.length; i++) {
        this.formatedSizes[this.productSizes[i].id] = this.productSizes[i].size
      }
    },

    selectSize(val) {
      this.selectedSizeId = val
    },

    draftDetail() {
      if (this.userAuth) {
        this.loading = true
        this.$axios
          .get(`heatchecks/${this.itemId}/draft`)
          .then((response) => {
            this.main_product = response.data.product
            this.productSizes = response.data.product.sizes
            this.selectedSizeId = response.data.heatcheck.size_id
            this.notes = response.data.heatcheck.notes
            // find image in mainProduct and replace it
            response.data.heatcheck.images.forEach((el) => {
              const row = {
                currentSelectionName: el.name,
                image: el.url,
                id: el.id,
              }
              this.setMainImage(row)
            })
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            this.$toasted.error(this.$t(error.response.data.error))
          })
      } else {
        this.$root.$emit('bv::hide::modal', 'loginModal', '#modal-3')
      }
    },

    saveDraft(status) {
      this.status = status
      this.loading = true
      this.$root.$emit('bv::hide::modal', 'modal-3', '#modal-3')
      const uploadData = {
        user_id: this.$store.state.auth.user.id,
        product_id: this.main_product.id,
        notes: this.notes,
        category_id: this.main_product.category.id,
        size_id: this.selectedSizeId,
        status: this.status,
        images: this.selectedImages,
        comments: 'This is test comments',
      }

      this.$axios
        .put(`heatcheck/${this.itemId}/draft`, uploadData)
        .then((response) => {
          this.loading = false
          if (this.status === 'Pending') {
            this.$root.$emit(
              'bv::show::modal',
              'modal-submited',
              '#submitSuccessModal'
            )
          } else {
            this.$root.$emit('bv::show::modal', 'modal-2', '#modal-2')
          }
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },
  },
}
</script>
<style lang="sass">
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'
.title-heat-populated
  font-weight: $bold
  font-size: 22px
  text-transform: lettercase
  align-items: center
  font-family: $font-family-sf-pro-display
  font-style: $normal
  color: $color-black-1
.example-right
  border-radius: 40px
  box-sizing: border-box
  padding-top: 5px

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
.populated-items-heat .upload-icon
  background-color: $color-white-1
  height: 100px
  padding: 5px
.populated-items-heat .upload-icon
  text-align: right
.title-items-populate
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $regular
  font-size: 10px
  line-height: 12px
  text-align: center
  letter-spacing: -0.02em
  text-transform: capitalize
  color: $color-black-1
  margin-top: 5px
.item-size-populated-shows select
  padding: 5px 10px
#cancel-btn button
  border: 2px solid $color-gray-4
  border-radius: 59px
  background: transparent
.example-photos-body
  background: $white-5
.error
  border: 1px solid red
.error_div
  margin-top: 20px
.error_msg
  color: red
  margin: 0
.cancelBtn
  text-align: center
#loginModal .modal-content
  overflow-y: scroll
  height: 650px

.upload-icon
  position: relative
  display: flex
  justify-content: center
  align-items: self-end

.upload-icon .lable
  position: absolute
  cursor: pointer
  top: 2px
  right: 5px

.black-color
  color: $color-black-1
.gray-color
  color: $color-gray-47
.textarea
  min-height: 110px
.main-product-image
  height: 410px
  width: 500px

.bbg-btn
  background: $color-blue-2
  border-color: $color-blue-2
.container-heatcheck .populated-submit-cncl
  border: 2px solid
  border-color: $color-white-12
  background: none
  margin: 45px auto
.filter-customselect .bg-white img
  display: none
.filter-customselect
  width: 200px
  text-align: left
  padding-left: 0px
.custom-selectbox .selected
  padding-left: 0px
</style>
