export default function() {
    return {
        exploreTrade: null,
        yourInventory: null,
        sizeOptions: [],
        sizeTypeOptions: [],
        priceRangeOptions: [0, 100],
        selectedFilters: {
            'priceRange': [0, 100],
            'sizes': [],
            'sizeTypes': [],
            'categories': [],
            'searchedText': '',
            'sortOrder': 'relevance',
            'totalTradeItems': 'one',
            'tradeType': 'All'
        },
        yourTradeItems: [],
        interestedListings: [],
        bestMatches: [],
        activeTrade: [],
        submittedOffer: null,
        combinations:[],
        updateCombinations:[],
    }
}
