import { FileActions } from "@/lib/types";
import { motion } from "framer-motion";
import { bytesToSize } from "@/lib/bypeToSize";
import { Button } from "../ui/button";

export default function VideoInputDisplay({
  videoFile,
  onClear,
}: {
  videoFile: FileActions;
  onClear: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      key={"drag"}
      transition={{ type: "tween" }}
      className="rounded-2xl px-4 py-3 h-fit border w-full bg-background"
    >
      <div className="text-sm">
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>File Input</p>
          <Button
            onClick={onClear}
            type="button"
            className="rounded-lg relative px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-500 focus:ring-zinc-950 flex-shrink-0"
          >
            Clear
          </Button>
        </div>
        <p className="border-b mb-2 pb-2">{videoFile?.fileName}</p>
        <div className="flex justify-between items-center">
          <p>File size</p>
          <p>{bytesToSize(videoFile.fileSize)}</p>
        </div>
      </div>
    </motion.div>
  );
}
