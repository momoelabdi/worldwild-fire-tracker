import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";


function Footer() {
  return (
    <div className="footer">
       <h1>
        <LocalFireDepartmentIcon sx={{ color: pink[500] }} />
        Powred By NASA and Mapbox APIS
      </h1>
    </div>
   );
}

export default Footer;
