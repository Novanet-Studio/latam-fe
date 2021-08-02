<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal__head">
        <h2 class="modal__title">Tu pago ha sido reportado</h2>
        <button
          class="modal__button"
          type="button"
          @click.prevent="$emit('close')"
        >
          &times;
        </button>
      </div>

      <div class="modal__body">
        <p class="modal__text">
          Gracias por enviarnos la información de pago.
        </p>
        <p class="modal__text">
          Para cualquier otra información por favor envíanos un mensaje por
          WhatsApp.
        </p>
      </div>

      <div class="modal__footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'text'],
  methods: {
    close() {
      this.$emit('close')
    },
  },
}

import './Modal.scss'
</script>
