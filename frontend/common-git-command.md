````markdown
# Common GitHub Commands for Frontend Development

## 1. Set Up and Configuration

### Clone an existing GitHub repository

```bash
git clone https://github.com/username/repo-name.git
```

**Example:**

```bash
git clone https://github.com/facebook/react.git
```

### Set your user info (one-time setup per machine)
```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
````

---

## 2. Basic Workflow Example

### Create a new feature branch

The below code allows you to create a new branch and at the same time enter that branch.

```bash
git checkout -b feature/login-form
```

To change between branches

```bash
git checkout <the-branch-name>
```

Example

```bash
git checkout main
```

### Make changes and commit

```bash
git add .
git commit -m "Add login form with validation"
```

### Push the new branch to GitHub

```bash
git push -u origin feature/login-form
```

---

## 3. Updating and Syncing

### Pull the latest changes from the main branch

```bash
git pull origin main
```

### Fetch all changes (without merging)

```bash
git fetch
```

```
```
