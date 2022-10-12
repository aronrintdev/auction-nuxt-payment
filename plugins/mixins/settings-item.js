import _ from 'lodash'

export default {
  data() {
    return {
      channels: Object.keys(this.$t('notifications.settings.channels')).map(key => {
        return {
          text: this.$t(`notifications.settings.channels.${key}`),
          value: key,
        }
      }),
      types: Object.keys(this.$t('notifications.types')).map(key => {
        return {
          text: this.$t(`notifications.types.${key}`),
          value: key,
        }
      }),
      order_statuses: Object.keys(this.$t('notifications.settings.order_statuses')).map(key => {
        return {
          text: this.$t(`notifications.settings.order_statuses.${key}`),
          value: key,
        }
      }),
      wishlist_statuses: Object.keys(this.$t('notifications.settings.wishlist_statuses')).map(key => {
        return {
          text: this.$t(`notifications.settings.wishlist_statuses.${key}`),
          value: key,
        }
      }),
    }
  },
  methods: {
    addChangedItem(item) {
      this.$store.commit('notifications/addOrChangeChangedSetting', item)
    },
    /**
     * Checking if the field exists in the item.
     * @param item
     * @param field
     * @return {boolean}
     */
    fieldExist(item, field) {
      return !!_.get(item, field, false);
    },
    isWhenOptionsActive(settings) {
      return this.fieldExist(settings.data, 'when') && ['order', 'wishlist'].includes(settings.data.when.type)
    },
    whenOptions(settings) {
      return settings.when.type === 'order' ? this.order_statuses : this.wishlist_statuses
    },
  },
}
