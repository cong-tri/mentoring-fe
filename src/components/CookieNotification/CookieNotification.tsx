// import { useState } from "react";
import CookieConsent from "react-cookie-consent";

const CookieNotification = () => {
  // const [declined, setDeclined] = useState<boolean>(false);

  // Handler for accepting cookies
  const handleAccept = () => {
    // console.log("Cookies accepted");
    // You can add additional logic here if needed
  };

  // Handler for declining cookies
  const handleDecline = () => {
    const confirmDecline = window.confirm(
      "Are you sure you want to decline cookies? Some features may not work properly."
    );

    if (!confirmDecline) {
      // setDeclined(true);
      return;
    }
  };
  return (
    <>
      {/* Conditionally render the notification if cookies are declined */}

      {/* Cookie Consent Banner */}
      <CookieConsent
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
        location="none"
        cookieName="siteCookieConsent"
        declineButtonText="Từ chối"
        buttonText="Đồng ý"
        style={{
          position: "fixed",
          bottom: "-33px",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          background: "#f8f9fd",
          color: "black",
          padding: "12px",
          zIndex: "99999",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          alignItems: "center",
        }}
        contentStyle={{
          margin: 0,
        }}
        buttonStyle={{
          background: "#4CAF50",
          color: "white",
          width: "auto",
          fontSize: "13px",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          margin: "0",
        }}
        declineButtonStyle={{
          background: "#ff4d4d",
          width: "auto",
          color: "white",
          fontSize: "13px",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          margin: "0",
          marginRight: "20px",
        }}
      >
        <div className="container">
          <p className="mb-0">
            Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn. Tìm hiểu
            về Chính sách Cookie tại đây
          </p>
        </div>
      </CookieConsent>
    </>
  );
};

export default CookieNotification;
