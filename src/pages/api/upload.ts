import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const uploadsDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const form = formidable({
    uploadDir: uploadsDir,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { files } = await parseForm(req);
      
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
      console.log("File uploaded to:", filePath);

      return res.status(200).json({ path: filePath });
    } catch (error) {
      console.error("Error while parsing form:", error);
      return res.status(500).json({ error: "Failed to process the file" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
