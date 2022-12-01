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
      <b-card class="custom-card">
        <b-row>
          <b-col md="12">
            <PencilSquaredBlueSvg v-if="editable" class="btn-action" role="button" @click="$emit('edit')" />
            <div class="body-5-normal mb-1">{{ fullName }}</div>
            <div class="body-5-regular">{{ fullAddress }}</div>
          </b-col>
        </b-row>
      </b-card>
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

<style lang="sass" scoped>
.card
  &.custom-card
    .card-body
      @media (min-width: 576px)
        padding: 16px 20px
        min-height: 70px

        svg
          position: absolute
          top: -6px
          right: 0
</style>
