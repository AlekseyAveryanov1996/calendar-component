export const locales = {
  en: {
    months: {
      full: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      short: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    days: {
      full: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      minimal: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    },
  },
  ru: {
    months: {
      full: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      short: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ],
    },
    days: {
      full: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ],
      short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      minimal: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    },
  },
};

export const defaultLocale = "en";

// Типы для TypeScript
export type LocaleKey = keyof typeof locales;
export type LocaleData = (typeof locales)[LocaleKey];
