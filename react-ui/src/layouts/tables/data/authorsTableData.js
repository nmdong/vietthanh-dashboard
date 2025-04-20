/* eslint-disable react/prop-types */
import React from "react";
// Viet Thanh Plastic components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Custom styles for DashboardNavbar
import styles from "examples/Navbars/DashboardNavbar/styles";

// Viet Thanh Plastic context
import { useSoftUIController } from "context";

// icons - https://fonts.google.com/icons
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";


function Author({ image, name, email }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox mr={2}>
        <SuiAvatar src={image} alt={name} size="small" variant="rounded" />
      </SuiBox>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
        <SuiTypography variant="caption" textColor="secondary">
          {email}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function Function({ job, org }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" textColor="text">
        {job}
      </SuiTypography>
      <SuiTypography variant="caption" textColor="secondary">
        {org}
      </SuiTypography>
    </SuiBox>
  );
}

// function ActionsCell1() {
//   const [controller] = useSoftUIController();
//   const {transparentNavbar } = controller;
//   const classes = styles({ transparentNavbar});

//   return (
//     <SuiBox
//         color={"inherit"}
//         customClass={classes.navbar_section_desktop}
//       >
//         <IconButton
//           color="inherit"
//           className={classes.navbar_icon_button}
//           // onClick={handleConfiguratorOpen}
//         >
//           <Icon>visibility</Icon>
//         </IconButton>
//         <IconButton
//           color="inherit"
//           // className={classes.navbar_icon_button}
//           aria-controls="notification-menu"
//           aria-haspopup="true"
//           variant="contained"
//           // onClick={handleOpenMenu}
//         >
//           <Icon>edit</Icon>
//         </IconButton>
//         <IconButton
//           color="inherit"
//           // className={classes.navbar_icon_button}
//           aria-controls="notification-menu"
//           aria-haspopup="true"
//           variant="contained"
//           // onClick={handleOpenMenu}
//         >
//           <Icon>delete</Icon>
//         </IconButton>
//       </SuiBox>
//   );
// }

function ActionsCell() {
  const [controller] = useSoftUIController();
  const { transparentNavbar } = controller;
  const classes = styles({ transparentNavbar });

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <SuiBox color={"inherit"} customClass={classes.navbar_section_desktop}>
        <IconButton color="inherit" className={classes.navbar_icon_button}>
          <Icon>visibility</Icon>
        </IconButton>
        <IconButton
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={handleOpenDialog}
        >
          <Icon>edit</Icon>
        </IconButton>
        <IconButton color="inherit" variant="contained">
          <Icon>delete</Icon>
        </IconButton>
      </SuiBox>

      {/* Dialog hiển thị khi click "edit" */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Chỉnh sửa thông tin đối tác"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn chỉnh sửa thông tin của đối tác này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default {
  columns: [
    { name: "STT", align: "center" },
    { name: "Tên Đối Tác", align: "left" },
    { name: "Loại Đối Tác", align: "left" },
    { name: "Trạng Thái", align: "center" },
    { name: "Ngày ký", align: "center" },
    { name: "Thời hạn", align: "center" },
    { name: "Tác vụ", align: "center" },
  ],

  rows: [
    {
      STT: (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          1
        </SuiTypography>
      ),
      "Tên Đối Tác": <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      "Loại Đối Tác": <Function job="ĐL" org="" />,
      "Trạng Thái": (
        <SuiBadge variant="gradient" badgeContent="Đang chạy" color="success" size="extra-small" />
      ),
      "Ngày ký": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
      "Thời hạn": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
      "Tác vụ": (
        <SuiBox display="flex" justifyContent="center">
          <ActionsCell />
        </SuiBox>
      ),
    },
    {
      STT: (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          2
        </SuiTypography>
      ),
      "Tên Đối Tác": <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      "Loại Đối Tác": <Function job="NPP" org="" />,
      "Trạng Thái": (
        <SuiBadge variant="gradient" badgeContent="Đã Hết Hạn" color="secondary" size="extra-small" />
      ),
      "Ngày ký": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          11/01/19
        </SuiTypography>
      ),
      "Thời hạn": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
      "Tác vụ": <ActionsCell />,
    },
    {
      STT: (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          3
        </SuiTypography>
      ),
      "Tên Đối Tác": <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      "Loại Đối Tác": <Function job="NPP" org="" />,
      "Trạng Thái": (
        <SuiBadge variant="gradient" badgeContent="Đang chạy" color="success" size="extra-small" />
      ),
      "Ngày ký": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          19/09/17
        </SuiTypography>
      ),
      "Thời hạn": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
      "Tác vụ": <ActionsCell />,
    },
    {
      STT: (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          4
        </SuiTypography>
      ),
      "Tên Đối Tác": <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      "Loại Đối Tác": <Function job="NPP" org="" />,
      "Trạng Thái": (
        <SuiBadge variant="gradient" badgeContent="Đang chạy" color="success" size="extra-small" />
      ),
      "Ngày ký": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          24/12/08
        </SuiTypography>
      ),
      "Thời hạn": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
      "Tác vụ": <ActionsCell />,
    },
    {
      STT: (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          5
        </SuiTypography>
      ),
      "Tên Đối Tác": <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
      "Loại Đối Tác": <Function job="ĐL" org="" />,
      "Trạng Thái": (
        <SuiBadge variant="gradient" badgeContent="Đã Hết Hạn" color="secondary" size="extra-small" />
      ),
      "Ngày ký": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          04/10/21
        </SuiTypography>
      ),
      "Thời hạn": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
      "Tác vụ": <ActionsCell />,
    },
    {
      STT: (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          6
        </SuiTypography>
      ),
      "Tên Đối Tác": <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      "Loại Đối Tác": <Function job="NPP" org="" />,
      "Trạng Thái": (
        <SuiBadge variant="gradient" badgeContent="Đã Hết Hạn" color="secondary" size="extra-small" />
      ),
      "Ngày ký": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          14/09/20
        </SuiTypography>
      ),
      "Thời hạn": (
        <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
      "Tác vụ": <ActionsCell />,
    },
  ],
};
