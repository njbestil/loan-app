import Dashboard from "../../layout/Dashboard";
import { HiOfficeBuilding } from "react-icons/hi";

export default function Contact() {
  const contactInfo = [
    {
      title: "Head Office",
      address: "Rizal St., Poblacion 1\nHindang, Leyte",
      tel: "053 - 530 0429",
      email: "rbhindang_main@yahoo.com",
    },
    {
      title: "Inopacan Branch",
      address: "San Roque St., Brgy. Tinago\nInopacan, Leyte",
      tel: "053 – 565 0053",
      email: "inopbranch_rbh@yahoo.com.ph",
    },
    {
      title: "Sogod Branch",
      address: "Rizal St. Brgy. Zone 4\nSogod, Southern Leyte",
      tel: "053 – 577 9077",
      email: "sogbr_rbhindang@yahoo.com.ph",
    },
    {
      title: "Bato Branch",
      address: "Rizal St. Brgy Tinago\nBato, Leyte",
      tel: "053 – 568 0160",
      email: "batobr_rbhindang@yahoo.com.ph",
    },
    {
      title: "Hilongos Branch Lite Unit",
      address: "Public Market\nHilongos, Leyte",
      tel: "053-336 3824",
      email: "hilbr_rbhindang@yahoo.com.ph",
    },
    {
      title: "Baybay Branch Lite Unit",
      address: "149 C A. Bonifacio St., Zone 11\nBaybay City, Leyte",
      tel: "053-563 0574",
      email: "baybay_rbhindang@yahoo.com",
    },
  ];

  return (
    <Dashboard>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
          Contact Us
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {contactInfo.map((branch, idx) => (
            <div
              key={idx}
              className="border border-gray-200 shadow-md rounded-xl p-6 bg-white hover:shadow-lg transition duration-200"
            >
              <h2 className="flex items-center text-2xl font-semibold text-[#ffb001] mb-2">
                <HiOfficeBuilding className="mr-2 w-6 h-6 text-[#ffb001]" />
                {branch.title}
              </h2>
              <p className="whitespace-pre-line text-gray-700 mb-1">{branch.address}</p>
              <p className="text-gray-700 mb-1">Tel No.: {branch.tel}</p>
              <p>
                Email:{" "}
                <a href={`mailto:${branch.email}`} className="text-[#ffb001] underline">
                  {branch.email}
                </a>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-2 text-center text-gray-700">
          <p>
            Official Email: <a href="mailto:rbhindangleyte@yahoo.com.ph" className="text-[#ffb001] underline">rbhindangleyte@yahoo.com.ph</a>
          </p>
          <p>
            Client Care: <a href="mailto:clientcare@rbhindangleyte.com" className="text-[#ffb001] underline">clientcare@rbhindangleyte.com</a>
          </p>
          <p>Contact No.: 0917 314 8138</p>
        </div>

        <div className="mt-10 text-sm text-center text-gray-600">
          Rural Bank of Hindang (Leyte), Inc. is regulated by the{" "}
          <a
            href="https://www.bsp.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffb001] underline"
          >
            Bangko Sentral ng Pilipinas (BSP)
          </a>
        </div>
      </div>
    </Dashboard>
  );
}
