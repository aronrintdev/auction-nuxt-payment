<template>
  <FeatureContentWrapper
    :title="$t('features.2fa_security.title')"
    :description="$t('features.2fa_security.desc')"
  >
    <FeatureBenefits :items="benefitItems" />

    <!-- todo: add faq url -->
    <FeatureBrowseSection
      :title="$t('common.learn_more')"
      :icon="require('~/assets/img/features/2fa-security/graduation-hat.svg')"
      to="#"
      :button-label="$t('footer.faq')"
    >
      {{ $t('features.2fa_security.learn_more_desc') }}
    </FeatureBrowseSection>
  </FeatureContentWrapper>
</template>
<script>
import {
  FeatureBenefits,
  FeatureContentWrapper,
  FeatureBrowseSection,
} from '~/components/feature'

export default {
  components: {
    FeatureBenefits,
    FeatureContentWrapper,
    FeatureBrowseSection,
  },

  layout: 'IndexLayout',

  data() {
    return {
      benefitItems: [
        {
          icon: require('~/assets/img/features/2fa-security/lock.svg'),
          heading: this.$t('features.2fa_security.increased_security'),
          description: this.$t('features.2fa_security.increased_security_desc'),
        },
        {
          icon: require('~/assets/img/features/2fa-security/fingerprint.svg'),
          heading: this.$t('features.2fa_security.biometric_identification'),
          description: this.$t(
            'features.2fa_security.biometric_identification_desc'
          ),
        },
        {
          icon: require('~/assets/img/features/2fa-security/phone.svg'),
          heading: this.$t('features.2fa_security.paired_with_sms'),
          description: this.$t('features.2fa_security.paired_with_sms_desc'),
        },
      ],
    }
  },
}
</script>
