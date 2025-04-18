import { useState } from "react";
import { FaHandshake, FaRegHandshake, FaPen } from "react-icons/fa";
// import styles from "./formrequest.module.scss";
// import { FaRegHandshake, FaPen } from "react-icons/fa";
import styles from "./RequestMentor.module.scss";

function RequestMentor() {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState("");
  const [expectation, setExpectation] = useState("");
  const [question, setQuestion] = useState("");
  const [interview, setInterview] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Lý do chọn mentor:", reason);
    console.log("Lý do :", showForm);
    console.log("Mong muốn:", expectation);
    console.log("Câu hỏi:", question);
    console.log("Phỏng vấn:", interview);
  };
  const handleConnectClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <div>
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5">Gặp gỡ Mentor của bạn</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className={styles.cardWrapper}>
                <img
                  src="https://i.pravatar.cc/100?img=1"
                  alt="Mentor 1"
                  className={`rounded-circle ${styles.avatar}`}
                  width="100"
                  height="100"
                />
                <h5 className="mt-2 fw-semibold">Nguyễn Văn A</h5>
                <h6 className="text-muted mb-2">
                  Frontend Mentor | React, TypeScript
                </h6>
                <p className="text-secondary fst-italic small mb-4">
                  "Luôn đồng hành cùng bạn trên hành trình chinh phục code."
                </p>
                <button
                  className={styles.gradientBtn}
                  onClick={handleConnectClick}
                >
                  <FaHandshake />
                  Kết nối với mentor
                </button>
              </div>
            </div>

            <div className="col">
              <div className={styles.cardWrapper}>
                <img
                  src="https://i.pravatar.cc/100?img=2"
                  alt="Mentor 2"
                  className={`rounded-circle ${styles.avatar}`}
                  width="100"
                  height="100"
                />
                <h5 className="mt-2 fw-semibold">Trần Thị B</h5>
                <h6 className="text-muted mb-2">
                  Backend Mentor | Node.js, MongoDB
                </h6>
                <p className="text-secondary fst-italic small mb-4">
                  "Giải pháp đơn giản cho những vấn đề phức tạp."
                </p>
                <button
                  className={styles.gradientBtn}
                  onClick={handleConnectClick}
                >
                  <FaHandshake />
                  Kết nối với mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className={`${styles.formCard} p-4`}>
              <h4 className="fw-bold mb-4 text-center">Lý do & Mong muốn</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="reason" className="form-label fw-semibold">
                    <FaPen className="me-2" />
                    Lý do bạn chọn mentor này
                  </label>
                  <textarea
                    id="reason"
                    className="form-control"
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Hãy chia sẻ lý do bạn cảm thấy mentor này phù hợp..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="expectation"
                    className="form-label fw-semibold"
                  >
                    <FaRegHandshake className="me-2" />
                    Mong muốn khi gặp gỡ mentor
                  </label>
                  <textarea
                    id="expectation"
                    className="form-control"
                    rows={3}
                    value={expectation}
                    onChange={(e) => setExpectation(e.target.value)}
                    placeholder="Bạn muốn học được gì? Kỳ vọng gì từ buổi gặp gỡ?"
                    required
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className={`${styles.formCard} p-4`}>
              <h4 className="fw-bold mb-4 text-center">Câu hỏi & Phỏng vấn</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="question" className="form-label fw-semibold">
                    <FaPen className="me-2" />
                    Câu hỏi bạn muốn hỏi mentor
                  </label>
                  <textarea
                    id="question"
                    className="form-control"
                    rows={3}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Hãy chia sẻ câu hỏi bạn muốn hỏi mentor..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="interview" className="form-label fw-semibold">
                    <FaRegHandshake className="me-2" />
                    Kỳ vọng về buổi phỏng vấn
                  </label>
                  <textarea
                    id="interview"
                    className="form-control"
                    rows={3}
                    value={interview}
                    onChange={(e) => setInterview(e.target.value)}
                    placeholder="Bạn kỳ vọng gì từ buổi phỏng vấn với mentor?"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center my-4">
          <button type="submit" className={styles.submitBtn}>
            Gửi yêu cầu
          </button>
        </div>
      </div>
    </>
  );
}

export default RequestMentor;
