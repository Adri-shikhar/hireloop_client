"use client";

import {
  Modal,
  Select,
  ListBox,
  useOverlayState,
} from "@heroui/react";
import { MapPin, Upload, X } from "lucide-react";

const selectTriggerClass =
  "w-full flex items-center justify-between bg-[#1c1c1e] border border-[#1c1c1e] hover:bg-[#242426] h-[44px] rounded-lg px-3 text-white text-sm outline-none data-[focused=true]:border-[#3f3f46]";

const popoverClass =
  "bg-[#1c1c1e] border border-[#27272a] text-white rounded-lg shadow-xl p-1";

const listItemClass =
  "flex items-center p-2 rounded-md hover:bg-[#27272a] cursor-pointer text-sm text-zinc-300 outline-none data-[focused=true]:bg-[#27272a]";

export default function RegisterCompanyModal({ isOpen, onOpenChange }) {
  const state = useOverlayState({ isOpen, onOpenChange });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal state={state}>
      <Modal.Backdrop variant="blur" className="bg-black/80">
        <Modal.Container size="lg" placement="center">
          <Modal.Dialog className="rd-modal-dialog">
            <div className="rd-modal-header">
              <button
                type="button"
                className="rd-modal-close"
                onClick={() => state.close()}
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <h2>Register New Company</h2>
              <p>Enter your business details to start hiring on HireLoop.</p>
            </div>

            <div className="rd-modal-body">
              <form
                id="register-company-form"
                className="rd-modal-form"
                onSubmit={handleSubmit}
              >
                <div className="rd-field">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    className="rd-input"
                    placeholder="e.g. Acme Corp"
                  />
                </div>

                <div className="rd-field">
                  <label htmlFor="industry">Industry / Category</label>
                  <Select name="industry" defaultSelectedKey="technology">
                    <Select.Trigger id="industry" className={selectTriggerClass}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClass}>
                      <ListBox>
                        <ListBox.Item id="technology" className={listItemClass} textValue="Technology">
                          Technology
                        </ListBox.Item>
                        <ListBox.Item id="finance" className={listItemClass} textValue="Finance">
                          Finance
                        </ListBox.Item>
                        <ListBox.Item id="healthcare" className={listItemClass} textValue="Healthcare">
                          Healthcare
                        </ListBox.Item>
                        <ListBox.Item id="retail" className={listItemClass} textValue="Retail">
                          Retail
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="rd-field">
                  <label htmlFor="website">Website URL</label>
                  <div className="rd-input-group">
                    <span className="rd-input-prefix">https://</span>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      className="rd-input"
                      placeholder="www.company.com"
                    />
                  </div>
                </div>

                <div className="rd-field">
                  <label htmlFor="location">Location</label>
                  <div className="rd-input-icon-wrap">
                    <MapPin />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      className="rd-input"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="rd-field">
                  <label htmlFor="employeeRange">Employee Count Range</label>
                  <Select name="employeeRange" defaultSelectedKey="1-10">
                    <Select.Trigger id="employeeRange" className={selectTriggerClass}>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className={popoverClass}>
                      <ListBox>
                        <ListBox.Item id="1-10" className={listItemClass} textValue="1-10 employees">
                          1-10 employees
                        </ListBox.Item>
                        <ListBox.Item id="11-50" className={listItemClass} textValue="11-50 employees">
                          11-50 employees
                        </ListBox.Item>
                        <ListBox.Item id="51-200" className={listItemClass} textValue="51-200 employees">
                          51-200 employees
                        </ListBox.Item>
                        <ListBox.Item id="201-500" className={listItemClass} textValue="201-500 employees">
                          201-500 employees
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="rd-field">
                  <label>Company Logo</label>
                  <div className="rd-upload">
                    <button type="button" className="rd-upload-btn" aria-label="Upload logo">
                      <Upload size={16} />
                    </button>
                    <div>
                      <div className="rd-upload-text">Upload image</div>
                      <div className="rd-upload-hint">PNG, JPG up to 5MB</div>
                    </div>
                  </div>
                </div>

                <div className="rd-field full-width">
                  <label htmlFor="description">Brief Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="rd-textarea"
                    placeholder="Tell us about your company's mission and culture..."
                    rows={3}
                  />
                </div>
              </form>
            </div>

            <div className="rd-modal-footer">
              <button
                type="button"
                className="rd-btn-cancel"
                onClick={() => state.close()}
              >
                Cancel
              </button>
              <button type="submit" form="register-company-form" className="rd-btn-primary">
                Register Company
              </button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
