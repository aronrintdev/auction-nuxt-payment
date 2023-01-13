export const PENDING = 'pending' || 'PENDING';
export const PROCESSING = 'processing' || 'PROCESSING';
export const AWAITING_SHIPMENT_TO_DEADSTOCK = 'awaiting_shipment_to_ds';
export const ARRIVED_TO_DEADSTOCK = 'arrived_to_ds' || 'ARRIVED_AT_DS';
export const SEND_TO_DEADSTOCK = 'send_to_ds' || 'SEND_TO_DS';
export const PROCESSING_PAYMENT = 'processing_payment' || 'PROCESSING_PAYMENT';
export const AUTHENTICATED_AND_SHIPPED = 'authenticated_and_shipped' || 'AUTHENTICATED_AND_SHIPPED';
export const DELIVERED = 'delivered' || 'DELIVERED';
export const CANCELLED = 'cancelled' || 'CANCELLED';
export const COMPLETED = 'completed' || 'COMPLETED';
export const SHIPPED_AND_AUTH = 'shipped_and_auth' || 'SHIPPED_AND_AUTH';
export const MULTIPLE = 'multiple' || 'MULTIPLE';

export const IMAGE_COUNT = 3;
export const IMAGE_BLUR = 2;
export const CARD_STATUS = ['credit_card', 'CC', 'card']


export const BUYER_ORDER_STATUSES = [
  {
    id: 1,
    text: 'vendor_purchase.products',
    value: '',
    type: 'products',
  },
  {
    id: 3,
    text: 'vendor_purchase.orderstatus.processing',
    value: 'processing,awaiting_shipment_to_ds',
    type: 'products',
  },
  {
    id: 4,
    text: 'vendor_purchase.orderstatus.pending',
    value: 'pending',
    type: 'products',
  },
  {
    id: 5,
    text: 'vendor_purchase.orderstatus.sent_to_deadstock',
    value: 'shipped_to_ds',
    type: 'products',
  },
  {
    id: 6,
    text: 'vendor_purchase.orderstatus.received_at_deadstock',
    value: 'arrived_at_ds,auth_issue,awaiting_auth',
    type: 'products',
  },
  {
    id: 7,
    text: 'vendor_purchase.orderstatus.authentication_failed',
    value: 'auth_failed',
    type: 'products',
  },
  {
    id: 8,
    text: 'vendor_purchase.orderstatus.cancelled',
    value: 'cancel,failed,refunded,voided',
    type: 'products',
  },
  {
    id: 9,
    text: 'vendor_purchase.orderstatus.authenticated',
    value: 'auth_completed,awaiting_shipment_to_buyer',
    type: 'products',
  },
  {
    id: 10,
    text: 'vendor_purchase.orderstatus.authenticated_and_shipped',
    value: 'shipped_to_buyer',
    type: 'products',
  },
  {
    id: 11,
    text: 'vendor_purchase.orderstatus.delivered',
    value: 'delivered,completed',
    type: 'products',
  },
  {
    id: 12,
    text: 'vendor_purchase.orderstatus.declined',
    value: 'declined',
    type: 'products',
  },
  {
    id: 13,
    text: 'vendor_purchase.giftcard',
    value: '',
    type: 'giftcard',
  },
  {
    id: 14,
    text: 'vendor_purchase.purchased',
    value: 'complete_giftcard',
    type: 'giftcard',
  },
]

export const VENDOR_ORDER_STATUSES = [
  {
    id: 3,
    text: 'vendor_purchase.orderstatus.ship_to_deadstock_status',
    value: 'processing',
    type: 'products',
  },
  {
    id: 31,
    text: 'vendor_purchase.orderstatus.awaiting_drop_off_with_shipping_carrier',
    value: 'awaiting_shipment_to_ds',
    type: 'products',
  },
  {
    id: 4,
    text: 'vendor_purchase.orderstatus.pending',
    value: 'pending',
    type: 'products',
  },
  {
    id: 5,
    text: 'vendor_purchase.orderstatus.sent_to_deadstock',
    value: 'shipped_to_ds',
    type: 'products',
  },
  {
    id: 6,
    text: 'vendor_purchase.orderstatus.received_at_deadstock',
    value: 'arrived_at_ds,auth_issue,awaiting_auth',
    type: 'products',
  },
  {
    id: 7,
    text: 'vendor_purchase.orderstatus.authentication_failed',
    value: 'auth_failed',
    type: 'products',
  },
  {
    id: 8,
    text: 'vendor_purchase.orderstatus.cancelled',
    value: 'cancel,failed,refunded,voided',
    type: 'products',
  },
  {
    id: 9,
    text: 'vendor_purchase.orderstatus.authenticated',
    value: 'auth_completed',
    type: 'products',
  },
  {
    id: 10,
    text: 'vendor_purchase.orderstatus.commission_paid',
    value: 'awaiting_shipment_to_buyer,shipped_to_buyer,completed,delivered',
    type: 'products',
  },
  {
    id: 13,
    text: 'vendor_purchase.orderstatus.declined',
    value: 'declined',
    type: 'products',
  },
]
