<template>
  <Modal
    :id="id"
    hide-footer
    no-border
    content-class
    @shown="$emit('shown')"
    @hidden="$emit('hidden')"
  >
    <div class="csv-upload-modal-content px-5 py-5">
      <div v-if="status === 'uploading'" class="text-center">
        <div class="manify-section">CSV</div>
        <b-progress
          :value="progressValue"
          :max="progressMax"
          class="mt-4 upload-progress"
        ></b-progress>
        <div class="mt-2 progress-value">
          {{ `${progressValue}/${progressMax}` }}
        </div>
        <div class="mt-2 mb-5 progress-label">
          {{ $t('inventory.analyzing') }}
        </div>
      </div>
      <div v-else-if="status === 'uploaded'">
        <div class="uploaded-title">
          {{ $t('inventory.analyzing_completed') }}
        </div>
        <div class="mt-3 uploaded-text">
          {{ $t('inventory.message.added_from_file', { count: addedCount }) }}
        </div>
        <div v-if="unrecognizedCount" class="mt-2 uploaded-text">
          {{
            $t('inventory.message.unrecognized_from_file', {
              count: unrecognizedCount,
            })
          }}
        </div>
        <img
          :src="require('~/assets/img/icons/product/confirm-tick.svg')"
          class="mt-4 mb-3 tick-img"
        />
      </div>
      <div v-else>
        <div class="message">
          {{ message }}
        </div>
        <div class="d-flex flex-column align-items-center mt-5 mb-3">
          <input
            id="csv-file-upload"
            type="file"
            hidden
            accept=".csv"
            @change="onFileUpload"
          />
          <Button
            variant="dark-blue"
            pill
            class="btn-upload"
            @click="handleUploadClick"
            >{{ uploadLabel || $t('inventory.upload_csv_file') }}</Button
          >
          <Button
            variant="link"
            class="btn-download justify-content-center"
            @click="handleSampleDownload"
          >
            <img
              :src="require('~/assets/img/icons/download-blue.svg')"
              :alt="$t('common.download')"
            />
            {{ sampleLabel || $t('inventory.csv_sample') }}
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from 'vuex'
import { Button, Modal } from '~/components/common'

