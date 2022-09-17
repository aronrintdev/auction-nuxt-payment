<template>
  <div>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Main row -->
        <div class="row">
          <!-- Left col -->
          <section class="col-xs-12">
            <div class="mt-5 mb-4 mx-3 sale-confirm">
              <div class="sale-confirm-title">
                {{ $t('sell.sale_confirmed.title') }}
              </div>
              <div class="my-5 mx-auto text-center sale-confirm-container">
                <h4 class="sale-confirm-subtitle">
                  {{ $t('sell.sale_confirmed.subtitle') }}
                </h4>
                <div class="sale-confirm-description">
                  {{ $t('sell.sale_confirmed.description') }}
                </div>
                <div class="my-4 sale-confirm-image"></div>
                <div class="d-flex align-items-center justify-content-between">
                  <NuxtLink to="/sell" class="btn sale-confirm-btn">{{
                    $t('sell.sale_confirmed.return_to_sellers')
                  }}</NuxtLink>
                </div>
              </div>
            </div>
          </section>
        </div>
        <!-- /.row (main row) -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

/*
  Sale Confirm page
 */
export default {
  name: 'SaleConfirm',
  components: {},
  layout: 'Profile', // Layout
  middleware: 'auth', // only authenticated users
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname,
    }
  },
  // get current language
  computed: {
    ...mapGetters(['getLang']),
  },
}
</script>
