<template>
  <section class="formulario formreporte">
    <h2 class="formulario__titulo">Confirmación de Pagos TV por cable</h2>
    <p class="formulario__texto">
      {{ mensaje_formulario }} {{ bcv_usd }}.
    </p>
    <form class="formulario__form" @submit.prevent="submitForm">
      <h3 class="formulario__form__titulo">Datos titular contrato</h3>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="fullname">
          Nombre y Apellido
        </label>
        <input
          class="formulario__form__input"
          id="fullname"
          type="text"
          v-model="fullname"
        />
        <!-- <div class="error">{{ errors.fullname }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="ci">
          Cédula de identidad
        </label>
        <input
          class="formulario__form__input"
          id="ci"
          type="number"
          min="0"
          v-model="ci"
        />
        <!-- <div class="error">{{ errors.ci }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="contractNumber">
          Número contrato
        </label>
        <input
          class="formulario__form__input"
          id="contractNumber"
          type="text"
          v-model="contractNumber"
        />
        <!-- <div class="error">{{ errors.contractNumber }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="zone">Zona</label>
        <input
          class="formulario__form__input"
          id="zone"
          type="text"
          v-model="zone"
        />
        <!-- <div class="error">{{ errors.zone }}</div> -->
      </div>
      <h3 class="formulario__form__titulo">Datos forma de pago</h3>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="paymentWay">
          Forma de pago
        </label>
        <select v-model="paymentWay" id="paymentWay">
          <option selected disabled>Elija una forma de pago</option>
          <option value="transferencia_bancaria">Transferencia bancaria</option>
          <option value="pago_movil">Pago móvil</option>
        </select>
        <!-- <div class="error">{{ errors.paymentWay }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="transactionNumber">
          Número de transacción
        </label>
        <input
          class="formulario__form__input"
          id="transactionNumber"
          type="number"
          min="0"
          v-model="transactionNumber"
        />
        <!-- <div class="error">{{ errors.transactionNumber }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="issungBank">
          Banco emisor
        </label>
        <select v-model="issuingBank" id="issungBank">
          <option selected disabled>Elija un banco</option>
          <option v-for="bank in allBanks" :value="bank.name" :key="bank.id">
            {{ bank.name }}
          </option>
        </select>
        <!-- <div class="error">{{ errors.issuingBank }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label">Fecha de la operación</label>
        <ClientOnly>
          <VueDatePicker
            placeholder="Elija un día"
            v-model="currentDate"
            format="DD-MM-YYYY"
            :locale="dateLocale"
          />
        </ClientOnly>
        <!-- <div class="error">{{ errors.date }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="mount">Monto</label>
        <!-- <currency-input v-model="mount" /> -->
        <!-- <div class="error">{{ errors.mount }}</div> -->
      </div>
      <h3 class="formulario__form__titulo">Datos titular cuenta bancaria</h3>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="dtbFullname">
          Nombre y Apellido
        </label>
        <input
          class="formulario__form__input"
          type="text"
          id="dtbFullname"
          v-model="dtbFullname"
        />
        <!-- <div class="error">{{ errors.dtbFullname }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="dtbPhone">Teléfono</label>
        <input
          class="formulario__form__input"
          type="tel"
          id="dtbPhone"
          v-model="dtbPhone"
        />
        <!-- <div class="error">{{ errors.dtbPhone }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="dtbCi">
          Cédula de identidad
        </label>
        <input
          class="formulario__form__input"
          type="tel"
          id="dtbCi"
          v-model="dtbCi"
        />
        <!-- <div class="error">{{ errors.dtbCi }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="dtbEmail">
          Correo electrónico
        </label>
        <input
          class="formulario__form__input"
          type="email"
          id="dtbEmail"
          v-model="dtbEmail"
        />
        <!-- <div class="error">{{ errors.dtbEmail }}</div> -->
      </div>
      <div class="formulario__form__grupo">
        <button
          type="submit"
          class="formulario__form__boton"
          :disabled="sendingForm"
        >
          {{ sendingForm ? "...Enviando" : "Reportar pago" }}
        </button>
      </div>
    </form>
    <Modal
      v-show="isModalVisible"
      title="Tu pago ha sido reportado"
      text="Gracias por enviarnos la información de pago. Para cualquier otra información por favor envíanos un mensaje por WhatsApp"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import "./formularioPago.scss";
import { banks } from "../utils/banks";

// Query
const graphql = useStrapiGraphQL();

const formularioPagoQuery = await graphql(`
  query {
    datosDePago {
      data {
        attributes {
          bcv_usd
          mensaje_formulario
        }
      }
    }
  }
`);

const bcv_usd = formularioPagoQuery.data.datosDePago.data.attributes.bcv_usd;
const mensaje_formulario =
  formularioPagoQuery.data.datosDePago.data.attributes.mensaje_formulario;

// Form
const sendingForm = false;

function showModal() {
  isModalVisible = true;
}

function closeModal() {
  isModalVisible = false;
}
</script>
