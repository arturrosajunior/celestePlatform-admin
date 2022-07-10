import API from "services/api";

const endpoint = 'tags/';

export const getAllItems = () => {
  const res = API.get(`${endpoint}all`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  return res;
};

export const postItem = (values) => {
  const res = API.post(`${endpoint}`, values).then((response) => {
    return true;
  });
  return res;
};

export const deleteItem = (id) => {
  const res = API.delete(`${endpoint}${id}`).then((res) => {
    return true;
  });
  return res;
};


export const putItem = (id, values) => {
  const res = API.put(`${endpoint}${id}`, values).then((res) => {
    return true;
  });
  return res;
};