
<template>
  <section class="formulario formreporte">
    <h2 class="formulario__titulo">Confirmación de Pagos Televisión</h2>
    <p class="formulario__texto">
      {{ $static.form.edges[0].node.mensaje_formulario }}
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
        <div class="error">{{ errors.fullname }}</div>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="ci">
          Cédula de identidad
        </label>
        <input
          class="formulario__form__input"
          id="ci"
          type="number"
          v-model="ci"
        />
        <div class="error">{{ errors.ci }}</div>
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
        <div class="error">{{ errors.contractNumber }}</div>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="zone">Zona</label>
        <input
          class="formulario__form__input"
          id="zone"
          type="text"
          v-model="zone"
        />
        <div class="error">{{ errors.zone }}</div>
      </div>
      <h3 class="formulario__form__titulo">Datos forma de pago</h3>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="paymentWay">
          Forma de pago
        </label>
        <select v-model="paymentWay" id="paymentWay">
          <option value="none" selected disabled>
            Elija una forma de pago
          </option>
          <option value="transferencia_bancaria">Transferencia bancaria</option>
          <option value="pago_movil">Pago móvil</option>
        </select>
        <div class="error">{{ errors.paymentWay }}</div>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="transactionNumber">
          Número de transacción
        </label>
        <input
          class="formulario__form__input"
          id="transactionNumber"
          type="number"
          v-model="transactionNumber"
        />
        <div class="error">{{ errors.transactionNumber }}</div>
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
        <div class="error">{{ errors.issuingBank }}</div>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label">Fecha de la operación</label>
        <ClientOnly>
          <VueDatePicker
            placeholder="Elija un día"
            v-model="currentDate"
            format="DD-MM-YYYY"
          />
        </ClientOnly>
        <div class="error">{{ errors.date }}</div>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="mount">Monto</label>
        <currency-input v-model="mount" />
        <!-- <input
          class="formulario__form__input"
          id="mount"
          type="text"
          v-model="fmount"
        /> -->
        <div class="error">{{ errors.mount }}</div>
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
        <div class="error">{{ errors.dtbFullname }}</div>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="dtbPhone">Teléfono</label>
        <input
          class="formulario__form__input"
          type="tel"
          id="dtbPhone"
          v-model="dtbPhone"
        />
        <div class="error">{{ errors.dtbPhone }}</div>
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
        <div class="error">{{ errors.dtbCi }}</div>
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
        <div class="error">{{ errors.dtbEmail }}</div>
      </div>
      <div class="formulario__form__grupo">
        <button
          type="submit"
          class="formulario__form__boton"
          :disabled="sendingForm"
        >
          {{ sendingForm ? '...Enviando' : 'Reportar pago' }}
        </button>
      </div>
    </form>
  </section>
</template>

<static-query>
  query {
    form: allStrapiReportes {
      edges {
        node {
          mensaje_formulario
        }
      }
    }
  }
</static-query>

<script>
import Vue from 'vue'
import { VueDatePicker } from '@mathieustan/vue-datepicker'

import CurrencyInput from '../CurrencyInput.vue'

import request from '../../utils/request'
import banks from '../../data/banks'
import {
  validateCi,
  validateEmail,
  validateField,
  validateNumberField,
  validatePhone,
} from '../../utils/validations'

Vue.use(VueDatePicker)

const req = request()

export default {
  name: 'Formulario',
  components: {
    VueDatePicker,
    CurrencyInput,
  },
  data: () => ({
    sendingForm: false,
    fullname: '',
    ci: '',
    contractNumber: '',
    zone: '',
    paymentWay: '',
    transactionNumber: '',
    issuingBank: '',
    date: '',
    mount: '',
    dtbFullname: '',
    dtbPhone: '',
    dtbCi: '',
    dtbEmail: '',
    currentDate: new Date(),
    valid: true,
    success: false,
    errors: {},
    allBanks: [],
  }),
  methods: {
    reset() {
      this.errors = {}
      this.fullname = ''
      this.ci = ''
      this.contractNumber = ''
      this.zone = ''
      this.paymentWay = ''
      this.transactionNumber = ''
      this.issuingBank = ''
      this.date = ''
      this.mount = ''
      this.dtbFullname = ''
      this.dtbPhone = ''
      this.dtbCi = ''
      this.dtbEmail = ''
    },
    async submitForm() {
      this.sendingForm = true
      this.errors = {}

      const validFullName = validateField(this.fullname)
      this.errors.fullname = validFullName.error

      if (this.valid) {
        this.valid = validFullName.valid
      }

      const validCI = validateCi(this.ci)
      this.errors.ci = validCI.error

      if (this.valid) {
        this.valid = validCI.valid
      }

      const validContractNumber = validateNumberField(this.contractNumber)
      this.errors.contractNumber = validContractNumber.error

      if (this.valid) {
        this.valid = validContractNumber.valid
      }

      const validZone = validateField(this.zone)
      this.errors.zone = validZone.error

      if (this.valid) {
        this.valid = validZone.valid
      }

      const validPaymentWay = validateField(this.paymentWay)
      this.errors.paymentWay = validPaymentWay.error

      if (this.valid) {
        this.valid = validPaymentWay.valid
      }

      const validTransactionNumber = validateNumberField(this.transactionNumber)
      this.errors.transactionNumber = validTransactionNumber.error

      if (this.valid) {
        this.valid = validTransactionNumber.valid
      }

      const validIssuingBank = validateField(this.issuingBank)
      this.errors.issuingBank = validIssuingBank.error

      if (this.valid) {
        this.valid = validIssuingBank.valid
      }

      const validMount = validateField(this.mount)
      this.errors.mount = validMount.error

      if (this.valid) {
        this.valid = validMount.valid
      }

      const validDtbFullname = validateField(this.dtbFullname)
      this.errors.dtbFullname = validDtbFullname.error

      if (this.valid) {
        this.valid = validDtbFullname.valid
      }

      const validDtbPhone = validatePhone(this.dtbPhone)
      this.errors.dtbPhone = validDtbPhone.error

      if (this.valid) {
        this.valid = validDtbPhone.valid
      }

      const validDtbCi = validateNumberField(this.dtbCi)
      this.errors.dtbCi = validDtbCi.error

      if (this.valid) {
        this.valid = validDtbCi.valid
      }

      const validDtbEmail = validateEmail(this.dtbEmail)
      this.errors.dtbEmail = validDtbEmail.error

      if (this.valid) {
        this.valid = validDtbEmail.valid
      }

      if (!this.valid) {
        this.sendingForm = false
        return
      }

      const isProduction = process.env.GRIDSOME_ENV === 'production'

      const uri = `${
        isProduction ? process.env.GRIDSOME_API_URL : 'http://localhost:1337'
      }/pagos`

      try {
        await req.post(uri, {
          dtc_nombre_apellido: this.fullname,
          dtc_cedula_identidad: this.ci,
          dtc_contrato: this.contractNumber,
          dtc_zona: this.zone,
          dfp_forma_pago: this.paymentWay,
          dfp_transaccion: this.transactionNumber,
          dfp_banco_emisor: this.issuingBank,
          dfp_fecha: this.currentDate,
          dfp_monto: this.mount,
          dtb_nombre_apellido: this.dtbFullname,
          dtb_telefono: this.dtbPhone,
          dtb_cedula_identidad: this.dtbCi,
          dtb_correo: this.dtbEmail,
        })

        this.sendingForm = false
      } catch (error) {
        console.error(error)
      } finally {
        this.reset()
      }
    },
  },
  mounted() {
    this.allBanks = banks
  },
}

import './Form.scss'
</script>
