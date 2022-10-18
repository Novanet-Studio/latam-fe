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
