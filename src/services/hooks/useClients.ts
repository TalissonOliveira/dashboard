import { useQuery } from 'react-query'
import { api } from '../api'

interface Client {
  cnpj: string
  name: string
}

interface GetInvoicesResponse {
  clientes: Client[]
}

async function getClients() {
    const { data } = await api.get<GetInvoicesResponse>(`/Cliente`)

    return data
}

export function useClients() {
  return useQuery('clients', () => getClients(), {
  staleTime: 1000 * 60 * 10 // 10 minutes
 })
}