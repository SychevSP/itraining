
export const updateProfile = (newProfile) => {
    return {
        type: 'UPDATE_PROFILE',
        profile: newProfile,
    };

};

export const setUID = (uid) => {
    return {
        type: 'SET_UID',
        uid,
    };

};

export const selectProgram = (programID, programName) => {
    return {
        type: 'PROGRAM_SELECTED',
        programID,
        programName,
    };
};

export const inputFinished = (input) => {
    return {
        type: 'INPUT_FINISHED',
        input,
    };
};

export const updateSchedule = (eventDate) => {
    return {
        type: 'UPDATE_SCHEDULE',
        eventDate,
    };
};

export const activateProgram =() => {
    return {
        type: 'PROGRAM_ACTIVATED'
    }
}

export const resetAll = () => {
    return {
        type: 'RESET'
    }
}