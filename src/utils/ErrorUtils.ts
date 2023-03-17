export const getApiErrorMessage = (errorCode: number, errorMsg: string) => {
  switch (errorCode) {
    case -3:
    case 20:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 40:
    case 41:
    case 42:
    case 42:
    case 44:
    case 45:
      return errorMsg;
    default:
      return "Unexpected error. Please try again later!";
  }
};
