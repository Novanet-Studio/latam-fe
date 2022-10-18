<template>
  <main class="internetvista">
    <Head>
      <Title>{{
        `Internet fibra óptica de alta velocidad - ${$config.pwaManifest.short_name}`
      }}</Title>
      <Meta name="description" :content="description" />
      <Meta name="og:title" :content="$config.pwaManifest.short_name" />
      <Meta name="og:description" :content="description" />
    </Head>

    <section class="hero">
      <div class="hero__internet">
        <a class="hero__internet__box" href="/internet/">
          <div class="hero__internet__icon"></div>
          <div class="hero__internet__info">
            <h1 class="hero__internet__title">Internet por fibra</h1>
            <p class="hero__internet__text">
              Conexión en fibra óptica de alta velocidad para uso corporativo y
              residencial.
            </p>
          </div>
        </a>
      </div>
    </section>

    <section class="internet">
      <div class="internet__planes">
        <div
          class="internet__planes__item"
          v-for="(tipo, index) in tiposPlanes"
          v-bind:key="index"
        >
          <div class="internet__planes__cabecera">
            <h3 class="internet__planes__titulo">{{ tipo.nombre }}</h3>
            <p class="internet__planes__texto">
              {{ tipo.descripcion }}
            </p>
          </div>

          <ul class="internet__planes__lista">
            <li
              class="internet__planes__velocidades"
              v-for="plan in tipo.planes"
              v-bind:key="plan.id"
            >
              <div class="internet__planes__boton">
                <h3 class="internet__planes__subtitulo">{{ plan.nombre }}</h3>
                <p class="internet__planes__texto">
                  {{ loadingText(getPrice(plan.precio_usd, bcv_usd)) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <WhatsappBanner />
  </main>
</template>

<script setup>
import "./internet.scss";
import { getFullPrice } from "../utils/getFullPrice";
import WhatsappBanner from "../components/whatsappBanner.vue";

const description =
  "Internet en fibra óptica de alta velocidad para empresas y hogares.";
  
const isLoading = { isLoading: false };

const graphql = useStrapiGraphQL();

const internetQuery = await graphql(`
  query {
    planInternet {
      data {
        attributes {
          tipo {
            nombre
            descripcion
            planes {
              id
              nombre
              precio_usd
            }
          }
        }
      }
    }
    datosDePago {
      data {
        attributes {
          bcv_usd
        }
      }
    }
  }
`);

const tiposPlanes = internetQuery.data.planInternet.data.attributes.tipo;
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
