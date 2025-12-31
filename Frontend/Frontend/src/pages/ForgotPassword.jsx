import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function ForgotPassword() {
    const [step, setStep] = useState(1)
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [conpassword, setConPassword] = useState("")
    const [loading , setLoading] = useState(false)
   
    // step 1
    const sendOtp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                serverUrl + "/api/auth/sendotp",
                { email },
                { withCredentials: true }
            )
            console.log(result.data)
            setStep(2)
            toast.success("OTP sent Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    // step 2
    const verifyOTP = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                serverUrl + "/api/auth/verifyotp",
                { email, otp },
                { withCredentials: true }
            )
            console.log(result.data)
            setStep(3)
            toast.success("OTP verified Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Invalid OTP")
        } finally {
            setLoading(false)
        }
    } 

    // step 3
    const resetPassword = async () => {
        if (newpassword !== conpassword) {
            toast.error("Password does not match")
            return
        }

        setLoading(true)
        try {
            const result = await axios.post(
                serverUrl + "/api/auth/resetpassword",
                { email, password: newpassword },
                { withCredentials: true }
            )
            console.log(result.data)
            toast.success("Password set successfully")
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Reset password failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            {/* step 1 */}
            {step === 1 && (
                <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
                        Forgot Password?
                    </h2>
                    <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                                Enter your E-mail
                            </label>
                            <input
                                type="text"
                                id="email"
                                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]'
                                placeholder='abc@gmail.com'
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <button
                            className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'
                            disabled={loading}
                            onClick={sendOtp}
                        >
                            {loading ? <ClipLoader size={30} color='white' /> : "Send OTP"}
                        </button>
                    </form>
                    <div
                        className='text-sm text-center mt-4 hover:cursor-pointer'
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </div>
                </div>
            )}

            {/* step 2 */}
            {step === 2 && (
                <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
                        Enter OTP
                    </h2>
                    <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="otp" className='block text-sm font-medium text-gray-700'>
                                Please enter the 4 digit code sent to your E-mail.
                            </label>
                            <input
                                type="text"
                                id="otp"
                                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]'
                                placeholder='* * * *'
                                required
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                            />
                        </div>
                        <button
                            className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'
                            disabled={loading}
                            onClick={verifyOTP}
                        >
                            {loading ? <ClipLoader size={30} color='white' /> : "Verify OTP"}
                        </button>
                    </form>
                    <div
                        className='text-sm text-center mt-4 hover:cursor-pointer'
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </div>
                </div>
            )}

            {/* step 3 */}
            {step === 3 && (
                <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
                    <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
                        Reset your password
                    </h2>
                    <p className='text-sm text-gray-500 text-center mb-6'>
                        Enter your new password below.
                    </p>
                    <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                                New Password
                            </label>
                            <input
                                type="text"
                                id="password"
                                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]'
                                placeholder='Enter your new password'
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newpassword}
                            />
                        </div>

                        <div>
                            <label htmlFor="conpassword" className='block text-sm font-medium text-gray-700'>
                                Confirm Password
                            </label>
                            <input
                                type="text"
                                id="conpassword"
                                className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]'
                                placeholder='Confirm your new password'
                                required
                                onChange={(e) => setConPassword(e.target.value)}
                                value={conpassword}
                            />
                        </div>

                        <button
                            className='w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer'
                            disabled={loading}
                            onClick={resetPassword}
                        >
                            {loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}
                        </button>
                    </form>
                    <div
                        className='text-sm text-center mt-4 hover:cursor-pointer'
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword
