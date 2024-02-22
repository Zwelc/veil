"use client";
import TablePagination from "@/components/Pagination";
import { usePlayerMatches } from "@/hooks/usePlayer";

import Image from "next/image";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = usePlayerMatches(params.id);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  return (
    <>
      <div className="block tile p-4  col-span-3 row-span-4 w-full h-full ">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-xl font-bold leading-none ">Match History</h5>
        </div>
        <div className="relative overflow-x-auto h-[44rem]">
          <table className="w-full text-sm text-left h-full ">
            <thead className="text-xs  uppercase  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Hero
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  KDA
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Lobby
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="w-full h-full">
              {isLoading && <div></div>}
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((match) => (
                    <tr className=" border-b " key={match.match_id}>
                      <th
                        scope="row"
                        className="flex space-x-4 items-center px-6 py-4 font-medium  whitespace-nowrap "
                      >
                        <Image
                          src={match.image}
                          height={29}
                          width={59}
                          alt={match.localized_name}
                        />
                        <span className="px-4"> {match.name}</span>
                      </th>
                      <td className="px-6 py-4 text-right"> {match.kda}</td>
                      <td className="px-6 py-4 text-right"> {match.lobby}</td>
                      <td className="px-6 py-4 text-right">
                        {" "}
                        {match.duration}
                      </td>
                      <td className="px-6 py-4 text-right"> {match.result}</td>
                    </tr>
                  ))}
              <tr className="w-full h-full"></tr>
            </tbody>
          </table>
        </div>

        <TablePagination
          count={data?.length || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  );
}
