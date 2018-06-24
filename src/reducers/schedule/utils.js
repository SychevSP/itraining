import { MS_IN_DAY, getWeekDayNum } from 'lib/Calendar/utils';

const TRAININGS_PER_WEEK = 3;

export function createScheduleForWeekDay ({ eventDate, dates, weekDays, scheduleLength, isComplete }) {

    /*
     * If the user selects first date, there will be no dates before
     * so occupy as many dates as possible
     * If the user selects second or third dates there may be dates before
     */
    let numOfDays;
    if (!weekDays) {
        numOfDays = Math.ceil(scheduleLength / TRAININGS_PER_WEEK);
    } else {
        numOfDays = Math.floor(scheduleLength / TRAININGS_PER_WEEK);
    }

    let i = 0;
    let date = eventDate;
    const dateArray = [];

    //Array of dates
    //Start from selected date and repeat every same day of week
    while (i < numOfDays) {
        dateArray.push (date);
        date = date + 7 * MS_IN_DAY;
        i++;
    }

    //this is a pure function. It returns a new array
    const newDates = mergeAscendingArrays(dates, dateArray);

    const  newWeekDays = [...weekDays, getWeekDayNum(eventDate)].sort();

    return {
        dates: newDates,
        weekDays: newWeekDays,
        scheduleLength, //remains unchanged
        isComplete: newDates.length === scheduleLength, //set completion flags if there are dates for all the training days
    };
}

export function deleteScheduleForWeekDay ({ eventDate, dates, weekDays, scheduleLength, isComplete }) {

    const weekDay = getWeekDayNum(eventDate);
    const weekDayIndex = weekDays.indexOf(weekDay);

    return {
        dates: dates.filter(e => getWeekDayNum(e) !== weekDay),
        weekDays: [...weekDays.slice(0, weekDayIndex), ...weekDays.slice(weekDayIndex + 1)],
        scheduleLength,
        isComplete: false,
    };
}

//This function merges two arrays both sorted in ascending order.
//I.e. element 0 is the smallest, element length-1 is the largest
export function mergeAscendingArrays (ar1, ar2) {

    const resultLength = ar1.length + ar2.length;
    const result = new Array (resultLength);
    const maxi1 = ar1.length - 1;
    const maxi2 = ar2.length - 1;
    let i1 = 0;
    let i2 = 0;

    for (var i = 0; i < resultLength; i++) {
        if (i1 === ar1.length) {
            result [i] = ar2[i2++];
        } else if (i2 === ar2.length) {
            result [i] = ar1[i1++];
        } else if (ar1[i1] > ar2[i2]) {
            result[i] = ar2[i2++];
        } else {
            result[i] = ar1[i1++];
        }
    }

    return result;
}