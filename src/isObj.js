export default (element) => {
  if (typeof element === 'object') {
    return true;
  }
  return false;
};
