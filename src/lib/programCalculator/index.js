import { exercises, programsByID, exercisesInProgramByID } from '/data';

export function calculateProgram ({programID, profile, input}) {

    //get program template by ID
    const programJSON = programsByID[programID];

    /*
     *It is expected that the program template will be downloaded from Firebase Realtime Database
     *This database does not store arrays
     *So we have to convert from object to array for more convenient handling
     *[day1: [exercise: 1, exercise: 2, ...],
     *day 2:[exercise: 1, exercise: 2, ...],
     *...
     *]
     */
    const program = Object.values(programJSON).map (e => Object.values(e));

    /*
     *calculate program based on profile and user input
     *for every training day of the template apply template weights to user input
     */
    return program.map(day => day.map(exerciseDay => calculateExerciseDay ({
        exerciseDay,
        profile,
        input,
        exercises,
    })));
}

function calculateExerciseDay ({
    exerciseDay, //Template for one day
    profile, //user profile
    input, //user input
    exercises, //available exercises. ID of exercise is the key. Name of the exercise is the value
    }) {
    let multiplier;

    //Тип вычисления
    let calcType = exercises[exerciseDay.exId].calcType;

    //Создаем множитель, на который будем умножать коэффициенты
    if(calcType === 'input') {
        multiplier = input[exerciseDay.exId];
    } else if (calcType.slice(0,8) === 'profile:') {
        profileProp = calcType.slice(8);
        multiplier = profile[profileProp];
    }

    //convert rounds from object to array
    const rounds = Object.values(exerciseDay.rounds);
    return ({
        ...exerciseDay,
        exName: exercises[exerciseDay.exId].name,
        rounds: rounds.map(e => {
            const weight = e.weightRatio ? Math.round(e.weightRatio * multiplier) : null;
            return {...e, weight: weight};
        }),
    });

}

export function getExercisesForInput (programID) {
    return exercisesInProgramByID[programID]
        .filter(e => exercises[e.id].calcType = 'input') //only exercises which depend on user input
        .map(e => ({
            key: e.id,
            id: e.id,
            name: exercises[e.id].name,
        })); //create object to be rendered in input form
}

export function nextExIndex ({routine, day, dayRoutine, ex, round}) {

    //Расписание на текущий день
    if (dayRoutine === undefined)  dayRoutine = routine[day];

    //Обновим день далее, если поймем, что на текущий день все упражнения выполнены
    let nextDay = day;

    //Есть ли еще подходы в этот день
    const roundsLength = dayRoutine[ex].rounds.length;
    const exLength = dayRoutine.length;
    const nextRound = (round + 1) < roundsLength ? round + 1 : 0;

    //Есть ли еще упражнения?
    let nextEx;
    if (!nextRound) {

        if ((ex + 1) < exLength) {
            //Елси есть еще упражнения в этот день, то переходим к следующему
            nextEx = ex + 1;
        } else {
            //Если упражнений нет, то сбрасываем счетчик упражений на ноль
            nextEx = 0;
            //и проверяем есть ли еще дни
            if(routine && (day < routine.length - 1)) {
                nextDay = day + 1;
            } else {
                nextDay = 0;
            }
        }
    } else {
        nextEx = ex;
    }

    return {day: nextDay, ex: nextEx, round: nextRound};

}

export function prevExIndex ({dayRoutine, ex, round}) {

    //На всякий случай проверяем, если мы в начале
    if ((ex === 0) && (round === 0)) return null;

    //Предыдущий подход
    const nextRound = round ? round - 1 : dayRoutine[ex - 1].rounds.length - 1;

    //Предыдущее упражнение
    const nextEx = round ? ex : ex - 1;

    return {ex: nextEx, round: nextRound};

}
