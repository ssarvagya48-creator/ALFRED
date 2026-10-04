import { useEffect, useRef } from "react";
import "./Intro.css";

function Intro({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch(() => {
        console.log("Autoplay blocked");
      });
    }
  }, []);

  function enableSound() {
    const video = videoRef.current;

    if (video) {
      video.muted = false;
      video.play();
    }
  }

  return (
    <div className="intro" onClick={enableSound}>
      <video
        ref={videoRef}
        src="/alfred-intro.mp4"
        autoPlay
        playsInline
        onEnded={onFinish}
      />
    </div>
  );
}

export default Intro;