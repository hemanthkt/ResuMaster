import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* personal detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo}></PersonalDetailPreview>
      {/* Summery */}
      <SummaryPreview resumeInfo={resumeInfo}></SummaryPreview>
      {/* Proffesional experience */}
      <ExperiencePreview resumeInfo={resumeInfo}></ExperiencePreview>
      {/* educational */}
      <EducationalPreview resumeInfo={resumeInfo}></EducationalPreview>
      {/* Skills */}
      <SkillPreview resumeInfo={resumeInfo}></SkillPreview>
    </div>
  );
}

export default ResumePreview;
