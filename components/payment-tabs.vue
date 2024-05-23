<script lang="ts" setup>
const option = defineModel<string>({
  default: "pagoMovil"
});
</script>

<template>
  <section class="tabs-section">
    <span class="title">Seleccione un método de pago</span>
    <div class="radio-buttons">
      <label class="radio-button">
        <input v-model="option" type="radio" value="tcInternational">
        <div class="radio-circle"></div>
        <span class="radio-label">Pago TC Internacional</span>
      </label>
      <label class="radio-button">
        <input v-model="option" type="radio" value="tcNacional">
        <div class="radio-circle"></div>
        <span class="radio-label">Pago TC Nacional</span>
      </label>
      <label class="radio-button">
        <input v-model="option" type="radio" value="pagoMovil">
        <div class="radio-circle"></div>
        <span class="radio-label">Pago Móvil</span>
      </label>
      <label class="radio-button">
        <input v-model="option" type="radio" value="transference">
        <div class="radio-circle"></div>
        <span class="radio-label">Transferencia</span>
      </label>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tabs-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 80vw;
  margin: 0 auto;
}

.title {
  font-size: 1.125rem;
  font-weight: 400;
  color: #666666;
}

.radio-buttons {
  display: flex;
  gap: 2rem;
  color: white;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.radio-button {
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}

.radio-button input[type="radio"] {
  display: none;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
  position: relative;
  margin-right: 10px;
}

.radio-circle::before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: all 0.2s ease-in-out;
}

.radio-button input[type="radio"]:checked + .radio-circle::before {
  transform: translate(-50%, -50%) scale(1);
  background-color: #555;
}

.radio-label {
  font-size: 1rem;
  font-weight: 500;
}

.radio-button:hover .radio-circle {
  border-color: #555;
}

.radio-button:hover input[type="radio"]:checked + .radio-circle::before {
  background-color: #555;
}

</style>