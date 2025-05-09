# MERN Stack Drive Project

## 🚀 Overview

This is a Google Drive-inspired project built using the **MERN Stack** — MongoDB, Express, React, and Node.js. The goal was to create a full-stack web app that allows users to register, log in, upload files, and manage their data securely. This project was a deep dive into connecting frontend and backend, managing sessions, and storing files using BaaS solutions.

---

## 💡 What I Learned (From a Learner's POV)

### 📦 Full Stack Setup — MongoDB, Express, React, Node

* **MongoDB**: Used as a NoSQL database to store user and file metadata. Worked with **MongoDB Compass** to visually interact with collections and JSON-based data.
* **Express + Node.js**: Created clean route structures and separated backend logic into `routes`, `controllers`, and `models`. This helped in scaling the code and keeping things manageable.
* **React**: Built the UI using React with hooks and component-based structure. Designed pages like Login, Signup, Dashboard, and File Upload.

---

### 🔐 Authentication Flow with JWT + HTTP-only Cookies

One of the key challenges (and achievements) was setting up **secure, stateless authentication**:

```
Login → Generate JWT (with userId, email) → Store in HTTP-only cookie →
Cookie manages session → Auth middleware protects routes → Secure, stateless auth ✅
```

* Built custom **auth middleware** that reads the cookie, verifies the token, and allows/blocks access accordingly.
* Used **cookie-parser** for parsing cookies and `jsonwebtoken` for signing and verifying tokens.
* Managed CORS and made sure credentials are included in every request from frontend.

---

### ☁️ File Upload & Storage (Multer + Supabase)

* Used **Multer** to handle file uploads on the backend (`multipart/form-data` requests).
* Uploaded actual files to **Supabase** storage and saved URLs with metadata in MongoDB.
* Learned how to map uploaded files back to the logged-in user via session tokens.

---

### 🧰 Middleware and Tools

* **Built-in**: `express.json()`, `express.urlencoded()`
* **Third-party**: `morgan` for logging, `cookie-parser`, `cors`
* **Custom**: Auth middleware to validate JWTs from cookies

---

### 🎨 UI & Visuals

* Used **Flowbite** (Tailwind CSS components) for faster UI building
* **Remix Icon** for icons
* Learned that while CDNs aren't great for production, they are super useful for quickly testing or learning new tools

---

### 🔄 Example Login Route (Backend)

```js
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  }).json({ msg: "Login success" });
});
```

---

## 🧪 Real Challenges I Faced

* Struggled with `multipart/form-data` and configuring Multer properly
* Faced CORS issues when cookies weren’t being passed
* Debugged issues with missing `credentials: 'include'` in fetch
* Learned to use `.env` files and keep secrets hidden

---

## 📈 Final Thoughts

This project helped me:

* Understand the MERN stack deeply by building a complete app
* Learn how real-world auth and file systems work
* Think like a developer — structure code better, debug problems, and build real features

I’m still learning, but I’ve taken a big step forward with this project. It’s not just about code — it’s about solving problems and learning from mistakes.

---

> "If you're a recruiter or developer checking this out, just know I’m constantly learning, building, breaking, and fixing — and that’s how I grow."

---
