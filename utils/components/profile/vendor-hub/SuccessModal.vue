<template>
  <Modal
    :id="id+'-success'"
    centered
    no-header-border
    no-footer-border
    hide-footer
    @hidden="$emit('success-hidden')"
  >
    <template  #default>
      <div class="px-5">
        <b-row class="mb-4">
          <b-col md="12" >
            {{successModalBody || $t('vendor_hub.payout_method.changes_saved')}}
          </b-col>
        </b-row>
        <b-row class="d-flex justify-content-around">
          <Button
            iconOnly
            variant="primary"
            pill
          >
            <img :src="whiteCheck" alt="success check"/>
          </Button>
        </b-row>
      </div>
    </template>
  </Modal>
</template>

<script>
import whiteCheck from '~/assets/img/icons/white-check.svg'
import {Modal, Button} from '~/components/common';
export default {
  name: 'SuccessModal',
  components: {Modal, Button},
  props:{
    showSuccess: {
      type: Boolean,
      default: false
    },
    successModalBody: {
      type: [String, null],
      default: null
    },
    id: {
      type: String,
      default: (Math.random() + 1).toString(36).substring(7)
    },
  },
  data(){
    return {
      whiteCheck
    }
  }
}
</script>
