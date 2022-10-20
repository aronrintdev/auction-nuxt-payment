export const PENDING_OFFER = 'pending';
export const ACCEPTED_OFFER = 'accepted';
export const DECLINED_OFFER = 'declined';
export const AWAITING_RESPONSE = 'awaiting response';

export const DEFAULT = 'default';
export const NO_DATE_SELECTED = 'No date selected'
export const DELETE = 'delete'

export const START_DATE = 'Start Date'
export const END_DATE = 'End Date'
export const Years = {
  2022:'2022',
  2021:'2021',
  2020:'2020',
  2019:'2019',
  2018:'2018',
  2017:'2017',
  2016:'2016',
  2015:'2015',
  2014:'2014',
  2013:'2013',
  2012:'2012',
  2011:'2011',
  2010:'2010',
  2009:'2009',
  2008:'2008',
  2007:'2007',
  2006:'2006',
  2005:'2005',
  2004:'2004',
  2003:'2003',
  2002:'2002',
  2001:'2001',
  200:'2000',
}

export const  CHART_FILTER_TABS = [
  {
    label: this.$t('deadstock_exchange.detail.24h'),
    value: '24',
  },
  {
    label: this.$t('deadstock_exchange.detail.7d'),
    value: '7',
  },
  {
    label: this.$t('deadstock_exchange.detail.30d'),
    value: '30',
  },
  {
    label: this.$t('deadstock_exchange.detail.6m'),
    value: '6',
  },
  {
    label: this.$t('deadstock_exchange.detail.1y'),
    value: '1',
  },
  {
    label: this.$t('deadstock_exchange.detail.all'),
    value: 'all',
  },
]
export const PRICE_SIZE_TABS= [
  {
    label: this.$t('deadstock_exchange.detail.avg_price'),
    value: 'average_price',
  },
  {
    label: this.$t('deadstock_exchange.detail.size_specific'),
    value: 'size_specific',
  }
]
export const SIMILAR_FILTER_SORT_OPTIONS = [
  {
    label: this.$t('vendor_purchase.sort_by'),
    value: 'default',
  },
  {
    label: this.$t('deadstock_exchange.sort_by.highest_change'),
    value: 'highestChange',
  },
  {
    label: this.$t('deadstock_exchange.sort_by.lowest_change'),
    value: 'lowestChange',
  },
  {
    label: this.$t('deadstock_exchange.sort_by.release_date_asc'),
    value: 'releaseDateAsc',
  },
  {
    label: this.$t('deadstock_exchange.sort_by.last_price_lh'),
    value: 'lastPriceLh',
  },
  {
    label: this.$t('deadstock_exchange.sort_by.last_price_hl'),
    value: 'lastPriceHl',
  },
]
