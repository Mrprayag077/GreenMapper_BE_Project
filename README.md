# Project Title

GreenMapper: An AI-Driven Initiative for Aerial Tree Mapping, Maintaining Environmental Balance

## Overview

Develop a software solution for efficient tree mapping, counting, and analysis. The software should identify low-density tree zones, provide tree species recommendations based on weather conditions and location, and facilitate collaboration with NGOs for targeted tree planting initiatives.

![Screenshot 1](readme/1.png)

Our platform is like a bridge between people and NGOs, making it effortless for everyone to contribute to our environment. When users log in, they'll see a map showing areas with lots of trees (green zones) and areas that need more trees (red zones). We've used machine learning-based object detection models to count trees accurately, so users know their efforts make a real difference. Users can also find nearby tree planting events posted by NGO's. When users join these events and contribute, they earn badges and certificates, showcasing their impact. For NGOs, we offer real-time updates about local tree conditions, empowering them to plan drives strategically. NGOs can even team up for more impactful drives. NGO’s can create post for upcoming tree plantation drives for driving individuals. Our platform fosters collaboration, making sure every tree planted counts. Together, we're creating a greener, healthier world, one tree at a time. This holistic approach ensures a dynamic environmental conservation effort, collaboration, and impactful tree planting initiatives.

![Screenshot 2](readme/2.png)

## Tech Stack

| PART               | TECHNOLOGIES                                                 |
| :----------------- | :----------------------------------------------------------- |
| `Client`           | **Html, Ejs, LeafLet.js, Chart.js, MapBox**                  |
| `Server`           | Node.js, MVC, Mongoose, Speech2Text, Chart.js, Mongodb-Atlas |
| `API's`            | Earth Api, Crop-monitoring Api                               |
| `Machine Learning` | Python, Yolvo V5                                             |
| `Data Strcture`    | Spatial grid for indexing                                    |

## Live Satellite Data Collection (Puppeteer.js)

We have created a web bot from the ground up by utilizing the capabilities of Node.js and the Puppeteer.js package. Our data collecting system is based on this creative bot, which allows us to download high-quality satellite photos from the internet. Every single 640x640 pixel photograph painstakingly captures an area of 0.22 square kilometers. This thorough approach to data collection serves as the cornerstone of our extensive tree mapping project and guarantees the accuracy and applicability of our information.

![Screenshot 2](readme/3.png)

## Gamification Approach

By actively participating in the project and completing different activities, users can earn different badges that represent their contributions and accomplishments. Our platform’s unique approach to certification is what makes it unique. Users can proudly display the badges they have earned on their profiles. This credential is a great asset for any future ambitions, schooling, or professional chances, in addition to being a testimonial to their dedication. Thus, our gamification approach amplifies the impact of our joint efforts for a healthier, greener world by rewarding active involvement and transforming each user into a respected advocate for change.

![Screenshot 2](readme/4.png)
