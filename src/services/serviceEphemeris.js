import API from "services/api";



export const getAllItems = () => {
  const res = API.get("calendar_events")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  return res;
};

export const postItem = (values) => {
  const res = API.post("calendar_event/", values).then((response) => {
    return true;
  });
  return res;
};

export const deleteItem = (id) => {
  const res = API.delete("calendar_event/" + id).then((res) => {
    return true;
  });
  return res;
};