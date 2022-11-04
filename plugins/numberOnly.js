import Vue from 'vue'

Vue.directive('number-only',function (el, binding) {
  if (!/^[\d.]+$/.test(el.value)) {
    const newValue = el.value.replace(/[a-zA-Z]+/ig, '');
    el.value = newValue;
    binding.value = el.value;
  }
})