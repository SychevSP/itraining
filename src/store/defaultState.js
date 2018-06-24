export default defaultInitialState = {
    user: {
        uid: null,
        utype: 'trainee',
        email: null,
    },
    profile: {
        isComplete: false,
        gender: null,
        age: null,
        weight: null,
        height: null,
        goal: null,
    },
    program: {
        id: null,
        name: null,
        isActive: false,
        input: null,
        progress: {
            day: 0,
            ex: 0,
            round: 0,
        },
        routine: null,
    },
    schedule: {
        dates: [],
        scheduleLength: 0,
        weekDays: [],
        isComplete: false,
    },
    chats: null,
};

