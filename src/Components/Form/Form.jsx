import { useEffect, useState } from "react";
import "./Form.scss";
import { v4 as uuidv4 } from "uuid";
import Display from "../Display/Display";
import InputField from "./Custom/InputField";
import Button from "@mui/material/Button";
import { areAllValuesEmpty } from "../../../Utils/ObjectUtils";
import axios from "axios";

function Form() {
  const initialFormFields = {
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    id: "",
  };

  let [formFields, setFormFields] = useState(initialFormFields);
  let [formList, setFormList] = useState([]);
  let [errors, setErrors] = useState({});

  function handleChange(e) {
    let { name, value } = e.target;

    setFormFields((prev) => {
      return { ...prev, [name]: value };
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (areAllValuesEmpty(formFields)) {
      Object.keys(formFields).forEach((fieldName) => {
        if (formFields[fieldName] === "") {
          newErrors[fieldName] = `Please fill the required details`;
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      });
    } else {
      if (formFields.id) {
        await axios.put(
          `http://localhost:3001/formList/${formFields.id}`,
          formFields
        );

        setFormFields(initialFormFields);
      } else {
        let id = uuidv4();
        let obj = { ...formFields, id };

        const { data } = await axios.post(
          "http://localhost:3001/formList",
          obj
        );
        console.log("Data submitted:", data);
        setFormFields(initialFormFields);
      }
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/formList");
      setFormList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [formFields, formList]);

  return (
    <div>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>SIGNUP FORM</h3>
          <div style={{ display: "flex" }}>
            <div className="input-container">
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                value={formFields.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                // helperText={errors.firstName}
              />
            </div>
            <div className="input-container">
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                value={formFields.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                // helperText={errors.lastName}
              />
            </div>
          </div>

          <div className="input-container">
            <InputField
              label="Phone Number"
              type="number"
              name="phoneNo"
              value={formFields.phoneNo}
              onChange={handleChange}
              error={!!errors.phoneNo}
              // helperText={errors.phoneNo}
            />
          </div>
          <div className="input-container">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formFields.email}
              onChange={handleChange}
              error={!!errors.email}
              // helperText={errors.email}
            />
          </div>

          <div className="input-container">
            <InputField
              label="Street"
              type="text"
              name="street"
              value={formFields.street}
              onChange={handleChange}
              error={!!errors.street}
              // helperText={errors.street}
            />
          </div>

          <div style={{ display: "flex" }}>
            <div className="input-container">
              <InputField
                label="City"
                type="text"
                name="city"
                value={formFields.city}
                onChange={handleChange}
                error={!!errors.city}
                // helperText={errors.city}
              />
            </div>
            <div className="input-container">
              <InputField
                label="State"
                type="text"
                name="state"
                value={formFields.state}
                onChange={handleChange}
                error={!!errors.state}
                // helperText={errors.state}
              />
            </div>
          </div>

          <div className="input-container">
            <InputField
              label="Postal/ Zip code"
              type="number"
              name="pinCode"
              value={formFields.pinCode}
              onChange={handleChange}
              error={!!errors.pinCode}
              // helperText={errors.pinCode}
            />
          </div>
          <div className="btn-box">
            <Button
              variant="contained"
              color={formFields.id ? "secondary" : "primary"}
              type="submit"
            >
              {formFields.id ? "UPDATE" : "SUBMIT"}
            </Button>
          </div>
        </form>
      </div>

      <Display formList={formList} setFormFields={setFormFields} />
    </div>
  );
}

export default Form;
