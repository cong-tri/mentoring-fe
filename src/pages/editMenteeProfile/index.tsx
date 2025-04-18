import classNames from "classnames/bind";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles/editMenteeProfile.module.scss";
import { memo, useRef, useState } from "react";
import { menteeProfileSchema } from "../../schemas";
import { defaultValuesEditMenteeProfile } from "./data/editMenteeProfile";

const cx = classNames.bind(styles);

const EditMenteeProfile = () => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof menteeProfileSchema>>({
    resolver: zodResolver(menteeProfileSchema),
    mode: "onChange",
    defaultValues: defaultValuesEditMenteeProfile,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    "https://cdn.vectorstock.com/i/2000v/51/87/student-avatar-user-profile-icon-vector-47025187.avif"
  );

  const {
    fields: statsFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({ control, name: "stats" });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experiences" });

  const {
    fields: galleryFields,
    append: appendGallery,
    remove: removeGallery,
  } = useFieldArray({ control, name: "gallery" });

  const {
    fields: goalFields,
    append: appendGoal,
    remove: removeGoal,
  } = useFieldArray({ control, name: "goals" });

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({ control, name: "contacts" });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });

  const handleAddStat = () => {
    appendStat({ number: "", title: "" });
    alert("Đã thêm mục thống kê mới!");
  };

  const handleAddExperience = () => {
    appendExp({ title: "", company: "", time: "", description: "" });
    alert("Đã thêm mục kinh nghiệm mới!");
  };

  const handleAddGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Vui lòng chọn một file ảnh!");
      return;
    }
    const title = prompt("Vui lòng nhập tiêu đề cho ảnh:");
    if (!title) {
      alert("Tiêu đề là bắt buộc!");
      return;
    }
    const src = URL.createObjectURL(file);
    appendGallery({ src, title });
    alert("Đã thêm mục hình ảnh mới!");
    e.target.value = "";
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleAddGoal = () => {
    appendGoal({ title: "", description: "" });
    alert("Đã thêm mục tiêu mới!");
  };

  const handleAddContact = () => {
    appendContact({ value: "" });
    alert("Đã thêm mục liên hệ mới!");
  };

  const handleAddEducation = () => {
    appendEducation({ school: "", degree: "", time: "" });
    alert("Đã thêm mục học vấn mới!");
  };

  const onSubmit = () => {
    alert("Cập nhật hồ sơ thành công! Dữ liệu đã được in ra console.");
  };

  return (
    <div className={cx("container")}>
      <header className={cx("profile-header")}>
        <h1>Chỉnh sửa hồ sơ Mentee</h1>
        <p>Cập nhật thông tin cá nhân và mục tiêu học tập của bạn</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("profile-content")}>
        <main className={cx("main-content")}>
          <div className={cx("form-group")}>
            <label htmlFor="profile-image">Ảnh đại diện</label>
            <div className={cx("profile-image-container")}>
              <img
                src={avatarPreview}
                alt="Mentee Avatar"
                className={cx("profile-image")}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <label className={cx("upload-avatar")}>
                <span>Tải ảnh mới</span>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>

          <div className={cx("form-group")}>
            <label htmlFor="name">Họ và tên</label>
            <input
              {...register("name")}
              id="name"
              onBlur={() => trigger("name")}
              className={cx({ "input-error": errors.name })}
            />
            {errors.name && (
              <span className={cx("error")}>{errors.name.message}</span>
            )}
          </div>

          <div className={cx("form-group")}>
            <label htmlFor="bio">Giới thiệu bản thân</label>
            <textarea
              {...register("bio")}
              id="bio"
              onBlur={() => trigger("bio")}
              className={cx({ "input-error": errors.bio }, "editable")}
            />
            {errors.bio && (
              <span className={cx("error")}>{errors.bio.message}</span>
            )}
          </div>

          <div className={cx("form-group")}>
            <label>Thống kê</label>
            <div className={cx("stats-container")}>
              {statsFields.map((field, index) => (
                <div key={field.id} className={cx("stat-item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeStat(index)}
                  ></i>
                  <input
                    {...register(`stats.${index}.number`)}
                    onBlur={() => trigger(`stats.${index}.number`)}
                    className={cx({
                      "input-error": errors.stats?.[index]?.number,
                    })}
                  />
                  {errors.stats?.[index]?.number && (
                    <span className={cx("error")}>
                      {errors.stats[index].number?.message}
                    </span>
                  )}
                  <input
                    {...register(`stats.${index}.title`)}
                    onBlur={() => trigger(`stats.${index}.title`)}
                    className={cx({
                      "input-error": errors.stats?.[index]?.title,
                    })}
                  />
                  {errors.stats?.[index]?.title && (
                    <span className={cx("error")}>
                      {errors.stats[index].title?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddStat}>
              Thêm thống kê
            </div>
          </div>

          <div className={cx("form-group")}>
            <label>Kinh nghiệm cá nhân</label>
            <div className={cx("item-list")}>
              {expFields.map((field, index) => (
                <div key={field.id} className={cx("item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeExp(index)}
                  ></i>
                  <input
                    {...register(`experiences.${index}.title`)}
                    placeholder="Chức danh"
                    onBlur={() => trigger(`experiences.${index}.title`)}
                  />
                  {errors.experiences?.[index]?.title && (
                    <span className={cx("error")}>
                      {errors.experiences[index].title?.message}
                    </span>
                  )}
                  <input
                    {...register(`experiences.${index}.company`)}
                    placeholder="Công ty"
                    onBlur={() => trigger(`experiences.${index}.company`)}
                  />
                  {errors.experiences?.[index]?.company && (
                    <span className={cx("error")}>
                      {errors.experiences[index].company?.message}
                    </span>
                  )}
                  <input
                    {...register(`experiences.${index}.time`)}
                    placeholder="Thời gian"
                    onBlur={() => trigger(`experiences.${index}.time`)}
                  />
                  {errors.experiences?.[index]?.time && (
                    <span className={cx("error")}>
                      {errors.experiences[index].time?.message}
                    </span>
                  )}
                  <textarea
                    {...register(`experiences.${index}.description`)}
                    className={cx("editable")}
                    onBlur={() => trigger(`experiences.${index}.description`)}
                  />
                  {errors.experiences?.[index]?.description && (
                    <span className={cx("error")}>
                      {errors.experiences[index].description?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddExperience}>
              Thêm kinh nghiệm
            </div>
          </div>

          <div className={cx("form-group")}>
            <label>Hình ảnh hoạt động</label>
            <div className={cx("gallery-container")}>
              {galleryFields.map((field, index) => (
                <div key={field.id} className={cx("gallery-item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeGallery(index)}
                  ></i>
                  <img src={field.src} alt={field.title} />
                  <input
                    {...register(`gallery.${index}.title`)}
                    placeholder="Tiêu đề"
                    onBlur={() => trigger(`gallery.${index}.title`)}
                  />
                  {errors.gallery?.[index]?.title && (
                    <span className={cx("error")}>
                      {errors.gallery[index].title?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddGallery}>
              Thêm hình ảnh
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>

          <div className={cx("form-group")}>
            <label>Mục tiêu học tập</label>
            <div className={cx("item-list")}>
              {goalFields.map((field, index) => (
                <div key={field.id} className={cx("item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeGoal(index)}
                  ></i>
                  <input
                    {...register(`goals.${index}.title`)}
                    placeholder="Tiêu đề"
                    onBlur={() => trigger(`goals.${index}.title`)}
                  />
                  {errors.goals?.[index]?.title && (
                    <span className={cx("error")}>
                      {errors.goals[index].title?.message}
                    </span>
                  )}
                  <textarea
                    {...register(`goals.${index}.description`)}
                    className={cx("editable")}
                    onBlur={() => trigger(`goals.${index}.description`)}
                  />
                  {errors.goals?.[index]?.description && (
                    <span className={cx("error")}>
                      {errors.goals[index].description?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddGoal}>
              Thêm mục tiêu
            </div>
          </div>
        </main>

        <aside className={cx("sidebar")}>
          <div className={cx("sidebar-section", "form-group")}>
            <label>Liên hệ</label>
            <div className={cx("item-list")}>
              {contactFields.map((field, index) => (
                <div key={field.id} className={cx("item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeContact(index)}
                  ></i>
                  <input
                    {...register(`contacts.${index}.value`)}
                    placeholder="Thông tin liên hệ"
                    onBlur={() => trigger(`contacts.${index}.value`)}
                  />
                  {errors.contacts?.[index]?.value && (
                    <span className={cx("error")}>
                      {errors.contacts[index].value?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddContact}>
              Thêm liên hệ
            </div>
          </div>

          <div className={cx("sidebar-section", "form-group")}>
            <label>Học vấn</label>
            <div className={cx("item-list")}>
              {educationFields.map((field, index) => (
                <div key={field.id} className={cx("item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeEducation(index)}
                  ></i>
                  <input
                    {...register(`education.${index}.school`)}
                    placeholder="Trường học"
                    onBlur={() => trigger(`education.${index}.school`)}
                  />
                  {errors.education?.[index]?.school && (
                    <span className={cx("error")}>
                      {errors.education[index].school?.message}
                    </span>
                  )}
                  <input
                    {...register(`education.${index}.degree`)}
                    placeholder="Bằng cấp"
                    onBlur={() => trigger(`education.${index}.degree`)}
                  />
                  {errors.education?.[index]?.degree && (
                    <span className={cx("error")}>
                      {errors.education[index].degree?.message}
                    </span>
                  )}
                  <input
                    {...register(`education.${index}.time`)}
                    placeholder="Thời gian"
                    onBlur={() => trigger(`education.${index}.time`)}
                  />
                  {errors.education?.[index]?.time && (
                    <span className={cx("error")}>
                      {errors.education[index].time?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddEducation}>
              Thêm học vấn
            </div>
          </div>
        </aside>
      </form>

      <button
        type="submit"
        className={cx("submit-btn")}
        disabled={isSubmitting}
      >
        Lưu thay đổi
      </button>
    </div>
  );
};

export default memo(EditMenteeProfile);
