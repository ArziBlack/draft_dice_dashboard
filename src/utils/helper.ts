export const extractVideoId = (vid_url: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)?([^&]{11})|youtu\.be\/([^&]{11})/;
  const match = vid_url.match(regex);
  return match ? match[1] || match[2] : null;
};
