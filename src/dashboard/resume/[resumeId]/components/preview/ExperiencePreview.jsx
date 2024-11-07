import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professtional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            style={{
              color: resumeInfo?.themeColor,
            }}
            className="text-sm font-bold"
          >
            {experience?.title}
          </h2>
          <div className="text-xs flex justify-between">
            <h2>
              {experience?.companyName},{experience?.city},{experience?.state}
            </h2>
            <span>
              {experience?.startDate},
              {experience?.currentlyWorking
                ? "present"
                : experience?.currentDate}
            </span>
          </div>
          <p className="text-xs my-2">{experience.workSummery}</p>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
