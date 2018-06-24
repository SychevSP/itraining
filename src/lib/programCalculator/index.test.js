import {nextExIndex} from './index';

//Тестовая программа
const routine = [
    //день 0
    [
        //Упражнение 0
        {rounds: ['R0', 'R1', 'R2']},
        //Упражнение 1
        {rounds: ['R0', 'R1', 'R2']},
        //Упражнение 2
        {rounds: ['R0', 'R1', 'R2']},
    ],
    //день 1
    [
        //Упражнение 0
        {rounds: ['R0', 'R1', 'R2']},
        //Упражнение 1
        {rounds: ['R0', 'R1', 'R2']},
        //Упражнение 2
        {rounds: ['R0', 'R1', 'R2']},
    ],
    //день 2
    [
        //Упражнение 0
        {rounds: ['R0', 'R1', 'R2']},
        //Упражнение 1
        {rounds: ['R0', 'R1', 'R2']},
        //Упражнение 2
        {rounds: ['R0', 'R1', 'R2']},
    ],
];


test ('Переходим к следующему подходу', () => {
    expect (nextExIndex ({routine, day: 0, ex: 0, round: 0}).round).toBe(1);
});

test ('сбрасываем подход на 0 при переходе к следующему упражнению', () => {
    expect (nextExIndex ({routine, day: 0, ex: 0, round: 2}).round).toBe(0);
});

test ('Переходим к следующему упражнению', () => {
    expect (nextExIndex ({routine, day: 0, ex: 0, round: 2}).ex).toBe(1);
});

test ('Переходим к следующему дню', () => {
    expect (nextExIndex ({routine, day: 0, ex: 2, round: 2}).day).toBe(1);
});

test ('Сбрасываем на ноль упражнения при переходе к следующему дню', () => {
    expect (nextExIndex ({routine, day: 0, ex: 2, round: 2}).ex).toBe(0);
});

test ('После завершения тренировки переходим к дню 0', () => {
    expect (nextExIndex ({routine, day: 2, ex: 2, round: 2}).day).toBe(0);
});


