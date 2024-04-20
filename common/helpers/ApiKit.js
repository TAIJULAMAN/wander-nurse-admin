import HttpKit from "./HttpKit";

export const uploadSettings = {
  headers: {
    Accept: "*/*",
    "content-type": "multipart/form-data",
  },
};

const ApiKit = {
  login: {
    postLogin: (payload) => HttpKit.post("api/wn/auth/user_login", payload),
  },
  signup: {
    postSignup: (payload) => HttpKit.post("api/wn/auth/user_register", payload),
  },
  auth: {
    getMe: () => HttpKit.get("api/wn/auth/logged_in_user"),
    postExternalForgotPassword: (payload) =>
      HttpKit.post("api/wn/auth/user_forget", payload),
    postVerifyEmail: (payload) =>
      HttpKit.post("api/wn/auth/user_verify", payload),
    putPasswordChange: (alias, payload) =>
      HttpKit.put(`api/wn/auth/user_change_password/${alias}`, payload),
    postInternalForgotPassword: (payload) =>
      HttpKit.post("api/wn/auth/user_forget", payload), //not getting used
  },
  profile: {
    putProfileUpdate: (alias, payload) =>
      HttpKit.put(`api/wn/auth/update_profile/${alias}`, payload),
    postCertificate: (payload) =>
      HttpKit.post(
        "api/wn/certificates/insert_cert_data",
        payload,
        uploadSettings
      ),
    getCertificate: (alias) =>
      HttpKit.get(`api/wn/certificates/get_user_certs/${alias}`),
    deleteProfile: (alias) =>
      HttpKit.delete(`api/wn/auth/remove_profile/${alias}`),
    postAccomplishment: (payload) =>
      HttpKit.post(
        "api/wn/accomplishments/create_user_accomplishment",
        payload
      ),
    postEducation: (payload) =>
      HttpKit.post("api/wn/education/create_user_Education", payload),
    postEmployment: (payload) =>
      HttpKit.post("api/wn/employment/create_user_Employment", payload),
    getProfileDetail: (alias) =>
      HttpKit.get(`api/wn/auth/user_profile/${alias}`),
  },
  search: {
    getEmploymentType: (payload) =>
      HttpKit.get("api/wn/employmenttypes/all_employment_type", payload),
    getProfession: (payload) =>
      HttpKit.get("api/wn/profession/all_profession", payload),
  },
};

export default ApiKit;
