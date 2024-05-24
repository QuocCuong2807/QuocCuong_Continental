import {SET_BOOKING, SET_CHECK_IN_DATE, SET_CHECK_OUT_DATE} from './constants'

export const setCheckInDate = payload => ({
    type: SET_CHECK_IN_DATE,
    payload
})

export const setCheckOutDate = payload => ({
    type: SET_CHECK_OUT_DATE,
    payload
})

export const setBooking = payload => ({
    type: SET_BOOKING,
    payload
})
