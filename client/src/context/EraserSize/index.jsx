import { createContext, useState } from "react";
const EraserSizeContext = createContext({
  eraserSize: 20,
  setEraserSize: () => { },
});
const EraserSizeProvider = ({ children }) => {
  const [eraserSize, setEraserSize] = useState(20);
  const valueToShare = {
    eraserSize,
    setEraserSize,
  };
  return (
    <EraserSizeContext.Provider value={valueToShare}>
      {children}
    </EraserSizeContext.Provider>
  );
};
export { EraserSizeContext, EraserSizeProvider };
