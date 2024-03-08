import { useState } from "react";
import "./Form.scss";
import { v4 as uuidv4 } from "uuid";
import Display from "../Display/Display";
import InputField from "./Custom/InputField";
import Button from "@mui/material/Button";

function Form() {
  let [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    id: "",
  });
  let [formList, setFormList] = useState([]);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    let { name, value } = e.target;

    console.log(name, value);
    setFormFields((prev) => {
      return { ...prev, [name]: value };
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let { firstName, lastName, email, phoneNo, street, city, state, pinCode } =
      formFields;

    const newErrors = {};

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNo ||
      !street ||
      !city ||
      !state ||
      !pinCode
    ) {
      Object.keys(formFields).forEach((fieldName) => {
        if (formFields[fieldName].trim() === "") {
          newErrors[fieldName] = `Please fill the required details`;
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      });
    } else {
      setFormList((prev) => {
        let id = uuidv4();
        return [...prev, { ...formFields, id }];
      });
    }
  }

  console.log(errors);
  console.log(formList);
  return (
    <div>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
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
            <Button variant="contained" color="primary" type="submit">
              SUBMIT
            </Button>
          </div>
        </form>
      </div>

      <Display formList={formList} />
    </div>
  );
}

export default Form;
