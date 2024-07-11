import { motion, useCycle } from "framer-motion";

/**
 * An example of animating between different value types
 */

const App = () => {
  const [x, cycleX] = useCycle(0, "calc(3 * var(--width))");

  return (
    <motion.div
      initial={false}
      animate={{ x }}
      transition={{ duration: 5, ease: () => 0.5 }}
      style={{
        width: 100,
        height: 100,
        background: "white",
        "--width": "100px",
      }}
      onClick={() => cycleX()}
    />
  );
};

export default App;
