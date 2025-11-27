import { useState, useEffect, useRef } from "react";
import phoneImage from "../assets/phone.png";
import "./StepScrollAnimation.css";

const StepScrollAnimation = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const scrollLockRef = useRef(false);
  const timeoutRef = useRef(null);


  const sections = [
    {
      title: "Artificial Intelligence",
      content: [
        "Artificial intelligence (AI) refers to the development of computer systems capable of performing tasks that usually require human intelligence.",
        "Machine learning enables systems to learn from experience without being explicitly programmed.",
        "While beneficial, AI raises ethical concerns regarding data privacy and algorithmic bias.",
      ],
    },
    {
      title: "Blockchain Technology",
      content: [
        "Blockchain is a distributed ledger technology that records transactions across a network.",
        "Data cannot be altered once added, making it resistant to fraud and hacking.",
        "Applications extend beyond cryptocurrencies to supply chain and identity verification.",
      ],
    },
    {
      title: "Internet of Things",
      content: [
        "IoT is a network of physical devices embedded with sensors and connectivity.",
        "Devices range from smart appliances to industrial machines and monitoring systems.",
        "Benefits come with concerns over cybersecurity and data privacy management.",
      ],
    },
  ];


  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (scrollLockRef.current) return;

      scrollLockRef.current = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const direction = e.deltaY > 0 ? "down" : "up";

      setCurrentSection((prevSection) => {
        if (direction === "down") {
          return Math.min(prevSection + 1, sections.length - 1);
        } else {
          return Math.max(prevSection - 1, 0);
        }
      });

      timeoutRef.current = setTimeout(() => {
        scrollLockRef.current = false;
      }, 600);
    };
    

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sections.length]);

  return (
    <div className="scroll-container" ref={containerRef}>
      <div className="content-wrapper">
        <div className="sections" data-section={currentSection}>
          {sections.map((section, index) => {
            const isActive = index === currentSection;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={index}
                className={`section ${isActive ? "active" : ""}`}
                data-reversed={isReversed}
              >
                <div
                  className={`image-container ${isReversed ? "reversed" : ""}`}
                >
                  <div className="phone-image">
                    <img src={phoneImage} alt="Phone" />
                  </div>
                </div>
                <div className={`text-content ${isReversed ? "reversed" : ""}`}>
                  <h2>{section.title}</h2>
                  {section.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="scroll-instruction">
        Use Mouse Wheel or Touchpad to scroll through sections
      </div>
    </div>
  );
};

export default StepScrollAnimation;
