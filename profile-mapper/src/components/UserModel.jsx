import React, { useEffect, useRef, useState } from "react";
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
  Box,
  Avatar,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  handlerCloseModel,
  updateUser,
} from "../store/slice/users.slice";
import { formFields } from "../services/formFields";
import { allItemsCenter } from "../../custom-styles";
import axios from "axios";
// import { enqueueSnackbar } from "notistack";

const UserModal = () => {
  const isModelOpen = useSelector((state) => state.users.isModel);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    description: "",
    country: "",
    state: "",
    city: "",
    email: "",
  });

  const handleSetProfilePic = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  // TODO: THis Handle change only file fields................
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  // TODO: THis handler fetch api base on inputs fields...................
  const handleSearchChange = (fieldName) => (value) => {
    setSearchText((prev) => ({ ...prev, [fieldName]: value }));
  };

  // TODO: Fetch COUNTRY data useing axios.......................
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        //* Here manage loading and show message means(error) data..........
        setMsg("...Loading Countries");
        setLoading(true);
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries`
        );
        setCountries(response.data.data.map((item) => item.country));
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
        setMsg("");
      }
    };
    fetchCountryData();
  }, []);

  // TODO: Fetch STATE data if COUNTRY is Slected ...............................
  useEffect(() => {
    if (!formData.country) return;
    const fetchStateData = async () => {
      try {
        //* Here manage loading and show message means(error) data..........
        setMsg("...Loading State");
        setLoading(true);
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          { country: formData.country }
        );

        const statesList =
          response.data?.data?.states?.map((state) => state.name) || [];
        setStates(statesList);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoading(false);
        setMsg("");
      }
    };
    fetchStateData();
  }, [formData.country]);
  useEffect(() => {}, [formData.state]);

  // TODO: Fetch CITY Data base on STATE and COUNTRY.................
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            country: formData.country,
            state: formData.state,
          }
        );

        setCities(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    if (formData.country && formData.state) {
      fetchCityData();
    }
  }, [formData.state, formData.country]);

  // TODO: THis useEffect work only when user is selected then set selected data other wise empty.................
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        ...selectedUser,
      });
    } else {
      setFormData({
        fullName: "",
        description: "",
        country: "",
        state: "",
        city: "",
        email: "",
      });
    }
  }, [selectedUser]);

  // TODO: THis Handle take data like text not photo ..............
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // TODO: THis Handle close the Model Form.................
  const handleClose = () => {
    dispatch(handlerCloseModel());
  };

  // TODO: THis Handle submit the user Form  and if selected user then update the user.................
  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = null;

    //* Upload image to Cloudinary if profilePicture exists...............
    if (profilePicture) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", profilePicture);
      formDataUpload.append("upload_preset", "unsigned_preset");
      formDataUpload.append("cloud_name", "dzdv0wfep");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzdv0wfep/image/upload",
          formDataUpload
        );
        uploadedImageUrl = response.data.secure_url;
      } catch (error) {
        console.log("error in upload Image", error.message);
      }
    }

    //* Now  final data object
    const newUserData = {
      ...formData,
      profilePic: uploadedImageUrl,
      id: selectedUser ? formData.id : Date.now().toString(), //! set id in user object
    };

    //* Dispatch action ...................
    if (selectedUser) {
      dispatch(updateUser(newUserData));
    } else {
      dispatch(addUser(newUserData));
    }

    dispatch(handlerCloseModel());
  };

  console.log(formData);
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
          {formFields.map((field, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={index}>
              {field.type === "file" ? (
                <>
                  <Button
                    variant="outlined"
                    component="div"
                    fullWidth
                    onClick={handleSetProfilePic}
                    sx={{ color: "text.primary", textTransform: "capitalize" }}
                  >
                    {profilePicture?.name || "Upload Profile Picture"}
                    <input
                      type="file"
                      ref={inputRef}
                      name="profilePic"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                </>
              ) : field.type === "select" ? (
                <Autocomplete
                  options={
                    field.name === "country"
                      ? countries
                      : field.name === "state"
                      ? formData.country
                        ? states
                        : []
                      : field.name === "city"
                      ? formData.state
                        ? cities
                        : []
                      : []
                  }
                  value={formData[field.name] || ""}
                  onChange={(e, newValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: newValue,
                      ...(field.name === "country" && { state: "", city: "" }),
                      ...(field.name === "state" && { city: "" }),
                    }));
                  }}
                  onInputChange={(e, value) => {
                    if (e && e.type === "change") {
                      handleSearchChange(field.name)(value);
                    }
                  }}
                  inputValue={
                    field.name === "country"
                      ? formData.country
                        ? formData.country
                        : searchText.country
                      : field.name === "state"
                      ? formData.state
                        ? formData.state
                        : searchText.state
                      : field.name === "city"
                      ? formData.city
                        ? formData.city
                        : searchText.city
                      : ""
                  }
                  loading={loading && field.name === "country"}
                  noOptionsText={
                    field.name === "country"
                      ? loading
                        ? msg
                        : "No matching country"
                      : field.name === "state"
                      ? !formData.country
                        ? "Please select a country first"
                        : "No matching state"
                      : field.name === "city"
                      ? !formData.state
                        ? "Please select a state first"
                        : "No matching city"
                      : "No options"
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={field.label}
                      size="small"
                      fullWidth
                      placeholder={`Search ${field.label}`}
                    />
                  )}
                />
              ) : field.type === "textarea" ||
                field.type === "text" ||
                field.type === "email" ? (
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
              ) : (
                profilePicture && (
                  <Grid
                    size={{ xs: 12, sm: 12, md: 12 }}
                    sx={{ ...allItemsCenter }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        profilePicture
                          ? URL.createObjectURL(profilePicture)
                          : ""
                      }
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </Grid>
                )
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
