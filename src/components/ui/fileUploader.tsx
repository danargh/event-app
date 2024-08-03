"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/utils/index";
import { Trash2Icon, UploadIcon } from "lucide-react";

type FileUploaderProps = {
   onFieldChange: (url: string) => void;
   imageUrl: string;
   setImageUrl: Dispatch<SetStateAction<string>>;
   setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
   imageUrl,
   onFieldChange,
   setFiles,
   setImageUrl,
}: FileUploaderProps) {
   const onDrop = useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFieldChange(convertFileToUrl(acceptedFiles[0]));
   }, []);

   const removeImage = () => {
      setFiles([]);
      onFieldChange("");
      setImageUrl("");
   };

   const acceptCondition = "image/*";

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: acceptCondition
         ? generateClientDropzoneAccept(["image/*"])
         : undefined,
   });

   return (
      <section className="flex gap-x-2 w-full">
         <div
            {...getRootProps()}
            className="flex-center w-full bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200"
         >
            <input {...getInputProps()} className="cursor-pointer" />

            {imageUrl ? (
               <div className="flex relative h-full w-full flex-1 justify-center ">
                  <img
                     src={imageUrl}
                     alt="image"
                     width={100}
                     height={100}
                     className="w-full object-contain object-center"
                  />
               </div>
            ) : (
               <div className="flex-center flex-col py-5 text-grey-500">
                  <UploadIcon />
                  <h3 className="mb-2 mt-2">Drag photo here</h3>
                  <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                  <Button type="button" className="rounded-full">
                     Select from computer
                  </Button>
               </div>
            )}
         </div>
         {imageUrl ? (
            <Button onClick={removeImage} className="" variant={"destructive"}>
               <Trash2Icon />
            </Button>
         ) : null}
      </section>
   );
}
