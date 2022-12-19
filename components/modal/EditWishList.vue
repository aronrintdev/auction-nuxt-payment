<template>
  <Modal
    id="edit-list-modal"
    modal-class="edit-list-modal"
    hide-footer
    @hidden="newListName = ''"
  >
    <template #header>
      <h5>{{ $t('wish_lists.rename_list') }}</h5>
    </template>

    <template #default="{}">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-container fluid>
          <b-form @submit.stop.prevent="handleSubmit(handleEditWishList)">
            <b-row>
              <b-col md="10" offset-md="1">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('wish_lists.list_name')"
                  :rules="{ required: true, min: 3, max: 255 }"
                >
                  <b-form-group
                    label-for="list-name"
                    :label="$t('wish_lists.list_name')"
                  >
                    <b-form-input
                      id="list-name"
                      v-model="newListName"
                      aria-describedby="input-live-help"
                      trim
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{
                        validationContext.errors[0]
                      }}</b-form-invalid-feedback>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="5" offset-md="1">
                <Button
                  ref="btnSave"
                  type="submit"
                  variant="dark-blue"
                  pill
                  block
                  :disabled="!newListName || loading"
                >
                  {{ $t('wish_lists.rename_list') }}
                </Button>
              </b-col>
              <b-col md="5">
                <Button
                  variant="outline-dark"
                  pill
                  block
                  @click.prevent="$bvModal.hide('edit-list-modal')"
                >
                  {{ $t('common.cancel') }}
                </Button>
              </b-col>
            </b-row>
          </b-form>
        </b-container>
      </ValidationObserver>
    </template>
  </Modal>
</template>
<script>
import { mapActions } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Modal from '~/components/common/Modal.vue'
import Button from '~/components/common/Button.vue'

export default {
  name: 'EditWishListModal',

  components: { Modal, ValidationObserver, ValidationProvider, Button },

  props: {
    wishListItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      newListName: '',
      loading: false,
    }
  },
  mounted() {
      this.newListName = this.wishListItem?.name
  },
  methods: {
    ...mapActions({
      editWishList: 'wish-list/editWishList',
    }),

    // Edit selected wishlist
    async handleEditWishList() {
      if (this.newListName) {
        this.loading = true
        const updatedWishList = await this.editWishList({
          id: this.wishListItem.id,
          name: this.newListName,
        })
        this.loading = false
        this.$emit('created', updatedWishList)
        this.$bvModal.hide('edit-list-modal')
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
  },
}
</script>
