import classNames from "classnames/bind";
import styles from "./styles/mentoringProfile.module.scss";
import {
  MentoringStatsMockData,
  MentoringTestimonialsMockData,
} from "./data/mentoringData";
import React, { memo, useCallback, useEffect, useState } from "react";
import BookingModal from "./components/BookingModal";
import MenteeComment from "./components/MenteeComment";
import {
  handleRequestGetMentorProfile,
  hanldeRequestMentorActivities,
  hanldeRequestMentorCertificate,
  hanldeRequestMentorExpertise,
  hanldeRequestMentorExpirence,
} from "../../apis/mentorProfile";
import { useParams } from "react-router-dom";
import NotFoundPage from "../notFound";
import {
  MentorActivity,
  MentorCertificate,
  MentorExperience,
  MentorExpertise,
  MentorProfile,
} from "../../interfaces/mentorProfile";

const cx = classNames.bind(styles);

const SkeletonProfileHeader: React.FC = () => (
  <div className={cx("profile-header", "skeleton")}>
    <div className={cx("skeleton-title")}></div>
    <div className={cx("skeleton-name")}></div>
    <div className={cx("skeleton-text")}></div>
  </div>
);

const SkeletonProfileImage: React.FC = () => (
  <div className={cx("profile-image-container")}>
    <div className={cx("profile-image", "skeleton")}></div>
  </div>
);

const SkeletonStats: React.FC = () => (
  <div className={cx("stats-container")}>
    {[1, 2].map((_, index) => (
      <div key={index} className={cx("stat-item", "skeleton")}>
        <div className={cx("stat-number", "skeleton")}></div>
        <div className={cx("stat-title", "skeleton")}></div>
      </div>
    ))}
  </div>
);

const SkeletonExperience: React.FC = () => (
  <div className={cx("experience-item", "skeleton")}>
    <div className={cx("experience-title", "skeleton")}></div>
    <div className={cx("experience-company", "skeleton")}></div>
    <div className={cx("experience-date", "skeleton")}></div>
    <div className={cx("skeleton-text")}></div>
  </div>
);

const SkeletonCertificate: React.FC = () => (
  <div className={cx("certificate-card", "skeleton")}>
    <div className={cx("certificate-title", "skeleton")}></div>
    <div className={cx("certificate-details", "skeleton")}>
      <span className={cx("skeleton-text")}></span>
      <span className={cx("skeleton-text")}></span>
    </div>
  </div>
);

const SkeletonSkill: React.FC = () => (
  <div className={cx("skill-card", "skeleton")}>
    <div className={cx("skeleton-title")}></div>
    <ul>
      <li className={cx("skeleton-text")}></li>
    </ul>
  </div>
);

const SkeletonActivity: React.FC = () => (
  <div className={cx("gallery-item", "skeleton")}>
    <div className={cx("skeleton-image")}></div>
  </div>
);

const SectionState: React.FC<{
  isLoading: boolean;
  error: string;
  onRetry: () => void;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}> = ({ isLoading, error, onRetry, isEmpty, emptyMessage, children }) => {
  if (isLoading) {
    return null;
  }
  if (error) {
    return (
      <div className={cx("section-state-container")}>
        <p className={cx("error-message")}>{error}</p>
        <button onClick={onRetry} className={cx("retry-button")}>
          <i className="fe fe-refresh-cw" /> Thử lại
        </button>
      </div>
    );
  }
  if (isEmpty && emptyMessage) {
    return <p className={cx("empty-message")}>{emptyMessage}</p>;
  }
  return <>{children}</>;
};

