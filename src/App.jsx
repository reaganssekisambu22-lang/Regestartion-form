import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    age: "",
    portfolio: "",
    track: "",
  });
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    // Validation rules
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format.";
    if (!form.phone.trim()) errs.phone = "Phone is required.";
    
    if (!form.date) errs.date = "Date is required.";
    else if (new Date(form.date) < new Date().setHours(0,0,0,0)) errs.date = "Date cannot be in the past.";
    
    const ageNum = Number(form.age);
    if (!form.age) errs.age = "Age is required.";
    else if (ageNum < 16 || ageNum > 100) errs.age = "Age must be between 16 and 100.";
    
    if (!form.portfolio.trim()) errs.portfolio = "Portfolio URL is required.";
    else if (!form.portfolio.startsWith("http")) errs.portfolio = "URL must start with http:// or https://";
    
    if (!form.track) errs.track = "Please choose a track.";

    // Stop if there are errors
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setSuccess("");
      return;
    }

    // Success: Add item, clear form
    setItems((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    setForm({ name: "", email: "", phone: "", date: "", age: "", portfolio: "", track: "" });
    setErrors({});
    setSuccess("✅ Registration successful!");
  };

  return (
    <main>
      <h1>Workshop Registration</h1>
      
      <form onSubmit={handleSubmit} noValidate>
        <label>Full Name
          <input type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>Email
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>Phone
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>

        <label>Date
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}
        </label>

        <label>Age
          <input type="number" name="age" value={form.age} onChange={handleChange} />
          {errors.age && <span className="error">{errors.age}</span>}
        </label>

        <label>Portfolio URL
          <input type="url" name="portfolio" value={form.portfolio} onChange={handleChange} />
          {errors.portfolio && <span className="error">{errors.portfolio}</span>}
        </label>

        <label>Track
          <select name="track" value={form.track} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">UI/UX Design</option>
          </select>
          {errors.track && <span className="error">{errors.track}</span>}
        </label>

        <button type="submit">Register</button>
        {success && <p className="success">{success}</p>}
      </form>

      <h2>Registrations ({items.length})</h2>
      <div className="grid">
        {items.map((i) => (
          <article className="card" key={i.id}>
            <strong>{i.name}</strong> ({i.track}) <br/>
            {i.email} <br/>
            <button onClick={() => handleRemove(i.id)}>Remove</button>
          </article>
        ))}
      </div>
    </main>
  );
}