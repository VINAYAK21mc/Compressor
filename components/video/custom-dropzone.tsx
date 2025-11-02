"use client";

import ReactDropzone, { FileError, FileRejection } from "react-dropzone";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Projector } from "lucide-react";

type customDropzoneProps = {
  handleOnDrop: (files: File) => void;
  acceptedFiles: { [key: string]: string[] };
  disabled?: boolean;
};

export default function CustomDropzone({
  handleOnDrop,
  acceptedFiles,
  disabled = false,
}: customDropzoneProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };
  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleError = (err: Error | FileError) => {
    handleLeave();
    toast.error(err.message);
  };

  const onDropRejected = (fileRejection: FileRejection[]) => {
    handleLeave();
    fileRejection[0].errors.forEach((error) => {
      toast.error(error.message);
    });
  };
  const onDrop = useCallback(
    (files: File[]) => {
      handleOnDrop(files[0]);
      handleLeave();
    },
    [handleOnDrop]
  );
  return (
    <ReactDropzone
      onDrop={onDrop}
      accept={acceptedFiles}
      disabled={disabled}
      onDragEnter={handleHover}
      onDragLeave={handleLeave}
      multiple={false}
      onDropRejected={onDropRejected}
      onError={handleError}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 flex justify-center items-center flex-col w-full py-6 ${
            isHovered
              ? "border-blue-500 bg-background"
              : "border-gray-300 bg-background/35"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Input {...getInputProps()} />
          {disabled ? (
            <>
              <Projector className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-500">File upload is disabled.</p>
            </>
          ) : (
            <>
              <Projector className="w-12 h-12 text-gray-700 mb-4" />
              <p className="text-gray-700">
                Drag & drop a file here, or click to select a file
              </p>
            </>
          )}
        </div>
      )}
    </ReactDropzone>
  );
}
