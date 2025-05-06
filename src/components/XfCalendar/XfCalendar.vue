<template>
  <div
    class="xf-calendar xf-mx-auto xf-bg-white xf-p-3 xf-border-grey-lighten-2 xf-border-radius-10"
  >
    <div
      class="xf-flex xf-flex-justify-content-between xf-flex-align-items-center xf-mb-2"
    >
      <button
        class="xf-bg-none xf-border-none"
        :class="loading ? 'xf-cursor-not-allowed' : 'xf-cursor-pointer'"
        :disabled="loading"
        @click="changeMonth(false)"
      >
        <xf-icon
          src="arrow-left"
          :fill="loading ? 'grey-lighten-1' : ''"
          internal
        />
      </button>

      <h2 class="xf-m-0">{{ monthYear }}</h2>

      <button
        class="xf-bg-none xf-border-none"
        :class="loading ? 'xf-cursor-not-allowed' : 'xf-cursor-pointer'"
        :disabled="loading"
        @click="changeMonth(true)"
      >
        <xf-icon
          src="arrow-right"
          :fill="loading ? 'grey-lighten-1' : ''"
          internal
        />
      </button>
    </div>

    <div class="xf-calendar-days xf-grid xf-gap-1">
      <div v-if="loading" class="xf-position-relative xf-pt-8 xf-pb-2 xf-col-7">
        <xf-loading-spinner class="xf-center" :size="32" />
      </div>

      <template v-else>
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
          class="xf-calendar-day xf-border-radius-5 xf-calendar-day__empty xf-text-center xf-py-2 xf-cursor-pointer"
        />

        <!-- Display the days of the current month -->
        <div
          v-for="day in daysInMonth"
          :key="'day-' + day"
          :class="[
            'xf-calendar-day xf-border-radius-5 xf-text-center xf-py-2 xf-cursor-pointer',
            {
              'xf-fw-700 xf-border-black': isToday(day),
              'xf-text-colour-grey-lighten-2 xf-cursor-not-allowed':
                !isAvailableDay(day) ||
                isOutOfBounds(day) ||
                (props.range &&
                  isActivelySelectingRange() &&
                  isBeforeStartDate(day)),
              [`xf-bg-${unavailableColour} xf-cursor-not-allowed`]:
                !isAvailableDate(day) &&
                isAvailableDay(day) &&
                !isOutOfBounds(day),
              [`xf-bg-${availableColour}`]:
                isAvailableDate(day) &&
                isAvailableDay(day) &&
                !isSelectedDate(day) &&
                !isInRange(day) &&
                !isOutOfBounds(day) &&
                !isHoveredInRange(day),
              'xf-fw-700 xf-bg-black xf-text-colour-white':
                isSelectedDate(day) || isInRange(day),
              'xf-bg-blue-lighten-4': isHoveredInRange(day),
            },
          ]"
          @click="daySelected(day)"
          @mouseenter="handleHover(day)"
          @mouseleave="clearHover()"
        >
          {{ day }}

          <!-- Slot for custom content, passing the current day, month, year, and full date -->
          <slot
            v-if="isAvailableDay(day) && !isOutOfBounds(day)"
            :day="day"
            :month="selectedMonth"
            :year="selectedYear"
            :date="`${padStartNumber(day)}-${padStartNumber(selectedMonth)}-${selectedYear}`"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref, computed, onMounted, watch } from "vue";
import { formatDate, padStartNumber } from "@/composables/date";

import XfIcon from "@/components/XfIcon/XfIcon.vue";
import XfLoadingSpinner from "@/components/loading/XfLoadingSpinner/XfLoadingSpinner.vue";

// Define types for date range
export type DateRange = {
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
  loading: {
    type: Boolean,
    default: false,
  },
});

// ** Emits **
const emit = defineEmits<{
  (e: "update:date", date: string | DateRange): void;
  (e: "update:month", month: string): void;
}>();

// ** Data **
const today: Date = new Date();
const currentDate = ref<Date>(new Date());
const selectedMonth = ref<number>(0);
const selectedYear = ref<number>(0);

// Track start and end dates for range selection
const rangeStart = ref<string | null>(null);
const rangeEnd = ref<string | null>(null);

// Track hover state for range selection preview
const hoveredDay = ref<number | null>(null);

// Add a flag to track whether we're in the middle of selecting a range
const isSelectingRange = ref<boolean>(false);

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
  try {
    const first = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      1,
    );
    // Adjust so Monday = 0, Sunday = 6
    return (first.getDay() + 6) % 7;
  } catch (error) {
    console.error("Error calculating first day of month:", error);
    return 0; // Default to Monday if there's an error
  }
});

