import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import images from "./Images";
import { motion } from "framer-motion";

function App() {
  const [width, setWidth] = useState(0);

  const itemRef = useRef();

  // useEffect(() => {
  //   console.log(itemRef.current.scrollWidth);
  //   console.log(itemRef.current.offsetWidth * 3);
  // }, []);

  const goPrevious = (currentWidth) => {
    if (currentWidth === 0) {
      setWidth(width);
    } else {
      setWidth(width - itemRef.current.offsetWidth);
    }
  };

  const goNext = (currentWidth) => {
    if (currentWidth === itemRef.current.scrollWidth) {
      setWidth(width);
    } else {
      setWidth(width + itemRef.current.offsetWidth);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="previous" onClick={() => goPrevious(width)}>
          Previous
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="next" onClick={() => goNext(width)}>
          Next
        </div>
      </header>
      <motion.div ref={itemRef} className="carousel">
        <motion.div animate={{ x: -width }} className="carousel__inner">
          {images.map((image, index) => {
            return (
              <motion.div className="item">
                <motion.img
                  key={index}
                  transition={{ duration: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  src={image}
                  alt={image}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
