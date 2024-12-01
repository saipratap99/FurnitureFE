import React, { useEffect, useState } from "react";
import { getLeads, postLeadsHistory } from "../../../api/leads";
import Toaster from "../../toaster/toaster";

const ViewLeads = () => {
  const [leads, setLeads] = useState<any>([]);
  const [newHistory, setNewHistory] = useState({
    comments: "",
    leadId: "",
    status: "OPEN",
  });
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [toasterColor, setToasterColor] = useState<string>("bg-success");

  // Fetch leads from the backend
  useEffect(() => {
    getLeads().then((data) => {
      setLeads(data);
    });
  }, []);

  // Handle adding new lead history
  const handleAddHistory = async (e: any) => {
    e.preventDefault();

    postLeadsHistory(newHistory.leadId, newHistory)
      .then((data) => {
        const updatedLead = data;
        setLeads((prevLeads: any) =>
          prevLeads.map((lead: any) =>
            lead.id === updatedLead.id ? updatedLead : lead
          )
        );
        setNewHistory({ comments: "", leadId: "", status: "OPEN" });
        setShowToaster(true);
        setToasterMessage("Submitted contact us.");
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      })
      .catch((err) => {
        setShowToaster(true);
        setToasterMessage(err["message"] || JSON.stringify(err));
        // setFormData({ name: "", email: "", subject: "", description: "" });
        setToasterColor("bg-danger");
        setTimeout(() => {
          setShowToaster(false);
        }, 3000);
      });
    try {
      const response = await fetch(`/api/leads/${newHistory.leadId}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comments: newHistory.comments,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
      } else {
        console.error("Failed to add lead history");
      }
    } catch (error) {
      console.error("Error adding lead history:", error);
    }
  };

  return (
    <div className="p-2">
      {showToaster && <Toaster message={toasterMessage} color={toasterColor} />}
      <h1>Leads Management</h1>
      <div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          {leads.map((lead: any) => (
            <div className="d-flex justify-content-between">
              <div key={lead.id}>
                <h2>{lead.contactUs.name}</h2>
                <p>
                  <b>Email:</b> {lead.contactUs.email}
                </p>
                <p>
                  <b>Subject:</b> {lead.contactUs.subject}
                </p>
                <p>
                  <b>Description:</b> {lead.contactUs.description}
                </p>
                <p>
                  <b>Status:</b> {lead.leadStatus}
                </p>
                <p>
                  <b>Next Enquiry Date:</b>{" "}
                  {new Date(lead.nextEnquiryDate).toLocaleDateString()}
                </p>

                <h3>Lead History</h3>
                {lead.leadHistories && lead.leadHistories.length > 0 ? (
                  <ul>
                    {lead.leadHistories.map((history: any) => (
                      <li key={history.id}>
                        <p>{history.comments}</p>
                        <small>
                          {new Date(history.date).toLocaleDateString()}
                        </small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No history available.</p>
                )}
              </div>
              <div className="lead-history-form">
                <h4>Add Lead History</h4>
                <form onSubmit={handleAddHistory}>
                  <div>
                    <textarea
                      placeholder="Add your comments"
                      value={newHistory.comments}
                      onChange={(e) =>
                        setNewHistory({
                          ...newHistory,
                          comments: e.target.value,
                          leadId: lead.id,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                  <div>
                    <select
                      name="status"
                      id=""
                      onChange={(e) => {
                        setNewHistory({
                          ...newHistory,
                          status: e.target.value,
                          leadId: lead.id,
                        });
                      }}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="CLOSED">CLOSED</option>
                      <option value="INTERESTED">INTERESTED</option>
                      <option value="ON_HOLD">ON_HOLD</option>
                      <option value="NOT_INTERESTED">NOT_INTERESTED</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Add History
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewLeads;
