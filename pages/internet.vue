<script lang="ts" setup>
import getPrice from "~/utils/getPrice";
const config = useAppConfig();

const description =
  "Internet en fibra óptica de alta velocidad para empresas y hogares.";

useHead({
  titleTemplate: "Internet fibra óptica de alta velocidad - %s",
});

const isLoading = ref(false);
const tiposPlanes = ref<any>([]);
const bcvUsd = useBcvUsd();

try {
  isLoading.value = true;
  const graphql = useStrapiGraphQL();

  const internetQuery = await graphql<any>(`
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
    }
  `);

  tiposPlanes.value = internetQuery.data.planInternet.data.attributes.tipo;
} catch (err) {
  console.log(err);
} finally {
  isLoading.value = false;
}

const loadingText = (price: string) =>
  !isLoading.value ? `Bs. ${price} / Mensual` : "Cargando precio...";
</script>

<template>
  <main class="internetvista">
    <section class="hero">
      <div class="hero__internet">
        <a
          class="hero__internet__box"
          href="http://cloud.latinamericancable.com:8922/"
          target="_blank"
        >
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
    <template>
      <main class="reporte"></main>
    </template>

    <section class="internet">
      <div class="internet__planes">
        <div
          class="internet__planes__item"
          v-for="(tipo, index) in tiposPlanes"
          :key="index"
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
              :key="plan.id"
            >
              <div class="internet__planes__boton">
                <h3 class="internet__planes__subtitulo">{{ plan.nombre }}</h3>
                <p class="internet__planes__texto">
                  {{ loadingText(getPrice(plan.precio_usd, bcvUsd)) }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <whatsapp-banner />
  </main>
</template>
