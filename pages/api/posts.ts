import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import axios from "axios";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  body: z.string().min(10, "Body must be at least 10 characters long"),
});

type Data = {
  message: string;
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const parsedBody = postSchema.parse(req.body);

      const { title, body } = parsedBody;

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      res
        .status(200)
        .json({ message: "Post created successfully", ...response.data });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        res
          .status(400)
          .json({ message: "Validation failed", error: error.issues });
      } else if (axios.isAxiosError(error)) {
        // Handle Axios errors
        res.status(error.response?.status || 500).json({
          message: "Failed to create post",
          error: error.response?.data || error.message,
        });
      } else {
        // Handle other errors
        res.status(500).json({
          message: "Failed to create post",
          error: (error as any).message,
        });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
