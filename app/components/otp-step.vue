<script lang="ts" setup>
const stepper = inject("stepper") as any;
</script>

<template>
  <div v-if="stepper.isCurrent('otp')" class="otp-step">
    <font-awesome-icon icon="key" size="4x" style="color: #1b4686" />
    <p>Haz click para solicitar tu clave de pago</p>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.otp-step {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .amount-wrapper {
    position: relative;

    &__btn {
      position: absolute;
      right: 0.5rem;
      top: 2.7rem;
      border: none;
    }
  }

  & .formulario__form__grupo input {
    width: 14rem !important;
  }
}

/*---- 
  Mobile Portrait (320px)
----*/
@include responsive(20em) {
  .otp-step {
    flex-direction: column;
    gap: 1rem;

    .formulario__form__grupo {
      padding: 1em;
    }
  }
}

/*---- 
  Tablet Portrait (768px)
----*/
@include responsive(48em) {
  .otp-step {
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    & .formulario__form__grupo input {
      width: 25rem !important;
    }
  }
}

/*---- 
  Small Desktop (1280px)
----*/
@include responsive(80em) {
  .otp-step {
    flex-direction: row;
    gap: 1rem;

    .formulario__form__grupo {
      padding: 1em;
    }

    & .formulario__form__grupo input {
      width: 14rem !important;
    }
  }
}
</style>
