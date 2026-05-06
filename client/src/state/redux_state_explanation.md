# Redux State Management in Chronos

This document provides a thorough explanation of what exactly `index.ts` and `api.ts` are doing inside the `state` folder, the core concepts behind them, and how they are used inside your frontend React components.

## 1. What Exactly is This? (The Concept)

These files are the backbone of **State Management** for your frontend application. They are built using **Redux Toolkit (RTK)**, which is the modern standard way to write Redux logic. 

In a complex React application, passing data (props) down from parent to child components can get very messy (known as "prop drilling"). Redux solves this by providing a single, centralized "Global Store" that any component can access directly. 

Inside this `state` folder, you are using two distinct features of Redux Toolkit:
1. **Redux Slices (`index.ts`)**: Used for managing global, client-side UI state (like dark mode or sidebar toggles).
2. **RTK Query (`api.ts`)**: Used for data-fetching, caching, and sending data to your server. 

---

## 2. Breaking Down `index.ts` (Global UI State)

The `index.ts` file is responsible for managing simple, synchronous UI state that needs to be accessed globally across your application.

### Concept:
It uses `createSlice` from Redux Toolkit to define a "slice" of the global state. Think of a "slice" as a specific section of your data store. 

### What it does:
- **`initialState`**: Defines the default values when the app first loads (`isSidebarCollapsed: false`, `isDarkMode: true`).
- **`reducers`**: These are functions that dictate *how* the state can change. For example, `setIsDarkMode` takes an action (a true/false payload) and updates the state accordingly.
- **Exports**: It exports the actions (`setIsSidebarCollapsed`, `setIsDarkMode`) so components can trigger them, and the `reducer` itself so it can be plugged into the main Redux store configuration (usually found in an `App.tsx` or `store.ts` file).

---

## 3. Breaking Down `api.ts` (Data Fetching & Caching)

The `api.ts` file acts as the communication layer between your frontend and your backend API. It utilizes **RTK Query** (`createApi`). 

### Concept:
Instead of writing repetitive `useEffect` hooks and `fetch` calls in every component, RTK Query provides a centralized place to define all your API requests. The magic of RTK Query lies in its **Caching mechanism**. When you fetch data, RTK Query stores it in a central cache. If another component needs the same data, the cached version is provided instantly, saving an unnecessary network request.

### What it does:
- **Type Definitions (`interface` & `enum`)**: Provides strict TypeScript types for your database entities (`Project`, `Task`, `User`, etc.), ensuring you don't make typos when accessing properties.
- **`baseQuery` & `fetchBaseQuery`**: Configures how requests are sent. It sets the base URL (e.g., pointing to `:3001` or your production server) and automatically attaches the `Authorization` token to the headers of every request.
- **`endpoints`**: Defines exactly what API routes your app can hit.
  - **Queries (`build.query`)**: Used to *GET* data (e.g., `getProjects`, `getTasks`).
  - **Mutations (`build.mutation`)**: Used to *CREATE, UPDATE, or DELETE* data (e.g., `createProject`, `updateTaskStatus`).
- **Cache Tags (`providesTags` & `invalidatesTags`)**: This is the superpower of RTK Query. When you fetch projects, it tags the cached data as `"Projects"`. When you run a mutation to create a new project, it *invalidates* the `"Projects"` tag. This tells RTK Query, "The projects data is outdated now; go re-fetch it in the background automatically."
- **Auto-generated Hooks**: At the very bottom, it exports custom React hooks like `useGetProjectsQuery`. RTK Query creates these automatically based on the names of your endpoints!

---

## 4. How We Use Them in Frontend Components

Here is how these two concepts translate into real-world usage in your `.tsx` components.

### A. Using `index.ts` (Client UI State)
To use the global slice, you use two standard React-Redux hooks: `useSelector` (to read) and `useDispatch` (to write).

```tsx
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode } from "@/state"; // importing from index.ts

const Navbar = () => {
  const dispatch = useDispatch();
  
  // 1. Reading the state
  // We look into the global store to see if dark mode is active
  const isDarkMode = useSelector((state: any) => state.global.isDarkMode);

  // 2. Modifying the state
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};
```

### B. Using `api.ts` (API Data Fetching)
To get data from your backend, you simply import the auto-generated hook. 

```tsx
import { useGetProjectsQuery, useCreateProjectMutation } from "@/state/api";

const ProjectList = () => {
  // 1. Fetching Data using query
  // Notice how it gives you 'data', 'isLoading', and 'error' out of the box!
  const { data: projects, isLoading, error } = useGetProjectsQuery();

  // 2. Mutating Data
  // Trigger function, and status properties
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error fetching projects</div>;

  const handleCreate = async () => {
    await createProject({ name: "New Project", description: "Hello World" });
    // Because of the tag invalidation in api.ts, the list of projects 
    // will AUTOMATICALLY refresh on the screen after creation!
  };

  return (
    <div>
      <button onClick={handleCreate} disabled={isCreating}>Create Project</button>
      <ul>
        {projects?.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

## Summary
- **`index.ts`** = Client-side UI memory (Sidebar toggles, themes). Uses `useSelector` / `useDispatch`.
- **`api.ts`** = Server-side data fetching and caching (Tasks, Projects, Users). Replaces manual `fetch` calls with automated, caching-powered React hooks.
