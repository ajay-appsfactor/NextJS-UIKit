"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { LayoutDashboard, Plus, Smile } from "lucide-react";

const AppSidebar = () => {
  return (
    <aside className="uk-position-fixed uk-padding-small">
      <div className="">
        <Image
          src="/logo1.png"
          alt="logo"
          className=""
          width={200}
          height={70}
          draggable="false"
          priority
        />
      </div>
      <div className="uk-margin-top">
        <ul className="uk-list">
          <li className="">
            <Link href="/dashboard" className="uk-flex uk-flex-middle">
              <LayoutDashboard />
              <span className="uk-margin-small-left">Dashboard</span>
            </Link>
          </li>
          <li className="">
            <Link
              href="/dashboard/customers"
              className="uk-flex uk-flex-middle"
            >
              <Smile />
              <span className="uk-margin-small-left">Customers</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AppSidebar;
