export const VideoDisplay = ({videoUrl}:{videoUrl:string}) => {
  return <video controls id="condense-video-player" className="w-full h-auto rounded-2xl bg-black">
    <source src={videoUrl} type="video/mp4" />
  </video>;
};