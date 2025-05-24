import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setSelectedUser } from "../store/slice/users.slice";

export default function UsersTable() {
  const userData = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  const tableHead = [
    { lable: "Si" },
    { lable: "Full Name" },
    { lable: "Email" },
    { lable: "Location" },
    { lable: "Actions" },
  ];
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 1,
        backgroundColor: "background.default",
        py: 3,
        px: 2,
        border: "none",
        boxShadow: "none",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            {tableHead.map((item,index) => (
              <TableCell key={index} sx={{ fontWeight: 600, textTransform: "uppercase" }}>
                {item.lable}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user, index) => (
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: "none" },
                backgroundColor: index % 2 === 0 ? "background.paper" : "",
                color: "#fff",
              }}
            >
              <TableCell >{index+1}</TableCell>
              <TableCell >{user.fullName}</TableCell>
              <TableCell >{user.email}</TableCell>
              <TableCell >{user.country}</TableCell>
              <TableCell>
                <IconButton onClick={() => dispatch(setSelectedUser(user))}>
                  <EditDocumentIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(deleteUser(user.id))}>
                  <DeleteSweepIcon sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
