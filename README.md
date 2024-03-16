# News App with React + Vite

## Description

This is a news application built using React and Vite, designed to provide users with up-to-date news articles from multiple sources. The application utilizes APIs from [NewsAPI](https://newsapi.org/), [The Guardian](https://open-platform.theguardian.com/documentation/), and [The New York Times](https://developer.nytimes.com/apis) to fetch news content across various categories.

## Features

- Fetches news articles from multiple sources.
- Allows users to browse news by category, source and date.
- Provides search functionality to find specific articles.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Vite: Next-generation frontend build tool for modern web development.
- NewsAPI: API for fetching news articles from various sources.
- The Guardian API: API for accessing articles from The Guardian newspaper.
- The New York Times API: API for retrieving articles from The New York Times.
- Docker: Platform for developing, shipping, and running applications in containers.

## Installation

1. Clone the repository:
   git clone https://github.com/shahsuvarli/news-app.git

2. Navigate to the project directory:
cd news-app

## Running with Docker

1. Build the Docker image:
   docker build -t news-app:latest .

2. Run the Docker container:
docker run -d -p 5173:5173 news-app

3. Open your browser and navigate to `http://localhost:5173` to view the application running within the Docker container.

## Usage

- Open your browser and navigate to `http://localhost:5173` to view the application.

## Credits

- This application utilizes the APIs provided by NewsAPI, The Guardian, and The New York Times to fetch news content.
