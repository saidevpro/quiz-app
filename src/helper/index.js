import { API_URL, API_CATEGORIES_PATH, API_QUIZ_PATH } from '../constants';

export const formatUrl = (...parts) => {
  return parts.reduce((url, part) => {
    part = part.replace(/\/$/, '');
    part = part.replace(/^\//, '');

    return url.concat((url === '' ? '' : '/') + part);
  }, '');
};

export const formatUrlParams = (tag, params) => {
  return params.reduce((paramFormated, param, index) => {
    return paramFormated.concat((index === 0 ? '?' : '&') + tag + '=' + param);
  }, '');
};

export const fetchQuizUrlFormat = categories => {
  const host = formatUrl(API_URL, API_QUIZ_PATH);
  let params = '';

  if (categories) {
    params = formatUrlParams('c', Array.isArray(categories) ? categories : [categories]);
  }

  return host.concat(params);
};
