export const SET_ORIGIN_AND_DESTINATION = "SET_ORIGIN_AND_DESTINATION";
export const SET_SELECTED_ROUTE = "SET_SELECTED_ROUTE";
export const PUT_CLIENT_NAME = "PUT_CLIENT_NAME";
export const SET_CLIENT_NAME = "SET_CLIENT_NAME";
export const SET_CLIENT_NAME_ASYNC = "SET_CLIENT_NAME_ASYNC";
export const SET_ROUTES_DATA = "SET_ROUTES_DATA";
export const SET_ROUTES_DATA_ASYNC = "SET_ROUTES_DATA_ASYNC";

// export const setSelectedRoute = (index) => ({
//   type: SET_SELECTED_ROUTE,
//   payload: index,
// });

// export const getDataTryal = (payload) => ({
//   type: "DUMY",
//   payload,
// });

export const setData = (data) => ({
  type: SET_ORIGIN_AND_DESTINATION,
  payload: data,
});

export const setRoutesData = (data) => ({
  type: SET_ROUTES_DATA,
  payload: data,
});

export const setNameClient = ({ clientName }) => {
  return {
    type: SET_CLIENT_NAME,
    payload: { name: clientName },
  };
};
