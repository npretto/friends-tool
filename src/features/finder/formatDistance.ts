import I18n from 'i18n-js';

export const formatDistance = (meters: number) => {
  if (meters < 1000) {
    return I18n.t('less-than-one-km');
  }

  return `${I18n.toNumber(Math.round(meters / 1000), { precision: 0 })} km`;
};
