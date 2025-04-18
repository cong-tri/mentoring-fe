import { Helmet } from "react-helmet";

import { StepperForm } from "./components";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Mentoring - Đâng Ký</title>
      </Helmet>
      <StepperForm />
    </>
  );
};

export default RegisterPage;
