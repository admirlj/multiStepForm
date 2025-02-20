import { stepsConstant } from "../../constants";
import { TextField } from "@mui/material";

export default function Generator({ activeStep, defaultValues }) {

  const getInputByType = (type, inputProps) => {
    switch (type) {
      case "text":
        return <TextField key={inputProps.name} {...inputProps} />;
      case "number":
        return <TextField key={inputProps.name} type="number" {...inputProps} />;
      case "email":
        return <TextField key={inputProps.name} type="email" {...inputProps} />;

      default:
        return <TextField {...inputProps} />;
    }
  };

  return stepsConstant[activeStep].inputs.map((input) => {

    const inputProps = {
      ...input,
      id: input.name,
      defaultValue: defaultValues[input.name] || ""
    };

    const InputElement = getInputByType(input.type, inputProps);

    return InputElement;
  });
}
