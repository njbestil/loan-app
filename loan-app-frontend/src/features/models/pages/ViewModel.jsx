import { Spinner, Accordion, Breadcrumb, Card, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import Dashboard from "../../../layout/Dashboard";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

export default function ViewModel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const jsonString = localStorage.getItem("model_detail");
   
    if (jsonString) {
      const parsed = JSON.parse(jsonString);
      parsed.passing_score = JSON.parse(parsed.passing_score);
      parsed.score_form = JSON.parse(parsed.score_form);
      setData(parsed);
      console.log(parsed)
    }
  }, []);

  if (!data) {
    return (
       <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" />
          <span className="ml-2 text-gray-700 dark:text-white">Please wait...</span>
       </div>
    );
 }

  const showMonthlyInterest = data.passing_score.some(score => score.monthly_interest_rate);
  const showValue = data.passing_score.some(score => score.value);

  return (
    <>
      <Dashboard>
        <div className="max-w p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className='mb-5'>
            <h5 className="mb-2 uppercase text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Model Details</h5>
            <Breadcrumb aria-label="Default breadcrumb example">
              <Breadcrumb.Item href="/home" icon={HiHome}>Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/models">Manage Models</Breadcrumb.Item>
              <Breadcrumb.Item>Model Details</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="mt-8">
            <div className="p-6 space-y-6">
              <Card>
                <h1 className="text-2xl font-bold m-0">{data.name}</h1>
                <span className="text-gray-500">Created: {formatDateTime(data.created_at)}</span>

                <h2 className="mt-4 text-xl font-semibold">Passing Score</h2>
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell >Definition</Table.HeadCell>
                    <Table.HeadCell className="text-center">From</Table.HeadCell>
                    <Table.HeadCell className="text-center">To</Table.HeadCell>
                    {showValue && <Table.HeadCell className="text-center">Value</Table.HeadCell>}
                    {showMonthlyInterest && <Table.HeadCell className="text-center">Monthly Interest Rate</Table.HeadCell>}
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {data.passing_score.map((score, idx) => (
                      <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>{score.definition}</Table.Cell>
                        <Table.Cell className="text-center">{score.from}</Table.Cell>
                        <Table.Cell className="text-center">{score.to}</Table.Cell>
                        {showValue && (
                          <Table.Cell className="text-center">{score.value}</Table.Cell>
                        )}
                        {showMonthlyInterest && (
                          <Table.Cell className="text-center">
                            {score.monthly_interest_rate ? score.monthly_interest_rate : "-"}
                          </Table.Cell>
                        )}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Card>

              <Accordion>
                {data.score_form.map((category, idx) => (
                  <Accordion.Panel key={idx}>
                    <Accordion.Title>{category.category}</Accordion.Title>
                    <Accordion.Content>
                      {category.criteria.map((crit) => (
                        <div key={crit.id} className="mb-4">
                          <h3 className="font-medium mb-1">{crit.description}</h3>
                          <Table hoverable>
                            <Table.Head>
                              <Table.HeadCell>Label</Table.HeadCell>
                              <Table.HeadCell className="w-32 text-center">Score</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                              {crit.scoring.map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                  <Table.Cell>{item.label}</Table.Cell>
                                  <Table.Cell className="w-32 text-center">{item.score}</Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                          <hr className="mb-8"/>
                        </div>
                        
                      ))}
                    </Accordion.Content>
                  </Accordion.Panel>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </Dashboard>
    </>

  );
}
