import api from "./api";

export const getDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const getUsers = async (
  page = 0,
  size = 10,
  search = "",
  role = ""
) => {
  const res = await api.get("/admin/users", {
    params: {
      page,
      size,
      search,
      role,
    },
  });

  return res.data;
};

export const getUserStats = async () => {
  const res = await api.get("/admin/users/stats");
  return res.data;
};

export const getProperties = async (
  page = 0,
  size = 10,
  search = "",
  status = "",
  propertyType = ""
) => {
  const res = await api.get("/admin/properties", {
    params: {
      page,
      size,
      search,
      status,
      propertyType,
    },
  });

  return res.data;
};

export const approveProperty = async (id) => {
  const res = await api.put(`/admin/properties/${id}/approve`);
  return res.data;
};

export const rejectProperty = async (id) => {
  const res = await api.put(`/admin/properties/${id}/reject`);
  return res.data;
};

export const deleteProperty = async (id) => {
  await api.delete(`/admin/properties/${id}`);
};


export const getAdminProperties = async (
  page = 0,
  size = 10,
  search = "",
  status = "",
  propertyType = ""
) => {
  const { data } = await api.get("/admin/properties", {
    params: {
      page,
      size,
      search,
      status,
      propertyType,
    },
  });

  return data;
};
 


export const getVisits = async (
  page = 0,
  size = 10,
  status = ""
) => {
  const { data } = await api.get("/admin/visits", {
    params: {
      page,
      size,
      status,
    },
  });

  return data;
};