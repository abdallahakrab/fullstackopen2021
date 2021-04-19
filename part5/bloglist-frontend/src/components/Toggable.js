import { forwardRef, useImperativeHandle, useState } from "react";

const Toggable = ({ children, buttonText }, ref) => {
  const [visbility, setVisibility] = useState(false);
  const changeVisiblity = () => {
    setVisibility(!visbility);
  };
  useImperativeHandle(ref, () => ({ setVisibility }));

  return (
    <>
      {visbility ? (
        <>
          {children}
          <button
            onClick={() => {
              changeVisiblity();
            }}
          >
            cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              changeVisiblity();
            }}
          >
            {buttonText}
          </button>
        </>
      )}
    </>
  );
};

export default forwardRef(Toggable);
