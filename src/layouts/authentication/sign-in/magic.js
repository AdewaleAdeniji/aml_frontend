import React from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from 'react';
import { login } from 'components/api';
import { useDispatch } from "react-redux";
import { saveToken , saveUser } from "redux/user";

const MagicSignin = (props) => {
    const dispatch = useDispatch();
    const history = useLocation();
    const navigate = useNavigate();
    const [firstRun, setFirstRun] = useState(true);
    const [magicCode, setMagicCode] = useState('');
    let path = history?.pathname;
    if (!path) {
      navigate("/login");
    }
    //console.log(path);
    useEffect(() => {
        if (firstRun) {
          setFirstRun(false);
          const newpath = path.split("/");
          setMagicCode(newpath[newpath.length - 1]);
          loginCode(newpath[newpath.length - 1]);
        }
      }, [firstRun]);
    const loginCode = async (code) => {
        Swal.fire({
            text:'Logging you in....',
            html:'<i class="fa fa-spinner fa-spin"></i>',
            showConfirmButton:false
        })
        const res = await login(code);
        if(res.status===200){
            const data = res.data.data.content;
            const user = data.user;
            const token = data.token.token;
            dispatch(saveToken(token));
            dispatch(saveUser(JSON.stringify(user)));
            //console.log(user,token);
            Swal.close();
            window.location.href = '/records';
        }
        else {
            Swal.fire({
                icon:'warning',
                text:res?.data?.data?.content||'Error Occured',
                showConfirmButton:false
            });
        }
    }

    return (
        <>
        <i className="fa fa-spinner fa-spin"></i>
        Logging you in....
        </>
    )
}
export default MagicSignin;