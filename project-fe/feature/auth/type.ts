export type ISignupModal = {
  firstname: string;
  lastname: string;
  email: string;
  userType: string;
  gender: string;
  password: string;
};

export type IOtpModal = {
  otpCode: string;
};

export type ILoginModal = {
  email: string;
  password: string;
};
