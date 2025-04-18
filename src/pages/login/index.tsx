import { Helmet } from "react-helmet";

import { FormLogin } from "./components";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Mentoring - Đăng nhập</title>
      </Helmet>

      <FormLogin />
    </>
  );
};

export default LoginPage;
