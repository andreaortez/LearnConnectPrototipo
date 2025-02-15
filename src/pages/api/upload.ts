import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const uploadsDir = path.join(process.cwd(), "uploads");

    // Ensure the uploads folder exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const form = new formidable.IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ error: "Failed to upload file" });
      }

      /* const uploadedFile = files.file as formidable.File; */
      /* const filePath = uploadedFile.filepath; */

      // Return the temporary file path to the frontend
      return res.status(200).json({ path: filePath });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
