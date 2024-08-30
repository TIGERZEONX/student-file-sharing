// api/upload.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Handle file upload logic here
      res.status(200).json({ message: 'File uploaded successfully' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  