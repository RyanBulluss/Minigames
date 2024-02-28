import { useState } from "react";
import * as usersService from "../utilities/users-service";

export default function LoginForm({ setUser, setLogin }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      console.log(user);
      setUser(user);
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Log In</h1>
      <div className="form-container">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-[60vmin]"
        >
          <div className="h-64 flex justify-center flex-col">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="bg-[#F67F00] w-32 mx-auto mt-4" type="submit">
            LOG IN
          </button>
          <p className="text-center">or</p>
          <button className="" onClick={() => setLogin((login) => !login)}>
            {"Sign up"}
          </button>
          <p className="error-message text-center">&nbsp;{error}</p>
        </form>
      </div>
    </div>
  );
}
