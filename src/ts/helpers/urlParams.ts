export function getUrlParams() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const result: { [key: string]: string } = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

export function setUrlParams(params: { [key: string]: string }): void {
  const url = new URL(window.location.href);

  Object.keys(params).forEach(key => {
    url.searchParams.set(key, params[key]);
  });

  window.history.replaceState({}, '', url.toString());
}

export function removeUrlParam(paramName: string): void {
  const url = new URL(window.location.href);
  url.searchParams.delete(paramName);
  window.history.replaceState({}, '', url.toString());
}
