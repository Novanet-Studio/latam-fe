<template>
  <div class="formulario__form__grupo">
    <button type="submit" class="formulario__form__boton" :disabled="isLoading || disabled">
      <template v-if="isLoading">
        <slot name="indicator">Enviando...</slot>
      </template>
      <template v-else>
        <slot />
      </template>
    </button>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  type?: 'button' | 'submit';
  isLoading?: boolean;
  disabled?: boolean | ComputedRef<boolean>;
};

type Emits = {
  (e: 'click'): void;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
});
defineEmits<Emits>();
</script>