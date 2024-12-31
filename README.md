# Drag and Drop

This project can be run in a Docker Container. Follow these steps to set it up locally:

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Extract the source code zip and navigate to the source code directory in your terminal.

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
