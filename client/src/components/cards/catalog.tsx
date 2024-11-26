import { FC } from "react";

type CatalogCardProps = {
  id: number;
  name: string;
  onOpen: (id: number) => void;
}

const CatalogCard: FC<CatalogCardProps> = ({ id, name, onOpen }) => {
  return (
    <div className="grid relative min-w-[75px] min-h-[75px] grid-rows-[75px_auto] cursor-pointer gap-2" onClick={(e) => {
      if (e.detail === 2) {
        onOpen(id);
      }
    }}>
      <div className="absolute right-0 top-0 w-3 rounded-sm h-5 bg-[#10101050] z-10"></div>
      <div className="w-full h-full bg-orange-300 skew-y-3 hover:skew-y-0 rounded-sm hover:shadow-violet-950 hover:shadow-sm"/>
      <div className="mt-[-5px] text-center overflow-hidden max-w-[75px] max-h-[1.5rem] text-ellipsis">{name}</div>
    </div>
  )
}

export default CatalogCard;