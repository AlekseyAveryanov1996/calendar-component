<script setup lang="ts">
import IconNext from "./icons/Icon-next.vue";
import IconPrev from "./icons/Icon-prev.vue";
import { locales, defaultLocale, type LocaleKey } from "../locales.ts";
import { computed, onMounted, ref, watch } from "vue";
import type { CalendarDay } from "@/interfaces/CalendarDay.interface.ts";

interface Props {
  initialDate?: string;
  language?: LocaleKey;
}

const props = withDefaults(defineProps<Props>(), {
  initialDate: "",
  language: defaultLocale,
});

const emit = defineEmits<{
  "date-select": [date: string];
}>();

const currentDate = ref<Date>(new Date());
const selectedDate = ref<string | null | undefined>(null);

const localeData = computed(() => {
  const language = props.language as LocaleKey;
  return locales[language] || locales[defaultLocale];
});

function getMonthName(monthIndex: number): string {
  const result = localeData.value.months.full[monthIndex];
  if (typeof result === "string") {
    return result;
  }
  return "Unknown";
}

const calendarDays = computed((): CalendarDay[] => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();
  const calendarStart = new Date(firstDay);
  calendarStart.setDate(firstDay.getDate() - firstDayOfWeek);
  const days: CalendarDay[] = [];
  const today = new Date();
  const todayString = formatDate(today);

  for (let i = 0; i < 35; i++) {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + i);

    const dateString = formatDate(date);
    const isCurrentMonth = date.getMonth() === month;
    const isToday = dateString === todayString;
    const isSelected = selectedDate.value === dateString;

    days.push({
      id: dateString,
      date: dateString,
      day: date.getDate(),
      isCurrentMonth,
      isToday,
      isSelected,
    });
  }

  return days;
});

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function previousMonth(): void {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

function nextMonth(): void {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}

function selectDate(dateString: string): void {
  selectedDate.value = dateString;
  emit("date-select", dateString);
}

function initializeFromProps(): void {
  if (props.initialDate) {
    const [year, month, day] = props.initialDate.split("-").map(Number);

    if (
      typeof year === "number" &&
      typeof month === "number" &&
      typeof day === "number"
    ) {
      const initialDate = new Date(year, month - 1, day);

      if (!isNaN(initialDate.getTime())) {
        currentDate.value = new Date(year, month - 1, 1);
        selectedDate.value = props.initialDate;
      }
    }
  } else {
    const today = new Date();
    selectedDate.value = today.toISOString().split("T")[0];
  }
}

watch(
  () => props.initialDate,
  () => {
    initializeFromProps();
  }
);

onMounted(() => {
  initializeFromProps();
});
</script>

<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__prev" @click="previousMonth">
        <IconPrev />
      </div>
      <div class="calendar__month">
        {{ getMonthName(currentDate.getMonth()) }}
        {{ currentDate.getFullYear() }}
      </div>
      <div class="calendar__next" @click="nextMonth">
        <IconNext />
      </div>
    </div>

    <div class="calendar__weekdays">
      <div
        class="calendar__weekdays-day"
        v-for="day in localeData.days.minimal"
        :key="day"
      >
        {{ day }}
      </div>
    </div>

    <div class="calendar__grid">
      <div
        :class="[
          'calendar__day',
          {
            'other-month': !day.isCurrentMonth,
            today: day.isToday,
            selected: day.isSelected,
            clickable: day.isCurrentMonth,
          },
        ]"
        v-for="day in calendarDays"
        :key="day.id"
        @click="day.isCurrentMonth ? selectDate(day.date) : null"
      >
        <span class="calendar__day-number">
          {{ day.day }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  font-family: Arial, sans-serif;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calendar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.calendar__prev,
.calendar__next {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.calendar__month {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-top: 16px;
}

.calendar__weekdays-day {
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: #666;
  padding: 8px 0;
}

.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar__day {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  aspect-ratio: 1;
}

.calendar__day.clickable {
  cursor: pointer;
}

.calendar__day.other-month {
  color: #ccc;
}

.calendar__day.today {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: bold;
}

.calendar__day.selected {
  background: #1976d2;
  color: white;
  font-weight: bold;
}

.day-number {
  pointer-events: none;
}
</style>
