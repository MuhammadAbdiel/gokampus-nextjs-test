import { useState } from "react";
import PostLayout from "../layout";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { Button } from "src/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputForm from "src/components/InputForm";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json();
      if (response.ok) {
        setTitle("");
        setBody("");
        setResponseMessage(data.message);
        router.replace("/posts");
      }
      setResponseMessage({
        message: data.message,
        error: data.error,
      });
    } catch (error) {
      setResponseMessage("Error creating post");
    }
  };

  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>

      <PostLayout>
        <h1 className="text-2xl font-bold mb-4 text-white">Create Post</h1>
        {responseMessage && (
          <Alert
            variant={`${responseMessage?.error ? "destructive" : "default"}`}
          >
            <AlertTitle>{responseMessage?.message}</AlertTitle>
            <AlertDescription>
              {responseMessage?.error && (
                <>
                  {responseMessage?.error.map((err: any) => (
                    <p key={err.code}>{err.message}</p>
                  ))}
                </>
              )}
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <InputForm name="title" setName={setTitle} />
          <InputForm name="body" setName={setBody} />
          <Link href="/posts">
            <Button variant="destructive">Back</Button>
          </Link>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 font-semibold ms-2"
          >
            Submit
          </Button>
        </form>
      </PostLayout>
    </>
  );
};

export default CreatePost;
