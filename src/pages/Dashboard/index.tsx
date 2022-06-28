import { FaSearch } from 'react-icons/fa'
import { CustomSelect } from '../../components/Select'

import styles from './styles.module.scss'

const options = [
  { value: 'chocolate', label: 'Pagas' },
  { value: 'strawberry', label: 'À Vencer' },
  { value: 'vanilla', label: 'Vencidas' }
]

export function Dashboard() {
  return (
    <div className={styles.container}>
      <h2>Minhas faturas</h2>
      <section className={styles.companies}>
        <div className={styles.content}>
          <p>Selecione a empresa para filtrar as faturas</p>
          <CustomSelect
            placeholder="Selecionar..."
            options={options}
          />
        </div>
      </section>

      <section className={styles.invoices}>
        <div>
          <div className={styles.search}>
            <FaSearch />
            <input type="text" placeholder="Pesquisar por CNPJ ou nome" />
          </div>
          <CustomSelect
            isMulti
            options={options}
            placeholder="Selecionar..."
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Emissão</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome do cliente</td>
              <td>10/10/2020</td>
              <td>20/10/2020</td>
              <td>R$ 40,00</td>
              <td>Fatura</td>
            </tr>
            <tr>
              <td>Nome do cliente</td>
              <td>10/10/2020</td>
              <td>20/10/2020</td>
              <td>R$ 40,00</td>
              <td>Fatura</td>
            </tr>
            <tr>
              <td>Nome do cliente</td>
              <td>10/10/2020</td>
              <td>20/10/2020</td>
              <td>R$ 40,00</td>
              <td>Fatura</td>
            </tr>
            <tr>
              <td>Nome do cliente</td>
              <td>10/10/2020</td>
              <td>20/10/2020</td>
              <td>R$ 40,00</td>
              <td>Fatura</td>
            </tr>
            <tr>
              <td>Nome do cliente</td>
              <td>10/10/2020</td>
              <td>20/10/2020</td>
              <td>R$ 40,00</td>
              <td>Fatura</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
