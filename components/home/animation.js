import { useEffect, useState } from "react";
import lottieJson from "/public/animation.json";

const WRAPPER_SIZE = "32rem";

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

  return (
    <div
      style={{
        width: WRAPPER_SIZE,
        height: WRAPPER_SIZE,
        minWidth: WRAPPER_SIZE,
        minHeight: WRAPPER_SIZE,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      {Lottie ? (
        <Lottie loop animationData={lottieJson} play style={{ width: "100%", height: "100%" }} />
      ) : null}
    </div>
  );
};

export default Animation;
