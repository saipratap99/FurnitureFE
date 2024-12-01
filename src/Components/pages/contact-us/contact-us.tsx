import { FC, useEffect, useState } from "react";
import "./style.css";
import { postContactUs } from "../../../api/contact-us";
import Toaster from "../../toaster/toaster";
interface ContactUsProps {}

const ContactUsPage: FC<ContactUsProps> = () => {
  const [formData, setFormData] = useState<any>({});
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [toasterColor, setToasterColor] = useState<string>("bg-success");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitContactUs = (e: any) => {
    e.preventDefault();

    console.log("formdata", formData);
    postContactUs(formData)
      .then((data) => {
        console.log("data", data);
        setShowToaster(true);
        setToasterMessage("Submitted contact us.");
        setFormData({ name: "", email: "", subject: "", description: "" });
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
  };
  return (
    <div className="mx-auto my-3 w-50">
      {showToaster && <Toaster message={toasterMessage} color={toasterColor} />}
      <h3 className="text-center">Contact Us</h3>
      <div className="contact-us-form">
        <div className="row">
          <div className="col-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              aria-label="Name"
              value={formData["name"] || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              value={formData["email"] || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Subject</label>
            <input
              type="text"
              name="subject"
              className="form-control"
              id="inputBusinessName"
              placeholder="Subject"
              value={formData["subject"] || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              name="description"
              value={formData["description"] || ""}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 my-3">
            <button
              type="submit"
              className="btn btn-primary w-100 contact-us-submit-btn"
              onClick={submitContactUs}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
