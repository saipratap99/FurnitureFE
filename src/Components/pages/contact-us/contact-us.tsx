import { FC } from "react";
import "./style.css";
interface ContactUsProps {}

const ContactUsPage: FC<ContactUsProps> = () => {
  return (
    <div className="mx-auto my-3 w-50">
      <h3 className="text-center">Contact Us</h3>
      <div className="contact-us-form">
        <div className="row">
          <div className="col-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="inputPhone"
              placeholder="Phone Number"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              className="form-control"
              id="inputBusinessName"
              placeholder="Business Name"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="col-6">
            <label className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-6">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              id="inputPincode"
              placeholder="Pincode"
            />
          </div>
          <div className="col-6">
            <label className="form-label">State</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Reason to contact: </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
            ></textarea>
          </div>
          <div className="col-12 my-3">
            <button
              type="submit"
              className="btn btn-primary w-100 contact-us-submit-btn"
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
