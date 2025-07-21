
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
           
            const res = await fetch("https://reactinterviewtask.codetentaclestechnologies.in/api/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

const data = await res.json();
console.log("LOGIN RESPONSE:", data); 
            if (res.ok && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if (data.role === "Admin") {
        navigate("/List"); // admin page
    } else {
        navigate("/Product"); // user product page
    }
} else {
    setError(data.message || "Login failed");
}
        } catch (err) {
            setError("Network error");
        }
    };



    return (
        <>
            <section className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img" style={{backgroundImage:"url('/assets/image/bbblurry.svg')"}}>
                <div className="container mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div className="w-96 flex">
                            <div className="w-full bg-login p-6  rounded-lg">
                                <div className="heading-1 pt-10 m-auto ">
                                    <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="login-img" className="rounded-full m-auto p-1 border" width="100px" height="100px" />
                                    <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">Login</h3>
                                </div>
                                <form className="pt-8 rounded" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 md:mr-2 ">
                                        <input
                                            className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Login
                                            <div className="fill-one"></div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}