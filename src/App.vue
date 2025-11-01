<script setup lang="ts">
import CalendarComponent from "./components/Calendar-component.vue";

// вывод выбранной даты в консоль
function handleClickDay(date: string) {
  console.log(date);
}
</script>

<template>
  <div>
    <CalendarComponent language="ru" @date-select="handleClickDay" />
  </div>
</template>

<style scoped></style>
