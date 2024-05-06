import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import LoginDialog from "../layout/LoginDialog";
import RegisterDialog from "../layout/RegisterDialog";
import UserAvatar from "../UserAvatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import usePost from "@/hooks/usePost";

interface PostFormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

export default function Form({
  placeholder,
  isComment,
  postId,
}: PostFormProps) {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const url = isComment ? `/api/comment?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      const mssg = isComment ? "Comment Success." : "Success Create Tweet";
      toast.success(mssg);
      setBody("");
      mutatePost();
      mutatePosts();
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [body, setLoading]);

  return (
    <div className="border-b border-b-neutral-800 p-5">
      {currentUser ? (
        <div>
          <div className="flex items-center flex-row gap-4">
            <UserAvatar userId={currentUser.id} />
            <Input
              className="block"
              disabled={loading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
            />
          </div>
          <div className="mt-2 flex flex-row justify-end">
            <Button
              className="rounded-full custom-btn"
              disabled={loading || !body}
              onClick={onSubmit}
            >
              Tweet
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center">
          <h1 className="text-2xl text-center font-bold">Welcome to Twitter</h1>
          <div className="flex justify-center gap-2">
            <LoginDialog>
              <div className="custom-btn cursor-pointer text-center">Login</div>
            </LoginDialog>
            <RegisterDialog>
              <div className="custom-btn cursor-pointer text-center">
                Register
              </div>
            </RegisterDialog>
          </div>
        </div>
      )}
    </div>
  );
}
