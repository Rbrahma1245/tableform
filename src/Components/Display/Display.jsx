import axios from "axios";
import { isObjectEmpty } from "../../../Utils/ObjectUtils";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <Button
          style={{ width: "100%" }}
          variant="outlined"
          color="error"
          type="button"
          onClick={(e) => handleDeleteClick({ row, e })}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const handleRowClick = (row) => {
    setFormFields(row.original);
    console.log(row.original);
  };

  const handleDeleteClick = async ({ row, e }) => {
    e.stopPropagation();
    console.log(row);
    let deleteId = row._original.id;
    await axios.delete(`http://localhost:3001/formList/${deleteId}`);
    console.log("Data deleted:", row._original.id);
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
