export const formatRegistrationData = (userData) => {
  return {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    userRole: 'CUSTOMER' // Only customers can register
  };
};

export const formatLoginData = (credentials) => {
  return {
    email: credentials.email,
    password: credentials.password
  };
};