import moment from 'moment';

export const toRelativeTime = date => {
  return moment.utc(date).local().fromNow();
}

export const toComplexTime = date => {
  return moment.utc(date).local().format('MMMM Do YYYY, h:mm:ss a');
}