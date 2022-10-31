<template>
  <div class="documents-tab p-4">
    <div class="d-flex justify-content-between align-items-center">
      <div class="title"
           :class="mobileClass.length ? 'body-13-bold font-weight-bold' : 'heading-3-normal'">
        {{ $t('vendor_hub.documents') }}
      </div>
    </div>

    <div v-if="!loading" class="mt-4">
      <div v-for="(document, index) in documents" :key="index">
        <DocumentItem :document="document" @upload="upload" @re-upload="upload" @download="downloadDocument"/>
        <hr v-if="index!==documents.length-1" class="mt-4 mb-2"/>
      </div>
    </div>
    <div v-else class="mt-4 d-flex align-items-center justify-content-center">
      <Loader :loading="loading"></Loader>
    </div>

    <SellerDocumentUploadModal :requirement="selectedRequirement" :show="showUploadModal" @closed="showUploadModal = false" @uploaded="updateDocuments"/>
    <vue-bottom-sheet
      ref="mobileUploader"
      class="responsive-filter"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <SellerDocumentUploadMobile :requirement="selectedRequirement"
                                  @close="closeMobileUploader"
                                  @uploaded="updateDocuments"/>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import DocumentItem from '~/components/profile/vendor-hub/DocumentItem';
import SellerDocumentUploadModal from '~/components/profile/vendor-hub/SellerDocumentUploadModal';
import SellerDocumentUploadMobile from '~/components/profile/vendor-hub/SellerDocumentUploadMobile';
import Loader from '~/components/common/Loader';
import screenSize from '~/plugins/mixins/screenSize'
export default {
  name: 'Documents',
  components: {Loader, SellerDocumentUploadModal, DocumentItem, SellerDocumentUploadMobile},
  mixins: [screenSize],
  data() {
    return {
      showUploadModal: false,
      documents: [],
      selectedRequirement: {},
      loading: false,
    }
  },
  computed:{
    ...mapGetters({
      vendorDocRequirements: 'vendor-hub/vendorDocRequirements',
    }),
  },
  mounted() {
    this.updateDocuments()
  },
  methods:{
    ...mapActions({
      getVendorDocuments: 'vendor-hub/getVendorDocuments',
    }),
    updateDocuments(){
      this.loading = true
      this.getVendorDocuments().then(res => {
        this.documents = this.vendorDocRequirements.map(req => {
          const doc = res.data.data.filter(d => d.name === req.name)
          return {...req, document: doc.length>0? doc[0]: {}}
        })
      }).catch(err => {
        this.$toasted.error(err.response.message)
      }).finally(() => {
        this.loading = false
      })
    },
    downloadDocument(doc){
      // TODO download of file
      // window.open(doc.url, '_blank').focus();
    },
    upload(item){
      this.selectedRequirement = item

      // mobile
      if (this.mobileClass.length > 0) {
        const { mobileUploader } = this.$refs
        if (mobileUploader) {
          mobileUploader.open()
          return
        }
      }

      this.showUploadModal = true
    },
    closeMobileUploader() {
      const { mobileUploader } = this.$refs
      if (mobileUploader) {
        mobileUploader.close()
      }
    },
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.title
  font-family: $font-family-montserrat

.documents-tab
  border: 1px solid $color-gray-29
  border-radius: 4px
  height: max-content
</style>
