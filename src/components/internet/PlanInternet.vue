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

        <ul class="internet__planes__lista">
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">5MB</h3>
              <p class="internet__planes__texto">Bs. 5.422.742,00 / Mensual</p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">10MB</h3>
              <p class="internet__planes__texto">Bs. 13.556.856,00 / Mensual</p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">20MB</h3>
              <p class="internet__planes__texto">Bs. 27.036.466,00 / Mensual</p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">40MB</h3>
              <p class="internet__planes__texto">Bs. 33.556.856,00 / Mensual</p>
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

        <ul class="internet__planes__lista">
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">5MB</h3>
              <p class="internet__planes__texto">Bs. 5.422.742,00 / Mensual</p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">10MB</h3>
              <p class="internet__planes__texto">Bs. 13.556.856,00 / Mensual</p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">20MB</h3>
              <p class="internet__planes__texto">Bs. 27.036.466,00 / Mensual</p>
            </a>
          </li>
          <li class="internet__planes__velocidades">
            <a class="internet__planes__boton" href="#">
              <h3 class="internet__planes__subtitulo">40MB</h3>
              <p class="internet__planes__texto">Bs. 33.556.856,00 / Mensual</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PlanInternet',
}

import './PlanInternet.scss'
</script>
