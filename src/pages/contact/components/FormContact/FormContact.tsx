import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./styles/formContact.module.scss";

import { inputContacts } from "./data/data";

const cx = classNames.bind(styles);

const FormContact = () => {
  const [Errors, SetErrors] = useState<Record<string, string>>({});

  const handleMessageInput = (name: string, value: string, type: string) => {
    let error = "";
    if (!value.trim()) {
      error = "Trường này không được để trống";
    } else {
      if (type === "text" && (value.length < 4 || value.length > 30)) {
        error = "Họ và tên phải từ 4 đến 30 ký tự";
      }
      if (type === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        error = "Email không hợp lệ!";
      }
      if (type === "number" && !/^\d{9,11}$/.test(value)) {
        error = "Số điện thoại phải có từ 9-11 chữ số!";
      }
    }
    SetErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  return (
    <>
      <div className={cx("col-12", "col-contact-ipad", "col-lg-6")}>
        <form
          action=""
          className="p-3 p-md-4 p-xl-5 bg-white border border-2 rounded-5 shadow-sm w-100"
        >
          {inputContacts.map((item) => (
            <div className={cx("input-group", "my-3", "my-xl-3")} key={item.id}>
              <label className={cx("input-label")} htmlFor={item.name}>
                {item.label}
              </label>
              <input
                className={cx("rounded-3", "input-contact", {
                  "input-error": Errors[item.name],
                })}
                type={item.type}
                name={item.name}
                id={item.name}
                placeholder={item.placeholder}
                minLength={item.minLength}
                maxLength={item.maxLength}
                required={item.required}
                onBlur={(e) =>
                  handleMessageInput(item.name, e.target.value, item.type)
                }
              />
              {Errors[item.name] && (
                <p className={cx("error-message", "float-start")}>
                  {Errors[item.name]}
                </p>
              )}
            </div>
          ))}
          <div className={cx("input-group")}>
            <label className={cx("input-label")} htmlFor="message">
              Tin nhắn
            </label>
            <textarea
              className={cx("rounded-3", "message")}
              name="message"
              id="message"
              placeholder="Nhập tin nhắn của bạn ở đây"
            />
          </div>
          <button
            className={cx("w-100", "rounded-4", "mb-2", "button-contact")}
            type="submit"
          >
            Gửi tin nhắn
          </button>
        </form>
      </div>
    </>
  );
};

export default FormContact;
