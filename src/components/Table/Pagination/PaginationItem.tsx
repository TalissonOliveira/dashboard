interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  number,
  onPageChange ,
  isCurrent = false
}:PaginationItemProps) {
  if (isCurrent) {
    return (
      <button onClick={() => {}} disabled>
        {number}
      </button>
    )
  }

  return (
    <button onClick={() => onPageChange(number)}>
      {number}
    </button>
  )
}
