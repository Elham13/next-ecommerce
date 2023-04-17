export const getValueFromObject = (
  objToRetriveValue: any,
  accessKey: string
): any => {
  if (!objToRetriveValue?.hasOwnProperty(accessKey)) {
    return "";
  }
  return objToRetriveValue[accessKey];
};
