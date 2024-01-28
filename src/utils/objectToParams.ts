export type ObjectToParamsProp = Record<
  string,
  string | number | boolean | null | undefined
>;

const objectToParams = (params: ObjectToParamsProp) => {
  const paramsStr = Object.keys(params)
    .reduce((acc, param) => {
      if (params[param]) {
        acc.push(`${param}=${encodeURIComponent(params[param]!)}`);
      }
      return acc;
    }, [] as string[])
    .join("&");
  return paramsStr ? `?${paramsStr}` : "";
};

export default objectToParams;
