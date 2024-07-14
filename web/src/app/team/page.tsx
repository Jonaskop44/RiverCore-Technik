"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Team = () => {
  const items = [
    { id: 1, title: "First", subtitle: "First" },
    { id: 2, title: "Second", subtitle: "Second" },
    { id: 3, title: "Third", subtitle: "Third" },
  ];
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div>
      {items.map((item) => (
        <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}
      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
