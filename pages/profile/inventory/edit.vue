<template>
  <b-container fluid class="container-profile-inventory-edit h-100">
    <div v-if="loading"><Loader /></div>
    <div v-else-if="inventory">
      <InventoryNewForm v-model="form" :product="inventory.product" />

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
import { Button, Loader } from '~/components/common'
import InventoryNewForm from '~/components/inventory/NewForm'
import { AlertModal, ConfirmModal } from '~/components/modal'

export default {
  name: 'ProfileInventoryEdit',

  components: {
    Button,
    Loader,
    InventoryNewForm,
    ConfirmModal,
    AlertModal,
  },

  layout: 'Profile',

  fetchOnServer: false,

  data() {
    return {
      loading: false,
      inventory: null,
      form: {
        sizeId: null,
        quantity: null,
        price: null,
        packagingConditionId: null,
      },
    }
  },

  fetch() {
    const { id } = this.$route.query

    this.loading = true
    this.fetchInventory({ id }).then((data) => {
      this.form.sizeId = data.size_id
      this.form.quantity = data.stock
      this.form.price = parseInt(data.sale_price) / 100
      this.form.packagingConditionId = data.packaging_condition_id
      this.inventory = data
      this.loading = false
    })
  },

  computed: {
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
      return (
        Number(this.form.sizeId) !== this.inventory.size_id ||
        Number(this.form.quantity) !== this.inventory.stock ||
        Number(this.form.price) * 100 !== this.inventory.sale_price ||
        Number(this.form.packagingConditionId) !==
          this.inventory.packaging_condition_id
      )
    },
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
          size_id: Number(this.form.sizeId),
          stock: Number(this.form.quantity),
          sale_price: Number(this.form.price) * 100,
          packaging_condition_id: Number(this.form.packagingConditionId),
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
  padding: 47px 54px
  background-color: $color-white-5
</style>
