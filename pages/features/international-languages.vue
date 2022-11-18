<template>
  <div>
    <FeatureContentWrapper
      :backgroundImage="banner.backgroundImage"
      :backgroundImageXS="banner.backgroundImageXS"
      :previousPage="previousPage"
      :previousPageXS="previousPageXS"
      :previousPageLink="previousPageLink"
      :nextPage="nextPage"
      :nextPageXS="nextPageXS"
      :nextPageLink="nextPageLink"
    >
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitImageXS="benefit.benefitImageXS"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle>
        {{ $t('newest_features.international_languages.refer_a_friend') }}
      </FeatureTitle>
      <InviteFriend :inviteBannerImage="inviteBannerImage" />
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
        backgroundImage: require('@/assets/img/features/newest-feature/international-languages/int-languages-banner.jpg'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/international-languages/int-languages-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/international-languages/better-access.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/international-languages/better-access-xs.png'),
          benefitTitle:
            'newest_features.international_languages.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.international_languages.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/international-languages/as-a-seller.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/international-languages/as-a-seller-xs.png'),
          benefitTitle:
            'newest_features.international_languages.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.international_languages.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/international-languages/join-an-international-community.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/international-languages/join-an-international-community-xs.png'),
          benefitTitle:
            'newest_features.international_languages.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.international_languages.benefits.third_benefit_desc',
        },
      ],
      inviteBannerImage: require('@/assets/img/features/newest-feature/international-languages/invite-banner.png'),
      previousPage:
        'newest_features.international_languages.previous_page_title',
      previousPageXS:
        'newest_features.international_languages.previous_page_xs_title',
      previousPageLink: '/features/payments-plans',
      nextPage: 'newest_features.international_languages.next_page_title',
      nextPageXS: 'newest_features.international_languages.next_page_xs_title',
      nextPageLink: '/features/csv-bulk-uploading',
    }
  },
}
</script>
