import {
  K_ROUTE_REGISTER,
  K_ROUTE_LOGIN,
} from "utils/constants";

import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
import Searcher from "components/Searcher";

const routes = [
  {
    path: K_ROUTE_LOGIN,
    component: LoginForm,
  },
  {
    path: K_ROUTE_REGISTER,
    component: RegisterForm,
  },
  {
    /** Default Route */
    component: Searcher,
  },
];

export default routes;
