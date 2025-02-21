import * as Yup from "yup";

export const stepsConstant = [
  {
    name: "Personal Information",
    stepId: 0,
    inputs: [
      {
        name: "first-name",
        label: "First Name",
        type: "text",
        required: true,
      },
      {
        name: "last-name",
        label: "Last Name",
        type: "text",
        required: true,
      },
      {
        name: "email",
        label: "E-mail",
        type: "email",
        required: true,
        fullWidth: false,
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        required: true,
        fullWidth: false,
      },
    ],
    schema: Yup.object().shape({
      ["first-name"]: Yup.string().required().min(3),
      ["last-name"]: Yup.string().required().min(3),
      ["email"]: Yup.string().email().required(),
      ["phone"]: Yup.string()
        .matches(
          /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/,
          "Invalid phone number format"
        )
        .required(),
    }),
  },
  {
    name: "Professional Information",
    stepId: 1,
    inputs: [
      {
        name: "tech-field",
        label: "Tech field you are working",
        type: "text",
        required: true,
      },
      {
        name: "experience",
        label: "Experience (in year)",
        type: "number",
        required: true,
      },
    ],
    schema: Yup.object().shape({
      ["tech-field"]: Yup.string().required().min(3),
      ["experience"]: Yup.number().positive().required(),
    }),
  },
  {
    name: "Additional Information",
    stepId: 2,
    inputs: [
      {
        name: "additional",
        label: "Additional info",
        type: "text",
        required: true,
        fullWidth: true,
      },
    ],
    schema: Yup.object().shape({
      ["additional"]: Yup.string().required().min(3),
    }),
  },
];
