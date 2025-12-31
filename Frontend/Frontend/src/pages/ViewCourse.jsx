import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSelectedCourse } from '../redux/courseSlice';
import { setUserData } from '../redux/userSlice';
import img from "../assets/empty.jpg"
import { FaStar } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import Card from '../components/Card';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function ViewCourse() {

  const navigate = useNavigate()
  const { courseData } = useSelector(state => state.course)
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { selectedCourse } = useSelector(state => state.course)
  const [selectedLecture, setSelectedLecture] = useState(null)
  const [creatorData, setCreatorData] = useState(null)
  const [creatorCourses, setCreatorCourses] = useState(null)
  const  {userData} = useSelector(state=>state.user)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchCourseFromServer = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/course/getcourse/${courseId}`, {withCredentials: true})
      console.log("Fetched course from server:", result.data)
      if(result.data) {
        dispatch(setSelectedCourse(result.data))
      }
      return result.data
    } catch (error) {
      console.log("Error fetching course:", error)
      return null
    }
  }

  const fetchCourseData = async () => {
    const course = courseData.find((course) => course._id === courseId)
    if (course) {
      dispatch(setSelectedCourse(course))
    } else {
      // If course not found in Redux, fetch from server
      await fetchCourseFromServer()
    }
  }

  useEffect(()=>{
   
    const handleCreator = async()=>{
     if(selectedCourse?.creator){
        try {
            const result = await axios.post(serverUrl + "/api/course/creator", {userId:selectedCourse?.creator}, {withCredentials:true})
            console.log(result.data)
            setCreatorData(result.data)
        } catch (error) {
            console.log(error)
        } 
    }
    }
    handleCreator()
  },[selectedCourse])

  useEffect(() => {
    const course = courseData.find((c) => c._id === courseId)
    if (course && course.reviews) {
      console.log("Setting course from Redux with reviews:", course.reviews)
      dispatch(setSelectedCourse(course))
    }
    
    if(courseId) {
      fetchCourseFromServer()
    }
  }, [courseId])

  useEffect(()=>{
    if(creatorData?._id && courseData.length > 0){
        const creatorCourse = courseData.filter((course)=>course.creator === creatorData?._id && course._id !== courseId)
          setCreatorCourses(creatorCourse)
    }
  },[creatorData, courseData])

  const isUserEnrolled = () => {
    return userData?.enrolledCourses?.includes(courseId) || 
           selectedCourse?.enrolledStudents?.includes(userData?._id);
  }

  const handleEnroll = async(userId, courseId)=>{
        try {
            const orderData  = await axios.post(serverUrl + "/api/order/razorpay-order", {userId, courseId},{withCredentials:true})
            console.log(orderData)
            const options  = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.data.amount,
                currency:'INR',
                name:"VIRTUAL COURSES",
                description:"COURSE ENROLLMENT PAYMENT",
                order_id:orderData.data.id,
                handler:async function (response){
                    console.log("RazorPay Response", response)
                try {
                 const verifyPayment = await axios.post(serverUrl + "/api/order/verifypayment", {
                    ...response,
                    courseId,
                    userId
                 }, {withCredentials:true})
                 
                 console.log("Verify Payment Response:", verifyPayment)
                 
                 if(verifyPayment.data.updatedUser) {
                   dispatch(setUserData(verifyPayment.data.updatedUser))
                 }
                 
                 toast.success(verifyPayment.data.message)
                 
                 setTimeout(() => {
                   window.location.reload()
                 }, 1000)
                 
                } catch (error) {
                    console.log("Payment verification error:", error)
                    toast.error(error?.response?.data?.message || "Something went wrong while enrolling.")
                }

                }
                
            }
            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (error) {
            console.log(error)
        }
  }


  const handleReview = async()=>{
    if(!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment")
      return
    }
    
    setLoading(true)
    
    try {
      const result = await axios.post(serverUrl + "/api/review/createreview", {rating, comment, courseId},{withCredentials:true})
      console.log("Review submission result:", result.data)
      
      toast.success("Review Added Successfully!")
      
      setRating(0)
      setComment("")
      
      const updatedCourse = await fetchCourseFromServer()
      
      if(updatedCourse) {
        console.log("Updated course after review:", updatedCourse)
      }
      
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      console.error("Review error:", error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }


  const avgRating = React.useMemo(() => {
    console.log("Calculating avgRating with reviews:", selectedCourse?.reviews)
    if(!selectedCourse?.reviews || selectedCourse.reviews.length === 0){
      return "0.0"
    }
    const total = selectedCourse.reviews.reduce((sum, review)=> sum + review.rating, 0)
    const avg = (total / selectedCourse.reviews.length).toFixed(1)
    console.log("Calculated average:", avg)
    return avg
  }, [selectedCourse?.reviews])

  return (
    <div className='min-h-sceen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>

        {/* top section */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>

          {/* thumbnail */}
          <div className='md:col-span-2 w-full'>
            <FaArrowLeftLong
              className='text-[black] w-[22px] h-[22px] cursor-pointer'
              onClick={() => navigate("/")}
            />

            <img
              src={selectedCourse?.thumbnail || img}
              alt=""
              className='rounded-xl w-full h-[260px] object-cover'
            />
          </div>

          {/* courseInfo */}
          <div className='md:col-span-3 space-y-2 mt-[20px]'>
            <h2 className='text-2xl font-bold'>{selectedCourse?.title}</h2>
            <p className='text-gray-600'>{selectedCourse?.subTitle}</p>

            <div className='flex items-start flex-col justify-between'>

              <div className='text-yellow-500 font-medium flex gap-2'>
                <span className='flex items-center justify-start gap-1 '>
                  <FaStar /> {avgRating}
                </span>
                <span className='text-gray-400'>({selectedCourse?.reviews?.length || 0} Reviews)</span>
              </div>

              <div>
                <span className='text-xl font-semibold text-black'>₹{selectedCourse?.price}</span>{" "}
                <span className='line-through text-sm text-gray-400'>₹599</span>
              </div>

              <ul className='text-sm text-gray-700 space-y-1 pt-2'>
                <li>✅ 10+ hours of video content</li>
                <li>✅ Lifetime access to course materials</li>
              </ul>

              {isUserEnrolled() ? (
                <button className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 my-3 cursor-pointer' onClick={() => navigate(`/viewlecture/${courseId}`)}>
                  Watch Now
                </button>
              ) : (
                <button className='bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 my-3 cursor-pointer' onClick={()=>handleEnroll(userData._id,courseId)}>
                  Enroll Now
                </button>
              )}

            </div>
          </div>

        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2'>What You'll Learn</h2>
          <ul className='list-disc pl-6 text-gray-700 space-y-1' >
            <li>Learn {selectedCourse?.category} from the beginning</li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2'>Who this course is for</h2>
          <p className='text-gray-700'>Beginners, aspiring developers, and professionals looking to upgrade their skills.</p>
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
            <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
                <h2 className='text-xl font-bold mb-1 text-gray-800'>
                    Course Curriculum
                </h2>
                <p className='text-sm text-gray-500 mb-4'>
                    {selectedCourse?.lectures?.length} Lectures
                </p>
                <div className='flex flex-col gap-3'> 
                  {selectedCourse?.lectures?.map((lecture, index)=>(
                    <button 
                     key={index}
                     disabled={!lecture.isPreviewFree}
                    onClick={()=>{
                        if(lecture.isPreviewFree){
                        setSelectedLecture(lecture)
                    }}}
                     className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture.isPreviewFree?"hover:bg-gray-100 cursor-pointer border-gray-300" : "cursor-not-allowed opacity-60 border-gray-200"} ${selectedLecture?.lectureTitle === lecture.lectureTitle ? "bg-gray-100 border-gray-400" : ""} `}>
                        <span className='text-lg text-gray-700'>
                            {lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
                        </span>
                        <span className='text-sm font-medium text-gray-800'> {lecture.lectureTitle}</span>
                       </button>
                 ))}
                </div>
            </div>


            <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
            <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
                {selectedLecture?.videoUrl ? <video
                className='w-full h-full object-cover'
                src={selectedLecture?.videoUrl}
                controls
                />:
                    <span className='text-white text-sm'>
                        Select a preview lecture to watch
                    </span>
                }
            </div>
            </div>
        </div>

        <div className='mt-8 border-t pt-6'>
            <h2 className='text-xl font-semibold mb-2'>
                Write a Review
            </h2>
            <div className='mb-4 '>
                <div className='flex gap-1 mb-2'>
                    {
                        [1,2,3,4,5].map((star)=>(
                            <FaStar  
                            key={star} 
                            onClick={()=>setRating(star)}
                            className={`cursor-pointer ${star <= rating ? "fill-amber-300" : "fill-gray-300"}`}
                            />
                        ))
                    }
                </div>
                <textarea onChange={(e)=>setComment(e.target.value)} value={comment} name="" className='w-full border border-gray-300 rounded-lg p-2' placeholder='Write your review here...' rows={3}
                />
                    <button className='bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800' disabled={loading} onClick={handleReview}>{loading?<ClipLoader size={30} color='white'/>:"Submit Review"}</button>
            </div>
        </div>

        {/* Display existing reviews */}
        <div className='mt-6 border-t pt-6'>
          <h2 className='text-xl font-semibold mb-4'>
            Reviews ({selectedCourse?.reviews?.length || 0})
          </h2>
          <div className='space-y-4'>
            {selectedCourse?.reviews?.length > 0 ? (
              selectedCourse.reviews.map((review, index) => (
                <div key={index} className='border-b pb-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='flex'>
                      {[1,2,3,4,5].map((star) => (
                        <FaStar 
                          key={star}
                          className={star <= review.rating ? "fill-amber-300" : "fill-gray-300"}
                          size={14}
                        />
                      ))}
                    </div>
                    <span className='text-sm text-gray-600'>
                      {review.user?.name || 'Anonymous'}
                    </span>
                  </div>
                  <p className='text-gray-700'>{review.comment}</p>
                </div>
              ))
            ) : (
              <p className='text-gray-500'>No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

        {/* for creator information */}
        <div className='flex items-center gap-4 pt-4 border-t'>
         {creatorData?.photoUrl?   <img src={creatorData?.photoUrl} alt=""  className='border-1 border-gray-200 w-16 h-16 rounded-full object-cover'/>: <img src={img} alt="" className='border-1 border-gray-200 w-16 h-16 rounded-full object-cover'/>}
            <div>
                <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
                <p className='md:text-sm text-gray-600 text-[10px] '>{creatorData?.description}</p>
                <p className='md:text-sm text-gray-600 text-[10px] '>{creatorData?.email}</p>
            </div>
        </div>

        <div>
            <p className='text-xl font-semibold mb-2'>Other Published Courses by the Educator</p>
        </div>

        <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px] '>
            {creatorCourses && creatorCourses.length > 0 ? (
              creatorCourses.map((course,index)=>(
                <Card key={index} thumbnail={course.thumbnail} id={course._id} price={course.price} title={course.title} category={course.category}/>
              ))
            ) : (
              <p className='text-gray-500'>No other courses available</p>
            )}
        </div>

      </div>
    </div>
  )
}

export default ViewCourse