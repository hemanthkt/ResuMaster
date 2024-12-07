import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const [experinceList, setExperinceList] = useState([formField]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const handleChange = (index, event) => {
    // creates a shallow copy of the existing list of experiences. This is crucial in React to avoid directly mutating the state.
    const newEntries = experinceList.slice();
    // destructures the name and value from the input element that triggered the event.
    const { name, value } = event.target;
    //  updates the specific entry in the copied list.
    newEntries[index][name] = value;
    // updates the state with the modified list of experiences.
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experinceList.slice();
    newEntries[index][name] = e.target.value;
    setExperinceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experinceList,
    });
    console.log(experinceList);
  }, [experinceList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Proffesional Experience</h2>
      <p>Add your Previous job experience</p>
      <div>
        {experinceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="title"
                  onChange={(event) => handleChange(index, event)}
                ></Input>
              </div>

              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                ></Input>
              </div>

              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                ></Input>
              </div>

              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                ></Input>
              </div>

              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                ></Input>
              </div>

              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleChange(index, event)}
                ></Input>
              </div>

              <div className="col-span-2">
                {/* {work summary} */}
                <RichTextEditor
                  index={index}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummery", index)
                  }
                ></RichTextEditor>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="gap-2">
          <Button
            variant="outine"
            onClick={AddNewExperience}
            className="text-primary"
          >
            + Add More Experience
          </Button>

          <Button
            variant="outine"
            onClick={RemoveExperience}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
