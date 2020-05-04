import React from 'react';
import { Link } from 'react-router-dom';

const Transaction = (props) => {
  const optionDate = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div>
      <ul className="transaction-list">
        {/* list of transaction item */}
        {props.transactions.map((v, k) => (
          <li key={k} className={v.status === 'SUCCESS' ? 'transaction-item success' : 'transaction-item pending'}>
            {/* click link to detail */}
            <Link to={`/transaction/${v.id}`} className="item-link">
              <div className="left-side">
                {/* transaction item bank */}
                <p className="item-field">
                  {v.sender_bank.toUpperCase()}
                  &nbsp;<i className="fas fa-long-arrow-alt-right"/>&nbsp;
                  {v.beneficiary_bank.toUpperCase()}
                </p>
                {/* transaction item name */}
                <p className="item-field">{v.beneficiary_name}</p>
                {/* transaction item amount */}
                <p className="item-field">
                  Rp{new Intl.NumberFormat('ID').format(v.amount)}
                  &nbsp;<i className="fas fa-circle" style={{ fontSize: '6pt' }}/>&nbsp;
                  {new Date(v.created_at).toLocaleDateString('ID', optionDate)}
                </p>
              </div>
              <div className="right-side">
                {/* transaction item status */}
                <span className={v.status === 'SUCCESS' ? 'status success' : 'status pending'}>
                  {v.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transaction;
