<template>
  <div>
    <!-- Loaders -->
      <div
      v-if="loading"
      class="d-flex align-items-center justify-content-center h-500"
    >
      <Loader :loading="loading"></Loader>
    </div>
    <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="row">
            <div class="col-lg-2">
              <ProductThumb
                src="https://api.deadstock.co/prod/api/sneakers/CV7562-401/image"
              />
            </div>
            <div class="col-lg-5">
              <div class="body-4-bold mb-2">Nike Lebron 18 Low (2021)</div>
              <div class="body-4-normal mb-2 text-gray-6">
                Black & White
              </div>
            </div>
            <div class="col-lg-5 text-right">
              <Button
                  variant="dark-blue"
                  class="mx-3"
                  @click="handleSellNowClick"
                >
                  <div class="d-flex justify-content-between">
                    <div>{{ $t('deadstock_exchange.detail.buy') }} </div>
                  </div>
                </Button>
                <Button
                  variant="dark"
                  @click="handleSellNowClick"
                >
                  <div class="d-flex justify-content-between">
                    <div>{{ $t('deadstock_exchange.detail.sell') }} </div>
                  </div>
                </Button>
            </div>
          </div>
        </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="body-4-normal mb-2 text-gray-6">
          {{ dayjs() | diffForHumans }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {Button, Loader } from '~/components/common'
import ProductThumb from '~/components/product/Thumb.vue'
export default {
  name:'ProductDetail',
  components: { ProductThumb,Button,Loader},
  data(){
    return {
      dayjs,
      loading:false
    }
  }
}
</script>
