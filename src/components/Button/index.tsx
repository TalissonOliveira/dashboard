import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  )
}
