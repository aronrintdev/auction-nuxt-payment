<template>
  <div>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper pt-110">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">{{ $t('home.dashboard') }}</h1>
              <p>{{ $t('home.welcome') }} {{ user_name }}</p>
            </div>
            <!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <nuxt-link to="/">{{ $t('home.home') }}</nuxt-link>
                </li>
                <li class="breadcrumb-item active">
                  {{ $t('home.dashboard') }}
                </li>
              </ol>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <!-- Small boxes (Stat box) -->

          <!-- /.row -->
          <!-- Main row -->
          <div class="row">
            <!-- Left col -->
            <section class="col-lg-12 connectedSortable"></section>
          </div>
          <!-- /.row (main row) -->
        </div>
        <!-- /.container-fluid -->
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {},
  layout: 'Profile', // Layout
  middleware: 'auth', // only authenticated users
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
}
</script>