export default {
  name: 'InventoryCsvUploadModal',

  components: { Button, Modal },

  props: {
    id: {
      type: String,
      default: 'csv-upload-modal',
    },
    message: {
      type: String,
      default: '',
    },
    uploadLabel: {
      type: String,
      default: null,
    },
    sampleLabel: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      status: null,
      CSV_KEYS: [
        'product',
        'sku',
        'size',
        'packaging condition',
        'quantity',
        'price',
      ],
      PARSE_COUNT: 1,
      progressValue: 0,
      progressMax: 0,
      result: [],
    }
  },

  computed: {
    addedCount() {
      return this.result.filter((i) => i.status === 'available').length
    },

    unrecognizedCount() {
      return this.result.filter((i) => i.status === 'unrecognized').length
    },
  },

  methods: {
    ...mapActions({
      bulkMatch: 'product/bulkMatch',
      addInventoriesToCsvDraft: 'inventory/addInventoriesToCsvDraft',
    }),

    handleUploadClick() {
      document.getElementById('csv-file-upload').click()
    },

    handleSampleDownload() {
      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        this.CSV_KEYS.join(','),
        [
          "Yeezy Slides 'Resin' 2021",
          'GZ5551',
          '12.5',
          'Good Condition',
          '2',
          '335.00',
        ].join(','),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const data = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', data)
      link.setAttribute('download', 'sample.csv')
      link.click()
    },

    onFileUpload(event) {
      const self = this
      const file = event.target.files && event.target.files[0]
      if (file) {
        this.status = 'uploading'
        const reader = new FileReader()
        reader.onload = function (e) {
          const contents = e.target.result
          const rows = contents.split('\n')
          const keys = rows[0].split(',')
          const data = []
          rows.forEach(function (row, index) {
            if (index > 0) {
              const rowData = row.split(',')
              const obj = {}
              rowData.forEach(function (dd, idx) {
                const key = keys[idx]
                obj[key] = dd
              })
              data.push(obj)
            }
          })
          self.progressValue = 0
          self.progressMax = data.length
          self.parseCsvData(data)
        }
        reader.readAsText(file)
      }
    },

    parseCsvData(data, start = 0) {
      const payload = []
      for (
        let i = start;
        i < Math.min(start + this.PARSE_COUNT, data.length);
        i++
      ) {
        payload.push({
          name: data[i].product,
          sku: data[i].sku,
        })
      }
      this.bulkMatch(payload).then((res) => {
        const drafts = res.map((item, index) => {
          const draft = {
            product: null,
            sizeId: null,
            packagingConditionId: null,
          }
          if (item.product) {
            draft.product = item.product
            if (item.product.name === payload[index].name) {
              draft.status = 'available'
              draft.sizeId = item.product.sizes.find(
                (i) => i.size === data[start + index].size
              )?.id
              draft.packagingConditionId =
                item.product.packaging_conditions.find(
                  (i) => (i.name = data[start + index]['packaging condition'])
                )?.id
            } else {
              draft.status = 'unrecognized'
            }
          } else {
            draft.status = 'unrecognized'
          }
          draft.size = data[start + index].size
          draft.quantity = Number(data[start + index].quantity)
          draft.price = Number(data[start + index].price) * 100
          draft.packagingCondition = data[start + index]['packaging condition']
          draft.sku = data[start + index].sku
          draft.productName = data[start + index].product
          return draft
        })
        this.result = this.result.concat(drafts)
        this.progressValue = this.progressValue + payload.length
        if (data.length > start + this.PARSE_COUNT) {
          setTimeout(() => {
            this.parseCsvData(data, start + this.PARSE_COUNT)
          }, 200)
        } else {
          this.status = 'uploaded'
          setTimeout(() => {
            this.addInventoriesToCsvDraft(this.result)
            this.$bvModal.hide(this.id)
            this.$emit('uploaded')
          }, 2000)
        }
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.csv-upload-modal-content::v-deep
  text-align: center

  .message
    @include body-3-regular
    color: $color-black-1
    text-align: center
    width: 390px
    margin-left: auto
    margin-right: auto

  .btn-upload
    @include body-3-normal
    width: 220px
    background-color: $color-grey-101
  .btn-download
    @include body-3-normal
    color: $color-blue-20
    padding-bottom: 4px
    border-bottom: 1px solid $color-blue-20
    border-radius: 0px
    margin-top: 10px

    img
      margin-right: 12px

  @keyframes animatedBackground
    0%
      background-position: 0% 0%
    50%
      background-position: 100% 0%
    100%
      background-position: 0% 0%

  .manify-section
    @include heading-1
    font-weight: $regular
    letter-spacing: 0.405em
    line-height: 36px
    height: 43px
    background-image: url('~/assets/img/icons/browse-magnify.svg')
    background-size: 40px 43px
    background-repeat: no-repeat
    animation: animatedBackground 2s linear infinite
    width: fit-content
    margin-left: auto
    margin-right: auto
    padding-left: 10px
    padding-right: 7px
    text-align: center

  .progress-value
    @include body-9-regular
    color: $color-gray-4

  .progress-label
    @include body-3-regular
    color: $color-black-1

  .uploaded-title
    @include body-3-medium

  .uploaded-text
    @include body-3-regular
    width: 350px
    margin-left: auto
    margin-right: auto

  .tick-img
    width: 48px
    height: 48px

.upload-progress::v-deep
  border-radius: 4px
  height: 8px

  .progress-bar
    background-color: $color-blue-20
    background-size: 8px 8px
    border-radius: 4px
</style>
