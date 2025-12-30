<script lang="ts" setup>
const stepper = inject("stepper") as any;
const paymentMethod = inject("paymentMethod") as Latam.PaymentMethod;
</script>

<template>
  <div v-if="stepper.isCurrent('payment-report')" class="payment-report">
    <section class="wrapper">
      <!-- <PaymentTabs v-model="paymentMethod" /> -->
      <PagoMovil v-if="paymentMethod === 'pagoMovil'" />
      <!-- <Transference v-if="paymentMethod === 'transference'" /> -->
    </section>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

.wrapper {
  grid-column: 1 / span 4;
  width: 100%;
}

.payment-report {
  margin-top: 2rem;
  width: 100% !important;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);

  select {
    background: #fff;

    &#bank {
      width: 21rem;
      padding: 0.5rem;
    }
  }

  .amount-wrapper {
    position: relative;

    &__btn {
      position: absolute;
      right: 0.5rem;
      top: 2.5rem;
      border: none;
    }
  }

  & .formulario__form__grupo input {
    width: 20rem !important;
  }

  .id-group {
    display: flex;
    gap: 1rem;

    .formulario__form__grupo:has(select) {
      width: 4rem;
    }

    input#type {
      width: 0.8rem;
    }

    input {
      width: 16rem !important;
    }
  }
}

/*---- 
  Mobile Portrait (320px)
----*/
@include responsive(20em) {
  .payment-report {
    grid-template-columns: 1fr;
    place-items: flex-start;

    select {
      &#bank {
        width: 15rem;
        padding: 0.5rem;
      }
    }

    & .formulario__form__grupo input {
      width: 15rem !important;
    }

    .id-group {
      gap: 1rem;

      .formulario__form__grupo:has(select) {
        width: 3rem;
      }

      input {
        width: 11rem !important;
      }
    }
  }
}

/*---- 
  Tablet Portrait (768px)
----*/
@include responsive(48em) {
  .payment-report {
    grid-template-columns: 1fr;
    place-items: center;

    select {
      &#bank {
        width: 25rem;
        padding: 0.5rem;
      }
    }

    & .formulario__form__grupo input {
      width: 25rem !important;
    }

    .id-group {
      .formulario__form__grupo:has(select) {
        width: 5rem;
      }

      input {
        width: 19rem !important;
      }
    }
  }
}

/*---- 
  Small Desktop (1280px)
----*/
@include responsive(80em) {
  .payment-report {
    grid-template-columns: repeat(3, 1fr);
    place-items: center;

    select {
      &#bank {
        width: 15rem;
        padding: 0.5rem;
      }
    }

    & .formulario__form__grupo input {
      width: 15rem !important;
    }

    .id-group {
      .formulario__form__grupo:has(select) {
        width: 4rem;
      }

      input {
        width: 12rem !important;
      }
    }
  }
}
</style>
