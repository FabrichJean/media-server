# Media Storage Server

Independent media storage server for serving local videos and images.

## Requirements

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and fill in the values.

| Variable            | Description                                   | Example                 |
| ------------------- | --------------------------------------------- | ----------------------- |
| `NODE_ENV`          | Environment                                   | `development`           |
| `PORT`              | HTTP port                                     | `4000`                  |
| `HOST`              | Bind address                                  | `0.0.0.0`               |
| `MEDIA_VIDEOS_PATH` | Absolute path to the videos directory         | `D:/videos`             |
| `MEDIA_IMAGES_PATH` | Absolute path to the images directory         | `D:/images`             |
| `MEDIA_PUBLIC_URL`  | Public base URL of this server                | `http://localhost:4000` |
| `API_KEY`           | Secret for management APIs (`x-api-key`)      | `openssl rand -hex 32`  |
| `MAX_AGE`           | Cache-Control max-age in seconds              | `86400`                 |

Paths are never hardcoded: the same code runs with `D:/videos` on Windows
or `/data/media/videos` on Linux, only `.env` changes.

Both storage directories must exist, otherwise the server refuses to start.

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## Endpoints

### Health

```http
GET /health
```

### Videos

```http
GET /files/videos/:filename
```

Supports HTTP Range requests (seeking in video players).

### Images

```http
GET /files/images/:filename
```

## Example

If `MEDIA_VIDEOS_PATH=D:/videos` and `D:/videos/demo.mp4` exists:

```text
http://localhost:4000/files/videos/demo.mp4
```

If `MEDIA_IMAGES_PATH=D:/images` and `D:/images/avatar.jpg` exists:

```text
http://localhost:4000/files/images/avatar.jpg
```
