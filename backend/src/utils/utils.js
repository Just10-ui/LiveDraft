const avatars = [
  'default-1.png',
  'default-2.png',
  'default-3.png',
  'default-4.png',
  'default-5.png',
  'default-6.png'
];

export const getRandomAvatar = () => {
  return avatars[Math.floor(Math.random() * avatars.length)];
};