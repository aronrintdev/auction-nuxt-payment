<template>
  <Modal
    :id="id"
    modal-class="create-list-modal"
    hide-footer
    @hidden="newListName = ''"
  >
    <template #header>
      <h5>{{ $t('wish_lists.create_new_list') }}</h5>
    </template>

    <template #default="{}">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-container fluid>
          <b-form @submit.stop.prevent="handleSubmit(createNewList)">
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
            <b-row>
              <b-col md="10" offset-md="1">
                <b-form-text id="input-live-help">
                  {{ $t('wish_lists.create_list_helper') }}
                </b-form-text>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="10" offset-md="1">
                <CheckboxSwitch
                  v-model="newListPrivacy"
                  :label-on="$t('common.public').toUpperCase()"
                  :label-off="$t('common.private').toUpperCase()"
                />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="5" offset-md="1">
                <Button
                  ref="btnSave"
                  type="submit"
                  variant="primary"
                  pill
                  block
                  :disabled="!newListName || loading"
                >
                  {{ $t('wish_lists.create_list') }}
                </Button>
              </b-col>
              <b-col md="5">
                <Button
                  variant="outline-dark"
                  pill
                  block
                  @click.prevent="$bvModal.hide(id)"
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
import CheckboxSwitch from '~/components/common/CheckboxSwitch'

export default {
  name: 'CreateWishListModal',

  components: { Modal, ValidationObserver, ValidationProvider, Button, CheckboxSwitch },

  props: {
    id: {
      type: String,
      default: 'create-list-modal',
    },
  },

  data() {
    return {
      newListName: '',
      newListPrivacy: false,
      loading: false,
      wishList: null,
    }
  },

  methods: {
    ...mapActions({
      createWishList: 'wish-list/createWishList',
    }),

    // Create new wishlist
    async createNewList() {
      if (this.newListName) {
        this.loading = true
        const wishList = await this.createWishList({
          name: this.newListName,
          privacy: this.newListPrivacy ? 'public' : 'private',
        })
        this.loading = false
        this.$emit('created', wishList)
        this.$bvModal.hide(this.id)
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
  },
}
</script>
