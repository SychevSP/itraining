import {isProfileComplete} from './utils';

const completeProfile = {
    age: 30,
    weight: 80,
    isComplete: false,
};

const incompleteProfile = {
    age: 30,
    weight: null,
    isComplete: true,
};

test ('Complete profile returns true', () => {
    expect (isProfileComplete (completeProfile)).toBe(true)
});

test ('Incomplete profile returns fasle', () => {
    expect (isProfileComplete (incompleteProfile)).toBe(false)
});


