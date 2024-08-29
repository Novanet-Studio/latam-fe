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
    <section class="hero politicas">
      <div class="hero__mensaje">
        <div class="hero__mensaje__box">
          <div class="hero__mensaje__icon hero__mensaje__icon--politicas"></div>
          <div class="hero__mensaje__info">
            <h1 class="hero__mensaje__title">Política de Privacidad</h1>
            <p class="hero__mensaje__text">
              Última actualización: 01/01/2024
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="info-b">
      <h3 class="info-b__titulo-a">1. Introducción</h3>
      <p class="info-b__texto">
        Latin American Cable y Latin American Cable TV valora la privacidad de sus usuarios y se compromete a proteger
        la información personal que se recolecta a través de nuestra aplicación. Esta Política de Privacidad explica
        cómo recopilamos, usamos, y compartimos su información cuando utiliza nuestra aplicación IPTV.
      </p>
      <h3 class="info-b__titulo-a">2. Información que Recopilamos</h3>
      <ul class="info-b__lista">
        <li><strong>Información de Identificación Personal (IIP):</strong> Podemos recopilar información personal como
          su
          nombre, dirección de correo electrónico, y dirección IP cuando usted crea una cuenta o se comunica con nuestro
          servicio de soporte.</li>
        <li><strong>Información No Identificable Personalmente (IINP):</strong> Recopilamos información sobre cómo se
          utiliza la aplicación, como la hora de acceso, la dirección IP, la ubicación geográfica aproximada y el
          dispositivo utilizado.</li>
        <li><strong>Datos de Uso:</strong> Recopilamos información sobre cómo interactúa con la aplicación, incluyendo
          los canales visualizados, la duración de las sesiones y otras estadísticas de uso.</li>
      </ul>
      <h3 class="info-b__titulo-a">3. Uso de la Información</h3>
      <p class="info-b__texto">
        La información recopilada se utiliza para:
      </p>
      <ul class="info-b__lista">
        <li>Proveer y mejorar la funcionalidad de la aplicación.</li>
        <li>Personalizar la experiencia del usuario.</li>
        <li>Responder a consultas y solicitudes de soporte.</li>
        <li>Enviar notificaciones importantes y actualizaciones.</li>
        <li>Cumplir con las leyes y regulaciones aplicables.</li>
      </ul>

      <h3 class="info-b__titulo-a">4. Compartir Información con Terceros</h3>
      <p class="info-b__texto">
        No compartimos su información personal con terceros, excepto en las siguientes circunstancias:
      </p>
      <ul class="info-b__lista">
        <li><strong>Proveedores de Servicios:</strong> Podemos compartir su información con proveedores de servicios que
          nos ayudan a operar nuestra aplicación (por ejemplo, proveedores de hosting, servicios de análisis).</li>
        <li><strong>Cumplimiento Legal:</strong> Podemos divulgar su información si es requerido por la ley o en
          respuesta a solicitudes válidas de autoridades públicas.</li>
      </ul>
      <h3 class="info-b__titulo-a">5. Retención de Datos</h3>
      <p class="info-b__texto">
        Mantendremos su información personal solo durante el tiempo que sea necesario para cumplir con los propósitos
        descritos en esta Política de Privacidad, a menos que se requiera un período de retención más largo o permitido
        por la ley.
      </p>
      <h3 class="info-b__titulo-a">6. Seguridad</h3>
      <p class="info-b__texto">
        Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra el
        acceso no autorizado, alteración, divulgación o destrucción.
      </p>


      <h3 class="info-b__titulo-a">7. Sus Derechos</h3>
      <p class="info-b__texto">
        Dependiendo de su ubicación, usted puede tener ciertos derechos respecto a su información personal, como el
        derecho a acceder, corregir o eliminar su información. Para ejercer estos derechos, por favor contacte con
        nuestro equipo de soporte.
      </p>
      <h3 class="info-b__titulo-a">8. Cambios a esta Política de Privacidad</h3>
      <p class="info-b__texto">
        Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre cualquier cambio
        publicando la nueva política en esta página y actualizando la fecha de vigencia.
      </p>
      <h3 class="info-b__titulo-a">9. Contacto</h3>
      <p class="info-b__texto">
        Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos en
        privacidad@latinamericancable.com.
      </p>
    </section>
  </main>
</template>
