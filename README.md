This is a personal portfolio application built in React to centralize and track all projects in a single, structured system. It serves primarily as a tool for reflection and long-term aggregation of work, while also providing potential contractors with a clear overview of technical experience and project history. The platform is designed to act as a stable foundation for future career growth, emphasizing scalability and maintainability.

The application features a statistics page alongside a card-based project interface, where each project can be opened through client-side routing using react-router-dom. Project data is structured to allow consistent presentation and easy extension as new work is added. State management is handled with Zustand where shared state is required, keeping global logic minimal and predictable.

The system is built modularly with transferable components to ensure that new projects can be integrated with minimal structural changes. A Three.js world is embedded directly into the application, demonstrating interactive 3D integration within the React environment.

The project is built with Vite and deployed on a Linux server using Docker for containerization. Traffic is proxied through Traefik with a custom DNS domain configuration. The application is accessible at “liamhwilliams.com”
