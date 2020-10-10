import moment from 'moment';

export default function ConvertToRelativeTime(date) {
    return moment(date).fromNow();
}