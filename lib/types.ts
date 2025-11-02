export type FileActions = {
  file: File | null;
  fileName: string;
  fileSize: number;
  fileType: string;
  from: string;
  isError?: boolean;
  url?: string;
  output?: any;
  outputBlob?: Blob;
};

export enum QualityType {
  HIGH = "18",
  MEDIUM = "23",
  LOW = "28",
}

export enum VideoFormats {
  MP4 = "mp4",
  MOV = "mov",
  MKV = "mkv",
  AVI = "avi",
  WMV = "wmv",
  FLV = "flv",
  WEBM = "webm",
}

export type VideoInputSettings = {
  format: VideoFormats;
  quality: QualityType;
  customStartTime: number;
  customEndTime: number;
  removeAudio: boolean;
  twitterCompression: boolean;
  whatsappCompression: boolean;
};
