<script lang="ts" setup>
const config = useAppConfig();

useHead({
  titleTemplate: "TV por cable e Internet fibra óptica de alta velocidad - %s",
});

const planesInternet = ref();
const graphql = useStrapiGraphQL();

try {
  const query = await graphql<any>(`
    query {
      planInternet {
        data {
          attributes {
            tipo {
              id
              nombre
              descripcion
              planes {
                nombre
                precio_usd
              }
            }
          }
        }
      }
    }
  `);
  planesInternet.value = query.data.planInternet.data.attributes.tipo;
} catch (err) {
  planesInternet.value = [];
  console.log(err);
}
</script>

<template>
  <main class="inicio">
    <section class="hero">
      <div class="hero__tv">
        <a class="hero__tv__box" href="#canales">
          <div class="hero__tv__icon"></div>
          <div class="hero__tv__info">
            <h1 class="hero__tv__title">TV por cable</h1>
            <p class="hero__tv__text">
              ¡Son más de 100 canales!.<br />
              Tenemos nuevos canales para disfrutar en familia.
            </p>
          </div>
        </a>
      </div>
      <div class="hero__internet">
        <nuxt-link class="hero__internet__box" to="/internet">
          <div class="hero__internet__icon"></div>
          <div class="hero__internet__info">
            <h1 class="hero__internet__title">Internet por fibra</h1>
            <p class="hero__internet__text">
              Conexión en fibra óptica de alta velocidad para uso corporativo y
              residencial.
            </p>
          </div>
        </nuxt-link>
      </div>
    </section>

    <section class="pago">
      <div class="pago__icon">
        <img
          class="pago__icon__imagen"
          alt="Latin American Cable Pago icono"
          src="../assets/images/latinamericancable-pago-icon.svg"
        />
      </div>
      <a
        href="http://cloud.latinamericancable.com:8922/"
        target="_blank"
        class="pago__boton"
        >Notifíque su pago aquí</a
      >
    </section>

    <channel-list />

    <section class="tv">
      <div class="tv__banner">
        <h3 class="tv__banner__titulo">
          Más de 100 canales para disfrutar en familia
        </h3>
        <p class="tv__banner__texto">
          <strong>Hasta 3 televisores</strong> por la misma mensualidad
        </p>
        <a class="tv__banner__boton" href="/contacto/">Suscríbete ahora</a>
      </div>
    </section>

    <section class="internet">
      <h2 class="internet__titulo">Internet por fibra</h2>
      <p class="internet__texto">
        Internet corporativo de alta velocidad. Conexión en fibra óptica
        dirigida a uso corporativo y residencial de alta gama.
      </p>

      <div class="internet__banner">
        <h3 class="internet__banner__titulo">
          Ingresa al sistema de gestion de internet
        </h3>
        <p class="internet__banner__texto">
          Administra y todo lo relacionado con el servicio de internet
        </p>
        <a
          class="internet__banner__boton"
          href="http://cloud.latinamericancable.com:8922/"
          target="_blank"
          >Acceder ahora</a
        >
      </div>

      <ul class="internet__planes">
        <li
          class="internet__planes__item"
          v-for="(item, index) in planesInternet"
          :key="index"
        >
          <h3 class="internet__planes__titulo">{{ item.nombre }}</h3>
          <p class="internet__planes__texto">{{ item.descripcion }}</p>

          <ul class="internet__planes__velocidades">
            <li
              class="internet__planes__boton"
              v-for="(i, index) in item.planes"
              :key="index"
            >
              {{ i.nombre }}
            </li>
          </ul>
          <a href="" class="internet__planes__suscripcion">Suscríbete</a>
        </li>
      </ul>
    </section>
  </main>
</template>
