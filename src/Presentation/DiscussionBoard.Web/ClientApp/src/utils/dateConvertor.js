import moment from 'moment';

export default function ConvertToRelativeTime(date) {
    return moment.utc(date).local().fromNow();
}