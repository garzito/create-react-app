export const getCookie = cookie => {
  const cookies = document.cookie;
  const delim = cookies.indexOf(';') !== -1 ? ';' : ',';
  const reg = RegExp(`(?:(?:^|.*${delim}\\s*)${cookie}\\s*=\\s*([^${delim}]*).*$)|^.*$`);
  const value = cookies.replace(reg, '$1');
  return value;
};