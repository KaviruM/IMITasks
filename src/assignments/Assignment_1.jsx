import React from "react";
import { Link } from 'react-router-dom'

const Assignment_1 = () => {
  const [section1, setSection1] = React.useState(false);
  const [section2, setSection2] = React.useState(false);
  const [section3, setSection3] = React.useState(false);

  return (
    <div className="assignment-container">
      <h1 className="heading">Assignment 1</h1>
      
  
      <Link to="/">
        <button className="backButton">Back to Home</button>
      </Link>
      
      <div className="assignment-content">
        
        <button onClick={() => setSection1(!section1)}>
          {section1 ? "Hide Section 1" : "Show Section 1"}
        </button>
        {section1 && (
          <div>
            <h2>Section 1</h2>
            <p>I specialize in developing scalable and efficient web applications tailored to meet the unique needs of each client. With a strong background in both front-end and back-end development, I ensure seamless user experiences and robust system performance. Whether it's building custom dashboards, e-commerce platforms, or business automation tools, I focus on delivering high-quality, maintainable code and clear communication throughout the project.</p>
          </div>
        )}
        


        <button onClick={() => setSection2(!section2)}>
          {section2 ? "Hide Section 2" : "Show Section 2"}
        </button>
        {section2 && (
          <div>
            <h2>Section 2</h2>
            <p>Hey there! I’m passionate about turning cool ideas into reality with clean code and creative solutions. Whether you're a startup looking to launch your first app or a business aiming to optimize your workflow, I’ve got the tools and skills to help. Let’s build something awesome together!</p>
          </div>
        )}
        

        
        <button onClick={() => setSection3(!section3)}>
          {section3 ? "Hide Section 3" : "Show Section 3"}
        </button>
        {section3 && (
          <div>
            <h2>Section 3</h2>
            <p>In my recent project, I implemented a microservices-based architecture using Node.js and Docker to support a high-traffic SaaS platform. By introducing Redis caching and optimizing database queries, we improved system performance by 40%. I also integrated third-party APIs for real-time data synchronization, ensuring consistent user experiences across devices.</p>
          </div>
        )}


      </div>
    </div>
  );
};

export default Assignment_1;


