export function addTrade(state, trade) {
    state.exploreTrade = trade
}
export function addYourInventory(state, inventory) {
    state.yourInventory = inventory
}

/**
 * This mutation is used to set size types in state to be reused
 * @param state
 * @param sizeType
 */
export function setSizeTypeFilters(state, sizeType) {
    state.sizeTypeOptions = sizeType
}

/**
 * This mutation is used to set sizes in state to be reused
 * @param state
 * @param sizes
 */
export function setSizeFilters(state, sizes) {
    state.sizeOptions = sizes
}

/**
 * This mutation is used to set price range in state to be reused
 * @param state
 * @param priceRange
 */
export function setPriceRangeFilters(state, priceRange) {
    state.priceRangeOptions = priceRange
}

/**
 * This mutation is used to set categories for trades filtering
 * @param state
 * @param selectedCategory
 */
export function setCategoryFilterSelection(state, selectedCategory) {
    if (typeof selectedCategory !== 'undefined' && selectedCategory) {

        // check if category is already in selected list
        const index = state.selectedFilters.categories.findIndex(category => category === selectedCategory)

        // remove selected category if it is already selected
        if (index > -1) {
            state.selectedFilters.categories.splice(index, 1)
        } else {
            // push category in selected list
            state.selectedFilters.categories.push(selectedCategory)
        }
    }
}

/**
 * This mutation is used to set size types for trades filtering
 * @param state
 * @param selectedSizeType
 */
export function setSizeTypeFilterSelection(state, selectedSizeType) {
    if (typeof selectedSizeType !== 'undefined' && selectedSizeType) {

        // check if size type is already in selected list
        const index = state.selectedFilters.sizeTypes.findIndex(sizeType => sizeType === selectedSizeType)

        // remove selected size type if it is already selected
        if (index > -1) {
            state.selectedFilters.sizeTypes.splice(index, 1)
        } else {
            // push size type in selected list
            state.selectedFilters.sizeTypes.push(selectedSizeType)
        }
    }
}

/**
 * This mutation is used to set sizes for trades filtering
 * @param state
 * @param key
 * @param selectedSize
 */
export function setSizeFilterSelection(state, key, selectedSize) {
    if (typeof selectedSize !== 'undefined' && selectedSize &&
        typeof key !== 'undefined' && key) {

        // check if size is already in selected list
        const index = state.selectedFilters.sizes[key].findIndex(size => size === selectedSize)

        // remove selected size if it is already selected
        if (index > -1) {
            state.selectedFilters.sizes[key].splice(index, 1)
        } else {
            // push size in selected list
            state.selectedFilters.sizes[key].push(selectedSize)
        }
    }
}

/**
 * This mutation is used to set price range for trades filtering
 * @param state
 * @param priceRange
 */
export function setPriceRangeFilterSelection(state, priceRange) {
    if (typeof priceRange !== 'undefined' && priceRange) {
        state.selectedFilters.priceRange[0] = (priceRange.min !== undefined) ? priceRange.min : 0
        state.selectedFilters.priceRange[1] = (priceRange.max !== undefined) ? priceRange.max : 0
    }
}

/**
 * This mutation is used to set searched text for trades filtering
 * @param state
 * @param searchedText
 */
export function setSearchedText(state, searchedText) {
    state.selectedFilters.searchedText = (typeof searchedText !== 'undefined' && searchedText) ? searchedText : ''
}

/**
 * This mutation is used to set sorting type for trade filtering
 * @param state
 * @param sortOrder
 */
export function setSortOrder(state, sortOrder) {
    state.selectedFilters.sortOrder = (typeof sortOrder !== 'undefined' && sortOrder) ? sortOrder : ''
}

/**
 * This mutation is used to set total items in a trade for filtering (one/two/three items)
 * @param state
 * @param totalTradeItems
 */
export function setTotalItemTrades(state, totalTradeItems) {
    state.selectedFilters.totalTradeItems = totalTradeItems
}

/**
 * This mutation is used to set trade type (ending soon, recently viewed etc)
 * @param state
 * @param tradeType
 */
export function setTradeType(state, tradeType) {
    state.selectedFilters.tradeType = tradeType
}

/**
 * This mutation is used to reset all filters on trade browse page
 * @param state
 */
export function resetAllFilters(state) {
    state.selectedFilters.sizes = []
    state.selectedFilters.sizeTypes = []
    state.selectedFilters.categories = []
    state.selectedFilters.priceRange = [0, 100]
    state.selectedFilters.searchedText = ''
    state.selectedFilters.sortOrder = 'relevance'
    state.selectedFilters.totalTradeItems = 'one'
}

/**
 * This mutation is used to add your trade items in state
 * @param state
 * @param val
 */
export function setYourTradeItems(state, val) {
    if (typeof val.quantity === 'undefined') {
        val.quantity = 1
    }
    state.yourTradeItems.push(val)
}

/**
 * This mutation is used to increment your tade item quantity in state
 * @param state
 * @param val
 */
export function incrementYourTradeItemQuantity(state, val) {
    const index = state.yourTradeItems.findIndex(item => item.id === val.id)
    state.yourTradeItems[index].quantity++
}

/**
 * This mutation is used to decrement your trade item quantity in state
 * @param state
 * @param id
 */
export function decrementYourTradeItemQuantity(state, id) {
    const index = state.yourTradeItems.findIndex(item => item.id === id)
    state.yourTradeItems[index].quantity--
}

/**
 * This mutation is used to remove your trade item from state by matching id
 * @param state
 * @param val
 */
export function removeYourTradeItem(state, val) {
    const index = state.yourTradeItems.findIndex(prod => prod.id === val)
    if (index > -1) {
        state.yourTradeItems.splice(index, 1)
    }
}

/**
 * This mutation is used to set best matches for vendor
 * @param state
 * @param bestMatches
 */
export function setBestMatches(state, bestMatches) {
    state.bestMatches = bestMatches
}

/**
 * This mutation is used to set interested listings for vendor
 * @param state
 * @param interestedListings
 */
export function setInterestedListings(state, interestedListings) {
    state.interestedListings = interestedListings
}

/**
 * This mutation is used to set active trade in state
 * @param state
 * @param val
 */
export function setActiveTrade(state, val) {
  state.activeTrade = val
}

/**
 * This mutation is used to update active trade in state
 * @param state
 * @param updatedValues
 */
export function updateActiveTrade(state, updatedValues) {
  state.activeTrade = {
    ...state.activeTrade,
    ...updatedValues
  }
}

/**
 * This mutation is used to set submitted offer in state
 * @param state
 * @param val
 */
export function setSubmittedOffer(state, val) {
  state.submittedOffer = val
}

export function setCombinationsId(state, val) {
  state.combinations = val
}
