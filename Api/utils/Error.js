export const errHandlers = (statuscode, errMessage) => {
  const error = new Error();
  (error.message = errMessage), (error.statuscode = statuscode);
  return error;
};
