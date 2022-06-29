import { useCallback, useEffect } from 'react'
import { matchSorter } from 'match-sorter'
import {
  PluginHook,
  useTable,
  UseTableOptions,
  usePagination,
  useGlobalFilter,
  Row
} from 'react-table'
import Pagination from './Pagination'

import styles from './styles.module.scss'

interface TableProps extends UseTableOptions<{}> {
  currentPage: number
  totalCountOfRegisters: number
  tableHooks: PluginHook<{}>
  filter?: string
  filters?: string[]
  setCurrentPage: (page: number) => void
}

export function Table({
  totalCountOfRegisters,
  columns,
  data,
  tableHooks,
  filter,
  filters,
  currentPage,
  setCurrentPage
}: TableProps) {
  const ourGlobalFilterFunction = useCallback((rows: Row<object>[], ids, query: string) => {
    return matchSorter(rows, query, {
      keys: filters.map((columnName) => `${columnName}`)
    })
  }, [])

  const tableInstance = useTable({
    columns,
    data,
    manualPagination: true,
    globalFilter: ourGlobalFilterFunction
  },
    tableHooks, useGlobalFilter, usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance

  useEffect(() => {
    setGlobalFilter(filter)
  }, [filter, setGlobalFilter])

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table} {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th style={{ minWidth: column.minWidth }} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {
                  row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {
                        cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <Pagination
          totalCountOfRegisters={totalCountOfRegisters}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  )
}