export const animations = {
  main: {
    hidden: { y: -50, x: -15, opacity: 0 },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      delayChildren: 0,
      staggerChildren: 60,
      transition: { type: "spring", stiffness: 20, delay: 50 },
    },
  },
  header: {
    hidden: {
      opacity: 0,
      y: -200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        default: {
          ease: "circOut",
          delay: 100,
          duration: 1000,
        },
      },
    },
  },
  homeNav: {
    hidden: {
      y: -50,
      x: 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 40, delay: 0 },
    },
  },
};
