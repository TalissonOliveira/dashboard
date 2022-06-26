import { MdEmail, MdLock } from 'react-icons/md'
import { AuthLayout } from '../../layouts/AuthLayout'
import { Button } from '../../components/Button'

import styles from './styles.module.scss'

export function Login() {
  return (
    <AuthLayout>
      <main className={styles.container}>
        <div className={styles.content}>
          <h1>Entrar</h1>
          <p>Entre com suas credenciais.</p>

          <form className={styles.form}>
            <div className={styles.inputContainer}>
              <input type="email" placeholder="E-mail" required />
              <MdEmail size={24} />
            </div>
            <div className={styles.inputContainer}>
              <input type="password" placeholder="Senha" required />
              <MdLock size={24} />
            </div>

            <Button>Entrar</Button>
          </form>
        </div>

        <p>Esqueceu a senha? <a href="#">Redefinir senha</a></p>
      </main>
    </AuthLayout>
  )
}
