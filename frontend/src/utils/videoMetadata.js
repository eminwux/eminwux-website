const ISO_DATE_TIME_WITH_TIMEZONE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export const durationToIso8601 = (duration) => {
  if (typeof duration !== 'string') {
    throw new Error('Video duration must be a string');
  }

  const parts = duration.split(':');
  if (parts.length < 2 || parts.length > 3 || parts.some((part) => !/^\d+$/.test(part))) {
    throw new Error(`Invalid video duration: ${duration}`);
  }

  const [hours, minutes, seconds] = parts.length === 3
    ? parts.map(Number)
    : [0, ...parts.map(Number)];

  if (minutes > 59 || seconds > 59) {
    throw new Error(`Invalid video duration: ${duration}`);
  }

  return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}${seconds ? `${seconds}S` : ''}`;
};

export const assertValidVideoMetadata = (video) => {
  for (const field of ['id', 'title', 'description', 'uploadDate']) {
    if (typeof video?.[field] !== 'string' || video[field].trim() === '') {
      throw new Error(`Video ${video?.id ?? '<unknown>'} is missing ${field}`);
    }
  }

  if (
    !ISO_DATE_TIME_WITH_TIMEZONE.test(video.uploadDate)
    || Number.isNaN(Date.parse(video.uploadDate))
  ) {
    throw new Error(`Video ${video.id} has an invalid uploadDate: ${video.uploadDate}`);
  }

  if (video.duration != null) {
    if (typeof video.duration !== 'string' || video.duration.trim() === '') {
      throw new Error(`Video ${video.id} has an invalid duration`);
    }
    durationToIso8601(video.duration);
  }
};
