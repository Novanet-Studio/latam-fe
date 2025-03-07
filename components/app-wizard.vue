<script setup lang="ts">
import AppStepper from "./app-stepper.vue";

const isNextClicked = ref(false);
const form = inject("form") as Latam.Form;
const isSending = inject("isSending") as Ref<boolean>;
const billingData = reactive<Latam.Billing>({
  IDFactura: 0,
  detalle: "",
  valor: "",
});

const {
  stepper,
  activeComponent,
  isFirstOrLast,
  nextBtnLabel,
  allStepsBeforeAreValid,
} = useStepperApp();

const submit = useWizardSubmit({
  stepper,
  billingData,
});

provide("stepper", stepper);
</script>

<template>
  <section class="wizard-light">
    <app-stepper :stepper="stepper" :check-disabled="allStepsBeforeAreValid" />
    <div class="wizard payment-section">
      <h3>Confirmación de Pagos TV por cable</h3>
      <h5>{{ stepper.current.value!.title }}</h5>
      <p v-if="form.errorMessage !== '' && !stepper?.isLast.value">
        {{ form.errorMessage }}
      </p>

      <form @submit.prevent="submit">
        <transition
          :name="isNextClicked ? 'slide-left' : 'slide-right'"
          mode="out-in"
        >
          <app-loader
            v-if="form.status === 'pending'"
            class="loader-wrapper__wizard"
          />
          <component v-else :is="activeComponent" />
        </transition>
      </form>

      <div
        class="wizard__footer"
        :style="{
          justifyContent: stepper.isLast.value ? 'center' : 'space-around',
        }"
        :class="{ 'wizard__footer--full': isFirstOrLast }"
      >
        <button
          v-if="!stepper?.isFirst.value && !stepper?.isLast.value"
          class="wizard__btn wizard__btn--prev"
          @click="
            () => {
              isNextClicked = false;
              stepper.goToPrevious();
            }
          "
        >
          Regresar
        </button>
        <button
          class="wizard__btn wizard__btn--next"
          :class="{
            'wizard__btn--full': stepper.isLast.value,
          }"
          @click="
            () => {
              isNextClicked = true;
              submit();
            }
          "
          :disabled="isSending"
        >
          {{ isSending ? "Verificando..." : nextBtnLabel }}
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.wizard-light {
  display: grid;
  grid-template-rows: auto;
  grid-area: formulario;
  grid-template-columns: 1fr;
  place-items: center;
  padding: 1em 1.5em 4.5em 2em;
  position: relative;
}

.loader-wrapper__wizard {
  margin-top: 2rem;
}

.wizard {
  display: grid;
  grid-template-rows: auto;
  place-items: center;
  padding: 4.5em 1.5em 4.5em 1.5em;
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

  & p {
    color: rgb(199, 25, 25);
    font-weight: 600;
    margin: 1rem auto 0 auto;

    @media (max-width: 1280px) {
      position: absolute;
      top: 1rem;
      width: 100%;
      text-align: center;
    }
  }

  & form {
    margin-top: 2rem;
    margin-bottom: 2rem;

    & div label {
      color: #666666;
      font-weight: 500;
    }
  }
}

.subscriptor-form {
  width: 100%;
}

.wizard__footer {
  margin-top: 3rem;
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    width: 100%;
  }

  &--full {
    width: 65%;
  }

  & .wizard__btn {
    width: 270px;
    height: 38px;
    border-radius: 1rem;
    font-weight: 800;
  }

  & .wizard__btn--next {
    background: #c2d62e;
    color: #1b4686;
  }

  & .wizard__btn--prev {
    background-color: #1b4686;
    color: #fff;
  }
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-leave-to {
  transform: translateX(40px);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

/*---- 
  Mobile Portrait (320px)
----*/
@include responsive(20em) {
  .wizard {
    width: 70vw;
    place-items: flex-start;
    padding: 0rem 1.5em 2.5em 1.5em;

    h3,
    h5 {
      display: none;
    }

    form {
      width: min(100%, 70vw);
    }

    &__footer {
      margin-top: 1rem;

      &--full {
        width: 100%;
      }

      & .wizard__btn {
        width: min(45%, 200px);
        min-width: min(45%, 200px);

        &--full {
          width: min(100%, 300px);
        }
      }
    }
  }
}

/*---- 
  Tablet Portrait (768px)
----*/
@include responsive(48em) {
  .wizard {
    padding: 2em 2.5em 2.5em 2em;
  }

  .wizard__footer {
    gap: 1rem;

    &--full {
      width: 100%;
    }
  }
}

/*---- 
  Small Desktop (1280px)
----*/
@include responsive(80em) {
  .wizard {
    place-items: center;
    padding: 4.5em 1.5em 4.5em 1.5em;

    h3,
    h5 {
      display: block;
    }
  }

  .wizard__footer {
    gap: 1rem;

    .wizard__btn {
      width: 270px !important;
      min-width: 250px;
    }
  }
}
</style>
