export const baseUrl = " http://localhost:5130/api";

export const authorization = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
