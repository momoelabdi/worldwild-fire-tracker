import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { pink } from '@mui/material/colors';




const Header = () => {

return (

    <header className="header">
<h1><LocalFireDepartmentIcon sx={{ color: pink[500] }}/> World wild fires Tracker (Powred By NASA)
 </h1>  

    </header>
)


}

export default Header;