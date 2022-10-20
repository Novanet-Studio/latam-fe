<template>
  <main class="reporte">
    <Head>
      <Title>{{ `Reporte su pago - ${$config.pwaManifest.short_name}` }}</Title>
      <Meta name="description" :content="description" />
      <Meta name="og:title" :content="$config.pwaManifest.short_name" />
      <Meta name="og:description" :content="description" />
    </Head>

    <section class="hero">
      <div class="hero__pago">
        <div class="hero__pago__box">
          <div class="hero__pago__icon"></div>
          <div class="hero__pago__info">
            <h1 class="hero__pago__title">Reporta tus pagos</h1>
            <p class="hero__pago__text">
              Ponemos a tu disposición formas para que notifiques los pagos que
              realices
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="tarifas">
      <h2 class="tarifas__titulo">A nuestra distinguida clientela</h2>
      <p class="tarifas__texto">
        {{ datosDePago.principal }}
      </p>

      <ul class="tarifas__tipo">
        <li
          class="tarifas__tipo__item"
          v-for="plan in datosDePago.planes_tv"
          v-bind:key="plan.id"
        >
          <h3 class="tarifas__tipo__titulo">
            {{ plan.nombre }}
          </h3>
          <p class="tarifas__tipo__texto">
            {{ loadingText(getPrice(plan.precio_usd, bcv_usd)) }}
          </p>
        </li>
      </ul>
    </section>

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
  </main>
</template>

<script setup>
import "./reporte.scss";
import { getFullPrice } from "../utils/getFullPrice";

const description = "Reporte su pago del servicio de TV por cable.";

const isLoading = { isLoading: false };

const graphql = useStrapiGraphQL();

const internetQuery = await graphql(`
  query {
    datosDePago {
      data {
        attributes {
          principal
          planes_tv {
            id
            nombre
            precio_usd
          }
          informacion_pago
          banco {
            id
            tipo
            banco
            numero
          }
          rif
          bcv_usd
          mensaje_formulario
        }
      }
    }
  }
`);

const datosDePago = internetQuery.data.datosDePago.data.attributes;
const bcv_usd = internetQuery.data.datosDePago.data.attributes.bcv_usd;

function getPrice(dollarMount, dollarPrice) {
  const dollar = dollarPrice.trim().replace(/\./g, "").replace(",", ".");
  const totalPrice = getFullPrice(dollarMount, dollar);
  return totalPrice;
}

function loadingText(price) {
  return isLoading ? `Bs. ${price} / Mensual` : "...cargando precio";
}

const con = (e) => {
  console.log(e);
};
</script>
