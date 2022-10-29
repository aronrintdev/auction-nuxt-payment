<template>
  <div class="contact-us-form">
    <div class="form-group">
      <label for="inputName">Name</label>
      <input id="inputName" type="text" class="form-control" placeholder="Your name">
    </div>
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input id="inputEmail" type="email" class="form-control" aria-describedby="emailHelp"
             placeholder="Your email address">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="inputPhone">Phone (Optional)</label>
      <input id="inputPhone" type="text" class="form-control" placeholder="( ) - ">
    </div>
    <div class="form-group">
      <label for="inputAreaOfConcern">Area of Concern</label>
      <CustomSelect
        id="category-types"
        :default="categorySelected"
        :threelineIcon="false"
        :options="{
              default: 'Please select an area of concern',
              buying: 'Buying',
              selling: 'Selling',
              trading: 'Trading',
              seeking_partnership: 'Seeking Partnership',
              other: 'Other (Specify in Description)'
            }"
        @input="handleSortByChange"
      />
    </div>
    <div class="form-group">
      <label for="inputOrderId">Order ID (Optional)</label>
      <input id="inputOrderId" type="text" class="form-control" placeholder="Please enter the Order ID if nec">
    </div>
    <div class="form-group">
      <label for="inputSubject">Subject</label>
      <input id="inputSubject" type="text" class="form-control" placeholder="Please enter your message subject">
    </div>
    <div class="form-group">
      <label for="inputDescription">Description</label>
      <textarea id="inputDescription" type="text" class="form-control" placeholder="How can we help you?"
                rows="3"></textarea>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="cursor-pointer">
        <img :src="require('/assets/img/icons/clip.svg')">
        <span class="mx-1">(optional)</span>
      </div>
      <button type="submit" class="btn btn-primary px-5">Submit</button>
    </div>
  </div>
</template>

<script>
import {CustomSelect} from '~/components/common';

export default {
  name: 'ContactUsForm',
  components: {
    CustomSelect
  },
  data() {
    return {
      categorySelected: ''
    }
  },
  methods: {
    handleSortByChange(e) {
      console.debug(e)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.contact-us-form
  font-family: $font-montserrat-serif

  label
    @include body-5-normal

  .form-control
    background: $color-white-1
    border-radius: 20px

  ::v-deep .custom-selectbox, ::v-deep .custom-selectbox .selected
    background: $color-white-1
    border-radius: 20px

  ::v-deep .border-bottom
    border-bottom: none !important

  .btn.btn-primary
    background: #999999
    border: none
    border-radius: 20px
    color: $color-white-1

@media (max-width: 767px)
  .contact-us-form
    .form-control
      border: 1px solid #E8E8E8
      border-radius: 10px

    ::v-deep .border-bottom
      border-radius: 10px
      border:  1px solid #E8E8E8 !important

</style>
