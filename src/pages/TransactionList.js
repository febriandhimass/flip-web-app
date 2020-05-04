import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Header from 'components/Header';
import Loading from 'components/Loading'
import Transaction from 'components/Transaction';
import { compareValues } from 'utils/compareValues';
import { TransactionContext } from 'context/TransactionContext'

const Home = () => {
  const [state, dispatch] = useContext(TransactionContext)
  const [transactions, setTransactions] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    document.title = "Transaction | Flip Frontend Developer Recruitment Test"
    setLoading(true)
    fetchData()
  }, [])

  // initialize data
  const fetchData = () => {
    axios('/frontend-test')
      .then(res => {
        const transactions = Object.values(res.data)
        const modifiedTransaction = transactions.map(v => ({ ...v, created_at: new Date(v.created_at) }))
        dispatch({ type: 'FETCH', payload: modifiedTransaction })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  // set state transactions
  useEffect(() => {
    if (state.transaction.length > 0) {
      
      setTransactions(state.transaction)
      const totalAmount = state.transaction.map(item => item.amount).reduce((prev, next) => prev + next);
      setTotalAmount(totalAmount)
      setLoading(false)
    }
  }, [state])

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }  

  // filter transactions
  useEffect(() => {
    const input = searchValue.toLowerCase()
    if (input.length === 0) {
      setTransactions(state.transaction)
      return;
    }

    const filteredTransactions = state.transaction.filter((v) => {
      return (
        v.sender_bank.toLowerCase().indexOf(input) !== -1 || 
        v.beneficiary_name.toLowerCase().indexOf(input) !==-1 ||
        v.beneficiary_bank.toLowerCase().indexOf(input) !== -1
      )
    })
    setTransactions(filteredTransactions)
  }, [searchValue])

  const handleSortValue = (e) => {
    setSortValue(e.target.value)
  }
  
  // sort transactions
  useEffect(() => {
    if (sortValue.length === 0) {
      setTransactions(state.transaction)
      return;
    }
    let sortedTransactions = transactions
    if (sortValue === 'name-asc') {
      sortedTransactions = sortedTransactions.sort(compareValues('beneficiary_name'))
    }
    if (sortValue === 'name-desc') {
      sortedTransactions = sortedTransactions.sort(compareValues('beneficiary_name', 'desc'))
    }
    if (sortValue === 'newest') {
      sortedTransactions = sortedTransactions.sort(compareValues('created_at', 'desc'))
    }
    if (sortValue === 'oldest') {
      sortedTransactions = sortedTransactions.sort(compareValues('created_at'))
    }
    console.log(sortValue, sortedTransactions)
    setTransactions(sortedTransactions)
  }, [sortValue, transactions])


  console.log('transactions', transactions)

  const formattedAmount = new Intl.NumberFormat('ID').format(totalAmount)
  return (
    <div id="page-transaction-list">
      <div className="container">
        <Header title="Daftar Transaksi" />
        <h2 className="text-greeting">Halo Kak!</h2>
        <p className="text-notice">Kamu telah melakukan transaksi sebesar <span className="amount">Rp{formattedAmount}</span> sejak menggunakan Flip</p>
        <div className="input-container">
          <i className="fa fa-search icon"/>
          <input className="input-field" type="text" value={searchValue} onChange={handleSearchValue} placeholder="Cari nama atau bank"/>
          <select value={sortValue} onChange={handleSortValue} className="select-field">
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

export default Home