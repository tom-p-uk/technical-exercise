import _ from 'lodash';
import {
    GET_SLOTS_REQUEST,
    GET_SLOTS_SUCCESS,
    GET_SLOTS_FAILURE,
    SELECT_SLOT_REQUEST,
    SELECT_SLOT_SUCCESS,
    SELECT_SLOT_FAILURE,
    SELECT_SPECIAL_DELIVERY_REQUEST,
    SELECT_SPECIAL_DELIVERY_SUCCESS,
    SELECT_SPECIAL_DELIVERY_FAILURE
} from '../constants/types';

const initialState = {
    slots: [],
    getSlotsLoading: false,
    getSlotsError: null,
    selectSlotLoading: false,
    selectSlotError: null,
    selectSpecialDeliveryLoading: false,
    selectSpecialDeliveryError: null,
    specialDeliverySelected: false,
    slotCount: 0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_SLOTS_REQUEST:
        return {
            ...state,
            getSlotsLoading: true,
            getSlotsError: null,
        };

        case GET_SLOTS_SUCCESS:
        return {
            ...state,
            getSlotsLoading: false,
            slots: action.payload.data,
            slotCount: parseInt(action.payload.data[0].full_count),
        };

        case GET_SLOTS_FAILURE:
        return {
            ...state,
            getSlotsLoading: false,
            getSlotsError: action.payload.error,    
        };

        case SELECT_SLOT_REQUEST:
        return {
            ...state,
            selectSlotLoading: true,
            selectSlotError: null,    
        };

        case SELECT_SLOT_SUCCESS:
        return {
            ...state,
            selectSlotLoading: false,
            slots: state.slots.map(item => item.id === action.payload.data[0].id ? action.payload.data[0] : item),
        };

        case SELECT_SLOT_FAILURE:
        return {
            ...state,
            selectSlotLoading: false,
            selectSlotError: action.payload.error,
        };

        case SELECT_SPECIAL_DELIVERY_REQUEST:
        return {
            ...state,
            selectSpecialDeliveryLoading: true,
            selectSpecialDeliveryError: null, 
        };

        case SELECT_SPECIAL_DELIVERY_SUCCESS:
        const common = _.intersectionBy(action.payload.data, state.slots, 'id');
        const unique = _.uniqBy([...common, ...state.slots], 'id');
        const sorted = _.sortBy(unique, 'id');

        return {
            ...state,
            selectSpecialDeliveryLoading: false,
            slots: sorted,
            specialDeliverySelected: !state.specialDeliverySelected,
        };

        case SELECT_SPECIAL_DELIVERY_FAILURE:
        return {
            ...state,
            selectSpecialDeliveryLoading: false,
            selectSpecialDeliveryError: action.payload.error,
        };

        default:
        return state;
    }
}
