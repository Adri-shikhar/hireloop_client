"use client";
import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  Switch,
  Button,
  toast,
} from "@heroui/react";
import { Globe } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";
import "@/components/recruiter/shared/forms.css";

export default function PostJobForm({ recruiter, company }) {
  const [isRemote, setIsRemote] = useState(false);
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!jobCategory) newErrors.jobCategory = "Job category is required";
    if (!jobType) newErrors.jobType = "Job type is required";
    if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
    if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
    if (!isRemote && !data.location)
      newErrors.location = "Location is required for non-remote roles";
    if (!data.deadline) newErrors.deadline = "Application deadline is required";
    if (!data.responsibilities)
      newErrors.responsibilities = "Responsibilities are required";
    if (!data.requirements)
      newErrors.requirements = "Requirements are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      jobTitle: data.jobTitle,
      jobCategory,
      jobType,
      minSalary: Number(data.minSalary),
      maxSalary: Number(data.maxSalary),
      currency,
      location: isRemote ? "Remote" : data.location,
      deadline: data.deadline,
      responsibilities: data.responsibilities,
      requirements: data.requirements,
      benefits: data.benefits || "",
      isRemote,
      status: "active",
      isPubliclyVisible: true,
      recruiterId: recruiter?.id,
      companyId: company?._id ? String(company._id) : undefined,
      companyName: company?.name,
      companyLogo: company?.logo,
    };

    try {
      const response = await createJob(payload);

      if (response?.insertedId) {
        toast.success("Job posted successfully!");
        e.target.reset();
        setIsRemote(false);
        setJobCategory("");
        setJobType("");
        setCurrency("USD");
        router.push("/dashboard/recruiter/jobs");
        router.refresh();
      } else {
        toast.error(response?.error || "Failed to post the job. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred while saving the job.");
    }
  };

  // Dark styles styled to match your reference layout
  const textInputClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
  const textAreaClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

  const selectBoxClass = "w-full";
  const triggerClasses =
    "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600 data-[invalid=true]:border-danger";
  const popoverClasses =
    "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";
  const listItemClasses =
    "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="form-card">
        {/* Form Header block */}
        <div className="form-card-header">
          <h1 className="text-2xl font-semibold tracking-tight">
            Post a New Job
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Fill out the details below to publish your open position.
          </p>
        </div>

        {/* Hero UI Main Form Handler */}
        <Form
          onSubmit={handleSubmit}
          className="space-y-8"
          validationErrors={errors}
          validationBehavior="aria"
        >
          {/* SECTION 1: Job Information */}
          <Fieldset className="space-y-6 w-full">
            <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
              Job Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                name="jobTitle"
                isInvalid={!!errors.jobTitle}
                className="flex flex-col gap-1 w-full"
              >
                <Label className="text-zinc-400 font-medium text-sm">
                  Job Title
                </Label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  className={textInputClass}
                />
                {errors.jobTitle && (
                  <FieldError className="text-xs text-danger mt-1">
                    {errors.jobTitle}
                  </FieldError>
                )}
              </TextField>

              <Select
                className={selectBoxClass}
                name="jobCategory"
                selectedKey={jobCategory || null}
                onSelectionChange={(key) => setJobCategory(String(key))}
                isInvalid={!!errors.jobCategory}
              >
                <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                  Job Category
                </Label>
                <Select.Trigger className={triggerClasses}>
                  <Select.Value className="text-white placeholder:text-zinc-600" />
                  <Select.Indicator />
                </Select.Trigger>
                {errors.jobCategory && (
                  <span className="text-xs text-danger mt-1">
                    {errors.jobCategory}
                  </span>
                )}
                <Select.Popover className={popoverClasses}>
                  <ListBox className="outline-none">
                    <ListBox.Item
                      id="technology"
                      className={listItemClasses}
                      textValue="Technology"
                    >
                      Technology
                    </ListBox.Item>
                    <ListBox.Item
                      id="design"
                      className={listItemClasses}
                      textValue="Design"
                    >
                      Design
                    </ListBox.Item>
                    <ListBox.Item
                      id="marketing"
                      className={listItemClasses}
                      textValue="Marketing"
                    >
                      Marketing
                    </ListBox.Item>
                    <ListBox.Item
                      id="sales"
                      className={listItemClasses}
                      textValue="Sales"
                    >
                      Sales
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                className={selectBoxClass}
                name="jobType"
                selectedKey={jobType || null}
                onSelectionChange={(key) => setJobType(String(key))}
                isInvalid={!!errors.jobType}
              >
                <Label className="text-zinc-400 font-medium text-sm mb-1 block">
                  Job Type
                </Label>
                <Select.Trigger className={triggerClasses}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                {errors.jobType && (
                  <span className="text-xs text-danger mt-1">
                    {errors.jobType}
                  </span>
                )}
                <Select.Popover className={popoverClasses}>
                  <ListBox className="outline-none">
                    <ListBox.Item
                      id="full-time"
                      className={listItemClasses}
                      textValue="Full-time"
                    >
                      Full-time
                    </ListBox.Item>
                    <ListBox.Item
                      id="part-time"
                      className={listItemClasses}
                      textValue="Part-time"
                    >
                      Part-time
                    </ListBox.Item>
                    <ListBox.Item
                      id="contract"
                      className={listItemClasses}
                      textValue="Contract"
                    >
                      Contract
                    </ListBox.Item>
                    <ListBox.Item
                      id="internship"
                      className={listItemClasses}
                      textValue="Internship"
                    >
                      Internship
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Inline layout grouping for Salary and Currency mapping */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-1">
                  <span className="text-zinc-400 font-medium text-sm block">
                    Salary Range
                  </span>
                  <div className="flex gap-2">
                    <TextField
                      name="minSalary"
                      isInvalid={!!errors.minSalary}
                      className="w-full"
                    >
                      <Label className="sr-only">Minimum salary</Label>
                      <Input
                        placeholder="Min"
                        type="number"
                        className={textInputClass}
                      />
                    </TextField>
                    <TextField
                      name="maxSalary"
                      isInvalid={!!errors.maxSalary}
                      className="w-full"
                    >
                      <Label className="sr-only">Maximum salary</Label>
                      <Input
                        placeholder="Max"
                        type="number"
                        className={textInputClass}
                      />
                    </TextField>
                  </div>
                </div>

                <Select
                  className="w-full mt-6"
                  name="currency"
                  selectedKey={currency}
                  onSelectionChange={(key) => setCurrency(String(key))}
                >
                  <Label className="sr-only">Currency</Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox className="outline-none">
                      <ListBox.Item
                        id="USD"
                        className={listItemClasses}
                        textValue="USD"
                      >
                        USD ($)
                      </ListBox.Item>
                      <ListBox.Item
                        id="EUR"
                        className={listItemClasses}
                        textValue="EUR"
                      >
                        EUR (€)
                      </ListBox.Item>
                      <ListBox.Item
                        id="GBP"
                        className={listItemClasses}
                        textValue="GBP"
                      >
                        GBP (£)
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-zinc-400 font-medium text-sm">
                    Location
                  </span>

                  {/* Switch Configuration */}
                  <Switch
                    isSelected={isRemote}
                    onChange={setIsRemote}
                    size="sm"
                  >
                    <Switch.Control className="bg-zinc-800 data-[selected=true]:bg-white">
                      <Switch.Thumb className="bg-zinc-400 data-[selected=true]:bg-black" />
                    </Switch.Control>
                    <Switch.Content>
                      <Label className="text-xs text-zinc-400 font-medium">
                        Remote
                      </Label>
                    </Switch.Content>
                  </Switch>
                </div>

                <TextField
                  name="location"
                  isInvalid={!isRemote && !!errors.location}
                  className="flex flex-col gap-1 w-full relative"
                >
                  <Label className="sr-only">Location</Label>
                  <div className="relative flex items-center">
                    <Globe
                      size={16}
                      className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                    />
                    <Input
                      placeholder={
                        isRemote ? "Global / Remote" : "e.g. Austin, TX"
                      }
                      disabled={isRemote}
                      className={`${textInputClass} pl-10`}
                    />
                  </div>
                  {!isRemote && errors.location && (
                    <FieldError className="text-xs text-danger mt-1">
                      {errors.location}
                    </FieldError>
                  )}
                </TextField>
              </div>

              <TextField
                name="deadline"
                isInvalid={!!errors.deadline}
                className="flex flex-col gap-1 w-full"
              >
                <Label className="text-zinc-400 font-medium text-sm">
                  Application Deadline
                </Label>
                <Input type="date" className={textInputClass} />
                {errors.deadline && (
                  <FieldError className="text-xs text-danger mt-1">
                    {errors.deadline}
                  </FieldError>
                )}
              </TextField>
            </div>
          </Fieldset>

          {/* SECTION 2: Job Description */}
          <Fieldset className="space-y-6 w-full">
            <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
              Job Details & Description
            </legend>

            <TextField
              name="responsibilities"
              isInvalid={!!errors.responsibilities}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Responsibilities
              </Label>
              <TextArea
                placeholder="Outline the core everyday responsibilities for this role..."
                rows={4}
                className={textAreaClass}
              />
              {errors.responsibilities && (
                <FieldError className="text-xs text-danger mt-1">
                  {errors.responsibilities}
                </FieldError>
              )}
            </TextField>

            <TextField
              name="requirements"
              isInvalid={!!errors.requirements}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-sm">
                Requirements
              </Label>
              <TextArea
                placeholder="List required experience, skills, and certifications..."
                rows={4}
                className={textAreaClass}
              />
              {errors.requirements && (
                <FieldError className="text-xs text-danger mt-1">
                  {errors.requirements}
                </FieldError>
              )}
            </TextField>

            <TextField name="benefits" className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-400 font-medium text-sm">
                Benefits (Optional)
              </Label>
              <TextArea
                placeholder="Perks, healthcare, equity, remote stipends..."
                rows={3}
                className={textAreaClass}
              />
            </TextField>
          </Fieldset>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
            <Button
              type="button"
              variant="bordered"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
              onClick={() => router.push("/dashboard/recruiter/jobs")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
            >
              Post Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
