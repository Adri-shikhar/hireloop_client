"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, TextField, Label, Input, Description, FieldError } from "@heroui/react";
import { submitApplication } from "@/lib/actions/applications";

export default function JobApply({ job, applicant }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    resumeLink: "",
    portfolioLink: "",
    additionalNotes: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.resumeLink.trim()) {
      setError("Resume link is required.");
      return;
    }

    setSubmitting(true);

    const submissionData = {
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      companyName: job?.companyName,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      jobType: job?.jobType,
      isRemote: job?.isRemote,
      status: "Applied",
      ...formData,
    };

    try {
      const res = await submitApplication(submissionData);
      if (res?.insertedId) {
        router.push("/dashboard/seeker/applications");
        router.refresh();
        return;
      }
      setError("Could not submit application. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-zinc-800 bg-[#1c1c1e] text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600";

  return (
    <div className="form-card">
      <div className="form-card-header">
        <h1>Apply for {job?.jobTitle || "this position"}</h1>
        <p className="text-zinc-400 text-sm mt-1">
          {job?.companyName || "Company"} · Applying as {applicant?.name || applicant?.email}
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <TextField isRequired name="resumeLink" className="w-full">
          <Label className="text-sm font-medium text-zinc-400 mb-1.5 block">Resume link</Label>
          <Input
            type="url"
            name="resumeLink"
            placeholder="https://drive.google.com/..."
            value={formData.resumeLink}
            onChange={handleChange}
            className={inputClass}
          />
          <Description className="text-xs text-zinc-500 mt-1">
            Public link to your resume (Google Drive, Dropbox, etc.)
          </Description>
          <FieldError className="text-xs text-red-400 mt-1" />
        </TextField>

        <TextField name="portfolioLink" className="w-full">
          <Label className="text-sm font-medium text-zinc-400 mb-1.5 block">
            Portfolio / website <span className="text-zinc-600">(optional)</span>
          </Label>
          <Input
            type="url"
            name="portfolioLink"
            placeholder="https://yourportfolio.com"
            value={formData.portfolioLink}
            onChange={handleChange}
            className={inputClass}
          />
        </TextField>

        <div className="w-full">
          <Label className="text-sm font-medium text-zinc-400 mb-1.5 block">
            Cover letter / notes <span className="text-zinc-600">(optional)</span>
          </Label>
          <textarea
            name="additionalNotes"
            rows={4}
            placeholder="Tell the hiring team why you are a great fit..."
            value={formData.additionalNotes}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
          <Button
            type="button"
            variant="bordered"
            className="border-zinc-800 text-zinc-300"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isDisabled={submitting}
            className="bg-white text-black font-semibold"
          >
            {submitting ? "Submitting..." : "Submit application"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
