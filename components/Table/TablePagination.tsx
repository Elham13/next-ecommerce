import { ITablePaginationProps } from "@/types/table";
import React from "react";

const TablePagination = ({
  count,
  limit,
  page,
  handleRowsPerPageChange,
  handlePageChange,
}: ITablePaginationProps) => {
  return (
    <div className="flex items-center gap-4 float-right max-w-fit py-1 px-2 ">
      <div className="flex gap-2 items-center">
        <p>Rows per page: </p>
        <select
          className="px-2 cursor-pointer"
          value={limit}
          onChange={handleRowsPerPageChange}
        >
          <option disabled={count < 10} value="10">
            10
          </option>
          <option disabled={count < 20} value="20">
            20
          </option>
          <option disabled={count < 30} value="30">
            30
          </option>
          <option disabled={count < 40} value="40">
            40
          </option>
          <option disabled={count < 50} value="50">
            50
          </option>
        </select>
      </div>
      <p>
        {count === 0 ? 0 : page * limit + 1}-
        {Math.min(count, (page + 1) * limit)} of {count}
      </p>
      <ul className="flex gap-4">
        <li
          className={`paginationChangeBtn ${page <= 0 && "disable"}`}
          onClick={() => page > 0 && handlePageChange("decrease")}
        >
          &lt;
        </li>
        <li
          className={`paginationChangeBtn ${
            count <= limit || (page + 1) * limit >= count ? "disable" : null
          }`}
          onClick={() =>
            count <= limit || (page + 1) * limit >= count
              ? null
              : handlePageChange("increase")
          }
        >
          &gt;
        </li>
      </ul>
    </div>
  );
};

export default TablePagination;
