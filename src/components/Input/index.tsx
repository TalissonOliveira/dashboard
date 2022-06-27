import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError
  icon?: ReactNode
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error = null, icon, ...rest },
  ref
) => {
  return (
    <>
      <div className={`${styles.inputContainer} ${!!error && styles.error}`}>
        <input ref={ref} {...rest} />
        {icon}
      </div>

      {!!error && (
        <span className={styles.errorMessage}>{error.message}</span>
      )}
    </>
  )
}

export const Input = forwardRef(InputBase)