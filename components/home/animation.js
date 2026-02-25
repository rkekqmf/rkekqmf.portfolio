import dynamic from "next/dynamic";
import lottieJson from "/public/animation.json";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

const Animation = () => {
  return (
    <Lottie loop animationData={lottieJson} play style={{ width: "32rem", height: "32rem" }} />
  );
};

export default Animation;
