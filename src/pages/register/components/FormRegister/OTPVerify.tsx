import React, { useState, useRef, useEffect } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { RegisterFormValue } from "../../../../schemas";

interface OTPInputProps {
  onVerify: (otp: string) => void;
  onResendOTP: (email: string) => void;
  email: string;
  setValue: UseFormSetValue<RegisterFormValue>;
  getValues: UseFormGetValues<RegisterFormValue>;
  error?: string;
}

const OtpInput: React.FC<OTPInputProps> = ({
  onVerify,
  onResendOTP,
  email,
  setValue,
  getValues,
  error,
}) => {
  const [otp, setOtp] = useState<string[]>(
    () => getValues("otp")?.split("") || new Array(6).fill("")
  );
  const [countdown, setCountdown] = useState<number>(600);
  const [isResend, setIsResend] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setValue("otp", otp.join(""));
  }, [otp, setValue]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, onResendOTP, countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.includes("")) {
      return;
    }
    onVerify(otp.join(""));
  };

  const handleResendOTP = () => {
    onResendOTP(email);
    setIsResend(false);
    setCountdown(600);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>
      <div className="text-center mb-5">
        <h2>Xác thực Email với OTP</h2>
        <p className="text-secondary mb-0">
          Mentoring chúng tôi đã gửi tin nhắn xác thực kèm otp tới email:{" "}
          <span className="fw-bold">{email ?? ""}</span>
        </p>

        <div className="d-flex flex-row justify-content-center gap-3 my-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              // ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`text-center border-2  border-secondary rounded-3 ${error && "border-danger"}`}
              style={{ width: 50, height: 50 }}
            />
          ))}
        </div>
        {error && <p className="text-danger m-0">{error}</p>}

        <p className="mt-2 text-secondary">
          Mã OTP hết hạn sau: <strong>{formatTime(countdown)}</strong>
        </p>

        <div className="mt-4">
          {isResend ? (
            <>
              <button
                type="button"
                onClick={handleResendOTP}
                className="btn btn-primary"
              >
                Gửi lại mã OTP
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Xác thực OTP
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OtpInput;
