import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";



export function Signup(){
    const Useref = useRef<HTMLInputElement>();
    const Passref = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function handleSubmit(){
        const username = Useref.current?.value;
        const password = Passref.current?.value;
        try {
            await axios.post(BACKEND_URL+"/signup",{
                username,password
            });
            alert("Signup Successful");
        } catch (e: any) {
            if (e.response && e.response.data && e.response.data.message === 'User already exists') {
                alert("User already exists. Redirecting to Signin page.");
                navigate('/signin');
            } else {
                alert("Signup failed. Please try again.");
            }
        }
    }


    return <div className="h-screen w-screen bg-gray-600 flex justify-center items-center">
        <div className="bg-white  rounded-xl border  min-w-32 p-6 ">
            <Input reference={Useref}  placeholder="Username"/>
            <Input reference={Passref} placeholder="password"/>
            <div className="flex justify-center pt-4">
            <Button onClick={handleSubmit} loading={false} variant="primary" text="Signup" fullWidth={true}/>
            </div>
            <div className="flex justify-center pt-2">

            <a href="/signin" className="text-blue-500 hover:underline ml-4 justify-center">Already have an account? Sign in</a>
            </div>
        </div>
    </div>
}