import moment from 'moment';

export function toRelativeTime(date) {
    return moment.utc(date).local().fromNow();
}

export default function ConvertToRelativeTime(date) {
  return moment.utc(date).local().fromNow();
}

export function toComplexTime(date) {
  return moment.utc(date).local().format('MMMM Do YYYY, h:mm:ss a');
}