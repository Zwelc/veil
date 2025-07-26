import Image from "next/image";

export default function ListItem({
  image,
  name,
  result,
}: {
  image: string;
  name: string;
  result: string;
}) {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          <Image src={image} height={29} width={59} alt={name} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium  truncate ">{name}</p>
        </div>
        <div className="inline-flex items-center text-base font-semibold ">
          {result}
        </div>
      </div>
    </li>
  );
}
