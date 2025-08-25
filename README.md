# G&G Online Services

A web application for purchasing data packages, AFA registration, and WAEC checkers.

## Features

- Data bundle purchases for MTN, AirtelTigo, and Telecel
- AFA registration services
- WAEC checker purchases
- Bulk purchase with Excel upload
- User authentication system
- Responsive design for all devices

## Setup Instructions

1. Clone the repository
2. Install dependencies: `cd server && npm install`
3. Start the server: `npm run dev`
4. Open `public/index.html` in your browser

## Deployment

### GitHub Pages (Frontend only)
1. Push your code to GitHub
2. Go to repository settings > Pages
3. Select source: GitHub Actions

### Full Stack Deployment
For full stack deployment including the Express server, consider:
- Heroku
- Vercel
- DigitalOcean
- AWS Elastic Beanstalk

## Environment Variables

Create a `.env` file in the server directory with: