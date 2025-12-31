import Course from "../model/courseModel.js"
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const searchCache = new Map();

export const searchWithAi = async(req,res)=>{
    try {
        const {input} = req.body
        if(!input){
            return res.status(400).json({message:"Search query is required"})
        }

        let courses = await Course.find({
            isPublished:true,
            $or :[
                {title: {$regex: input , $options : 'i'}},
                {subTitle: {$regex: input , $options : 'i'}},
                {category: {$regex: input , $options : 'i'}},
                {level: {$regex: input , $options : 'i'}}
            ]
        });

        if(courses.length > 0){
            console.log("Direct search found:", courses.length, "courses");
            return res.status(200).json(courses)
        }

        console.log("No direct results, using AI...");
        
        let keyword;

        if(searchCache.has(input.toLowerCase())){
            keyword = searchCache.get(input.toLowerCase());
            console.log("Using cached keyword:", keyword);
        } else {
            try {
                const ai = new GoogleGenAI({
                    apiKey:process.env.GEMINI_API_KEY
                });

                const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Extract the MOST SPECIFIC technology or topic they want to learn.

                Examples:
                - "mujhe react sikhna hai" → React
                - "I want to learn python" → Python
                - "HTML sikhao" → HTML
                - "web development" → Web Development
                - "machine learning course" → Machine Learning
                
                Return only the technology/topic name. No extra text or explanation.
                
                Query: ${input}` 

                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                });

                keyword = response.text.trim();
                
                searchCache.set(input.toLowerCase(), keyword);
                console.log("AI extracted keyword:", keyword);
                
            } catch (aiError) {
                console.error("AI API Error:", aiError.message);
                return res.status(200).json([])
            }
        }

        courses = await Course.find({
            isPublished:true,
            $or :[
                {title: {$regex: keyword , $options : 'i'}},
                {subTitle: {$regex: keyword , $options : 'i'}},
                {category: {$regex: keyword , $options : 'i'}},
                {level: {$regex: keyword , $options : 'i'}}
            ]
        });

        console.log("AI search found:", courses.length, "courses");
        return res.status(200).json(courses)
       
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({message:`Failed to search: ${error.message}`})
    }
}