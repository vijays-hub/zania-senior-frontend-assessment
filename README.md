# Drag and Drop

The app is built purely on the frontend since I am being interviewed for a frontend position. Even though I am a full-stack developer, my main strength lies in the frontend. Hence, I have worked only on the frontend aspects. I have used `msw` for mocking requests as suggested in the instructions.

---

## A Couple of Clarifications on My Decisions During Development:

1. I chose not to use Next.js for the setup, opting instead for Create React App (CRA) to keep things straightforward and focused. While CRA is no longer the recommended approach for new projects, it allowed me to quickly set up the application without adding unnecessary complexity.

2. I removed tests from the initial setup to prioritize simplicity for this assignment but am happy to include tests if needed. Similarly, I did not configure Webpack for this project but can do so as part of the assignment if required.

3. Since the application doesn’t require extensive styling, I decided to use plain CSS instead of relying on frameworks, preprocessors, or PostCSS.

4. I opted for react-dnd over react-beautiful-dnd primarily due to the smaller bundle size, which I think aligns with the project's simplicity considerations.

5. You might notice some npm audit warnings for a couple of packages, as I relied on CRA for setting up the React project. These warnings shouldn’t be a concern since this app is not intended for production. Please feel free to ignore them for the time being. With modern methods of setting up React projects, such audit issues can typically be avoided.

---

## Clarification needed:

Regarding Part 5 of the assignment ("Write some simple documentation that makes it easy for us to understand and use it. Also write a little about how you approached the architectural / API design for the problem"), as a frontend-focused developer, should I primarily address the frontend architectural design? Or would you like me to provide insights into the API design as well?

---

---

# LOCAL SETUP

This project can be run in a Docker Container. Follow these steps to set it up locally:

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Extract the source code zip and navigate to the source code directory in your terminal. (If you need access to my Git repository, please let me know. It's currently private, but I can grant access.)

2. Start the application using Docker compose

```sh
docker-compose up
```

Once this is successful, the application should be available at [http://localhost:3000](http://localhost:3000).

## Development

If you want to make further tweaks to the current app, feel free to do so.

- The application supports hot-reloading, so any changes you make to the files in the `src` directory will automatically reflect in the browser
- To stop the application, press `Ctrl+C` in the terminal where docker-compose is running.
- To remove the container, run:

```sh
docker-compose down
```

## Troubleshooting

Should you have any issues with the setup, try rebuilding the Docker Image:

```sh
docker-compose down
docker-compose build --no-cache
docker-compose up
```

If things are still out of hand, please drop a mail to [vijayskumar82@gmail.com](mailto:vijayskumar82@gmail.com) and I will be happy to
assist!

---

---

### My thought process:

When I first approached this project, my initial focus was on breaking it down into manageable pieces rather than getting overwhelmed by all the requirements at once. I started with what I knew would be the foundation - setting up a clean React project structure and planning out the component hierarchy.

The first challenge was the card grid system, and I intentionally chose to implement it with CSS Grid rather than a third-party library. While something like react-grid-layout might have given me drag-and-drop functionality out of the box, I wanted more control over the exact behavior and styling. Now that I think about it, this decision gave me a better understanding of the underlying mechanics, though it did mean spending some time on the drag-and-drop implementation.

As part of the above, For state management, I had to think carefully about the best approach. While the app started with simple mock data, I needed a reliable way to handle state changes. I considered using Redux or React Context, but both seemed like overkill for our straightforward needs. Since we needed to mock a server and sync document data from the browser, I felt that localStorage could handle our current requirements effectively. However, I recognize this isn't the most robust and secure solution as the app scales - a proper state management system would definitely be recommended for future growth. I chose to keep things simple for now to meet the immediate requirements while leaving room for future improvements.

The auto-sync feature required careful consideration, especially around edge cases. While implementing the basic sync was straightforward, I had to think through scenarios like sync failures and avoiding unnecessary updates. Since I was using browser storage, I kept the error handling simple - just a try-catch block with error logging for monitoring purposes. I considered implementing retry logic but decided against it since browser storage operations are generally reliable. In a production environment, we'd definitely want more robust error handling, but for this use case, I wanted to avoid over-engineering.

As far as the sync is concerned, I used useRef to track the last sync state (avoiding unnecessary re-renders) and useEffect to monitor document changes. I used each document's position as a unique identifier to detect changes, only triggering the 5-second sync when the order actually changed. This took some trial and error to get right, but things worked out well in the end.

For document thumbnails, I chose to use the WebP format instead of conventional PNGs or JPEGs to optimize image loading performance. Since our app was relatively simple with minimal routing, I didn't implement lazy loading / code-splitting for the main modules - it would have added unnecessary complexity. For the same reason, I skipped setting up Webpack as our build tool, as it felt like overkill for our straightforward needs!

While I considered accessibility and security, I kept their implementation minimal given our app's current scope. With few navigable elements and no form inputs, we had limited exposure to common vulnerabilities like XSS or click-jacking. Additionally, since we were using a mock server within the app, CSRF protection wasn't necessary as well for this implementation. But if we were to scale this up by allowing addition / deletion of documents we should ideally consider measures for security, along with proper accessibility.

At first it all seemed to be very simple requirements, however, they turned into something interesting while building the real application. In every step, I found myself in situations very much like those in production environments, like, from state management approach to performance optimizations, security/accessibility practices etc. It definitely made me realize that even the requirements that seem most obvious require lots of thought to come at a maintainable and robust solution. This exercise was definitely an excellent opportunity to not only showcase my technical skills but also to practice the kind of thoughtful decision-making that’s essential in professional development. 6 hours well spent! 😄⚡️
