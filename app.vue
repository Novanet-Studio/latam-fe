<template>
  <NuxtLayout>
    <NuxtPwaManifest />

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <NuxtPage />
  </NuxtLayout>
</template>
