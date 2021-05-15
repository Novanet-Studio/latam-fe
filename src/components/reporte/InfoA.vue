<template>
  <section class="info-a">
    <h2 class="info-a__titulo">Información de pago</h2>
    <p class="info-a__texto">
      Una vez realizado el pago es obligatorio hacer la notificacion del mismo,
      utilizando uno de los dos medios de notificación, pagina web o whatsapp al
      0414 3021751. Utilice un solo método de notificación, solo la página web o
      el whatsapp.
    </p>
    <p class="info-a__texto">
      Debido a cambios en la grilla de canales por la incorporación del paquete
      de HBO (Sony, Warner, AXN, Rai Italia, History 2, E!, Televisión Española)
      estaremos realizando interrupciones de servicio durante el mes de abril y
      mayo, algunos canales serán modificados. Disculpe las molestias
      ocasionadas.
    </p>
    <ul class="info-a__opciones">
      <li class="info-a__opciones__item">
        <div class="info-a__opciones__box">
          <div class="info-a__opciones__icon-transferencia"></div>
          <div class="info-a__opciones__info">
            <h3 class="info-a__opciones__titulo">Transferencia bancaria</h3>
            <p class="info-a__opciones__texto">
              Cuenta a la cual cual debe realizar la transferencia:<br />
              Banco: Bancamiga.<br />
              Cuenta corriente: 0172 0104 2910 4436 9427<br />
              RIF J-298946229
            </p>
          </div>
        </div>
      </li>
      <li class="info-a__opciones__item">
        <div class="info-a__opciones__box">
          <div class="info-a__opciones__icon-pago"></div>
          <div class="info-a__opciones__info">
            <h3 class="info-a__opciones__titulo">Pago móvil</h3>
            <p class="info-a__opciones__texto">
              Número teléfonico al cual debe realizar el pago:<br />
              Movil: 0414.203.2323<br />
              RIF J-298946229<br />
              Banco: Banesco.
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Información de pago',
}

import './InfoA.scss'
</script>
