import { Button } from "@/components/ui/button";
import React from "react";

function Summery() {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>
        <div className="mt-7">
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary"
            >
              Generate from AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summery;
