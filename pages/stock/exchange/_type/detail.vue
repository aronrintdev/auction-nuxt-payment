<template>
    <div class="container-fluid promotions">
        <div class="container container-auction-details">
          <div class="row ">
            <div class="col-12 col-md-11 col-sm-11 mx-auto">
            <h3>Detail </h3>
            </div>
          </div>
        </div>
      </div>
  </template>
  <script>
  
  export default {
    layout(context) {
      return context.$auth.user ? 'Profile' : 'IndexLayout'
    }
  }
  </script>
  