import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (
  isoDate: string,
  template = 'YYYY/MM/DD',
): string | null => {
  if (!dayjs(isoDate).isValid()) {
    return null;
  }

  return dayjs(isoDate).format(template);
};
