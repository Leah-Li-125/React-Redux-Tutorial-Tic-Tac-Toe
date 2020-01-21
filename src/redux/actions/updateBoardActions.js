export const UPDATE_SQUARE = 'UPDATE_SQUARE';
/*
Redux Step1:
Action is a normal object, here to create an action creator fn to return an action object
create a varible for the type value.It is easier and safer to pass and match a varible than passing a string around
(go to Step2 in boardReducer.js)
*/
export const updateSquareAction = index => {
    return {
        type: UPDATE_SQUARE,
        index,
    }
}