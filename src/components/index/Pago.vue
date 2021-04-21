<template>
  <section class="pago">
    <div class="pago__icon">
      <img
      class="pago__icon__imagen"
        alt="Latin American Cable Pago icono"
        src="../../assets/images/latinamericancable-pago-icon.svg"
      />
    </div>
    <g-link to="/pago/" class="pago__boton">Notifíque su pago aquí</g-link>
  </section>
</template>

<script>
export default {
  name: 'PagoSection',
}

import './Pago.scss'
</script>

