<template>
  <main class="reporte">
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
        <li class="tarifas__tipo__item" v-for="plan in datosDePago.planes_tv" :key="plan.id">
          <h3 class="tarifas__tipo__titulo">
            {{ plan.nombre }}
          </h3>
          <p class="tarifas__tipo__texto">
            {{ loadingText(getPrice(plan.precio_usd, bcvUsd)) }}
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
        <li class="info-a__opciones__item" v-for="banco in bancos" :key="banco.id">
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

    <payment-form />
  </main>
</template>

<script lang="ts" setup>
import getPrice from "~/utils/getPrice";
const config = useAppConfig();
const bcvUsd = useBcvUsd();


const description = "Reporte su pago del servicio de TV por cable.";

useHead({
  titleTemplate: 'Reporte su pago - %s',
  title() {
    return config.pwaManifest.short_name;
  },
  meta: [
    { name: 'description', content: description },
    { name: 'og:title', content: config.pwaManifest.short_name },
    { name: 'og:description', content: description },
  ]
});

// TODO: improve types
const isLoading = ref(false);
const datosDePago = ref<any>({});
const bancos = ref<any>([]);
const rif = ref<any>('');
const informacionPago = ref<any>({});

try {
  const graphql = useStrapiGraphQL();

  // TODO: improve types
  const query = await graphql<any>(`
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
          mensaje_formulario
        }
      }
    }
  }
`);

  datosDePago.value = query.data.datosDePago.data.attributes;
  bancos.value = query.data.datosDePago.data.attributes.banco;
  rif.value = query.data.datosDePago.data.attributes.rif;
  informacionPago.value =
    query.data.datosDePago.data.attributes.informacion_pago;
} catch (err) {
  console.log(err);
}

function loadingText(price: string) {
  return isLoading ? `Bs. ${price} / Mensual` : "...cargando precio";
}
</script>
