<template>
  <NuxtLayout>
    <button @click="push.success('Something good has been pushed!')">Push</button>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
    <NuxtPage />
  </NuxtLayout>
</template>
