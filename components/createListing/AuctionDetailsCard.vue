<template>
  <b-row class="d-flex flex-column">
    <div>
      <p class="title">{{$t('create_listing.collection.collection_details')}}</p>
    </div>
    <b-row class="mx-0">
      <b-col class="text-center table-header">{{ $t('common.name') }}</b-col>
      <b-col class="text-center table-header">{{ $t('create_listing.confirm.duration') }}</b-col>
      <b-col class="text-center table-header">{{ $t('create_listing.confirm.reserve') }}</b-col>
      <b-col class="text-center table-header">{{ $t('create_listing.confirm.starting_bid') }}</b-col>
      <b-col class="text-center table-header">{{ $t('create_listing.confirm.status') }}</b-col>
      <b-col v-if="!editDisabled" class="text-center table-header">{{ $t('create_listing.collection.actions') }}</b-col>
    </b-row>
    <b-row v-if="item" class="bg-white rounded details-info mx-0">
      <b-col class="detail-text name text-center my-auto" data-toggle="tooltip" data-placement="bottom" :title="item.name">{{item.name}}</b-col>
      <b-col class="detail-text text-center my-auto">{{ item.time_limit }} Day</b-col>
      <b-col class="detail-text text-center my-auto"><span v-show="item.is_reserved">{{ '$' + item.reserve_price  }}</span></b-col>
      <b-col class="detail-text text-center my-auto">${{  item.start_bid_price  }}</b-col>
      <b-col class="detail-text text-center my-auto text-capitalize">{{  item.status }}</b-col>
      <b-col v-if="!editDisabled" class="detail-text text-center my-auto">
        <Button
          variant="outline-primary"
          :icon="pencil"
          :iconPos="'right'"
          :icon-hover="pencilW"
          class="p-1 ml-3 edit-btn"
          @click="editClicked"
        >{{ $t('create_listing.collection.edit_details') }}</Button
        >
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import { Button } from '~/components/common'
import pencil from '~/assets/img/icons/pencil.svg';
import pencilW from '~/assets/img/icons/pencil-white.svg';

export default {
  name: 'AuctionDetailsCard',
  components: {Button},
  props: {
    item: {
      type: Object,
      default: null,
    },
    editDisabled: {
      type: Boolean,
      default: false,
    }
  },
  data(){
    return{
      pencil,
      pencilW
    }
  },
  methods: {
    editClicked(){
      this.$emit('edit');
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.detail-text
  font-family: $font-sp-pro
  font-weight: $regular
  @include body-13
  color: $black
  &.name
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
.table-header
  font-family: $font-sp-pro
  font-weight: $normal
  @include body-12
  color: $black

p.title
  font-family: $font-sp-pro
  font-weight: $bold
  @include body-12
  color: $black
  margin-bottom: 20px

.edit-btn.btn
  color: $color-blue-20
  border-color: $color-blue-20
  height: auto

.details-info
  height: 125px
</style>
