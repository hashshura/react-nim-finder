import {
  K_ROUTE_REGISTER,
  K_ROUTE_LOGIN,
  K_ROUTE_BYNAME,
  K_ROUTE_BYID
} from "utils/constants";

import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
import SearchById from "components/SearchById";

const routes = [
  {
    path: K_ROUTE_LOGIN,
    component: LoginForm
  },
  {
    path: K_ROUTE_REGISTER,
    component: RegisterForm
  },
  {
    path: K_ROUTE_BYID,
    component: SearchById
  },
];

export default routes;