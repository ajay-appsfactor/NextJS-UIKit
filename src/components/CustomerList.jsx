"use client";
import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  SquarePen,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ChevronsUpDown,
} from "lucide-react";
import dayjs from "dayjs";

export default function CustomerList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/dashboard/customers");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "first_name",
        header: "FIRST NAME",
      },
      {
        accessorKey: "last_name",
        header: "LAST NAME",
      },
      {
        accessorKey: "company",
        header: "COMPANY",
      },
      {
        accessorKey: "email",
        header: "EMAIL",
      },
      {
        id: "created_at",
        header: "REGISTER DATE",
        accessorFn: (row) => dayjs(row.created_at).format("MMM DD, YYYY"),
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <button className="uk-button uk-button-default">
            <SquarePen />
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) return <p className="uk-text-center uk-h2">Loading users...</p>;

  return (
    <div className="uk-container">
      {/* Search Filter */}
      <div className="uk-margin">
        <input
          type="text"
          placeholder="Search customers..."
          className="uk-input uk-border-rounded"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="uk-table uk-table-small uk-table-middle uk-table-divider uk-table-hover">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bolder",
                    color: "#000000",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <ArrowUpWideNarrow size={18} />,
                    desc: <ArrowDownWideNarrow size={18} />,
                  }[header.column.getIsSorted()] ?? (
                    <ChevronsUpDown size={18} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No customers found.</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="uk-flex uk-flex-between uk-flex-middle uk-margin">
        <button
          className="uk-button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <button
          className="uk-button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
