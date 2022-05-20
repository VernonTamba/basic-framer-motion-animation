import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import images from "./Images";
import { motion } from "framer-motion";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function App() {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(0);

  const itemRef = useRef();

  const goPrevious = (currentWidth) => {
    if (currentWidth === 0) {
      setWidth(width);
    } else {
      setWidth(width - itemRef.current.offsetWidth);
    }
  };

  const goNext = (currentWidth) => {
    if (
      currentWidth ===
      itemRef.current.offsetWidth + itemRef.current.scrollWidth
    ) {
      setWidth(width);
    } else {
      setWidth(width + itemRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    if (width === 0) {
      setVisible(0);
    } else if (width * 2 >= itemRef.current.scrollWidth && width !== 0) {
      setVisible(2);
    } else {
      setVisible(1);
    }
  }, [width]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App__mainDiv">
        {visible !== 0 && (
          <NavigateBeforeIcon
            style={{ fontSize: 100 }}
            className="navigateBefore"
            onClick={() => goPrevious(width)}
          />
        )}
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
        {visible !== 2 && (
          <NavigateNextIcon
            style={{ fontSize: 100 }}
            className="navigateNext"
            onClick={() => goNext(width)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
