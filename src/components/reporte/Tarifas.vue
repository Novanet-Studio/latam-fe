<template>
  <section class="tarifas">
    <h2 class="tarifas__titulo">A nuestra distinguida clientela</h2>
    <p class="tarifas__texto">
      {{$static.tarifas.edges[0].node.mensaje_principal}}
    </p>
    <ul class="tarifas__tipo" v-for="{ node } in $static.tarifas.edges" :key="node.id">
      <li class="tarifas__tipo__item">
        <h3 class="tarifas__tipo__titulo">
          Total a pagar para 1,2 y 3 televisores
        </h3>
        <p class="tarifas__tipo__texto">
          {{
            loadingText(getPrice(node.precio_tres_tv))
          }}
        </p>
      </li>
      <li class="tarifas__tipo__item">
        <h3 class="tarifas__tipo__titulo">Total a pagar para 4 televisores</h3>
        <p class="tarifas__tipo__texto">
          {{
            loadingText(getPrice(node.precio_cuatro_tv))
          }}
        </p>
      </li>
    </ul>
  </section>
</template>

<static-query>
  query {
    tarifas: allStrapiReportes {
      edges {
        node {
          mensaje_principal
          precio_tres_tv
          precio_cuatro_tv
        }
      }
    }
  }
</static-query>

<script>
import getFullPrice from '../../utils/getFullPrice'

export default {
  name: 'Tarifas',
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

import './Tarifas.scss'
</script>
