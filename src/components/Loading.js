import React from 'react';

const Page = ({ text = true }) => (
  <React.Fragment>
    {text ? (<span className="loading-text">loading...</span>) : null}
  </React.Fragment>
);

export default Page;
