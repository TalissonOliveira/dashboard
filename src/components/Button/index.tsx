import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader } from '../Loader'

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: ReactNode
}

export function Button({ isLoading, children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={styles.button}>
      {isLoading ? <Loader size="small" /> : children}
    </button>
  )
}
