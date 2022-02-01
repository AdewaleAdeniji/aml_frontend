import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logoutUser } from "redux/user";
export const Logout = async () => {   
    const dispatch = useDispatch();
    await dispatch(logoutUser);
    localStorage.removeItem('authT');
    window.location.href = "/login";
}