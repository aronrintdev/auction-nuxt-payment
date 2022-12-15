<template>
  <b-container fluid class="h-100" :class="!isScreenXS ? 'container-profile-inventory-draft' : 'p-0'">
    <div v-if="!form"><Loader /></div>
    <div v-else>
      <ProductView v-model="form" :product="product"
                   :class="isScreenXS ? 'p-3' : ''"
                   @back="$router.push('/profile/inventory')">
        <InventoryNewForm slot="right-content"
                          ref="inventoryForm"
                          v-model="form"
                          class="mb-sm-4"
                          :is-edit-form="true"
                          :show-add-button="!isScreenXS"
                          :is-form-valid="isFormValid"
                          :is-form-touched="isFormTouched"
                          :show-buttons="!isScreenXS"
                          @submit="handleSaveClick"
                          @cancel="handleDiscardClick"/>
      </ProductView>

      <!-- Sales Graph and Sales Data Section -->
      <SalesSection :class="!isScreenXS ? 'sales-section' : ''"
                    :product="product"
                    :chart-header-class="'d-none mt-1'"
                    :chart-labels-style="chartLabelStyle"
      />
      <!-- End of Sales Graph and Sales Data Section -->

      <div v-if="isScreenXS" class="mt-5 mx-auto d-flex justify-content-center px-3">
        <Button
          variant="dark-blue"
          pill
          :disabled="!isFormValid || !isFormTouched"
          class="mr-2 body-10-medium px-4"
          @click="handleSaveClick"
        >
          {{ $t('inventory.save_changes') }}
        </Button>
        <Button variant="outline-dark" pill class="body-10-medium ml-2 px-4" @click="handleDiscardClick">
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
        :auto-hide-timeout="MODAL_FADE_TIMEOUT"
        @hidden="onSavedModalHidden"
      >
      </AlertModal>

      <AlertModal
        id="discarded-message-modal"
        :message="$t('inventory.message.discarded')"
        icon="trash"
        auto-hide
        :auto-hide-timeout="MODAL_FADE_TIMEOUT"
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
import ConfirmModal from '~/components/modal/Confirm'
import AlertModal from '~/components/modal/Alert'
import ProductView from '~/components/profile/create-listing/product/ProductView'
import SalesSection from '~/components/product/SalesSection'

export default {
  name: 'ProfileInventoryDraft',
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
  data() {
    return {
      form: null,
      MODAL_FADE_TIMEOUT: 2000,
    }
  },
  computed: {
    draftDetail() {
      return this.$store.getters['inventory/findDraftItem'](
        this.$route.query?.id
      )
    },

    product() {
      return this.draftDetail?.product
    },

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
      const { sizeId, quantity, price, packagingConditionId } = this.draftDetail
      return (
        Number(this.form.currentSize) !== sizeId ||
        Number(this.form.quantity) !== quantity ||
        Number(this.form.price) * 100 !== price ||
        Number(this.form.boxCondition) !== packagingConditionId
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
  mounted() {
    const { sizeId, quantity, price, packagingConditionId } = this.draftDetail
    this.form = {
      currentSize: sizeId,
      quantity,
      price: price / 100,
      boxCondition: packagingConditionId,
    }
  },
  methods: {
    ...mapActions({
      updateDraft: 'inventory/updateInventoryInDraft',
    }),
    handleSaveClick() {
      this.updateDraft({
        index: this.$route.query?.id,
        data: {
          product: this.product,
          sizeId: Number(this.form.currentSize),
          quantity: Number(this.form.quantity),
          price: Number(this.form.price) * 100,
          packagingConditionId: Number(this.form.boxCondition),
        },
      })
      this.$bvModal.show('saved-message-modal')
    },

    handleDiscardClick() {
      if (this.isFormTouched) {
        this.$bvModal.show('confirm-modal')
      } else {
        this.$router.push('/profile/inventory/confirm')
      }
    },

    onSavedModalHidden() {
      this.$router.push('/profile/inventory/confirm')
    },

    onDiscardedModalHidden() {
      this.$router.push('/profile/inventory/confirm')
    },

    onConfirmDiscard() {
      this.$bvModal.show('discarded-message-modal')
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-profile-inventory-draft
  padding: 30px  120px 0px 14px
  background-color: $color-white-5

.sales-section
  margin-top: 55px
</style>
