const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { uploadFile } = require('../s3Upload'); 
const { OpenAI } = require('openai');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const creditReportKeywords = [
    "credit score",
    "account summary",
    "payment history",
    "total balance",
    "credit limit",
    "delinquent accounts",
    "hard inquiries",
    "credit report",
    "total accounts"
];

const isCreditReport = (pdfText) => {
    return creditReportKeywords.some(keyword => pdfText.toLowerCase().includes(keyword));
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const data = await pdfParse(req.file.buffer);
        const extractedText = data.text.toLowerCase();

        if (!isCreditReport(extractedText)) {
            return res.status(400).json({
                message: 'The uploaded file does not appear to be a valid credit report. Please upload a valid credit report.'
            });
        }

        const fileName = `${Date.now()}-${req.file.originalname}`;
        await uploadFile(req.file.buffer, fileName);

        const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        
        const prompt = `
        The following is a credit report.if the user score is above 740 tell them nice  stuff and they should keep doing what they are  doing else Please analyze the report and provide specific suggestions in the following categories:
        1. Clearing Collection Debt: if there is collection debts what  steps should the person take to clear debts in collections?
        2. Credit Building Tactics: Provide some methods, like getting small loans and paying them off, to help grow their account.
        3. Payment History: What improvements can be made to ensure a better payment history?
        4. Credit Limit and Utilization: How can the person optimize credit limits to improve their score?
        5. General Suggestions: Any other important strategies that can help improve their credit score.

        Credit Report Text:
        ${extractedText}
        `;
        // Call GPT-4 to generate suggestions based on the credit report
        const aiResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
        });
      
        const suggestionsText = aiResponse.choices[0].message.content; 

        res.status(200).json({
            message: 'File uploaded and validated successfully!',
            s3Url: s3Url,
            parsedText: extractedText,
            suggestions: suggestionsText // Return AI-curated suggestions here
        });
    } catch (error) {
        console.error(error);
        if (error.response) {
            return res.status(500).json({ message: 'OpenAI API error', error: error.response.data });
        }
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

module.exports = router;
