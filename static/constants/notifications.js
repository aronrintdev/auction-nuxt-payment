export const NOTIFICATION_MIN_YEAR_RANGE_WINDOW = 1
export const NOTIFICATION_MIN_YEAR = 2000
export const NOTIFICATION_MAX_YEAR = 2099
export const NOTIFICATION_PER_PAGE = 10
export const NOTIFICATION_CHANNEL_APP = 'app'
export const NOTIFICATION_CHANNEL_EMAIL = 'email'
export const NOTIFICATION_CHANNEL_TEXT = 'text'
export const ORDER_STATUS_KEYS = [
    'pending',
    'processing',
    'send_to_ds',
    'arrived_to_ds',
    'authenticated_and_shipped',
    'delivered',
    'cancelled',
]
export const WISHLIST_STATUS_KEYS = [
    'in_stock',
    'out_of_stock',
    'price_change',
]
// TODO maybe move to backend
export const ALL_SETTINGS = {
    communication: {
        all: {
            key: 'all_communications',
            label: 'Deadstock Communication',
            desc: 'Keep up with the latest news, releases, and promotions'
        }
    },
    buying: {
        shop: {
            shipping: {
                key: 'buying_shipping_status',
                label: 'Shipping',
                desc: 'Get a notification with the shipping status of your purchased order',
                data: {
                    when: {
                        value: [...ORDER_STATUS_KEYS],
                        type: 'order'
                    },

                }
            },
            wishlist: {
                key: 'buying_wishlist',
                label: 'Wishlist',
                desc: 'Get a notification when your wishlist item is back in stock or sold out ',
                data: {
                    when: {
                        value: [...WISHLIST_STATUS_KEYS],
                        type: 'wishlist'
                    },
                }
            },
        },
        trade: {
            new_offer: {
                key: 'buying_new_offer',
                label: 'New Trade Offers',
                desc: 'Get a notification each time a new offer has been received',
                data: {
                    until: {
                        value: 65,
                        type: 'slider'
                    },
                }
            },
            trade_expire: {
                key: 'buying_trade_expire',
                label: 'Trade Expiring Soon',
                desc: 'Get a notification each time a trade that you have placed an offer on is close to expiring ',
                data: {
                    every: {
                        value: 1,
                        type: 'hour'
                    },
                }
            },
            watchlist_trade_expire: {
                key: 'buying_watchlist_trade_expire',
                label: 'Trade Watchlist Item Expiring Soon',
                desc: 'Get a notification when an item from your watchlist is close to expiring',
                data: {
                    every: {
                        value: 1,
                        type: 'hour'
                    }
                }
            },
        },
        auction: {
            highest_bid: {
                key: 'buying_highest_bid',
                label: 'New Highest Bid',
                desc: 'Get a notification each time a new highest bid is placed',
                data: {
                    every: {
                        value: 1,
                        type: 'bid'
                    }
                }
            },
            auction_expire: {
                key: 'buying_auction_expire',
                label: 'Auction Expiring Soon',
                desc: 'Get a notification each time an auction that you have placed a bid on is close to expiring ',
                data: {
                    every: {
                        value: 1,
                        type: 'hour'
                    }
                }
            },
            auction_watchlist_expire: {
                key: 'buying_auction_watchlist_expire',
                label: 'Auction Watchlist Item Expiring Soon',
                desc: 'Get a notification when an item from your watchlist is close to expiring',
                data: {
                    every: {
                        value: 1,
                        type: 'hour'
                    }
                }
            }
        }
    },
    selling: {
        shop: {
            new_offer: {
                key: 'selling_new_offer',
                label: 'Offer',
                desc: 'Get a notification when a new offer has been placed on your listing',
                desc_next: 'Will not be sent a notifications until ___ percent of your asking price is reached',
                data: {
                    every: {
                        value: 1,
                        type: 'offer'
                    },
                    until: {
                        value: 65,
                        type: 'slider'
                    }
                }
            },
            match_expire: {
                key: 'selling_match_expire',
                label: 'Ask Matches Expired Offer',
                desc: 'Get a notification if a seller lists a new Ask that matches one of your expired Offer',
                data: {
                    every: {
                        value: 1,
                        type: 'offer'
                    }
                }
            },
            nearby_match: {
                key: 'selling_nearby_match',
                label: 'Buyer Nearby Match',
                desc: 'Get a notification if a seller lists an Ask at  the same price, or lower, within 1/2 size of your existing Offer',
                data: {
                    every: {
                        value: 1,
                        type: 'offer'
                    }
                }
            }
        },
        trade: {
            trade_offer: {
                key: 'selling_trade_offer',
                label: 'Placed Trade Offers',
                desc: 'Get a notification when a new offer has been placed on your trade listing ',
                desc_next: 'Will not be sent a notification unless ___ % of your Offer has been reached.',
                data: {
                    every: {
                        value: 1,
                        type: 'offer'
                    },
                    until: {
                        value: 65,
                        type: 'slider'
                    }
                }
            },
            listing_expire: {
                key: 'selling_listing_expire',
                label: 'Trade Listing Expiring Soon',
                desc: 'Get a notification when your trade listing is expiring soon',
                data: {
                    every: {
                        value: 1,
                        type: 'hour'
                    }
                }
            },
        },
        auction: {
            new_bids: {
                key: 'selling_new_bids',
                label: 'Placed Bids',
                desc: 'Get a notification when you receive a new bid placed on your auction listing',
                desc_next: 'Will not be sent a notification unless ___ % of your Reserve Price has been reached.',
                data: {
                    every: {
                        value: 1,
                        type: 'bid'
                    },
                    until: {
                        value: 65,
                        type: 'slider'
                    }
                }
            },
            auction_listing_expire: {
                key: 'selling_auction_listing_expire',
                label: 'Auction Listings Expiring Soon',
                desc: 'Get a notification when your Auction listing is expiring soon',
                data: {
                    every: {
                        value: 1,
                        type: 'hour'
                    }
                }
            }
        },
    }
}
