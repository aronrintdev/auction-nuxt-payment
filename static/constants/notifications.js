export const NOTIFICATION_MIN_YEAR_RANGE_WINDOW = 1
export const NOTIFICATION_MIN_YEAR = 2000
export const NOTIFICATION_MAX_YEAR = 2099

// TODO change it when types decided
export const NOTIFICATION_TYPES = {
    order : {
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
        live:{
            title: 'Expired',
            icon: 'notification-close.svg'
        },
        draft:{
            title: 'Expired',
            icon: 'notification-close.svg'
        },
        expired:{
            title: 'Expired',
            icon: 'notification-calendar.svg'
        },
        completed:{
            title: 'Expired',
            icon: 'notification-close.svg'
        }
    },
    offer: {
        pending:{
            title: 'Pending',
            icon: 'notification-calendar.svg'
        },
        accepted:{
            title: 'Accepted',
            icon: 'notification-trade.svg'
        },
        declined:{
            title: 'Declined',
            icon: 'notification-close.svg'
        }
    }
}