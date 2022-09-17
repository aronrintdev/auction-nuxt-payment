<template>
  <b-row class="h-100 w-100 d-flex flex-column p-3">
    <div>
      <p class="title">{{$t('create_listing.collection.collection_details')}}</p>
    </div>
    <b-row>
      <b-col class="text-center"><span class="table-header">{{ $t('common.name') }}</span></b-col>
      <b-col class="text-center"><span class="table-header">{{ $t('create_listing.confirm.duration') }}</span></b-col>
      <b-col class="text-center"><span class="table-header">{{ $t('create_listing.confirm.reserve') }}</span></b-col>
      <b-col class="text-center"><span class="table-header">{{ $t('create_listing.confirm.starting_bid') }}</span></b-col>
      <b-col class="text-center"><span class="table-header">{{ $t('create_listing.confirm.status') }}</span></b-col>
      <b-col v-if="!editDisabled" class="text-center"><span class="table-header">{{ $t('create_listing.collection.actions') }}</span></b-col>
    </b-row>
    <b-row v-if="item" class="bg-white rounded py-4 mt-2">
      <b-col class="detail-text name text-center my-auto" data-toggle="tooltip" data-placement="bottom" :title="item.name">{{item.name}}</b-col>
      <b-col class="detail-text text-center my-auto">{{ item.time_limit }} Day</b-col>
      <b-col class="detail-text text-center my-auto"><span v-show="item.is_reserved">{{ '$' + item.reserve_price  }}</span></b-col>
      <b-col class="detail-text text-center my-auto">${{  item.start_bid_price  }}</b-col>
      <b-col class="detail-text text-center my-auto">{{  item.status.toUpperCase()  }}</b-col>
      <b-col v-if="!editDisabled" class="detail-text text-right my-auto">
        <Button
          variant="outline-primary"
          :icon="pencil"
          :iconPos="'right'"
          :icon-hover="pencilW"
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
  @include body-5-medium
  &.name
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
.table-header
  @include body-4-bold
p.title
  @include body-1
  color: $color-black-1

</style>
