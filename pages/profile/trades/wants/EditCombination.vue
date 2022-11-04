<template>
    <div id="edit-combination" class="mb-5">
        <edit-item v-if="editItem" :product="editItem" :itemId="itemId"
                   :combinationId="getUpdateCombinations.combination_id" productFor="wantsList"/>
        <add-want-item v-else-if="addWantItem" :combinationId="getUpdateCombinations.combination_id"/>
        <div v-else class="bg-gray-75">
            <div class="header-section pt-4">
                <div 
                    class="back-to-search text-center text-sm-left" 
                    role="button" 
                    @click="backWants()"
                >
                    <b-icon icon="chevron-left" aria-hidden="true" class="mr-1"></b-icon>
                    {{ $t('trades.wants_listing.back_to_wants') }}
                </div>
                <div class="d-flex flex-column flex-sm-row align-items-center 
                            justify-content-sm-between justify-content-lg-start"
                >
                    <div class="create-trade-heading pt-3">
                        {{ $t('trades.wants_listing.edit_combination', { 0: getUpdateCombinations.combination_id }) }}
                    </div>
                    <div 
                        v-if="getUpdateCombinations.combination_items.length < THREE_ITEMS" 
                        class="add-item pl-sm-3"
                        role="button" 
                        @click="addNewItem"
                    >
                        {{ $t('trades.wants_listing.add_another_item') }}
                    </div>
                </div>
                <div class="create-trade-sub-heading text-center text-sm-left mt-2 mb-4">
                    {{ $t('trades.wants_listing.edit_or_add_new_items_to_your_combination') }}
                </div>
            </div>
            <div 
                v-for="(item, index) in getUpdateCombinations.combination_items"
                :key="'offer-'+index+item.id" 
                :style="{ marginBottom: '20px' }"
            >
                <div class="product-num">
                    {{ $tc('common.product') }} {{ index + 1 }}
                </div>
                <div class="confirm-trade-item d-flex flex-column flex-sm-row 
                            justify-content-between align-items-center pl-1 pr-2">
                    <div class="d-flex col-sm-8 flex-column flex-sm-row align-items-center">
                        <img 
                            class="w-auto"
                            height="70"
                            :src="item.product.image"
                            :alt="$t('trades.create_listing.vendor.wants.no_image')"
                        />
                        <div class="d-block pl-4">
                            <div class="confirm-trade-item-name">
                                {{ item.name ? item.name : item.product.name }}
                            </div>
                            <div class="confirm-trade-item-detail mt-1">{{
                                    $t('common.sku')
                                }}: {{ item.sku ? item.sku : item.product.sku }}
                            </div>
                            <div class="confirm-trade-item-detail mt-1">{{
                                    $t('trades.create_listing.vendor.wants.colorway')
                                }}:
                                {{ item.colorway ? item.colorway : item.product.colorway }},
                                Size {{ item.size.size }}
                            </div>
                            <div class="confirm-trade-item-detail mt-1">
                                {{ $t('trades.create_listing.vendor.wants.box_condition') }}:
                                {{ item.packaging_condition.name }}
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2 mt-2 mt-sm-0 confirm-trade-icons justify-content-center justify-content-sm-end d-flex">
                        <div>
                            <img :src="require('~/assets/img/box-pencil.svg')"
                                 :alt="$t('trades.create_listing.vendor.wants.no_image')" @click="editWant(item)"/>
                        </div>
                        <div class="pl-3">
                            <img :src="require('~/assets/img/box-delete.svg')" class="cursor-pointer"
                                 :alt="$t('trades.create_listing.vendor.wants.no_image')"
                                 @click="removeWantItem(item.id)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {THREE_ITEMS} from '~/static/constants/trades';

import EditItem from '~/pages/profile/trades/wants/EditItem'
import {
    IMAGE_PATH,
    MAX_ITEMS_ALLOWED,
    STATUS_DRAFT,
    STATUS_LIVE
} from '~/static/constants/create-listing'
import AddWantItem from '~/pages/profile/trades/wants/AddWantItem'

