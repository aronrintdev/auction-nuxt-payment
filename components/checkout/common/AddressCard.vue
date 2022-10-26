<template>
  <b-row>
    <b-col class="col-md-12">
      <b-card class="custom-card">
        <b-row>
          <b-col md="11">
            <div class="body-5-normal mb-2">{{ fullName }}</div>
            <div class="body-5-regular">{{ fullAddress }}</div>
          </b-col>
          <b-col md="1" class="d-flex flex-column mt-2">
            <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'

export default {
  name: 'AddressCard',
  components: { PencilSquaredBlueSvg },
  props: {
    fullName: {
      type: String,
      required: true,
      default: ''
    },
    fullAddress: {
      type: String,
      required: true,
      default: ''
    },
    editable: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
