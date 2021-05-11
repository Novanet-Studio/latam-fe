<template>
  <section class="internet">
    <h2 class="internet__titulo">Internet por fibra</h2>
    <p class="internet__texto">
      Internet corporativo de alta velocidad. Conexión en fibra óptica dirigida
      a uso corporativo y residencial de alta gama.
    </p>
    <ul class="internet__planes">
      <li class="internet__planes__item">
        <h3 class="internet__planes__titulo">Corporativo</h3>
        <p class="internet__planes__texto">
          Gran velocidad para video conferencias, equipos en red, acceso remoto
          y transferencia de datos.
        </p>
        <ul class="internet__planes__velocidades">
          <li class="internet__planes__boton">5MB</li>
          <li class="internet__planes__boton">10M</li>
          <li class="internet__planes__boton">20M</li>
          <li class="internet__planes__boton">40M</li>
        </ul>
        <a href="" class="internet__planes__suscripcion">Suscríbete</a>
      </li>
      <li class="internet__planes__item">
        <h3 class="internet__planes__titulo">Residencial</h3>
        <p class="internet__planes__texto">
          Especial para equipos móviles, reproducción de streaming, conexiones
          simultáneas a altas velocidades.
        </p>
        <ul class="internet__planes__velocidades">
          <li class="internet__planes__boton">5MB</li>
          <li class="internet__planes__boton">10M</li>
          <li class="internet__planes__boton">20M</li>
          <li class="internet__planes__boton">40M</li>
        </ul>
        <a href="" class="internet__planes__suscripcion">Suscríbete</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PlanInternet',
}

import './PlanInternet.scss'
</script>
