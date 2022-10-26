<template>
  <div>
      <b-form class="d-flex flex-column" >
        <div class="d-flex flex-column flex-sm-row align-items-start mt-4">
            <b-form-group
              label-for="accountName"
              class="w-100 mr-0 mr-sm-4"
            >
              <template #label>
                <span class="px-2">{{ $t('vendor_hub.payout_method.name_of_account') }}</span>
              </template>
              <b-input-group>
                <div id="accountName"></div>
                <div v-if="frameLoading" class="d-flex">
                  <Loader :loading="frameLoading"></Loader>
                </div>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-for="accountNumber"
              class="w-100"
            >
              <template #label>
                <span class="px-2">{{ $t('vendor_hub.payout_method.account_number') }}</span>
              </template>
              <b-input-group>
                <div id="accountNumber"></div>
                <div v-if="frameLoading" class="d-flex">
                  <Loader :loading="frameLoading"></Loader>
                </div>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-for="routingNumber"
              class="w-100 ml-0 ml-sm-4"
            >
              <template #label>
                <span class="px-2">{{ $t('vendor_hub.payout_method.routing_number') }}</span>
              </template>
              <b-input-group>
                <div id="routingNumber"></div>
                <div v-if="frameLoading" class="d-flex">
                  <Loader :loading="frameLoading"></Loader>
                </div>
              </b-input-group>
            </b-form-group>
        </div>
        <b-form-radio v-model="form.is_default" name="is_default" :value="true" class="mt-4">
          {{ $t('vendor_hub.payout_method.set_default') }}
        </b-form-radio>
        <div class="mt-4 d-flex flex-column flex-sm-row justify-content-center">
          <b-button :disabled="modalActionLoading"   pill class="bg-blue-2 mx-sm-3" @click="saveChanges">
            {{ $t('vendor_hub.payout_method.save_changes') }}
          </b-button>
          <b-button id="btnSave" ref="btnSave" pill class="bg-blue-2 d-none mx-sm-3">
            {{ $t('vendor_hub.payout_method.save_changes') }}
          </b-button>

          <b-button pill variant="outline-dark" class="mx-sm-3 mt-3 mt-sm-0" @click="discardData">
            {{ $t('vendor_hub.payout_method.discard_changes') }}
          </b-button>
        </div>
      </b-form>


    <div class="mt-5 tos-text text-center">
      {{ $tc('vendor_hub.payout_method.tos', 0) }}
      <span class="px-1 tos" role="button">{{ $tc('vendor_hub.payout_method.tos', 1) }}</span>
      {{ $tc('vendor_hub.payout_method.tos', 2) }}
    </div>

    <ConfirmModal
      :id="'payout-method-modal'"
      :modal-action-loading="modalActionLoading"
      :save-modal-body="confirmModalBody"
      :success-modal-body="$t('vendor_hub.payout_method.changes_saved')"
      :confirm-text="confirmButtonText"
      :show-confirm="confirmModal"
      @confirm-hidden="confirmModal = false"
      @confirm-accept="modalOk"
    />
    <SuccessModal
      :success-modal-body="$t('vendor_hub.payout_method.delete_success')"
      :show-success="finishedModal"
      @success-hidden="finishedModal = false"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {MAX_PAYOUT_METHODS} from '~/static/constants/environments';
import Loader from '~/components/common/Loader';
import SuccessModal from '~/components/profile/vendor-hub/SuccessModal';
import ConfirmModal from '~/components/profile/vendor-hub/ConfirmModal';

