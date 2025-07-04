import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin(){
    const Useref = useRef<HTMLInputElement>();
    const Passref = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function handleSubmit(){

        const username = Useref.current?.value;
        const password = Passref.current?.value;
        const responses = await axios.post(BACKEND_URL+"/signin",{
            username,password
        })
        const token = responses.data.token;
        localStorage.setItem("token",token);
        //redirect to dashboard
        navigate("/dashboard")
    }

    return <div className="h-screen w-screen bg-gray-600 flex justify-center items-center">
        <div className="bg-white  rounded-xl border  min-w-48 p-6 ">
            <Input reference={Useref}  placeholder="Username"/> 
            <Input reference={Passref} placeholder="password"/>
            <div className="flex justify-center pt-4">
            <Button onClick={handleSubmit} loading={false} variant="primary" text="Signin" fullWidth={true}/>
            </div>
        </div>
    </div>
}