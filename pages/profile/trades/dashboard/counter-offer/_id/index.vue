<template>
  <div>
    <div v-if="isScreenXS">
      <b-row v-if="getLastSubmittedOffer && !searchItem">
        <b-col v-if="!cashAdd" :md="isPayment ? 9 : 12">
          <div class="center-container-xs mt-5 mb-5">
            <div class="left-item-xs" :class="{'right-item-margin-top-sm':getTheirItems.length === TWO_ITEMS,'left-item-one-xs':getTheirItems.length === ONE_ITEM}">
              <div v-for="(item, index) in getTheirItems" :id="getTheirItems.length === THREE_ITEMS ?'card-'+index : ''" :key="index" class="item mb-4">
                <div class="image-wrapper-sm">
                  <img class="pro-image-sm"  :src="item.inventory.product | getProductImageUrl"/>
                  <div class="overlay"></div>
                </div>
                <div class="item-caption">
                  <span class="item-name-small">{{ item.inventory.product.name }}</span>
                  <span
                    class="item-box-condition-small">{{
                      $t('trades.trade_arena.box_condition')
                    }}: {{ item.inventory.packaging_condition.name }}</span>
                  <span class="item-caption-description">{{ item.inventory.product.colorway }}</span>
                  <span class="item-size">{{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</span>
                </div>
              </div>
            </div>
            <div class="center-item-sm">
              <div v-if="getTheirItems.length > ONE_ITEM" class="pointer-left-sm" :class="{'pointer-right-two-items-sm':getTheirItems.length=== TWO_ITEMS}"></div>
              <div class="position-relative center-img d-flex justify-content-between">
                <div v-if="getTheirItems.length === THREE_ITEMS || getTheirItems.length === ONE_ITEM" class="line-bar-sm"></div>
                <div class="fair-text-sm position-absolute">{{$t('trades.fair')}}</div>
                <img class="trade-img-sm position-absolute" :src="require('~/assets/img/trades/mb-trade-icon.svg')" />
                <div v-if="getYourItems.length === THREE_ITEMS || getYourItems.length === ONE_ITEM" class="line-bar-sm"></div>
              </div>
              <div v-if="getYourItems.length > ONE_ITEM" class="pointer-right-sm" :class="{'pointer-right-two-items-sm':getYourItems.length === TWO_ITEMS}"></div>
            </div>
            <div class="right-item-sm" :class="{'right-item-margin-top-sm':getYourItems.length === TWO_ITEMS,'right-item-one-sm':getYourItems.length === ONE_ITEM}">
              <div  v-if="getYourItems.length" class="">
                <div  v-for="(item,index) in getYourItems" :id="getYourItems.length > ONE_ITEM ?'your-card-'+index : 'your-item'" :key="index" class="preview mb-4">
                  <div class="remove-item"  @click="removeItem(item.inventory.product.id)">
                    <div class="minus"></div>
                  </div>
                  <div class="image-wrapper-sm">
                    <img class="pro-image-sm" :src="item.inventory.product | getProductImageUrl" alt="image" />
                    <div class="overlay"></div>
                  </div>
                  <div class="item-caption">
                    <span class="item-name-small">{{ item.inventory.product.name }}</span>
                    <span class="item-box-condition-small">
                      {{ $t('trades.trade_arena.box_condition') }}: {{ item.inventory.packaging_condition.name }}
                    </span>
                    <span class="item-caption-description-small">{{ item.inventory.product.colorway }}</span>
                    <span class="item-size">{{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>




          <div class="fair-trade-division-mobile d-flex justify-content-center flex-column align-items-center m-2">
            <Meter :highest="getTheirTotal(false)"
                   :lowest="0"
                   :value="getYourTotal(false)"
                   :fair="getFairTradeValue()"
                   heading="trades.trade_arena.fair_trade_meter"
            />
          </div>
          <div>
            <b-btn v-if="editYours" variant="primary"
                   class="btn-cash d-flex justify-content-center align-content-center m-4"
                   @click="addCash()">
             <span  v-if="optionalCash === '0.00'">{{ $t('trades.add_cash') }} </span>
              <span v-else-if="optionalCash !== '0.00'">$ {{optionalCash}} </span>
            </b-btn>
            <b-btn v-else   class="btn-cash d-flex justify-content-center align-content-center m-4" @click="addCash()">{{ $t('trades.request_cash') }}</b-btn>
          </div>
          <vue-bottom-sheet
            ref="sheetcash"
            class="more-options"
            max-width="auto"
            max-height="90vh"
            :rounded="true"
          >
            <div class="d-flex flex-column align-items-center mb-4">
              <div class="trade-hub-buttons mt-4 mb-4">
                <span class="optional-text">{{ $t('trades.trade_arena.optional') }}</span>
                <div v-if="!cashAdded" class="optional-input d-flex">
                  <div class="position-relative">
                    <input v-model="optionalCash" type="text" :placeholder="$t('trades.trade_arena.enter_amount_usd')"
                           class="optional-input-field">
                  </div>

                </div>
                <div v-else-if="cashAdded">
                  <div class="d-flex cash-added justify-content-center mt-4">
                    <div v-if="cashType === CASH_TYPE_REQUESTED">
                      <img :src="require('~/assets/img/icons/dollar.svg')" class="ml-4 mr-2">
                      {{$t('trades.trade_arena.you_added_cash',{'0': optionalCash })}}
                      <sup class="ml-1 mr-4" role="button"><img  id="cashPopover" :src="infoIcon"/></sup>
                    </div>
                    <div v-else>
                      <img :src="require('~/assets/img/icons/dollar.svg')" class="ml-4 mr-2">
                      {{$t('trades.trade_arena.you_requested_cash',{'0': optionalCash })}}
                      <sup class="ml-1 mr-4" role="button"><img  id="cashPopover" :src="infoIcon"/></sup>
                    </div>
                    <b-popover target="cashPopover" triggers="hover" placement="top" >
                      {{$t('trades.trade_arena.balance_the_deal')}}
                    </b-popover>
                  </div>
                  <div class="text-center edit-cash pt-1" role="button" @click="addOptionalCash(false)">
                    {{$t('trades.trade_arena.edit_cash')}}
                  </div>
                </div>
              </div>
            </div>
          </vue-bottom-sheet>
          <div class="ml-4 mb-2">
            <b-btn class="inventory-btn"  @click="openBottomFilter()">
              Inventory
            </b-btn>
          </div>
          <vue-bottom-sheet ref="myBottomSheet" max-height="90%" :is-full-screen="true" class="bottom-sheet">
            <trade-arena-filters v-if="filterScreen" @change="handleFilterChange" />
            <div v-else>
              <div class="offer-items">
                <div class="d-flex justify-content-between pl-3 pr-3">
                  <div class="clear" :class="{'color-blue': getYourTradeItems.length > 0}" role="button" @click="clearItems()">Clear</div>
                  <div class="d-block text-center">
                    <div class="offer-heading">{{$t('trades.your_offer')}}</div>
                    <div class="est-val">{{$t('trades.estimated_value')}}:{{getYourTotal()}}</div>
                  </div>
                  <div class="done"  :class="{'color-blue': getYourTradeItems.length > 0}" role="button" @click="doneClose()">Done</div>
                </div>
                <div v-if="getYourTradeItems.length > ITEM_COUNT_0" class="d-flex justify-content-center">
                  <div  v-for="(item,index) in getYourTradeItems" :id="'your-card-'+index" :key="index" class="item-inventory mt-2 mb-4 ml-3">
                    <div class="position-relative">
                      <div class="remove-item mt-2" @click="decrementOrRemoveItem(item)">
                        <div class="minus"></div>
                      </div>
                    </div>
                    <div class="image-wrapper-sm position-relative d-flex justify-content-center align-items-center">
                      <img class="pro-image-sm" :src="item.product.image" alt="image" />
                      <div class="overlay-image position-absolute"></div>
                    </div>
                    <div class="item-caption">
                      <div class="item-name">{{  (item.product && item.product.name) ? item.product.name : item.name  }}</div>
                      <div class="item-caption-description">{{  (item.product  && item.product.colorway) ? item.product.colorway : item.colorway }},{{$t('trades.trade_arena.size')}} {{ item.size && item.size.size }}</div>
                      <div class="item-box-condition">{{$t('trades.trade_arena.box_condition')}}: {{  (item.box_condition && item.box_condition.name) ? item.box_condition.name :item.box_condition }}</div>
                    </div>
                  </div>
                </div>
                <div v-else class="d-flex justify-content-center mb-3">
                  <div class="add-item-invent text-center">
                    <div class="select-invent">
                      {{$t('trades.trade_arena.select_from_inventory')}}
                    </div>
                    <div class="upto-three">
                      {{$t('trades.trade_arena.up_to_three_items')}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="your-inventory">
                <div class="d-block pt-4 pl-4">
                  <div class="invent-heading">
                    {{$t('trades.trade_arena.your_inventory',[inventoryItems.length])}}
                  </div>
                  <div class="invent-subheading mt-1">
                    {{$t('trades.trade_arena.trade_upto_items', [MAX_ITEMS_ALLOWED])}}
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <SearchInput
                    :value="searchText"
                    variant="light"
                    inputHeight="33px"
                    :placeholder="$t('trades.trade_arena.search_inventory')"
                    :clearSearch="true"
                    bordered
                    class="mt-3 pl-4 input-search"
                    @change="onSearchInput"
                  />
                  <div class="pt-3 pr-4">
                    <img role="button" :src="require('~/assets/img/trades/filter-icon.svg')" @click="showFilters()">
                  </div>
                </div>
                <div class="inventory-items d-flex flex-wrap pt-3 pl-3">
                  <div v-for="(item,index) in inventoryItems" :key="index" class="item invent-item mx-1">
                    <div>
                      <div class="position-relative">
                        <img alt="No Image" class="plus-icon-add-trade position-absolute" role="button" :src="require('~/assets/img/icons/addPlus.svg')"
                             @click="addYourInventoryItem(item)"/>
                      </div>
                      <div class="image-wrapper-inventory position-relative d-flex justify-content-center align-items-center">
                        <img class="item-image-trade" :src="item.product.image" alt="image" />
                        <div class="overlay-inventory position-absolute"></div>
                      </div>
                      <div class="item-caption-inventory">
                        <div class="invent-name pt-2">{{item.product && item.product.name}}</div>
                        <div class="invent-box">{{$t('common.box_condition')}}: {{item.packaging_condition && item.packaging_condition.name}}</div>
                        <div class="invent-color">{{item.product && item.product.colorway}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <infinite-loading :identifier="infiniteId" @infinite="getInventory">
                <span slot="no-more"></span>
                <span slot="no-results"></span>
              </infinite-loading>
              <div v-if="!inventoryItems.length" class="w-100 py-5 text-center">
                <div class="d-inline-flex align-items-center no-items-found">
                  <img src="~/assets/img/no-items-found.png" class="mr-3" />
                  <div class="text-left">
                    <div class="no-items-found-title">{{ $t('auctions.frontpage.no_results_found') }}</div>
                    <div class="no-items-found-subtitle">{{ $t('auctions.frontpage.cant_find_anything') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </vue-bottom-sheet>
          <div class="d-flex mb-5">
            <b-btn class="discard-changes ml-4 mr-3"  @click="$bvModal.show('discardModel')">{{ $t('trades.discard_changes') }}</b-btn>
            <b-btn class="counter-offer"  @click="showPoorTradeConfirmationModal">Next</b-btn>
          </div>

        </b-col>
        <CheckoutSidebar v-if="isPayment" class="order-summary" />
        <addCash v-if="cashAdd" :yourAmount="getYourTotal()"
                 :theirAmount="getTheirTotal()"
                 :addedAmount="optionalCash"
                 :selectedType="optional_cash_type"
                 @click="cancelCash" @change="addAmount"></addCash>
      </b-row>
      <create-trade-search-item v-if="searchItem" :yourItems="getYourItems" :product="searchItem" :productFor="productFor" :progressBar="false" :padding="true" />
      <discard-model @discard="redirectToOfferPage()" />
      <AlreadyListedModal :listingId="itemListingId" :item="alreadyListedItemDetails" @confirm="addYourInventoryItem" />
      <PoorTradeConfirmationModal :poorTrade="(tradeCondition === FILTER_CONDITION_POOR)"></PoorTradeConfirmationModal>
    </div>
    <div v-else class="bg-white-5">
      <b-row v-if="getLastSubmittedOffer && !searchItem">
        <b-col class="px-4" :md="isPayment ? 9 : 12">
          <div class="">
            <div class="offer-id-head">{{ $t('trades.offer_id') }} #{{getOffer.id}}</div>
            <div class="offer-sum-text">{{ $t('trades.counter_offer') }}</div>
          </div>
          <div class="offer-card my-3">
            <div class="d-flex flex-column px-3 px-lg-0">
              <div class="mt-55 d-flex mb-2 justify-content-between col-md-8 mx-auto">
                <div class="value">
                  {{ $t('common.their_value') }}
                  <span class="ml-1 price">{{ getTheirTotal() }}</span>
                </div>
                <div class="value">
                  {{ $t('common.your_value') }}
                  <span class="ml-1 price">{{ getYourTotal() }}</span>
                </div>
              </div>
              <div
                class="center-container d-flex mx-0 mx-md-auto justify-content-between align-items-center col-md-8 col-xl-12"
                :class="{'center-cont-height':(getTheirItems.length > ONE_ITEM || getYourItems.length) }"
              >
                <div class="left-item">
                  <div v-for="(item, index) in getTheirItems" :id="getTheirItems.length === THREE_ITEMS ?'trade-item-'+index : ''"
                      :key="'their-trade-item-key-'+index" class="item mb-4"
                      :class="[((getTheirItems.length > ONE_ITEM )|| (getYourItems.length)) ? 'item-length' : 'item-normal']">

                    <div v-if="!editYours" class="position-relative">
                      <div class="position-absolute remove-item-icon" role="button" @click="removeItem(item.inventory.product.id)">
                        <img :src="require('~/assets/img/trades/minus-icon.svg')">
                      </div>
                    </div>
                    <div class="position-relative d-flex align-items-center justify-content-center">
                      <img class="img-fluid" :src="item.inventory.product | getProductImageUrl" />
                      <div class="overlay-mob position-absolute"></div>
                    </div>
                    <div class="item-caption">
                      <span class="item-name">{{ item.inventory.product.name }}</span>
                      <div class="mt-1 item-caption-description d-flex">
                        <div class="item-color text-truncate">
                          {{ item.inventory.product.colorway }}
                        </div>
                        <div>, {{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</div>
                      </div>
                      <span
                        class="mt-1 item-caption-description">{{
                          $t('trades.trade_arena.box')
                        }}: {{ item.inventory.packaging_condition.name }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="center-item">
                  <div v-if="getTheirItems.length > ONE_ITEM" class="pointer-left"></div>
                  <div class="long-line" :class="{'w-xl-100' : getTheirItems.length === ONE_ITEM }"></div>
                  <img :src="require('~/assets/img/trades/Trade.svg')" />
                  <div class="long-line" :class="{'w-xl-100' : getYourItems.length === ONE_ITEM }"></div>
                  <div v-if="getYourItems.length > ONE_ITEM" class="pointer-right"></div>
                </div>
                <div class="right-item">
                  <div v-if="getYourItems.length" >
                    <div v-for="(item, index) in getYourItems"
                        :id="getYourItems.length > TWO_ITEMS ?'your-trade-item-'+index : 'your-item'" :key="'your-trade-item-key-'+index"
                        class="item-length mb-4">
                      <div v-if="editYours" class="position-relative">
                        <div class="position-absolute remove-item-icon" role="button" @click.stop="removeItem(item.inventory.product.id)">
                          <img :src="require('~/assets/img/trades/minus-icon.svg')">
                        </div>
                      </div>
                      <img class="img-fluid" :src="item.inventory.product | getProductImageUrl" alt="image" />
                      <div class="item-caption">
                        <span class="item-name">{{ item.inventory.product.name }}</span>
                        <div class="mt-1 item-caption-description d-flex">
                          <div class="item-color text-truncate">
                            {{ item.inventory.product.colorway }}
                          </div>
                          <div>, {{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</div>
                        </div>
                        <span
                          class="mt-1 item-caption-description">{{
                            $t('trades.trade_arena.box')
                          }}: {{ item.inventory.packaging_condition.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column align-items-center mb-4">
              <div class="fair-trade-division d-flex justify-content-center flex-column align-items-center">
                <Meter
                  :highest="getTheirTotal(false)"
                  :lowest="0"
                  :value="getYourTotal(false)"
                  :fair="getFairTradeValue()"
                  heading="common.fair_trade_meter"
                  headingClass="my-header"
                />
              </div>
              <div class="trade-hub-buttons mt-4 mb-4">
                <div class="mb-1">
                  <span class="add-cash">{{ $t('trades.add_cash') }}</span>
                  <span class="request-cash">{{ $t('trades.request_cash') }}</span>
                </div>
                <div v-if="!cashAdded" class="optional-input w-100 d-flex">
                  <div class="position-relative">
                    <input
                      v-model="optionalCash"
                      type="number"
                      :placeholder="$t('common.enter_cash_amount')"
                      class="optional-input-field"
                    >
                  </div>
                  <Button
                    variant="dark-blue"
                    class="add-cash-btn"
                    @click="addOptionalCash(true)"
                  >
                    {{ $t('common.confirm') }}
                  </Button>
                </div>
                <div v-else-if="cashAdded">
                  <div class="d-flex cash-added justify-content-center mt-4">
                    <div v-if="cashType === cashAddedType">
                      <img :src="require('~/assets/img/icons/dollar.svg')" class="ml-4 mr-2">
                      {{$t('trades.trade_arena.you_added_cash',{'0': optionalCash })}}
                      <sup class="ml-1 mr-4" role="button"><img  id="cashPopover" :src="infoIcon"/></sup>
                    </div>
                    <div v-else>
                      <img :src="require('~/assets/img/icons/dollar.svg')" class="ml-4 mr-2">
                      {{$t('trades.trade_arena.you_requested_cash',{'0': optionalCash })}}
                      <sup class="ml-1 mr-4" role="button"><img  id="cashPopover" :src="infoIcon"/></sup>
                    </div>
                    <b-popover target="cashPopover" triggers="hover" placement="top" >
                      {{$t('trades.trade_arena.balance_the_deal')}}
                    </b-popover>
                  </div>
                  <div class="text-center edit-cash pt-1" role="button" @click="addOptionalCash(false)">
                    {{$t('trades.trade_arena.edit_cash')}}
                  </div>
                </div>
              </div>

              <b-row class="justify-content-center my-4">
                <Button variant="dark-blue" class="mr-4 border-radius-8" @click="showPoorTradeConfirmationModal">{{ $t('trades.counter_offer') }}</Button>
                <div class="discard-btn d-flex align-items-center justify-content-center" @click="$bvModal.show('discardModel')">{{ $t('trades.discard_changes') }}</div>
              </b-row>
            </div>
          </div>
          <div class="my-3 inventory-card-trade">
            <div class="inventory-heading d-flex flex-column flex-md-row justify-content-between">
              <div class="d-flex mb-2 mb-md-0">
                {{ (editYours) ? $t('trades.your_inventory', {0: inventoryItems.length}) : $t('trades.their_inventory', {0: inventoryItems.length}) }}
                <span v-if="editYours" class="sub-heading-inventory pt-2">{{ $t('trades.add_remove_items') }}</span>
              </div>
              <Button v-if="editYours" variant="dark-blue" class="" @click="editTheirsItems()">{{ $t('trades.edit_theirs') }}</Button>
              <Button v-else variant="dark-blue" class="" @click="editYoursItems()">{{ $t('trades.edit_yours') }}</Button>
            </div>
            <b-col v-if="editYours" md="9" sm="12" class="pt-4 px-0">
              <SearchInput
                bordered
                variant="primary"
                class="counter-search-input"
                inputHeight="46px"
                :isOpen="searchedItems.length > 0"
                :onOpenStyle="{
                  borderBottomLeftRadius: '0 !important',
                  borderBottomRightRadius: '0 !important',
                }"
                :iconStyle="{
                  position: 'relative',
                  left: '12px'
                }"
                :placeholder="$t('trades.trade_arena.search_inventory')"
                :clearSearch="true"
                @change="onSearchInput"
              />
              <div class="position-relative">
                <SearchedProductsBelowSearchTextBox
                  v-if="searchedItems.length > 0"
                  :productItems="searchedItems"
                  :productsFor="productFor"
                  class="position-absolute width-responsive counter-wrapper"
                  addBtnClass="text-right"
                  :itemStyle="{
                    padding: 0
                  }"
                  :wrapperStyle="{
                    margin: 0
                  }"
                />
              </div>
            </b-col>
            <div class="pt-4">
              <div class="filter-label">{{ $t('trades.filter_by') }}</div>
              <div class="row align-items-center">
                <b-col md="3" xl="2" sm="12">
                  <client-only>
                    <CustomDropdown
                      v-model="categoryFilter"
                      :options="categoryItems"
                      type="single-select"
                      :label="categoryFilterLabel"
                      paddingX="10px"
                      class="mr-sm-3 counter-page-dropdown"
                      optionsWidth="custom"
                      dropDownHeight="38px"
                      variant="white"
                      :arrowStyle="{
                        color: '#000',
                        marginTop: '0 !important'
                      }"
                      :dropdownStyle="{
                        borderRadius: '0 0 5px 5px'
                      }"
                      borderRadius="5px"
                      borderRadiusClose="5px 5px 0 0"
                      @getResults="getInventory"
                      @change="changeCategory"
                    />
                  </client-only>
                </b-col>
                <b-col md="3" xl="2" sm="12" class="mt-2 mt-md-0">
                  <client-only>
                    <CustomDropdown
                      v-model="sizeTypesFilter"
                      :options="filters.size_types"
                      type="multi-select-checkbox"
                      :label="sizeTypesFilterLabel"
                      class="mr-sm-3 counter-page-dropdown"
                      paddingX="10px"
                      optionsWidth="custom"
                      dropDownHeight="38px"
                      :arrowStyle="{
                        color: '#000',
                        marginTop: '0 !important'
                      }"
                      :dropdownStyle="{
                        borderRadius: '0 0 5px 5px'
                      }"
                      borderRadius="5px"
                      borderRadiusClose="5px 5px 0 0"
                      variant="white"
                      @getResults="getInventory"
                      @change="changeSizeTypeFilter"
                    />
                  </client-only>
                </b-col>
                <b-col md="3" xl="2" sm="12" class="mt-2 mt-md-0">
                  <client-only>
                    <CustomDropdown
                      v-model="sizeFilter"
                      :options="filters.sizes"
                      type="multi-select-checkbox"
                      :label="sizeFilterLabel"
                      class="mr-sm-3 counter-page-dropdown"
                      paddingX="10px"
                      optionsWidth="custom"
                      dropDownHeight="38px"
                      :arrowStyle="{
                        color: '#000',
                        marginTop: '0 !important'
                      }"
                      :dropdownStyle="{
                        borderRadius: '0 0 5px 5px'
                      }"
                      borderRadius="5px"
                      borderRadiusClose="5px 5px 0 0"
                      variant="white"
                      @getResults="getInventory"
                      @change="changeSizeFilter"
                    />
                  </client-only>
                </b-col>
                <b-col md="2" sm="12" class="mt-2 mt-md-0">
                  <Button class="filter-btn" variant="dark-blue" @click="getInventory">{{ $t('trades.filter') }}</Button>
                </b-col>
              </div>
            </div>
            <div v-if="inventoryItems.length" class="carousel d-flex flex-column flex-md-row flex-wrap justify-content-between inventory-items-trade">
              <div
                v-for="(item) in inventoryItems"
                :key="item.id"
                class="item invent-item d-flex flex-column justify-content-center mx-auto mx-md-0 col-6 col-md-3 px-0"
              >
                <b-row class="justify-content-between">
                  <b-col class="d-flex justify-content-end pr-3 pt-3">
                    <img v-if="!editYours" class="plus-icon-add-trade" role="button"
                          :src="require('~/assets/img/icons/addPlus.svg')" @click="checkIfItemAlreadyListed(item)"/>
                    <img v-else class="plus-icon-add-trade" role="button"
                          :src="require('~/assets/img/icons/addPlus.svg')" @click="addYourInventoryItem(item)"/>
                  </b-col>
                </b-row>
                <img class="img-fluid mx-auto max-h-200" :src="item.product | getProductImageUrl" />
                <div class="item-caption">
                  <span class="item-name">{{ item.product.name }}</span>
                  <div class="mt-1 item-caption-description d-flex">
                    <div class="item-color text-truncate">{{ item.product.colorway }}</div>
                    <div>, {{ $t('trades.trade_arena.size') }} {{ item.size.size }}</div>
                  </div>
                  <span class="mt-1 item-caption-description">
                    {{ $t('trades.trade_arena.box') }}: {{ item.packaging_condition.name }}
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="row justify-content-between inventory-items-trade">
              {{ $t('trades.create_listing.vendor.wants.no_products_found') }}
            </div>
            <infinite-loading :identifier="infiniteId" @infinite="getInventory">
              <span slot="no-more"></span>
              <span slot="no-results"></span>
            </infinite-loading>
<!--            <b-row class="justify-content-center mb-3">-->
<!--              <Pagination-->
<!--                v-model="page"-->
<!--                :total="totalCount"-->
<!--                :per-page="perPage"-->
<!--                :per-page-options="perPageOptions"-->
<!--                @page-click="handlePageClick"-->
<!--                @per-page-change="handlePerPageChange"-->
<!--              />-->
<!--            </b-row>-->
          </div>
        </b-col>
        <CheckoutSidebar v-if="isPayment" class="order-summary" />
      </b-row>
      <create-trade-search-item v-if="searchItem" :yourItems="getYourItems" :product="searchItem" :productFor="productFor" :progressBar="false" :padding="true" />
      <discard-model @discard="redirectToOfferPage()" />
      <AlreadyListedModal :listingId="itemListingId" :item="alreadyListedItemDetails" @confirm="addYourInventoryItem" />
      <PoorTradeConfirmationModal :poorTrade="(tradeCondition === FILTER_CONDITION_POOR)"></PoorTradeConfirmationModal>
    </div>

  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import debounce from 'lodash.debounce'
  import Meter from '~/components/common/Meter'
  import PoorTradeConfirmationModal from '~/pages/trades/_id/PoorTradeConfirmationModal'
  import Button from '~/components/common/Button'
  import SearchInput from '~/components/common/SearchInput'
  import SearchedProductsBelowSearchTextBox from '~/components/product/SearchedProductsBelowSearchTextBox.vue'
  import CustomDropdown from '~/components/common/CustomDropdown'
  import AlreadyListedModal from '~/pages/profile/create-listing/trades/AlreadyListedModal'
  // import Pagination from '~/components/common/Pagination'
  import DiscardModel from '~/pages/profile/trades/dashboard/counter-offer/DiscardModel'
  import CreateTradeSearchItem from '~/pages/profile/create-listing/trades/CreateTradeSearchItem'
  import CheckoutSidebar from '~/components/checkout/trades/ShoppingCartOrder'
  import addCash from '~/pages/profile/trades/dashboard/_id/offers/AddCash'
  import ScreenSize from '~/plugins/mixins/screenSize'
  import TradeArenaFilters from '~/components/trade/TradeArenaFilters'
  import {
    ITEM_COUNT_0,
  } from '~/static/constants/trades'
  import {
    GOOGLE_MAPS_BASE_URL
  } from '~/static/constants/environments'
  import {
    PAGE,
    PER_PAGE,
    PER_PAGE_OPTIONS,
    TOTAL_COUNT,
    ONE_ITEM,
    TWO_ITEMS,
    THREE_ITEMS,
    PUBLIC_INVENTORY,
    MAX_LABELS_IN_CUSTOM_DROP_DOWN,
    CASH_TYPE_ADDED,
    CASH_TYPE_REQUESTED,
    PRODUCT_FOR_COUNTER_OFFER,
    FILTER_CONDITION_POOR,
    FILTER_CONDITION_EXCELLENT,
    FILTER_CONDITION_FAIR,
    DEFAULT_FAIR_TRADE_VALUE,
    OFFER_TYPE_YOURS,
    OFFER_TYPE_THEIR,
    COUNTER_OFFER_TYPE,
    TAKE_SEARCHED_PRODUCTS
  } from '~/static/constants/trades'
  import {
    MAX_ITEMS_ALLOWED
  } from '~/static/constants/create-listing'


export default {
  name: 'Index',
  components: {
    DiscardModel,
    // Pagination,
    CustomDropdown,
    SearchInput,
    Meter,
    Button,
    SearchedProductsBelowSearchTextBox,
    PoorTradeConfirmationModal,
    CreateTradeSearchItem,
    AlreadyListedModal,
    CheckoutSidebar,
    addCash,
    TradeArenaFilters,
  },
  mixins: [ScreenSize],
  layout: 'Profile',
  data() {
    return {
      cashAdd:false,
      width:'',
      GOOGLE_MAPS_BASE_URL,
      infoIcon: require('~/assets/img/icons/info-icon.svg'),
      offer: null,
      tradeId: 0,
      ONE_ITEM,
      THREE_ITEMS,
      TWO_ITEMS,
      PUBLIC_INVENTORY,
      searchText: null,
      searchedItems: [],
      searchItem: null,
      categoryItems: [
        {text: this.$t('common.footwear'), value: 'sneakers'},
        {text: this.$t('common.apparel'), value: 'apparel'},
        {text: this.$tc('common.accessory', 2), value: 'accessories'},
      ],
      optionalCash: null,
      optional_cash_type:null,
      cashAdded: 0,
      categoryFilter: '',
      sizeTypesFilter: [],
      sizeFilter: [],
      categoryFilterLabel: this.$t('trades.create_listing.vendor.wants.category'),
      sizeTypesFilterLabel: this.$t('trades.create_listing.vendor.wants.size_type'),
      sizeFilterLabel: this.$t('trades.create_listing.vendor.wants.size'),
      inventoryItems: [],
      perPage: PER_PAGE,
      page: PAGE,
      totalCount: TOTAL_COUNT,
      perPageOptions: PER_PAGE_OPTIONS,
      editYours: true,
      cashType: CASH_TYPE_ADDED,
      CASH_TYPE_REQUESTED,
      productFor: PRODUCT_FOR_COUNTER_OFFER,
      itemListingId: 0,
      alreadyListedItemDetails: {},
      tradeCondition: FILTER_CONDITION_POOR,
      FILTER_CONDITION_POOR,
      FILTER_CONDITION_EXCELLENT,
      FILTER_CONDITION_FAIR,
      fairTradePercentage:  (DEFAULT_FAIR_TRADE_VALUE / 100).toFixed(2), // converting to percentage
      isPayment: false,
      MAX_ITEMS_ALLOWED,
      submittedItemType: OFFER_TYPE_YOURS,
      OFFER_TYPE_THEIR,
      COUNTER_OFFER_TYPE,
      cashAddedType:CASH_TYPE_ADDED,
      filterScreen: false,
      infiniteId: +new Date(),
      ITEM_COUNT_0,
    }
  },
  computed: {
    ...mapGetters('browse', ['filters']),
    ...mapGetters('counter-offer', ['getOffer', 'getYourItems', 'getTheirItems', 'getLastSubmittedOffer', 'getYourVendorId', 'getTheirVendorId']),
    ...mapGetters('trade', ['getActiveTrade']),
    ...mapGetters('trade', ['getYourTradeItems']),
  },
  created() {
    this.$store.commit('counter-offer/clearStates')
  },
  mounted(){

    this.loadData()
    this.fetchFilters()

    this.$root.$on('add_product_counter_offer', (val) => { // this emit is used to add product in yours item
      this.searchItem = val
    })

    this.$root.$on('add_new_product', (item) => {
      this.resetSearch()
      this.addYourInventoryItem(item)
    })

    // To move user from search page to back in trade offer page
    this.$root.$on('back_to_counter_offer',()=>{
      this.resetSearch()
    })

    // Emit listener to emtpy search items
    this.$root.$on('click_outside', () => {
      this.resetSearch()
    })
    this.width = window.innerWidth
  },
  methods: {
    ...mapGetters({
      tradingFee: 'order-settings/getTradingFee',
    }),
    ...mapActions('counter-offer', ['fetchOfferDetails']), // get filters from api call by calling action from store
    ...mapActions('browse', ['fetchFilters']), // getter to get filter listing from store
    ...mapActions('trades', ['checkIfItemIsInListingItem', 'searchProductsList']),

    openBottomFilter() {
      this.$refs.myBottomSheet.open();
    },
    addCash(){
      this.cashAdd = true
      this.isPayment = false
    },
    cancelCash(){
      this.cashAdd = false;
    },
    handleFilterChange(filters) {
      this.categoryFilter = filters?.categories?.join(',')
      this.sizeFilter = filters?.sizes
      this.sizeTypesFilter = filters?.sizeTypes
      this.filterScreen = false
      this.page = 1;
      this.inventoryItems = []
      this.infiniteId += 1;
    },
    doneClose(){
      this.$refs.myBottomSheet.close();
    },
    clearItems(){
      this.$store.commit('trade/setTradeItemsEmpty',[])
    },
    showFilters(){
      this.filterScreen = true;
    },
    addYourItem(item) {
      if (this.canAddMoreItems() && this.checkIfItemAlreadyListed(item)) {
        this.addOrIncrementYourItem(item)
      }
    },
    decrementOrRemoveItem(item) {
      const existingItem = this.getYourTradeItems.find(val => val.id === item.id)
      if (existingItem.quantity > 1) {
        this.$store.commit('trade/decrementYourTradeItemQuantity', item.id)
      } else {
        this.$store.commit('trade/removeYourTradeItem', item.id)
      }
      this.updateActiveTrade()
      this.$nextTick(() => this.$forceUpdate())
    },
    getInventory: debounce(function ($state,filters = {}) {
      filters.category = this.categoryFilter
      filters.sizes = this.sizeFilter?.join(',')
      filters.size_types = this.sizeTypesFilter?.join(',')
      this.$axios
        .get('/vendor/inventory', {
          params: {
            search: this.searchText, // search query param for api call
            page: this.page, // Current page No
            per_page: this.perPage, // Per page no of records
            ...filters // filters to be applied
          },
        })
        .then((response) => { // response will get us listing of
          const res = response?.data
          if (!res.next_page_url) {
            $state.complete()
          }else {
            this.page += 1;
            this.inventoryItems.push(...res.data);
            $state.loaded()
          }
        })
        .catch((error) => { // return error
          this.$toasted.error(this.$t(error.response.data.error))
          this.searchedItems = []
        })
    }, 500),
    addAmount(value){
      this.optionalCash = value.amount
      this.optional_cash_type = value.add_cash ? 'add_cash':'request_cash'
      this.cashAdd = false
      this.getYourTotal(false)
    },
    checkIfItemAlreadyListed(item) {
      const existingItem = this.getYourTradeItems.find(val => val.id === item.id)
      if (existingItem) return true;
      this.$axios
        .post('check/product/in/listing', {
          inventory_id: item.id
        })
        .then((response) => { // return product information that exits in already listing
          if (response.data.is_listing_item) {
            this.itemListingId = response.data.listingId
            this.alreadyListedItemDetails = item
            this.$bvModal.show('alreadyListed')
            return false
          } else {
            this.addOrIncrementYourItem(item)
            return true
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.itemListingId = null
        })
    },
    addOrIncrementYourItem(item) {
      this.$store.commit('trade/setYourTradeItems', item)
      this.updateActiveTrade()
      this.$nextTick(() => this.$forceUpdate())
    },
    /**
     * check if trade is poor/fair
     */
     checkForPoorTrade(){
      const yourTotal = this.getYourTotal(false)
      const theirTotal = this.getTheirTotal(false)
      if(yourTotal >= theirTotal){
        this.tradeCondition = FILTER_CONDITION_EXCELLENT
      }else if(yourTotal >= this.getFairTradeValue()){
        this.tradeCondition = FILTER_CONDITION_FAIR
      }else{
        this.tradeCondition = FILTER_CONDITION_POOR
      }
      return this.tradeCondition === FILTER_CONDITION_POOR
    },
    /**
     * check if trade is poor/fair if theirs items are edited
     */
     checkForPoorTradeTheirItemsEdited(){
      const yourTotal = this.getYourTotal(false)
      const theirTotal = this.getTheirTotal(false)
      if(theirTotal >= yourTotal){
        this.tradeCondition = FILTER_CONDITION_EXCELLENT
      }else if(yourTotal >= this.getFairTradeValueForYourItems()){
        this.tradeCondition = FILTER_CONDITION_FAIR
      }else{
        this.tradeCondition = FILTER_CONDITION_POOR
      }
      return this.tradeCondition === FILTER_CONDITION_POOR
    },
    getFairTradeValue(){
      return (this.getTheirTotal(false) * this.fairTradePercentage)
    },
    getFairTradeValueForYourItems(){
      return (this.getYourTotal(false) * this.fairTradePercentage)
    },
    resetSearch(){
      this.searchItem = false
      this.searchText =  null
      this.searchedItems =  []
    },
    /**
     * This function is used to confirm add optional cash or edit
     * optional cash
     * @param value
     */
    addOptionalCash(value){
      this.cashAdded = value
      this.updateActiveTrade()
    },
    addOptionalCashMobile(value) {
      this.$refs.sheetcash.open();
      this.cashAdded = value
      this.updateActiveTrade()
    },
    removeItem(productId){
      if(this.editYours){
        this.$store.commit('counter-offer/removeCounterOfferYourItem', productId)
      }else{
        this.$store.commit('counter-offer/removeCounterOfferTheirItem', productId)
      }
      this.$nextTick(() => this.$forceUpdate())
      this.updateActiveTrade()
    },
    addTheirsInventoryItem(item){
      if(this.canAddMoreItems()){
        this.$store.commit('counter-offer/addTheirItem', item)
        this.updateActiveTrade()
        this.$toasted.success(this.$t('trades.item_added'))
        this.$nextTick(() => this.$forceUpdate())
      }
    },
    addYourInventoryItem(item){
      if(this.canAddMoreItems()){
        this.$store.commit('counter-offer/addYourItem', item)
        this.updateActiveTrade()
        this.$toasted.success(this.$t('trades.item_added'))
        this.$nextTick(() => this.$forceUpdate())
      }
    },

    editTheirsItems() {
      this.submittedItemType = OFFER_TYPE_THEIR
      this.editYours = false
      this.loadData()
      this.cashType = CASH_TYPE_REQUESTED
    },

    editYoursItems() {
      this.submittedItemType = OFFER_TYPE_YOURS
      this.editYours = true
      this.loadData()
      this.cashType = CASH_TYPE_ADDED
    },
    loadData(){
      const offerId = parseInt(this.$route.params.id)
      this.fetchOfferDetails(offerId)
      this.getInventory()
    },
    redirectToOfferPage(){
      const offerId = parseInt(this.$route.params.id)
      this.$router.push(`/profile/trades/dashboard/${offerId}`)
    },
    getTheirTotal(formattedPrice = true){
      let optionalCash = 0
      if(this.getLastSubmittedOffer.cash_added &&
        (this.isOfferMine() &&
        this.isCashTypeRequested()))
      {
        optionalCash = (this.getLastSubmittedOffer.cash_added/100)
      }
      if(this.cashType !== this.cashAddedType){
        optionalCash += (this.optionalCash)
      }
      const totalPrice = this.getTheirItems.map((inventoryItem) => (inventoryItem.inventory ? inventoryItem.inventory.sale_price : inventoryItem.sale_price))
      if(totalPrice.length) {
        return (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + parseFloat(optionalCash)).toFixed(2) : totalPrice.reduce((a, b) => a + b, 0) + (optionalCash * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(optionalCash)) : optionalCash * 100
    },
    getYourTotal(formattedPrice = true){
      let optionalCash = 0
      if(this.getLastSubmittedOffer.cash_added &&
        (this.isOfferMine() &&
        this.isCashTypeAdded()))
      {
          optionalCash = (this.getLastSubmittedOffer.cash_added/100)
      }
      else if(this.cashType === this.cashAddedType){
        optionalCash += this.optionalCash
      }
      const totalPrice = this.getYourItems.map((inventoryItem) => (inventoryItem.inventory ? inventoryItem.inventory.sale_price : inventoryItem.sale_price))
      if(totalPrice.length) {
        return (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + parseFloat(optionalCash)).toFixed(2) : totalPrice.reduce((a, b) => a + b, 0) + (optionalCash * 100)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(optionalCash)) : optionalCash * 100
    },
    isCashTypeRequested(){
        return this.getLastSubmittedOffer.cash_type === CASH_TYPE_REQUESTED
    },
    isCashTypeAdded(){
        return this.getLastSubmittedOffer.cash_type === CASH_TYPE_ADDED
    },
    isOfferMine() {
      return this.getLastSubmittedOffer.sent_by_id === this.$auth.user.vendor.id
    },
    /**
     * This function is used to check item can be added for trade
     * or limit exceeds
     * @returns {boolean}
     */
    canAddMoreItems() {
      const itemsCount = this.getYourTradeItems.map(i => i.quantity).reduce((a, b) => a + b, 0)
      if (itemsCount < MAX_ITEMS_ALLOWED) {
        return true
      } else {
        this.$toasted.error(this.$t('trades.trade_arena.your_items_length', [MAX_ITEMS_ALLOWED]))
        return false
      }
    },

    /**
     * This function is used to check if item exit in any other
     * Listing it will show us modal
     */
    showPoorTradeConfirmationModal() {
      this.updateActiveTrade()
      if(!this.editYours && this.checkForPoorTradeTheirItemsEdited()) {
        this.$root.$emit('bv::show::modal', 'poor_trade_confirmation', '#btnShow')
      } else if(this.checkForPoorTrade()){
        this.$root.$emit('bv::show::modal', 'poor_trade_confirmation', '#btnShow')
      }else {
        this.isPayment = true
      }
    },
    getTradeFee() {
      return this.tradingFee
    },

    setActiveTrade(){
      this.$store.commit('trade/setActiveTrade', {
        trade: this.getOffer,
        theirItems: this.getTheirItems,
        yourItems: this.getYourItems,
        cashAdded: parseInt(parseFloat(this.optionalCash)*100),
        cashType: this.cashType,
        tradeCondition: this.tradeCondition,
        submittedItemType: this.submittedItemType,
        offerType: COUNTER_OFFER_TYPE,
        theirVendorId: this.getTheirVendorId,
        tradeId: this.getOffer.trade_id,
        offerParentId: (this.getOffer.parent_id ? this.getOffer.parent_id : this.getOffer.id)
      })
    },

    updateActiveTrade(){
      this.$store.commit('trade/updateActiveTrade', {
        trade: this.getOffer,
        theirItems: this.getTheirItems,
        yourItems: this.getYourItems,
        cashAdded: parseInt(parseFloat(this.optionalCash)*100),
        cashType: this.cashType,
        tradeCondition: this.tradeCondition,
        submittedItemType: this.submittedItemType,
        offerType: COUNTER_OFFER_TYPE,
        theirVendorId: this.getTheirVendorId,
        tradeId: this.getOffer.trade_id,
        offerParentId: (this.getOffer.parent_id ? this.getOffer.parent_id : this.getOffer.id)
      })
    },
    submitCounterOffer(){
      if(this.getActiveTrade.trade){
        this.setActiveTrade()
      }
      this.$axios.post(`trades/${this.getOffer.trade_id}/offer`, {
          price: 0,
          shipping_fee: 0,
          processing_fee: 0,
          trade_fee: this.getTradeFee,
          tax: 0,
          total: 0,
          cash_added: (this.optionalCash * 100),
          cash_type: this.cashType,
          card_details: 'n/a',
          condition: this.tradeCondition,
          payment_token: 'n/a',
          offer_type: COUNTER_OFFER_TYPE,
          their_vendor_id: this.getTheirVendorId,
          your_items: this.getYourItems,
          their_items: this.getTheirItems,
          billing_address: null,
          shipping_address: null,
        }).then(() => {
          this.redirectToOfferPage()
        }).catch(error => {
          if (error.response.status === 400) {
            this.$toasted.error(this.$t(error.response.data.response_text).toString())
            return
          }
          this.$toasted.error(error.response.statusText)
      })
    },

    /***
     * This function is used to change order listing of
     * inventory items
     * @param selectedOrder
     */
    changeOrderFilter(selectedOrder) {
      this.orderFilter = selectedOrder
      const orderFilteredKey = this.generalListItemsCustomFilter.find(item => item.value === this.orderFilter)
      this.orderFilterLabel = this.$options.filters.capitalizeFirstLetter(orderFilteredKey.text)
      this.getInventory()
    },

    /****
     * This function is used to change selected
     * type of product filter
     * @param selectedCategory
     */
    changeCategory(selectedCategory) {
      this.categoryFilter = selectedCategory
      const categoryFilteredKey = this.categoryItems.find(item => item.value === this.categoryFilter)
      this.categoryFilterLabel = this.$options.filters.capitalizeFirstLetter(categoryFilteredKey.text)
    },
    /**
     * This function is used to change product size filter
     * @param selectedSizeType
     */
    changeSizeTypeFilter(selectedSizeType) {
      if (!this.sizeTypesFilter.includes(selectedSizeType)) {
        this.sizeTypesFilter.push(selectedSizeType)
      } else {
        this.sizeTypesFilter = this.sizeTypesFilter.filter(item => item !== selectedSizeType)
      }
      this.sizeTypesFilterLabel = this.$options.filters.joinAndCapitalizeFirstLetters(this.sizeTypesFilter, 2) || this.$t('trades.create_listing.vendor.wants.size_type') // 2 is max number of labels show in filter
    },

    /**
     * This function is used to change size filter
     * for product
     * @param selectedSize
     */
    changeSizeFilter(selectedSize) {
      if (!this.sizeFilter.includes(selectedSize.size)) {
        this.sizeFilter.push(selectedSize.size)
      } else {
        this.sizeFilter = this.sizeFilter.filter(item => item !== selectedSize.size)
      }
      this.sizeFilterLabel = this.$options
        .filters.joinAndCapitalizeFirstLetters(this.sizeFilter, MAX_LABELS_IN_CUSTOM_DROP_DOWN)
        || this.$t('trades.create_listing.vendor.wants.size')
    },

    /**
     * This function is used to get user listing of inventory
     */
    // getInventory: debounce(function (filters = {}) {
    //   filters.sort_by = this.orderFilter // sorting filter
    //   filters.category = this.categoryFilter // category type filter
    //   filters.sizes = this.sizeFilter.join(',') // size filter
    //   filters.size_types = this.sizeTypesFilter.join(',') // size type filter
    //   this.$axios
    //     .get('/vendor/inventory', {
    //       params: {
    //         search: this.searchText,   // for search query
    //         user_id: (this.editYours ? this.getYourVendorId : this.getTheirVendorId),   // for search query
    //         visibility: (this.editYours ? '' : PUBLIC_INVENTORY),
    //         page: this.page, // no of page to change
    //         per_page: this.perPage, // no of records to show on per page
    //         ...filters
    //       },
    //     })
    //     .then((response) => {  // list of vendor inventory
    //       this.inventoryItems = response.data.data
    //       this.totalCount = parseInt(response.data.total)
    //       this.perPage = parseInt(response.data.per_page)
    //     })
    //     .catch((error) => {
    //       this.$toasted.error(this.$t(error.response.data.error))
    //       this.searchedItems = []
    //     })
    // }, 500),

    /**
     * This function is used to get product and show in
     * listing below input search field
     * @param term
     */
    onSearchInput: debounce(function (term) {
      this.searchText = term
      if (term) {
        this.searchProductsList({
          search: term.toLowerCase(),
          take: TAKE_SEARCHED_PRODUCTS
        })
          .then((response) => {
            this.searchedItems = response.data && response.data.results && response.data.results.data // items for search list
          })
          .catch((error) => {
            this.$toasted.error(this.$t(error.response.data.error))
            this.searchedItems = []
          })
      } else {
        this.searchText = null
        this.searchedItems = []
      }
    }, 500),

    /**
     * This function is used to change pagination page no
     * and get record again for that page
     * @param bvEvent
     * @param page
     */
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.getInventory()
      }
    },

    /**
     * This function is used for change no records showing on per page
     * @param value
     */
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.getInventory()
      }
    },
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.overlay-mob
  background: $light-opacity
  top: 0
  left: 0
  width: 100%
  height: 100%
.lft-image
  width: 99px
  height: 161px
  top: 126px
.rgt-image
  width: 99px
  height: 161px
  top: 126px
.min-img
  height: 13px
  width: 13px
.w-xl-100
  @media (min-width: 1200px)
    width: 100%

.max-h-200
  max-height: 200px

.filter-label
  @include body-8-normal
  color: $color-black-1
  font-family: $font-family-sf-pro-display
  margin-bottom: 5px

.border-radius-8
  border-radius: 8px

.discard-btn
  @include body-4-medium
  height: 39px
  width: 190px
  border-radius: 8px
  background: $color-white-29
  color: $color-blue-20

.add-cash, .request-cash
  @include body-9
  font-family: $font-family-sf-pro-display

.add-cash
  color: $color-black-4
  font-weight: $medium
  margin-right: 11px

.request-cash
  color: $color-gray-4
  font-weight: $regular

.mt-55
  margin-top: 55px

.value
  @include body-8-normal
  color: $color-gray-5
  text-transform: uppercase

.price
  @include body-8-medium
  color: $color-black-1

.item-color
  max-width: 140px

.offer-id-head
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-16-bold
  letter-spacing: -0.02em
  text-transform: capitalize
  color: $color-black-1
  margin-top: 49px

.offer-sum-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1
  padding-top: 15px

.ml-54
  margin-left: 54px

.center-container
  @media (min-width: 1200px)
    padding-left: 30px
    padding-right: 30px
  @media (min-width: 1400px)
    padding-left: 160px
    padding-right: 160px

.offer-card
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  height: 1000px


.item-head-trade-hub
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 17px
  color: $color-black-1
  margin-bottom: 10px
  height: 35px
  padding-top: 15px

#trade-item-0
  @media (min-width: 1200px)
    position: absolute
    margin-left: 120%
    margin-top: 140px
    z-index: 10

#your-trade-item-0
  @media (min-width: 1200px)
    position: absolute
    z-index: 10
    margin-top: 140px
    margin-left: -120%

.optional-input-field
  @include body-9-normal
  width: 156px
  height: 38px
  background: $color-white-1
  border: 0.5px solid $color-gray-23
  border-radius: 4px
  padding-left: 10px
  padding-right: 10px
  color: $color-black-1
  font-family: $font-family-sf-pro-display
  box-shadow: inset 0px 6px 9px rgba(0, 0, 0, 0.06)
  margin-right: 16px

.optional-input-field::placeholder
  color: $color-gray-47

.input-mt
  margin-top: 7px

.add-cash-btn
  font-size: 14px
  min-width: 75px
  border-radius: 4px

.inventory-card-trade
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  padding: 30px 67px 20px 67px

.inventory-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1

.sub-heading-inventory
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-normal
  color: $color-gray-47
  padding-left: 15px

.filter-btn
  border-radius: 5px
  height: 42px

.inventory-items-trade
  padding-top: 30px
  padding-bottom: 30px

.remove-item-icon
  right: 5px
  top: 5px

.order-summary
  padding: 0
.btn-accept
  border-radius: 8px
  background: $color-blue-20
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 11px
  color: $color-white-1
.btn-decline
  border-radius: 8px
  background: $color-white-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 11px
  color: $color-blue-32
  border: 1px solid $color-white-5
.btn-counter
  border-radius: 8px
  border: 1px solid $color-blue-20
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 11px
  color: $color-blue-20
  background-color: $color-white-1
.fair-trade-division
  background-color: $color-white-4
  width: 247px
  height: 68px
.fair-trade-division-mobile
  background-color: $color-white-4
  //width: 247px
  //height: 68px
.item-image-small
  width: 80px
  height: 100px
.item-image-cond-small
  width: 80px
  height: 100px
.pointer-left-small
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 8px
  margin-top: -2rem
.pointer-left-small-two
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 8px
  margin-top: -5rem
.pointer-left-small-three
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 8px
  margin-top: -10rem
.item-length-small
  height: 160px
  width: 100px
.item-normal-small
  height: 160px
  width: 100px
.item-name-small
  width: 90px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-18
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.item-box-condition-small
  font-family: $font-family-montserrat
  font-style: normal
  width: 80px
  @include body-18
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.item-caption-description-small
  font-family: $font-family-montserrat
  font-style: normal
  width: 80px
  @include body-18
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.left-side-image
  height: 650px
.right-side-image
  height: 650px
  margin-right: 4rem

.center-item-small
  margin-left: -4rem
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 21px
  margin: 0 10px
  min-width: 100px
  max-width: 300px
.middle-trade-three
  margin-top: -10rem
.long-line-length-small
  width: 40px
  border: 1px solid $light-gray-2
.long-line-small
  width: 40px
  border: 1px solid $light-gray-2
.pointer-right-small
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-top: -1rem !important
.pointer-right-small-three
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-top: -10rem !important
.pointer-right-small-two
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 210px
  margin-top: -5rem !important
.item-caption-small
  width: 100px
  background: $color-white-1
  padding: 5px 10px
  font-family: $font-family-sf-pro-display
  font-style: normal
.image-right
  background-color: $color-white-4
.bg-img
  background-color: $color-white-4
.inventory-btn
  height: 40px
  width: 330px
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 16px
  color: $color-blue-20
  background-color: $color-white-1
  border-radius: 4px
.item-image-counteroffer-small
  width: 110px
.inventory-small
  height: 265px
  width: 150px
.bg-white
  background-color: $color-white-1
.discard-changes
  height: 40px
  width: 162px
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 14px
  color: $color-blue-20
  background-color: $color-white-1
  border-radius: 10px
.counter-offer
  height: 40px
  width: 150px
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-4-medium
  color: $color-white-1
  border-radius: 10px
  background-color: $color-blue-20
.btn-cash
  width: 330px
  height: 37px
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 14px
  color: $color-blue-19
  background-color: $color-white-1
  border: 1px solid $color-black-1
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25)

.bg-white-5
  background: $color-white-5
  box-shadow: 0px 1px 2px $color-black-rgb2
.clear,.done
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-regular
  letter-spacing: -0.02em
  color: $color-gray-23
.offer-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-bold
  letter-spacing: -0.02em
  color: $color-black-1
.est-val
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-regular
  letter-spacing: -0.02em
  color: $color-gray-25

.pro-image
  width: 81px
  z-index: 10
.remove-item
  height: 13px
  width: 13px
  z-index: 1000
  background: $color-red-24
.minus
  width: 7px
  height: 2px
  margin-top: 6px
  margin-left: 3px
.item-inventory
  height: 161px
  width: 99px
.item-name
  width: 85px
  font-size: 11px
  color: $color-gray-69
.item-box-condition,.item-caption-description
  width: 85px
  font-size: 11px
  color: $color-gray-5
.invent-item
  width: 164px
  height: 265px
.item-image-trade
  width: 134px
  border-radius: 0
.image-wrapper-inventory
  height: 185px
  width: 164px
.plus-icon-add-trade
  right: 5px
  top: 7px
  z-index: 1000
.your-inventory
  background: $color-white-1

.inventory-items
  @media (max-width: 380px)
    width: 375px
    overflow: hidden
.overlay-inventory
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.item-caption-inventory
  background: $color-white-1

.invent-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  @include body-30
  color: $color-black-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
  max-width: 160px

.invent-color,.invent-box
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  @include body-30
  color: $color-gray-5
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
  max-width: 160px
.overlay-image
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-white-1
.image-wrapper
  width: 120px
  height: 112.4px
.item-caption
  //background: $color-gray-1
  padding-left: unset
.color-blue
  color: $color-blue-20
.bottom-sheet::v-deep
  .bottom-sheet__card
    background: $color-gray-1
.invent-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-17-bold
  letter-spacing: -0.02em
  color: $color-black-1
.invent-subheading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-regular
  letter-spacing: -0.02em
  color: $color-gray-25
.input-search
  width: 306px
.add-item-invent
  background: url('~/assets/img/trades/select-inventory.svg')
  width: 100px
  height: 143px
.select-invent
  font-family: $font-family-montserrat
  font-style: normal
  @include body-29-normal
  letter-spacing: 0.005em
  color: $color-black-1
  padding-top: 43px
.upto-three
  font-family: $font-family-montserrat
  font-style: normal
  @include body-29-bold
  letter-spacing: 0.005em
  color: $color-gray-5
  padding-top: 13px
.no-items-found
  img
    width: 60px
  &-title
    font-size: 16px
    line-height: 22px
  &-subtitle
    font-size: 14px
    line-height: 19px
.center-container-xs
    min-height: 650px
    margin: 0 15px
    display: flex
    justify-content: center
.h-43
  height: 43px

.width-156
  min-width: 156px
  background: $color-white-1

.heading-left
  position: absolute
  margin-top: 30%
  left: 105%
  width: 275px

.heading-right
  position: absolute
  margin-top: 30%
  left: -140%
  width: 275px

.d-relative
  position: relative

.plus-icon-add-trade
  position: absolute
  right: 5%
  top: 15px
  z-index: 1000

.optional-input-field
  width: 236px
  height: 38px
  background: $color-white-1
  border: 0.5px solid $color-gray-4
  box-sizing: border-box
  border-radius: 31px
  padding-left: 20px

.input-mt
  margin-top: 7px

.cash-added
  background: $color-gray-1
  border-radius: 4px
  min-width: 247px
  padding: 7px
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 14px
  line-height: 17px
  color: $color-black-1

.edit-cash
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 14px
  line-height: 17px
  color: $color-blue-1

.image-wrapper
  height: 134px
  background: $color-white-4
  position: relative



.remove-item
  height: 13px
  width: 13px
  z-index: 1000
  background: $color-red-24

.minus
  width: 7px
  height: 2px
  margin-top: 6px
  margin-left: 3px

.item-name
  width: 85px
  font-size: 11px
  color: $color-gray-69



.long-line
  width: 17px

.center-img
  width: 31px
.trade-img
  //background: $color-white-1
  margin-left: 5px
  height: 20px
  width: 20px

.center-container
  min-height: 650px
  margin: 0 15px
  display: flex
  justify-content: center

.image-wrapper
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-grey-70

.pro-image
  width: 117px
  height: 100%



.price-container
  margin-bottom: 8px
  margin-top: 7px
  padding: 0 15px

.theirs-total
  background: $color-white-4
  border-radius: 2px
  height: 38px
  width: 118px

.price-text
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 11px
  line-height: 13px
  color: $color-black-1
  padding-left: 6px

.list-icon
  height: 24px
  width: 24px
  padding-left: 6px
.add-cash
  height: 37px
  width: 315px
  margin-left: 20px
  border-radius: unset
  margin-top: 19px
.authenticity
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 14.5px
  line-height: 18px
  letter-spacing: -0.04em
  color: $color-black-1
  padding-top: 25px
.authenticity-text
  font-family: $font-family-montserrat
  font-style: normal
  @include body-9-regular
  color: $color-black-1
  margin-top: 15px

.detail-heading
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-medium
  color: $color-black-1
  margin-top: 38px
  padding-left: 10px
  padding-bottom: 15px
.details
  padding: 0 18px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-5-regular
  color: $color-gray-5
.timer
  color: $color-red-3
.trader-wants
  width: 164px
  height: 265px
  margin-right: 12px
.wants-wrapper
  position: relative
  width: 164px
  height: 185px
  background: $color-white-4
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(153, 153, 153, 0.1)
  img
    width: 120px
    height: auto
    margin: 25px
.wants-container
  width: 375px
  overflow: scroll
  padding-left: 10px
.wants-name
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 13px
  line-height: 130%
  color: $color-black-1
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
.wants-size,.wants-box
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $regular
  font-size: 13px
  line-height: 130%
  color: $color-gray-5
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
.wants-heading
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-medium
  color: $color-black-1
  padding-left: 10px
  padding-bottom: 14px

.invent-btn,.next-btns
  width: 162px
  height: 40px

@media (max-width: 576px)
  .order-summary::v-deep
    min-width: 0
    width: 100%
    .custom-card .card-body
      padding: 15px
      background: $color-white-5
      border-radius: 10px
    .heading-1-medium
      @include body-13
    .body-4-medium
      @include body-9
    .custom-form .form-control
      background: $color-white-5
.pb-100
  padding-bottom: 100px



.image-wrapper-sm
  height: 134px
  background: $color-white-4
  position: relative

.right-item-xs,.left-item-xs
  width: 118px
  height: 153px
.right-item-margin-top-sm
  margin-top: 115px
.pro-image-sm
  width: 117px
  height: 100%
.center-item-sm
  min-width: 10px
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 21px
  margin: 0 10px
  width: unset
  max-width: 780px
.pointer-left-sm,.pointer-right-sm
  width: 25px
  height: 370px

.pointer-left-sm
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2

.pointer-right-sm
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2
.line-bar-sm
  width: 9px
  height: 2px
  background: $color-white-18
  margin: 15px -20px 0 -20px
.fair-text-sm
  //background: $color-white-1
  color: $color-black-1
  height: 30px
  width: 50px
  text-align: center
  z-index: 98
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-10
  margin-top: -30px
  margin-left: -10px
  padding-top: 5px
.pointer-right-two-items-sm
  height: 223px
.right-item-sm,.left-item-sm
  width: 118px
  height: 153px
.image-wrapper-sm
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-grey-70
.item-caption
  //background: $color-white-1
  padding: 5px 0

.right-item-sm .item-sm, .right-item-sm .preview-sm
  background-color: transparent
  box-sizing: border-box
  position: relative
  background-image: none
  background-repeat: no-repeat
  background-size: 210px 112px
  background-position: center

.right-item-margin-top-sm
  margin-top: 115px
.right-item-one-sm
  margin-top: 183px
  margin-left: 15px
.left-item-one-sm
  margin-top: 183px
  margin-right: 15px
</style>
