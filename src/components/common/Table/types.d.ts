export type Column = { path?: string; label?: string; key?: string };

export type Order = "asc" | "desc";

export type SortColumn = {
  path: string;
  order: Order;
};