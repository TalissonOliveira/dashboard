import styles from './styles.module.scss'

import emptyImg from '../../assets/empty.svg'

export function Empty() {
  return (
    <div className={styles.container}>
      <img src={emptyImg} />
      <p>Sem dados por enquanto</p>
    </div>
  )
}