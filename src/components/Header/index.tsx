import { MdLogout } from 'react-icons/md'
import { TbFileInvoice, TbUserX } from 'react-icons/tb'
import { FaUser, FaFileInvoice } from 'react-icons/fa'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ActiveLink } from './ActiveLink'

import styles from './styles.module.scss'

export function Header() {
  const { user, signOut } = useAuthContext()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav>
          <ActiveLink activeClassName={styles.active} to={'/dashboard'}>
            <a>
              <FaFileInvoice />
              Faturas
            </a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} to={'/profile'}>
            <a>
              <FaUser />
              Perfil
            </a>
          </ActiveLink>
        </nav>

        <div>
          <strong className={styles.userEmail}>{user.email}</strong>

          <button type="button" onClick={signOut}>
            Sair
            <MdLogout
            />
          </button>
        </div>
      </div>
    </div>
  )
}