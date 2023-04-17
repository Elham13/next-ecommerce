import React from "react";
import { IPagination } from "./common";

export interface IActions {
  delete?: { visible: boolean; onClick: (id: string) => void };
  edit?: { visible: boolean; onClick: (id: string) => void };
}

export interface ICommonTableRow {
  accessKey: string; // the api key
  type: "string" | "button";
  actions?: IActions;
}

export interface ICommonTableProps<T> {
  headers: string[];
  loading: boolean;
  data: T[];
  count: number;
  rows: ICommonTableRow[];
  pagination: IPagination;
  setPagination: React.Dispatch<React.SetStateAction<IPagination>>;
  hasSerialNo: boolean;
}

export interface IEnhancedTableRowProps<T> {
  serialNo?: number;
  rowData: T;
  hasSerialNo: boolean;
  rows: ICommonTableRow[];
}

export interface ITablePaginationProps {
  count: number;
  limit: number;
  page: number;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePageChange: (value: "increase" | "decrease") => void;
}
