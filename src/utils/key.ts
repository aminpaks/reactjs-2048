export const generateKey = () => {
  const first = Math.random() * 1e20;
  const second = Math.random() * 1e20;
  return `${first}-${second}`;
};
