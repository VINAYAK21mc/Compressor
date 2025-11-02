'use client'
import dynamic from "next/dynamic";

const CompressVideo = dynamic(
  () => import("@/components/video/compress-video"),
  { ssr: false }
);

export default CompressVideo;
