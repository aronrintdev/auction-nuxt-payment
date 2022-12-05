<template>
  <div>
    <b-form class="d-flex flex-column" >
        <div class="d-flex flex-column flex-sm-row align-items-start mt-4">
            <b-form-group
              label-for="accountName"
              class="w-100 mr-0 mr-sm-4"
            >
              <template #label>
                <span :class="{'label' : isMobileSize}">{{ $t('vendor_hub.payout_method.name_of_account') }}</span>
              </template>
              <b-input-group class="fix">
                <div id="accountName"></div>
                <div v-if="frameLoading" class="d-flex">
                  <Loader :loading="frameLoading"></Loader>
                </div>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-for="accountNumber"
              class="w-100 fix"
            >
              <template #label>
                <span :class="{'label' : isMobileSize}">{{ $t('vendor_hub.payout_method.account_number') }}</span>
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
              class="w-100 ml-0 ml-sm-4 fix"
            >
              <template #label>
                <span :class="{'label' : isMobileSize}">{{ $t('vendor_hub.payout_method.routing_number') }}</span>
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
          <span :class="{'label' : isMobileSize}">{{ $t('vendor_hub.payout_method.set_default') }}</span>
        </b-form-radio>
        <div class="mt-4 d-flex justify-content-center" :class="{'flex-row-reverse' : isScreenXS}">
          <b-button :disabled="modalActionLoading || !isValid"
                    pill
                    class="bg-blue-2 mx-3"
                    :class="{'w-50' : isScreenXS}"
                    @click="saveChanges">
            <span :class="{'body-9-normal' : isScreenXS}"> {{ $t('vendor_hub.payout_method.save_changes') }}</span>
          </b-button>
          <b-button id="btnSave" ref="btnSave" pill class="bg-blue-2 d-none mx-sm-3" :class="{'w-50' : isScreenXS}">
            <span :class="{'body-9-normal' : isScreenXS}">{{ $t('vendor_hub.payout_method.save_changes') }}</span>
          </b-button>

          <b-button pill variant="outline-dark" class="mx-3" @click="discardData"
                    :class="{'body-9 w-50' : isScreenXS}">
            <span :class="{'body-9-normal' : isScreenXS}">
              {{ isScreenXS ? $t('common.cancel') : $t('vendor_hub.payout_method.discard_changes') }}
            </span>
          </b-button>
        </div>
      </b-form>
    <div class="mt-5" :class="isScreenXS ? 'tos-text-mobile text-left' : 'tos-text text-center'">
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
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'VendorPayoutForm',
  components: {Loader, SuccessModal, ConfirmModal},
  props: {
    editMode:{
      type: Boolean,
      default: false
    }
  },
  mixins: [screenSize],
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
      validationStatus: {
        checkname: false,
        checkaccount: false,
        checkaba: false
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
    },
    isValid() {
      return this.validationStatus.checkname && this.validationStatus.checkaba && this.validationStatus.checkname
    },
    isMobileSize() {
      return this.isScreenXS
    },
    inputStyle() {
      const webSizeCss = {
        width: '100%',
        'max-width': '250px',
        'border-radius': '50rem',
        'background-color': '#F7F7F7',
        border: 'none',
        height: '42px',
        padding: '4px 20px'
      }
      const mobileSizeCss = {
        width: '85%',
        'border-radius': '10px',
        'background-color': '#FFFFFF',
        border: 'solid 1px #E8E8E8',
        height: '49px',
        padding: '10px 20px',
        fontFamily: 'Montserrat',
        'font-size': '14px',
        fontWeight: 500
      }

      return this.isMobileSize ? mobileSizeCss : webSizeCss
    }
  },
  watch:{
    editedPayout:{
      deep: true,
      handler(val){
        if (val)
          this.form = JSON.parse(JSON.stringify(val))
      }
    },
    isMobileSize() {
      this.initPayoutMethods()
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
              customCss: this.inputStyle,
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
              invalidCss: {
                'border':'solid 1px red',
              },
              validationCallback: (fieldName, valid, message)  => {
                if (!valid) {
                  this.frameLoading = false
                  this.confirmModal = false
                  this.modalActionLoading = false
                }
                this.validationStatus[fieldName] = valid
              }
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
  background: $color-blue-20
  border: 1px solid $color-blue-20

.tos-text
  @include body-4
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular

.tos-text-mobile
  position: absolute
  left: 0px
  padding-left: 16px
  @include body-9
  font-family: $font-montserrat
  font-style: normal
  font-weight: $regular
  .tos
    color: $color-blue-20

.mt-8
  margin-top: 8rem

.tos
  text-decoration: underline

div.input-group
  display: flex
  flex-direction: column

div.invalid-feedback
  width: auto

.label
  @include body-9-medium
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal

.fix
  margin-right: 2px
</style>
