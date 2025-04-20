// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Viet Thanh Plastic components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiProgress from "components/SuiProgress";

// Custom styles for the Projects
import styles from "layouts/dashboard/components/Projects/styles";

// Images
import logoXD from "assets/images/small-logos/gia-dung.jpeg";
import logoAtlassian from "assets/images/small-logos/hop-thuc-pham.jpeg";
import logoSlack from "assets/images/small-logos/hu-ly-ca.jpeg";
import logoSpotify from "assets/images/small-logos/song.jpeg";
import logoJira from "assets/images/small-logos/ban-ghe.jpeg";
import logoInvesion from "assets/images/small-logos/tu.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import PropTypes from "prop-types"; // Thêm dòng này

function ProductCell({logo, name}) {
  return (
    <SuiBox display="flex" alignItems="center">
      <SuiBox component="img" src={logo} alt={name} width="32px" mr={1} />
      <SuiTypography variant="button" fontWeight="medium">
        {name}
      </SuiTypography>
    </SuiBox>
  );
}

// 🔧 Thêm propTypes ngay dưới đây
ProductCell.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default function data() {
  const classes = styles();

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SuiAvatar src={image} alt="name" size="xs" customClass={classes.projects_tableAvatar} />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "Nhóm Sản Phẩm", align: "left" },
      { name: "Thành viên", align: "left" },
      { name: "Doanh Thu", align: "center" },
      { name: "Tiến Độ Hoàn Thành", align: "center" },
    ],

    rows: [
      {
        "Nhóm Sản Phẩm": <ProductCell logo={logoXD} name="Gia Dụng" />,
        "Thành viên": (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team2, "Romina Hadid"],
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </SuiBox>
        ),
        "Doanh Thu": (
          <SuiTypography variant="caption" textColor="text" fontWeight="medium">
            $14,000
          </SuiTypography>
        ),
        "Tiến Độ Hoàn Thành": (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={60} color="info" gradient />
          </SuiBox>
        ),
      },
      {
        "Nhóm Sản Phẩm": <ProductCell logo={logoAtlassian} name="Hộp Thực Phẩm" />,
        "Thành viên": (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </SuiBox>
        ),
        "Doanh Thu": (
          <SuiTypography variant="caption" textColor="text" fontWeight="medium">
            $3,000
          </SuiTypography>
        ),
        "Tiến Độ Hoàn Thành": (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={10} color="info" gradient />
          </SuiBox>
        ),
      },
      {
        "Nhóm Sản Phẩm": <ProductCell logo={logoSlack} name="Hộp Thực Phẩm" />,
        "Thành viên": (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team3, "Alexander Smith"],
            ])}
          </SuiBox>
        ),
        "Doanh Thu": (
          <SuiTypography variant="caption" textColor="text" fontWeight="medium">
            Not set
          </SuiTypography>
        ),
        "Tiến Độ Hoàn Thành": (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={100} color="success" gradient />
          </SuiBox>
        ),
      },
      {
        "Nhóm Sản Phẩm": <ProductCell logo={logoSpotify} name="Sóng" />,
        "Thành viên": (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team4, "Jessica Doe"],
              [team3, "Alexander Smith"],
              [team2, "Romina Hadid"],
              [team1, "Ryan Tompson"],
            ])}
          </SuiBox>
        ),
        "Doanh Thu": (
          <SuiTypography variant="caption" textColor="text" fontWeight="medium">
            $20,500
          </SuiTypography>
        ),
        "Tiến Độ Hoàn Thành": (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={100} color="success" gradient />
          </SuiBox>
        ),
      },
      {
        "Nhóm Sản Phẩm": <ProductCell logo={logoJira} name="Bàn Ghế" />,
        "Thành viên": (
          <SuiBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </SuiBox>
        ),
        "Doanh Thu": (
          <SuiTypography variant="caption" textColor="text" fontWeight="medium">
            $500
          </SuiTypography>
        ),
        "Tiến Độ Hoàn Thành": (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={25} color="info" gradient />
          </SuiBox>
        ),
      },
      {
        "Nhóm Sản Phẩm": <ProductCell logo={logoInvesion} name="Tủ" />,
        "Thành viên": (
          <SuiBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </SuiBox>
        ),
        "Doanh Thu": (
          <SuiTypography variant="caption" textColor="text" fontWeight="medium">
            $2,000
          </SuiTypography>
        ),
        "Tiến Độ Hoàn Thành": (
          <SuiBox width="8rem" textAlign="left">
            <SuiProgress value={40} color="info" gradient />
          </SuiBox>
        ),
      },
    ],
  };
}
