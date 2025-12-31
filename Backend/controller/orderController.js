import Razorpay from 'razorpay'
import dotenv from "dotenv"
import Course from '../model/courseModel.js'
import User from '../model/userModel.js'

dotenv.config()

const RazorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const RazorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body

    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    const options = {
      amount: course.price * 100,
      currency: 'INR',
      receipt: courseId.toString()
    }

    const order = await RazorPayInstance.orders.create(options)
    return res.status(200).json(order)

  } catch (error) {
    return res.status(500).json({ message: `Failed to create Razorpay order ${error.message}` })
  }
}

export const verifyPayment = async (req, res) => {
  try {
    const { courseId, userId } = req.body

    const user = await User.findById(userId)

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId)
      await user.save()
    }

    const course = await Course.findById(courseId)

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId)
      await course.save()
    }

    const updatedUser = await User.findById(userId).select("-password")

    return res.status(200).json({
      message: "Enrollment successful",
      updatedUser
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
