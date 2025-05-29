import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  CircularProgress,
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
import { enqueueSnackbar } from "notistack";
import SelectInputs from "./Inputs/SelectInputs";
import ProfileInputs from "./Inputs/ProfileInputs";

const UserModal = () => {
  //* Hooks States..........
  const isModelOpen = useSelector((state) => state.users.isModel);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  //* FormData there field store value.....
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    description: "",
  });

  // TODO: If user is selected then its values is..............
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        fullName: selectedUser.fullName || "",
        email: selectedUser.email || "",
        country: selectedUser.country || "",
        state: selectedUser.state || "",
        city: selectedUser.city || "",
        description: selectedUser.description || "",
        id: selectedUser.id || "",
      });

      //* Optional: prefill profile picture if available
      if (selectedUser.profilePic) {
        setProfilePicture(selectedUser.profilePic);
      }
    }
  }, [selectedUser]);

  // TODO: When Input value change then run its handler..............
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // TODO: When user change the image fields.............
  const handlerPictureChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfilePicture(file);
      }
    },
    [profilePicture]
  );

  // TODO: When Model form close then run its handler..........
  const handleClose = useCallback(() => {
    dispatch(handlerCloseModel());
  }, [dispatch]);

  // TODO: This function for validate the add user form...........
  const handleValidate = () => {
    if (!formData.fullName) {
      enqueueSnackbar("Fullname fields is required!", { variant: "error" });
      return false;
    }
    if (!formData.email) {
      enqueueSnackbar("Email fields is required!", { variant: "error" });
      return false;
    }
    if (!formData.country) {
      enqueueSnackbar("Country fields is required!", { variant: "error" });
      return false;
    }
    if (!formData.state) {
      enqueueSnackbar("State fields is required!", { variant: "error" });
      return false;
    }
    if (!formData.city) {
      enqueueSnackbar("City fields is required!", { variant: "error" });
      return false;
    }

    return true;
  };

  // TODO: THis Handle submit the user Form  and if selected user then update the user.................
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidate()) return;

    setSubmitLoading(true);
    let uploadedImageUrl = null;

    try {
      // Upload image to Cloudinary if profilePicture exists
      if (profilePicture) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", profilePicture);
        formDataUpload.append("upload_preset", "unsigned_preset");
        formDataUpload.append("cloud_name", "dzdv0wfep");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzdv0wfep/image/upload",
          formDataUpload
        );
        uploadedImageUrl = response.data.secure_url;
      }

      // Final User data object
      const newUserData = {
        ...formData,
        profilePic: uploadedImageUrl,
        id: selectedUser ? formData.id : Date.now().toString(),
      };

      // Dispatch add or update actions
      if (selectedUser) {
        dispatch(updateUser(newUserData));
        enqueueSnackbar("User updated successfully", { variant: "success" });
      } else {
        dispatch(addUser(newUserData));
        enqueueSnackbar("User added successfully", { variant: "success" });
      }

      dispatch(handlerCloseModel());
    } catch (error) {
      enqueueSnackbar(`Submission failed: ${error.message}`, {
        variant: "error",
      });
    } finally {
      setSubmitLoading(false);
    }
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
      <DialogTitle>{selectedUser ? "Update User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {formFields.map((field, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
              {field.type === "file" ? (
                <ProfileInputs
                  profilePicture={profilePicture}
                  handlerPictureChange={handlerPictureChange}
                />
              ) : field.type === "select" ? (
                <SelectInputs
                  field={field}
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
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
                          ? typeof profilePicture === "string"
                            ? profilePicture //* already a URL from selectedUser
                            : URL.createObjectURL(profilePicture)
                          : selectedUser?.profilePic || ""
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
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: "background.primary",
            fontWeight: 600,
            mr:1,
            borderColor: "background.primary",
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "text.primary",
            fontWeight: 600,
            mr:3,
            backgroundColor: "primary.main",
          }}
          disabled={submitLoading}
          startIcon={submitLoading ? <CircularProgress size={20} /> : null}
        >
          {submitLoading
            ? selectedUser
              ? "Updating..."
              : "Submitting..."
            : selectedUser
            ? "Update"
            : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
