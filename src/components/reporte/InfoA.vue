<template>
  <section class="info-a">
    <h2 class="info-a__titulo">Información de pago</h2>
    <p class="info-a__texto">
      {{$static.info.edges[0].node.mensaje_pago}}
    </p>    
    <ul class="info-a__opciones" v-for="{ node } in $static.pagos.edges" :key="node.id">
      <li class="info-a__opciones__item">
        <div class="info-a__opciones__box">
          <div class="info-a__opciones__icon-transferencia"></div>
          <div class="info-a__opciones__info">
            <h3 class="info-a__opciones__titulo">Transferencia bancaria</h3>
            <p class="info-a__opciones__texto">
              Cuenta a la cual cual debe realizar la transferencia:<br />
              Banco: {{ node.banco }}.<br />
              Cuenta corriente: {{ node.numero_cuenta }}<br />
              RIF: {{ node.rif }}
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
              Movil: {{ node.telefono }}<br />
              RIF: {{ node.rif }}<br />
              Banco: {{ node.pm_banco }}.
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<static-query>
  query {
    info: allStrapiReportes {
      edges {
        node {
          mensaje_pago
        }
      }
    }
    pagos: allStrapiDatosPago {
      edges {
        node {
          banco
          numero_cuenta
          telefono
          rif
          pm_banco
        }
      }
    }
  }
</static-query>

<script>
export default {
  name: 'Información',
}

import './InfoA.scss'
</script>
