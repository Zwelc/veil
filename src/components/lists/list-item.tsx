import Image from "next/image";

export default function ListItem({
  image,
  name,
  result,
  detail,
}: {
  image: string;
  name: string;
  result: string;
  detail?: string;
}) {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          <Image
            src={image}
            height={29}
            width={59}
            alt={name}
            className="h-[29px] w-[59px] rounded-md object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium  truncate ">{name}</p>
        </div>
        <div className="inline-flex flex-col items-end text-right">
          <span className="text-sm font-semibold tabular-nums">{result}</span>
          {detail && (
            <span className="text-xs font-medium text-muted-foreground">
              {detail}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
