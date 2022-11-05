import Vue from 'vue'

Vue.directive('number-only', {
  bind (el, binding) {
    el.addEventListener('keydown', (evt) => {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace', 'Delete']
      const keyPressed = evt.key
      
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault()
      }
    })
  }
})