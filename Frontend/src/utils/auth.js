import { jwtDecode } from 'jwt-decode'; // Adjust the import

const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (e) {
    console.error('Invalid token');
    return null;
  }
};

export { getToken, setToken, removeToken, getUser };
