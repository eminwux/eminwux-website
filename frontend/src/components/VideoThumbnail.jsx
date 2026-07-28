import React, { useEffect, useMemo, useState } from "react";
import { youtubeThumbnailCandidates } from "../utils/videoThumbnails";

const VideoThumbnail = ({ video, loading = "lazy" }) => {
  const candidates = useMemo(
    () => youtubeThumbnailCandidates(video),
    [video?.id, video?.thumbnailOverride]
  );
  const candidateKey = candidates.join("|");
  const [candidateIndex, setCandidateIndex] = useState(0);

  useEffect(() => {
    setCandidateIndex(0);
  }, [candidateKey]);

  const index = Math.min(candidateIndex, candidates.length - 1);
  const hasNextCandidate = index < candidates.length - 1;

  return (
    <img
      src={candidates[index]}
      alt={video?.title ?? "Video thumbnail"}
      loading={loading}
      decoding="async"
      onError={
        hasNextCandidate
          ? () => setCandidateIndex((current) => Math.min(current + 1, candidates.length - 1))
          : undefined
      }
    />
  );
};

export default VideoThumbnail;
