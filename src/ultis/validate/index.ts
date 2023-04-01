export const isNumber = (value: any) => {
  return /^\d[\d\d.]*$/.test(value.toLowerCase());
};

export const isIntegerNumber = (value: any) => {
  return /^[1-9]\d*$/.test(value.toLowerCase());
};

export const isPhoneNumber = (value: any) => {
  return /^(03[2-9]|05[689]|07[06789]|08[1-9]|09[0-9])([0-9]{7})$/.test(
    value.toLowerCase(),
  );
};

export const isCCCD = (value: any) => {
  return /^[0-9]{9,12}$/.test(value.toLowerCase());
};

export const isPassport = (value: any) => {
  return /^[A-Z][0-9]{7,8}$/.test(value);
};

export const isEmail = (value: any) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value.toLowerCase(),
  );
};

export const isPassword = (value: any) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z]).{8,16}$/.test(value);
};

export const validateEmail = (value: string) => {
  if (value) {
    if (!isEmail(value)) {
      return 'Email không đúng định dạng';
    }
  }
  return undefined;
};

export const validatePhone = (value: string) => {
  if (value) {
    if (!isPhoneNumber(value)) {
      return 'Số điện thoại không đúng định dạng';
    }
  }
  return undefined;
};
