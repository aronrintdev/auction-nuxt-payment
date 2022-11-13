<template>
  <div>
    <div v-if="isResponsive">
          <b-card class="custom-card">
            <div class="d-flex">
              <div>
                <div class="body-5-normal mb-2">{{ fullName }}</div>
                <div class="body-5-regular">{{ fullAddress }}</div>
              </div>
              <div>
                <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
              </div>
            </div>
          </b-card>
    </div>
    <div v-else>
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
    </div>
  </div>

</template>

<script>
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'AddressCard',
  components: { PencilSquaredBlueSvg },
  mixins: [ screenSize ],
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
  },
  computed:{
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    },
  },
}
</script>
