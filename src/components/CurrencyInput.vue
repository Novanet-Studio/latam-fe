<template>
  <input
    type="text"
    class="formulario__form__input"
    id="mount"
    v-model="finalMount"
    @blur="isInputActive = false"
    @focus="isInputActive = true"
  />
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    isInputActive: false,
  }),
  computed: {
    finalMount: {
      get() {
        const FORMAT_REGEX = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g
        const value = this.value !== '' ? this.value : 0

        if (this.isInputActive) {
          return this.value.toString()
        }

        const mount = value
          .toFixed(2)
          .replace(FORMAT_REGEX, '$1.')
          .split('')

        const dotDecimalPosition = mount.length - 3

        mount.splice(dotDecimalPosition, 1, ',')

        return `Bs.S ${mount.join('')}`
      },
      set(newValue) {
        let value = parseFloat(newValue.replace(/[^\d\,]/g, ''))

        if (isNaN(value)) {
          value = 0
        }

        this.$emit('input', value)
      },
    },
  },
}

import './reporte/Form.scss'
</script>