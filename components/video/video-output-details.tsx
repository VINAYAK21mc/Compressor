import { FileActions } from "@/lib/types";
import { calculateBlobSize, reduceSize, bytesToSize } from "@/lib/bypeToSize";
import { formatTime } from "@/lib/fileConvert";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export const VideoOutputDetails = ({
  videoFile,
  timeTaken,
}: {
  videoFile: FileActions;
  timeTaken?: number;
}) => {
  const outputFileSize = calculateBlobSize(videoFile.outputBlob);
  const { sizeReduced, percentage } = reduceSize(
    videoFile.fileSize,
    videoFile.outputBlob,
  );

  const download = () => {
    if (!videoFile.url) return;
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = videoFile.url;
    a.download = videoFile.output;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(videoFile.url);
    document.body.removeChild(a);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      key={"output"}
      transition={{ type: "tween" }}
      className="rounded-2xl px-4 py-3 h-fit bg-background"
    >
      <div className="text-sm">
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <div className="flex items-center gap-1">
            <p>Output file</p>
            <BadgeCheck className="text-white rounded-full" fill="#000000" />
          </div>
          <Button variant={"outline"} onClick={download}>
            Download
          </Button>
        </div>

        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">New file size</p>
          <p className="font-semibold">{outputFileSize}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p className="font-semibold">Size Reduced %</p>
          <p className="font-semibold">{percentage}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Original file size</p>
          <p>{bytesToSize(videoFile.fileSize)}</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Size Reduced</p>
          <p>{sizeReduced}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Time taken</p>
          <p>{timeTaken ? formatTime(timeTaken / 1000) : "-"}</p>
        </div>
      </div>
    </motion.div>
  );
};
