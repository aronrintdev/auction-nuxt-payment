export const NOTIFICATION_MIN_YEAR_RANGE_WINDOW = 1
export const NOTIFICATION_MIN_YEAR = 2000
export const NOTIFICATION_MAX_YEAR = 2099

// TODO change it when types decided
export const NOTIFICATION_TYPES = {
    order: {
        PENDING: {
            title: 'Pending',
            icon: 'notification-close.svg'
        },
        PASSED: {
            title: 'Passed',
            icon: 'notification-close.svg'
        },
        CANNOT_VERIFY: {
            title: 'Cannot Verify',
            icon: 'notification-close.svg'
        },
        FAILED: {
            title: 'Failed',
            icon: 'notification-close.svg'
        },
        CONFIRMED: {
            title: 'Confirmed',
            icon: 'notification-check.svg'
        },
        PROCESSING: {
            title: 'Processing',
            icon: 'notification-close.svg'
        },
        DELIVERED: {
            title: 'Delivered',
            icon: 'notification-mail.svg'
        },
        SHIPPED: {
            title: 'Shipped',
            icon: 'notification-delivery.svg'
        },
        REFUND: {
            title: 'Refund',
            icon: 'notification-close.svg'
        },
    },
    auction: {
        deleted: {
            title: 'Deleted',
            icon: 'notification-close.svg'
        },
        completed: {
            title: 'Completed',
            icon: 'notification-close.svg'
        },
        scheduled: {
            title: 'Scheduled',
            icon: 'notification-close.svg'
        },
        delisted: {
            title: 'Delisted',
            icon: 'notification-hourglass.svg'
        },
        live: {
            title: 'Live',
            icon: 'notification-close.svg'
        },
        expired: {
            title: 'Expired',
            icon: 'notification-hourglass.svg'
        },
    },
    trade: {
        live: {
            title: 'Expired',
            icon: 'notification-close.svg'
        },
        draft: {
            title: 'Expired',
            icon: 'notification-close.svg'
        },
        expired: {
            title: 'Expired',
            icon: 'notification-calendar.svg'
        },
        completed: {
            title: 'Expired',
            icon: 'notification-close.svg'
        }
    },
    offer: {
        pending: {
            title: 'Pending',
            icon: 'notification-calendar.svg'
        },
        accepted: {
            title: 'Accepted',
            icon: 'notification-trade.svg'
        },
        declined: {
            title: 'Declined',
            icon: 'notification-close.svg'
        }
    }
}
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
                label: 'Shipping Status',
                desc: 'Get a notification with the shipping status of your purchased order',
                data: {
                    when: {
                        value: [],
                        type: 'order'
                    },

                }
            },
            wishlist: {
                key: 'buying_wishlist',
                label: 'Wishlist Status',
                desc: 'Get a notification when your wishlist item is back in stock or sold out ',
                data: {
                    when: {
                        value: [],
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