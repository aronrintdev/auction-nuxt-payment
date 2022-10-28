export const AuctionThresholdsData = [
  {
    'current_bid': '$0.01-$0.99',
    'bid_increment': '$0.05',
  },
  {
    'current_bid': '$1.00-$4.99',
    'bid_increment': '$0.25',
  },
  {
    'current_bid': '$5.00-$24.99',
    'bid_increment': '$0.50',
  },
  {
    'current_bid': '$25.00-$99.99',
    'bid_increment': '$1.00',
  },
  {
    'current_bid': '$100.00-$249.99',
    'bid_increment': '$2.50',
  },
  {
    'current_bid': '$250.00-$449.99',
    'bid_increment': '$5.00',
  },
  {
    'current_bid': '$500.00-$999.99',
    'bid_increment': '$10.00',
  },
  {
    'current_bid': '$1000.00-$2499.99',
    'bid_increment': '$25.00',
  },
  {
    'current_bid': '$2500.00-$4999.99',
    'bid_increment': '$50.00',
  },
  {
    'current_bid': '$5000.00 and up',
    'bid_increment': '$100.00',
  },
];

export const AuctionSizes = [
  {
    type: 'US-M',
    items: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '']
  },
  {
    type: 'US-W',
    items: ['3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10']
  },
  {
    type: 'US-Kids',
    items: ['4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y', '7Y', '7.5Y', '8Y', '8.5Y', '9Y', '9.5Y', '10Y', '', '']
  },
  {
    type: 'UK',
    items: ['3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10']
  },
  {
    type: 'CM',
    items: ['23', '23.5', '24', '24.5', '25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5']
  },
  {
    type: 'EU',
    items: ['36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42', '42.5', '43']
  },
];

export const MIN_BID_PRICE = 50;
export const RESERVE_PRICE_FEE = 0.0799;
export const SELLER_FEE = 9.5;
export const TRANSACTION_FEE = 2.9;
export const AUCTIONS_PER_PAGE_OPTIONS = [4, 8, 16, 32, 48];
export const DEFAULT_PER_PAGE_OPTION = 4;
export const LARGE_PRODUCT_IMG_WIDTH = 800;
export const THUMB_PRODUCT_IMG_WIDTH = 300;
export const DEADSTOCK_PRODUCT_FALLBACK_IMAGE = 'https://images.deadstock.co/404.png';
export const DELISTED_STATUS = 'delisted'
export const EXPIRED_STATUS = 'expired'
export const MAX_COLLECTION_AUCTION_ITEMS = 10;
