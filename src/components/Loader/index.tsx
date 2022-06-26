import styles from './styles.module.scss'

interface LoaderProps {
  size: "small" | "medium"
}

export function Loader({ size }: LoaderProps) {
  return (
    <div className={`${styles.loader} ${styles[size]}`} />
  )
}