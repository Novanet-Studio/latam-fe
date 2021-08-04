<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal__head">
        <h2 class="modal__title">{{ title }}</h2>
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
          {{ text }}
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
