import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("details updated");
      },
      (error) => {
        setLoading(false);
        toast("details error");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Educational Experience</h2>
      <p>Add your educational details</p>

      <div>
        {educationalList?.map((item, index) => (
          <div>
            <div>
              <div className="grid grid-cols-2 gap-2 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label htmlFor="">University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                </div>
                <div>
                  <label htmlFor="">Degree</label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                </div>

                <div>
                  <label htmlFor="">Major</label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                </div>

                <div>
                  <label htmlFor="">Star-tDate</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                </div>

                <div>
                  <label htmlFor="">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                  ></Input>
                </div>

                <div>
                  <label htmlFor="">Description</label>
                  <Textarea
                    className="col-span-2s"
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                  ></Textarea>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <div className="gap-2">
            <Button
              variant="outine"
              onClick={AddNewEducation}
              className="text-primary"
            >
              + Add More Education
            </Button>

            <Button
              variant="outine"
              onClick={RemoveEducation}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
