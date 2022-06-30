import { CustomSelect } from '../../Select'
import { PaginationItem } from './PaginationItem'

import styles from './styles.module.scss'

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  setRegistersPerPage: (pagesize: number) => void
  onPageChange: (page: number) => void
}

const pageOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' }
]

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0)
}

export default function Pagination({
  totalCountOfRegisters,
  onPageChange,
  setRegistersPerPage,
  currentPage = 1,
  registersPerPage = 5
}: PaginationProps) {

  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)
  const previousPages = currentPage > 1 
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage 
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  function handleChangePageSize(event) {
    setRegistersPerPage(event.value)
  }

  return (
    <div className={styles.pagination}>
      <CustomSelect
        defaultValue={{ label: registersPerPage, value: registersPerPage }}
        options={pageOptions}
        onChange={handleChangePageSize}
      />

      <div className={styles.pagination}>
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />
            {currentPage > (2 + siblingsCount) && <span>...</span>}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => (
          <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        ))}

        <PaginationItem number={currentPage} isCurrent onPageChange={onPageChange} />

        {nextPages.length > 0 && nextPages.map(page => (
          <PaginationItem key={page} number={page} onPageChange={onPageChange} />
        ))}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && <span>...</span>}
            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </div>
    </div>
  )
}

