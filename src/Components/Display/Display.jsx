import { isObjectEmpty } from "../../../Utils/ObjectUtils";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

function Display({ formList, setFormFields }) {
  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone number",
      accessor: "phoneNo",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Street",
      accessor: "street",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "State",
      accessor: "state",
    },
    {
      Header: "Zip Code",
      accessor: "pinCode",
    },
  ];

  const handleRowClick = (row) => {
    setFormFields(row.original);
    console.log(row.original);
  };

  return (
    <div style={{ height: "50vh", textAlign: "center", marginTop: 50 }}>
      {isObjectEmpty(formList) ? (
        "No data Found..."
      ) : (
        <ReactTable
          data={formList}
          columns={columns}
          defaultPageSize={10}
          minRows={5}
          getTrProps={(state, rowInfo) => ({
            onClick: () => handleRowClick(rowInfo),
          })}
        />
      )}
    </div>
  );
}

export default Display;
