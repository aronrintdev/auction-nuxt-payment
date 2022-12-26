<template>
  <div v-if="activeAuction" class="container-fluid overflow auction-details-page">
    <div v-if="!isMobileSize" class="d-md-flex align-items-center justify-content-between mb-1 auction-header">
      <div>
        <b-breadcrumb :items="breadcrumbItems" class="mb-1"></b-breadcrumb>
        <div class="auctioner-rating">
          {{ $t('auctions.frontpage.auctioneer_rating') }}:<span class="ml-4">97%</span> <!-- todo -->
        </div>
      </div>
    </div>
    <!-- [mobile] time remaining block -->
    <mobile-time-remaining
      v-if="isMobileSize"
      :is-expired="isExpired"
      :is-scheduled="isScheduled"
      :is-sold="isSold"
      :end-at="activeAuction.end_date"
    />
    <div
      v-if="activeAuction.auction_items && activeAuction.auction_items.length > 0 && !isMobileSize"
      class="d-md-flex auction-content"
    >
      <div class="auction-content-main d-block">
        <!-- 360 image viewer -->
        <ProductImageViewerMagic360
          v-if="activeAuction.auction_items[currentItemIdx].inventory.product.has360Images"
          :product="activeAuction.auction_items[currentItemIdx].inventory.product"
        />
        <div v-else class="w-auto pr-5 mr-5">
          <Thumb :product="activeAuction.auction_items[currentItemIdx].inventory.product" />
        </div>
        <div v-if="activeAuction.type === 'collection'" class="d-block pr-5 mr-5 collection-items-slider">
          <div class="d-flex align-items-center mb-3">
            <span class="title">{{ $t('auctions.frontpage.collection_items') }}</span>
            <span class="count">{{`${currentItemIdx + 1} ${$t('auctions.frontpage.of')} ${activeAuction.auction_items.length}`}}</span>
          </div>
          <CollectionItemsSlider :items="activeAuction.auction_items" @change="onSlideChanged"></CollectionItemsSlider>
        </div>
      </div>
      <div class="auction-content-side">
        <!-- Expired mark -->
        <div v-if="isExpired" class="mb-4 d-flex flex-column align-items-center justify-content-center expired-status">
          <span>{{ $t('bids.expired_on') }}</span>
          <div class="d-flex mt-1">
            <span class="date">{{ activeAuction.end_date | formatDate }}</span>
            <span class="ml-2 time">@ {{ formatTime(activeAuction.end_date) }}</span>
          </div>
        </div>
        <!-- Scheduled -->
        <div v-if="isScheduled" class="mb-4 d-flex flex-column align-items-center justify-content-center scheduled-status">
          <span>{{ $t('auctions.frontpage.scheduled_on') }}</span>
          <div class="d-flex mt-1">
            <span class="date">{{ activeAuction.end_date | formatDate }}</span>
            <span class="ml-2 time">@ {{ formatTime(activeAuction.end_date) }}</span>
          </div>
        </div>
        <!-- Sold -->
        <div v-if="isSold" class="mb-4 d-flex flex-column align-items-center justify-content-center sold-status">
          <span>{{ $t('auctions.frontpage.sold_on') }}</span>
          <div class="d-flex mt-1">
            <span class="date">{{ activeAuction.end_date | formatDate }}</span>
            <span class="ml-2 time">@ {{ formatTime(activeAuction.end_date) }}</span>
          </div>
        </div>
        <div class="d-flex justify-content-between px-0 product-info-box">
          <div>
            <div class="product-info-box-title">{{ activeAuction.auction_items[currentItemIdx].inventory.product.name }}</div>
            <div class="product-info-box-value">
              <span>{{ $tc('common.size', 1) }} {{ activeAuction.auction_items[currentItemIdx].inventory.size.size }}&nbsp;-</span>
              <span>{{ $t('common.box_condition') }}: {{ $t(`common.box_conditions.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.category_id}.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.display_order}`) }}</span>
            </div>
          </div>
          <div v-if="!isMobileSize" class="d-flex align-items-start ml-4">
            <div :id="`popover-share-${activeAuction.id}`" class="round-btn" role="button">
              <share-icon width="16" height="20"></share-icon>
            </div>
            <div v-if="!isExpired" class="round-btn ml-4 mt-1" role="button">
              <Icon
                :id="`popover-watchlist-item-${activeAuction.id}`"
                src="eye.svg"
                hover-src="red-eye.svg"
                :active="watchlistShow || !!watchlist"
                width="20"
                height="20"
                tabindex="0"
                disableHover
                class="action-icon"
                :alt-text="watchlist ? watchlist.name : ''"
                :tooltip-text="watchlist ? watchlist.name : ''"
                @click="removeFromWatchList"
              />
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center stats">
          <div>
            <span class="stat-name">{{ $t('home_page.timeremaining') }}:</span>
            <span v-if="isExpired" class="ml-2 text-danger text-capitalize stat-value">
              {{ $t('bids.expired') }}
            </span>
            <span v-if="isScheduled" class="ml-2 text-gray text-capitalize stat-value">
              {{ $t('bids.scheduled') }}
            </span>
            <span v-else class="ml-2 stat-value">{{ activeAuction | remainingTime('dots') }}</span>
          </div>
          <div class="stat-divider mx-3"></div> 
          <div>
            <div class="stat-value text-primary" role="button" @click="$bvModal.show('bids-history-modal')">
              {{ activeAuction.bids.length }} {{ $tc('common.bid', activeAuction.bids.length) }}
            </div>
          </div>
          <div class="stat-divider mx-3"></div>
          <div>
            <div class="stat-value fontweight-normal">{{ activeAuction.number_of_bidders }} {{ $t('auctions.frontpage.watchers') }}</div>
          </div>
        </div>
        <div v-if="!isExpired" class="mb-4 p-0 bid-details">
          <div class="bid-details-price">
            <div class="text-uppercase">{{ $t('auctions.frontpage.current_bid') }}:</div>
            <div class="bid-details-price-value">${{ activeAuction.highest_bid || activeAuction.start_bid_price | formatPrice }}</div>
            <div class="bid-details-price-estimate text-capitalize">
              <span>({{ $t('auctions.frontpage.estimated_value') }}: </span>
              <span>${{ estimatedLowPrice | formatPrice }} - ${{ estimatedHighPrice | formatPrice }})</span>
            </div>
          </div>
          <!-- Quickc bid -->
          <div class="quick-bid">
            <div class="text-left text-uppercase quick-bid-title">
              {{ $t('auctions.frontpage.quick_bid') }}
              <img
                v-b-tooltip.hover
                :title="$t('auctions.frontpage.quick_bid_info')"
                class="mt-n1 ml-1"
                src="~/assets/img/icons/info-dark-blue.svg"
              />
            </div>
            <div class="d-flex align-items-center justify-content-between quick-bid-content">
              <div
                v-for="price in quickBidPrices"
                :key="price"
                class="quick-bid-btn"
                @click="placeQuickBid(price)"
              >
                ${{ price / 100 }}
              </div>
            </div>
          </div>

          <!-- AutoBid -->
          <div class="quick-bid d-block place-bid-form">
            <div class="text-left text-uppercase quick-bid-title">
              {{ $t('auctions.frontpage.auto_bid') }}
              <img id="info-icon" class="mt-n1 ml-1" src="~/assets/img/icons/info-dark-blue.svg" />
              <b-tooltip target="info-icon" custom-class="auto-bid-tooltip" triggers="hover">
                {{ $t('auctions.frontpage.auto_bid_tooltip') }} <span v-b-modal.auto-bid-thresholds-modal class="text-primary">
                  {{ $t('auctions.frontpage.view_threshold_chart') }}
                </span>
              </b-tooltip>
            </div>
            <div class="d-flex align-items-center">
              <input
                v-model="autoBidPrice"
                v-number-only
                class="text-left"
                :placeholder="$t('auctions.frontpage.insert_amount', {
                  price: activeAuction.highest_bid / 100 || activeAuction.start_bid_price / 100
                })"
              />
              <button
                class="place-bid-btn auto-bid"
                :disabled="!canPlaceAutoBid"
                @click="placeAutoBid"
              >
                {{ $t('auctions.frontpage.place_auto_bid') }}  
              </button>
            </div>
            <div v-if="activeAuction.auto_bid_settings[0]" class="mt-3 d-flex align-items-center justify-content-between auto-bid-setting">
              <div v-if="activeAuction.auto_bid_settings[0].bid">{{ $t('auctions.frontpage.prev_auto_bid_placed_at') }} ${{ activeAuction.auto_bid_settings[0].bid.price | formatPrice }}</div>
              <div class="d-flex align-items-center">
                <span class="mr-3">{{ autoBidDisabled ? 'Disabled' : 'Enabled' }}</span>
                <b-form-checkbox
                  :checked="!autoBidDisabled"
                  switch
                  size="lg"
                  @change="onUpdateAutoBidSetting(!autoBidDisabled)"
                ></b-form-checkbox>
              </div>
            </div>
          </div>

          <div class="quick-bid d-block place-bid-form">
            <div class="text-left text-uppercase quick-bid-title">
              {{ $t('auctions.frontpage.direct_bid') }}
            </div>
            <div class="d-flex align-items-center">
              <input
                v-model="placeBidPrice"
                v-number-only
                class="text-left flew-grow-1"
                :placeholder="$t('auctions.frontpage.insert_amount', {
                  price: activeAuction.highest_bid / 100 || activeAuction.start_bid_price / 100
                })"
              />
              <button class="place-bid-btn" :disabled="!placeBidPrice" @click="placeBid">
                {{ $t('auctions.frontpage.place_bid') }}
              </button>
            </div>
            <div v-if="showLowBidError" class="text-left text-danger mt-1">
              {{ $t('auctions.frontpage.place_bid_error') }}
            </div>
          </div>
        </div>

        <!-- Auth guaranteed -->
        <div class="mx-4 d-flex align-items-center justify-content-between auth-guaranteed">
          <div class="p-2 text-center">
            <img src="~/assets/img/icons/auth-guaranteed.png" />
            <div class="mt-2 auth-guaranteed-label">{{ $t('products.authenticity_guaranteed') }}</div>
          </div>
          <div class="mx-4 auth-guaranteed-divider"></div>
          <div class="auth-guaranteed-text py-2">{{ $t('auctions.frontpage.verification_guaranteed') }}</div>
        </div>
      </div>
    </div>
    <div v-if="activeAuction.auction_items && activeAuction.auction_items.length > 0 && isMobileSize">
      <div>
        <!-- 360 image viewer -->
        <ProductImageViewerMagic360
          v-if="activeAuction.auction_items[currentItemIdx].inventory.product.has360Images"
          :product="activeAuction.auction_items[currentItemIdx].inventory.product"
        />
        <Thumb v-else :product="activeAuction.auction_items[currentItemIdx].inventory.product" />
      </div>
      <div
        v-if="activeAuction.auction_items[currentItemIdx]"
        class="d-flex align-items-start justify-content-between p-0 product-info-box"
      >
        <div>
          <div class="product-info-box-title">{{ activeAuction.auction_items[currentItemIdx].inventory.product.name }}</div>
          <div class="product-info-box-value">
            {{ $tc('common.size', 1) }} {{ activeAuction.auction_items[currentItemIdx].inventory.size.size }} - {{ $t('common.box_condition') }}: {{ $t(`common.box_conditions.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.category_id}.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.display_order}`) }}
          </div>
        </div>
        <div v-if="isMobileSize && !isExpired" class="round-btn ml-3" role="button">
          <Icon
            :key="`watchlist-${watchlist && watchlist.id}`"
            src="eye.svg"
            hover-src="red-eye.svg"
            :active="!!watchlist"
            width="20"
            height="20"
            tabindex="0"
            class="action-icon"
            @click="toggleItemFromWatchlist"
          />
        </div>
      </div>
      <div v-if="activeAuction.type === 'collection'" class="mt-4 collection-items-slider">
        <div class="mb-2">
          <span class="title">{{ $t('auctions.frontpage.collection_items') }}</span>
          <span class="count">{{`${currentItemIdx + 1} ${$t('auctions.frontpage.of')} ${activeAuction.auction_items.length}`}}</span>
        </div>
        <CollectionItemsSlider :items="activeAuction.auction_items" @change="onSlideChanged"></CollectionItemsSlider>
      </div>
      <template v-if="!isExpired">
        <!-- quick bid -->
        <div  class="quick-bid">
          <div class="text-left text-uppercase quick-bid-title">
            {{ $t('auctions.frontpage.quick_bid') }}
            <img class="mt-n1 ml-1" src="~/assets/img/icons/info-dark-blue.svg" @click="openQuickBidDescSheet"/>
          </div>
          <div class="d-flex align-items-center justify-content-between quick-bid-content">
            <div
              v-for="price in quickBidPrices.slice(0, 4)"
              :key="price"
              class="border-0 quick-bid-btn"
              @click="placeQuickBid(price, 'sheet')"
            >
              ${{ price / 100 }}
            </div>
          </div>
        </div>
        <!-- Auto bid -->
        <div class="mt-4 quick-bid">
          <div class="text-left text-uppercase quick-bid-title">
            {{ $t('auctions.frontpage.auto_bid') }}
            <img class="mt-n1 ml-1" src="~/assets/img/icons/info-dark-blue.svg" @click="openAutoBidDescSheet"/>
          </div>
          <div class="d-flex align-items-center justify-content-between quick-bid-content">
            <b-btn class="w-100 py-2 px-0 quick-bid-autobid" @click="prepareAutoBid">{{ $t('auctions.frontpage.place_auto_bid') }}</b-btn>
          </div>
        </div>
        <div v-if="activeAuction.auto_bid_settings[0]" class="mt-3 d-flex align-items-start flex-column auto-bid-setting">
          <div v-if="activeAuction.auto_bid_settings[0].bid" class="auto-bid-setting-title">{{ $t('auctions.frontpage.prev_auto_bid_placed_at') }} ${{ activeAuction.auto_bid_settings[0].bid.price | formatPrice }}</div>
          <div class="d-flex align-items-center">
            <span class="mr-3 w-65">{{ autoBidDisabled ? 'Disabled' : 'Enabled' }}</span>
            <b-form-checkbox
              :checked="!autoBidDisabled"
              switch
              size="lg"
              @change="onUpdateAutoBidSetting(!autoBidDisabled)"
            ></b-form-checkbox>
          </div>
        </div>
      </template>
      <!-- Auction details -->
      <div class="mt-4 pt-3 auction-details">
        <div class="auction-details-title">{{ $t('auctions.frontpage.details') }}</div>
        <div class="auction-details-content">
          <div class="d-flex align-items-center justify-content-between">
            <span>{{ $t('auctions.frontpage.estimated_value') }}</span>
            <span>${{ estimatedLowPrice | formatPrice }} - ${{ estimatedHighPrice | formatPrice }}</span>
          </div>
          <div class="mt-2 d-flex align-items-center justify-content-between">
            <span>{{ $t('auctions.frontpage.number_of_bids') }}</span>
            <span>{{ activeAuction.bids.length }}</span>
          </div>
          <div class="mt-2 d-flex align-items-center justify-content-between">
            <span>{{ $t('auctions.frontpage.watchers') }}</span>
            <span>{{ activeAuction.number_of_bidders }}</span>
          </div>
          <div class="mt-2 d-flex align-items-center justify-content-between">
            <span>{{ $t('auctions.frontpage.auctioneer_rating') }}</span>
            <span>97%</span> <!-- Todo -->
          </div>
          <div class="mt-2 d-flex align-items-center justify-content-between">
            <span>{{ $t('auctions.frontpage.auction_id') }}</span>
            <span>{{ activeAuction.id }}</span>
          </div>
        </div>
      </div>
      <!-- product details -->
      <div class="mt-4">
        <!-- bidding history -->
        <div v-if="!isExpired">
          <BottomSheetOpener :title="$t('auctions.frontpage.bidding_history')">
            <table class="w-100 text-center bidding-history-table">
              <thead>
                <tr>
                  <th>{{ $t('auctions.frontpage.time_date') }}</th>
                  <th width="40%"></th>
                  <th>{{ $t('auctions.frontpage.bid_amount') }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="activeAuction.bids.length > 0">
                  <tr v-for="bid in activeAuction.bids" :key="bid.id">
                    <td class="py-3">
                      <div class="text-dark value">{{ bid.created_at | formatDate('MM-DD-YYYY') }}</div>
                      <div class="seconds">{{ bid.created_at | formatTime }}</div>
                    </td>
                    <td>&nbsp;</td>
                    <td class="value">${{ bid.price | formatPrice }}</td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td class="value">-</td>
                    <td>&nbsp;</td>
                    <td class="value">-</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </BottomSheetOpener>
        </div>
        <div class="mt-3">
          <BottomSheetOpener :title="$t('auctions.frontpage.product_details')">
            <div class="product-details">
              <div class="mb-2 d-flex justify-content-between">
                <span>{{ $t('common.sku') }}</span>
                <span class="product-details-value text-right">
                  {{ activeAuction.auction_items[currentItemIdx].inventory.product.sku }}
                </span>
              </div>
              <div class="mb-2 d-flex justify-content-between">
                <span>{{ $t('common.colorway') }}</span>
                <span class="product-details-value text-right">
                  {{ activeAuction.auction_items[currentItemIdx].inventory.color }}
                </span>
              </div>
              <div class="mb-4 d-flex justify-content-between">
                <span>{{ $t('common.box_condition') }}</span>
                <span class="product-details-value text-right">
                  {{ $t(`common.box_conditions.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.category_id}.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.display_order}`) }}
                </span>
              </div>
            </div>
          </BottomSheetOpener>
        </div>
        <!-- size guide -->
        <div class="mt-3">
          <BottomSheetOpener :title="$t('auctions.frontpage.size_guide')">
            <!-- overall fit -->
            <div class="overall-fit">
              <img src="~/assets/img/icons/arcticons_tapemeasure.svg" />
              <span>{{ $t('auctions.frontpage.overall_fit') }}</span>
            </div>
            <div class="size-table">
              <div class="size-sticky-col">
                <div v-for="(size, idx) in sizes" :key="idx" class="size-table-cell text-center">{{ size.type }}</div>
              </div>
              <div class="size-table-content d-flex">
                <div v-for="(size, idx) in sizes" :key="idx" class="flex-column size-table-row">
                  <div v-for="(item, index) in size.items" :key="`cell-${idx}-${index}`" class="text-center size-table-cell">{{ item }}</div>
                </div>
              </div>
            </div>
          </BottomSheetOpener>
        </div>
      </div>
      <!-- Auth guaranteed -->
      <div class="d-flex align-items-center justify-content-between auth-guaranteed">
        <div class="pl-3 pr-1 py-2 text-center">
          <img src="~/assets/img/icons/auth-guaranteed.png" />
          <div class="mt-2 auth-guaranteed-label">{{ $t('products.authenticity_guaranteed') }}</div>
        </div>
        <div class="auth-guaranteed-divider"></div>
        <div class="auth-guaranteed-text py-2">{{ $t('auctions.frontpage.verification_guaranteed') }}</div>
      </div>
    </div>
    <div class="similar-auctions">
      <product-slider
        :title="$t('auctions.frontpage.auction_details.similar_auctions')"
        :auctions="similarAuctions"
        :showAllText="isMobileSize"
        :itemsCount="5"
        :margin="33"
        :showArrows="true"
        @showAll="showAllAuctions"
      ></product-slider>
    </div>
    <div
      v-if="activeAuction.auction_items && activeAuction.auction_items[currentItemIdx] && !isMobileSize"
      class="d-md-block auctions-block product-details"
    >
      <b-tabs pills class="product-details-tabs">
        <b-tab title="Product Details" active>
            <b-row class="mb-1">
              <b-col class="field-name" md="2">{{ $t('common.sku') }}:</b-col>
              <b-col class="field-value" md="10">{{ activeAuction.auction_items[currentItemIdx].inventory.product.sku }}</b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col class="field-name" md="2">{{ $t('common.colorway') }}:</b-col>
              <b-col class="field-value" md="10">{{ activeAuction.auction_items[currentItemIdx].inventory.color }}</b-col>
            </b-row>
            <b-row>
              <b-col class="field-name" md="2">{{ $t('common.box_condition') }}:</b-col>
              <b-col class="field-value" md="10">
                {{ $t(`common.box_conditions.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.category_id}.${activeAuction.auction_items[currentItemIdx].inventory.packaging_condition.display_order}`) }}
              </b-col>
            </b-row>
        </b-tab>
        <b-tab title="Size Guide">
          <div class="size-guide-content">
            <div>
              <strong>{{ $t('auctions.frontpage.size_guide_text') }}</strong>
              <div class="size-table">
                <div class="size-sticky-col">
                  <div v-for="(size, idx) in sizes" :key="idx" class="size-table-cell">{{ size.type }}</div>
                </div>
                <div class="size-table-content">
                  <div v-for="(size, idx) in sizes" :key="idx" class="size-table-row">
                    <div v-for="(item, index) in size.items" :key="`cell-${idx}-${index}`" class="size-table-cell">{{ item }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <!-- place bid -->
    <div v-if="isExpired" class="text-center place-bid-section">
      <div class="current-bid-label text-uppercase">{{ $t('auctions.frontpage.starting_bid') }}</div>
      <div class="current-bid-price text-gray">${{ activeAuction.start_bid_price | formatPrice }}</div>
    </div>
    <div v-else class="d-md-none mt-5 pt-3 d-flex justify-content-between align-items-center place-bid-section position-fixed">
      <div>
        <div class="current-bid-label text-uppercase">{{ $t('auctions.frontpage.current_bid') }}</div>
        <div class="current-bid-price">${{ (activeAuction.highest_bid || 0) | formatPrice }}</div>
      </div>
      <b-btn class="place-bid-btn" @click="$bvModal.show('placebid-modal')">{{ $t('auctions.frontpage.place_bid') }}</b-btn>
    </div>
    <b-modal id="auto-bid-thresholds-modal" hide-footer hide-header size="lg">
      <close-icon class="close-icon" @click="$bvModal.hide('auto-bid-thresholds-modal')"></close-icon>
      <h3 class="thresholds-modal-title">{{ $t('auctions.frontpage.auto_bid_thresholds') }}</h3>
      <p class="thresholds-modal-content">{{ $t('auctions.frontpage.auto_bid_modal_content') }}</p>
      <div class="pb-4">
        <b-table :items="ThresholdsData" :fields="ThresholdFields">
          <template #cell(current_bid)="row">
            <div>{{ row.item.current_bid }}</div>
          </template>
          <template #cell(bid_increment)="row">
            <div>{{ row.item.bid_increment }}</div>
          </template>
        </b-table>
      </div>
    </b-modal>
    <!-- Bid Confirm Modal -->
    <b-modal id="quick-bid-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('quick-bid-modal')"></close-icon>
      </div>
      <div class="bid-modal pb-3">
        <h5 class="mb-4 mx-auto w-75 bid-modal-title">{{ modalData.title }}</h5>
        <div class="d-flex justify-content-center bid-modal-time">
          <span class="text-color-gray mr-3">{{ $t('auctions.frontpage.time_remaining') }}:&nbsp;&nbsp;{{ activeAuction | remainingTime('dots') }}</span>
        </div>
        <div class="mt-5 mb-4 d-flex justify-content-center">
          <b-button class="mx-3 bg-dark-blue confirm-btn" pill @click="onPlaceBidConfirmed">{{ modalData.auto_bid ? $t('auctions.frontpage.bid_up_to') : $t('auctions.frontpage.bid') }} ${{ modalData.price | formatPrice }} {{ $t('auctions.frontpage.fees') }}</b-button>
          <b-button class="mx-3 cancel-btn" variant="outline-dark" pill @click="$bvModal.hide('quick-bid-modal')">{{ $t('common.cancel') }}</b-button>
        </div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.placed_bid_desc') }}</small></div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.read_about') }} <nuxt-link to="/privacy-policy" class="text-primary text-decoration-underline">{{ $t('auctions.frontpage.policies_and_fees') }}</nuxt-link></small></div>
      </div>
    </b-modal>
    <!-- Bid Confirm Modal -->
    <b-modal id="auto-bid-enable-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('auto-bid-enable-modal')"></close-icon>
      </div>
      <div class="bid-modal pb-3">
        <h5 class="mb-4 mx-auto w-75 bid-modal-title">{{ $t('auctions.frontpage.enable_auto_bid_confirm_text') }}</h5>
        <div class="d-flex justify-content-center">
          <span class="text-color-gray mr-3 bid-modal-time">{{ $t('auctions.frontpage.time_remaining') }}:&nbsp;&nbsp;{{ activeAuction | remainingTime('dots') }}</span>
        </div>
        <div class="mt-5 mb-4 d-flex justify-content-center">
          <b-button class="mx-3 bg-dark-blue confirm-btn" pill @click="onEnableAutoBid">{{ $t('auctions.frontpage.bid_up_to') }} ${{ autoBidPrice * 100 | formatPrice }} {{ $t('auctions.frontpage.fees') }}</b-button>
          <b-button class="mx-3 cancel-btn" variant="outline-dark" pill @click="$bvModal.hide('auto-bid-enable-modal')">{{ $t('common.cancel') }}</b-button>
        </div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.placed_bid_desc') }}</small></div>
        <div class="text-center"><small>{{ $t('auctions.frontpage.read_about') }} <nuxt-link to="/privacy-policy" class="text-primary text-decoration-underline">{{ $t('auctions.frontpage.policies_and_fees') }}</nuxt-link></small></div>
      </div>
    </b-modal>
    <b-modal id="auto-bid-success-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('auto-bid-success-modal')"></close-icon>
      </div>
      <div class="text-center w-75 mx-auto my-2">
        <div class="success-text">{{ $t('auctions.frontpage.success_bid_msg') }}</div>
        <div class="d-flex align-items-center justify-content-center mx-auto mt-3 checkmark-icon">
          <CheckmarkIcon />
        </div>
      </div>
    </b-modal>
    <WatchlistPopover
      v-if="!watchlist"
      :auction="activeAuction"
      :target="`popover-watchlist-item-${activeAuction.id}`"
      @show="watchlistShow = true"
      @hidden="watchlistShow = false"
      @watchlisted="onWatchlisted"
    />
    <b-popover
      ref="sharePopover"
      :target="`popover-share-${activeAuction.id}`"
      triggers="hover"
      placement="bottom"
      :container="`popover-share-${activeAuction.id}`"
      custom-class="watchlist-popover"
      delay="200"
      @show="shareShow = true"
      @hidden="shareShow = false"
    >
      <ShareButton
        :url="shareUrl + activeAuction.id"
        :title="auctionName"
        :description="''"
      />
    </b-popover>
    <vue-bottom-sheet v-if="isMobileSize" ref="quickBidModalSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="flex-shrink-1 overflow-auto text-center filters-sheet-content quick-bid-sheet">
          <h5 class="w-100">{{ modalData.title }}</h5>
          <div class="d-flex justify-content-center time-remaining">
            <span class="mr-3">{{ $t('auctions.frontpage.time_remaining') }}</span>
            <strong class="text-danger">{{ activeAuction | remainingTime('medium') }}</strong>
          </div>
          <div class="my-4 d-flex justify-content-center">
            <b-button class="mr-2 px-5" variant="outline-dark" pill @click="closeQuickBidSheet">{{ $t('common.cancel') }}</b-button>
            <b-button class="ml-2 px-4 border-0 text-white bg-dark-blue d-flex align-items-center" pill @click="onPlaceBidConfirmed">{{ modalData.auto_bid ? $t('auctions.frontpage.bid_up_to') : $t('auctions.frontpage.bid') }} ${{ modalData.price | formatPrice }}<small> {{ $t('auctions.frontpage.fees') }}</small></b-button>
          </div>
          <div class="pt-2 text-center placed-bid-desc mb-2">{{ $t('auctions.frontpage.placed_bid_desc') }}</div>
          <div class="text-center placed-bid-desc">{{ $t('auctions.frontpage.read_about') }} <nuxt-link to="/privacy-policy" class="text-primary">{{ $t('auctions.frontpage.policies_and_fees') }}</nuxt-link></div>
        </div>
      </div>
    </vue-bottom-sheet>
    <vue-bottom-sheet v-if="isMobileSize" ref="placeBidModalSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="flex-shrink-1 overflow-auto text-center filters-sheet-content quick-bid-sheet">
          <h5 class="w-100">{{ modalData.title }}</h5>
          <div class="d-flex justify-content-center time-remaining">
            <span class="mr-3">{{ $t('auctions.frontpage.time_remaining') }}</span>
            <strong class="text-danger">{{ activeAuction | remainingTime('medium') }}</strong>
          </div>
          <div class="my-4 d-flex justify-content-center">
            <b-button class="mr-2 px-5" variant="outline-dark" pill @click="$refs.placeBidModalSheet.close()">{{ $t('common.cancel') }}</b-button>
            <b-button class="ml-2 px-4 border-0 text-white bg-dark-blue d-flex align-items-center" pill @click="onPlaceBidConfirmed">{{ $t('auctions.frontpage.bid') }} ${{ modalData.price | formatPrice }}&nbsp;<small>{{ $t('auctions.frontpage.fees') }}</small></b-button>
          </div>
          <div class="pt-2 text-center placed-bid-desc mb-2">{{ $t('auctions.frontpage.placed_bid_desc') }}</div>
          <div class="text-center placed-bid-desc">{{ $t('auctions.frontpage.read_about') }} <nuxt-link to="/privacy-policy" class="text-primary">{{ $t('auctions.frontpage.policies_and_fees') }}</nuxt-link></div>
        </div>
      </div>
    </vue-bottom-sheet>
    <!-- AutoBid Modal Sheet -->
    <vue-bottom-sheet v-if="isMobileSize" ref="autoBidModalSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="flex-shrink-1 overflow-auto text-center filters-sheet-content quick-bid-sheet">
          <h5>{{ $t('auctions.frontpage.enable_auto_bid_confirm_text') }}</h5>
          <div class="d-flex justify-content-center time-remaining">
            <span class="mr-2">{{ $t('auctions.frontpage.time_remaining') }}:</span>
            <strong class="text-danger">{{ activeAuction | remainingTime('medium') }}</strong>
          </div>
          <div class="my-4 d-flex justify-content-center">
            <b-button class="mr-2 px-5" variant="outline-dark" pill @click="$refs.autoBidModalSheet.close()">{{ $t('common.cancel') }}</b-button>
            <b-button
              class="ml-2 px-3 border-0 text-white bg-dark-blue d-flex align-items-center"
              variant="primary"
              pill
              @click="onEnableAutoBid"
            >
              {{ $t('auctions.frontpage.bid_up_to') }} ${{ autoBidPrice }}<small>&nbsp;{{ $t('auctions.frontpage.fees') }}</small>
            </b-button>
          </div>
          <div class="text-center"><small>{{ $t('auctions.frontpage.placed_bid_desc') }}</small></div>
          <div class="text-center"><small>{{ $t('auctions.frontpage.read_about') }} <nuxt-link to="/privacy-policy" class="text-primary">{{ $t('auctions.frontpage.policies_and_fees') }}</nuxt-link></small></div>
        </div>
      </div>
    </vue-bottom-sheet>
    <!-- Autobid Prepare Modal -->
    <b-modal id="autobid-prepare-modal" class="bid-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('autobid-prepare-modal')"></close-icon>
      </div>
      <div class="text-left">
        <h5 class="mt-3 mb-4">{{ $t('auctions.frontpage.place_auto_bid') }}</h5>
        <div class="description-text">
          {{ $t('auctions.frontpage.auto_bid_tooltip') }} <span v-b-modal.auto-bid-thresholds-modal class="text-primary">{{ $t('auctions.frontpage.view_threshold_chart') }}</span>
        </div>
        <div class="mt-3 field d-flex justify-content-between align-items-center">
          <span class="mr-3">{{ $t('auctions.frontpage.insert_amount', { price: activeAuction.highest_bid / 100 || activeAuction.start_bid_price / 100 }) }}</span>
          <input v-model="autoBidPrice" type="number" placeholder="$0" class="text-right px-2" />
        </div>
        <div class="field d-flex justify-content-between align-items-center">
          <span class="mr-3">{{ $t('auctions.frontpage.current_bid') }}</span>
          <strong>${{ (activeAuction.highest_bid || activeAuction.start_bid_price) | formatPrice }}</strong>
        </div>
        <div class="field d-flex justify-content-between align-items-center">
          <span class="mr-3">{{ $t('auctions.frontpage.time_remaining') }}</span>
          <strong>{{ activeAuction | remainingTime('dots') }}</strong>
        </div>
        <div class="my-4 d-flex justify-content-center">
          <b-button
            class="w-100"
            :disabled="!canPlaceAutoBid"
            pill
            @click="openAutoBidSheet"
          >
            {{ $t('auctions.frontpage.review') }}
          </b-button>
        </div>
      </div>
    </b-modal>
    <!-- Place Bid Modal -->
    <b-modal id="placebid-modal" class="bid-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('placebid-modal')"></close-icon>
      </div>
      <div class="text-left">
        <h5 class="mt-3 mb-4">{{ $t('auctions.frontpage.place_bid') }}</h5>
        <div class="mt-3 field d-flex justify-content-between align-items-center">
          <span class="mr-3">{{ $t('auctions.frontpage.insert_amount', { price: activeAuction.highest_bid / 100 || activeAuction.start_bid_price / 100 }) }}</span>
          <input v-model="placeBidPrice" type="number" placeholder="$0" class="text-right px-2" />
        </div>
        <div class="field d-flex justify-content-between align-items-center">
          <span class="mr-3">{{ $t('auctions.frontpage.current_bid') }}</span>
          <strong>${{ (activeAuction.highest_bid || activeAuction.start_bid_price) | formatPrice }}</strong>
        </div>
        <div class="field d-flex justify-content-between align-items-center">
          <span class="mr-3">{{ $t('auctions.frontpage.time_remaining') }}</span>
          <strong class="text-danger">{{ activeAuction | remainingTime('medium') }}</strong>
        </div>
        <div class="my-4 d-flex justify-content-center">
          <b-button
            class="w-100"
            :disabled="placeBidPrice <= (activeAuction.highest_bid / 100) || placeBidPrice <= (activeAuction.start_bid_price / 100)"
            pill
            @click="placeBid('sheet')"
          >
            {{ $t('auctions.frontpage.review') }}
          </b-button>
        </div>
      </div>
    </b-modal>
    <!-- Bids history Modal -->
    <b-modal id="bids-history-modal" class="bid-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('bids-history-modal')"></close-icon>
      </div>
      <div class="text-left recent-bidding-history">
        <div class="recent-bidding-history-title">{{ $t('auctions.frontpage.recent_bidding_history') }}</div>
        <table class="mt-2 w-100 text-center">
          <thead>
            <tr>
              <th>{{ $t('auctions.frontpage.time_date') }}</th>
              <th>{{ $t('auctions.frontpage.bid_amount') }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="activeAuction.bids && activeAuction.bids.length > 0">
              <tr v-for="bid in activeAuction.bids" :key="bid.id">
                <td>
                  <strong>{{ bid.created_at | formatDate('MM-DD-YYYY') }}</strong>
                  <span>{{ bid.created_at | formatTime }}</span>
                </td>
                <td>${{ bid.price | formatPrice }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td>-</td>
                <td>-</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </b-modal>
    <WatchlistBottomSheet v-if="isMobileSize" :auction="activeAuction" :open="watchlistSheetVisible" @watchlisted="onWatchlisted" @close="watchlistSheetVisible=false" />
    <!-- PlaceBid Desc Sheet -->
    <vue-bottom-sheet v-if="isMobileSize" ref="quickBidDescSheet" max-height="70%">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('auctions.frontpage.quick_bid') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content quick-bid-desc-sheet">
          <div class="d-flex align-items-start px-3 pt-1 pb-5">
            <img src="~/assets/img/icons/info-dark-blue.svg" />
            <p class="ml-3 flex-shrink-1 body-21-regular">{{ $t('auctions.frontpage.quick_bid_info') }}</p>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
    <!-- AutoBid Desc Sheet -->
    <vue-bottom-sheet v-if="isMobileSize" ref="autoBidDescSheet" max-height="70%">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('auctions.frontpage.auto_bid') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content quick-bid-desc-sheet">
          <div class="d-flex align-items-start px-3 pt-1 pb-5">
            <img src="~/assets/img/icons/info-dark-blue.svg" />
            <p class="ml-3 flex-shrink-1 body-21-regular">{{ $t('auctions.frontpage.auto_bid_tooltip') }}</p>
          </div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import dayjs from 'dayjs'

import ProductSlider from '~/components/Auctions/ProductSlider'
import ShareIcon from '~/assets/img/icons/share.svg?inline'
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import { AuctionThresholdsData, AuctionSizes, AUCTION_TYPE_COLLECTION, WATCHLIST_TYPE_AUCTION, SCHEDULED_STATUS } from '~/static/constants'
import CheckmarkIcon from '~/assets/img/icons/checkmark.svg?inline'
import {API_PROD_URL} from '~/static/constants/environments'
import {LARGE_PRODUCT_IMG_WIDTH, THUMB_PRODUCT_IMG_WIDTH, DEADSTOCK_PRODUCT_FALLBACK_IMAGE, EXPIRED_STATUS} from '~/static/constants/auctions'
import {
  COMPLETED_STATUS
} from '~/static/constants/trades'
import WatchlistPopover from '~/components/watchlist/Popover'
import ShareButton from '~/components/common/ShareButton'
import Icon from '~/components/common/Icon.vue'
import MobileTimeRemaining from '~/components/Auctions/MobileTimeRemaining'
import Thumb from '~/components/product/Thumb'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import BottomSheetOpener from '~/components/Auctions/BottomSheetOpener'
import CollectionItemsSlider from '~/components/Auctions/CollectionItemsSlider'
import WatchlistBottomSheet from '~/components/Auctions/WatchlistBottomSheet'
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'AuctionDetailsPage',
  components: {
    ShareIcon,
    ProductSlider,
    CloseIcon,
    CheckmarkIcon,
    WatchlistPopover,
    ShareButton,
    Icon,
    MobileTimeRemaining,
    Thumb,
    ProductImageViewerMagic360,
    BottomSheetOpener,
    CollectionItemsSlider,
    WatchlistBottomSheet,
  },
  mixins: [screenSize],
  layout: 'IndexLayout',
  data() {
    return {
      loading: false,
      breadcrumbItems: [],
      images: [],
      similarAuctions: [],
      ThresholdFields: [
        {
          key: 'current_bid',
          label: this.$t('auctions.frontpage.auction_details.thresholds_current_bid'),
          class: 'current-bid',
        },
        {
          key: 'bid_increment',
          label: this.$t('auctions.frontpage.auction_details.thresholds_bid_increment'),
          class: 'bid-increment',
        },
      ],
      ThresholdsData: AuctionThresholdsData,
      sizes: AuctionSizes,
      activeAuthTab: 'signup',
      authUser: this.$auth.user,
      autoBidStep: this.$auth.loggedIn ? 'payment' : 'auth',
      quickBidPrices: [],
      quickBidPrice: null,
      modalData: {},
      placeBidPrice: null,
      autoBidPrice: null,
      API_PROD_URL,
      isExpired: false,
      showLowBidError: false,
      isAutoBidConfigSaving: false,
      autoBidDisabled: false,
      currentItemIdx: 0,
      shareShow: false,
      shareUrl: `${process.env.APP_URL}/auction/`,
      watchlistShow: false,
      watchlist: null,
      auctionName: '',
      watchlistSheetVisible: false,
      EXPIRED_STATUS,
    }
  },
  computed: {
    ...mapGetters({
      activeAuction: 'auction/activeAuction',
    }),
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    },
    isScheduled() {
      return this.activeAuction.status === SCHEDULED_STATUS
    },
    isSold() {
      return this.activeAuction.status === COMPLETED_STATUS
    },
    estimatedLowPrice() {
      return this.activeAuction ? Math.ceil(this.activeAuction.start_bid_price / 1000) * 1000 : 0
    },
    estimatedHighPrice() {
      return this.activeAuction ? Math.ceil(this.activeAuction.start_bid_price * 1.84 / 1000) * 1000 : 0
    },
    canPlaceAutoBid() {
      return this.autoBidPrice &&
        parseFloat(this.autoBidPrice) * 100 > this.activeAuction.start_bid_price &&
        parseFloat(this.autoBidPrice) * 100 > this.activeAuction.highest_bid
    }
  },
  watch: {
    activeAuction(newV) {
      this.breadcrumbItems = [
        {
          text: this.$t('home.auctions'),
          href: '/auction'
        },
        {
          text: newV.type === AUCTION_TYPE_COLLECTION ? this.$t('home_page.collections') : this.$tc('common.single_item', 2),
        },
        {
          text: `${this.$t('auctions.frontpage.auction_id')}# ${newV.id}`,
          active: true
        }
      ]
      this.images = newV.auction_items.map(item => {
        if (item.inventory.product.category && LARGE_PRODUCT_IMG_WIDTH && THUMB_PRODUCT_IMG_WIDTH) {
          return {
            big: `${this.API_PROD_URL}/${item.inventory.product.category.name}/${item.inventory.product.sku}/image?width=${LARGE_PRODUCT_IMG_WIDTH}`,
            thumb: `${this.API_PROD_URL}/${item.inventory.product.category.name}/${item.inventory.product.sku}/image?width=${THUMB_PRODUCT_IMG_WIDTH}`,
          }
        }
        return {
          big: DEADSTOCK_PRODUCT_FALLBACK_IMAGE,
          thumb: DEADSTOCK_PRODUCT_FALLBACK_IMAGE,
        }
      })
      const mainPrice = newV.highest_bid ? Math.floor(newV.highest_bid / 5000) + 1 : Math.floor(newV.start_bid_price / 5000) + 1;
      this.quickBidPrices = [mainPrice * 5000, (mainPrice + 1) *5000, (mainPrice + 2) * 5000, (mainPrice + 3) * 5000, (mainPrice + 4) * 5000]
      if (this.$options.filters.remainingTime(newV) === EXPIRED_STATUS || newV.status === EXPIRED_STATUS) {
        this.isExpired = true
      }
      this.autoBidDisabled = newV.auto_bid_settings[0] ? newV.auto_bid_settings[0].is_disabled : false
      this.auctionName = this.getAuctionName(newV)
      this.watchlist = newV.watchlist_item?.watchlist
      this.loadSimilarAuctions()
    },
    placeBidPrice(value) {
      this.showLowBidError = false
    },
  },
  mounted() {
    this.loadAuction()
  },
  methods: {
    ...mapActions({
      removeItemsFromWatchlist: 'watchlist/removeItemsFromWatchlist',
      getAuctionDetails: 'auction/getAuctionDetails',
    }),
    ...mapMutations({
      updateBidPrice: 'auction/updateActiveAuctionPrice',
      updateAuction: 'auction/updateActiveAuction',
    }),
    // Load auction details
    loadAuction() {
      this.loading = true
      const { id: auctionId } = this.$route.params
      this.getAuctionDetails(auctionId)
    },
    // Click place bid button
    placeBid(type) {
      this.$bvModal.hide('placebid-modal')
      if (this.placeBidPrice * 100 <= this.activeAuction.highest_bid || this.placeBidPrice * 100 <= this.activeAuction.start_bid_price) {
        this.showLowBidError = true
      } else {
        this.modalData = {
          title: this.$t('auctions.frontpage.place_bid_modal_content'),
          price: this.placeBidPrice * 100,
        }
        if (type === 'sheet') {
          this.$refs.placeBidModalSheet.open()
        } else {
          this.$bvModal.show('quick-bid-modal')
        }
      }
    },
    // Go to bid checkout page
    onPlaceBidConfirmed() {
      if (this.$refs.placeBidModalSheet) {
        this.$refs.placeBidModalSheet.close()
      }
      this.updateBidPrice(this.modalData.price)
      this.$router.push('/checkout/auction')
    },
    // Click quick bid button
    placeQuickBid(price, type) {
      this.modalData = {
        title: this.$t('auctions.frontpage.place_quick_bid_modal_content'),
        price,
      }
      if (type === 'sheet') {
        this.$refs.quickBidModalSheet.open()
      } else {
        this.$bvModal.show('quick-bid-modal')
      }
    },
    // Click autobid button
    placeAutoBid() {
      this.$bvModal.hide('autobid-prepare-modal')
      this.$bvModal.show('auto-bid-enable-modal')
    },
    // Similar auctions
    loadSimilarAuctions() {
      this.$axios.get('/auctions/public', {
        params: {
          status: 'live',
          take: 8,
          type: this.activeAuction.type,
        }
      })
        .then(res => {
          this.similarAuctions = res.data.data
        })
        .catch(err => {
          this.$toasted.error(err)
        })
    },
    // Update auto bid settings
    onEnableAutoBid() {
      this.$bvModal.hide('auto-bid-enable-modal')
      if (this.$refs.autoBidModalSheet) {
        this.$refs.autoBidModalSheet.close()
      }
      if (this.activeAuction.auto_bid_settings[0] && this.activeAuction.auto_bid_settings[0].id) {
        this.$axios.post('/auctions/auto-bid', {
          ...this.activeAuction.auto_bid_settings[0],
          price: this.autoBidPrice * 100,
          is_disabled: false,
        })
        .then(() => {
          this.autoBidPrice = null
          this.loadAuction()
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
      } else {
        this.updateAuction({
          auto_bid_settings: [{
            id: null,
            price: this.autoBidPrice * 100,
            auction_id: this.activeAuction.id,
            user_id: this.$auth.user.id,
            is_disabled: false,
          }]
        })
        this.updateBidPrice(this.autoBidPrice * 100)
        this.$router.push('/checkout/auction')
        this.autoBidPrice = null
      }
    },
    // Enable/disable autobid setting
    onUpdateAutoBidSetting(value) {
      this.$axios.post('/auctions/auto-bid', {
        ...this.activeAuction.auto_bid_settings[0],
        is_disabled: value,
      })
      .then((res) => {
        this.autoBidDisabled = value
        this.$toasted.info(value ? this.$t('auctions.frontpage.auto_bid_setting_disabled') : this.$t('auctions.frontpage.auto_bid_setting_enabled'))
        this.updateAuction({
          auto_bid_settings: [res.data],
        })
      })
      .catch((error) => {
        this.$toasted.error(error)
      })
    },
    moveBack() {
      this.currentItemIdx--
    },
    moveForward() {
      this.currentItemIdx++
    },
    // Add auction to Watchlist
    addToWatchlist() {
      this.addItemToWatchlist(this.activeAuction.id)
    },

    onWatchlisted(watchlist) {
      if (watchlist) {
        this.watchlistShow = false
        this.watchlist = watchlist
      }
    },
    removeFromWatchList() {
      if (this.watchlist) {
        this.removeItemsFromWatchlist({
          watchlist: this.watchlist,
          ids: [this.activeAuction.id],
          type: WATCHLIST_TYPE_AUCTION,
        })
        this.watchlist = null
      }
    },
    getAuctionName(auction) {
      if (auction) {
        if (auction.type === AUCTION_TYPE_COLLECTION) {
          return auction.name
        }
        if (auction.auction_items && auction.auction_items.length > 0) {
          return auction.auction_items[0].inventory.product.name
        }
      }
      return ''
    },
    showAllAuctions() {
      this.$router.push('/auction')
    },
    onSlideChanged(activeIdx) {
      this.currentItemIdx = activeIdx
    },
    openAutoBidSheet() {
      this.$bvModal.hide('autobid-prepare-modal')
      this.$refs.autoBidModalSheet.open()
    },
    closeQuickBidSheet() {
      this.$refs.quickBidModalSheet.close()
    },
    prepareAutoBid() {
      this.$bvModal.show('autobid-prepare-modal')
    },
    toggleItemFromWatchlist() {
      if (this.watchlist) {
        this.removeItemsFromWatchlist({
          watchlist: this.watchlist,
          ids: [this.activeAuction.id],
          type: WATCHLIST_TYPE_AUCTION,
        })
        this.watchlist = null
      } else {
        this.watchlistSheetVisible = true
      }
    },
    formatTime(time) {
      return dayjs(time).format('h:mm A')
    },
    openQuickBidDescSheet() {
      this.$refs.quickBidDescSheet.open()
    },
    openAutoBidDescSheet() {
      this.$refs.autoBidDescSheet.open()
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'

.text-color-gray
  color: $color-gray-5
  font-weight: $medium
.bg-dark-blue
  background-color: $color-blue-20

.auction-details-page
  padding: 11px 40px
  .thumb-wrapper::v-deep
    background: transparent
    img
      max-height: 540px
      object-fit: contain
  .product-info-box
    background: transparent
    &-title
      @include body-1-medium
    &-value
      @include body-4
      font-weight: $regular
  .auctioner-rating
    font-family: $font-sp-pro
    font-weight: $normal
    @include body-11
    color: $black
    span
      color: $color-gray-5
  .stats
    margin-bottom: 27px
    .stat-name,
    .stat-value
      font-weight: $medium
      @include body-8
      color: $color-gray-5
      &.fontweight-normal
        font-weight: $normal
    .stat-divider
      width: 1px
      height: 18px
      background: $black
  .bid-details
    background: transparent
    border: 0
    &-price
      font-weight: $medium
      @include body-8
      &-value
        @include heading-2
        font-weight: $medium
        line-height: 34px
        color: $color-black-10
        margin: 7px 0 6px
      &-estimate
        font-weight: $normal
        @include body-10
        letter-spacing: -0.02em
        color: $color-gray-5
  .quick-bid
    margin-top: 28px
    &-title
      font-weight: $normal
      @include body-8
      color: $black
      margin-bottom: 10px
      img
        width: 14px
        height: 14px
    &-content
      margin: 0 -8px
    &-btn
      @include body-4-medium
      color: $white
      margin: 0 8px
      background: $color-blue-20
      border-color: $color-blue-20
      box-shadow: 0px 1px 4px rgba($black, 0.25)
      border-radius: 4px
      flex: 1
  .place-bid-form
    margin-top: 21px
    input
      padding: 10px 18px
      border: 1px solid $black
      border-radius: 4px
      font-weight: $medium
      height: 40px
      flex: 1
    .place-bid-btn
      font-weight: $medium
      border-radius: 4px
      @include body-8
      color: $white
      border: none
      background: $black
      width: 140px
      height: 40px
      &.auto-bid
        background: $color-blue-20
  .auth-guaranteed
    margin: 25px 0 16px
    img
      width: 36px
      height: 36px
    &-text,
    &-label
      @include body-9
      font-weight: $regular
      line-height: 18px
      color: $black
    &-label
      @include body-6
    &-divider
      width: 1px
      min-height: 88px
      height: 100%
      background: $color-gray-16f
  .similar-auctions::v-deep
    .auctions-block-header
      border-bottom: 0.5px solid $color-gray-23
      padding-bottom: 14px
      .new-releases-heading
        font-family: $font-sp-pro
        font-weight: $bold
        letter-spacing: 0
    .auctions-block
      margin-bottom: 30px
    .auctions-block-list
      margin-top: 30px
    .view-more-products-text
      display: none
  .product-details-tabs::v-deep
    ul
      border-bottom: 0.5px solid $color-gray-23
      padding: 0 30px 17px
    .nav-link
      font-family: $font-sp-pro
      font-weight: $bold
      letter-spacing: 0.01em
    .tab-content > div
      padding-left: 50px
    .field-name
      font-family: $font-sp-pro
      font-weight: $normal
      @include body-24
      color: $black
    .field-value
      font-family: $font-sp-pro
      font-weight: $normal
      @include body-24
      color: $color-gray-5
  .auction-details
    &-title
      border-bottom: 0.5px solid $color-gray-23
      padding: 14px 30px
      font-family: $font-sp-pro
      font-weight: $bold
      letter-spacing: 0
      @include body-2
      color: $black
    &-content
      padding: 0 50px 30px
      &-label
        font-family: $font-sp-pro
        font-weight: $normal
        @include body-24
        color: $black
      &-text
        font-family: $font-sp-pro
        font-weight: $normal
        @include body-24
        color: $color-gray-5
  .collection-items-slider
    .title
      @include body-8
      font-weight: $normal
      letter-spacing: 0.01em
      color: $black
      padding: 0
      margin-right: 10px
    .count
      @include body-8
      font-weight: $normal
      color: $color-gray-5
  @media (max-width: 576px)
    padding: 18px 16px 0
    .thumb-wrapper::v-deep
      width: 264px
      margin: auto
      margin-top: 4px
      margin-bottom: 9px
    .product-info-box
      background: transparent
      border-bottom: none
      &-title
        @include body-3-medium
        padding: 0
        border: none
      &-value
        @include body-21
        font-weight: $regular
        padding: 0
        margin-top: 5px
    .quick-bid
      margin-top: 35px
      &-title
        @include body-5
        font-weight: $normal
        color: $color-gray-5
      &-content
        margin: 0 -8px
      &-btn
        @include body-4-medium
        color: $white
        margin: 0 8px
        background: $color-blue-20
        box-shadow: 0px 1px 4px rgba($black, 0.25)
        border-radius: 4px
      &-autobid
        @include body-5
        border: 1px solid $black
        margin: 0 22px
        box-shadow: 0px 1px 2px rgba($black, 0.25)
        background: transparent
        color: $black
        font-weight: $normal
        color: $color-blue-19
        height: 36px
        background: $white
        border-radius: 0
    .auction-details
      &-title
        @include body-4-medium
        padding: 0
        border: none
        font-family: $font-montserrat
      &-content
        padding: 0
        @include body-5
        font-weight: $normal
        color: $color-gray-5
        margin: 15px 0
    .product-details
      @include body-5
      font-family: $font-family-sf-pro-display
      font-weight: $medium
      color: $color-gray-5
      &-label
        @include body-11
        color: $black
      &-value
        font-weight: $normal
        width: 60%
    .overall-fit
      img
        width: 30px
        height: 30px
      span
        @include body-21
        font-family: $font-family-sf-pro-display
        font-weight: $normal
        letter-spacing: -0.02em
        color: $black
        margin-left: 8px
    .auth-guaranteed
      margin: 30px 0
      &-divider
        margin: 0 14px
    .size-table
      flex-direction: column
      .size-sticky-col
        display: flex
        width: 100%
      &-content
        width: 100%
        overflow: hidden
      &-row
        flex: 1
        .size-table-cell
          flex: none
          &:nth-child(even)
            background: #F4F4F4
      &-cell
        @include body-21
        font-family: $font-family-sf-pro-display
        letter-spacing: -0.02em
        flex: 1
        height: 30px
        min-width: unset
    .bidding-history-table
      width: 100%
      font-family: $font-family-sf-pro-display
      th
        @include body-5
        font-weight: $medium
        letter-spacing: -0.02em
        color: $black
      .value
        @include body-5
        font-weight: $normal
        color: $color-gray-47
      .seconds
        @include body-21
        font-weight: $normal
        letter-spacing: -0.02em
        color: $color-gray-47

    .similar-auctions::v-deep
        .auctions-block
          padding: 0
          .col-12
            padding: 0
            border: none
          .new-releases-heading
            font-family: $font-montserrat
            @include body-5
            font-weight: $medium
            color: $black
    .place-bid-section
      position: fixed
      bottom: 95px
      width: 100%
      left: 0
      padding: 16px
      background: $white
      z-index: 999
      .current-bid-label
        @include body-21
        font-weight: $normal
        color: $color-gray-5
      .current-bid-price
        @include body-1
        font-weight: $medium
        color: $color-blue-20
      .place-bid-btn
        font-family: $font-montserrat
        font-weight: $medium
        @include body-21
        color: $white
        background: $color-black-5
        border-radius: 25px
        width: 201px
        height: 40px
        padding: 10px 12px 14px
    .collection-items-slider
      .title
        @include body-21
        font-weight: $regular
        color: $black
        margin-right: 10px
      .count
        @include body-21
        font-weight: $regular
        color: $light-gray-3
    .quick-bid-sheet
      padding: 0 10px 20px
      h5
        @include body-17
        font-family: $font-family-sf-pro-display
        font-weight: $medium
        letter-spacing: -0.02em
        margin-bottom: 12px
      .time-remaining
        @include body-5
        font-family: $font-family-sf-pro-display
        font-weight: $normal
        color: $color-gray-25
      .btn
        @include body-5
        font-weight: $medium
        padding: 10px 0px
        font-family: $font-sf-pro-text
        &.btn-outline-dark
          color: $black
          border-color: $black
.expired-status,
.scheduled-status,
.sold-status
  background: $color-yellow-10
  box-shadow: 0px 1px 4px rgba($black, 0.25)
  padding: 15px 0
  span
    font-weight: $normal
    font-family: $font-sp-pro
    @include body-5
    color: $black
    &.time
      @include body-2
      color: $color-gray-5
    &.date
      @include body-2
      color: $black
.scheduled-status
  background: $color-blue-33
.sold-status
  background: $color-green-32
.recent-bidding-history
  min-height: 300px
  &-title
    font-weight: $medium
    @include body-2
    color: $black
    font-family: $font-sp-pro
  table
    tbody
      tr
        border-top: thin solid $light-gray-2
    th
      font-weight: $bold
      font-family: $font-sp-pro
      @include body-8
      color: $black
      padding: 12px
    td
      padding: 15px
      font-weight: $normal
      @include body-5
      color: $color-gray-5
      span
        color: $color-gray-4
      strong
        color: $black
        font-weight: $normal
        display: block
      margin-bottom: 4px
.quick-bid-desc-sheet
  img
    margin-top: 2px
.w-65
  width: 65px
.text-dark-blue
  color: $color-blue-20
.bg-dark-blue
  background-color: $color-blue-20
.bottom-sheet::v-deep
  .bottom-sheet__content
    overflow: hidden
.bid-modal
  &-title
    font-family: $font-sp-pro
    @include body-2
    font-weight: $medium
    max-width: 300px
  &-time
    @include body-8
    font-weight: $medium
  .confirm-btn
    height: 50px
    @include body-8
    font-weight: $normal
    min-width: 160px
    width: auto
  .cancel-btn
    width: 160px
    color: $black
    border-color: $black
    @include body-8
    font-weight: $medium
    height: 50px
    &:hover
      color: $white
.placed-bid-desc
  font-family: $font-sp-pro
  font-weight: $regular
  @include body-21
</style>
