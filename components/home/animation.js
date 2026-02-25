import { useEffect, useState } from "react";
import lottieJson from "/public/animation.json";

const Animation = () => {
  const [Lottie, setLottie] = useState(null);

  useEffect(() => {
    let mounted = true;
    import("react-lottie-player").then((module) => {
      if (mounted) setLottie(() => module.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Lottie) return null;

  return (
    <Lottie loop animationData={lottieJson} play style={{ width: "32rem", height: "32rem" }} />
  );
};

export default Animation;
