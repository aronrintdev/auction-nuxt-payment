<template>
  <b-container fluid class="container-profile-inventory-draft h-100">
    <div v-if="!form"><Loader /></div>
    <div v-else>
      <InventoryNewForm v-model="form" :product="product" :show-add-button="false" />

      <div class="mt-5 mx-auto d-flex justify-content-center">
        <Button
          variant="info"
          pill
          :disabled="!isFormValid || !isFormTouched"
          class="mr-4"
          @click="handleSaveClick"
        >
          {{ $t('inventory.save_changes') }}
        </Button>
        <Button variant="outline-dark" pill @click="handleDiscardClick">
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
import { Button, Loader } from '~/components/common'
import InventoryNewForm from '~/components/inventory/NewForm'
import ConfirmModal from '~/components/modal/Confirm'
import AlertModal from '~/components/modal/Alert'

export default {
  name: 'ProfileInventoryDraft',

  components: {
    Button,
    Loader,
    InventoryNewForm,
    ConfirmModal,
    AlertModal,
  },

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
        this.form.sizeId &&
        this.form.quantity &&
        this.form.price &&
        this.form.packagingConditionId &&
        this.form.quantity > 0 &&
        this.form.quantity < 51 &&
        this.form.price > 50
      )
    },

    isFormTouched() {
      const { sizeId, quantity, price, packagingConditionId } = this.draftDetail
      return (
        Number(this.form.sizeId) !== sizeId ||
        Number(this.form.quantity) !== quantity ||
        Number(this.form.price) * 100 !== price ||
        Number(this.form.packagingConditionId) !== packagingConditionId
      )
    },
  },

  mounted() {
    const { sizeId, quantity, price, packagingConditionId } = this.draftDetail
    this.form = {
      sizeId,
      quantity,
      price: price / 100,
      packagingConditionId,
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
          sizeId: Number(this.form.sizeId),
          quantity: Number(this.form.quantity),
          price: Number(this.form.price) * 100,
          packagingConditionId: Number(this.form.packagingConditionId),
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
  padding: 47px 54px
  background-color: $color-white-5
</style>
