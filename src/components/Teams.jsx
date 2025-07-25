import React, { useEffect, useRef, useState } from "react";
import "./Teams.css";

const imageList = [
  "AsthaKumari.png",
  "PranshuSharma.png",
  "SaranshMathur.png",
  "IshitaAgarwal.png",
  "RuchitKhandelwal.png",
  "VanshikaSingh.png",
  "SparshTyagi.png",
  "DakshSachdeva.png",
  "PrakharSharma.png",
  "ApoorvMittal.png",
  "IshiBharadwaj.png",
  "MedhaviKhandelwal.png",
  "ApoorvaSoni.png",
  "DakshaPandey.png",
  "MohdAayaan.png",
  "AnoushkaKaushik.png",
  "ManayavVatsal.png",
  "Dr.AbhayKumar.png",
];

const Teams = () => {
  const sliderRef = useRef(null);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    const items = slider.querySelectorAll(".item");
    const quantity = items.length;

    function getCurrentRotationY(el) {
      const computedStyle = window.getComputedStyle(el);
      const transform = computedStyle.transform || computedStyle.webkitTransform;
      if (transform === "none") return 0;
      const values = transform.split('(')[1].split(')')[0].split(',');
      const matrix = values.map(parseFloat);
      const rad = Math.atan2(matrix[2], matrix[0]);
      const deg = rad * (180 / Math.PI);
      return (deg + 360) % 360;
    }

    function updateVisibleItems() {
      const rotation = getCurrentRotationY(slider);
      const anglePerItem = 360 / quantity;

      items.forEach((item, index) => {
        const itemAngle = ((index) * anglePerItem - rotation + 360) % 360;
        if (itemAngle <= 30 || itemAngle >= 330) {
          item.classList.add("visible");
        } else {
          item.classList.remove("visible");
        }
      });
    }

    updateVisibleItems(); // initial

    const interval = setInterval(updateVisibleItems, 100);

    items.forEach((item) => {
      item.addEventListener("click", () => {
        setIsStopped(true);
      });

      // Pause on touch (for mobile)
      item.addEventListener("touchstart", () => {
        setIsStopped(true);

    // Remove touched class from all items
    items.forEach((el) => el.classList.remove("touched"));
    // Add "touched" to this one
    item.classList.add("touched");
  }, { passive: true });
    });
    //  Resume when tapping/clicking anywhere else
  const handleResume = (e) => {
    if (!slider.contains(e.target)) {
      setIsStopped(false);
      // Remove popped
    items.forEach((el) => el.classList.remove("touched"));
    }
  };

  document.addEventListener("click", handleResume);
  document.addEventListener("touchstart", handleResume, { passive: true });


    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    if (!isStopped && sliderRef.current) {
      sliderRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (!isStopped && sliderRef.current) {
      sliderRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div className="teams-wrapper">
      <h2 className="teams-heading">MEET OUR TEAM</h2>
      <div className="teams-section">
        <div className="banner">
          <div
            ref={sliderRef}
            className="slider"
            style={{
              "--quantity": imageList.length,
              animationPlayState: isStopped ? "paused" : "running",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {imageList.map((img, idx) => (
              <div
                className="item visible"
                key={idx}
                style={{ "--position": idx + 1 }}
              >
                <img
                  src={`/images-teams/${img}`}
                  alt={`Team Member ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;