import api from "./api";

export const getAllProperties = async () => {
  try {
    const response = await api.get("/properties");
    return response.data ?? [];
  } catch (error) {
    console.error("API Error:", error);
    return [];  
  }
};

export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  console.log(response.data);
  return response.data;
};


export const getMyProperties = async (id) => {
  const response = await api.get(`/properties/my`);
  console.log(response.data);
  return response.data;
};



export const getDashboard = async (id) => {
  const response = await api.get(`/properties/dashboard`);
  console.log(response.data);
  return response.data;
};


