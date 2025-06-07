export const setToken = (token) => {
  localStorage.setItem('consumerToken', token);
};

export const getToken = () => {
  return localStorage.getItem('consumerToken');
};

export const removeToken = () => {
  localStorage.removeItem('consumerToken');
};
