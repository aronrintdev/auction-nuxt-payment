<template>
  <div class="create-listing-page">
    <div class="wrapper">
      <div class="content-wrapper">
        <section class="content p-4">
          <div class="container-fluid">
            <div
              class="d-flex align-items-center justify-content-between content-header"
            >
              <div class="content-header-title">
                {{ $t('create_listing.auction.single.title') }}
              </div>
              <div>
                <NuxtLink
                  to="/create-listing/search/inventory"
                  class="btn btn-outline-dark px-5 back-btn"
                >
                  {{ $t('create_listing.auction.single.back_to_auctions') }}
                </NuxtLink>
              </div>
            </div>
            <div v-if="step == 'create'" class="content-main">
              <div v-if="!loading && product" class="row">
                <div class="col-md-12">
                  <div class="product-details-title">{{ product.name }}</div>
                  <div class="product-details-sku">
                    {{ $t('create_listing.auction.single.sku') }}:
                    {{ product.sku }}
                  </div>
                </div>
                <div class="col-xs-12 col-md-6 pr-5">
                  <div class="product-details">
                    <div class="text-center product-image">
                      <img
                        :src="`${$config.apiURL}/products/${product.sku}/thumb`"
                      />
                    </div>
                  </div>
                  <div class="suggested-prices">
                    <div class="suggested-prices-title">
                      {{ $t('create_listing.auction.single.suggested_prices') }}
                    </div>
                    <div class="pt-3 d-flex justify-content-between">
                      <div>
                        <div class="label">
                          {{
                            $t('create_listing.auction.single.lowest_price')
                          }}:
                        </div>
                        <div classs="price">
                          ${{ suggestedPrices.lowest_price | formatPrice }}
                        </div>
                      </div>
                      <div>
                        <div class="label">
                          {{ $t('create_listing.auction.single.highest_bid') }}:
                        </div>
                        <div classs="price">
                          ${{ suggestedPrices.highest | formatPrice }}
                        </div>
                      </div>
                      <div>
                        <div class="label">
                          {{ $t('create_listing.auction.single.last_sold') }}:
                        </div>
                        <div classs="price">
                          ${{ suggestedPrices.last_sold | formatPrice }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xs-12 col-md-6 px-5">
                  <div
                    v-if="form.box_condition === 'damaged_box'"
                    class="mb-4 box-images"
                  >
                    <div class="d-flex box-images-header">
                      <div class="box-images-title">
                        {{
                          $t('create_listing.auction.single.upload_box_images')
                        }}<br />
                        <small
                          >*{{
                            $t('create_listing.auction.single.required')
                          }}</small
                        >
                      </div>
                      <input
                        id="input_file"
                        ref="input_file"
                        type="file"
                        hidden
                        accept="image/*"
                        multiple
                        @change="uploadBoxImages"
                      />
                      <button
                        class="btn btn-dark px-5"
                        @click="openFileUploader"
                      >
                        {{ $t('create_listing.auction.single.upload_images') }}
                      </button>
                    </div>
                    <div class="d-flex flex-wrap box-images-content">
                      <div
                        v-for="(image, idx) in form.images"
                        :key="idx"
                        class="box-images-img"
                      >
                        <img :src="image" />
                        <CloseIcon @click="removeImage(idx)"></CloseIcon>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="form-input">
                      <label>{{
                        $t('create_listing.auction.single.size')
                      }}</label>
                      <input
                        v-model="form.size"
                        type="number"
                        name="size"
                        placeholder="0.0"
                      />
                    </div>
                    <div class="form-input">
                      <label>{{
                        $t('create_listing.auction.single.min_bid_amount')
                      }}</label>
                      <input
                        v-model="form.min_bid_amount"
                        type="number"
                        name="amount"
                        placeholder="$0.00"
                      />
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="form-input">
                      <label>{{
                        $t('create_listing.auction.single.auction_time_limit')
                      }}</label>
                      <select v-model="form.time_limit" name="time_limit">
                        <option value="" disabled selected>
                          {{
                            $t(
                              'create_listing.auction.single.default_time_limit'
                            )
                          }}
                        </option>
                        <option
                          v-for="(option, idx) in timeLimitOptions"
                          :key="idx"
                          :value="option"
                        >
                          {{
                            `${option} ${$t(
                              'create_listing.auction.single.days'
                            )}`
                          }}
                        </option>
                      </select>
                    </div>
                    <div class="form-input">
                      <label>{{
                        $t('create_listing.auction.single.box_condition')
                      }}</label>
                      <select v-model="form.box_condition" name="box_condition">
                        <option value="good_condition" selected>
                          {{
                            $t('create_listing.auction.single.good_condition')
                          }}
                        </option>
                        <option value="new_condition">
                          {{
                            $t('create_listing.auction.single.new_condition')
                          }}
                        </option>
                        <option value="damaged_box">
                          {{ $t('create_listing.auction.single.damaged_box') }}
                        </option>
                        <option value="missing_lid">
                          {{ $t('create_listing.auction.single.missing_lid') }}
                        </option>
                        <option value="no_original_box">
                          {{
                            $t('create_listing.auction.single.no_original_box')
                          }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div class="mt-3">
                    <div class="form-input">
                      <label>{{
                        $t('create_listing.auction.single.additional_notes')
                      }}</label>
                      <textarea v-model="form.note"></textarea>
                    </div>
                  </div>
                  <hr />
                  <div class="mt-4 mb-4">
                    <button
                      type="button"
                      class="btn w-100 btn-outline-dark create-auction"
                      :disabled="!isFormValid"
                      @click="addToTemp"
                    >
                      {{ $t('create_listing.auction.single.create_auction') }}
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="!loading && !product" class="p-5 text-center">
                <strong>{{
                  $t('create_listing.auction.single.no_product')
                }}</strong>
              </div>
            </div>
            <div v-if="step == 'confirm'" class="content-main">
              <div class="mb-4">
                <b-table
                  class="mt-3 trades-table"
                  :items="[form]"
                  :fields="tableColumns"
                >
                  <template #cell(details)>
                    <div class="d-flex align-items-center text-left">
                      <img
                        :src="`${$config.apiURL}/products/${product.sku}/thumb`"
                        alt="product image"
                        class="product-image"
                      />
                      <div class="ml-4">
                        <span class="product-name">{{ product.name }}</span
                        ><br />
                        <span class="product-sku"
                          >{{ $t('sell.confirm_listing.sku') }}:
                          {{ product.sku }}</span
                        >
                      </div>
                    </div>
                  </template>
                  <template #cell(colorway)>
                    <span>{{ product.colorway }}</span>
                  </template>
                  <template #cell(size)="row">
                    <span>{{ row.item.size }}</span>
                  </template>
                  <template #cell(status)>
                    <span class="status not-started">{{
                      $t('create_listing.auction.to_be_listed')
                    }}</span>
                  </template>
                  <template #cell(duration)="row">
                    {{
                      `${row.item.time_limit} ${$t(
                        'trades.create_listing.days'
                      )}`
                    }}
                  </template>
                  <template #cell(min_bid)="row">
                    ${{ (row.item.min_bid_amount * 100) | formatPrice }}
                  </template>
                </b-table>
              </div>
              <div class="d-flex align-items-center justify-content-end">
                <button
                  class="btn btn-dark h-auto confirm-btn"
                  @click="confirmAuctionPosting"
                >
                  <b-spinner v-if="loading" small></b-spinner>
                  <span v-else>{{
                    $t('create_listing.auction.confirm_btn')
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Footer from '~/components/Footer.vue'
import CloseIcon from '~/assets/img/icons/close2.svg?inline'

export default {
  name: 'CreateSingleAuctionPage',
  components: {
    Footer,
    CloseIcon,
  },
  layout: 'Default',
  middleware: 'auth',
  data() {
    return {
      loading: true,
      product: null,
      suggestedPrices: {
        lowest_price: 50000,
        highest: 35000,
        last_sold: 40000,
      },
      form: {
        size: null,
        min_bid_amount: null,
        time_limit: '',
        box_condition: '',
        note: null,
        images: [],
      },
      isFormValid: false,
      timeLimitOptions: [1, 3, 5, 7, 10],
      step: 'create',
      tableColumns: [
        {
          key: 'details',
          label: this.$t('trades.create_listing.table_columns.details'),
          class: 'text-left',
        },
        {
          key: 'size',
          label: this.$t('trades.create_listing.table_columns.size'),
        },
        {
          key: 'colorway',
          label: this.$t('trades.create_listing.table_columns.colorway'),
        },
        {
          key: 'status',
          label: this.$t('trades.create_listing.table_columns.status'),
        },
        {
          key: 'duration',
          label: this.$t('trades.create_listing.table_columns.duration'),
        },
        {
          key: 'min_bid',
          label: this.$t('trades.create_listing.table_columns.min_bid'),
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  watch: {
    form: {
      handler(newV) {
        let isValid = true
        if (
          !newV.note ||
          !newV.size ||
          !newV.min_bid_amount ||
          !newV.time_limit ||
          !newV.box_condition
        ) {
          isValid = false
        }
        if (newV.box_condition === 'damaged_box' && newV.images.length < 2) {
          isValid = false
        }
        this.isFormValid = isValid
      },
      deep: true,
    },
  },
  mounted() {
    // Get selected product from SessionStorage.
    const data = window.sessionStorage.getItem('create-listing-product')
    if (data) {
      this.product = JSON.parse(data)
    }
    this.loading = false
  },
  beforeDestroy() {
    // Remove selected product from SessionStorage
    window.sessionStorage.removeItem('create-listing-product')
  },
  methods: {
    // Move to confirming step
    addToTemp() {
      this.step = 'confirm'
    },
    // Open file upload box
    openFileUploader() {
      this.$refs.input_file.click()
    },
    // Save damaged box images to form object
    uploadBoxImages(evt) {
      const { files } = evt.target
      const images = []
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]))
      }
      this.form = {
        ...this.form,
        images: this.form.images.concat(images),
      }
    },
    // Remove an image from form object
    removeImage(idx) {
      const { images } = this.form
      images.splice(idx, 1)
      this.form = {
        ...this.form,
        images,
      }
    }, 
    // Create new single auction
    confirmAuctionPosting() {
      this.loading = true
      this.$axios
        .post('auctions/single', {
          ...this.form,
          ...this.product,
          box_images: this.form.images.map((img, idx) => ({
            name: `Box image ${idx}`,
            url: img,
          })),
          min_bid_amount: this.form.min_bid_amount * 100,
          color: this.product.colorway,
          category: this.product.category.name,
        })
        .then(() => {
          this.loading = false
          this.$toasted.success(
            this.$t('create_listing.auction.single.create_success')
          )
          this.$router.push('/auctions')
        })
        .catch((err) => {
          this.$toasted.error(this.$t(err.response.data.error))
        })
    },
  },
}
</script>