// Return an array of day numbers for the current month
const daysInMonth = computed<number[]>(() => {
  try {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth() + 1; // Note: months are 0-based
    const days = new Date(year, month, 0).getDate(); // 0th day of next month = last day of current month
    return Array.from({ length: days }, (_, i) => i + 1); // [1, 2, ..., days]
  } catch (error) {
    console.error("Error calculating days in month:", error);
    return Array.from({ length: 30 }, (_, i) => i + 1); // Default to 30 days if there's an error
  }
});

// ** Methods **

// Helper function to check if we're actively selecting a range
// This is true when we have a start date but no end date yet
const isActivelySelectingRange = (): boolean => {
  return props.range && rangeStart.value !== null && rangeEnd.value === null;
};

// Parse date string in format dd-mm-yyyy to Date object
const parseDate = (dateStr: string): Date => {
  if (!dateStr || dateStr === "") {
    return new Date(); // Return current date if no date string is provided
  }

  const parts = dateStr.split("-").map(Number);
  // Validate parts before creating date
  if (parts.length !== 3 || parts.some(isNaN)) {
    return new Date(); // Return current date if format is invalid
  }

  const [day, month, year] = parts;
  // Check if values are in valid ranges
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > 3000
  ) {
    return new Date(); // Return current date if values are out of range
  }

  return new Date(year, month - 1, day);
};

// Initialize calendar view to show the month containing the start date
const initializeCalendarView = () => {
  let dateToShow: Date;

  if (typeof props.date === "string") {
    if (props.date && props.date.trim() !== "") {
      dateToShow = parseDate(props.date);
    } else {
      dateToShow = new Date(); // Default to current date if date is empty
    }
  } else if (
    props.date &&
    "from" in props.date &&
    props.date.from &&
    props.date.from.trim() !== ""
  ) {
    dateToShow = parseDate(props.date.from);
  } else {
    dateToShow = new Date(); // Default to current date
  }

  currentDate.value = new Date(
    dateToShow.getFullYear(),
    dateToShow.getMonth(),
    1,
  );

  setSelectedMonthYear();
};

// Initialize range values from props
const initializeRangeValues = () => {
  if (typeof props.date === "object" && props.date && "from" in props.date) {
    rangeStart.value = props.date.from || null;
    rangeEnd.value = props.date.to || null;
    // Set the selecting flag based on whether we have a start but no end date
    isSelectingRange.value =
      rangeStart.value !== null && rangeEnd.value === null;
  } else if (typeof props.date === "string") {
    rangeStart.value = props.date || null;
    rangeEnd.value = null;
    isSelectingRange.value = false; // Not in range selection mode for single date
  } else {
    rangeStart.value = null;
    rangeEnd.value = null;
    isSelectingRange.value = false;
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

// Check if a date is before the selected start date
const isBeforeStartDate = (day: number): boolean => {
  if (!props.range || !rangeStart.value || rangeStart.value === null)
    return false;

  const date = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );
  const startDate = parseDate(rangeStart.value);

  // Compare date with startDate, excluding the start date itself
  return date < startDate && formatDate(date) !== rangeStart.value;
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
  if (!rangeStart.value && !rangeEnd.value) {
    return false;
  }

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

// Check if the day is within the hovered range preview
const isHoveredInRange = (day: number): boolean => {
  // Only show hover effect when we have a start date but no end date yet
  if (
    !props.range ||
    rangeStart.value === null ||
    rangeEnd.value !== null ||
    hoveredDay.value === null
  ) {
    return false;
  }

  const currentDayDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );
  const startDate = parseDate(rangeStart.value);
  const hoverDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    hoveredDay.value,
  );

  // Don't show hover effect on the start date itself
  if (formatDate(currentDayDate) === rangeStart.value) {
    return false;
  }

  // Only show hover effect on available dates
  if (
    !isAvailableDay(day) ||
    !isAvailableDate(day) ||
    isOutOfBounds(day) ||
    isBeforeStartDate(day)
  ) {
    return false;
  }

  // Only show hover effect for dates after the start date
  return currentDayDate > startDate && currentDayDate <= hoverDate;
};

