import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { MdLock } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '../../services/api'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { useAuthContext } from '../../hooks/useAuthContext'
import * as Yup from 'yup'

import styles from './styles.module.scss'

interface ChangePasswordFormData {
  password: string
  new_password: string
  password_confirmation: string
}

const signInFormSchema = Yup.object({
  password: Yup.string().required('A senha é obrigatória'),
  new_password: Yup.string().required('A senha é obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: Yup.string().oneOf([
    null, Yup.ref('new_password')
  ], 'As senhas precisam ser iguais')
})

export  function Profile() {
  const { user } = useAuthContext()
  const { register, handleSubmit, reset, formState: {
    isSubmitting,
    errors
  }} = useForm<ChangePasswordFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const changePassword = useMutation(async (values: ChangePasswordFormData) => {
    await api.post('/AlterarSenha', {
      email: user.email,
      senhaAtual: values.password,
      novaSenha: values.new_password
    })
  }, {
    onSuccess: () => {
      toast.success('Senha alterada com sucesso.')
      reset()
    },
    onError: ({ response }) => {
      toast.dismiss()
      toast.error('Não foi possível alterar a senha.')
      reset()
    }
  })

  const handleSignIn: SubmitHandler<ChangePasswordFormData> = async (values) => {
    await changePassword.mutateAsync(values)
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Seu perfil,</h2>
        <strong>{user.email}</strong>
      </div>
      <section>
        <div className={styles.content}>
          <h3>Alterar senha</h3>
          <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
            <Input
              type="password"
              placeholder="Senha atual"
              required
              error={errors.password}
              icon={<MdLock size={24} />}
              {...register('password')}
            />

            <Input
              type="password"
              placeholder="Nova senha"
              required
              error={errors.new_password}
              icon={<MdLock size={24} />}
              {...register('new_password')}
            />

            <Input
              type="password"
              placeholder="Confirmar nova senha"
              required
              error={errors.password_confirmation}
              icon={<MdLock size={24} />}
              {...register('password_confirmation')}
            />

            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Alterar
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
