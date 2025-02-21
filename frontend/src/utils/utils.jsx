export const handleLogout = (pathname) => {
    document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = pathname;
};

export const numberToOrdinal = (num) => {
  if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) return num;

  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = num % 100;
  return num + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
};