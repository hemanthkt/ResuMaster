import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../../service/AIModal";

const prompt =
  "Job title: {jobTitle} depending on the job title give me  summery for my resume within 4-5 lines in JSON format with field experienceLevel and summery with experience level for fresher, mid-level, experienced";

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    // const result = await AIChatSession.sendMessage(PROMPT);
    // console.log(JSON.parse(result.response.text()));
    // setAiGenerateSummeryList(JSON.parse([result.response.text()]));

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      console.log(JSON.parse(result.response.text()));
      const responseText = await result.response.text();
      const parsedResponse = JSON.parse(responseText);
      setAiGenerateSummeryList(
        Array.isArray(parsedResponse.summaries)
          ? parsedResponse.summaries
          : [parsedResponse.summaries]
      );
    } catch (error) {
      console.error("Error parsing AI response:", error);
      setAiGenerateSummeryList([]);
    }

    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4"></Brain>
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            onChange={(e) => setSummery(e.target.value)}
          ></Textarea>

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experienceLevel}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
