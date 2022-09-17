/**
 * Emits an event which assists us in dynamic component rendering.
 * @see https://v3.vuejs.org/guide/component-dynamic-async.html
 * @type {{methods: {emitRenderComponentEvent(*, *): void}}}
 */
const emitEventMixin = {
  methods: {
    emitRenderComponentEvent(componentName, props) {
      this.$nuxt.$emit('renderComponent', componentName, props)
    },
  },
}

export default emitEventMixin
