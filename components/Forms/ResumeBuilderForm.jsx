import { useState } from "react";

import Form from "./Form";
import { FaFilePdf } from "react-icons/fa";
import { get } from "lodash";
import ApiKit from "@/common/helpers/ApiKit";
import { toastSuccess } from "../Shared/ToastHelpers";
import Image from "next/legacy/image";
import { inject, observer } from "mobx-react";

function ResumeBuilderForm({ authStore }) {
  const { getMe } = authStore;
  const alias = get(getMe, "user_id", "");

  const [file, setFile] = useState([]);

  const onImageChange = (ev) => {
    const files = ev.target.files[0];
    setFile([...file, files]);
  };

  const onImageUpload = () => {
    let inputEl = document.getElementById("employee_image");
    inputEl.click();
    inputEl.onchange = onImageChange;
  };

  const modifyExistingPayload = (payload) => {
    const formData = new FormData();
    file?.map((f) => {
      formData.append("certs", f);
    });
    formData.append("user_id", alias);
    return alias ? formData : {};
  };

  const ImageUpload = () => {
    return (
      <div
        className="h-36 w-36 mb-4 border-dotted bg-transparent border-2 border-accent flex justify-center items-center cursor-pointer"
        onClick={onImageUpload}
      >
        <span className="text-sm font-bold">Upload Image</span>
        <input
          type="file"
          id="employee_image"
          accept=".png,.jpg,.jpeg"
          className="hidden"
        ></input>
      </div>
    );
  };

  const onSuccessfulSubmit = (res) => {
    if (res) {
      toastSuccess({ message: "Profile updated successfully" });
      setFile([]);
    }
  };

  return (
    <Form
      addAPI={ApiKit.profile.postCertificate}
      extraState={{ file }}
      isLoading={false}
      defaultValues={""}
      isFormData={true}
      onSubmitSuccess={onSuccessfulSubmit}
      modifyExistingPayload={modifyExistingPayload}
    >
      {({ control, errors, watch, setValue, reset }) => {
        return (
          <div className="my-3 mx-2 flex gap-4 flex-wrap">
            {Array.isArray(file) &&
              file.length > 0 &&
              file.map((f, i) => {
                return (
                  <div
                    key={i}
                    className="h-36 w-36 mb-4 border-dotted bg-transparent border-2 border-accent flex justify-center items-center cursor-pointer"
                  >
                    <Image
                      src={URL.createObjectURL(f)}
                      alt="image"
                      height="136px"
                      width="136px"
                    />
                  </div>
                );
              })}
            <ImageUpload />
          </div>
        );
      }}
    </Form>
  );
}

export default inject("authStore")(observer(ResumeBuilderForm));
