import { NextResponse } from "next/server";
import { ImgurClient } from "imgur";
import formidable from "formidable";
import { IncomingMessage, ServerResponse } from "http";
export async function POST(request: IncomingMessage, response: ServerResponse) {
  try {
    const form = new formidable.IncomingForm();
    form.parse(request, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        const response = new NextResponse("Form parsing failed.", {
          status: 500,
        });
        return response;
      }

      const imageFile = files.image;

      console.log('imageFile', imageFile)

      if (!imageFile) {
        return NextResponse.json({
          status: 400,
          msg: "No files were uploaded",
        });
      }

      const client = new ImgurClient({
        clientId: process.env.NEXT_PUBLIC_IMGUR_APP_ID,
        clientSecret: process.env.IMGUR_SECRET,
      });

    /*   const response = await client.upload({
        image: imageFile,
        type: "stream",
      }); */
    });
  } catch (error) {
    console.error("File upload error:", error);
    const response = new NextResponse("File upload failed.", { status: 500 });
    return response;
  }
}
