import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import countryData from "../../../countries.json";
import stateData from "../../../states.json";
import cityData from "../../../cities.json";

const SelectInputs = ({ field, formData, handleChange }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [value, setValue] = useState(formData[field.name] || null);

  useEffect(() => {
    setValue(formData[field.name] || null);
  }, [formData, field.name]);

  // TODO: Load country options....................
  useEffect(() => {
    if (field.name === "country") {
      const countries = countryData.map((item) => item.name);
      setCountryOptions(countries);
    }
  }, [field.name]);

  // TODO: Load state options when country changes and field is "state"..................
  useEffect(() => {
    if (field.name === "state" && formData.country) {
      const filteredStates = stateData
        .filter((item) => item.country_name === formData.country)
        .map((state) => state.name);
      setStateOptions(filteredStates);
    }
  }, [formData.country, field.name]);

  // TODO: Load City options when State changes ..................
  useEffect(() => {
    if (field.name === "city" && formData.country && formData.state) {
      const filteredCity = cityData
        .filter((item) => item.state_name === formData.state)
        .map((city) => city.name);
      setCityOptions(filteredCity);
    }
  }, [formData.state, field.name]);

  const handleSelectChange = (event, newValue) => {
  setValue(newValue);

  if (field.name === "country") {
    if (!newValue) {
      //* Clear country, state, city when country cleared
      handleChange({ target: { name: "country", value: "" } });
      handleChange({ target: { name: "state", value: "" } });
      handleChange({ target: { name: "city", value: "" } });
      setStateOptions([]);
      setCityOptions([]);
      return;
    }
  }

  if (field.name === "state") {
    if (!newValue) {
      //* Clear state and city when state cleared
      handleChange({ target: { name: "state", value: "" } });
      handleChange({ target: { name: "city", value: "" } });
      setCityOptions([]);
      return;
    }
  }

  if (field.name === "city") {
    if (!newValue) {
      //* Clear city when city cleared
      handleChange({ target: { name: "city", value: "" } });
      return;
    }
  }

  // Normal set value for the current field
  handleChange({
    target: {
      name: field.name,
      value: newValue || "",
    },
  });
};


  return (
    <Autocomplete
      fullWidth
      size="small"
      options={
        field.name === "country"
          ? countryOptions
          : field.name === "state"
          ? stateOptions
          : cityOptions
      }
      value={value}
      onChange={handleSelectChange}
      renderInput={(params) => (
        <TextField {...params} label={field.label} name={field.name} />
      )}
      disabled={field.name === "state" && !formData.country || field.name === "city" && !formData.state}
    />
  );
};

export default SelectInputs;
