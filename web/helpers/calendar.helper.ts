// types
import { ICalendarDate, ICalendarPayload } from "@/components/issues";
// helpers
import { getWeekNumberOfDate, renderFormattedPayloadDate } from "@/helpers/date-time.helper";

/**
 * @returns {ICalendarPayload} calendar payload to render the calendar
 * @param {ICalendarPayload | null} currentStructure current calendar payload
 * @param {Date} startDate date of the month to render
 * @description Returns calendar payload to render the calendar, if currentStructure is null, it will generate the payload for the month of startDate, else it will construct the payload for the month of startDate and append it to the currentStructure
 */
export const generateCalendarData = (currentStructure: ICalendarPayload | null, startDate: Date): ICalendarPayload => {
  const calendarData: ICalendarPayload = currentStructure ?? {};

  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();

  const currentDate = new Date(startYear, startMonth, 1);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

  calendarData[`y-${year}`] ||= {};
  calendarData[`y-${year}`][`m-${month}`] ||= {};

  const numWeeks = Math.ceil((totalDaysInMonth + firstDayOfMonth) / 7);

  for (let week = 0; week < numWeeks; week++) {
    const currentWeekObject: { [date: string]: ICalendarDate } = {};

    const weekNumber = getWeekNumberOfDate(new Date(year, month, week * 7 - firstDayOfMonth + 1));

    for (let i = 0; i < 7; i++) {
      const dayNumber = week * 7 + i - firstDayOfMonth;

      const date = new Date(year, month, dayNumber + 1);

      const formattedDatePayload = renderFormattedPayloadDate(date);
      if (formattedDatePayload)
        currentWeekObject[formattedDatePayload] = {
          date,
          year,
          month,
          day: dayNumber + 1,
          week: weekNumber,
          is_current_month: date.getMonth() === month,
          is_current_week: getWeekNumberOfDate(date) === getWeekNumberOfDate(new Date()),
          is_today: date.toDateString() === new Date().toDateString(),
        };
    }

    calendarData[`y-${year}`][`m-${month}`][`w-${weekNumber}`] = currentWeekObject;
  }

  return calendarData;
};
