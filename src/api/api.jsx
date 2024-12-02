const BASE_URL = 'http://3754715-aw99408.twc1.net';

export const fetchData = async (url, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.statusText}`);
  }
  return response.json();
};


export const get = (url) => fetchData(url);

export const post = (url, data) =>
  fetchData(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const put = (url, data) =>
  fetchData(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const remove = (url) =>
  fetchData(url, {
    method: 'DELETE',
  });
