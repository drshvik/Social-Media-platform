// tokenUtils.js

const TOKEN_KEY = "token";

// Function to get the token from local storage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Function to set the token in local storage
export const setToken = (token) => {
  console.log("I am getting token as" + token);
  localStorage.setItem(TOKEN_KEY, token);
};

// Function to remove the token from local storage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
