import { ICommonTableProps } from "@/types/table";
import React from "react";
import TableLoader from "./TableLoader";
import EmptyTableRow from "./EmptyTableRow";
import EnhancedTableRow from "./EnhancedTableRow";
import TablePagination from "./TablePagination";

function CommonTable<T extends { _id: string }>({
  headers,
  loading,
  data,
  rows,
  count,
  pagination,
  setPagination,
  hasSerialNo,
}: ICommonTableProps<T>) {
  return (
    <div className="max-w-full">
      <table className="basic mt-6">
        <thead>
          <tr>
            {hasSerialNo && <th className="max-w-fit">S.No</th>}
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <TableLoader colSpan={headers.length + (hasSerialNo ? 1 : 0)} />
          ) : data?.length ? (
            data.map((item: T, index: number) => (
              <EnhancedTableRow
                key={item._id}
                rowData={item}
                hasSerialNo={hasSerialNo}
                rows={rows}
                serialNo={pagination.start * pagination.limit + index + 1}
              />
            ))
          ) : (
            <EmptyTableRow colSpan={headers.length + (hasSerialNo ? 1 : 0)} />
          )}
        </tbody>
      </table>
      <TablePagination
        count={count}
        page={pagination.start}
        limit={pagination.limit}
        handleRowsPerPageChange={(e) => {
          const limit = parseInt(e.target.value);
          setPagination((prev) => ({ ...prev, limit }));
        }}
        handlePageChange={(value) => {
          const start =
            value === "increase" ? pagination.start + 1 : pagination.start - 1;
          setPagination((prev) => ({ ...prev, start }));
        }}
      />
    </div>
  );
}

export default CommonTable;
