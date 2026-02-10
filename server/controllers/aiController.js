import { GoogleGenerativeAI } from "@google/generative-ai";
import Checklist from "../models/Checklist.js";

const getTravelChecklist = async (req, res) => {
  try {
    const { destination, checkInDate, hotelName } = req.body;
    console.log("Received AI Checklist Request:", { destination, checkInDate, hotelName });

    if (!destination) {
        return res.status(400).json({ success: false, message: "Destination is required" });
    }

    const tripDate = new Date(checkInDate);
    const tripMonth = tripDate.getMonth();

    const cachedChecklist = await Checklist.findOne({
        destination: { $regex: new RegExp(`^${destination}$`, 'i') },
        month: tripMonth
    });

    if (cachedChecklist) {
        console.log("Cache Hit");
        return res.status(200).json({
            success: true,
            data: cachedChecklist.data,
            source: 'cache'
        });
    }

    console.log("Cache Miss. Calling Gemini API...");

    if (!process.env.GEMINI_API_KEY) {
      console.error("Error: GEMINI_API_KEY is missing");
      return res.status(500).json({ 
        success: false, 
        message: "Server Configuration Error: API Key missing" 
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      I am traveling to ${destination} and staying at ${hotelName}.
      My check-in date is ${new Date(checkInDate).toLocaleDateString()}.
      
      Please generate a personalized travel checklist for this trip. 
      Consider the likely weather for this time of year in ${destination}.
      Include 5-7 essential items specifically for this location and season.
      Also include 2-3 "hidden gem" tips for visiting ${destination}.
      
      Format the response as a simple JSON object with two arrays: "checklist" and "tips".
      Do not include markdown formatting like \`\`\`json. Just the raw JSON.
    `;

    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Response:", text);
    
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanText);

    try {
        await Checklist.create({
            destination,
            hotelName,
            month: tripMonth,
            data: parsedData
        });
        console.log("Saved to cache.");
    } catch (dbError) {
        console.error("Failed to save to cache:", dbError.message);
    }

    res.status(200).json({ 
      success: true, 
      data: parsedData,
      source: 'api'
    });

  } catch (error) {
    console.error("AI Checklist Controller Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "AI Generation Failed: " + error.message 
    });
  }
};

export { getTravelChecklist };
