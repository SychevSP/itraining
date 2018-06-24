import update from 'immutability-helper';

import defaultStore from '/store/defaultState';
import { nextExIndex } from '/lib/programCalculator';
import { getWeekDayNum } from '/lib/Calendar/utils';

export default function program (state = {}, action = null) {

    let newState;
    switch (action.type) {

        case 'PROGRAM_SELECTED':
            return update (state, {
                name: {$set: action.programName},
                id: {$set: action.programID},
            });

        case 'PROGRAM_ACTIVATED':
            return update (state, {isActive: {$set: true}});

        case 'PROGRESS_CHANGED':

            //Функция для обновления состояния тренировки
            const nextExIndexState = (state, newProgressState) => {
                return update(state, {progress: {state: {$set: newProgressState}}});
            };

            //Обновляем состояние
            switch (state.progress.state) {
                case 'begin':
                    return nextExIndexState(state, 'training');
                case 'training':
                    return nextExIndexState(state, 'break');
                case 'break':
                    //Рассчитываем новое упражнение
                    const newProgress = nextExIndex ({
                        routine: state.routine,
                        ex: state.progress.ex,
                        round: state.progress.round,
                        day: state.progress.day,
                    });
                    //console.log('new progress');
                    //console.log(newProgress);
                    //Обновляем progress
                    newState = update (state, {
                        progress: {$merge: newProgress}
                    });

                    //Обновляем статус
                    if (newState.progress.day !== state.progress.day) {
                        if (newState.progress.day === 0) {
                            return nextExIndexState(newState, 'programComplete');
                        }
                        return nextExIndexState(newState, 'dayComplete');
                    }
                    //Переходим к следующей тренировке
                    return nextExIndexState(newState, 'training');

                case 'dayComplete':
                    return nextExIndexState(state, 'begin');
                default:
                    return state;
            }

            return newState;

        default:
            return state;
    }
}
