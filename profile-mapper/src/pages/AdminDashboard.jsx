import React from "react";
import {
  Typography,
  Box,
  Badge,
  Card,
  Container,
  Stack,
  Button,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { allItemsCenter, allItemsStart, itemSpacebetween } from "../../custom-styles";
import UserModal from "../components/UserModel";
import AddIcon from "@mui/icons-material/Add";
import UsersTable from "../components/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { toggleModel } from "../store/slice/users.slice";

const AdminDashboard = () => {
  const miniLaptop = useMediaQuery("(max-width:1224px)");
  const userData = useSelector((state) => state.users.userData);
  const isModelOpen = useSelector((state) => state.users.isModel);
  const dispatch = useDispatch();

  if (!userData) return;
  return (
    <Stack sx={{ mt: 10,...allItemsCenter }}>
        <Card
          sx={{
            // border: "2px solid blue",
            width: miniLaptop?'100%':"80%",
            mt:10,
            mb:5,
            backgroundColor: "background.default",
          }}
        >
          <Box sx={{backgroundColor:"background.primary", p: 2, ...itemSpacebetween }}>
            <Box sx={{ ...allItemsStart }}>
              <Badge badgeContent={userData.length} sx={{color:"text.optional"}}>
                <SupervisorAccountIcon
                  fontSize="medium"
                  sx={{ color: "text.optional" }}
                />
              </Badge>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, ml: 2, textTransform: "uppercase",color:'text.optional' }}
              >
                All User
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => dispatch(toggleModel())}
              sx={{
                backgroundColor: "custom.buttonBackground",
                fontWeight: 600,
              }}
            >
              Add User
            </Button>
          </Box>

          <CardContent>
            <UsersTable />
          </CardContent>
        </Card>
      {isModelOpen ? <UserModal /> : null}
    </Stack>
  );
};

export default AdminDashboard;
