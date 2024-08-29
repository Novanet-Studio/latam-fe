<script lang="ts" setup>
const config = useAppConfig();
const description =
  "Ponte en contacto con nosotros y déjanos los detalles de tu solicitud en nuestro canal de atención al Ciente en WhatsApp.";

useHead({
  titleTemplate: 'Términos y condiciones - %s',
});
</script>

<template>
  <main class="contacto">
    <section class="hero condiciones">
      <div class="hero__mensaje">
        <div class="hero__mensaje__box">
          <div class="hero__mensaje__icon--terminos"></div>
          <div class="hero__mensaje__info">
            <h1 class="hero__mensaje__title">Términos y condiciones</h1>
            <p class="hero__mensaje__text">
              Última actualización: 01/07/2023
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="info-b">
      <h3 class="info-b__titulo-a">1. Generalidades</h3>
      <p class="info-b__texto">
        El uso del servicio Latin American Cable TV está condicionado a la aceptación de los términos descritos en este
        documento, así como a las políticas de privacidad de Latin American Cable.
      </p>
      <h3 class="info-b__titulo-a">2. Definiciones</h3>
      <p class="info-b__texto">
        A continuación se presentan las definiciones relevantes a estos términos y condiciones:
      </p>
      <h3 class="info-b__titulo-a">3. Descripción del servicio</h3>
      <p class="info-b__texto">
        Latin American Cable TV es un servicio adicional ofrecido por Latin American Cable que brinda contenido extra a
        sus suscriptores a través de su plataforma digital.
      </p>
      <h3 class="info-b__titulo-a">4. Requisitos de acceso</h3>
      <p class="info-b__texto">
        Para acceder a Latin American Cable TV, los usuarios deben ser suscriptores activos de Latin American Cable y
        cumplir con los requisitos técnicos detallados en nuestro sitio web.
      </p>
      <h3 class="info-b__titulo-a">5. Responsabilidades del usuario</h3>
      <p class="info-b__texto">
        El usuario se compromete a utilizar Latin American Cable TV conforme a los términos aquí expuestos y es
        responsable de mantener la seguridad de su cuenta personal.
      </p>
      <h3 class="info-b__titulo-a">6. Propiedad intelectual</h3>
      <p class="info-b__texto">
        Todo el material disponible a través de Latin American Cable TV, incluyendo texto, gráficos y software, es
        propiedad de Latin American Cable o de sus licenciantes, y está protegido por las leyes de propiedad
        intelectual.
      </p>
      <h3 class="info-b__titulo-a">7. Modificaciones del servicio</h3>
      <p class="info-b__texto">
        Latin American Cable se reserva el derecho de modificar, suspender o descontinuar Latin American Cable TV en
        cualquier momento y sin previo aviso.
      </p>
      <h3 class="info-b__titulo-a">8. Limitación de responsabilidad</h3>
      <p class="info-b__texto">
        Latin American Cable no se hace responsable de daños o pérdidas que puedan surgir del uso de Latin American
        Cable TV.
      </p>
      <h3 class="info-b__titulo-a">9. Legislación aplicable</h3>
      <p class="info-b__texto">
        Estos términos y condiciones se rigen por las leyes de Venezuela y serán interpretados conforme a ellas.
      </p>
      <h3 class="info-b__titulo-a">10. Contacto</h3>
      <p class="info-b__texto">
        Para consultas relacionadas con Latin American Cable Plus, por favor, contacte a nuestro servicio al cliente.
      </p>

    </section>
  </main>
</template>
