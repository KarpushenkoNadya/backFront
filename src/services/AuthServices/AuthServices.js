import axios from "axios";

const AuthServices = {
    register: async (email, password) => {
        try {
          const response = await axios.post('http://localhost:7000/api/user', { email, password });
          const token = response.data.token;
          localStorage.setItem('token', token);
          return true;
        } catch (error) {
          console.error('Error during registration request:', error);
          throw new Error(error.response?.data?.message || 'Registration failed');
        }
    },
    login: async (email, password) => {
        try {
          const response = await axios.post('http://localhost:7000/api/login', { email, password });
          const token = response.data.token;
          return token; // Modified: Now login function directly returns the token
        } catch (error) {
          console.error('Error during login request:', error);
          throw new Error(error.response?.data?.message || 'Login failed');
        }
    },
};

export default AuthServices;
