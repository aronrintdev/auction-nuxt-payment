<template>
  <div id="tracking">
    <!-- TODO Add date -->
    <div v-for="(result, index) in timeline" :key="index" class="tracking-list">
      <div class="row" v-if="result.description != 'Commission Paid'">
        <div class="col-md-3">
          <span
            v-if="result.value === orderStatus"
            class="d-flex order-status-date"
            >{{ updatedAt | formatDate }}</span
          >
        </div>
        <div class="col-md-9">
          <div class="tracking-item" :class="result.class">
            <div class="tracking-icon status-intransit">
              <TimelineIcon :status="result.value === orderStatus? 'active': 'past'" class="icon"></TimelineIcon>
            </div>
            <div
              class="tracking-content"
              :class="result.value === orderStatus ? 'text-dark' : 'text-muted'"
            >
              <p class="order-description">
                {{ result.status }}
                <span>{{
                  result.description
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineIcon from '~/components/orders/TimelineIcon';
export default {
  name: 'PurchaseTimeline',
  components: {TimelineIcon},
  props: {
    timeline: {
      type: Array,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="sass" scoped>
.tracking-end
  border-left: none
  .tracking-icon
    left: -6px
</style>
