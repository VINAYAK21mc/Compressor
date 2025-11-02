"use client";

import { AnimatePresence, motion } from "framer-motion";
import CustomDropzone from "./custom-dropzone";
import { acceptedVideoFiles } from "@/lib/formats";
import { useEffect, useRef, useState } from "react";
import {
  FileActions,
  QualityType,
  VideoFormats,
  VideoInputSettings,
} from "@/lib/types";
import { VideoDisplay } from "./video-display";
import VideoInputDisplay from "./video-input-details";
import { VideoInputControls } from "./video-input-controls";
import { VideoTrim } from "./video-trim";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { Button } from "../ui/button";
import { toast } from "sonner";
import convertFile from "@/lib/fileConvert";
import { VideoProgress } from "./compress-video-progress";
import { VideoOutputDetails } from "./video-output-details";

export default function CompressVideo() {
  const [videoFile, setVideoFile] = useState<FileActions>();
  const [videoSettings, setVideoSettings] = useState<VideoInputSettings>({
    quality: QualityType.HIGH,
    format: VideoFormats.MP4,
    customStartTime: 0,
    customEndTime: 0,
    removeAudio: false,
    twitterCompression: false,
    whatsappCompression: false,
  });
  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{
    startTime?: Date;
    elapsedTime?: number;
  }>({ elapsedTime: 0 });
  const [status, setStatus] = useState<
    "not started" | "converted" | "compressing"
  >("not started");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (time?.startTime) {
      timer = setInterval(() => {
        const endTime = new Date();
        const timeDifference = endTime.getTime() - time.startTime!.getTime();
        setTime({ ...time, elapsedTime: timeDifference });
        console.log(time);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time]);
  const ffmpeg = useRef(new FFmpeg());

  const currentlyCompressing = status === "compressing";

  const load = async () => {
    const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';
    const ffmpegInstance = ffmpeg.current;
    await ffmpegInstance.load({
      coreURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.js`,
        "text/javascript",
      ),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });
  };

  const loadWithToast = () => {
    toast.promise(load, {
      loading: "Downloading necessary packages from FFmpeg for offline use.",
      success: () => {
        return "All necessary file downloaded";
      },
      error: "Error loading FFmpeg packages",
    });
  };

  useEffect(() => loadWithToast(), []);

  const condense = async () => {
    if (!videoFile) return;
    try {
      setTime({ ...time, startTime: new Date() });
      setStatus("compressing");
      ffmpeg.current.on("progress", ({ progress: completion, time }) => {
        const percentage = completion * 100;
        setProgress(percentage);
      });
      ffmpeg.current.on("log", ({ message }) => {
        console.log(message);
      });
      const { url, output, outputBlob } = await convertFile(
        ffmpeg.current,
        videoFile,
        videoSettings,
      );
      setVideoFile({
        ...videoFile,
        url,
        output,
        outputBlob,
      });
      setTime((oldTime) => ({ ...oldTime, startTime: undefined }));
      setStatus("converted");
      setProgress(0);
    } catch (err) {
      console.log(err);
      setStatus("not started");
      setProgress(0);
      setTime({ elapsedTime: 0, startTime: undefined });
      toast.error("Error condensing video");
    }
  };
  const handleOnDrop = (file: File) => {
    console.log("File dropped:", file);
    setVideoFile({
      file: file,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      isError: false,
    });
    setVideoSettings({
      ...videoSettings,
      customStartTime: 0,
      customEndTime: 0,
    });
  };

  return (
    <>
      <motion.div
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        key={"drag"}
        transition={{ type: "tween" }}
        className="border p-2 rounded-3xl col-span-5 flex w-full md:h-full bg-secondary"
      >
        {videoFile ? (
          <VideoDisplay videoUrl={URL.createObjectURL(videoFile.file!)} />
        ) : (
          <CustomDropzone
            handleOnDrop={handleOnDrop}
            acceptedFiles={acceptedVideoFiles}
          />
        )}
      </motion.div>
      <AnimatePresence mode="popLayout">
        <motion.div className="border p-2 rounded-3xl col-span-3 flex flex-col gap-3 w-full md:h-full bg-secondary">
          <div className="flex flex-col gap-4 w-full">
            {videoFile && (
              <>
                <VideoInputDisplay
                  videoFile={videoFile}
                  onClear={() => window.location.reload()}
                />
                <VideoTrim
                  disable={currentlyCompressing}
                  videoSettings={videoSettings}
                  onVideoSettingsChange={setVideoSettings}
                />
              </>
            )}
            <VideoInputControls
              disable={!videoFile || currentlyCompressing}
              videoSettings={videoSettings}
              onVideoSettingsChange={setVideoSettings}
            />
            <motion.div
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={"button"}
              transition={{ type: "tween" }}
            >
              {status === "compressing" && (
                <VideoProgress
                  progress={progress}
                  seconds={time.elapsedTime!}
                />
              )}

              {(status === "not started" || status === "converted") && (
                <Button
                  variant={"default"}
                  onClick={condense}
                  disabled={!videoFile}
                >
                  Compress
                </Button>
              )}
            </motion.div>
            {status === "converted" && videoFile && (
              <VideoOutputDetails
                timeTaken={time.elapsedTime}
                videoFile={videoFile!}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