export default {
  name: 'VendorPayoutForm',
  components: {Loader, SuccessModal, ConfirmModal},
  props: {
    editMode:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmModal: false,
      finishedModal: false,
      modalActionLoading: false,
      form: {
        accountName: null,
        accountNumber: null,
        routingNumber: null,
        is_default: false,
      },
      frameLoading: false,
      discardActive: false,
    }
  },
  computed:{
    ...mapGetters({
      editedPayout: 'vendor-hub/getEditedPayout'
    }),
    confirmModalBody(){
      return this.discardActive? this.$t('vendor_hub.discard_body') : this.$t('vendor_hub.payout_method.save_changes_body')
    },
    confirmButtonText(){
      return this.discardActive? this.$t('vendor_hub.discard') : this.$t('common.save')
    }
  },
  watch:{
    editedPayout:{
      deep: true,
      handler(val){
        if (val)
          this.form = JSON.parse(JSON.stringify(val))
      }
    }
  },
  mounted() {
    this.initPayoutMethods()
  },
  unmounted() {
    this.removeCollectJS()
  },
  methods: {
    ...mapActions({
      fetchPayoutMethods: 'vendor-hub/fetchPayoutMethods',
      createPayoutMethods: 'vendor-hub/createPayoutMethods',
      updatePayoutMethods: 'vendor-hub/updatePayoutMethods'
    }),
    discardData(){
      if (this.editMode){
        this.discardActive = true
        this.confirmModal = true
      }else {
        this.$emit('discard')
      }
    },
    modalOk(){
      if (this.discardActive){
        this.discardActive = false
        this.confirmModal = false
        this.$emit('discard')
      }else {
        this.$refs.btnSave.click()
        this.modalActionLoading = true
      }
    },
    initPayoutMethods(){
      this.frameLoading = true
      this.fetchPayoutMethods().then(res => {
        const methods = res.data.data
        if (methods.length < MAX_PAYOUT_METHODS) {
          // Inject NMI collectJS form into page if the number of payout methods is not exceeded maximum count
          this.injectCollectJS(() => {
            // eslint-disable-next-line no-undef
            CollectJS.configure({
              paymentSelector: '#btnSave',
              theme: 'bootstrap',
              customCss: {
                width: '100%',
                'max-width': '250px',
                'border-radius': '50rem',
                'background-color': '#F7F7F7',
                border: 'none',
                height: '42px',
                padding: '4px 20px'
              },
              fields: {
                checkaccount: {
                  selector: '#accountNumber',
                  title: this.$t('vendor_hub.payout_method.account_number'),
                  placeholder: this.$t('vendor_hub.payout_method.enter_account'),
                },
                checkaba: {
                  selector: '#routingNumber',
                  title: this.$t('vendor_hub.payout_method.routing_number'),
                  placeholder: this.$t('vendor_hub.payout_method.routing_number_placeholder'),
                },
                checkname: {
                  selector: '#accountName',
                  title: this.$t('vendor_hub.payout_method.name_of_account'),
                  placeholder: this.$t('vendor_hub.payout_method.enter_name'),
                }
              },
              fieldsAvailableCallback: () =>{
                this.frameLoading = false
              },
              variant: 'inline',
              styleSniffer: 'true',
              callback: (response) => {
                if (this.editMode){
                  this.updatePayoutMethods({
                    id: this.editedPayout.id,
                    payment_token: response.token,
                  }).then(res => {
                    this.finishedModal = true
                    this.$emit('discard')
                    this.$emit('update')
                  }).catch(err => {
                    this.$toasted.error(err)
                  }).finally(() => {
                    this.modalActionLoading = false
                    this.confirmModal = false
                  })
                }else{
                  this.createPayoutMethods({
                    payment_token: response.token
                  }).then(res => {
                    this.finishedModal = true
                    this.$emit('discard')
                    this.$emit('update')
                  }).catch(err => {
                    this.$toasted.error(err)
                  }).finally(() => {
                    this.modalActionLoading = false
                    this.confirmModal = false
                  })
                }

              },
            })
          })
        }
      })

    },
    injectCollectJS(callback) {
      this.removeCollectJS()
      const el = document.querySelector(
        'script[src="https://secure.networkmerchants.com/token/Collect.js"]'
      )
      if (el) {
        callback()
      } else {
        const el = document.createElement('script')
        el.setAttribute(
          'src',
          'https://secure.networkmerchants.com/token/Collect.js'
        )
        el.setAttribute('data-tokenization-key', process.env.NMI_PUBLIC_KEY)
        el.async = true
        el.addEventListener('load', () => callback())
        document.head.appendChild(el)
      }
    },
    removeCollectJS() {
      let el = document.querySelector(
        'script[src="https://secure.networkmerchants.com/token/Collect.js"]'
      )
      if (el) document.head.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckaba"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckaccount"]')
      if (el) el.parentNode.removeChild(el)
      el = document.querySelector('iframe[id="CollectJSInlinecheckname"]')
      if (el) el.parentNode.removeChild(el)
    },
    getValidationState({dirty, validated, valid = null}) {
      // Returns the contextual state (validation style) of the element being validated (false for invalid, true for valid, or null for no validation state)
      return dirty || validated ? valid : null
    },
    saveChanges() {
      this.discardActive = false
      this.confirmModal = true
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.bg-blue-2.btn
  background: $color-blue-2
  border: 1px solid $color-blue-2

.tos-text
  @include body-4
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.mt-8
  margin-top: 8rem

.tos
  text-decoration: underline

div.input-group
  display: flex
  flex-direction: column

div.invalid-feedback
  width: auto

</style>
