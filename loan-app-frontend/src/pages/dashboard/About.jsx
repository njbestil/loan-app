import { Card, Timeline } from "flowbite-react";
import Dashboard from "../../layout/Dashboard";

function About() {
  const highlights = [
    {
      year: "2018",
      details: [
        "Rural Bank of Hindang celebrates its 40th anniversary; August 14, 2018",
        "40 years of achievements...",
        "40 years of providing financial solutions .....",
        "40 years of experience ....",
        "40 years of quality Banking Service....",
        "Our products and Solutions for your financial needs: For all Times...",
        "Rural Bank of Hindang... We listen. We answer. We serve.",
        "RB Hindang shares best practices during RBAP 61st Charter Anniversary Symposium (Oct 22-23, 2018)"
      ]
    },
    {
      year: "2016",
      details: ["Installation of the new President and CEO - Mr. Reynaldo A. Dayola, CPA, MM"]
    },
    {
      year: "2015",
      details: [
        "Opening of RB Hindang – Baybay Extension Office in Bonifacio St. Baybay City, Leyte",
        "Launching of ATM Savings Accounts",
        "Launching of New Services – Air Ticketing (PAL, Cebu Pacific, Air Asia, Tiger Asia)"
      ]
    },
    {
      year: "2014",
      details: [
        "RB Hindang mourns Dr. Emirito Jesus Delalamon (the late President)",
        "Launching of the POS services",
        "Renovation of the Hilongos Extension Office"
      ]
    },
    {
      year: "2013",
      details: ["Yolanda hits Region 8 - one of the strongest tropical cyclones ever recorded"]
    },
    {
      year: "2012",
      details: ["RB Hindang inspires other Rural Banks during RBAP convention held in Manila"]
    },
    {
      year: "2010",
      details: [
        "Launching of Automatic Teller Machine (ATM) in Inopacan Branch",
        "Opening of RB Hindang – Hilongos Extension office in public market Hilongos, Leyte"
      ]
    },
    {
      year: "2009",
      details: [
        "ATM started its operation at Head Office with the help of INFOSERVE INC.",
        "Launching of Western Union Money Transfer services",
        "Authorized collecting agent for SSS members",
        "Awarded as Most Outstanding Rural Bank – Region 8 for CY 2008 by Land Bank of the Philippines"
      ]
    },
    {
      year: "2008",
      details: [
        "Opening of RB Hindang – Bato Branch, Bato, Leyte",
        "RB Hindang – Sogod Branch transferred to its new building in Sogod, Southern Leyte"
      ]
    },
    {
      year: "2007",
      details: ["Renovation of the Head Office"]
    },
    {
      year: "2004",
      details: ["Awarded as No. 14 Top Tax Payer in the Region, RDO No 0089"]
    },
    {
      year: "2003",
      details: ["Bank celebrates its 25th year in the banking industry"]
    },
    {
      year: "2002",
      details: ["Launching of Microfinance products"]
    },
    {
      year: "1999",
      details: ["Awarded by Land Bank of the Philippines as Top Availers of LBP’s Rediscounting Program"]
    },
    {
      year: "1998",
      details: ["Opening of RB Hindang – Sogod Branch, Southern Leyte"]
    },
    {
      year: "1997",
      details: ["Opening of RB Hindang – Inopacan Branch, Leyte"]
    },
    {
      year: "1996",
      details: ["Approved by the Central Bank of Philippines for branching"]
    },
    {
      year: "1995",
      details: [
        "First among Countryside Financial Institutions to receive ABOVE ACCEPTABLE rating by LandBank of the Philippines"
      ]
    },
    {
      year: "1986",
      details: [
        "Rediscounting windows of BSP and LBP opened, helping to increase loan portfolio"
      ]
    },
    {
      year: "1985",
      details: [
        "Became a member of Rural Bankers Association of the Philippines",
        "Loan portfolio increased while keeping past due rates above industry standards"
      ]
    },
    {
      year: "1983",
      details: ["New Management under Mrs. Anacleta D. Aboyme"]
    },
    {
      year: "1978",
      details: [
        "Officially incorporated on June 25, 1978 under SEC No 80421",
        "Began operations on August 14, 1978"
      ]
    }
  ];

  return (
    <>
      <Dashboard>
        <div>
          <div className="w-full ">

            <Card>
              <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold mb-4">About Rural Bank of Hindang (Leyte), Inc.</h1>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Rural Bank of Hindang (Leyte), Inc. was officially incorporated on June 25, 1978 under SEC NO. 80421 and granted by the Central Bank of Philippines the Certificate of Authority to accept deposits on August 11, 1978 and in August 14, 1978 full operations of the bank has begun. The bank was founded by Dr. Soriano V. Abrasaldo, Mrs. Expectacion V. Mata, Mrs. Ceferina A. Dayola, Mrs. Raymunda Delalamon, Mrs. Lourdes Padin and Atty. Herminio Villaflor and officially resides at Rizal St., Poblacion 1, Hindang, Leyte, Philippines. Today, Rural Bank of Hindang (Leyte), Inc. operates in neighboring towns in Inopacan, Hilongos, Bato, Sogod and Baybay City.
                </p>

                <h2 className="text-xl font-semibold mb-4">The Highlights of Operations (1978-2018):</h2>

                <Timeline>
                  {highlights.map((item, idx) => (
                    <Timeline.Item key={idx}>
                      <Timeline.Point />
                      <Timeline.Content>
                        <Timeline.Time>{item.year}</Timeline.Time>
                        <Timeline.Body>
                          <ul className="list-disc ml-5 space-y-1">
                            {item.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        </Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Card>

          </div>
        </div>
      </Dashboard >
    </>

  );
}

export default About;
