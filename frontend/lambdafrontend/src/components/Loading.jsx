import { Audio } from "react-loader-spinner";
export const Loading = () => {
  return (
    <>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </>
  );
};
