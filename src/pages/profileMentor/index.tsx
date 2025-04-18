import classNames from "classnames/bind";
import styles from "./styles/mentoringProfile.module.scss";
import { MentoringTestimonialsMockData } from "./data/mentoringData";
import React, { memo, useEffect, useState } from "react";
import MenteeComment from "./components/MenteeComment";
import { useNavigate } from "react-router-dom";
import {
  handleRequestGetMentorProfile,
  hanldeRequestMentorActivities,
  hanldeRequestMentorCertificate,
  hanldeRequestMentorExpertise,
  hanldeRequestMentorExpirence,
} from "../../apis/mentorProfile";
import Cookies from "universal-cookie";
import {
  MentorActivity,
  MentorCertificate,
  MentorDetailsProfile,
  MentorExperience,
  MentorExpertise,
} from "../../interfaces/mentorProfile";

const cookies = new Cookies();
const cx = classNames.bind(styles);

const SkeletonProfileHeader = () => (
  <div className={cx("profile-header", "skeleton")}>
    <div className={cx("skeleton-title")}></div>
    <div className={cx("skeleton-name")}></div>
    <div className={cx("skeleton-text")}></div>
  </div>
);

const SkeletonProfileImage = () => (
  <div className={cx("profile-image-container")}>
    <div className={cx("profile-image", "skeleton")}></div>
  </div>
);

const SkeletonStats = () => (
  <div className={cx("stats-container")}>
    {[1, 2].map((_, index) => (
      <div key={index} className={cx("stat-item", "skeleton")}>
        <div className={cx("stat-number", "skeleton")}></div>
        <div className={cx("stat-title", "skeleton")}></div>
      </div>
    ))}
  </div>
);

const SkeletonExperience = () => (
  <div className={cx("experience-item", "skeleton")}>
    <div className={cx("experience-title", "skeleton")}></div>
    <div className={cx("experience-company", "skeleton")}></div>
    <div className={cx("experience-date", "skeleton")}></div>
    <div className={cx("skeleton-text")}></div>
  </div>
);

const SkeletonCertificate = () => (
  <div className={cx("certificate-card", "skeleton")}>
    <div className={cx("certificate-title", "skeleton")}></div>
    <div className={cx("certificate-details", "skeleton")}>
      <span className={cx("skeleton-text")}></span>
      <span className={cx("skeleton-text")}></span>
    </div>
  </div>
);

const SkeletonSkill = () => (
  <div className={cx("skill-card", "skeleton")}>
    <div className={cx("skeleton-title")}></div>
    <ul>
      <li className={cx("skeleton-text")}></li>
    </ul>
  </div>
);

const SkeletonActivity = () => (
  <div className={cx("gallery-item", "skeleton")}>
    <div className={cx("skeleton-image")}></div>
  </div>
);

const SkeletonCitizenId = () => (
  <div className={cx("citizen-id-container", "skeleton")}>
    <div className={cx("skeleton-text")}></div>
    <div className={cx("citizen-id-images")}>
      <div className={cx("citizen-id-image", "skeleton")}></div>
      <div className={cx("citizen-id-image", "skeleton")}></div>
    </div>
  </div>
);

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => (
  <div className={cx("error-container")}>
    <p>{message}</p>
    <button onClick={onRetry} className={cx("retry-button")}>
      <i className="fe fe-refresh-cw" /> Thử lại
    </button>
  </div>
);

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
}) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div className={cx("modal-overlay")} onClick={onClose}>
      <div className={cx("modal-content")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("modal-close")} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <img src={imageSrc} alt="Citizen ID" className={cx("modal-image")} />
      </div>
    </div>
  );
};

const ProfileMentorPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<number>(window.innerWidth);
  const [profileData, setProfileData] = useState<
    MentorDetailsProfile | undefined
  >(undefined);
  const [experiences, setExperiences] = useState<MentorExperience[]>([]);
  const [activities, setActivities] = useState<MentorActivity[]>([]);
  const [certificate, setCertificate] = useState<MentorCertificate[]>([]);
  const [skills, setSkills] = useState<MentorExpertise[]>([]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    imageSrc: string | null;
  }>({ isOpen: false, imageSrc: null });
  const [loadingStates, setLoadingStates] = useState<{
    profile: boolean;
    experiences: boolean;
    activities: boolean;
    certificates: boolean;
    skills: boolean;
  }>({
    profile: true,
    experiences: true,
    activities: true,
    certificates: true,
    skills: true,
  });
  const [errorStates, setErrorStates] = useState<{
    profile: string;
    experiences: string;
    activities: string;
    certificates: string;
    skills: string;
  }>({
    profile: "",
    experiences: "",
    activities: "",
    certificates: "",
    skills: "",
  });

  const LAYOUT_BREAKPOINT = 768;

  const updateLoadingState = (
    key: keyof typeof loadingStates,
    value: boolean
  ): void => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  };

  const updateErrorState = (
    key: keyof typeof errorStates,
    message: string
  ): void => {
    setErrorStates((prev) => ({ ...prev, [key]: message }));
  };

  const fetchProfileData = async () => {
    updateLoadingState("profile", true);
    updateErrorState("profile", "");
    try {
      const mentorId = cookies.get("MENTORING_USER_INFO")?.userID || "";
      const res = await handleRequestGetMentorProfile(mentorId);
      setProfileData(res?.data);
    } catch {
      updateErrorState("profile", "Không thể tải thông tin hồ sơ");
    } finally {
      updateLoadingState("profile", false);
    }
  };

  const fetchExperiencesData = async () => {
    updateLoadingState("experiences", true);
    updateErrorState("experiences", "");
    try {
      const mentorId = cookies.get("MENTORING_USER_INFO")?.userID || "";
      const res = await hanldeRequestMentorExpirence(mentorId);
      setExperiences(res?.experiences || []);
    } catch {
      updateErrorState("experiences", "Không thể tải dữ liệu kinh nghiệm");
    } finally {
      updateLoadingState("experiences", false);
    }
  };

  const fetchActivitiesData = async () => {
    updateLoadingState("activities", true);
    updateErrorState("activities", "");
    try {
      const mentorId = cookies.get("MENTORING_USER_INFO")?.userID || "";
      const res = await hanldeRequestMentorActivities(mentorId);
      setActivities(res?.activities || []);
    } catch {
      updateErrorState("activities", "Không thể tải dữ liệu hoạt động");
    } finally {
      updateLoadingState("activities", false);
    }
  };

  const fetchSkillData = async () => {
    updateLoadingState("skills", true);
    updateErrorState("skills", "");
    try {
      const mentorId = cookies.get("MENTORING_USER_INFO")?.userID || "";
      const res = await hanldeRequestMentorExpertise(mentorId);
      setSkills(res || []);
    } catch {
      updateErrorState("skills", "Không thể tải dữ liệu kỹ năng");
    } finally {
      updateLoadingState("skills", false);
    }
  };

  const fetchCertificatesData = async () => {
    updateLoadingState("certificates", true);
    updateErrorState("certificates", "");
    try {
      const mentorId = cookies.get("MENTORING_USER_INFO")?.userID || "";
      const res = await hanldeRequestMentorCertificate(mentorId);
      setCertificate(res?.data || []);
    } catch {
      updateErrorState("certificates", "Không thể tải dữ liệu chứng chỉ");
    } finally {
      updateLoadingState("certificates", false);
    }
  };

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const openModal = (imageSrc: string) => {
    setModalState({ isOpen: true, imageSrc });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, imageSrc: null });
  };

  useEffect(() => {
    fetchProfileData();
    fetchExperiencesData();
    fetchActivitiesData();
    fetchSkillData();
    fetchCertificatesData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCurrentScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getGenderText = (gender: number): string => {
    if (gender === 0) {
      return "Nam";
    } else if (gender === 1) {
      return "Nữ";
    }

    return "Khác";
  };

  return (
    <React.Fragment>
      <div className={cx("container")}>
        {loadingStates.profile ? (
          <SkeletonProfileHeader />
        ) : errorStates.profile ? (
          <ErrorDisplay
            message={errorStates.profile}
            onRetry={fetchProfileData}
          />
        ) : (
          <header
            className={cx(
              "profile-header",
              "animate__animated",
              "animate__fadeIn"
            )}
          >
            <div className={cx("profile-header-content")}>
              <div>
                <h1>Mentor Profile</h1>
                <h2 className={cx("mentor-name")}>
                  {profileData?.user.salutation
                    ? `${profileData.user.salutation} `
                    : ""}
                  {profileData?.user.firstName} {profileData?.user.lastName}
                </h2>
                <p>Hỗ trợ phát triển kỹ năng & sự nghiệp</p>
              </div>
              <button onClick={handleEditProfile} className={cx("edit-button")}>
                <i className="fe fe-edit-2"></i> Chỉnh sửa hồ sơ
              </button>
            </div>
          </header>
        )}
        <div className={cx("profile-content")}>
          <main className={cx("main-content", "fade-in")}>
            {loadingStates.profile ? (
              <>
                <SkeletonProfileImage />
                <SkeletonStats />
                <SkeletonCitizenId />
              </>
            ) : errorStates.profile ? (
              <ErrorDisplay
                message={errorStates.profile}
                onRetry={fetchProfileData}
              />
            ) : (
              <>
                <div className={cx("profile-image-container")}>
                  <img
                    src={
                      profileData?.accountUserProfile.avatar ||
                      "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1"
                    }
                    alt="Mentor Avatar"
                    className={cx("profile-image")}
                  />
                </div>
                {profileData?.accountUserProfile.slogan && (
                  <div className={cx("slogan-container")}>
                    <p className={cx("mentor-slogan")}>
                      "{profileData.accountUserProfile.slogan}"
                    </p>
                  </div>
                )}
                <h2 className={cx("section-title")}>Thông tin cơ bản</h2>
                <div className={cx("basic-info-container")}>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Email:</span>
                    <span>
                      {profileData?.user.email || "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Số điện thoại:</span>
                    <span>
                      {profileData?.user.phoneNumber || "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Giới tính:</span>
                    <span>
                      {profileData?.user.gender !== undefined
                        ? getGenderText(profileData.user.gender)
                        : "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Ngày sinh:</span>
                    <span>{profileData?.user.dob || "Chưa có thông tin"}</span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Địa chỉ:</span>
                    <span>
                      {profileData?.accountUserProfile.address ||
                        "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Trạng thái:</span>
                    <span>
                      {profileData?.user.status || "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Ngày kích hoạt:</span>
                    <span>
                      {new Date(
                        profileData?.user?.activeDate || ""
                      ).toLocaleDateString("en-US", {
                        timeZone: "Asia/Ho_Chi_Minh",
                      }) || "Chưa có thông tin"}
                    </span>
                  </div>
                  <div className={cx("info-item")}>
                    <span className={cx("info-label")}>Giới thiệu:</span>
                    <span>
                      {profileData?.accountUserProfile.introduce ||
                        "Chưa có thông tin giới thiệu"}
                    </span>
                  </div>
                  {profileData?.accountUserProfile.cvFile && (
                    <div className={cx("info-item")}>
                      <span className={cx("info-label")}>CV:</span>
                      <a
                        href={profileData.accountUserProfile.cvFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx("cv-link")}
                      >
                        Xem CV
                      </a>
                    </div>
                  )}
                </div>

                {profileData?.MT_CD && (
                  <>
                    <h2 className={cx("section-title")}>Thông tin căn cước</h2>
                    <div className={cx("citizen-id-container")}>
                      <div className={cx("info-item")}>
                        <span className={cx("info-label")}>
                          Số căn cước công dân:
                        </span>
                        <span>
                          {profileData.MT_CD.uIDRef || "Chưa có thông tin"}
                        </span>
                      </div>
                      {(profileData.MT_CD.uCFTs || profileData.MT_CD.iCBKs) && (
                        <div className={cx("citizen-id-images")}>
                          {profileData.MT_CD.uCFTs && (
                            <div className={cx("citizen-id-image-container")}>
                              <img
                                src={profileData.MT_CD.uCFTs}
                                alt="CCCD Mặt trước"
                                className={cx("citizen-id-image")}
                                onClick={() =>
                                  openModal(profileData.MT_CD.uCFTs)
                                }
                              />
                              <span className={cx("citizen-id-label")}>
                                Mặt trước
                              </span>
                            </div>
                          )}
                          {profileData.MT_CD.iCBKs && (
                            <div className={cx("citizen-id-image-container")}>
                              <img
                                src={profileData.MT_CD.iCBKs}
                                alt="CCCD Mặt sau"
                                className={cx("citizen-id-image")}
                                onClick={() =>
                                  openModal(profileData.MT_CD.iCBKs)
                                }
                              />
                              <span className={cx("citizen-id-label")}>
                                Mặt sau
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <h2 className={cx("section-title")}>Thống kê Mentor</h2>
                <div className={cx("stats-container")}>
                  <div className={cx("stat-item")}>
                    <div className={cx("stat-number")}>0</div>
                    <div className={cx("stat-title")}>Số lần hỗ trợ</div>
                  </div>
                  <div className={cx("stat-item")}>
                    <div className={cx("stat-number")}>0</div>
                    <div className={cx("stat-title")}>Số lượng Booking</div>
                  </div>
                </div>
              </>
            )}

            {currentScreen < LAYOUT_BREAKPOINT &&
              (loadingStates.certificates ? (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chứng chỉ</h2>
                  <div className={cx("certificates-container")}>
                    {[1, 2].map((_, index) => (
                      <SkeletonCertificate key={index} />
                    ))}
                  </div>
                </div>
              ) : errorStates.certificates ? (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chứng chỉ</h2>
                  <ErrorDisplay
                    message={errorStates.certificates}
                    onRetry={fetchCertificatesData}
                  />
                </div>
              ) : certificate.length > 0 ? (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chứng chỉ</h2>
                  <div className={cx("certificates-container")}>
                    {certificate.map((certificate, index) => (
                      <div key={index} className={cx("certificate-card")}>
                        <div className={cx("certificate-title")}>
                          {certificate.certName}
                        </div>
                        <div className={cx("certificate-details")}>
                          <span>Cấp bởi: {certificate.issuedBy}</span>
                          <span>
                            {certificate.issuedDate} -{" "}
                            {certificate.issuedEndDate}
                          </span>
                          {certificate.certFile && (
                            <a
                              href={certificate.certFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cx("certificate-link")}
                            >
                              Xem chứng chỉ
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chứng chỉ</h2>
                  <div className={cx("empty-section")}>
                    <p>Chưa có thông tin chứng chỉ</p>
                  </div>
                </div>
              ))}

            {loadingStates.experiences ? (
              <>
                <h2 className={cx("section-title")}>Kinh nghiệm</h2>
                {[1, 2].map((_, index) => (
                  <SkeletonExperience key={index} />
                ))}
              </>
            ) : errorStates.experiences ? (
              <>
                <h2 className={cx("section-title")}>Kinh nghiệm</h2>
                <ErrorDisplay
                  message={errorStates.experiences}
                  onRetry={fetchExperiencesData}
                />
              </>
            ) : experiences.length > 0 ? (
              <>
                <h2 className={cx("section-title")}>Kinh nghiệm</h2>
                {experiences.map((exp, index) => (
                  <div key={index} className={cx("experience-item")}>
                    <div className={cx("experience-title")}>{exp.position}</div>
                    <div className={cx("experience-company")}>
                      <i className="fas fa-building"></i> {exp.companyName}
                    </div>
                    <div className={cx("experience-date")}>
                      <i className="fas fa-calendar-alt"></i> {exp.startDate} -{" "}
                      {exp.endDate}
                    </div>
                    <p>{exp.description || "Không có mô tả"}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h2 className={cx("section-title")}>Kinh nghiệm</h2>
                <div className={cx("empty-section")}>
                  <p>Chưa có thông tin kinh nghiệm</p>
                </div>
              </>
            )}

            {currentScreen < LAYOUT_BREAKPOINT &&
              (loadingStates.skills ? (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chuyên môn</h2>
                  <div className={cx("skills-container")}>
                    {[1, 2].map((_, index) => (
                      <SkeletonSkill key={index} />
                    ))}
                  </div>
                </div>
              ) : errorStates.skills ? (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chuyên môn</h2>
                  <ErrorDisplay
                    message={errorStates.skills}
                    onRetry={fetchSkillData}
                  />
                </div>
              ) : skills.length > 0 ? (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chuyên môn</h2>
                  <div className={cx("skills-container")}>
                    {skills.map((skill, index) => (
                      <div key={index} className={cx("skill-card")}>
                        <h3>{skill.expertise}</h3>
                        <ul>
                          <li>{skill.subExpertise || "Không có chi tiết"}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={cx("main-section")}>
                  <h2 className={cx("section-title")}>Chuyên môn</h2>
                  <div className={cx("empty-section")}>
                    <p>Chưa có thông tin chuyên môn</p>
                  </div>
                </div>
              ))}

            {loadingStates.activities ? (
              <>
                <h2 className={cx("section-title")}>Hình ảnh hoạt động</h2>
                <div className={cx("gallery-container")}>
                  {[1, 2, 3].map((_, index) => (
                    <SkeletonActivity key={index} />
                  ))}
                </div>
              </>
            ) : errorStates.activities ? (
              <>
                <h2 className={cx("section-title")}>Hình ảnh hoạt động</h2>
                <ErrorDisplay
                  message={errorStates.activities}
                  onRetry={fetchActivitiesData}
                />
              </>
            ) : activities.length > 0 ? (
              <>
                <h2 className={cx("section-title")}>Hình ảnh hoạt động</h2>
                <div className={cx("gallery-container")}>
                  {activities.map((gallery, index) => (
                    <div key={index} className={cx("gallery-item")}>
                      <img src={gallery.img} alt="Activity" />
                      <div className={cx("gallery-overlay")}>
                        <div className={cx("gallery-info")}>
                          {gallery.description || "Không có mô tả"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className={cx("section-title")}>Hình ảnh hoạt động</h2>
                <div className={cx("empty-section")}>
                  <p>Chưa có hình ảnh hoạt động</p>
                </div>
              </>
            )}

            <h2 className={cx("section-title")}>Đánh giá từ Mentee</h2>
            {MentoringTestimonialsMockData.length > 0 ? (
              MentoringTestimonialsMockData.map((testimon, index) => (
                <MenteeComment
                  key={index}
                  avatar={testimon.author.avatar}
                  name={testimon.author.name}
                  rating={testimon.rating}
                  testimonialText={testimon.testimonialText}
                />
              ))
            ) : (
              <div className={cx("empty-section")}>
                <p>Chưa có đánh giá nào từ mentee</p>
              </div>
            )}
          </main>

          <aside className={cx("sidebar", "fade-in")}>
            {currentScreen >= LAYOUT_BREAKPOINT && (
              <>
                {loadingStates.skills ? (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chuyên môn</h2>
                    <div className={cx("skills-container")}>
                      {[1, 2].map((_, index) => (
                        <SkeletonSkill key={index} />
                      ))}
                    </div>
                  </div>
                ) : errorStates.skills ? (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chuyên môn</h2>
                    <ErrorDisplay
                      message={errorStates.skills}
                      onRetry={fetchSkillData}
                    />
                  </div>
                ) : skills.length > 0 ? (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chuyên môn</h2>
                    <div className={cx("skills-container")}>
                      {skills.map((skill, index) => (
                        <div key={index} className={cx("skill-card")}>
                          <h3>{skill.expertise}</h3>
                          <ul>
                            <li>{skill.subExpertise || "Không có chi tiết"}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chuyên môn</h2>
                    <div className={cx("empty-section")}>
                      <p>Chưa có thông tin chuyên môn</p>
                    </div>
                  </div>
                )}

                {loadingStates.certificates ? (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chứng chỉ</h2>
                    <div className={cx("certificates-container")}>
                      {[1, 2].map((_, index) => (
                        <SkeletonCertificate key={index} />
                      ))}
                    </div>
                  </div>
                ) : errorStates.certificates ? (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chứng chỉ</h2>
                    <ErrorDisplay
                      message={errorStates.certificates}
                      onRetry={fetchCertificatesData}
                    />
                  </div>
                ) : certificate.length > 0 ? (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chứng chỉ</h2>
                    <div className={cx("certificates-container")}>
                      {certificate.map((certificate, index) => (
                        <div key={index} className={cx("certificate-card")}>
                          <div className={cx("certificate-title")}>
                            {certificate.certName}
                          </div>
                          <div className={cx("certificate-details")}>
                            <span>Cấp bởi: {certificate.issuedBy}</span>
                            <span>
                              {certificate.issuedDate} -{" "}
                              {certificate.issuedEndDate}
                            </span>
                            {certificate.certFile && (
                              <a
                                href={certificate.certFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx("certificate-link")}
                              >
                                Xem chứng chỉ
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={cx("sidebar-section")}>
                    <h2 className={cx("section-title")}>Chứng chỉ</h2>
                    <div className={cx("empty-section")}>
                      <p>Chưa có thông tin chứng chỉ</p>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className={cx("sidebar-section")}>
              <button
                onClick={handleEditProfile}
                type="button"
                className={cx("cta-button")}
              >
                <i className="fe fe-edit-2"></i> Chỉnh sửa hồ sơ
              </button>
            </div>
          </aside>
        </div>
      </div>
      <ImageModal
        isOpen={modalState.isOpen}
        imageSrc={modalState.imageSrc}
        onClose={closeModal}
      />
    </React.Fragment>
  );
};

export default memo(ProfileMentorPage);
