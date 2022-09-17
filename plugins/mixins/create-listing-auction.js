import _ from 'lodash';
import {mapGetters} from 'vuex';
import {MAX_RESERVE_FEE, MIN_RESERVE_FEE, RESERVE_FEE_PERCENTAGE} from '~/static/constants/create-listing';

export default {
  computed: {
    ...mapGetters({
      getCollectionStates: 'create-listing/getCollectionStates',
      getCollectionState: 'create-listing/getCollectionState',
    }),
    steps(){
      return this.getCollectionStates?.map( a => {
        return {
          label: this.$t('create_listing.collection.progress.' + a),
          value: a
        }
      })
    }
  },
  methods: {
    calculateFee(amount){
      const calcAmount =  amount * RESERVE_FEE_PERCENTAGE / 100;

      if (calcAmount>MIN_RESERVE_FEE && calcAmount<MAX_RESERVE_FEE)
        return calcAmount

      if (calcAmount< MIN_RESERVE_FEE)
        return MIN_RESERVE_FEE

      if (calcAmount> MAX_RESERVE_FEE)
        return MAX_RESERVE_FEE
    },
    validateAuctions(selectedAuctionItems, onlyItems= false){
      const isValid = {}
      for (let i = 0; i <selectedAuctionItems.length ; i++) {
        const auction = selectedAuctionItems[i]
        const isSingleValid = this.validateSingleItem(auction, onlyItems)
        if (isSingleValid.length>0)
          isValid[auction.id] = isSingleValid
      }
      return isValid
    },

    validateSingleItem(item, onlyItems= false){
      let isValid = []

      if (isNaN(parseInt(item.time_limit)))
        isValid.push('time_limit')

      if (isNaN(parseInt(item.start_bid_price)))
        isValid.push('start_bid_price')

      if (!['live', 'scheduled'].includes(item.status))
        isValid.push('status')

      if (!['single', 'collection'].includes(item.type))
        isValid.push('type')

      if (!_.isBoolean(item.is_reserved))
        isValid.push('is_reserved')

      if (item.status === 'scheduled') {
        if (new Date(item.scheduled_date).getTime()===0)
          isValid.push('scheduled_date')
      }


      if (item.type === 'collection')
        if (!_.isString(item.name) || _.isEmpty(item.name))
          isValid.push('name')

      if (item.is_reserved)
        if (isNaN(parseInt(item.reserve_price)))
          isValid.push('reserve_price')

      //   'items.*.inventory_id' => 'int',
      //   'items.*.quantity' => 'int|min:1|max:10',
      if (!Array.isArray(item.items))
          isValid.push('items')
      else {
        item.items.map(inv => {
          if (isNaN(parseInt(inv.inventory_id)))
            isValid.push(`items.${inv.id}.inventory_id`)

          const quantity = parseInt(inv.quantity)

          if (isNaN(quantity) || (quantity>10 || quantity<1))
            isValid.push(`items.${inv.id}.quantity`)

          return inv
        })
      }
      if (onlyItems)
        isValid = isValid.filter(a => a.startsWith('items'))

      return isValid
    },
    randomStringId(){
      return (Math.random() + 1).toString(36).substring(7)
    }
  }
}