// Handle mouse hover for range selection preview
const handleHover = (day: number): void => {
  if (props.range && rangeStart.value !== null && rangeEnd.value === null) {
    const hoverDate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      day,
    );
    const startDate = parseDate(rangeStart.value);

    // Only set hover day if the date is after the start date
    if (hoverDate > startDate) {
      hoveredDay.value = day;
    } else {
      hoveredDay.value = null;
    }
  }
};

// Clear hover state
const clearHover = (): void => {
  hoveredDay.value = null;
};

// Emit selected date or range to parent component
const daySelected = (day: number): void => {
  if (!isAvailableDay(day) || !isAvailableDate(day) || isOutOfBounds(day)) {
    return; // Don't allow selection of unavailable days
  }

  // Only check if date is before start date when we're in the middle of selecting a range
  if (isActivelySelectingRange() && isBeforeStartDate(day)) {
    return; // Don't allow selection of dates before the start date when selecting a range
  }

  const selectedDate = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day,
  );
  const formatted = formatDate(selectedDate);

  if (props.range) {
    if (
      rangeStart.value === null ||
      (rangeStart.value !== null && rangeEnd.value !== null)
    ) {
      // First selection or starting a new range selection
      rangeStart.value = formatted;
      rangeEnd.value = null;
      hoveredDay.value = null; // Reset hover state
      isSelectingRange.value = true; // Mark that we're in the middle of selecting a range
      emit("update:date", { from: formatted, to: "" });
    } else {
      // Second selection to complete the range
      const start = parseDate(rangeStart.value);

      // Only allow selecting dates after the start date
      if (selectedDate >= start) {
        rangeEnd.value = formatted;
        isSelectingRange.value = false; // We've completed the range selection
        emit("update:date", { from: rangeStart.value, to: formatted });
      } else {
        // Do not allow selecting a date before the start date
        // Instead, keep the current start date and wait for a valid end date
        return;
      }
      hoveredDay.value = null; // Reset hover state after selection
    }
  } else {
    // Single date selection mode
    rangeStart.value = formatted;
    rangeEnd.value = null;
    isSelectingRange.value = false; // Not in range selection mode for single date
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

  setSelectedMonthYear();

  emit(
    "update:month",
    `${padStartNumber(selectedMonth.value)}-${selectedYear.value}`,
  );
};

const setSelectedMonthYear = (): void => {
  selectedMonth.value = currentDate.value.getMonth() + 1;
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

// Validate date range integrity
const validateDateRange = () => {
  if (props.range && rangeStart.value !== null && rangeEnd.value !== null) {
    const start = parseDate(rangeStart.value);
    const end = parseDate(rangeEnd.value);

    // If end date is before start date, reset the end date
    if (end < start) {
      rangeEnd.value = null;
      isSelectingRange.value = true; // We're back to selecting a range
      emit("update:date", { from: rangeStart.value, to: "" });
    }
  }
};

// Watch for changes in the date prop
watch(
  () => props.date,
  (newValue) => {
    if (typeof newValue === "object" && newValue && "from" in newValue) {
      rangeStart.value = newValue.from || null;
      rangeEnd.value = newValue.to || null;

      // Update the selecting range flag
      isSelectingRange.value =
        rangeStart.value !== null && rangeEnd.value === null;

      // Validate that to date is not earlier than from date
      validateDateRange();

      // If from date is provided and valid, update the calendar view
      if (newValue.from && newValue.from.trim() !== "") {
        try {
          const fromDate = parseDate(newValue.from);
          if (!isNaN(fromDate.getTime())) {
            currentDate.value = new Date(
              fromDate.getFullYear(),
              fromDate.getMonth(),
              1,
            );

            setSelectedMonthYear();
          }
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }
    } else if (typeof newValue === "string") {
      rangeStart.value = newValue || null;
      rangeEnd.value = null;
      isSelectingRange.value = false; // Not in range selection mode for single date

      // If date is provided and valid, update the calendar view
      if (newValue && newValue.trim() !== "") {
        try {
          const date = parseDate(newValue);
          if (!isNaN(date.getTime())) {
            currentDate.value = new Date(
              date.getFullYear(),
              date.getMonth(),
              1,
            );

            setSelectedMonthYear();
          }
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }
    }
  },
  { deep: true },
);

// Initialize the component on mount
onMounted(() => {
  initializeCalendarView();
  initializeRangeValues();
  validateDateRange(); // Validate any initially provided date range
});
</script>

<style scoped lang="scss">
.xf-calendar {
  &-days {
    grid-template-columns: repeat(7, 1fr);

    .xf-calendar-day {
      transition:
        background 0.3s,
        color 0.3s;

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
