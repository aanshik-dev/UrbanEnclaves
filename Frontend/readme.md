`Delete this file when you start working,`

The Entire backend is to be implemented in this folder

Follow the steps to collaborate on gitHub.

<br>

## 🐦‍🔥 1. The Branching Strategy (Crucial)

Never push code directly to the main branch. This keeps the "production" code stable. Instead, use a Feature Branch workflow:

- Main Branch: The stable, working version of the project.
- Feature Branches: Each member creates a new branch for a specific task (e.g., frontend-login-ui, backend-api-auth, db-schema-setup).

<br>

## 🐦‍🔥 2. The Collaborative Workflow

Each time someone starts working, they should follow these steps:

⚡`Pull the latest changes:` Ensure your local machine has the most recent code from the team.

```bash
git checkout main
git pull origin main
```

⚡ `Create a new branch:`

```bash
git checkout -b feature/your-task-name
```

⚡ `Code and Commit:` Work inside your specific folder (frontend, backend, etc.).

```bash
git add .
git commit -m "Add: functional login form"
```

⚡ `Push to GitHub:`

```bash
git push origin feature/your-task-name
```

<br>

## 🐦‍🔥 3. Pull Requests (PRs) & Code Review

Once you push your branch, go to GitHub and open a Pull Request.

- This asks the team to "merge" your code into the main branch.

- The other team members should look at your code, leave comments, and eventually "Approve" it.

- The DB person should especially review backend PRs that affect how data is fetched.
