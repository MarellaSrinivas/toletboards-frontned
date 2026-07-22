import api from "./api";

export const getAllProperties = async () => {
  const response = await api.get("/properties");
  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};