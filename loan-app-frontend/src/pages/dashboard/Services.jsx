import React from "react";
import { List, Card } from "flowbite-react";
import { HiOutlineCash, HiOutlineClipboardList, HiOutlineUser } from "react-icons/hi";
import Dashboard from "../../layout/Dashboard";

const iconsMap = {
  Loans: <HiOutlineCash className="w-6 h-6 text-white" />,
  Deposit: <HiOutlineClipboardList className="w-6 h-6 text-white" />,
  Services: <HiOutlineUser className="w-6 h-6 text-white" />,
};

function Services() {
  const data = {
    Loans: [
      "Agrarian Reform Loan",
      "Other Agricultural Loan",
      "Palay Trading Loan",
      "Car Financing Loan",
      "Salary Agency Loan",
      "Teacher’s Salary Loan",
      "Teacher’s Enhancement Loan",
      "Small & Medium Scale Enterprise Loan",
      "Pensionado Loan",
      "OFW Allotment Loan",
      "Barangay Loan",
      "Micro-Scale Enterprise Loan",
      "Car Loan",
    ],
    Deposit: [
      "Regular Savings Deposit",
      "Certificate of Time Deposit",
      "Premium Savings Deposit",
      "ATM Savings Deposit",
      "Basic Savings Deposit",
    ],
    Services: [
      "ATM Services",
      "Fund Transfers",
      "Money Transfer Services thru Western Union",
      "Authorized Collecting Agent for SSS members",
      "POS (Point of Sale) Transactions",
      "TrueMoney",
    ],
  };

  return (
    <Dashboard>
      <div className="max-w-8xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
          Products and Services
        </h1>
        <div className="grid gap-10 md:grid-cols-3">
          {Object.entries(data).map(([section, items], idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-6 flex flex-col items-start"
            >
              {/* Header - always top */}
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="p-3 rounded-lg text-white flex items-center justify-center"
                  style={{ backgroundColor: "#ffb001" }}  // solid color
                >
                  {iconsMap[section]}
                </div>
                <h2 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-white uppercase">
                  {section}
                </h2>
              </div>

              {/* Content list */}
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 w-full pl-4">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </div>
    </Dashboard>
  );
}

export default Services;
