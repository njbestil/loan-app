import React, { useState } from 'react';
import { Button, Card, Tooltip } from "flowbite-react";
import { HiUserAdd, HiOutlineUser, HiOutlineCash, HiOutlineTable, HiOutlineClipboardList, HiOutlinePencilAlt, HiOutlineDocumentAdd, HiOutlineDocumentSearch } from "react-icons/hi";
import Dashboard from "../../layout/Dashboard";

function Home() {
  // Retrieve the string from localStorage and parse it back into a JSON object
  const storedUser = localStorage.getItem('user');
  var user = {};

  if (storedUser) {
    user = JSON.parse(storedUser);
  } else {
    console.log("No user data found in localStorage.");
  }

  return (
    <>
      <Dashboard>
        <div className="absolute top-0 left-0 right-0 p-4 -z-10">
          <div className="min-h-screen flex items-center justify-center">
            {user.role == "admin" ? (
              <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {[
                  {
                    href: "users",
                    icon: <HiUserAdd className="mx-auto text-5xl" />,
                    label: "MANAGE USERS",
                    tooltip: "Navigate to the user management section to add, edit, or remove user accounts"
                  },
                  {
                    href: "/creditscoredata/application",
                    icon: <HiOutlineCash className="mx-auto text-5xl" />,
                    label: "MANAGE CREDIT SCORE DATA",
                    tooltip: "Manage data used to assess applicants' creditworthiness"
                  },
                  {
                    href: "/models",
                    icon: <HiOutlineTable className="mx-auto text-5xl" />,
                    label: "MANAGE MODELS",
                    tooltip: "Define structured models to score and evaluate credit risk"
                  },
                  {
                    href: "/creditscore/preevaluation",
                    icon: <HiOutlineClipboardList className="mx-auto text-5xl" />,
                    label: "CREDIT SCORE EVALUATION",
                    tooltip: "Evaluate applicant creditworthiness based on scoring criteria"
                  },
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <Card
                      key={index}
                      href={item.href}
                      className="bg-green-800 hover:bg-green-900 text-white flex flex-col justify-center items-center min-h-[180px] rounded-lg shadow"
                    >
                      <div className="text-center space-y-2">
                        {item.icon}
                        <p className="font-semibold">{item.label}</p>
                      </div>
                    </Card>

                    {/* Tooltip container */}
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max z-10 pointer-events-none">
                      {/* Tooltip box */}
                      <div className="px-3 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.tooltip || "Tooltip info"}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="w-2 h-2 bg-black rotate-45 absolute top-full left-1/2 -translate-x-1/2 mt-[-4px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                
                ))}
              </div>

            ) : (
              <div className="grid grid-cols-1 px-5 sm:grid-cols-2 sm:px-5 lg:grid-cols-2 gap-4 max-w-2xl">
                <Card href="/profile" className="max-w bg-green-800 hover:bg-green-900 text-white">
                  <div className="items-center grid gap-2">
                    <HiOutlineUser className='mx-auto text-5xl' />
                    <p className="text-center font-semibold">
                      PROFILE
                    </p>
                  </div>
                </Card>
                <Card href="/creditscoredata/application/user" className="max-w bg-green-800 hover:bg-green-900 text-white">
                  <div className="items-center grid gap-2">
                    <HiOutlineClipboardList className='mx-auto text-5xl' />
                    <p className="text-center font-semibold">
                      CREDIT SCORE EVALUATION
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </Dashboard>
    </>
  );
}

export default Home;
