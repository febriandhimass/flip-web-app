import React from 'react'
import axios from 'axios'
import Header from 'components/Header';
import Loading from 'components/Loading'
import Transaction from 'components/Transaction';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      totalAmount: '',
      searchValue: '',
      sortValue: '',
      loading: false
    }
  }
  
  componentDidMount() {
    document.title = "Transaction | Flip Frontend Developer Recruitment Test"
    this.fetchData()
  }

  fetchData() {
    this.setState({ loading: true }, () => {
      axios('/frontend-test')
        .then(res => {
          const transactions = Object.values(res.data)
          const totalAmount = transactions.map(item => item.amount).reduce((prev, next) => prev + next);
          this.setState({ transactions, totalAmount, loading: false })
        })
        .catch(() => this.setState({ loading: false }))
    })
  }

  handleSearchValue(e) {
    this.setState({ searchValue: e.target.value })
  }

  handleSortValue(e) {
    this.setState({ sortValue: e.target.value });
  }

  render() {
    const { searchValue, sortValue, totalAmount, transactions, loading } = this.state
    const formattedAmount = new Intl.NumberFormat('ID').format(totalAmount)
    return (
      <div id="page-transaction-list">
        <div className="container">
          <Header title="Daftar Transaksi" />
          <h2 className="text-greeting">Halo Kak!</h2>
          <p className="text-notice">Kamu telah melakukan transaksi sebesar <span className="amount">Rp{formattedAmount}</span> sejak menggunakan Flip</p>
          <div className="input-container">
            <i className="fa fa-search icon"/>
            <input className="input-field" type="text" value={searchValue} onChange={this.handleSearchValue.bind(this)} placeholder="Cari nama atau bank"/>
            <select value={sortValue} onChange={this.handleSortValue.bind(this)} className="select-field">
              <option value="" disabled defaultValue hidden>Urutkan</option>
              <option value="name-asc">Nama A-Z</option>
              <option value="name-desc">Nama Z-A</option>
              <option value="newest">Tanggal terbaru</option>
              <option value="oldest">Tanggal terlama</option>
            </select>
          </div>
          {loading ? (
            <Loading/>
          ) : (
            <div className="list-container">
              {transactions.length > 0 ? (
                <Transaction transactions={transactions}/>
              ) : (
                <span>Data tidak ditemukan!</span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home