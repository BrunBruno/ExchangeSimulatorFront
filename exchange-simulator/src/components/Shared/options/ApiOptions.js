// export const baseUrl = " http://localhost:5130/api";
export const baseUrl = " http://192.168.1.46:5130/api";

export const authorization = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
