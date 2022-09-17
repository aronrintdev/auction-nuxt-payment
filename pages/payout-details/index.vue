<template>
  <b-container v-if="!loading" fluid class="payout-details-container">
    <section v-if="payoutMethods.length" class="section-payout-method">
      <h3 class="title mb-3">
        {{ $t('payout_details.connected_payout_method') }}
      </h3>

      <b-table
        :items="payoutMethods"
        :fields="payoutFields"
        :busy="loading"
        class="mt-3"
        details-td-class="text-center"
      >
        <template #head(check_name)>
          {{ $t('payout_details.owner_name') }}
        </template>

        <template #head(check_account)>
          {{ $t('payout_details.account_number') }}
        </template>

        <template #head(check_aba)>
          {{ $t('payout_details.routing_number') }}
        </template>

        <template #head(actions)>&nbsp;</template>

        <template #cell(check_name)="row">
          {{ row.item.check_name }} {{ row.item.is_default ? '(default)' : '' }}
        </template>

        <template #cell(actions)="row">
          <b-button
            size="sm"
            variant="link"
            class="link-primary"
            @click="onClickEdit(row.item, row.index, $event.target)"
          >
            {{ $t('common.edit') }}
          </b-button>
          <span>|</span>
          <b-button
            variant="link"
            class="link-danger"
            @click="onClickDelete(row.item)"
          >
            {{ $t('common.delete') }}
          </b-button>
          <b-form-checkbox
            v-if="!row.item.is_default"
            v-model="isDefault"
            size="sm"
            class="default-checkbox"
            @change="handleSetDefault(row.item)"
          >
            {{ $t('payout_details.make_default') }}
          </b-form-checkbox>
        </template>
      </b-table>
    </section>

    <section
      v-if="payoutMethods.length < MAX_PAYOUT_METHODS || isEditing"
      class="section-payout-method"
    >
      <h3 class="title my-3">
        {{
          isEditing
            ? $t('payout_details.edit_payout_method')
            : $t('payout_details.connect_payout_method')
        }}
      </h3>

      <p class="desc mb-2">
        {{ $t('payout_details.enter_bank_info') }}
      </p>
      <p class="note mb-1">
        {{ $t('payout_details.important_note_1') }}
      </p>
      <p class="note">
        {{ $t('payout_details.important_note_2') }}
      </p>

      <b-form class="payout-form">
        <b-row>
          <b-col cols="3">
            <label for="checkaccount" class="col-form-label">
              {{ $t('payout_details.account_number') }}
            </label>
          </b-col>
          <b-col id="checkaccount" cols="auto"> </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label for="checkaba" class="col-form-label">
              {{ $t('payout_details.routing_number') }}
            </label>
          </b-col>
          <b-col id="checkaba" cols="auto"> </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <label for="checkname" class="col-form-label">
              {{ $t('payout_details.owner_name') }}
            </label>
          </b-col>
          <b-col id="checkname" cols="auto"> </b-col>
        </b-row>
        <b-button id="btnSave" ref="saveButton" variant="primary" class="mt-3">
          {{ $t('payout_details.save_payout_method') }}
        </b-button>
        <b-button
          v-if="isEditing"
          variant="secondary"
          class="mt-3"
          @click="onClickCancel()"
        >
          {{ $t('common.cancel') }}
        </b-button>
      </b-form>
    </section>
  </b-container>
</template>
<script>
import { MAX_PAYOUT_METHODS } from '~/static/constants/environments'

export default {
  name: 'PayoutDetails',

  components: {},

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      isEditing: false,
      loading: true,
      payoutMethods: [],
      payoutFields: [
        { key: 'check_name' },
        { key: 'check_account', class: 'text-left' },
        { key: 'check_aba', class: 'text-left' },
        { key: 'actions', class: 'text-right' },
      ],
      isDefault: false,
      MAX_PAYOUT_METHODS,
    }
  },

  async fetch() {
    this.loading = true
    this.payoutMethods = await this.$axios
      .get('/payout-methods')
      .then((res) => res.data)

    if (this.payoutMethods.length < this.MAX_PAYOUT_METHODS) {
      // Inject NMI collectJS form into page if the number of payout methods is not exceeded maximum count
      this.injectCollectJS(() => {
        CollectJS.configure({
          paymentSelector: '#btnSave',
          fields: {
            checkaccount: {
              selector: '#checkaccount',
              title: 'Account Number',
              placeholder: '0000000000000000',
            },
            checkaba: {
              selector: '#checkaba',
              title: 'Routing Number',
              placeholder: '0000000000000000',
            },
            checkname: {
              selector: '#checkname',
              title: 'Name on Checking Account',
              placeholder: this.$t('payout_details.customer_name'),
            },
          },
          variant: 'inline',
          styleSniffer: 'true',
          callback: (response) => {
            this.$refs.saveButton.disabled = true
            this.$axios
              .post('/payout-methods', {
                payment_token: response.token,
              })
              .then((res) => {
                this.$refs.saveButton.disabled = false
                this.$nuxt.refresh()
              })
          },
        })
      })
    }
    this.loading = false
  },

  fetchOnServer: false,

  unmounted() {
    this.removeCollectJS()
  },

  methods: {
    // Inject collectJS form when user click edit button in payout method row
    onClickEdit(item) {
      this.isEditing = true
      this.injectCollectJS(() => {
        /* global CollectJS */
        /* eslint no-undef: 1 */
        CollectJS.configure({
          paymentSelector: '#btnSave',
          fields: {
            checkaccount: {
              selector: '#checkaccount',
              title: 'Account Number',
              placeholder: item.check_account,
            },
            checkaba: {
              selector: '#checkaba',
              title: 'Routing Number',
              placeholder: item.check_aba,
            },
            checkname: {
              selector: '#checkname',
              title: 'Name on Checking Account',
              placeholder: item.check_name,
            },
          },
          variant: 'inline',
          styleSniffer: 'true',
          callback: (response) => {
            this.$refs.saveButton.disabled = true
            this.$axios
              .put('/payout-methods/' + item.id, {
                payment_token: response.token,
              })
              .then(() => {
                this.$refs.saveButton.disabled = false
                this.isEditing = false
                this.$nuxt.refresh()
              })
          },
        })
      })
    },

    // Delete payout method when user click delete button in payout method row
    onClickDelete(item) {
      this.$axios.delete('/payout-methods/' + item.id).then(() => {
        this.$nuxt.refresh()
      })
    },

    // Cancel editing payout method and removes collectJS form
    onClickCancel() {
      this.isEditing = false
      this.$nuxt.refresh()
    },

    // Inject Collect.js into document head
    // ! Do not use head property here because collect.js raises error if script tag has extra attrs like `data-n-head`
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

    // Remove collectJS form elements and script tag
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

    // Set default payout method
    handleSetDefault(item) {
      if (this.isDefault) {
        this.$axios.post('/payout-methods/' + item.id + '/default').then(() => {
          this.isDefault = false
          this.$nuxt.refresh()
        })
      }
    },
  },
}
</script>
