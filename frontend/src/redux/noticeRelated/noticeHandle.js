import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';
import { _BASE_URL } from '../../Config/Urls';

export const getAllNotices = (id, address) => async (dispatch) => {

    try {
        const result = await axios.get(`${_BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
        }
    } catch (error) {
        dispatch(getError(error));
    }
}