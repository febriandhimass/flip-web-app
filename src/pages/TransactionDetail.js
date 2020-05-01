import React, { useEffect } from 'react'
import axios from 'axios'
import Header from 'components/Header';
import Loading from 'components/Loading'
import { Link } from 'react-router-dom';

class TransactionDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
  }
  componentDidMount() {
    document.title = "Transaction | Flip Frontend Developer Recruitment Test"
    this.fetchData()
  }

  fetchData() {
    const id = this.props.match.params.id
    this.setState({ loading: true }, () => {
      axios('/frontend-test')
        .then(res => {
          const transactions = Object.values(res.data)
          console.log(transactions)
          // const data = transactions.find(v => v.id === id)
          this.setState({ data: transactions, loading: false })
        })
        .catch(() => this.setState({ loading: false }))
    })
  }

  render() {
    console.log(this.props.match.params.id)
    const { data, loading } = this.state
    console.log(data)
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
                  <span className={data[0].status === "SUCCESS" ? "status success" : "status pending"}>
                    {data[0].status === "SUCCESS" ? "Berhasil" : "Pengecekan"}
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
                    <strong>WAKTU DIBUAT</strong><br/>{data[0].created_at}
                  </p>
                </div>
              </div>
            </React.Fragment>
            ) : (
              <span>Data tidak ditemukan!</span>
            )
          )}
          <Link to="/" className="btn-back">
            Kembali
          </Link>
        </div>      
      </div>
    )
  }
}

export default TransactionDetail