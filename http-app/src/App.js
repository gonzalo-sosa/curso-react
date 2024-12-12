import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);

    const posts = [post, ...this.state.posts];

    this.setState({ posts });
    toast(`Post "${post.title}" created successfully!`);
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    const { data } = await http.put(config.apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.findIndex((post) => post.id === data.id);
    if (index) posts[index] = { ...post };

    this.setState({ posts });
  };

  handleDelete = async (post) => {
    /* Pessimistic Update */
    // await axios.delete(config.apiEndpoint + "/" + post.id);

    // const posts = this.state.posts.filter((p) => p.id !== post.id);
    // this.setState({ posts });

    /* Optimistic Update */
    const originalPost = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(config.apiEndpoint + "/" + post.id);
      // throw new Error(""); // Para probar el caso en que falle
    } catch (error) {
      // Expected (404: not found, 400: bad request) - CLIENT ERRORS
      //  - Display a specific error message

      // Unexpected (network down,  server down, database down, bug)
      //  - Log them
      //  - Display a generic and friendly error message
      if (error.response && error.response.status === 404)
        toast.error("This post has already been deleted.");

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
