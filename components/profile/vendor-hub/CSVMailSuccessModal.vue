<template>
  <Modal
    :id="id"
    centered
    no-header-border
    no-footer-border
    hide-footer
    @hidden="$emit('hidden')"
  >
    <template #default>
      <div class="px-5">
        <b-row class="d-flex flex-row justify-content-center">
          <b-col md="12">
            <img :src="require('~/assets/img/profile/vendor-hub/csv_sent_logo.svg')" />
          </b-col>
          <b-col md="12 mt-1 mb-3">
            {{ $t('vendor_hub.commission.csv_mail_success') }}
          </b-col>
        </b-row>
      </div>
    </template>
  </Modal>
</template>

<script>
import {Modal} from '~/components/common';
export default {
  name: 'SuccessModal',
  components: {Modal},
  props:{
    id: {
      type: String,
      default: (Math.random() + 1).toString(36).substring(7)
    },
    showModal: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  watch: {
    showModal(val){
      if (val){
        this.$bvModal.show(this.id)
      }else {
        this.$bvModal.hide(this.id)
      }
    }
  }

}
</script>
