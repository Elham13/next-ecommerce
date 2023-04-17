import React from "react";
import CircularProgress from "../CircularProgress";

const TableLoader = ({ colSpan = 1 }: { colSpan?: number }) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex justify-center items-center">
          <CircularProgress
            width={16}
            height={16}
            fill="fill-blue-900"
            color="text-gray-300"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableLoader;