const MentoringProfilePage = () => {
  const { mentorId } = useParams();

  const [isOpenBooking, setIsOpenBooking] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState(window.innerWidth);
  const [profileData, setProfileData] = useState<MentorProfile | null>(null);
  const [expData, setExpData] = useState<MentorExperience[]>([]);
  const [activitiesData, setActivitiesData] = useState<MentorActivity[]>([]);
  const [certData, setCertData] = useState<MentorCertificate[]>([]);
  const [expertiseData, setExpertiseData] = useState<MentorExpertise[]>([]);
  const [loadingStates, setLoadingStates] = useState({
    profile: true,
    experiences: true,
    activities: true,
    certificates: true,
    expertise: true,
  });
  const [errorStates, setErrorStates] = useState({
    profile: "",
    experiences: "",
    activities: "",
    certificates: "",
    expertise: "",
  });

  const LAYOUT_BREAKPOINT = 768;
  const isAuth = true;
  const isRegistered = false;

  const updateLoadingState = (
    key: keyof typeof loadingStates,
    value: boolean
  ) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  };

  const updateErrorState = (key: keyof typeof errorStates, message: string) => {
    setErrorStates((prev) => ({ ...prev, [key]: message }));
  };

  const fetchProfile = async () => {
    if (!mentorId) return;
    updateLoadingState("profile", true);
    updateErrorState("profile", "");
    try {
      const res = await handleRequestGetMentorProfile(mentorId);
      setProfileData(res.data);
    } catch (err) {
      updateErrorState("profile", "Không thể tải thông tin hồ sơ");
      console.error("Error with fetch Profile: ", err);
    } finally {
      updateLoadingState("profile", false);
    }
  };

  const fetchExp = async () => {
    if (!mentorId) return;
    updateLoadingState("experiences", true);
    updateErrorState("experiences", "");
    try {
      const res = await hanldeRequestMentorExpirence(mentorId);
      setExpData(res.experiences || []);
    } catch (err) {
      updateErrorState("experiences", "Không thể tải dữ liệu kinh nghiệm");
      console.error("Fetch Exp Error: ", err);
    } finally {
      updateLoadingState("experiences", false);
    }
  };

  const fetchActivitie = async () => {
    if (!mentorId) return;
    updateLoadingState("activities", true);
    updateErrorState("activities", "");
    try {
      const res = await hanldeRequestMentorActivities(mentorId);
      setActivitiesData(res.activities || []);
    } catch (err) {
      updateErrorState("activities", "Không thể tải dữ liệu hoạt động");
      console.error("Fetch Activitie Error: ", err);
    } finally {
      updateLoadingState("activities", false);
    }
  };

  const fetchExpertise = async () => {
    if (!mentorId) return;
    updateLoadingState("expertise", true);
    updateErrorState("expertise", "");
    try {
      const res = await hanldeRequestMentorExpertise(mentorId);
      setExpertiseData(res?.data || []);
    } catch (err) {
      updateErrorState("expertise", "Không thể tải dữ liệu chuyên môn");
      console.error("Fetch Expertise Error: ", err);
    } finally {
      updateLoadingState("expertise", false);
    }
  };

  const fetchCertificate = async () => {
    if (!mentorId) return;
    updateLoadingState("certificates", true);
    updateErrorState("certificates", "");
    try {
      const res = await hanldeRequestMentorCertificate(mentorId);
      setCertData(res?.data || []);
    } catch (err) {
      updateErrorState("certificates", "Không thể tải dữ liệu chứng chỉ");
      console.error("Fetch Certificate Error: ", err);
    } finally {
      updateLoadingState("certificates", false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchExp();
    fetchActivitie();
    fetchExpertise();
    fetchCertificate();
  }, [mentorId]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setIsOpenBooking(false);
  }, []);

  if (!mentorId) return <NotFoundPage />;

  return (
    <React.Fragment>
      <div className={cx("container")}>
        {loadingStates.profile ? (
          <SkeletonProfileHeader />
        ) : errorStates.profile ? (
          <div className={cx("section-state-container")}>
            <p className={cx("error-message")}>{errorStates.profile}</p>
            <button onClick={fetchProfile} className={cx("retry-button")}>
              <i className="fe fe-refresh-cw" /> Thử lại
            </button>
          </div>
        ) : (
          <header
            className={cx(
              "profile-header",
              "animate__animated",
              "animate__fadeIn"
            )}
          >
            <h1>Mentor Professional</h1>
            <h2 className={cx("mentor-name")}>
              {profileData?.user.salutation && profileData.user.salutation}
              {profileData?.user.firstName || ""}{" "}
              {profileData?.user.lastName || ""}
            </h2>
            <p>Hỗ trợ phát triển kỹ năng & sự nghiệp</p>
          </header>
        )}

        <div className={cx("profile-content")}>
          <main className={cx("main-content", "fade-in")}>
            {loadingStates.profile ? (
              <>
                <SkeletonProfileImage />
                <h2 className={cx("section-title")}>Giới thiệu</h2>
                <div className={cx("skeleton-text")}></div>
                <SkeletonStats />
              </>
            ) : errorStates.profile ? (
              <div className={cx("section-state-container")}>
                <p className={cx("error-message")}>{errorStates.profile}</p>
                <button onClick={fetchProfile} className={cx("retry-button")}>
                  <i className="fe fe-refresh-cw" /> Thử lại
                </button>
              </div>
            ) : (
              <>
                <div className={cx("profile-image-container")}>
                  <img
                    src={
                      profileData?.accountUserProfile?.avatar ||
                      "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1"
                    }
                    alt="Mentor Avatar"
                    className={cx("profile-image")}
                  />
                </div>

                {profileData?.accountUserProfile?.slogan && (
                  <div className={cx("slogan-container")}>
                    <p className={cx("mentor-slogan")}>
                      "{profileData.accountUserProfile.slogan}"
                    </p>
                  </div>
                )}

                <h2 className={cx("section-title")}>Giới thiệu</h2>
                {profileData?.accountUserProfile?.introduce ? (
                  <p>{profileData.accountUserProfile.introduce}</p>
                ) : (
                  <p className={cx("empty-message")}>
                    Chưa có thông tin giới thiệu
                  </p>
                )}

                <div className={cx("stats-container")}>
                  {MentoringStatsMockData.map((stat, index) => (
                    <div key={index} className={cx("stat-item")}>
                      <div className={cx("stat-number")}>{stat.number}</div>
                      <div className={cx("stat-title")}>{stat.title}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {currentScreen < LAYOUT_BREAKPOINT && (
              <div className={cx("sidebar-section")}>
                <h2 className={cx("section-title")}>Tín chỉ</h2>
                {loadingStates.certificates ? (
                  <div className={cx("certificates-container")}>
                    {[1, 2].map((_, index) => (
                      <SkeletonCertificate key={index} />
                    ))}
                  </div>
                ) : (
                  <SectionState
                    isLoading={loadingStates.certificates}
                    error={errorStates.certificates}
                    onRetry={fetchCertificate}
                    isEmpty={certData.length === 0}
                    emptyMessage="Chưa có chứng chỉ nào được liệt kê"
                  >
                    <div className={cx("certificates-container")}>
                      {certData.map((certificate, index) => (
                        <div key={index} className={cx("certificate-card")}>
                          <div className={cx("certificate-title")}>
                            {certificate.certName}
                          </div>
                          <div className={cx("certificate-details")}>
                            <span>{certificate.issuedBy}</span>
                            <span>
                              {certificate.issuedDate.split("-")[0]}
                              {` - ${certificate.issuedEndDate.split("-")[0] === certificate.issuedDate.split("-")[0] ? "" : certificate.issuedEndDate.split("-")[0]}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionState>
                )}
              </div>
            )}

            <h2 className={cx("section-title")}>Kinh nghiệm</h2>
            {loadingStates.experiences ? (
              <div>
                {[1, 2].map((_, index) => (
                  <SkeletonExperience key={index} />
                ))}
              </div>
            ) : (
              <SectionState
                isLoading={loadingStates.experiences}
                error={errorStates.experiences}
                onRetry={fetchExp}
                isEmpty={expData.length === 0}
                emptyMessage="Chưa có kinh nghiệm nào được liệt kê"
              >
                {expData.map((exp, index) => (
                  <div key={index} className={cx("experience-item")}>
                    <div className={cx("experience-title")}>{exp.position}</div>
                    <div className={cx("experience-company")}>
                      <i className={cx("fas", "fa-building")}></i>
                      {exp.companyName}
                    </div>
                    <div className={cx("experience-date")}>
                      <i className={cx("fas", "fa-calendar-alt")}></i>
                      {exp.startDate} - {exp.endDate}
                    </div>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </SectionState>
            )}

            {currentScreen < LAYOUT_BREAKPOINT && (
              <div className={cx("sidebar-section")}>
                <h2 className={cx("section-title")}>Chuyên môn</h2>
                {loadingStates.expertise ? (
                  <div className={cx("skills-container")}>
                    {[1, 2].map((_, index) => (
                      <SkeletonSkill key={index} />
                    ))}
                  </div>
                ) : (
                  <SectionState
                    isLoading={loadingStates.expertise}
                    error={errorStates.expertise}
                    onRetry={fetchExpertise}
                    isEmpty={expertiseData.length === 0}
                    emptyMessage="Chưa có chuyên môn nào được liệt kê"
                  >
                    <div className={cx("skills-container")}>
                      {expertiseData.map((skill, index) => (
                        <div key={index} className={cx("skill-card")}>
                          <h3>{skill.expertise}</h3>
                          <ul>
                            <li>{skill.subExpertise}</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </SectionState>
                )}
              </div>
            )}

            <h2 className={cx("section-title")}>Hình ảnh hoạt động</h2>
            {loadingStates.activities ? (
              <div className={cx("gallery-container")}>
                {[1, 2, 3].map((_, index) => (
                  <SkeletonActivity key={index} />
                ))}
              </div>
            ) : (
              <SectionState
                isLoading={loadingStates.activities}
                error={errorStates.activities}
                onRetry={fetchActivitie}
                isEmpty={activitiesData.length === 0}
                emptyMessage="Chưa có hình ảnh hoạt động nào được liệt kê"
              >
                <div className={cx("gallery-container")}>
                  {activitiesData.map((gallery, index) => (
                    <div key={index} className={cx("gallery-item")}>
                      <img src={gallery.img} alt="activity" />
                      <div className={cx("gallery-overlay")}>
                        <div className={cx("gallery-info")}>
                          {gallery.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionState>
            )}

            <h2 className={cx("section-title")}>Đánh giá từ mentee</h2>
            {MentoringTestimonialsMockData.map((testimon, index) => (
              <MenteeComment
                key={index}
                avatar={testimon.author.avatar}
                name={testimon.author.name}
                rating={testimon.rating}
                testimonialText={testimon.testimonialText}
              />
            ))}
          </main>

          <aside className={cx("sidebar", "fade-in")}>
            {currentScreen >= LAYOUT_BREAKPOINT && (
              <>
                <div className={cx("sidebar-section")}>
                  <h2 className={cx("section-title")}>Chuyên môn</h2>
                  {loadingStates.expertise ? (
                    <div className={cx("skills-container")}>
                      {[1, 2].map((_, index) => (
                        <SkeletonSkill key={index} />
                      ))}
                    </div>
                  ) : (
                    <SectionState
                      isLoading={loadingStates.expertise}
                      error={errorStates.expertise}
                      onRetry={fetchExpertise}
                      isEmpty={expertiseData.length === 0}
                      emptyMessage="Chưa có chuyên môn nào được liệt kê"
                    >
                      <div className={cx("skills-container")}>
                        {expertiseData.map((skill, index) => (
                          <div key={index} className={cx("skill-card")}>
                            <h3>{skill.expertise}</h3>
                            <ul>
                              <li>{skill.subExpertise}</li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </SectionState>
                  )}
                </div>

                <div className={cx("sidebar-section")}>
                  <h2 className={cx("section-title")}>Tín chỉ</h2>
                  {loadingStates.certificates ? (
                    <div className={cx("certificates-container")}>
                      {[1, 2].map((_, index) => (
                        <SkeletonCertificate key={index} />
                      ))}
                    </div>
                  ) : (
                    <SectionState
                      isLoading={loadingStates.certificates}
                      error={errorStates.certificates}
                      onRetry={fetchCertificate}
                      isEmpty={certData.length === 0}
                      emptyMessage="Chưa có chứng chỉ nào được liệt kê"
                    >
                      <div className={cx("certificates-container")}>
                        {certData.map((certificate, index) => (
                          <div key={index} className={cx("certificate-card")}>
                            <div className={cx("certificate-title")}>
                              {certificate.certName}
                            </div>
                            <div className={cx("certificate-details")}>
                              <span>{certificate.issuedBy}</span>
                              <span>
                                {certificate.issuedDate.split("-")[0]}
                                {`${certificate.issuedEndDate.split("-")[0] === certificate.issuedDate.split("-")[0] ? "" : ` - ${certificate.issuedEndDate.split("-")[0]}`}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </SectionState>
                  )}
                </div>
              </>
            )}

            {isAuth && (
              <div className={cx("sidebar-section")}>
                <button
                  onClick={() => setIsOpenBooking(true)}
                  type="button"
                  className={cx("cta-button")}
                >
                  {isRegistered ? "Đặt lịch tư vấn miễn phí" : "Đăng ký tư vấn"}
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>

      <BookingModal onClose={handleOnCloseModal} isOpenModal={isOpenBooking} />
    </React.Fragment>
  );
};

export default memo(MentoringProfilePage);
