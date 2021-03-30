import { createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectUserLoggedIn = createSelector(
    [selectUser],  user =>{
        return user.isLoggedIn
    }
);
export const selectLoggedOut = createSelector(
    [selectUser],  user =>   user.isLoggedIn
);
export const selectLoggedInUser = createSelector(
    [selectUser],  user =>  user.isLoggedIn
);