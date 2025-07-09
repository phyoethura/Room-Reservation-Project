# 🏨 Room Reservation Project

This project is a web-based Room Reservation System developed by 3rd-year students at Mae Fah Luang University (MFU) in 2023.

It supports 3 types of users:
- **Staff**
- **Teacher (Lecturer/Approver)**
- **Student**

---

## 👥 Project Members

- [Mr. Phyo Thura](https://github.com/phyoethura) — 6431501173 (MFU-ID)
- Mr. Salai David Poi Hlan — 6431501174 (MFU-ID)
- Mr. Watcharapol Suphasri — 6431501105 (MFU-ID)
- Miss Panchaya Rueangsri — 6431501140 (MFU-ID)
- Mr. Natchapat Netdee — 6431501130 (MFU-ID)
- Mr. Sappawat Songbanchong — 6431501120 (MFU-ID)
- [Miss Paing Phyo Su](https://github.com/paiphyohsu) — 6431501172 (MFU-ID)

---

## 👨‍💼 Features by User Role

### 🧑‍💼 Staff
- Login
- Browse room list
- Add, edit, disable rooms
- Dashboard
- View reservation history
- Logout

### 👩‍🏫 Teacher (Lecturer/Approver)
- Login
- Browse room list
- View booking requests
- Approve/Reject room requests
- Dashboard
- View reservation history
- Logout

### 👨‍🎓 Student
- Login
- Browse room list
- Book rooms
- Check booking status
- Logout

---

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [XAMPP](https://www.apachefriends.org/) installed

### Steps
1. Clone or download this repository into your working directory.
2. Run the following commands:
   ```bash
   npm install
   npm init -y
   ```
3. Start XAMPP (Apache & MySQL).
4. Import `test.sql` into your MySQL database using phpMyAdmin.
5. Run the project:
   ```bash
   node proj
   ```

> 📌 **Note:** Passwords in the database are **bcrypt-hashed**. Use the following credentials to log in:

| Role     | MFU-ID      | Password | Description   |
|----------|-------------|----------|----------------|
| Staff    | 6431501173  | 1111     | Role 1         |
| Lecturer | 6431501140  | 2222     | Role 2         |
| Student  | 6431501174  | 3333     | Role 3         |

---

## 🎨 Design Prototype

View the full UI/UX design in Figma:  
🔗 [Figma Design – Web Project](https://www.figma.com/design/a53WWrsvlVSjISxE2lszQS/Web-Project?node-id=0-1&t=0BhN2sxA3Ta3nGLT-1)

---

## 🖼️ Project Screenshots

### 🔐 Authentication

**Homepage**  
![Homepage](images/homepage.png)

**Register Page**  
![Register](images/register.png)

**Login Page**  
![Login](images/login.png)

---

### 👨‍🎓 Student UI

**Home Page**  
![Student Homepage](images/student/homepage.png)

**Booking Popup**  
![Booking Popup](images/student/bookpopup.png)

**Booking Success**  
![Booking Success](images/student/success.png)

**Check Booking Request**  
![Check Request](images/student/checkrequest.png)

**Profile**  
![Student Profile](images/student/profile.png)

---

### 👩‍💼 Staff UI

**Homepage**  
![Staff Homepage](images/staff/homepage.png)

**Manage Rooms (Add/Edit/Delete)**  
![Manage Rooms](images/staff/manage.png)

**Add Room Popup**  
![Add Room](images/staff/popupAdd.png)

**Dashboard**  
![Staff Dashboard](images/staff/dashboard.png)

**History**  
![Staff History](images/staff/history.png)

**Profile**  
![Staff Profile](images/staff/profile.png)

---

### 👩‍🏫 Lecturer UI

**Homepage**  
![Lecturer Homepage](images/lec/homepage.png)

**Request Page**  
![Request Page](images/lec/request.png)

**Request Check Popup**  
![Request Check](images/lec/requestcheck.png)

**Dashboard**  
![Lecturer Dashboard](images/lec/dashboard.png)

**History**  
![Lecturer History](images/lec/history.png)

**Profile**  
![Lecturer Profile](images/lec/profile.png)
