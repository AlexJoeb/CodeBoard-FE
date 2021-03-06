import React, { FC, ReactElement } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import * as Yup from "yup";
interface FormValues {
  username: string;
  password: string;
  rememberUser?: boolean;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a username."),
  password: Yup.string().required("Please enter a password."),
});

const Login: FC = (): ReactElement => {
  const [rememberUser, setRememberUser] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
            values = { ...values, rememberUser };
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8">
              <ul className="mb-4">
                {errors.username && touched.username && (
                  <li className="font-bold text-red-400 text-sm">
                    {"• " + errors.username}
                  </li>
                )}
                {errors.password && touched.password && (
                  <li className="font-bold text-red-400 text-sm">
                    {"• " + errors.password}
                  </li>
                )}
              </ul>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    username
                  </label>

                  <Field
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <div className="flex justify-start">
                  <div className="flex items-center mr-4">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      checked={rememberUser}
                      onChange={() => setRememberUser(!rememberUser)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="show_password"
                      name="show_password"
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="show_password"
                      className="ml-2 block text-sm text-gray-900 select-none"
                    >
                      Show password
                    </label>
                  </div>
                </div>
                <div className="flex my-4 justify-start">
                  <div className="text-sm mr-4">
                    <a
                      href="/forgot"
                      className="font-medium text-blue-700 hover:text-blue-800 select-none"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="text-sm">
                    <a
                      href="/register"
                      className="font-medium text-blue-700 hover:text-blue-800 select-none hover:bottom-b-2 hover:border-red-400"
                    >
                      I need an account.
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
