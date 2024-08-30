// api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    // Handle the file as needed
    res.status(200).json({ message: 'File uploaded successfully', files });
  });
}
