import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import Loading from 'components/Loading';
import Transaction from 'components/Transaction';
import { compareValues } from 'utils/compareValues';
import { TransactionContext } from 'context/TransactionContext';

const Home = () => {
  const [state, dispatch] = useContext(TransactionContext);
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [loading, setLoading] = useState(false);
  
  // initialize data
  const fetchData = () => {
    axios('/frontend-test')
      .then((res) => {
        const data = Object.values(res.data);
        const modifiedTransaction = data.map((v) => ({ ...v, created_at: new Date(v.created_at) }));
        dispatch({ type: 'FETCH', payload: modifiedTransaction });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    document.title = 'Transaction | Flip Frontend Developer Recruitment Test';
    setLoading(true);
    if (state.transaction.length === 0) {
      fetchData();
    }
  }, []);

  // set state transactions
  useEffect(() => {
    if (state.transaction.length > 0) {
      setTransactions(state.transaction);
      const total = state.transaction.map((item) => item.amount).reduce((prev, next) => prev + next);
      setTotalAmount(total);
      setLoading(false);
    }
  }, [state]);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };  

  // filtering transactions
  useEffect(() => {
    const input = searchValue.toLowerCase();
    const filteredTransactions = state.transaction.filter((v) => (
      v.sender_bank.toLowerCase().indexOf(input) !== -1 
        || v.beneficiary_name.toLowerCase().indexOf(input) !== -1
        || v.beneficiary_bank.toLowerCase().indexOf(input) !== -1
    ));
    setTransactions(filteredTransactions);
  }, [searchValue, state.transaction]);

  const handleSortValue = (e) => {
    setSortValue(e.target.value);
  };

  // sorting transactions
  let sortedTransactions = transactions;
  if (sortValue === 'name-asc') {
    sortedTransactions = transactions.sort(compareValues('beneficiary_name'));
  }
  if (sortValue === 'name-desc') {
    sortedTransactions = transactions.sort(compareValues('beneficiary_name', 'desc'));
  }
  if (sortValue === 'newest') {
    sortedTransactions = transactions.sort(compareValues('created_at', 'desc'));
  }
  if (sortValue === 'oldest') {
    sortedTransactions = transactions.sort(compareValues('created_at'));
  }
  return (
    <div id="page-transaction-list">
      <div className="container">
        <Header title="Daftar Transaksi" />
        <h2 className="text-greeting">Halo Kak!</h2>
        <p className="text-notice">
          Kamu telah melakukan transaksi sebesar <span className="amount">Rp{new Intl.NumberFormat('ID').format(totalAmount)}</span> sejak menggunakan Flip
        </p>
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
            {sortedTransactions.length > 0 ? (
              <Transaction transactions={sortedTransactions}/>
            ) : (
              <span>Data tidak ditemukan!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
