import 'server-only';

const dictionaries = {
  tr: () => import('../../messages/tr.json').then((module) => module.default),
  en: () => import('../../messages/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'tr' | 'en') => {
  return dictionaries[locale]();
};

