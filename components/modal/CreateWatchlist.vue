<template>
  <Modal
    :id="id"
    modal-class="create-list-modal"
    hide-footer
    @hidden="newListName = ''"
  >
    <template #header>
      <h5>{{ $t('watchlists.create_new_list') }}</h5>
    </template>

    <template #default="{}">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-container fluid>
          <b-form @submit.stop.prevent="handleSubmit(createNewList)">
            <b-row>
              <b-col md="10" offset-md="1">
                <ValidationProvider
                  v-slot="validationContext"
                  :name="$t('watchlists.list_name')"
                  :rules="{ required: true, min: 3, max: 255 }"
                >
                  <b-form-group
                    label-for="list-name"
                    :label="$t('watchlists.list_name')"
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
                  {{ $t('watchlists.create_list_helper') }}
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
                  variant="dark-blue"
                  pill
                  block
                  :disabled="!newListName || loading"
                >
                  {{ $t('watchlists.create_list') }}
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
import { mapActions, mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Modal from '~/components/common/Modal.vue'
import Button from '~/components/common/Button.vue'
import CheckboxSwitch from '~/components/common/CheckboxSwitch'

export default {
  name: 'CreateWatchlistModal',

  components: { Modal, ValidationObserver, ValidationProvider, Button, CheckboxSwitch },

  props: {
    id: {
      type: String,
      default: 'create-watchlist-modal',
    },
  },

  data() {
    return {
      newListName: '',
      newListPrivacy: false,
      loading: false,
      watchlist: null,
    }
  },

  computed: {
    ...mapGetters({
      getWatchlistsType: 'watchlist/getWatchlistsType',
    })
  },

  methods: {
    ...mapActions({
      createWatchlist: 'watchlist/createWatchlist',
    }),

    // Create new watchlist
    async createNewList() {
      if (this.newListName) {
        this.loading = true
        const watchlist = await this.createWatchlist({
          name: this.newListName,
          type: this.getWatchlistsType,
          privacy: this.newListPrivacy ? 'public' : 'private',
        })
        this.loading = false
        this.$emit('created', watchlist)
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

<style scoped lang="sass">
@import '~/assets/css/_variables'

::v-deep .checkbox-switch
  line-height: 32px
  span[role='button']
    font-family: $font-montserrat
    @include body-5-bold
    margin-top: 7px
  .custom-switch
    height: 31px
    margin-right: 20px
    .custom-control-label::before
      background-color: rgba(120, 120, 128, 0)
      border: none
      height: 31px
      width: 51px
      box-shadow: none
      background-image: url('~/assets/img/profile/wishlist/toggle-bg.svg')
      background-repeat: no-repeat

    .custom-control-label::after
      background: $color-white
      border: 0.5px solid rgba(0, 0, 0, 0.04)
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)
      width: 27px
      height: 27px
      border-radius: 100%

    .custom-control-input:checked ~ .custom-control-label::after
      transform: translateX(1.27rem)
</style>
