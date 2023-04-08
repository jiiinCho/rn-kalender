export const printInvalidErrorLog = (paramInError: string) => {
  if (process.env.NODE_ENV !== 'productions') {
    console.warn(`Invalid ${paramInError} input format. Must be javascript dateString format`);
  }
};
