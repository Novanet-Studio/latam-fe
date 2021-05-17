<template>
  <section class="formulario formreporte">
    <h2 class="formulario__titulo">Confirmación de Pagos Televisión</h2>
    <p class="formulario__texto">
      Debido a cambios en la grilla de canales por la incorporación del paquete
      de HBO (Sony, Warner, AXN, Rai Italia, History 2, E!, Televisión Española)
      estaremos realizando interrupciones de servicio durante el mes de abril y
      mayo, algunos canales serán modificados. Disculpe las molestias
      ocasionadas.
    </p>
    <form class="formulario__form">
      <h3 class="formulario__form__titulo">Datos titular contrato</h3>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="name">
          Nombre y Apellido
        </label>
        <input
          class="formulario__form__input"
          type="text"
          id="name"
          name="name"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone">
          Cédula de identidad
        </label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone">
          Número contrato
        </label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone"> Zona </label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <h3 class="formulario__form__titulo">Datos forma de pago</h3>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="name">
          Forma de pago
        </label>
        <select id="forma-pago">
          <option value="volvo" disabled selected>
            Elija una forma de pago
          </option>
          <option value="volvo">Transferencia bancaria</option>
          <option value="saab">Pago móvil</option>
        </select>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone"
          >Número de transacción</label
        >
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone">Banco emisor</label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone"
          >Fecha de la operación</label
        >
        <datepicker placeholder="Elija un día"></datepicker>
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone">Monto</label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <h3 class="formulario__form__titulo">Datos titular cuenta bancaria</h3>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="name">
          Nombre y Apellido
        </label>
        <input
          class="formulario__form__input"
          type="text"
          id="name"
          name="name"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone">Teléfono</label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone">
          Cédula de identidad
        </label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="phone">
          Correo electrónico
        </label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"
        />
      </div>
      <div class="formulario__form__grupo">
        <input
          type="submit"
          value="Reportar pago"
          class="formulario__form__boton"
        />
      </div>
    </form>
  </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'Formulario',
  components: {
    Datepicker,
  },
}

import './Form.scss'
</script>
