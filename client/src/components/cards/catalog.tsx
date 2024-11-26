import { FC, useState } from "react";

type CatalogCardProps = {
  id: number;
  name: string;
  onOpen: (id: number) => void;
};

const CatalogCard: FC<CatalogCardProps> = ({ id, name, onOpen }) => {
  const [isRename, setIsRename] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  return (
    <div
      className="grid relative min-w-[75px] min-h-[75px] grid-rows-[75px_auto] cursor-pointer gap-2"
    >
      <div className="absolute right-0 top-0 w-3 rounded-sm h-5 bg-[#10101050] z-10"></div>
      <div 
        className="w-full h-full bg-orange-300 skew-y-3 hover:skew-y-0 rounded-sm hover:shadow-violet-950 hover:shadow-sm"
        onClick={(e) => {
          if (e.detail === 2) {
            onOpen(id);
          }
        }}
      />
      {isRename && <input
        className="max-w-[75px] max-h-[1.5rem] bg-transparent text-gray-50 text-center bg-slate-600"
        onChange={(event) => setCurrentName(event.target.value)}
        value={currentName}
        minLength={1}
        onBlur={() => {
          setIsRename(false);
        }}
      />}
      {!isRename &&
        <div
          className="mt-[-5px] text-center overflow-hidden max-w-[75px] max-h-[1.5rem] text-ellipsis text-gray-50" 
          onClick={(event) => {
            if (event.detail === 2) {
              setIsRename(true);
            }
          }}
        >
        {currentName}
      </div>
      }
    </div>
  );
};

export default CatalogCard;
