<template>
  <div class="documents-tab p-4">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="title">{{ $t('vendor_hub.documents') }}</h3>
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import DocumentItem from '~/components/profile/vendor-hub/DocumentItem';
import SellerDocumentUploadModal from '~/components/profile/vendor-hub/SellerDocumentUploadModal';
import Loader from '~/components/common/Loader';
export default {
  name: 'Documents',
  components: {Loader, SellerDocumentUploadModal, DocumentItem},
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
      this.showUploadModal = true
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.title
  @include heading-3
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium

.documents-tab
  border: 1px solid $color-gray-29
  border-radius: 4px
  height: max-content
</style>
