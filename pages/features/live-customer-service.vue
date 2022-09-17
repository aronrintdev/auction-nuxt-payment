<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.live_customer_service.title')"
      :description="$t('features.live_customer_service.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title text-uppercase">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/live-customer-service/clock.svg`)"
        :heading="$t('features.live_customer_service.24_hour_service')"
        :description="$t('features.live_customer_service.24_hour_service_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/live-customer-service/computer.svg`)
        "
        :heading="$t('features.live_customer_service.talk_to_person')"
        :description="$t('features.live_customer_service.talk_to_person_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/live-customer-service/light.svg`)"
        :heading="$t('features.live_customer_service.problem_solving')"
        :description="$t('features.live_customer_service.problem_solving_desc')"
        class="feature-item"
      />

      <h3 class="title text-uppercase">
        {{ $tc('common.option', 2) }}
      </h3>

      <div
        class="d-flex align-items-center justify-content-between position-relative options-section"
      >
        <div class="card-wrapper mt-0 pt-0">
          <FeatureCardHoverable
            :icon="
              require('~/assets/img/features/live-customer-service/speech-bubble.svg')
            "
            :title="$t('common.chat')"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverable
            :icon="
              require('~/assets/img/features/live-customer-service/phone.svg')
            "
            :title="$t('shipping.phone')"
            variant="round"
          />
        </div>

        <div class="card-wrapper mb-0 pb-0">
          <FeatureCardHoverable
            :icon="
              require('~/assets/img/features/live-customer-service/email.svg')
            "
            :title="$t('shipping.email')"
            variant="round"
          />
        </div>

        <div class="mid-line position-absolute"></div>
      </div>

      <!-- todo: add faq url -->
      <FeatureBrowseSection
        :title="$t('common.learn_more')"
        :icon="
          require('~/assets/img/features/live-customer-service/graduation-cap.svg')
        "
        to="#"
        :button-label="$t('footer.faq')"
        variant="secondary"
      >
        <!-- todo: replace text below -->
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempo
      </FeatureBrowseSection>
    </div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureBenefitItem from '~/components/feature/BenefitItem'
import FeatureBackButton from '~/components/feature/BackButton'
import FeatureBrowseSection from '~/components/feature/BrowseSection'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    FeatureBackButton,
    FeatureBrowseSection,
  },

  layout: 'IndexLayout',

  data() {
    return {
      options: [
        {
          id: 'affirm',
          icon: require('~/assets/img/icons/affirm-black.svg'),
        },
        {
          id: 'afterpay',
          icon: require('~/assets/img/icons/afterpay.svg'),
        },
      ],
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .content
    padding: 80px 200px
    max-width: 1440px

    h3.title
      @include heading-7
      color: $color-black-5
      margin-bottom: 68px

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item
      margin-bottom: 115px

    .options-section
      .mid-line
        width: 100%
        border-bottom: 1px solid $color-black-1

      .card-wrapper
        z-index: 1
        background-color: $color-white-1
        padding: 0 20px

@media (max-width: 1200px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 1000px)
  .features-container
    .content
      .options-section
        flex-direction: column

        .mid-line
          height: 100%
          border-bottom: none
          border-left: 1px solid $color-black-1
          width: auto

        .card-wrapper
          padding: 20px 0
          margin: 20px 0

@media (max-width: 576px)
  .features-container
    .content
      padding: 40px 30px

      .feature-item::v-deep
        flex-direction: column
        align-items: center

        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center
</style>
