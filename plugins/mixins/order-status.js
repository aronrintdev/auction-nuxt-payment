import {mapGetters} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      'orderStatusesList': 'order-settings/getOrderStatuses'
    })
  },
  methods: {
    getLabelForStatus(status, role = 'buyer'){
      if (!this.orderStatusesList[role])
        return '-'
      if (!this.orderStatusesList[role][status])
        return '--'
      return this.orderStatusesList[role][status]
    }
  }
}
