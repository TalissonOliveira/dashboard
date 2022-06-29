import { PaginationItem } from './PaginationItem'

import styles from './styles.module.scss'

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

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

  return (
    <div className={styles.pagination}>
      <span>
        Página{' '}
        <strong>
          {currentPage}{' '}
        </strong>
        de{' '}
        <strong>
          {lastPage}
        </strong>
      </span>

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

