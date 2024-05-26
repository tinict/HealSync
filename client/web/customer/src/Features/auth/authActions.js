import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

export const loginWithGoogle = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/v1/google/login-success`, {id});
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
