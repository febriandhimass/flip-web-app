import React from 'react';
import {Link, Redirect} from 'react-router-dom';

const Transaction = (props) => {

  return (
    <div>
      <ul className="transaction-list">
        {props.transactions.map((v, k) => (
          <li key={k} className={v.status === "SUCCESS" ? "transaction-item success" : "transaction-item pending"}>
            <Link to={`/transaction/${v.id}`} className="item-link">
              <div className="left-side">
                <p className="item-field">
                  {v.sender_bank.toUpperCase()}
                  &nbsp;<i className="fas fa-long-arrow-alt-right"/>&nbsp;
                  {v.beneficiary_bank.toUpperCase()}
                </p>
                <p className="item-field">{v.beneficiary_name}</p>
                <p className="item-field">
                  Rp{new Intl.NumberFormat('ID').format(v.amount)}
                  &nbsp;<i className="fas fa-circle" style={{ fontSize: '6pt' }}/>&nbsp;
                  {v.created_at}
                </p>
              </div>
              <div className="right-side">
                <span className={v.status === "SUCCESS" ? "status success" : "status pending"}>
                  {v.status === "SUCCESS" ? "Berhasil" : "Pengecekan"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Transaction;