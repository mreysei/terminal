export const isMobile = (): boolean => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

export const isComputer = (): boolean => {
  const toMatch = [
    /Chrome/i,
    /Firefox/i,
    /MSIE 8.0/i,
    /MSIE 9.0/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}