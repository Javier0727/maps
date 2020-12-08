import { orderBySelect } from "../constants";

export const SET_CLIENT_NAME = "SET_CLIENT_NAME";
export const SET_CLIENT_NAME_ASYNC = "SET_CLIENT_NAME_ASYNC";
export const SET_ROUTES_DATA = "SET_ROUTES_DATA";
export const SET_ROUTES_DATA_ASYNC = "SET_ROUTES_DATA_ASYNC";
export const ORDER_BY_DISTANCE = "ORDER_BY_DISTANCE";
export const ORDER_BY_DISTANCE_ASYNC = "ORDER_BY_DISTANCE_ASYNC";
export const ORDER_BY_TIME = "ORDER_BY_TIME";
export const ORDER_BY_TIME_ASYNC = "ORDER_BY_TIME_ASYNC";

export const setRoutesData = (data) => ({
  type: SET_ROUTES_DATA,
  payload: data,
});

export const setNameClient = ({ clientName }) => ({
  type: SET_CLIENT_NAME,
  payload: { name: clientName },
});

export const orderRoutes = ({ orderBy, routes }) => {
  if (orderBy === orderBySelect[0].value) {
    return {
      type: ORDER_BY_DISTANCE,
      payload: { routes },
    };
  } else {
    return {
      type: ORDER_BY_TIME,
      payload: { routes },
    };
  }
};
