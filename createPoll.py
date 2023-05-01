import os
import requests
# Example API implementation for Poll Creation
headers = {
    'content-type': 'application/json',
    'api-key': os.getenv('API_KEY', 'HNGR8T9R3M4QMSMMF0H1B4XJQ44N'),
}

json_data = {
  "question": "Do you foresee the occurrence of another earthquake in Turkey within the next 2 years?",
  "data": {
    "meta": "Custom data"
  },
  "identifier": "0000000000001",
  "options": [
    {
      "text": "Yes",
      "data": {}
    },
    {
      "text": "No",
      "data": {}
    }

  ]
}

# Post the JSON Request to the API
response = requests.post('https://api.pollsapi.com/v1/create/poll', headers=headers, json=json_data)

print(response) # In case of success, we receive the code 200.