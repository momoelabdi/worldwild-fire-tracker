import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from "@mui/material/colors";


function Footer() {
  return (
    <div className="footer">
       <h1>
        <LocalFireDepartmentIcon sx={{ color: pink[500] }} /> World wild Fires
        Tracker Powred By NASA and mapbox APIS
      </h1>
    </div>
   );
}

export default Footer;
