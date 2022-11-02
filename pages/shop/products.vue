<template>
  <article>
    <section v-for="(n, index) in pageOffset" :key="index">
      <img :src="`https://picsum.photos/500/400?image=` + index" alt="">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis nisi est repellat. Ex doloribus molestias hic
        dolorem provident. Incidunt numquam culpa ut alias eveniet at quasi, reiciendis suscipit qui. Iure.
      </p>
    </section>
    <div class="below">
      <div id="scroll-trigger" ref="infinitescrolltrigger"></div>
      <div v-if="showloader" class="circle-loader"></div>
    </div>
  </article>
</template>
<script>
import Vue from 'vue';
import VueLoadmore from 'vuejs-loadmore';

Vue.use(VueLoadmore);
export default {
  layout: 'IndexLayout',
  fetchOnServer: false,
  data() {
    return {
      currentPage: 1,
      maxPerPage: 2,
      totalResults: 100,
      showloader: true
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage)
    },
    pageOffset() {
      return this.maxPerPage * this.currentPage
    },
  },
  mounted() {
    this.scrollTrigger();
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && this.currentPage < this.pageCount) {
            this.showloader = true;
            setTimeout(() => {
              this.currentPage += 1;
              this.showloader = false;
            }, 1000) // ajax call here;
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.article
  margin: 0 auto
  width: 400px
  .section
    width: 400px
    margin-bottom: 20px
    border-radius: 10px
    overflow: hidden
    .p
      margin: 0
      padding: 10px 20px 
.below
  position: relative
  width: 400px
  height: 100px

  #scroll-trigger
    height: 50px
  .circle-loader
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 50px
    height: 50px
    border-radius: 50%
    border: 5px solid $color-black-1
    border-top: 5px solid $color-white-1
    animation: animate 1.5s infinite linear
@keyframes animate
  0%
    transform: translate(-50%, -50%) rotate(0deg)
  100%
    transform: translate(-50%, -50%) rotate(360deg)
</style>
  