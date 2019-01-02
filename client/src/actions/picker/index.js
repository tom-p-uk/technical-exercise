import axios from 'axios';
import {
    GET_SLOTS_REQUEST,
    GET_SLOTS_SUCCESS,
    GET_SLOTS_FAILURE,
    SELECT_SLOT_REQUEST,
    SELECT_SLOT_SUCCESS,
    SELECT_SLOT_FAILURE,
    SELECT_SPECIAL_DELIVERY_REQUEST,
    SELECT_SPECIAL_DELIVERY_SUCCESS,
    SELECT_SPECIAL_DELIVERY_FAILURE,
} from '../../constants/types';

export const getSlots = (offset = 0, limit = 3) => dispatch => {
    dispatch(getSlotsRequest());

    axios.get(`/api/slots?offset=${offset}&limit=${limit}`)
        .then(res => {
            dispatch(getSlotsSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(getSlotsFailure(err));
        });
};

const getSlotsRequest = () => ({ type: GET_SLOTS_REQUEST });

const getSlotsSuccess = data => ({
    type: GET_SLOTS_SUCCESS,
    payload: { data }
});

const getSlotsFailure = error => ({
    type: GET_SLOTS_FAILURE,
    payload: { error }
});

export const selectSlot = (id, time, disableOnClick) => dispatch => {
    if (disableOnClick) return;

    dispatch(selectSlotRequest());

    axios.put(`/api/slots/${id}`, { time })
        .then(res => {
            dispatch(selectSlotSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(selectSlotFailure(err));
        });
};

const selectSlotRequest = () => ({ type: SELECT_SLOT_REQUEST });

const selectSlotSuccess = data => ({
    type: SELECT_SLOT_SUCCESS,
    payload: { data }
});

const selectSlotFailure = error => ({
    type: SELECT_SLOT_FAILURE,
    payload: { error }
});

export const selectSpecialDelivery = () => dispatch => {
    dispatch(selectSpecialDeliveryRequest());

    axios.put(`/api/slots/`)
        .then(res => {
            dispatch(selectSpecialDeliverySuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(selectSpecialDeliveryFailure(err));
        });
};

const selectSpecialDeliveryRequest = () => ({ type: SELECT_SPECIAL_DELIVERY_REQUEST });

const selectSpecialDeliverySuccess = data => ({
    type: SELECT_SPECIAL_DELIVERY_SUCCESS,
    payload: { data }
});

const selectSpecialDeliveryFailure = error => ({
    type: SELECT_SPECIAL_DELIVERY_FAILURE,
    payload: { error }
});
