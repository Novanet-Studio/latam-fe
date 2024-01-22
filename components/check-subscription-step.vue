<template>
  <div
    v-if="stepper.isCurrent('check-subscription')"
    class="check-subscription"
  >
    <select-input
      label="Contrato"
      id="contract"
      name="contract"
      default-text="Selecciona"
      :options="options"
    />
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';

const stepper = inject("stepper") as any;
const userData = inject("userData") as Latam.UserData;
const form = inject("form") as Latam.Form;

const { values } = useForm()

const options = computed(() => {
  let services: { text: string; value: string }[] = [];

  userData.datos?.forEach((item) => {
    item.servicios?.forEach((service) => {
      services.push({
        text: service.perfil,
        value: String(service.id),
      });
    });
  });

  return services
});

watch(values, () => {
  form.contract = values.contract
});
</script>

<style lang="scss">
.check-subscription {  
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  & select {
    width: 100%;
    padding: 0.5rem 0.8rem;
    // border-radius: .5rem;
    border: 1px solid transparent;
    border-radius: 1rem;
    background: #fff;
    min-width: 270px;
  }
}
</style>
