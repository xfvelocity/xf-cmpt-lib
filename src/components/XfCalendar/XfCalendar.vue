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

      <!-- Empty slots to align the first day of the month correctly -->
      <div
        v-for="n in firstDayOfMonth"
        :key="'empty-' + n"
        class="xf-calendar-day xf-calendar-day__empty xf-text-center xf-py-2 xf-cursor-pointer"
      />

      <!-- Display the days of the current month -->
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
              !isInRange(day) &&
              !isOutOfBounds(day),
            'xf-fw-700 xf-bg-black xf-text-colour-white':
              isSelectedDate(day) || isInRange(day),
          },
        ]"
        @click="daySelected(day)"
      >
        {{ day }}

        <!-- Slot for custom content, passing the current day, month, year, and full date -->
        <slot
          :day="day"
          :month="selectedMonth"
          :year="selectedYear"
          :date="`${day}-${selectedMonth}-${selectedYear}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref, computed, onMounted, watch } from "vue";
import { formatDate } from "@/composables/date";
import XfIcon from "@/components/XfIcon/XfIcon.vue";

// Define types for date range
type DateRange = {
  from: string;
  to: string;
};

// ** Props **
const props = defineProps({
  date: {
    type: [String, Object] as PropType<string | DateRange>,
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
  range: {
    type: Boolean,
    default: false,
  },
});

// ** Emits **
const emit = defineEmits<{
  (e: "update:date", date: string | DateRange): void;
}>();

// ** Data **
const today: Date = new Date();
const currentDate = ref<Date>(new Date());
const selectedMonth = ref<number>(currentDate.value.getMonth());
const selectedYear = ref<number>(currentDate.value.getFullYear());

// Track start and end dates for range selection
const rangeStart = ref<string | null>(null);
const rangeEnd = ref<string | null>(null);

// Days of the week array
const daysOfWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

// Parse date string in format dd-mm-yyyy to Date object
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Initialize calendar view to show the month containing the start date
const initializeCalendarView = () => {
  let dateToShow: Date;

  if (typeof props.date === "string") {
    dateToShow = parseDate(props.date);
  } else if (props.date && "from" in props.date && props.date.from) {
    dateToShow = parseDate(props.date.from);
  } else {
    dateToShow = new Date(); // Default to current date
  }

  currentDate.value = new Date(
    dateToShow.getFullYear(),
    dateToShow.getMonth(),
    1,
  );
  selectedMonth.value = currentDate.value.getMonth();
  selectedYear.value = currentDate.value.getFullYear();
};

// Initialize range values from props
const initializeRangeValues = () => {
  if (typeof props.date === "object" && props.date && "from" in props.date) {
    rangeStart.value = props.date.from;
    rangeEnd.value = props.date.to;
  } else if (typeof props.date === "string") {
    rangeStart.value = props.date;
    rangeEnd.value = null;
  }
};

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

// Check if the current day is the selected date or range
const isSelectedDate = (day: number): boolean => {
  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );
  const formatted = formatDate(date);

  if (props.range) {
    return formatted === rangeStart.value || formatted === rangeEnd.value;
  }

  if (typeof props.date === "string") {
    return formatted === props.date;
  }

  return formatted === rangeStart.value || formatted === rangeEnd.value;
};

// Check if the day is within the selected date range
const isInRange = (day: number): boolean => {
  if (!rangeStart.value || !rangeEnd.value) {
    return false;
  }

  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );
  const formatted = formatDate(date);

  // Don't count the endpoint dates as "in range" (they're selected dates)
  if (formatted === rangeStart.value || formatted === rangeEnd.value) {
    return false;
  }

  const from = parseDate(rangeStart.value);
  const to = parseDate(rangeEnd.value);

  return date >= from && date <= to;
};

// Emit selected date or range to parent component
const daySelected = (day: number): void => {
  if (!isAvailableDay(day) || !isAvailableDate(day) || isOutOfBounds(day)) {
    return; // Don't allow selection of unavailable days
  }

  const selectedDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );
  const formatted = formatDate(selectedDate);

  if (props.range) {
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      rangeStart.value = formatted;
      rangeEnd.value = null;
      emit("update:date", { from: formatted, to: "" });
    } else {
      const start = parseDate(rangeStart.value);
      if (selectedDate >= start) {
        rangeEnd.value = formatted;
        emit("update:date", { from: rangeStart.value, to: formatted });
      } else {
        // If selecting a date before the start date, swap them
        rangeEnd.value = rangeStart.value;
        rangeStart.value = formatted;
        emit("update:date", { from: formatted, to: rangeEnd.value });
      }
    }
  } else {
    rangeStart.value = formatted;
    rangeEnd.value = null;
    emit("update:date", formatted);
  }
};

// Move calendar month forward or backward
const changeMonth = (forward: boolean): void => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + (forward ? 1 : -1),
    1,
  );

  selectedMonth.value = currentDate.value.getMonth();
  selectedYear.value = currentDate.value.getFullYear();
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

// Watch for changes in the date prop
watch(
  () => props.date,
  (newValue) => {
    if (typeof newValue === "object" && newValue && "from" in newValue) {
      rangeStart.value = newValue.from;
      rangeEnd.value = newValue.to;

      // If from date is provided, update the calendar view to show that month
      if (newValue.from) {
        const fromDate = parseDate(newValue.from);
        currentDate.value = new Date(
          fromDate.getFullYear(),
          fromDate.getMonth(),
          1,
        );
        selectedMonth.value = currentDate.value.getMonth();
        selectedYear.value = currentDate.value.getFullYear();
      }
    } else if (typeof newValue === "string") {
      rangeStart.value = newValue;
      rangeEnd.value = null;

      if (newValue) {
        const date = parseDate(newValue);
        currentDate.value = new Date(date.getFullYear(), date.getMonth(), 1);
        selectedMonth.value = currentDate.value.getMonth();
        selectedYear.value = currentDate.value.getFullYear();
      }
    }
  },
  { deep: true },
);

// Initialize the component on mount
onMounted(() => {
  initializeCalendarView();
  initializeRangeValues();
});
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
