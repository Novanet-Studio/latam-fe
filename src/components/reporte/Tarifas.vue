<template>
  <section class="tarifas">
    <h2 class="tarifas__titulo">A nuestra distinguida clientela</h2>
    <p class="tarifas__texto">
      {{ $static.tarifas.edges[0].node.mensaje_principal }}
    </p>
    <ul
      class="tarifas__tipo"
      v-for="{ node } in $static.tarifas.edges"
      :key="node.id"
    >
      <li class="tarifas__tipo__item">
        <h3 class="tarifas__tipo__titulo">
          Total a pagar para 1,2 y 3 televisores
        </h3>
        <p class="tarifas__tipo__texto">
          {{
            loadingText(
              getPrice(
                node.precio_tres_tv,
                $static.datos.edges[0].node.bcv_usd,
              ),
            )
          }}
        </p>
      </li>
      <li class="tarifas__tipo__item">
        <h3 class="tarifas__tipo__titulo">Total a pagar para 4 televisores</h3>
        <p class="tarifas__tipo__texto">
          {{
            loadingText(
              getPrice(
                node.precio_cuatro_tv,
                $static.datos.edges[0].node.bcv_usd,
              ),
            )
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
    datos: allStrapiDatosPago {
      edges {
        node {
          bcv_usd
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
  }),
  methods: {
    getPrice(dollarMount, dollarPrice) {
      const dollar = dollarPrice.trim().replace(/\./g, '').replace(',', '.')
      const totalPrice = getFullPrice(dollarMount, dollar)
      return totalPrice
    },
    loadingText(price) {
      return this.isLoading ? '...cargando precio' : `Bs. ${price} / Mensual`
    },
  },
}

import './Tarifas.scss'
</script>
