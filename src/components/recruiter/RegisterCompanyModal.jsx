"use client";

import { useState } from "react";
import { Modal, Select, ListBox, useOverlayState } from "@heroui/react";
import { MapPin, Upload, X, Loader2, Check } from "lucide-react";

const selectTriggerClass = "w-full flex items-center justify-between bg-[#1c1c1e] border border-[#1c1c1e] hover:bg-[#242426] h-[44px] rounded-lg px-3 text-white text-sm outline-none data-[focused=true]:border-[#3f3f46]";
const popoverClass = "bg-[#1c1c1e] border border-[#27272a] text-white rounded-lg shadow-xl p-1";
const listItemClass = "flex items-center p-2 rounded-md hover:bg-[#27272a] cursor-pointer text-sm text-zinc-300 outline-none data-[focused=true]:bg-[#27272a]";

const industries = ["Technology", "Finance", "Healthcare", "Retail"];
const employeeRanges = ["1-10", "11-50", "51-200", "201-500"];

export default function RegisterCompanyModal({ isOpen, onOpenChange }) {
  const state = useOverlayState({ isOpen, onOpenChange });
  const [isUploading, setIsUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be 5MB or smaller.");
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        setUploadError(data.error?.message || "Upload failed. Please try again.");
        console.error("ImgBB Upload Failed:", data);
      }
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Add the uploaded logo URL to the form data submission
    if (logoUrl) formData.append("logoUrl", logoUrl);
    
    // Proceed with your backend submission here
    console.log(Object.fromEntries(formData));
  };

  return (
    <Modal state={state}>
      <Modal.Backdrop variant="blur" className="bg-black/80">
        <Modal.Container size="lg" placement="center">
          <Modal.Dialog className="rd-modal-dialog">
            
            <div className="rd-modal-header">
              <button type="button" className="rd-modal-close" onClick={() => state.close()} aria-label="Close">
                <X size={18} />
              </button>
              <h2>Register New Company</h2>
              <p>Enter your business details to start hiring on HireLoop.</p>
            </div>

            <div className="rd-modal-body">
              <form id="register-company-form" className="rd-modal-form" onSubmit={handleSubmit}>
                
                <div className="rd-field">
                  <label htmlFor="companyName">Company Name</label>
                  <input id="companyName" name="companyName" type="text" className="rd-input" placeholder="e.g. Acme Corp" required />
                </div>

                <div className="rd-field">
                  <label htmlFor="industry">Industry / Category</label>
                  <Select name="industry" defaultSelectedKey={industries[0].toLowerCase()}>
                    <Select.Trigger id="industry" className={selectTriggerClass}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClass}>
                      <ListBox>
                        {industries.map((ind) => (
                          <ListBox.Item key={ind.toLowerCase()} id={ind.toLowerCase()} className={listItemClass} textValue={ind}>
                            {ind}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="rd-field">
                  <label htmlFor="website">Website URL</label>
                  <div className="rd-input-group">
                    <span className="rd-input-prefix">https://</span>
                    <input id="website" name="website" type="text" className="rd-input" placeholder="www.company.com" />
                  </div>
                </div>

                <div className="rd-field">
                  <label htmlFor="location">Location</label>
                  <div className="rd-input-icon-wrap">
                    <MapPin />
                    <input id="location" name="location" type="text" className="rd-input" placeholder="City, Country" />
                  </div>
                </div>

                <div className="rd-field">
                  <label htmlFor="employeeRange">Employee Count Range</label>
                  <Select name="employeeRange" defaultSelectedKey={employeeRanges[0]}>
                    <Select.Trigger id="employeeRange" className={selectTriggerClass}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClass}>
                      <ListBox>
                        {employeeRanges.map((range) => (
                          <ListBox.Item key={range} id={range} className={listItemClass} textValue={`${range} employees`}>
                            {range} employees
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="rd-field">
                  <label>Company Logo</label>
                  <div className="rd-upload relative overflow-hidden">
                    {/* Hidden file input wrapped inside a label for easy triggering */}
                    <input 
                      type="file" 
                      id="logo-upload" 
                      accept="image/png, image/jpeg" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      onChange={handleFileUpload} 
                      disabled={isUploading}
                    />
                    <div className="rd-upload-btn flex items-center justify-center">
                      {isUploading ? <Loader2 size={16} className="animate-spin" /> : logoUrl ? <Check size={16} className="text-green-500" /> : <Upload size={16} />}
                    </div>
                    <div>
                      <div className="rd-upload-text">
                        {isUploading ? "Uploading..." : logoUrl ? "Upload successful!" : "Upload image"}
                      </div>
                      <div className={`rd-upload-hint${uploadError ? " text-red-400" : ""}`}>
                        {uploadError || (logoUrl ? "Click to replace" : "PNG, JPG up to 5MB")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rd-field full-width">
                  <label htmlFor="description">Brief Description</label>
                  <textarea id="description" name="description" className="rd-textarea" placeholder="Tell us about your company's mission and culture..." rows={3} />
                </div>

              </form>
            </div>

            <div className="rd-modal-footer">
              <button type="button" className="rd-btn-cancel" onClick={() => state.close()}>Cancel</button>
              <button type="submit" form="register-company-form" className="rd-btn-primary" disabled={isUploading}>
                Register Company
              </button>
            </div>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}