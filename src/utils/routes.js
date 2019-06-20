import {
  K_ROUTE_REGISTER,
  K_ROUTE_LOGIN,
  K_ROUTE_BY_NAME,
  K_ROUTE_BY_ID,
  K_LABEL_BY_NAME,
  K_LABEL_BY_ID
} from "utils/constants";

import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
import Searcher from "components/Searcher";

import getApiByName from "libs/getApiByName";
import getApiById from "libs/getApiById";

const routes = [
  {
    path: K_ROUTE_LOGIN,
    component: LoginForm,
    props: {}
  },
  {
    path: K_ROUTE_REGISTER,
    component: RegisterForm,
    props: {}
  },
  {
    path: K_ROUTE_BY_NAME,
    component: Searcher,
    props: {
      routeOther: K_ROUTE_BY_ID,
      getApiFunction: getApiByName,
      label: K_LABEL_BY_NAME,
      labelOther: K_LABEL_BY_ID
    }
  },
  {
    path: K_ROUTE_BY_ID,
    component: Searcher,
    props: {
      routeOther: K_ROUTE_BY_NAME,
      getApiFunction: getApiById,
      label: K_LABEL_BY_ID,
      labelOther: K_LABEL_BY_NAME
    }
  }
];

export default routes;
