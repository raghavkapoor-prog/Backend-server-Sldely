# Slidely Backend Server

## Setup Instructions

1. **Clone the repository:**
```bash
git clone <repository_url>
cd slidely_backend




### Install dependencies:

npm install

####Run the server:

npx tsc
node dist/server.js


####Endpoints
/ping: A GET request that always returns True.
/submit: A POST request with parameters name, email, phone, github_link, stopwatch_time.
/read: A GET request with query parameter index to read the (index+1)th form submission.


