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

    <section class="pago">
      <div class="pago__icon">
        <img
          class="pago__icon__imagen"
          alt="Latin American Cable Pago icono"
          src="../../assets/images/latinamericancable-pago-icon.svg"
        />
      </div>
      <NuxtLink to="/" class="pago__boton">Notifíque su pago aquí</NuxtLink>
    </section>

    <section class="canales" id="canales">
      <AccordionList
        v-model:state="state"
        :open-multiple-items="openMultipleItems"
      >
        <Categoria :content="nacionales" titulo="Nacionales" />
        <Categoria :content="internacionales" titulo="Internacionales" />
        <Categoria :content="syp" titulo="Series y películas" />
        <Categoria :content="deportivos" titulo="Deportes" />
        <Categoria :content="variedades" titulo="Variedades" />
        <Categoria :content="infantiles" titulo="Jóvenes y niños" />
      </AccordionList>
    </section>

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
          href="https://190.216.243.210:8822/"
          target="_blank"
          >Acceder ahora</a
        >
      </div>

      <ul class="internet__planes">
        <li class="internet__planes__item">
          <h3 class="internet__planes__titulo">Corporativo</h3>
          <p class="internet__planes__texto">
            Gran velocidad para video conferencias, equipos en red, acceso
            remoto y transferencia de datos.
          </p>
          <ul class="internet__planes__velocidades">
            <li class="internet__planes__boton">5M</li>
            <li class="internet__planes__boton">10M</li>
            <li class="internet__planes__boton">20M</li>
            <li class="internet__planes__boton">50M</li>
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
            <li class="internet__planes__boton">5M Plan Social</li>
            <li class="internet__planes__boton">10M</li>
            <li class="internet__planes__boton">20M</li>
            <li class="internet__planes__boton">40M</li>
          </ul>
          <a href="" class="internet__planes__suscripcion">Suscríbete</a>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { AccordionList } from "vue3-rich-accordion";
import "vue3-rich-accordion/accordion-library-styles.css";
import "./index.scss";

import {
  nacionales,
  syp,
  deportivos,
  variedades,
  infantiles,
  internacionales,
} from "../utils/categorias";

import { computed, ref } from "vue";

const state = ref<Record<string, boolean>>({});
const openMultipleItems = ref(false);


</script>
