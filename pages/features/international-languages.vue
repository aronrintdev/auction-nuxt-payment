<template>
  <div>
    <FeatureContentWrapper
      :title="banner.title"
      :description="banner.description"
      :backgroundImage="banner.backgroundImage"
      :backgroundImageSm="banner.backgroundImageSm"
      :previousPage="shopNowBanner.previousPage"
      :previousPageLink="shopNowBanner.previousPageLink"
      :nextPage="shopNowBanner.nextPage"
      :nextPageLink="shopNowBanner.nextPageLink"
    >
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle>
        {{ $t('newest_features.international_languages.refer_a_friend') }}
      </FeatureTitle>
      <InviteFriend />
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import InviteFriend from '~/components/feature/InviteFriend'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    InviteFriend,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.international_languages.feature_banner_title',
        description:
          'newest_features.international_languages.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/international-languages/int-languages-banner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/international-languages/int-languages-banner-sm.svg'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/international-languages/better-access.png'),
          benefitTitle:
            'newest_features.international_languages.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.international_languages.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/international-languages/as-a-seller.png'),
          benefitTitle:
            'newest_features.international_languages.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.international_languages.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/international-languages/join-an-international-community.png'),
          benefitTitle:
            'newest_features.international_languages.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.international_languages.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        previousPage: 'newest_features.payments_plans.title',
        previousPageLink: '/features/payments-plans',
        nextPage: 'newest_features.csv_bulk_uploading.title',
        nextPageLink: '/features/csv-bulk-uploading',
      },
    }
  },
}
</script>
