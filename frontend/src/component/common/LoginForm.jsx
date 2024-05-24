import React from "react";
function LoginForm({Auth, OnUsernameChange, OnPasswordChange }) {
  return (
    <div>
      <div className="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          UserName:
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            name="userName"
            onChange={ e => OnUsernameChange(e)}
            value={Auth.userName}
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          Password:
        </label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            name="password"
            onChange={e => OnPasswordChange(e)}
            value={Auth.password}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-8 d-flex">
          <p className="text-secondary" style={{ marginTop: 7 }}>
            Do not have an account?{" "}
          </p>
          <a className="btn text-info">register here</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
