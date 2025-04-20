/**
=========================================================
* Viet Thanh Plastic - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Viet Thanh Plastic components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Custom styles for the WorkWithTheRockets
import styles from "layouts/dashboard/components/WorkWithTheRockets/styles";

function WorkWithTheRockets() {
  const classes = styles();

  return (
    <Card className="h-100">
      <SuiBox position="relative" height="100%" p={2}>
        <SuiBox customClass={classes.workWithTheRockets_content}>
          <SuiBox mb={3} pt={1}>
            <SuiTypography variant="h5" textColor="white" fontWeight="bold">
              Tại sao lại là Viet Thanh Plastic?
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography variant="body2" textColor="white">
              Làm việc với Viet Thanh Plastic là một trải nghiệm tuyệt vời. Chúng tôi cung cấp cho
              bạn những sản phẩm chất lượng cao và dịch vụ tốt nhất. Chúng tôi cam kết hỗ trợ bạn
              trong mọi bước của quá trình hợp tác.
            </SuiTypography>
          </SuiBox>
          <SuiTypography
            component="a"
            href="https://www.vithacoplastic.com/#"
            variant="button"
            textColor="white"
            fontWeight="medium"
            customClass={classes.workWithTheRockets_button}
          >
            Tìm hiểu thêm
            <Icon className="font-bold">arrow_forward</Icon>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default WorkWithTheRockets;
