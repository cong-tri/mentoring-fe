import { Helmet } from "react-helmet";
import { FormforgotPasssword } from "./components";

const ForgotPasssWord = () => {
  return (
    <>
      <Helmet>
        <title>Mentoring - Quên Mật Khẩu</title>
      </Helmet>
      <FormforgotPasssword />
    </>
  );
};

export default ForgotPasssWord;
