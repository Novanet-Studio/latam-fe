<script lang="ts" setup>
import successImage from "../assets/images/success.svg";
import errorImage from "../assets/images/error.svg";

// const form = inject("form") as Latam.Form;
const form = { status: "success" }
const stepper = inject("stepper") as any;
const isSuccessful = computed(() => form.status === "success" || false);
const isPending = computed(() => form.status === "pending" || false);
const isError = computed(() => form.status === "error" || false);

const title = computed(() => {
  if (isSuccessful.value) {
    return "¡Exitoso!";
  }

  if (isPending.value) {
    return "Procesando...";
  }

  return "Rechazado";
});

const statusText = computed(() => {
  if (isSuccessful.value) {
    return "Gracias por su pago";
  }

  if (isPending.value) {
    return "Esperando respuesta...";
  }

  return "Por favor inténtelo nuevamente";
});

const image = computed(() => {
  if (isSuccessful.value) {
    return {
      url: successImage,
      alt: "Success Icon",
    };
  }

  if (isError.value) {
    return {
      url: errorImage,
      alt: "Error Icon",
    };
  }

  return {
    url: null,
    alt: null,
  };
});
</script>

<template>
  <div v-if="stepper.isCurrent('status')" class="message-wrapper">
    <AppLoader text="" v-if="isPending" />
    <div v-if="!isPending" class="icon-wrapper" :class="{ error: isError }">
      <img v-if="image.url" :src="image.url" alt="Success Icon" />
    </div>
    <span class="message__title" :class="{ error: isError }">{{ title }}</span>
    <span v-if="!isPending" class="message__formError">{{
      form.errorMessage
    }}</span>
    <span class="message__text">{{ statusText }}</span>
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
    margin-top: 0.4rem;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #666666;
  }

  .message__formError {
    margin-top: 0.2rem;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: rgb(199, 25, 25);
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
