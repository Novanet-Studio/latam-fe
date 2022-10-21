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
        {{ informacionPago }}
      </p>
      <ul class="info-a__opciones">
        <li
          class="info-a__opciones__item"
          v-for="banco in bancos"
          :key="banco.id"
        >
          <div class="info-a__opciones__box">
            <div class="info-a__opciones__icon-transferencia"></div>
            <div class="info-a__opciones__info">
              <h3 class="info-a__opciones__titulo">{{ banco.tipo }}</h3>
              <p class="info-a__opciones__texto">
                {{ banco.mensaje }}
                {{ banco.numero }}<br />
                Banco: {{ banco.banco }}.<br />
                RIF: {{ rif }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <FormularioPago />
  </main>
</template>

<script setup>
import "./reporte.scss";
import { getFullPrice } from "../utils/getFullPrice";
import FormularioPago from "../components/formularioPago.vue";

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
            mensaje
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
const bancos = internetQuery.data.datosDePago.data.attributes.banco;
const rif = internetQuery.data.datosDePago.data.attributes.rif;
const informacionPago =
  internetQuery.data.datosDePago.data.attributes.informacion_pago;

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
