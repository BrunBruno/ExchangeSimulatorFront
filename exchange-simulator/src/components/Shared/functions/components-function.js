export const onExpandElement = (ref, className) => {
  if (ref && ref.current) {
    if (ref.current.classList.contains(className)) {
      ref.current.classList.remove(className);
    } else {
      ref.current.classList.add(className);
    }
  }
};
