import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "/service/GlobalApi";
import { LoaderCircle } from "lucide-react";
function PersonlDetail({ enabledNext }) {
  const params = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => console.log(params), []);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);

        enabledNext(true);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Presonal Detail</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm" htmlFor="">
              First Name
            </label>
            <Input
              name="firstName"
              required
              onChange={handleInputChange}
            ></Input>
          </div>

          <div>
            <label className="text-sm" htmlFor="">
              Last Name
            </label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
            ></Input>
          </div>

          <div className="col-span-2">
            <label className="text-sm" htmlFor="">
              Job Tile
            </label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
            ></Input>
          </div>
          <div className="col-span-2">
            <label className="text-sm" htmlFor="">
              Address
            </label>
            <Input name="Address" required onChange={handleInputChange}></Input>
          </div>

          <div>
            <label className="text-sm" htmlFor="">
              Phone
            </label>
            <Input name="Phone" required onChange={handleInputChange}></Input>
          </div>

          <div>
            <label className="text-sm" htmlFor="">
              Email
            </label>
            <Input name="Email" required onChange={handleInputChange}></Input>
          </div>

          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonlDetail;
