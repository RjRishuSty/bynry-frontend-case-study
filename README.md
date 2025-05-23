# bynry-frontend-case-study

A responsive and user-friendly React application to display, manage, and explore user profiles with integrated mapping features using external map services.

🚧 Work in Progress:
This project is currently under active development. Features are being iteratively added and refined to enhance functionality, performance, and user experience.
---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **State Management:** Redux Toolkit + React Redux
- **Routing:** React Router DOM
- **HTTP Requests:** Axios
- **Mapping:** Leaflet + React Leaflet + MapTiler
- **UI Framework:** Material-UI (MUI)
- **Deployment:** (Specify if deployed)

---

## 🔑 Key Features

### 1. Profile Display
- List of user profiles showing name, photo, and short description using styled cards.

### 2. Interactive Mapping
- Interactive maps integrated using **Leaflet** and **MapTiler**.
- Dynamically displays user addresses.

### 3. Summary Button with Map
- Each profile includes a "Summary" button.
- On click, the map opens with a marker for the selected address.

### 4. Admin Panel (Profile Management)
- Add, edit, or delete profiles via an admin dashboard.
- Utilizes Redux Toolkit for state updates.

### 5. Search and Filter
- Search and filter profiles by name, location, or other parameters.

### 6. Profile Details View
- Click a profile to open a detailed view with full info including contact and interests.

### 7. Responsive Design
- Fully mobile-optimized and responsive for all device sizes.

### 8. Error Handling
- Graceful handling of invalid addresses and API/map errors.

### 9. Loading Indicators
- Spinners and progress bars provide feedback during data loading and map rendering.

---

## 📦 Installation

```bash
git clone https://github.com/RjRishuSty/bynry-frontend-case-study.git
cd profile-mapper
npm install