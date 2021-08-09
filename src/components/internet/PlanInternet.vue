<template>
  <section class="internet">
    <div class="internet__planes">
      <div class="internet__planes__item">
        <div class="internet__planes__cabecera">
          <h3 class="internet__planes__titulo">Corporativo</h3>
          <p class="internet__planes__texto">
            Gran velocidad para videoconferencia, equipo en red, acceso remotos,
            carga y descarga.
          </p>
        </div>

        <ul
          class="internet__planes__lista"
          v-for="{ node } in $static.internet.edges"
          :key="node.id"
        >
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">2M</h3>
              <p class="internet__planes__texto">
                {{ loadingText(getPrice(node.precio_corporativo.dos_megas)) }}
              </p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">5M</h3>
              <p class="internet__planes__texto">
                {{
                  loadingText(getPrice(node.precio_corporativo.cuatro_megas))
                }}
              </p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">10M</h3>
              <p class="internet__planes__texto">
                {{ loadingText(getPrice(node.precio_corporativo.diez_megas)) }}
              </p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">20M</h3>
              <p class="internet__planes__texto">
                {{
                  loadingText(getPrice(node.precio_corporativo.veinte_megas))
                }}
              </p>
            </a>
          </li>
        </ul>
      </div>

      <div class="internet__planes__item">
        <div class="internet__planes__cabecera">
          <h3 class="internet__planes__titulo">Residencial</h3>
          <p class="internet__planes__texto">
            Especial para equipos móviles, conexiones simultáneas. Carga y
            descarga en altas velocidades, acceso remoto, reproducción de
            streaming, redes sociales y mucho más.
          </p>
        </div>

        <ul
          class="internet__planes__lista"
          v-for="{ node } in $static.internet.edges"
          :key="node.id"
        >
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">2M</h3>
              <p class="internet__planes__texto">
                {{
                  loadingText(getPrice(node.precio_residencial.cuatro_megas))
                }}
              </p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">8M</h3>
              <p class="internet__planes__texto">
                {{ loadingText(getPrice(node.precio_residencial.ocho_megas)) }}
              </p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">10M</h3>
              <p class="internet__planes__texto">
                {{ loadingText(getPrice(node.precio_residencial.diez_megas)) }}
              </p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">20M</h3>
              <p class="internet__planes__texto">
                {{
                  loadingText(getPrice(node.precio_residencial.veinte_megas))
                }}
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<static-query>
  query {
    internet: allStrapiInternet {
      edges {
        node {
          precio_corporativo {
            dos_megas
            cuatro_megas
            diez_megas
            veinte_megas
          }
          precio_residencial {
            cuatro_megas
            ocho_megas
            diez_megas
            veinte_megas
          }
        }
      }
    }
  }
</static-query>

<script>
import getFullPrice from '../../utils/getFullPrice'

export default {
  name: 'PlanInternet',
  data: () => ({
    isLoading: false,
    dollarPrice: '',
  }),
  methods: {
    getPrice(dollarMount) {
      const totalPrice = getFullPrice(dollarMount, this.dollarPrice)
      return totalPrice
    },
    loadingText(price) {
      return this.isLoading ? '...cargando precio' : `Bs. ${price} / Mensual`
    },
  },
  async mounted() {
    this.isLoading = true
    const exchangeApi = 'https://api.exchangedyn.com/free/quotes/usdves'
    const response = await fetch(exchangeApi)
    const api = await response.json()
    const [globalApi] = api.sources

    this.dollarPrice = globalApi.quote
    this.isLoading = false
  },
}

import './PlanInternet.scss'
</script>
