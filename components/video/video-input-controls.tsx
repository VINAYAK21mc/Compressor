import { QualityType, VideoFormats, VideoInputSettings } from "@/lib/types";
import { motion } from "framer-motion";
import { Switch } from "@/components/video/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VideoInputControlProps = {
  videoSettings: VideoInputSettings;
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disable: boolean;
};

export const VideoInputControls = ({
  videoSettings,
  onVideoSettingsChange,
  disable,
}: VideoInputControlProps) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    key={"drag"}
    transition={{ type: "tween" }}
    className={`rounded-2xl px-4 py-3 h-fit  ${disable? "bg-secondary text-muted-foreground": "bg-background"}`}
  >
    <div className="text-sm">
      <div className="flex justify-between items-center border-b mb-2 pb-2">
        <p>Remove Audio</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({ ...videoSettings, removeAudio: value })
          }
          checked={videoSettings.removeAudio}
        />
      </div>
      <div className={`flex justify-between items-center border-b mb-2 pb-2`}>
        <p>Condense for Twitter</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({
              ...videoSettings,
              twitterCompression: value,
            })
          }
          checked={videoSettings.twitterCompression}
        />
      </div>
      <div className="flex justify-between items-center border-b mb-2 pb-2">
        <p>Condense for Whatsapp Status</p>
        <Switch
          disabled={disable}
          onCheckedChange={(value: boolean) =>
            onVideoSettingsChange({
              ...videoSettings,
              whatsappCompression: value,
            })
          }
          checked={videoSettings.whatsappCompression}
        />
      </div>
      {!videoSettings.twitterCompression &&
        !videoSettings.whatsappCompression && (
          <>
            <div className="flex justify-between items-center border-b mb-2 pb-2">
              <p>Quality</p>
              <Select
                disabled={disable}
                value={videoSettings.quality}
                onValueChange={(value: string) => {
                  const quality = value as QualityType;
                  onVideoSettingsChange({ ...videoSettings, quality });
                }}
              >
                <SelectTrigger className="w-[100px] text-sm">
                  <SelectValue placeholder="Select Quality" />
                </SelectTrigger>
                <SelectContent>
                  {quality.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center border-b mb-2 pb-2">
              <p>Format</p>
              <Select
                disabled={disable}
                value={videoSettings.format}
                onValueChange={(value: string) => {
                  const videoType = value as VideoFormats;
                  onVideoSettingsChange({
                    ...videoSettings,
                    format: videoType,
                  });
                }}
              >
                <SelectTrigger className="w-[150px] text-sm">
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  {format.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
    </div>
  </motion.div>
);

const quality: { label: string; value: QualityType }[] = [
  { label: "High", value: QualityType.HIGH },
  { label: "Medium", value: QualityType.MEDIUM },
  { label: "Low", value: QualityType.LOW },
];

const format: { label: string; value: VideoFormats }[] = [
  { label: "MP4 (.mp4)", value: VideoFormats.MP4 },
  { label: "MOV (.mov)", value: VideoFormats.MOV },
  { label: "MKV (.mkv)", value: VideoFormats.MKV },
];
