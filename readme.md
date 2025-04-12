# 🎥 Assistir com você

**Assistir com você!** started as an anime streaming platform but has naturally evolved into a rich anime catalog experience. The original goal of streaming episodes had to be re-evaluated due to copyright concerns—streaming copyrighted content directly from APIs can violate legal guidelines. Instead, the project now focuses on delivering a sleek, interactive interface where users can discover, explore, and interact with a wide range of anime titles.

---

## How It Works

The project consists of a **React.js** frontend that communicates with two key APIs:

### 1. **[Jikan API](https://jikan.moe/)**
- A public, unofficial MyAnimeList API.
- Powers all anime data: titles, covers, genres, trailers, episode counts, and more.

### 2. **Custom NestJS API**
- Handles core user functionalities:
  - User **registration**
  - **Login** and **JWT-based authentication**
  - **Session management**
  - Additional endpoints to support user-specific features (e.g., favorites, user profiles, etc.)

---

## User Experience

Once authenticated, users are redirected to the main interface:

- **Infinite Scroll**: Seamlessly loads additional anime cards as the user scrolls, leveraging pagination.
- **Anime Detail Pages**: Clicking on an anime card opens a detailed view with:
  - Title & synopsis
  - Official trailer (if available)
  - Episode count & average duration
  - Genre and category tags for filtering and exploration

---

## Planned Features & Future Vision

I’m exploring integration with a **scene recognition API** that identifies anime scenes from uploaded images. This could lead to powerful new features, such as:

- Uploading a screenshot to discover which anime it belongs to
- Advanced search capabilities based on visual inputs
- More intelligent anime recommendations based on visual themes

---

## Tech Stack

| Layer         | Technology          |
|---------------|---------------------|
| Frontend      | React.js            |
| Backend       | NestJS (Node.js)    |
| Data Source   | Jikan API           |
| Auth System   | JWT (JSON Web Token)|

---

## Final Notes

> This project is a work in progress and a personal learning journey. It aims to balance the excitement of anime discovery with clean code architecture and respect for copyright law.

Contributions, feedback, or suggestions are always welcome! 🚀

## Next Steps

This project have plans of using TraceMoe API to find animes.
To make it possible, we shall need to find similar images and cross requests to have a bigger precision because it is not possible to be 100% confident with TraceMoe results yet.