export const getLastUpdatedLabelFromDate = (date: Date) => {
  const timeDifferenceInSeconds = (new Date().getTime() - date.getTime()) / 1000;

  const minutes = Math.floor(timeDifferenceInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const result = 'Last updated: ';

  if (days) {
    return result.concat(`${days} day${days === 1 ? '' : 's'} ago`);
  } else if (hours) {
    return result.concat(`${hours} hour${hours === 1 ? '' : 's'} ago`);
  } else if (minutes) {
    return result.concat(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
  }

  return result.concat('just now');
};
