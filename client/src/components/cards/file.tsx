import { FC } from "react";

type FileCardProps = {
  id: number
  name: string;
  size: number;
  extention?: string;
}

const FileCard: FC<FileCardProps> = ({ id, name, size, extention }) => {
  return (
    <div className="grid relative min-w-[75px] min-h-[75px] grid-rows-[75px_auto] cursor-pointer gap-2 rounded-tr-[25px] overflow-x-hidden">
      <div className="w-full h-full bg-slate-400 skew-y-3 hover:skew-y-0 rounded-sm hover:shadow-violet-950 hover:shadow-sm"/>
      <div className="absolute text-lg text-gray-900 font-semibold top-6 left-1/3 select-none">{extention?.toUpperCase()}</div>
      <div className="mt-[-5px] text-center overflow-hidden max-w-[75px] max-h-[1.5rem] text-ellipsis">{name}</div>
    </div>
  )
}

export default FileCard;