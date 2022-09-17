<template>
  <div class="px-3 col-12 new-auction-collection-step">
    <div class="step-header">
      <div class="step-header-title">{{ $t('create_listing.auction.collection.step3.title') }}</div>
      <div class="step-header-desc">{{ $t('create_listing.auction.collection.step3.desc') }}</div>
    </div>
    <div class="row m-4 mt-5">
      <div class="col-md-8 pr-5">
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.brand') }}*</label>
          <div class="inline-form-input">
            <input v-model="form.brand" />
            <div class="example">{{ $t('create_listing.auction.collection.step3.brand_example') }}</div>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.model_name') }}</label>
          <div class="inline-form-input">
            <input v-model="form.model" />
            <div class="example">{{ $t('create_listing.auction.collection.step3.model_name_example') }}</div>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.object_type') }}*</label>
          <div class="inline-form-input">
            <input v-model="form.object_type" />
            <div class="example">{{ $t('create_listing.auction.collection.step3.object_type_example') }}</div>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.color') }}*</label>
          <div class="inline-form-input">
            <input v-model="form.color" />
            <div class="example">{{ $t('create_listing.auction.collection.step3.color_example') }}</div>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.pattern') }}</label>
          <div class="inline-form-input">
            <input v-model="form.pattern" />
            <div class="example">{{ $t('create_listing.auction.collection.step3.pattern_example') }}</div>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.size') }}*</label>
          <div class="inline-form-input">
            <input v-model="form.size" />
            <div class="example">{{ $t('create_listing.auction.collection.step3.size_example') }}</div>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.size_label') }}</label>
          <div class="inline-form-input">
            <input v-model="form.size_label" />
            <div class="example">{{ $t('create_listing.auction.collection.step3.size_label_example') }}</div>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.box_conditions') }}*</label>
          <div class="inline-form-checkbox">
            <label v-for="condition in box_conditions" :key="condition.key">
              <input :checked="form.box_condition == condition.key" type="checkbox" @change="changeCondition(condition.key)" >&nbsp;{{ condition.label }}
            </label>
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.price') }}</label>
          <div class="inline-form-input">
            <input v-model="form.price" type="number" />
          </div>
        </div>
        <div class="inline-form-box">
          <label>{{ $t('create_listing.auction.collection.step3.description') }}*</label>
          <div class="inline-form-input">
            <textarea v-model="form.note" :placeholder="$t('create_listing.auction.collection.step3.description_placeholder')"></textarea>
          </div>
        </div>
        <div class="text-right">
          <button :disabled="!isFormValid" class="btn btn-dark h-auto px-5 add-to-listing-btn" @click="addToList">
            {{ $t('create_listing.auction.collection.step3.add_to_collection_label') }}
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <div v-if="form.box_condition == 'damaged_box'" class="mb-4 box-images">
          <div class="d-flex box-images-header">
            <div class="box-images-title">
              {{ $t('create_listing.auction.single.upload_box_images') }}<br>
              <small>*{{ $t('create_listing.auction.single.required') }}</small>
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
            <button class="btn btn-dark px-5" @click="openFileUploader">{{ $t('create_listing.auction.single.upload_images') }}</button>
          </div>
          <div class="d-flex flex-wrap box-images-content">
            <div v-for="(image, idx) in form.images" :key="idx" class="box-images-img">
              <img :src="image" />
              <svg class="close-icon" viewBox="0 0 22 22" @click="removeImage(idx)">
                <path d="M10.9496 11.4904L8.28643 14.1305L7.40641 13.2428L10.0696 10.6027L7.42955 7.93951L8.31728 7.05949L10.9573 9.72268L13.6205 7.08263L14.5005 7.97036L11.8374 10.6104L14.4774 13.2736L13.5897 14.1536L10.9496 11.4904Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
        <div class="collection-listing">
          <div class="collection-listing-title">{{ $t('create_listing.auction.collection.step3.current_collection_listing') }}</div>
          <div class="collection-listing-content">
            <b-table v-if="collectionItems.length" class="collections-table" :items="collectionItems" :fields="tableColumns">
              <template #cell(item)="row">
                <span>{{ `${row.item.brand} ${row.item.model}` }}</span>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 py-4 d-flex justify-content-end">
      <button :disabled="collectionItems.length < 1" class="btn btn-outline-dark px-5 next-outline-btn" @click="moveNext">{{ $t('create_listing.auction.collection.step3.button_label') }}</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AuctionCollectionDetails',
  data () {
    return {
      collectionItems: [],
      tableColumns: [
        {
          key: 'item',
          label: this.$t('create_listing.auction.collection.step3.table_columns.item'),
        },
        {
          key: 'color',
          label: this.$t('create_listing.auction.collection.step3.table_columns.colorway'),
        },
        {
          key: 'size',
          label: this.$t('create_listing.auction.collection.step3.table_columns.size'),
        }
      ],
      box_conditions: [
        {
          label: this.$t('trades.create_listing.good_condition'),
          key: 'good_condition',
        },
        {
          label: this.$t('trades.create_listing.new_condition'),
          key: 'new_condition',
        },
        {
          label: this.$t('trades.create_listing.damaged_box'),
          key: 'damaged_box',
        },
        {
          label: this.$t('trades.create_listing.missing_lid'),
          key: 'missing_lid',
        },
        {
          label: this.$t('trades.create_listing.no_original_box'),
          key: 'no_original_box',
        },
        {
          label: this.$t('trades.create_listing.none'),
          key: 'noe',
        }
      ],
      form: {
        box_condition: 'none',
        note: null,
        size: null,
        brand: null,
        model: null,
        object_type: null,
        color: null,
        pattern: null,
        size_label: null,
        category: null,
        images: [],
        price: null,
      },
      isFormValid: false,
    }
  },
  watch: {
    // Check if form is valid or not
    form: {
      handler(newV) {
        let isValid = true;
        if (!newV.note || !newV.brand || !newV.object_type || !newV.color || !newV.size || !newV.box_condition) {
          isValid = false;
        }
        if (newV.box_condition === 'damaged_box' && newV.images.length < 2) {
          isValid = false;
        }
        this.isFormValid = isValid;
      },
      deep: true
    }
  },
  methods: {
    // Change box_condition
    changeCondition(condition) {
      this.form = {
        ...this.form,
        box_condition: condition,
      }
    },
    // Open image file selector
    openFileUploader() {
      this.$refs.input_file.click()
    },
    // Save images to form object
    uploadBoxImages(evt) {
      const { files } = evt.target
      const images = []
      const count = files.length
      for (let i = 0; i < count; i++) {
        images.push(URL.createObjectURL(files[i]))
      }
      this.form = {
        ...this.form,
        images: this.form.images.concat(images)
      }
    },
    // Remove an image from form object
    removeImage(idx) {
      const { images } = this.form
      images.splice(idx, 1);
      this.form = {
        ...this.form,
        images,
      }
    },
    // Add item to collection listing
    addToList() {
      this.collectionItems.push(this.form);
      this.form = {};
      this.isFormValid = false;
    },
    // Move to next step
    moveNext() {
      this.$emit('can-continue', { items: this.collectionItems });
    }
  }
}
</script>