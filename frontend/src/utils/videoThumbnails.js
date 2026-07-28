export const VIDEO_THUMBNAIL_FALLBACK = "/video-thumbnail-fallback.jpg";

export const youtubeThumbnailCandidates = (video) => {
  if (!video?.id) {
    return [VIDEO_THUMBNAIL_FALLBACK];
  }

  if (video?.thumbnailOverride) {
    return [video.thumbnailOverride, VIDEO_THUMBNAIL_FALLBACK];
  }

  return [
    `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
    VIDEO_THUMBNAIL_FALLBACK,
  ];
};
