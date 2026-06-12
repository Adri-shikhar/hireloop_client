import { Filter } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const mockApplications = [
  {
    id: 1,
    name: "Sarah Chen",
    job: "Senior Frontend Engineer",
    email: "sarah.chen@email.com",
    status: "New",
    applied: "2 hours ago",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    job: "Product Designer",
    email: "marcus.j@email.com",
    status: "Reviewing",
    applied: "1 day ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    job: "Senior Frontend Engineer",
    email: "emily.r@email.com",
    status: "Shortlisted",
    applied: "3 days ago",
  },
];

export default function ApplicationsPage() {
  return (
    <div>
      <PageHeader
        title="Applications"
        description="Review and manage candidates who applied to your job posts."
        action={
          <button type="button" className="btn-dash-secondary">
            <Filter size={16} />
            Filter
          </button>
        }
      />

      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2>Recent Applications</h2>
          <span className="text-xs text-gray-500">{mockApplications.length} candidates</span>
        </div>
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Email</th>
                <th>Status</th>
                <th>Applied</th>
              </tr>
            </thead>
            <tbody>
              {mockApplications.map((app) => (
                <tr key={app.id}>
                  <td>
                    <span className="font-medium text-white">{app.name}</span>
                  </td>
                  <td className="text-gray-400">{app.job}</td>
                  <td className="text-gray-500">{app.email}</td>
                  <td>
                    <span className="status-badge active">{app.status}</span>
                  </td>
                  <td className="text-gray-500 text-sm">{app.applied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