export default {
    name: 'EditCombination',
    components: {
        AddWantItem,
        EditItem
    },
    layout: 'Profile',
    middleware: 'auth',
    props:{
      combination: {
        type: Object,
        default: () => null,
      },
    },
    data() {
        return {
            THREE_ITEMS,
            IMAGE_PATH,
            STATUS_DRAFT,
            STATUS_LIVE,
            MAX_ITEMS_ALLOWED,
            steps: [
                {name: this.$t('trades.create_listing.vendor.wants.offer_items'), active: true},
                {name: this.$t('trades.create_listing.vendor.wants.enter_what_you_want'), active: true},
                {name: this.$t('trades.create_listing.vendor.wants.confirm_trade'), active: true}
            ],
            editItem: null,
            itemId: null,
            addWantItem: false,
            backToEdit: null
        }
    },
    computed: {
        ...mapGetters('trade', ['getUpdateCombinations']),
        productImage() {
            return this.product.image ? this.product.image : 'https://images.deadstock.co/404.png'
        }
    },
    mounted() {
        this.backToEdit = () => {
            this.addWantItem = false
            this.editItem = null
            this.getCombination()
        }

        const wrapper = document.querySelector('.main-wrapper')
        if (document.querySelector('.main-wrapper').querySelector('#edit-combination')) {
            wrapper.style.backgroundColor = '#f7f7f7'
        }

        // Emit to take user back from search page to confirmation
        this.$root.$on('back_to_edit_combination', this.backToEdit)
        this.getCombination()
    },
    beforeDestroy() {
      this.$root.$off('back_to_edit_combination', this.backToEdit)
    },
    methods: {
        getCombination() {
            const url = 'trades/wants/combination/item'
            this.$axios.get(url, {
                params: {
                    combination_id: this.combination.combination_id
                }
            })
                .then((res) => {
                    this.$store.commit('trade/setUpdateCombination', res.data.data)
                })
        },
        /**
         * This function is used to add items in offer listing
         * to pass data as param to create listing in api
         * @returns {*[]}
         */
        prepareOfferItems() {
            return this.getTradeItems.map(item =>
                ({
                    inventory_id: item.id,
                    quantity: item.quantity,
                    packaging_condition_id: item.packaging_condition.id,
                    year: item.year ? item.year : null,
                    size_id: item.size_id,
                    product_id: item.product_id,
                    sale_price: item.sale_price
                })
            )
        },

        /**
         * This function is used to add wants items in listing
         * to pass data as param to create listing in api
         * @returns {*[]}
         */
        prepareWantItems() {
            return this.getTradeItemsWants.map(item =>
                ({
                    product_id: item.product_id,
                    quantity: item.selected_quantity,
                    size_id: item.selected_size,
                    packaging_condition_id: item.selected_box_condition,
                    year: item.selected_year
                })
            )
        },

        redirectTo(status) {
            if (status === STATUS_DRAFT) {
                this.$router.push('/profile/create-listing/drafts')
            } else {
                this.$router.push('/profile/trades/dashboard')
            }
        },

        /**
         * This function is used to create listing for trade
         * it also used for updating trade listing id trade id exists
         * @param status
         */
        saveVendorTrade(status) {
            const tradeId = this.getTradeId()

            if (!tradeId) {
                // create new trade list
                this.$axios
                    .post('trades', {
                        status,
                        offer_items: this.prepareOfferItems(), // offer items for create listing
                        want_items: this.prepareWantItems(), //
                    })
                    .then(() => {       // On response clears states and move to listing page
                        this.$store.commit('trades/clearTradeItems')
                        this.$store.commit('trades/clearWantsItemsTrade')
                        this.redirectTo(status)
                    })
                    .catch((error) => {
                        this.$toasted.error(this.$t(error.response.data.message))
                    })
            } else {
                // update trade list
                this.$axios
                    .put('trades/' + tradeId, {
                        status,
                        offer_items: this.prepareOfferItems(), // offer items for listing
                        want_items: this.prepareWantItems(), // want items for listing
                    })
                    .then(() => { // on response clear states and move to listing page
                        this.$store.commit('trades/clearTradeItems')
                        this.$store.commit('trades/clearWantsItemsTrade')
                        this.$store.commit('trades/setTradeForEditing', null)
                        this.redirectTo(status)
                    })
                    .catch((error) => {
                        this.$toasted.error(this.$t(error.response.data.message))
                    })
            }
        },

        /**
         * This function is used to increase quantity
         * of product want item listing as a copy product
         * @param wantProduct
         * @param tradeWant
         */
        addProductWant(wantProduct, tradeWant, count) {
            if (count >= MAX_ITEMS_ALLOWED) {
                this.$toasted.error(this.$t('trades.create_listing.vendor.wants.want_items_quantity_should_not_exceed', [MAX_ITEMS_ALLOWED])) // error of quantity increase
            } else {
                this.trade_want_id = tradeWant?.id
                const product = JSON.parse(JSON.stringify(wantProduct));
                product.selected_box_condition = tradeWant?.selected_box_condition
                product.selected_quantity = tradeWant?.selected_quantity
                product.selected_year = tradeWant?.selected_year
                product.selected_size = tradeWant?.selected_size
                this.search_item = product
            }
        },

        /**
         * This function is used to remove offer item from list
         * on the basis of product id which is pass as param
         * @param id
         */
        removeOfferItem(id) {
            this.$store.commit('trades/removeTradeItem', id)
            this.$nextTick(() => this.$forceUpdate())
        },

        /**
         * This function is used to remove want item from list
         * on the basis of product id which is pass as param
         * @param id
         */
        removeWantItem(id) {
            const type = 'combination_item'
            this.$axios.post('/trades/wants/destroy', {
                type,
                want_item_id: id,
                combination_id: this.getUpdateCombinations.combination_id

            })
            .then(() => {
               this.getCombination()
            })
        },

        editWant(item) {
            this.itemId = item.id
            this.editItem = item
        },
        addNewItem() {
            this.addWantItem = true
        },
        backWants() {
            this.$root.$emit('back_to_combination')
        }
    }
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.bg-gray-75
    background: $color-gray-75 !important

.create-trade-sub-heading
    font-family: $font-family-montserrat
    font-style: normal
    @include body-4-medium
    color: $color-gray-5

.product-num
    font-family: $font-family-sf-pro-text
    font-style: normal
    @include body-5-bold
    color: $color-black-1
    padding-left: 54px
    padding-bottom: 12px

.add-item
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-13-medium
    color: $color-blue-2
    padding-top: 22px

.back-to-search
    padding-bottom: 8px
    font-family: $font-family-sf-pro-display
    font-style: normal
    @include body-13-regular
    letter-spacing: 0.06em
    color: $color-black-1

.line-height-17
    line-height: 17px

.heading
    @media (min-width: 576px)
        margin-left: 30px

.header-section
    @media (min-width: 576px)
        padding-left: 53px
        padding-right: 28px

</style>
