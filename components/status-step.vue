<template>
  <Transition name="fade">
    <div v-if="stepper?.currentStep === 3" class="message-wrapper">
      <div class="icon-wrapper" :class="{ error: !isSuccessful }">
        <img
          :src="isSuccessful ? successImage : errorImage"
          alt="Success Icon"
        />
      </div>
      <span class="message__title">{{
        isSuccessful ? "¡Exitoso!" : "Rechazado"
      }}</span>
      <span class="message__text">
        {{
          isSuccessful
            ? "Gracias por su pago"
            : "Por favor verifique sus medios de pago"
        }}
      </span>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import successImage from "../assets/images/success.svg";
import errorImage from "../assets/images/error.svg";

const stepper = inject("stepper") as { currentStep: number | null };
const isSuccessful = ref(true);
</script>

<style lang="scss">
.wizard {
  display: grid;
  grid-template-rows: auto;
  place-items: center;
  padding: 4.5em 1.5em 4.5em 2em;
  position: relative;
  z-index: 0;
  width: 100%;

  & h3 {
    color: #1b4686;
  }

  & h5 {
    color: #1b4686;
    font-weight: 400;
    font-size: 22px;
  }

  & form {
    margin-top: 2rem;

    select {
      width: 100%;
      padding: 0.5rem 0.8rem;
      // border-radius: .5rem;
      border: 1px solid transparent;
      border-radius: 1rem;
      background: #fff;
    }

    & div {
      width: 323px;
    }

    & div label {
      color: #666666;
      font-weight: 500;
    }

    & div button {
      margin-left: 1rem;
      margin-right: 1rem;
      padding: 0.6rem 0.8rem;
      background-color: #c2d62e;
      border-radius: 1rem;
      color: #1b4686;
      font-weight: 800;
    }
  }
}

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

.form-inputs {
  width: 100% !important;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  & .formulario__form__grupo {
    width: 286px;
    padding-left: 1rem;
  }

  & .formulario__form__grupo input {
    width: 20rem !important;
  }
}

.form-buttons {
  width: 100% !important;
  display: flex;
  justify-content: center;
}
</style>
