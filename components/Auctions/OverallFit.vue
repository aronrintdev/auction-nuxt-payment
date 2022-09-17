<template>
  <div class="text-center">
    <div class="overall-fit">
      <strong>{{ $t('auctions.frontpage.overall_fit') }}</strong>
      <div>
        <div class="overall-fit-content">
          <template v-for="(label, index) in labels">
            <div :key="`divider-lg-${index}`" class="position-relative">
              <svg v-if="center !== index" width="3" height="29" viewBox="0 0 3 29" fill="none">
                <rect x="0.5" y="0.835938" width="2" height="27" rx="1" fill="white" stroke="#78CDF1"/>
              </svg>
              <svg v-else width="9" height="38" viewBox="0 0 9 38" fill="none">
                <rect x="3.5" y="0.5" width="2" height="37" rx="1" fill="white" stroke="#F67A00"/>
                <circle cx="4.5" cy="18.5" r="4" fill="white" stroke="#F67A00"/>
              </svg>
              <div class="overall-fit-label">{{ label }}</div>
            </div>
            <svg :key="`divider-${index}`" class="divider" width="1" height="25" viewBox="0 0 1 25" fill="none">
              <line x1="0.5" y1="0.335938" x2="0.5" y2="24.3359" stroke="#78CDF1"/>
            </svg>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
 * OverallFit Component
 */
export default {
  name: 'OverallFit',
  data() {
    return {
      labels: [
        '-1',
        '-1/2',
        this.$t('auctions.frontpage.true_to_size'),
        '+1/2',
        '+1',
      ],
    }
  },
  computed: {
    center() {
      return Math.ceil(this.labels.length / 2) - 1;
    }
  }
}
</script>
