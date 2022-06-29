import { useQuery } from 'react-query'
import { api } from '../api'

type InvoiceTypes = 'À Vencer' | 'Vencido' | 'Pago' | 'Fatura'

interface Invoice {
  client: string
  issueDate: Date
  dueDate: Date
  amount: string
  invoiceTypes: InvoiceTypes[]
}

interface GetInvoicesResponse {
  invoices: Invoice[]
  totalCount: number
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

async function getInvoices(page: number) {
    const { data, headers } = await api.get<GetInvoicesResponse>('/invoices', {
      params: {
        page,
      }
    })

    const totalCount = Number(headers['x-total-count'])

    const invoices = data.invoices.map(invoice => {
      return {
        client: invoice.client,
        issueDate: formatDate(invoice.issueDate),
        dueDate: formatDate(invoice.dueDate),
        invoiceTypes: invoice.invoiceTypes,
        amount: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL' 
        }).format(Number(invoice.amount)),
      }
    })

    return {
      invoices,
      totalCount
    }
}

export function useInvoices(page: number) {
  return useQuery(['invoices', page], () => getInvoices(page), {
  staleTime: 1000 * 10 // 10 seconds
 })
}