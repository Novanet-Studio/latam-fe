<template>
  <section class="formulario">
    <h2 class="formulario__titulo">¿Quieres conocer más?</h2>
    <form class="formulario__form">
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
          Teléfono
        </label>
        <input
          class="formulario__form__input"
          type="tel"
          id="phone"
          name="phone"     
        />
      </div>
      <div class="formulario__form__grupo">
        <label class="formulario__form__label" for="message">
          Mensaje
        </label>
        <textarea
          class="formulario__form__textarea"
          id="message"
          name="message"
          rows="1"
        ></textarea>
      </div>
      <div class="formulario__form__grupo">
        <input
          type="submit"
          value="Enviar mensaje"
          class="formulario__form__boton"
        />
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Formulario',
}

import './Formulario.scss'
</script>
