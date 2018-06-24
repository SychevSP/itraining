export function isProfileComplete (profile) {
    let isComplete = true;
    for (let profileProp in profile) {
        if (profileProp !== 'isComplete' && profile.hasOwnProperty(profileProp)) {
            isComplete = isComplete && Boolean(profile[profileProp]);
        }
    }
    return isComplete;
}