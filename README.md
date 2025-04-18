# AI-Powered Deadlock Detection System
⚠️ Notice
Previously, we had 22 commits, but encountered a deadlock issue that significantly affected the system's functionality. Despite spending considerable time attempting to resolve the problem, it could not be effectively handled at that stage. As a result, we decided to transition to a new system process.

Additionally, we faced certain backend issues that were not addressed earlier, as our focus had not yet shifted to the system-level implementation. These backend problems have now been identified and will be worked on moving forward.

## Features

- 🔍 Real-time process monitoring
- 🤖 AI-powered deadlock prediction
- 📊 Graph-based deadlock detection
- ⚡ WebSocket-based live updates
- 🎯 Process management capabilities
- 📈 Resource usage tracking
- 🚨 Instant alerts and notifications

## Tech Stack

- **Backend:**
  - FastAPI (Python)
  - Psutil (System monitoring)
  - NetworkX (Graph analysis)
  - Scikit-learn (Machine Learning)
  - WebSockets (Real-time updates)

- **Frontend:** 
  - React.js
  - ShadCN UI
  - Tailwind CSS
  - GSAP animations

## Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd deadlock-detection-system
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

2. The API will be available at `http://localhost:8000`
3. API documentation will be available at `http://localhost:8000/docs`

## API Endpoints

### System Monitoring
- `GET /system/stats` - Get current system statistics
- `GET /system/processes` - List all running processes
- `GET /system/process/{pid}` - Get detailed process information
- `GET /system/deadlocks` - Check for current deadlocks

### Process Management
- `POST /system/process/{pid}/kill` - Kill a specific process
- `POST /system/process/{pid}/restart` - Restart a specific process

### WebSocket
- `WS /ws` - WebSocket endpoint for real-time updates

## Features in Detail

### Deadlock Detection
The system uses a combination of graph-based analysis and machine learning to detect and predict deadlocks:

1. **Graph-based Detection:**
   - Creates a Wait-for Graph (WFG) of processes
   - Detects cycles in the graph using NetworkX
   - Identifies deadlocked processes

2. **AI Prediction:**
   - Uses system metrics as features
   - Predicts likelihood of deadlocks
   - Provides early warnings

### Process Monitoring
- Real-time tracking of CPU usage
- Memory consumption monitoring
- Process status and details
- Resource allocation tracking

### Auto-Resolution
- Automatic deadlock detection
- Suggested resolution steps
- Process management capabilities
- Resource reallocation recommendations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
