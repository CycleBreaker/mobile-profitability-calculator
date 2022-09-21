import { useState } from "react";

export const useForceUpdate = function () {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};
