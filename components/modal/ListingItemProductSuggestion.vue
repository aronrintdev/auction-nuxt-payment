<template>
  <Modal :id="id" hide-footer no-border size="lg" @hidden="$emit('hidden')">
    <template #header>
      <div class="text-center">
        <h5>{{ $t('createlisting.suggest_a_new_product') }}</h5>
      </div>
    </template>

    <div class="modal-body content">
      <ValidationObserver ref="observer">
        <b-form @submit.prevent="onSubmit">
          <b-row class="my-1">
            <b-col sm="3">
              <label class="mr-sm-2" for="inline-form-custom-select-pref">{{
                $t('createlisting.sku_if_applicable')
              }}</label>
            </b-col>
            <b-col sm="9">
              <ValidationProvider
                :rules="{ required: !name || name.length === 0 }"
                :name="$t('common.sku')"
              >
                <b-form-group
                  id="input-group-shipping"
                  slot-scope="{ valid, errors }"
                >
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                  <b-form-input
                    v-model="sku"
                    :state="errors[0] ? false : valid ? true : null"
                    :placeholder="$t('createlisting.enter_sku')"
                  ></b-form-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <span class="text-capitalize">{{ $t('common.or') }}</span>
          <b-row class="my-1">
            <b-col sm="3">
              <label class="mr-sm-2" for="inline-form-custom-select-pref">{{
                $t('createlisting.product_name')
              }}</label>
            </b-col>
            <b-col sm="9">
              <ValidationProvider
                :rules="{ required: !sku || sku.length === 0 }"
                :name="$t('common.product_name')"
              >
                <b-form-group
                  id="input-group-shipping"
                  slot-scope="{ valid, errors }"
                >
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                  <b-form-input
                    v-model="name"
                    :state="errors[0] ? false : valid ? true : null"
                    :placeholder="$t('createlisting.enter_product_name')"
                  ></b-form-input>
                </b-form-group>
              </ValidationProvider>
            </b-col>
          </b-row>
          <Button
            :variant="`submit_to_ds`"
            class="mt-md-4 mt-3 text-white"
            type="submit"
          >
            {{ $t('createlisting.submit_to_ds') }}
          </Button>
        </b-form>
      </ValidationObserver>
    </div>
  </Modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { Modal, Button } from '~/components/common'

export default {
  name: 'ListingItemProductSuggestion',

  components: {
    Modal,
    Button,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      sku: '',
      name: '',
    }
  },

  methods: {
    // On submit
    onSubmit() {
      // Submit Form. SKU/Name to the parent for suggestion.
      this.$refs.observer.validate().then((success) => {
        if (success) {
          this.$bvModal.hide(this.id)
          this.$emit('showSuccess', { sku: this.sku, name: this.name })
          this.sku = ''
          this.name = ''
        }
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
input
  background: $color-white-1
  border: 1px solid $color-gray-4
  border-radius: 20px
.btn
  background: $color-blue-2
  border-radius: 59px
</style>
