import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../model/courseModel.js"
import Lecture from "../model/lectureModel.js"
import User from "../model/userModel.js"



export const createCourse = async(req,res)=>{
    try {
        const {title,category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"Title or Category are required"})
        }       
        const course  = await Course.create({
            title,
            category,
            creator: req.userId,
        })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message:`Create course error ${error.message}`})
    }
}

export const getPublishedCourses = async(req,res)=>{
    try {
        const courses = await Course.find({isPublished:true}).populate("lectures reviews")
        if(!courses){
            return res.status(400).json({message:"Courses not found"})
        }
        return res.status(200).json(courses)
    } catch (error) {
         return res.status(500).json({message:`Failed to get ispublished courses ${error.message}`})
    }
}

export const getCreatorCourses = async(req,res)=>{
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})
         if(!courses){
            return res.status(400).json({message:"Courses are not found"})
        }
         return res.status(200).json(courses)
    } catch (error) {
         return res.status(500).json({message:`Failed to get Creator courses ${error.message}`})
    }
}

export const editCourse= async(req,res)=>{
    try {
        const {courseId} = req.params
        const {title, subTitle, description, category, level, isPublished, price} = req.body
        let thumbnail
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)
        }
        let course = await Course.findById(courseId)
        if(!course){
             return res.status(400).json({message:"Course is not found"})
        }
     const updateData = {title, subTitle, description, category, level, isPublished, price, thumbnail}

     course = await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to edit course ${error.message}`})
    }
}
export const getCourseById = async(req,res)=>{
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name email photoUrl'
                }
            })
            .populate('lectures')
        
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        
        console.log("Course reviews count:", course.reviews?.length)
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to get course by Id  ${error.message}`})
    }
}
export const removeCourse = async(req,res)=>{
    try {
        const { courseId } = req.params
         let course = await Course.findById(courseId)
        if(!course){
             return res.status(400).json({message:"Course is not found"})
        }
        course  = await Course.findByIdAndDelete(courseId, {new:true})
        return res.status(200).json({message:"Course deleted successfully"})

    } catch (error) {
          return res.status(500).json({message:`Failed to Delete Course  ${error.message}`})
    }
}


//for lecture
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({ message: "Lecture title is required" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const lecture = await Lecture.create({ lectureTitle });

        course.lectures.push(lecture._id);

        await course.save({ validateBeforeSave: false });
        await course.populate("lectures");

        return res.status(201).json({ lecture, course });

    } catch (error) {
        return res.status(500).json({
            message: `Failed to create Lecture ${error.message}`
        });
    }
};


export const getCourseLecture = async(req,res)=>{
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
       await course.populate("lectures")
       return res.status(200).json(course)

    } catch (error) {
        return res.status(500).json({message:`Failed to get course Lecture  ${error.message}`})
    }

}

export const editLecture = async(req,res)=>{
    try {
        const {lectureId} = req.params
        const{isPreviewFree, lectureTitle} = req.body
        const lecture  = await Lecture.findById(lectureId)
        if(!lecture){
              return res.status(404).json({message:"Lecture not found"})
        } 
        let videoUrl
        if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree
        await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({message:`Failed to Edit Lecture  ${error.message}`})
    }
}

export const removeLecture = async(req,res)=>{
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
         if(!lecture){
              return res.status(404).json({message:"Lecture not found"})
        } 
        await Course.updateOne(
            {lectures:lectureId},
            {$pull: {lectures:lectureId}}

        )
        return res.status(200).json({message:"Lecture Removed"})
    } catch (error) {
        return res.status(500).json({message:`Failed to Remove Lecture  ${error.message}`})
    }
}

//get Creator

export const getCreatorById = async(req,res)=>{
    try {
        const {userId} = req.body
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User is not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`Failed to get Creator  ${error.message}`})
    }
}