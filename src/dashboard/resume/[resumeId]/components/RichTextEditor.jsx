import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../../service/AIModal";

const PROMPT =
  "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";

function RichTextEditor({ onRichTextEditorChange, index }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(
      resp
        .replace("[", "")
        .replace("]", "")
        .replace("{", "")
        .replace("}", "")
        .replace("{", "")
        .replace("position_title", "")
        .replace("Full Stack Developer", "")
        .replace("bullet_points", "")
        .replace(":", "")
        .replace(", ", "")
    );
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs" htmlFor="">
          {" "}
          Summery{" "}
        </label>

        <Button
          onClick={() => GenerateSummeryFromAI()}
          type="button"
          variant="outline"
          size="sm"
          className="border-primary text-primary flex gap-2"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        ></Editor>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />

          <Separator />
        </Toolbar>{" "}
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
