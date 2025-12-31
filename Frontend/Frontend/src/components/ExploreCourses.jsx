import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktop } from "react-icons/tb";
import { FaUikit } from "react-icons/fa";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { PiOpenAiLogoLight } from "react-icons/pi";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function ExploreCourses() {
  const navigate  = useNavigate()
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-6 px-[30px]'>

      {/* left/top div */}
      <div className='w-[100%] lg:w-[360px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-2 md:px-[40px] px-[20px]'>

        <span className='text-[32px] font-semibold'>Explore</span>
        <span className='text-[32px] font-semibold'>Our Courses</span>

        <p className='text-[15px] leading-[22px] text-gray-600 mt-2'>
          Discover courses instantly using AI-powered search and voice commands.
          Speak or type to find the right course in seconds.
          Learn smarter with personalized AI-driven recommendations.
        </p>

        <button className='px-[18px] py-[9px] border-2 bg-black border-white text-white rounded-[8px] text-[16px] font-light flex gap-2 mt-[30px] cursor-pointer' onClick={()=>navigate("/allcourses")}>
          Explore Courses
          <SiViaplay className='w-[24px] h-[24px]' />
        </button>
      </div>

      {/* right/bottom div */}
      <div className='w-[720px] max-w-[95%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[45px] gap-[35px] flex-wrap mb-[40px] lg:mb-0'>

        {/* card */}
        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <TbDeviceDesktop className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          Web Dev
        </div>

        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <FaUikit className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          UI/UX Designing
        </div>

        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#fcb9c8] rounded-lg flex items-center justify-center'>
            <MdAppShortcut className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          App Dev
        </div>

        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <FaHackerrank className='w-[45px] h-[45px] text-[#6d6c6c]' />
          </div>
          Ethical Hacking
        </div>

        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <PiOpenAiLogoLight className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          AI / ML
        </div>

        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#fcb9c8] rounded-lg flex items-center justify-center'>
            <SiGoogledataproc className='w-[45px] h-[45px] text-[#6d6c6c]' />
          </div>
          Data Science
        </div>

        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <BsClipboardData className='w-[45px] h-[45px] text-[#6d6c6c]' />
          </div>
          Data Analytics
        </div>

        <div className='w-[90px] h-[120px] text-[12px] flex flex-col gap-2 text-center'>
          <div className='w-[90px] h-[80px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <SiOpenaigym className='w-[45px] h-[45px] text-[#6d6c6c]' />
          </div>
          AI Tools
        </div>

      </div>
    </div>
  )
}

export default ExploreCourses
