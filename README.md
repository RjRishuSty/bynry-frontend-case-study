# 🌐 Profile Mapper

**Profile Mapper** is an interactive and responsive web application that allows companies to manage and visualize employee profiles with map integration.

## 📝 Description

Profile Mapper is designed for companies to monitor and manage their team members effectively. The homepage showcases all employees in card format. Each card includes:

- A **"Summary"** button – shows basic info like name, email, location, and description.
- A **"View Details"** button – opens a detailed view including all profile information and a live **map location** using Leaflet.

The app also includes an **Admin Panel** where authorized users can **add**, **edit**, or **delete** employee profiles. Users can switch between **light and dark themes** for a personalized experience.

---

## 🚀 Live Demo

🔗 [Visit the App on Vercel](https://bynry-frontend-case-study-ten.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **UI Framework**: Material UI with Icons
- **Styling**: Emotion + Fontsource (Nunito)
- **State Management**: Redux Toolkit + React Redux
- **Routing**: React Router DOM
- **HTTP Requests**: Axios
- **Mapping**: Leaflet + React Leaflet + MapTiler
- **Notifications**: Notistack
- **Deployment**: Vercel

---

## 🔑 Key Features

1. **Profile Display**  
   Clean, card-based display of employee profiles with name, photo, and short description.

2. **Interactive Mapping**  
   Live maps integrated with Leaflet and MapTiler to pinpoint user addresses.

3. **Summary Button with Map**  
   Opens basic info and map view for each profile.

4. **Admin Panel (Profile Management)**  
   Admin can add, update, or delete employee profiles.

5. **Search and Filter**  
   Search by name, location, or other criteria.

6. **Profile Details View**  
   Full profile info including address, contact, and more.

7. **Dark Mode / Light Mode**  
   Theme toggle for a customizable UI.

8. **Responsive Design**  
   Optimized for all devices and screen sizes.

9. **Error Handling**  
   Graceful handling of invalid addresses and map/API errors.

10. **Loading Indicators**  
    Spinners and loaders for seamless user experience.

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/RjRishuSty/bynry-frontend-case-study.git

# Navigate into the directory
cd bynry-frontend-case-study

# Install dependencies
npm install

# Start the development server
npm start
