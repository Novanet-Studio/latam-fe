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

    <section class="canales">
      <AccordionList
        v-model:state="state"
        :open-multiple-items="openMultipleItems"
      >
        <AccordionItem id="mId1" default-opened>
          <template #summary> Summary one</template>
          <template #icon>☝️</template>
          <h3>Dynamic content reaction</h3>
          <div>
            <button @click="addContentLine">Add dynamic lines</button>
            <button @click="removeContentLine">Remove dynamic lines</button>
          </div>
          <div v-for="(line, index) in contentLines" :key="index">
            {{ line }}
          </div>
          <h3>
            All content is provided by slots (f.g. you can nest another
            accordion)
          </h3>
        </AccordionItem>
        <AccordionItem id="mId2" disabled>
          <template #summary
            >This item is disabled you can control it via v-model</template
          >
          <template #icon> 💀</template>
          You can control it via v-model
        </AccordionItem>
        <AccordionItem v-for="item in dynamicItems" :key="item">
          <template #summary>This item is dynamically added</template>
          <template #icon>D</template>
          {{ item }}
        </AccordionItem>
        <AccordionItem id="mId3">
          <template #summary>Last item (with default icon) here</template>
          <div>
            <h1>
              Please subscribe
              <a href="https://www.youtube.com/channel/UCxKF1Edfy3LfvAsnveD-OVA"
                >youtube channel</a
              >,
              <a href="https://t.me/developers_workshop">telegram channel</a>,
              share video, stay stars and likes
            </h1>
          </div>
        </AccordionItem>
      </AccordionList>
    </section>
  </main>
</template>

<script setup>
import { AccordionList, AccordionItem } from "vue3-rich-accordion";
import "vue3-rich-accordion/accordion-library-styles.css";

import "./index.scss";
</script>
