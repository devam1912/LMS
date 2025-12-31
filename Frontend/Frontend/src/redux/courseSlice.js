import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name:"course",
    initialState:{
        creatorCourseData:null,
        courseData:null,
        selectedCourse:null
    },
    reducers:{
        setCreatorCourseDataData:(state,action)=>{
            state.creatorCourseData = action.payload
        },
         setCourseData:(state,action)=>{
            state.courseData = action.payload
        },
        setSelectedCourse:(state, action)=>{
            state.selectedCourse = action.payload
        }
    }
})

export const {setCreatorCourseDataData} = courseSlice.actions
export const {setCourseData} = courseSlice.actions
export const {setSelectedCourse} = courseSlice.actions
export default courseSlice.reducer