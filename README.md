**🌟 Event Dashboard App**

**📖 Overview**

The Event Dashboard App is a React Native-based application with a sleek and user-friendly interface. Users can:

📅 Register for events using their name and ID.

📝 Provide feedback and ⭐ rate events seamlessly.

The app integrates with a mock API for backend operations, ensuring smooth functionality.
**🚀 Getting Started**

🛠 Prerequisites
Before running the project, make sure you have the following installed:

Node.js
React Native environment
json-server for mock API
**📝 Setup Instructions**

Clone the Repository

git clone <repository-url>
cd <project-directory>
Install Dependencies
Run the following command to install the required dependencies:

npm install
Run the Mock API Server
First, find your IP Address:

Open the command prompt and run:

ipconfig
Note your IPv4 Address.
Update your RigesterEvent.js and EventDashboard.js files by replacing the placeholder IP with your own IPv4 Address.

Then, start the server:


json-server --watch db.json --port 3000
Start the React Native Project
Run the following command to start the app:

npm start

**🎨 Features**

Event Registration: Users can register for events with their ID and name.
Feedback System: Submit feedback and rate events to improve future experiences.
Mock API Integration: Handles backend functionality through a local JSON server.
Dynamic Updates: Fetches data dynamically using the user's unique ID.

**📂 Project Structure**

src/components: Contains core components like RigesterEvent.js and EventDashboard.js.
assets: Holds images, icons, or other static assets.
db.json: Mock database file for the JSON server.

**🖥 Usage Tips**

Ensure your local JSON server is running before accessing app features.
If the app doesn't fetch data, recheck your IPv4 Address in the RigesterEvent.js and EventDashboard.js files.

**🤝 Contributing**

Feel free to fork the repository and create pull requests for any improvements!

**🛡 License**


This project is open-source and available under the MIT License.

