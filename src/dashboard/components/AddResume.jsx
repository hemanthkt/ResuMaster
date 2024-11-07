import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeid: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreateNewResume(data).then(
      (resp) => {
        console.log(resp.data.data.documentId);
        if (resp) {
          setLoading(false);
          navigation(
            "/dashboard/resume/" + resp.data.data.documentId + "/edit"
          );
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div
        className="p-14 
        py-24 border 
        items-center 
        flex justify-center 
        bg-secondary 
        rounded-lg 
        h-[280px] 
        hover:scale-105 
        transition-all 
        hover:shadow-md
        cursor-pointer
        border-dashed"
        // here when the div is clicked a function wakes up makes the setOpenDialog to true
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      {/* when setOpenDialog is true then the openDialop in the state becomes true thus the dialop opens up */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create A New Resume with ResuMaster ✨</DialogTitle>

            <DialogDescription>
              Add a title for your new Resume
            </DialogDescription>
            <Input
              className="mt-2"
              placeholder="eg. Full Stack Developer"
              onChange={(e) => setResumeTitle(e.target.value)}
            />

            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
