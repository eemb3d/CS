# Technical Exercise
Technical Exercise for the role of Software Developer - Companies House 
Keyargs:
 - Node.js
 - REST APIs
 - Docker (and Docker Compose)
 - Microservices

## Overview
The exercise requires to implement a service that will retrieve data stored for the games endpoints. There are two parts to the exercise. 
REQUIRED:
 - Complete part one to the best of your ability before investing time into part two.
    - PART 1 -> Service 1
    - PART 2 -> Service 2
 - Use Node.
 - Include README with brief instructions on how to compile and run it. 
 - Use GIT. 

### Microservices
Retrieve data about games.
 - No UI
 
 - BackEnd NodeJS
    - REST API GATEWAY

    - Service 1 (endpoint1: http://localhost:8080/games/<game_id>)
        - Retrieve single game info by game_id
        - Use the data file located at https://gist.github.com/divya051988/191e42740b1bbc545e2e441337aa1228
        - All dates are stored as time since the epoch and need to be converted to the readable format yyy-mm-dd (i.e. <12423423453> SHOULD BE returned as 2011-01-20)
        - Example http://localhost:8080/games/1 SHOULD RETURN:
            ```
            {
            "title": "Uncharted 4",
                "description": "For the first time ever in Uncharted history, drive vehicles during gameplay",
                "by": "Sony",
                "platform": ["PS4"],
                "age_rating": "16",
                "likes": 100,
                "comments": [{
                    "user": "bob",
                    "message": "Cracking game far too much cinematic",
                    "dateCreated": "2011-01-03",
                    "like": 6
                }, {
                    "user": "testingPriest",
                    "message": "Not enough shooting for me,far too easy ",
                    "dateCreated": "2011-04-02",
                    "like": 5
                }]
            }
            ```
        
    - Service 2 (endpoint2: http://localhost:8080/games/report)
        - Retrieve summary of the games.
        - This report will need to return:
            - The user who has added the most comments across all games
            - The game with the highest sum of likes
            - The average likes per game (rounded up to the nearest integer)
        - Result: The output should look like the data file located at https://gist.github.com/divya051988/cfe18cbd24bbeec62eb2444ff55f3c34
            ```
            {
            "user_with_most_comments": "Alison",
            "highest_rated_game": "Uncharted 4",
            "average_likes_per_game": [{
                    "title": "Call of Duty, Infinite Warfare",
                    "average_likes": 4,
                }, {
                    "title": "Uncharted 4",
                    "average_likes": 7,
                }] 
            }
            ```
        - Note: We have different options to implement service-two logic:
            - Fetch ALL the data from the service-one and find the answear. But is costly, inneficent, time consuming not a solution.
            - Put, Post and Delete should be sent on both services and in service-two we should maintaine the data for each key object. But we have to sync data
            between both services, probably a diff between IDs commit and readjust them (TBD).

## Setup

```sh
# Download the project 
git clone https://github.com/eemb3d/CS.git .

# Modify .env in each directory
mv .env.example .env

# Install dependencies in each directory
npm install

# In the main directory
docker-compose up

```

## TODO
- Major features (best practices)
 - ADD Ticket Managemnt (Jenkins, READMINE, Bamboo ...)
 - ADD DBMS
 - ADD Logs Management
 - ADD Tests offline
 