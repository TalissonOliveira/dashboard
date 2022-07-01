import { createServer, Factory, Model, Response  } from 'miragejs'
import { faker } from '@faker-js/faker'

faker.locale = 'pt_BR'

type InvoiceTypes = 'Pendente' | 'Vencido' | 'Pago' | 'Fatura'

interface Invoice {
  client: string
  issue_date: Date
  due_date: Date
  amount: string
  invoice_types: InvoiceTypes[]
}

interface Client {
  cnpj: string
  name: string
}

const invoiceTypes: InvoiceTypes[] = ['Pendente', 'Vencido', 'Pago', 'Fatura']

function generateRandomInvoiceTypes() {
  const quantity = Math.random() * 2

  const randomInvoiceTypes = []

  for (let index = 0; index < quantity; index++) {
    const randomInvoiceType = invoiceTypes[Math.floor((Math.random() * invoiceTypes.length))]

    if (!randomInvoiceTypes.includes(randomInvoiceType)) {
      randomInvoiceTypes.push(randomInvoiceType)
    }
  }

  return randomInvoiceTypes
}

export function makeServer() {
  const server = createServer({
    models: {
      invoice: Model.extend<Partial<Invoice>>({}),
      cliente: Model.extend<Partial<Client>>({}),
    },
    factories: {
      invoice: Factory.extend({
        client() {
          return faker.name.findName()
        },
        issueDate() {
          return faker.date.recent(10)
        },
        dueDate() {
          return faker.date.future()
        },
        amount() {
          return faker.finance.amount()
        },
        invoiceTypes() {
          return generateRandomInvoiceTypes()
        }
      }),
      cliente: Factory.extend({
        cnpj() {
          return faker.random.numeric(14)
        },
        name(i: number) {
          return `Empresa ${i + 1}`
        }
      })
    },
    seeds(server) {
      server.createList('cliente', 2),
      server.createList('invoice', 200)
    },
    routes() {
      this.namespace = 'api'
      // this.timing = 750

      this.get('/Faturas/cnpj/:cnpj/:page/:pageSize', function (schema, request) {
        const { page = 1, pageSize: per_page = 5 } = request.params

        const total = schema.all('invoice').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        const invoices = this.serialize(schema.all('invoice'))
          .invoices.slice(pageStart, pageEnd)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { invoices }
        )
      })
      this.get('/Cliente')

      // this.namespace = ''
      this.passthrough('https://reqres.in/api/**')
    }
  })

  return server
}