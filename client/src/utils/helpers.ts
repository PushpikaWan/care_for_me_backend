import {animalNeedAdopt, animalNeedFeed, animalNeedHeal, animalNeedLost} from "./constants";

//please sync this file with mobile application helper

export function getTimeText(text: string, isShortForm: boolean): string {
  const _seconds = 'few seconds';
  const _minutes = 'mins';
  const _hours = 'hours';
  const _days = 'days';
  const _years = 'years';

  const created = Date.parse(text);
  const now = Date.now();
  const days = Math.floor(Math.abs(now - created) / (1000 * 60 * 60 * 24));

  const years = Math.floor(days / 365);
  if (years > 0) {
    return isShortForm
        ? `${years} ${_years.substring(0, 1)}`
        : (years > 1 ? `${years} ${_years}` : `${years} ${_years.substring(0, 4)}`);
  }

  if (days > 0) {
    return isShortForm
        ? `${days} ${_days.substring(0, 1)}`
        : (days > 1 ? `${days} ${_days}` : `${days} ${_days.substring(0, 3)}`);
  }

  const hours = Math.floor(Math.abs(now - created) / (1000 * 60 * 60));
  if (hours > 0) {
    return isShortForm
        ? `${hours} ${_hours.substring(0, 1)}`
        : (hours > 1 ? `${hours} ${_hours}` : `${hours} ${_hours.substring(0, 4)}`);
  }

  const minutes = Math.floor(Math.abs(now - created) / (1000 * 60));
  if (minutes > 0) {
    return isShortForm
        ? `${minutes} ${_minutes.substring(0, 3)}`
        : (minutes > 1
            ? `${minutes} ${_minutes}`
            : `${minutes} ${_minutes.substring(0, 3)}`);
  }
  return _seconds;
}


export function getAnimalNeedLabel(labelText: string): string {
  switch (labelText) {
    case animalNeedAdopt:
      return '#adopt_me';
    case animalNeedHeal:
      return '#heal_me';
    case animalNeedFeed:
      return '#feed_me';
    case animalNeedLost:
      return '#find_me';
    default:
      return '#care';
  }
}
