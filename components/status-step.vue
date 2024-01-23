<script lang="ts" setup>
import successImage from "../assets/images/success.svg";
import errorImage from "../assets/images/error.svg";

const form = inject("form") as Latam.Form;

const stepper = inject("stepper") as any;
const isSuccessful = ref(form.status === "success");
</script>

<template>
  <div v-if="stepper.isCurrent('status')" class="message-wrapper">
    <div class="icon-wrapper" :class="{ error: !isSuccessful }">
      <img :src="isSuccessful ? successImage : errorImage" alt="Success Icon" />
    </div>
    <span class="message__title" :class="{ 'error': !isSuccessful }">{{
      isSuccessful ? "¡Exitoso!" : "Rechazado"
    }}</span>
    <span class="message__text">
      {{
        isSuccessful
          ? "Gracias por su pago"
          : "Por favor inténtelo nuevamente"
      }}
    </span>
  </div>
</template>

<style lang="scss">
.message-wrapper {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .message__title {
    margin-top: 12px;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #666666;
  }

  .message__text {
    margin-top: 0.2rem;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #666666;
  }

  .error {
    color: rgb(199, 25, 25);
  }
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  border: 2px solid #c2d62e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  & img {
    margin-left: 4px;
  }

  &.error {
    border: 2px solid rgb(199, 25, 25);
  }
}
</style>
