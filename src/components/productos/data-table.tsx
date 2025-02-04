"use client"
import { useMemo, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn,
  VisibilityState,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import { exportToExcel } from "./table-excel-export"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Columns3,
  ChevronUp,
  ChevronDown,
  Download,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { columns } from "./columns"
import { Product } from "@/types/product"

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const formatter = new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
    timeZone: "UTC",
  })

  return formatter.format(date)
}

const formatQuantity = (value: number) => {
  return new Intl.NumberFormat("es", {
    maximumFractionDigits: 2,
  }).format(value)
}

const truncateId = (id: string | number, maxLength: number = 15) => {
  const idString = id.toString()
  if (idString.length <= maxLength) return idString
  return `${idString.slice(0, maxLength)}...`
}

export function DataTable({ data }: { data: Product[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const nameFilterFn: FilterFn<Product> = (row, columnId, filterValue) => {
    const searchValue = (filterValue ?? "").toLowerCase()
    const name = (row.getValue("nombre_lean") as string | null) ?? ""
    const id = row.original.sap.toString()
    const searchableString = `${name} ${id}`.toLowerCase()
    return searchableString.includes(searchValue)
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    state: {
      pagination,
      columnFilters,
      columnVisibility,
      sorting,
    },
  })

  return (
    <div className="space-y-2">
      {/* Filter */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Input
            className="min-w-60 ps-9"
            placeholder="Filtrar por nombre o ID..."
            value={
              (table.getColumn("nombre_lean")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("nombre_lean")?.setFilterValue(e.target.value)
            }
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
            <ListFilter size={16} strokeWidth={2} />
          </div>
        </div>

        {/* Toggle columns visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns3
                className="-ms-1 me-2 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              Vista
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
            <DropdownMenuLabel>Seleccionar columnas</DropdownMenuLabel>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onSelect={(event) => event.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Export button */}
        <Button
          variant="outline"
          onClick={() => exportToExcel(table, "forecast-data")}
          className="gap-2"
        >
          <Download size={16} />
          Exportar
        </Button>
      </div>

      {/* Table section */}
      <div className="overflow-auto rounded-md border [&>div]:max-h-96">
        <Table
          className="border-separate border-spacing-0 [&_td]:border-border [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none"
          style={{
            width: table.getCenterTotalSize(),
          }}
        >
          <TableHeader className="sticky top-0 z-20 bg-background/90 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
              >
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      index === 0 &&
                        "sticky left-0 z-20 bg-background/90 backdrop-blur-sm"
                    )}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        header.column.getCanSort() &&
                          "cursor-pointer select-none"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUp size={16} strokeWidth={2} />,
                        desc: <ChevronDown size={16} strokeWidth={2} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanResize() && (
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className:
                            "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px",
                        }}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="*:border-border odd:bg-muted/50 hover:bg-transparent odd:hover:bg-muted/50 [&>:not(:last-child)]:border-r"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "min-w-[100px]",
                        index === 0 && "sticky left-0 z-10 bg-background"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-36 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination section */}
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Label className="text-sm">Filas por página</Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <span className="mx-2">·</span>
          <span>{table.getFilteredRowModel().rows.length} resultados</span>
        </div>

        <div className="flex items-center gap-2">
          <Pagination>
            <PaginationContent>
              {/* First Page Button */}
              <PaginationItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => table.firstPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <ChevronFirst className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Primera página</TooltipContent>
                </Tooltip>
              </PaginationItem>

              {/* Previous Page Button */}
              <PaginationItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Página anterior</TooltipContent>
                </Tooltip>
              </PaginationItem>

              {/* Next Page Button */}
              <PaginationItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Siguiente página</TooltipContent>
                </Tooltip>
              </PaginationItem>

              {/* Last Page Button */}
              <PaginationItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => table.lastPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <ChevronLast className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Última página</TooltipContent>
                </Tooltip>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
