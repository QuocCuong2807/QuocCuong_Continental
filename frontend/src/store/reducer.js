import { SET_BOOKING } from "./constants";

const initState = {
    checkInDate: new Date(),
    checkOutDate: new Date()
}

function reducer(state, action){
    switch (action.type) {
        case SET_BOOKING:
            return({...action.payload})
        default:
            break;
    }
}
export {initState}
export default reducer