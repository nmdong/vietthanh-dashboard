/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Viet Thanh Plastic components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiProgress from "components/SuiProgress";

// Images
import logoSpotify from "assets/images/small-logos/gia-dung.jpeg";
import logoInvesion from "assets/images/small-logos/hop-thuc-pham.jpeg";
import logoJira from "assets/images/small-logos/hu-ly-ca.jpeg";
import logoSlack from "assets/images/small-logos/song.jpeg";
import logoWebDev from "assets/images/small-logos/ban-ghe.jpeg";
import logoXD from "assets/images/small-logos/tu.jpeg";

function Completion({ value, color }) {
  return (
    <SuiBox display="flex" alignItems="center">
      <SuiTypography variant="caption" textColor="text" fontWeight="medium">
        {value}%&nbsp;
      </SuiTypography>
      <SuiBox width="8rem">
        <SuiProgress value={value} color={color} gradient noLabel />
      </SuiBox>
    </SuiBox>
  );
}

const action = (
  <Icon className="font-bold text-secondary cursor-pointer" fontSize="small">
    more_vert
  </Icon>
);

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

export default {
  columns: [
    { name: "Nhóm Sản Phẩm", align: "left" },
    { name: "Tổng Doanh Thu", align: "left" },
    { name: "Trạng Thái", align: "left" },
    { name: "Tiến Độ Hoàn Thành", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      "Nhóm Sản Phẩm": <ProductCell logo={logoSpotify} name="Gia Dụng" />,
      "Tổng Doanh Thu": (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,500
        </SuiTypography>
      ),
      "Trạng Thái": (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          Đang hoạt động
        </SuiTypography>
      ),
      "Tiến Độ Hoàn Thành": <Completion value={60} color="info" />,
      action,
    },
    {
      "Nhóm Sản Phẩm": <ProductCell logo={logoInvesion} name="Hộp Thực Phẩm" />,
      "Tổng Doanh Thu": (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $5,000
        </SuiTypography>
      ),
      "Trạng Thái": (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          Hoàn thành
        </SuiTypography>
      ),
      "Tiến Độ Hoàn Thành": <Completion value={100} color="success" />,
      action,
    },
    {
      "Nhóm Sản Phẩm": <ProductCell logo={logoJira} name="Hũ - Ly - Ca" />,
      "Tổng Doanh Thu": (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $3,400
        </SuiTypography>
      ),
      "Trạng Thái": (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          Đã hủy
        </SuiTypography>
      ),
      "Tiến Độ Hoàn Thành": <Completion value={30} color="error" />,
      action,
    },
    {
      "Nhóm Sản Phẩm": <ProductCell logo={logoSlack} name="Sóng" />,
      "Tổng Doanh Thu": (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $1,400
        </SuiTypography>
      ),
      "Trạng Thái": (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          Đã hủy
        </SuiTypography>
      ),
      "Tiến Độ Hoàn Thành": <Completion value={0} color="error" />,
      action,
    },
    {
      "Nhóm Sản Phẩm": <ProductCell logo={logoWebDev} name="Bàn Ghế" />,
      "Tổng Doanh Thu": (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $14,000
        </SuiTypography>
      ),
      "Trạng Thái": (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          Đang hoạt động
        </SuiTypography>
      ),
      "Tiến Độ Hoàn Thành": <Completion value={80} color="info" />,
      action,
    },
    {
      "Nhóm Sản Phẩm": <ProductCell logo={logoXD} name="Tủ" />,
      "Tổng Doanh Thu": (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,300
        </SuiTypography>
      ),
      "Trạng Thái": (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          Hoàn thành
        </SuiTypography>
      ),
      "Tiến Độ Hoàn Thành": <Completion value={100} color="success" />,
      action,
    },
    {
      "Nhóm Sản Phẩm": <ProductCell logo={logoXD} name="Sản Phẩm Khác" />,
      "Tổng Doanh Thu": (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,300
        </SuiTypography>
      ),
      "Trạng Thái": (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          Hoàn thành
        </SuiTypography>
      ),
      "Tiến Độ Hoàn Thành": <Completion value={100} color="success" />,
      action,
    },
  ],
};
