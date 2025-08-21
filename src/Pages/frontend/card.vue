<script setup>
import { ref } from 'vue';
const message = ref('Card');
</script>
<template>
  <!--ใส่เนื้อหาเว็บตรงนี้-->
  <div class="body-text">
    <main>
      <h1>{{ message }}</h1>
    </main>
  </div>
</template>
<script scope>
export default {
  name: "Card",
};
</script>

<style>
.body-text {
  position: absolute;
  top: 25%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: left;
  padding: 0 30px;
}

.body-text div {
  font-size: 45px;
  font-weight: 600;
}
</style>