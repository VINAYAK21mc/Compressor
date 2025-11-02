import { Loader } from "lucide-react";
import { formatTime } from "@/lib/fileConvert";
import { Progress } from "../ui/progress";
export const VideoProgress = ({
  progress,
  seconds,
}: {
  progress: number;
  seconds: number;
}) => {
  return (
    <div className="flex justify-between items-center gap-2 p-1 bg-background">
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-2">
          <div className="flex gap-2 items-center">
            {progress ? <p>Condensing</p> : <p>Loading Video</p>}{" "}
            <Loader className="animate-spin w-4 h-4" />
          </div>
          <p className="text-sm">{formatTime(seconds / 1000)}</p>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
};
