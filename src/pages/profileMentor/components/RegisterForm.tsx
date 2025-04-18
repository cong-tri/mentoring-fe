import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../styles/registerForm.module.scss";
import { mentorRegisterSchema } from "../../../schemas";
import { memo } from "react";

const cx = classNames.bind(styles);

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm = ({ onRegisterSuccess }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof mentorRegisterSchema>>({
    resolver: zodResolver(mentorRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = () => {
    alert("Đăng ký thành công! Bạn có thể chọn lịch booking.");
    onRegisterSuccess();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cx("booking-form")}>
      <h3>Thông tin đăng ký</h3>
      <div className={cx("form-group")}>
        <label htmlFor="name">Họ và tên</label>
        <input
          id="name"
          {...form.register("name")}
          placeholder="Nhập họ và tên"
          className={cx({ "input-error": form.formState.errors.name })}
        />
        {form.formState.errors.name && (
          <span className={cx("error")}>
            {form.formState.errors.name.message}
          </span>
        )}
      </div>
      <div className={cx("form-group")}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...form.register("email")}
          placeholder="Nhập email"
          className={cx({ "input-error": form.formState.errors.email })}
        />
        {form.formState.errors.email && (
          <span className={cx("error")}>
            {form.formState.errors.email.message}
          </span>
        )}
      </div>
      <div className={cx("form-group")}>
        <label htmlFor="phone">Số điện thoại</label>
        <input
          id="phone"
          type="tel"
          {...form.register("phone")}
          placeholder="Nhập số điện thoại"
          className={cx({ "input-error": form.formState.errors.phone })}
        />
        {form.formState.errors.phone && (
          <span className={cx("error")}>
            {form.formState.errors.phone.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className={cx("submit-btn")}
        disabled={form.formState.isSubmitting}
      >
        Đăng ký
      </button>
    </form>
  );
};

export default memo(RegisterForm);
