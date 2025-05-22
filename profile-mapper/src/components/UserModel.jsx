import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  handlerCloseModel,
  updateUser,
} from "../store/slice/users.slice";
import { formFields } from "../services/formFields";

const UserModal = () => {
  const isModelOpen = useSelector((state) => state.users.isModel);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    profilePic: null,
    description: "",
    country: "",
    state: "",
    city: "",
    email: "",
  });

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data.map((c) => c.country));
      });
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: formData.country }),
      })
        .then((res) => res.json())
        .then((data) => {
          setStates(data.data?.states?.map((s) => s.name) || []);
          setCities([]);
          setFormData((prev) => ({
            ...prev,
            state: "",
            city: "",
          }));
        });
    } else {
      setStates([]);
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: formData.country,
          state: formData.state,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCities(data.data || []);
          setFormData((prev) => ({ ...prev, city: "" }));
        });
    } else {
      setCities([]);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  }, [formData.state, formData.country]);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        ...selectedUser,
        profilePic: null, // Reset file input
      });
    } else {
      setFormData({
        fullName: "",
        profilePic: null,
        description: "",
        country: "",
        state: "",
        city: "",
        email: "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleClose = () => {
    dispatch(handlerCloseModel());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(updateUser(formData));
    } else {
      dispatch(addUser({ ...formData, id: Date.now().toString() }));
    }
    dispatch(handlerCloseModel());
  };

  return (
    <Dialog
      open={isModelOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          {formFields.map((field) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={field.name}>
              {field.type === "file" ? (
                <>
                  <Button variant="outlined" component="label" fullWidth>
                    {formData.profilePic?.name || "Upload Profile Pic"}
                    <input
                      type="file"
                      name={field.name}
                      hidden
                      onChange={handleChange}
                    />
                  </Button>
                  {formData.profilePic && (
                    <small style={{ display: "block", marginTop: 5 }}>
                      {formData.profilePic.name}
                    </small>
                  )}
                </>
              ) : field.type === "select" ? (
                <FormControl fullWidth size="small">
                  <InputLabel id={`${field.name}-label`}>
                    {field.label}
                  </InputLabel>
                  <Select
                    labelId={`${field.name}-label`}
                    name={field.name}
                    value={formData[field.name] || ""}
                    label={field.label}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {(field.name === "country"
                      ? countries
                      : field.name === "state"
                      ? states
                      : field.name === "city"
                      ? cities
                      : []
                    ).map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  name={field.name}
                  label={field.label}
                  type={field.type === "textarea" ? "text" : field.type}
                  multiline={field.multiline || false}
                  rows={field.rows || 1}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {selectedUser ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
