import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { Label } from "../ui/label";
import ImageUpload from "./ImageUpload";
import axios from "axios";

export default function EditDialog() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setUsername(currentUser.username);
    setBio(currentUser.bio);
    setCoverImage(currentUser.coverImage);
    setProfileImage(currentUser.profileImage);
  }, [currentUser]);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await axios.patch("/api/edit", {
        id: currentUser.id,
        name,
        bio,
        username,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();
      toast.success("Updated");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [mutateFetchedUser, name, username, bio, coverImage, profileImage]);

  return (
    <Dialog>
      <DialogTrigger className="w-20 rounded-full bg-white text-black font-semibold py-2">
        Edit
      </DialogTrigger>
      <DialogContent className="bg-black overflow-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-white text-2xl">
            Edit your profile
          </DialogTitle>
          <DialogDescription>
            <form className="space-y-3 text-left">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  disabled={loading}
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  id="username"
                  disabled={loading}
                  defaultValue={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  placeholder="Bio"
                  name="bio"
                  id="bio"
                  disabled={loading}
                  defaultValue={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <ImageUpload
                value={coverImage}
                onChange={(image) => setCoverImage(image)}
                label="Cover Image"
                disabled={loading}
              />
              <ImageUpload
                value={profileImage}
                onChange={(image) => setProfileImage(image)}
                label="Profile Image"
                disabled={loading}
              />

              <Button
                type="button"
                disabled={loading}
                className="w-full font-semibold"
                onClick={() => onSubmit()}
              >
                Edit
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
