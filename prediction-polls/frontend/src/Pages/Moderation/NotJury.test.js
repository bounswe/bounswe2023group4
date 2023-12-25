import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Moderation from './index.jsx';


// Mock API response for moderator posts
const mockModeratorPosts = [
    {
        "request_id": 0,
        "request_type": "discrete",
        "poll": {
            "id": 0,
            "question": "Which country will win Eurovision this year?",
            "tags": [
                "eurovision", "music"
            ],
            "creatorName": "string",
            "creatorUsername": "string",
            "creatorImage": "string",
            "pollType": "string",
            "closingDate": "string",
            "rejectVotes": "string",
            "isOpen": true,
            "cont_poll_type": "string",
            "comments": [
                {
                    "id": 0,
                    "content": "string"
                }
            ],
            "options": [
                {
                    "id": 0,
                    "choice_text": "string",
                    "poll_id": 0,
                    "voter_count": 0
                }
            ]
        }
    }
    ,
    {
        "request_id": 0,
        "request_type": "report",
        "poll": {
            "id": 0,
            "question": "When will the protests in France end?",
            "tags": [
                "France", "Politics"
            ],
            "creatorName": "string",
            "creatorUsername": "string",
            "creatorImage": "string",
            "pollType": "string",
            "closingDate": "string",
            "rejectVotes": "string",
            "isOpen": true,
            "cont_poll_type": "string",
            "comments": [
                {
                    "id": 0,
                    "content": "string"
                }
            ],
            "options": [
                {
                    "id": 0,
                    "choice_text": "string",
                    "poll_id": 0,
                    "voter_count": 0
                }
            ]
        }
    }
];
  
  // Mock API response for tags
  const tags = [
    { topic: 'topic1', isSelected: 0 },
    { topic: 'topic2', isSelected: 1 },
    { topic: 'topic3', isSelected: 1 },
  ];


describe('Moderation', () => {
    test('renders the moderator view correctly', async () => { 
        render(
            <MemoryRouter>
              <Moderation tags={tags} moderatorPosts={mockModeratorPosts} prevTags={tags} />
            </MemoryRouter>
        );

        
    });
});