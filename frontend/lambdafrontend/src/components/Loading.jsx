import { InfinitySpin} from "react-loader-spinner";
export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
        <InfinitySpin
            visible={true}
            width="400"

            color="#B5B2C2"
            ariaLabel="infinity-spin-loading"
        />
    </div>
  );
};
