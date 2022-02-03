import API from "services/api";

export const getAllItems = () => {
  const res = API.get("library_items")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
  return res;
};

export const postItem = (values) => {
  const res = API.post("library_item/", values).then((response) => {
    return true;
  });
  return res;
};

export const deleteItem = (id) => {
  const res = API.delete("library_item/" + id).then((res) => {
    return true;
  });
  return res;
};