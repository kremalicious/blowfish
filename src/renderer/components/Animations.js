export const defaultAnimation = {
  enter: {
    y: 0,
    opacity: 1,
    delay: 100,
    transition: { duration: 150 }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
}

export const fadeIn = {
  enter: {
    opacity: 1,
    transition: { duration: 500 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 100 }
  }
}
