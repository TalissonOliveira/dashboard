import { cloneElement, ReactElement } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
}

export function ActiveLink({ children, activeClassName, ...props }: ActiveLinkProps) {
  const location = useLocation()

  const className = location.pathname === props.to
    ? activeClassName
    : ''

  return (
    <Link {...props}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}