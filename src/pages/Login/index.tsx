import { MdEmail, MdLock } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthLayout } from '../../layouts/AuthLayout'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import * as Yup from 'yup'

import styles from './styles.module.scss'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

interface SignInFormData {
  email: string
  password: string
}

const signInFormSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
})

export function Login() {
  useDocumentTitle('Entrar')

  const { register, handleSubmit, formState: {
    isSubmitting,
    errors
  }} = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 750))
    console.log(values)
  }

  return (
    <AuthLayout>
      <main className={styles.container}>
        <div className={styles.content}>
          <h1>Entrar</h1>
          <p>Entre com suas credenciais.</p>

          <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
            <Input
              type="email"
              placeholder="E-mail"
              required
              error={errors.email}
              icon={<MdEmail size={24} />}
              {...register('email')}
            />

            <Input
              type="password"
              placeholder="Senha"
              required
              error={errors.password}
              icon={<MdLock size={24} />}
              {...register('password')}
            />

            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Entrar
            </Button>
          </form>
        </div>

        <p>Esqueceu a senha? <a href="#">Redefinir senha</a></p>
      </main>
    </AuthLayout>
  )
}
