import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { FaSearch } from 'react-icons/fa'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { Loader } from '../../components/Loader'
import { CustomSelect } from '../../components/Select'
import { Table } from '../../components/Table'
import { useClients } from '../../services/hooks/useClients'
import { useInvoices } from '../../services/hooks/useInvoices'
import { Empty } from '../../components/Empty'

import styles from './styles.module.scss'

type InvoiceTypes = 'Pendente' | 'Vencido' | 'Pago' | 'Fatura'

const options = [
  { value: 'Pago', label: 'Pagas' },
  { value: 'Pendente', label: 'Pendentes' },
  { value: 'Vencido', label: 'Vencidas' }
]

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [cnpj, setCnpj] = useState(' ')
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState<InvoiceTypes>()
  const { data: clients } = useClients()
  const { data, isLoading, isFetching, refetch } = useInvoices(currentPage, pageSize, cnpj)
  const queryClient = useQueryClient()

  useDocumentTitle('Faturas')

  useEffect(() => {
    setCurrentPage(1)
    refetch()
  }, [pageSize, cnpj])

  useEffect(() => {
    queryClient.removeQueries('invoices')
  }, [pageSize])

  useEffect(() => {
    if (clients?.clientes) {
      setCnpj(clients?.clientes[0].cnpj)
    }
  }, [clients])

  const columns: Array<any> = useMemo(
    () => [
      {
        Header: 'Cliente',
        accessor: 'client',
        minWidth: '17rem'
      },
      {
        Header: 'Emissão',
        accessor: 'issueDate',
      },
      {
        Header: 'Vencimento',
        accessor: 'dueDate',
      },
      {
        Header: 'Valor',
        accessor: 'amount',
      }
    ], []
  )

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: 'invoiceTypes',
        Header: 'Opções',
        minWidth: '13rem',
        Cell: ({ row }) => (
          row.original.invoiceTypes.map(invoiceType => (
            <span className={styles.invoiceType}>
              {invoiceType}
            </span>
          ))
        )
      }
    ])
  }

  const filteredInvoices = data?.invoices.filter(invoice =>
    invoice.invoiceTypes.includes(typeFilter)
  )
  
  const companyOptions = clients?.clientes?.map(client => ({
    value: client.cnpj,
    label: client.name
  }))

  function handleSelectInvoiceTypes(event) {
    setTypeFilter(event.value)
  }

  function handleSelectCompany(event) {
    setCnpj(event.value)
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Minhas faturas</h2>
        {!isLoading && isFetching && <Loader size="small" />}
      </div>
      <section className={styles.companies}>
        <div className={styles.content}>
          <p>Selecione a empresa para filtrar as faturas</p>
          <CustomSelect
            placeholder="Selecionar..."
            options={companyOptions}
            onChange={handleSelectCompany}
          />
        </div>
      </section>

      <section className={styles.invoices}>
        <div className={styles.tableFilters}>
          <div className={styles.search}>
            <FaSearch />
            <input
              type="text"
              placeholder="Pesquisar por CNPJ ou nome"
              onChange={event => setFilter(event.target.value)}
            />
          </div>
          <CustomSelect
            options={options}
            placeholder="Selecionar..."
            onChange={(event) => handleSelectInvoiceTypes(event)}
          />
        </div>

        {isLoading ? (
            <div className={styles.tableContainer}>
              <Loader size="small" />
            </div>
          ) : data?.invoices.length ? (
            <Table
              columns={columns}
              data={filteredInvoices.length > 0 ? filteredInvoices : data?.invoices}
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalCountOfRegisters={data.totalCount}
              tableHooks={tableHooks}
              filter={filter}
              filters={[
                'values.client'
              ]}
            />
          ) : (
            <div className={styles.tableContainer}>
              <Empty />
            </div>
          )
        }
      </section>
    </div>
  )
}
