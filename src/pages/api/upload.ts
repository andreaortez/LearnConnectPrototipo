import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const uploadsDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const form = formidable({
        uploadDir: uploadsDir,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024, // 50MB
      });
      
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ error: "Failed to upload file" });
      }

      let uploadedFile;
      if (Array.isArray(files.file)) {
        uploadedFile = files.file[0];
      } else {
        uploadedFile = files.file;
      }

      if (!uploadedFile) {
        return res.status(400).json({ error: "No file was uploaded" });
      }

      const filePath = uploadedFile.filepath;

      
      return res.status(200).json({ path: filePath });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
