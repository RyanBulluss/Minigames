import { Component } from "react";
import { signUp } from "../utilities/users-service";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      console.log(formData);
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Sign Up</h1>
        <div className="form-container ">
          <form autoComplete="off" onSubmit={this.handleSubmit} className="flex flex-col w-[60vmin]">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button className="bg-[#F67F00] w-32 mx-auto mt-4" type="submit" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        or
        <button className="" onClick={() => this.props.setLogin(login => !login)}>
        {"Log in"}
      </button>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
