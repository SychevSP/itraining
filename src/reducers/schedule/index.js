import update from 'immutability-helper';

import defaultStore from '/store/defaultState';
import { nextExIndex } from '/lib/programCalculator';
import { getWeekDayNum } from '/lib/Calendar/utils';

import { createScheduleForWeekDay, deleteScheduleForWeekDay } from './utils';

export default function program (state = {}, action = null) {

    let newState;
    switch (action.type) {

        case 'UPDATE_SCHEDULE':

            const { eventDate } = action;

            //Случай 1. Пользователь выбрал дату, которая уже есть в массиве
            //Проверяем есть ли дата в массиве. Если есть, значит надо ее исключить
            if (state.dates.includes(eventDate)) {
                return deleteScheduleForWeekDay ({eventDate, ...state});
            }

            //Случай 2. Пользователь выбрал дату, которой нет в массиве
            //Создаем массив с датами тренировок для одного дня недели
            console.log(createScheduleForWeekDay ({eventDate, ...state}));
            return createScheduleForWeekDay ({eventDate, ...state});

        default:
            return state;
    }
}
