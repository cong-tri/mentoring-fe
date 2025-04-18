import { memo, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import classNames from "classnames/bind";
import { mentorProfileSchema } from "../../schemas";
import { defaultValuesMentorProfileMockData } from "./data/editMentorProfile";
import styles from "./styles/editMentorProfile.module.scss";

const cx = classNames.bind(styles);

const EditMentorProfilePage = () => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof mentorProfileSchema>>({
    resolver: zodResolver(mentorProfileSchema),
    mode: "onChange",
    defaultValues: defaultValuesMentorProfileMockData,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
  );

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
    fields: methodFields,
    append: appendMethod,
    remove: removeMethod,
  } = useFieldArray({ control, name: "methods" });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
    update: updateSkill,
  } = useFieldArray({ control, name: "skills" });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certificates" });

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

  const handleAddMethod = () => {
    appendMethod({ title: "", description: "" });
    alert("Đã thêm mục phương pháp mới!");
  };

  const handleAddSkill = () => {
    appendSkill({ title: "", description: "", subItems: [""] });
    alert("Đã thêm mục chuyên môn mới!");
  };

  const handleAddSubItem = (skillIndex: number) => {
    const currentSkill = skillFields[skillIndex];
    const updatedSubItems = [...(currentSkill.subItems || []), ""];
    updateSkill(skillIndex, { ...currentSkill, subItems: updatedSubItems });
    alert("Đã thêm mục con mới!");
  };

  const handleRemoveSubItem = (skillIndex: number, subItemIndex: number) => {
    const currentSkill = skillFields[skillIndex];
    const updatedSubItems = currentSkill.subItems.filter(
      (_, idx) => idx !== subItemIndex
    );
    updateSkill(skillIndex, { ...currentSkill, subItems: updatedSubItems });
  };

  const handleAddCertificate = () => {
    appendCert({ title: "", organization: "", year: "" });
    alert("Đã thêm mục tín chỉ mới!");
  };

  const onSubmit = () => {
    alert("Cập nhật hồ sơ thành công! Dữ liệu đã được in ra console.");
  };

  return (
    <div className={cx("container")}>
      <header className={cx("profile-header")}>
        <h1>Chỉnh sửa hồ sơ Mentor</h1>
        <p>Cập nhật chi tiết thông tin cá nhân và chuyên môn của bạn</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("profile-content")}>
        <main className={cx("main-content")}>
          <div className={cx("form-group")}>
            <label htmlFor="profile-image">Ảnh đại diện</label>
            <div className={cx("profile-image-container")}>
              <img
                src={avatarPreview}
                alt="Mentor Avatar"
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
            <label htmlFor="slogan">Slogan</label>
            <input
              {...register("slogan")}
              id="slogan"
              onBlur={() => trigger("slogan")}
              className={cx({ "input-error": errors.slogan })}
            />
            {errors.slogan && (
              <span className={cx("error")}>{errors.slogan.message}</span>
            )}
          </div>
          <div className={cx("form-group")}>
            <label>Giới thiệu</label>
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
            <label>Kinh nghiệm</label>
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
            <label>Phương pháp mentoring</label>
            <div className={cx("item-list")}>
              {methodFields.map((field, index) => (
                <div key={field.id} className={cx("item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeMethod(index)}
                  ></i>
                  <input
                    {...register(`methods.${index}.title`)}
                    placeholder="Tiêu đề"
                    onBlur={() => trigger(`methods.${index}.title`)}
                  />
                  {errors.methods?.[index]?.title && (
                    <span className={cx("error")}>
                      {errors.methods[index].title?.message}
                    </span>
                  )}
                  <textarea
                    className={cx("editable")}
                    {...register(`methods.${index}.description`)}
                    onBlur={() => trigger(`methods.${index}.description`)}
                  />
                  {errors.methods?.[index]?.description && (
                    <span className={cx("error")}>
                      {errors.methods[index].description?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddMethod}>
              Thêm phương pháp
            </div>
          </div>
        </main>
        <aside className={cx("sidebar")}>
          <div className={cx("sidebar-section", "form-group")}>
            <label>Chuyên môn</label>
            <div className={cx("item-list")}>
              {skillFields.map((field, index) => (
                <div key={field.id} className={cx("item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeSkill(index)}
                  ></i>
                  <input
                    {...register(`skills.${index}.title`)}
                    placeholder="Tên chuyên môn"
                    onBlur={() => trigger(`skills.${index}.title`)}
                  />
                  {errors.skills?.[index]?.title && (
                    <span className={cx("error")}>
                      {errors.skills[index].title?.message}
                    </span>
                  )}
                  <textarea
                    className={cx("editable")}
                    {...register(`skills.${index}.description`)}
                    onBlur={() => trigger(`skills.${index}.description`)}
                  />
                  {errors.skills?.[index]?.description && (
                    <span className={cx("error")}>
                      {errors.skills[index].description?.message}
                    </span>
                  )}
                  <div className={cx("sub-item-list")}>
                    {field.subItems.map((_, subIndex) => (
                      <div key={subIndex} className={cx("sub-item")}>
                        <i
                          className={cx("fas", "fa-times", "sub-remove-item")}
                          onClick={() => handleRemoveSubItem(index, subIndex)}
                        ></i>
                        <input
                          {...register(`skills.${index}.subItems.${subIndex}`)}
                          onBlur={() =>
                            trigger(`skills.${index}.subItems.${subIndex}`)
                          }
                        />
                        {errors.skills?.[index]?.subItems?.[subIndex] && (
                          <span className={cx("error")}>
                            {errors.skills[index].subItems[subIndex]?.message}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div
                    className={cx("sub-add-btn")}
                    onClick={() => handleAddSubItem(index)}
                  >
                    Thêm mục con
                  </div>
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddSkill}>
              Thêm chuyên môn
            </div>
          </div>
          <div className={cx("sidebar-section", "form-group")}>
            <label>Tín chỉ</label>
            <div className={cx("item-list")}>
              {certFields.map((field, index) => (
                <div key={field.id} className={cx("item")}>
                  <i
                    className={cx("fas", "fa-times", "remove-item")}
                    onClick={() => removeCert(index)}
                  ></i>
                  <input
                    {...register(`certificates.${index}.title`)}
                    placeholder="Tên chứng chỉ"
                    onBlur={() => trigger(`certificates.${index}.title`)}
                  />
                  {errors.certificates?.[index]?.title && (
                    <span className={cx("error")}>
                      {errors.certificates[index].title?.message}
                    </span>
                  )}
                  <input
                    {...register(`certificates.${index}.organization`)}
                    placeholder="Tổ chức"
                    onBlur={() => trigger(`certificates.${index}.organization`)}
                  />
                  {errors.certificates?.[index]?.organization && (
                    <span className={cx("error")}>
                      {errors.certificates[index].organization?.message}
                    </span>
                  )}
                  <input
                    {...register(`certificates.${index}.year`)}
                    placeholder="Năm"
                    onBlur={() => trigger(`certificates.${index}.year`)}
                  />
                  {errors.certificates?.[index]?.year && (
                    <span className={cx("error")}>
                      {errors.certificates[index].year?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={cx("add-item-btn")} onClick={handleAddCertificate}>
              Thêm tín chỉ
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

export default memo(EditMentorProfilePage);
