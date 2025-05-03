<template>
  <div
    class="xf-calendar xf-my-4 xf-mx-auto xf-bg-white xf-p-3 xf-border-grey-lighten-2"
  >
    <div
      class="xf-flex xf-flex-justify-content-between xf-flex-align-items-center xf-mb-2"
    >
      <button
        class="xf-cursor-pointer xf-bg-none xf-border-none"
        @click="changeMonth(false)"
      >
        <xf-icon src="arrow-left" internal />
      </button>

      <h2 class="xf-m-0">{{ monthYear }}</h2>

      <button
        class="xf-cursor-pointer xf-bg-none xf-border-none"
        @click="changeMonth(true)"
      >
        <xf-icon src="arrow-right" internal />
      </button>
    </div>

    <div class="xf-calendar-days xf-grid xf-gap-1">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="day-name xf-fw-700 xf-text-center xf-py-2 xf-bg-grey-lighten-5"
      >
        {{ day }}
      </div>

      <div
        v-for="n in firstDayOfMonth"
        :key="'empty-' + n"
        class="xf-calendar-day xf-calendar-day__empty xf-text-center xf-py-2 xf-cursor-pointer"
      />

      <div
        v-for="day in daysInMonth"
        :key="'day-' + day"
        :class="[
          'xf-calendar-day xf-text-center xf-py-2 xf-cursor-pointer',
          {
            'xf-fw-700 xf-border-black': isToday(day),
            'xf-text-colour-grey-lighten-2 xf-cursor-not-allowed':
              !isAvailableDay(day) || isOutOfBounds(day),
            [`xf-bg-${unavailableColour} xf-cursor-not-allowed`]:
              !isAvailableDate(day) &&
              isAvailableDay(day) &&
              !isOutOfBounds(day),
            [`xf-bg-${availableColour}`]:
              isAvailableDate(day) &&
              isAvailableDay(day) &&
              !isSelectedDate(day) &&
              !isOutOfBounds(day),
            'xf-fw-700 xf-bg-black xf-text-colour-white': isSelectedDate(day),
          },
        ]"
        @click="daySelected(day)"
      >
        {{ day }}

        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

import { ref, computed } from "vue";
import { formatDate } from "@/composables/date";

import XfIcon from "@/components/XfIcon/XfIcon.vue";

type DateRange = {
  from: string;
  to: string;
};

// ** Props **
const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  availableDays: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  availableDates: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  availableColour: {
    type: String,
    default: "green-lighten-5",
  },
  unavailableColour: {
    type: String,
    default: "red-lighten-5",
  },
  minDate: {
    type: String,
    default: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const day = String(yesterday.getDate()).padStart(2, "0");
      const month = String(yesterday.getMonth() + 1).padStart(2, "0");
      const year = yesterday.getFullYear();

      return `${day}-${month}-${year}`;
    },
  },
  maxDate: {
    type: String,
    default: "",
  },
});

// ** Data **
const today: Date = new Date();
const currentDate = ref<Date>(new Date());

const daysOfWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ** Emits **
const emit = defineEmits<{
  (e: "update:date", date: string): void;
  (e: "update:range", range: DateRange): void;
}>();

// ** Computed **
// Displayed month and year label (e.g., "May 2025")
const monthYear = computed<string>(() =>
  currentDate.value.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  }),
);

// Get the index (0-based) of the first weekday in the month
const firstDayOfMonth = computed<number>(() => {
  const first = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1,
  );
  // Adjust so Monday = 0, Sunday = 6
  return (first.getDay() + 6) % 7;
});

// Return an array of day numbers for the current month
const daysInMonth = computed<number[]>(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1; // Note: months are 0-based
  const days = new Date(year, month, 0).getDate(); // 0th day of next month = last day of current month

  return Array.from({ length: days }, (_, i) => i + 1); // [1, 2, ..., days]
});

// ** Methods **
// Check if a date is outside of minDate or maxDate boundaries
const isOutOfBounds = (day: number): boolean => {
  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );

  if (props.minDate) {
    const min = new Date(props.minDate.split("-").reverse().join("-")); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
    if (date < min) return true;
  }

  if (props.maxDate) {
    const max = new Date(props.maxDate.split("-").reverse().join("-"));
    if (date > max) return true;
  }

  return false;
};

// Check if the day falls on an allowed weekday (Mon-Sun)
const isAvailableDay = (day: number): boolean => {
  if (!props.availableDays || props.availableDays.length === 0) return true;

  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );

  const dayName = daysOfWeek[(date.getDay() + 6) % 7].toLowerCase();
  return props.availableDays.includes(dayName);
};

// Check if the specific date (by dd-mm-yyyy) is in the list of availableDates
const isAvailableDate = (day: number): boolean => {
  if (!props.availableDates || props.availableDates.length === 0) return true;

  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );

  const formattedDate = formatDate(date); // Assume this returns 'dd-mm-yyyy'
  return props.availableDates.includes(formattedDate);
};

// Check if the current day is the selected date
const isSelectedDate = (day: number): boolean => {
  if (!props.date) return false;

  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );

  return formatDate(date) === props.date;
};

// Emit selected date to parent component
const daySelected = (day: number): void => {
  const selectedDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );

  emit("update:date", formatDate(selectedDate));
};

// Move calendar month forward or backward
const changeMonth = (forward: boolean): void => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + (forward ? 1 : -1),
    1,
  );
};

// Highlight today's date
const isToday = (day: number): boolean => {
  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
</script>

<style scoped lang="scss">
.xf-calendar {
  max-width: 680px;
  border-radius: 10px;

  &-days {
    grid-template-columns: repeat(7, 1fr);

    .xf-calendar-day {
      border-radius: 5px;
      transition: background 0.3s;

      &:hover {
        background-color: #eee;
      }

      &__empty {
        visibility: hidden;

        &:hover {
          background-color: transparent !important;
        }
      }
    }
  }
}
</style>
