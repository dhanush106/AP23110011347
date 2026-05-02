const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaGFudXNzaF9zYXJwcG9yQHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNDgxMSwiaWF0IjoxNzc3NzAzOTExLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTY4MWI4YWMtZWM4OC00MWI5LWFmZmQtYWUyNDgyNjZhZmJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGhhbnVzc2ggc2hyZWthciBzYXJwb29yIiwic3ViIjoiMDY4ZDQyMDUtZDQ1Ny00NjcwLWEyZDQtNTc0MjE3ZWI5NWY0In0sImVtYWlsIjoiZGhhbnVzc2hfc2FycHBvckBzcm1hcC5lZHUuaW4iLCJuYW1lIjoiZGhhbnVzc2ggc2hyZWthciBzYXJwb29yIiwicm9sbE5vIjoiYXAyMzExMDAxMTM0NyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjA2OGQ0MjA1LWQ0NTctNDY3MC1hMmQ0LTU3NDIxN2ViOTVmNCIsImNsaWVudFNlY3JldCI6IndFZGhyQnlnRmVzTmZ2bW4ifQ.a6Y3sRY1qVFrCPOXq3uJloJjpDhHYUy0Qyam9nU9yW4";
const LOG_API = "http://20.207.122.201/evaluation-service/logs";

const validStacks = ["frontend", "backend"];
const validLevels = ["debug", "info", "warn", "error", "fatal"];
const validFrontendPackages = ["api", "component", "hook", "page", "state", "style"];
const validCommonPackages = ["auth", "config", "middleware", "utils"];


const Log = async (stack, level, pkg, message) => {
  try {
    if (!validStacks.includes(stack)) {
      throw new Error("Invalid stack value");
    }

    if (!validLevels.includes(level)) {
      throw new Error("Invalid level value");
    }

    if (
      stack === "frontend" &&
      ![...validFrontendPackages, ...validCommonPackages].includes(pkg)
    ) {
      throw new Error("Invalid package for frontend");
    }
    
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Logging Error:", error.message);
  }
};

export default Log;