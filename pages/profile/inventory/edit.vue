<template>
  <b-container fluid class="h-100" :class="!isScreenXS ? 'container-profile-inventory-edit' : 'p-0'">
    <div v-if="loading"><Loader /></div>
    <div v-else-if="inventory">

      <ProductView v-model="form" :product="inventory.product"
                   :class="isScreenXS ? 'p-3' : ''"
                   @back="$router.push('/profile/inventory')">
        <InventoryNewForm
          slot="right-content"
          ref="inventoryForm"
          v-model="form"
          class="mb-sm-4"
          :is-edit-form="true"
          :show-add-button="!isScreenXS"
          :is-form-valid="isFormValid"
          :is-form-touched="isFormTouched"
          :show-buttons="!isScreenXS"
          @submit="handleSaveClick"
          @cancel="handleDiscardClick"
        />
      </ProductView>

      <!-- Sales Graph and Sales Data Section -->
      <SalesSection :class="!isScreenXS ? 'sales-section' : ''"
                    :product="inventory.product"
                    :chart-header-class="'d-none mt-1'"
                    :chart-labels-style="chartLabelStyle"
      />
      <!-- End of Sales Graph and Sales Data Section -->

      <div v-if="isScreenXS" class="mt-5 mx-auto d-flex justify-content-center">
        <Button
          variant="dark-blue"
          pill
          :disabled="!isFormValid || !isFormTouched"
          class="mr-4 px-4"
          @click="handleSaveClick"
        >
          {{ $t('inventory.save_changes') }}
        </Button>
        <Button class="px-4" variant="outline-dark" pill @click="handleDiscardClick">
          {{
            isFormTouched
              ? $t('inventory.discard_changes')
              : $t('common.cancel')
          }}
        </Button>
      </div>

      <AlertModal
        id="saved-message-modal"
        :message="$t('inventory.message.saved')"
        icon="tick"
        auto-hide
        @hidden="onSavedModalHidden"
      >
      </AlertModal>

      <AlertModal
        id="discarded-message-modal"
        :message="$t('inventory.message.discarded')"
        icon="trash"
        auto-hide
        @hidden="onDiscardedModalHidden"
      >
      </AlertModal>

      <ConfirmModal
        id="confirm-modal"
        :message="$t('inventory.message.confirm_discard')"
        :confirmLabel="$t('common.discard')"
        @confirm="onConfirmDiscard"
      />
    </div>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import { Button, Loader } from '~/components/common'
import InventoryNewForm from '~/components/inventory/NewForm'
import { AlertModal, ConfirmModal } from '~/components/modal'
import ProductView from '~/components/profile/create-listing/product/ProductView'
import SalesSection from '~/components/product/SalesSection'

export default {
  name: 'ProfileInventoryEdit',
  components: {
    Button,
    Loader,
    InventoryNewForm,
    ConfirmModal,
    AlertModal,
    ProductView,
    SalesSection
  },
  mixins: [screenSize],
  layout: 'Profile',
  fetchOnServer: false,
  data() {
    return {
      loading: false,
      inventory: null,
      form: {
        currentSize: null,
        quantity: null,
        price: null,
        boxCondition: null,
      },
    }
  },
  fetch() {
    const { id } = this.$route.query

    this.loading = true
    this.fetchInventory({ id }).then((data) => {
      this.form.currentSize = data.size_id
      this.form.quantity = data.stock
      this.form.price = parseInt(data.sale_price) / 100
      this.form.boxCondition = data.packaging_condition_id
      this.inventory = data
      this.loading = false
    })
  },
  computed: {
    isFormValid() {
      return (
        this.form.currentSize &&
        this.form.quantity &&
        this.form.price &&
        this.form.boxCondition &&
        this.form.quantity > 0 &&
        this.form.quantity < 51 &&
        this.form.price > 50
      )
    },

    isFormTouched() {
      return (
        Number(this.form.currentSize) !== this.inventory.size_id ||
        Number(this.form.quantity) !== this.inventory.stock ||
        Number(this.form.price) * 100 !== this.inventory.sale_price ||
        Number(this.form.boxCondition) !==
          this.inventory.packaging_condition_id
      )
    },

    chartLabelStyle() {
      if (this.isScreenSM)
        return { 'width': '80%', 'margin-left': '140px' }

      if (this.isScreenMD)
        return {'width': '70%', 'margin-left': '140px' }

      return {'width': '60%', 'margin-left': '160px' }
    }
  },
  methods: {
    ...mapActions({
      fetchInventory: 'inventory/fetchInventory',
      updateInventory: 'inventory/updateInventory',
    }),

    handleSaveClick() {
      this.updateInventory({
        id: this.$route.query?.id,
        data: {
          size_id: Number(this.form.currentSize),
          stock: Number(this.form.quantity),
          sale_price: Number(this.form.price) * 100,
          packaging_condition_id: Number(this.form.boxCondition),
        },
      })
      this.$bvModal.show('saved-message-modal')
    },

    handleDiscardClick() {
      if (this.isFormTouched) {
        this.$bvModal.show('confirm-modal')
      } else {
        this.$router.push('/profile/inventory')
      }
    },

    onSavedModalHidden() {
      this.$router.push('/profile/inventory')
    },

    onDiscardedModalHidden() {
      this.$router.push('/profile/inventory')
    },

    onConfirmDiscard() {
      this.$bvModal.show('discarded-message-modal')
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-profile-inventory-edit
  padding: 30px  120px 0px 14px
  background-color: $color-white-5

.sales-section
  margin-top: 55px
</style>
