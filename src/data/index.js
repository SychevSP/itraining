//get list of all available exercises
export const exercises = require('./JSON/exercises.json');

//program templates by ID
export const programsByID = {
    1: require('./JSON/programsByID/program_1.json'),
};

//exercises in programs by ID
export const exercisesInProgramByID = {
    1: require('./JSON/programsByID/exercisesInProgram_1.json'),
};

//All available programs
export const programs  = require('./JSON/programs.json');

export const goals = [
    'Похудеть',
    'Набрать массу',
    'Идеальная фигура',
];

export const gender = [
    'М',
    'Ж',
];

export const profileProperties = [
    {
        key: 'gender',
        name: 'ПОЛ',
        propName: 'gender',
        options: gender,
        input: 'picker',
    },
    {
        key: 'weight',
        name: 'ВЕС',
        propName: 'weight',
        minVal: 30,
        maxVal: 200,
        input: 'numeric',
    },
    {
        key: 'age',
        name: 'ВОЗРАСТ',
        propName: 'age',
        minVal: 18,
        maxVal: 70,
        input: 'date',
    },
    {
        key: 'height',
        name: 'РОСТ',
        propName: 'height',
        minVal: 120,
        maxVal: 220,
        input: 'numeric',
    },
    {
        key: 'goal',
        name: 'ЦЕЛЬ',
        propName: 'goal',
        options: goals,
        input: 'picker',
    },
];






