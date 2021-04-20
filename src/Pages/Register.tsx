import React, { FC, ReactElement } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import * as Yup from "yup";

interface FormValues {
  username: string;
  password: string;
  rememberUser?: boolean;
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username has minimum of 3 characters.")
    .max(32, "Username has maximum of 32 characters.")
    .required("Please enter a username."),
  password: Yup.string()
    .min(8, "Password must be between 8 and 32 characters long.")
    .max(32, "Password must be between 8 and 32 characters long.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/,
      "Passwords must contain at least one digit, at least one lower case character, at least one uppercase character, & at least one special character."
    )
    .required("Please enter a password."),
});

const Register: FC = (): ReactElement => {
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
            Register your account
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }: FormikHelpers<FormValues>) => {
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
                  <div className="text-sm">
                    <a
                      href="/login"
                      className="font-medium text-blue-700 hover:text-blue-800 select-none hover:bottom-b-2 hover:border-red-400"
                    >
                      I have an account.
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
