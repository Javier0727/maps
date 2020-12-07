export const SET_ORIGIN_AND_DESTINATION = "SET_ORIGIN_AND_DESTINATION";
export const SET_SELECTED_ROUTE = "SET_SELECTED_ROUTE";
export const PUT_CLIENT_NAME = "PUT_CLIENT_NAME";

export const setData = (data) => ({
  type: SET_ORIGIN_AND_DESTINATION,
  payload: data,
});

export const setSelectedRoute = (index) => ({
  type: SET_SELECTED_ROUTE,
  payload: index,
});

export const getDataTryal = (payload) => ({
  type: "DUMY",
  payload,
});
