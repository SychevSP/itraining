import update from 'immutability-helper';
import { combineReducers } from 'redux';

//import reducers
import user from './user';
import profile from './profile';
import program from './program';
import schedule from './schedule';
import chats from './chats';


import { calculateProgram } from 'lib/programCalculator';
import defaultState from 'store/defaultState';

//Combine reducers that can be easily attributed to particular app functionality
const combinedReducer = combineReducers ({
    user,
    profile,
    program,
    schedule,
    chats,
});

export default function sportApp  (state = {}, action = null)  {

    switch (action.type) {

        case 'INPUT_FINISHED':

            /*
             *This action requires data from two state properties
             *(Profile, Program.Input) => (Program.Routine, Schedule)
             */

            //Create exercise routine based on user input and profile
            const routine = calculateProgram({
                profile: state.profile,
                programID: state.program.id,
                input: action.input,
            });

            //set progress pointer to the beginning
            const progress = defaultState.program.progress;

            const scheduleLength = routine.length;

            //update the state and return
            return update(state, {program: {
                routine: {$set: routine},
                progress: {$set: progress},
            },
                schedule: {
                    scheduleLength: {$set: scheduleLength},
                }
            });

        case 'RESET':
            return  update(state, {
                program: {$set: defaultState.program},
                schedule: {$set: defaultState.schedule},
            });

        default:
            return combinedReducer(state, action);
    }
}

