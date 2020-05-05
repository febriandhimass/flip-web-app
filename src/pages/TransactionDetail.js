import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Loading from 'components/Loading';
import { Link } from 'react-router-dom';

const TransactionDetail = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  // fetch data by id
  const fetchData = (id) => {
    const transactions = JSON.parse(window.localStorage.transaction);
    const transaction = transactions.filter((v) => v.id === id);
    setData(transaction);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Transaction | Flip Frontend Developer Recruitment Test';
    setLoading(true);
    fetchData(props.match.params.id);
  }, [props.match.params.id]);

  const optionDate = { year: 'numeric', month: 'long', day: 'numeric' };
 
  return (
    <div id="page-transaction-detail">
      <div className="container">
        <Header title="Detail Transaksi" />
        {loading ? (
          <Loading/>
        ) : (
          data.length > 0 ? (
          <React.Fragment>
            <div className="id-container">
              <div className="left-side">
                ID TRANSAKSI: {data[0].id}
              </div>
              <div className="right-side">
                <span className={data[0].status === 'SUCCESS' ? 'status success' : 'status pending'}>
                  {data[0].status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
                </span>
              </div>
            </div>
            <div className="detail-container">
              <div className="left-side">
                <i className="far fa-file-alt icon"/>
              </div>
              <div className="right-side">
                <p className="item-field">
                  <strong>PENGIRIM</strong><br/>{data[0].sender_bank.toUpperCase()}
                </p>
                <p className="item-field">
                  <strong>PENERIMA</strong><br/>
                  {data[0].beneficiary_bank.toUpperCase()}<br/>
                  {data[0].account_number}<br/>
                  {data[0].beneficiary_name}
                </p>
                <p className="item-field">
                  <strong>NOMINAL</strong><br/>
                  Rp{new Intl.NumberFormat('ID').format(data[0].amount)}<br/>
                  <strong>Kode: </strong>{data[0].unique_code}
                </p>
                <p className="item-field">
                  <strong>CATATAN</strong><br/>{data[0].remark}
                </p>
                <p className="item-field">
                  <strong>WAKTU DIBUAT</strong><br/>{new Date(data[0].created_at).toLocaleDateString('ID', optionDate)}
                </p>
              </div>
            </div>
          </React.Fragment>
          ) : (
            <p>Data tidak ditemukan!</p>
          )
        )}
        <br/>
        <Link to="/" className="btn-back">
          Kembali
        </Link>
      </div>      
    </div>
  );
};

export default TransactionDetail;
