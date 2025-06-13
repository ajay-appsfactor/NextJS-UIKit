import CustomerList from "@/components/CustomerList";
import Link from "next/link";
import React from "react";

const CustomerPage = () => {
  return (
    <div className="uk-padding-small">
      <div className="uk-flex">
        <h5 className='className="uk-h4 uk-text-bold'>Customers</h5>
        <span>
          <Link
            href="/dashboard/customers/create-customer"
            className="uk-margin-large-left"
          >
            ADD NEW CUSTOMER
          </Link>
        </span>
      </div>
      <div>
        <CustomerList />
      </div>
    </div>
  );
};

export default CustomerPage;
