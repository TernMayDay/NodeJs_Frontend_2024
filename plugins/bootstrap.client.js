import * as bootstrap from 'bootstrap'
const { Modal, Collapse, Dropdown } = bootstrap

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      bootstrap: {
        modal: (element, options = {}) => new Modal(element, options),
        collapse: (element, options = {}) => new Collapse(element, options),
        dropdown: (element, options = {}) => new Dropdown(element, options)
      }
    }
  }
})
