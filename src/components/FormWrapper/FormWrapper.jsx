import { Box, Button, Typography } from "@mui/material";
import { useActionState, useMemo } from "react";
import { cleanValues, getInputsValue } from "../../utils";
import { stepsConstant } from "./constants/index";
import Generator from "./components/Generator/Generator";
import HtmlLayout from "../HtmlLayout";

export default function FormWrapper({
  activeStep,
  steps = [],
  handleReset,
  handleBack,
  isStepOptional,
  handleNext,
  handleSkip,
}) {
  const defaultValues = useMemo(
    () => ({
      personalInformation:
        JSON.parse(cleanValues(localStorage.getItem(stepsConstant[0].name))) ??
        undefined,
      professionalInformation:
        JSON.parse(cleanValues(localStorage.getItem(stepsConstant[1].name))) ??
        undefined,
      additionalInformation:
        JSON.parse(cleanValues(localStorage.getItem(stepsConstant[2].name))) ??
        undefined,
    }),
    []
  );

  const formattedDefaultValues = {
    ...defaultValues.personalInformation,
    ...defaultValues.professionalInformation,
    ...defaultValues.additionalInformation,
  };

  const handleSubmit = async (prevState, formData) => {
    let errors = [];

    const data = getInputsValue(
      stepsConstant[activeStep].inputs,
      stepsConstant[activeStep].name,
      formData
    );

    try {
      await stepsConstant[activeStep].schema.validate(data.inputs, {
        abortEarly: false,
      });

      localStorage.setItem(data.stepName, JSON.stringify(data.inputs));

      handleNext();

      return {
        errors,
        prevEnteredValues: {
          ...formattedDefaultValues,
        },
      };
    } catch (err) {
      errors = err.errors;

      return {
        errors,
        prevEnteredValues: {
          ...data.inputs, // takes current step Inputs that user filled already instead to type all again just fix what error message said
        },
      };
    }
  };

  const [state, actionWrapper, isPending] = useActionState(handleSubmit, {
    errors: [],
    prevEnteredValues: {
      ...formattedDefaultValues,
    },
  });

  const { errors, prevEnteredValues } = state;

  return (
    <Box
      component={"form"}
      sx={{ "& .MuiTextField-root": { m: 1 } }}
      action={actionWrapper}
    >
      {activeStep < stepsConstant.length && (
        <Generator defaultValues={prevEnteredValues} activeStep={activeStep} />
      )}

      {errors.length > 0
        ? errors.map((errorMessage) => (
            <Typography key={errorMessage} variant="body2" color="warning.main">
              ⚠️ {errorMessage}
            </Typography>
          ))
        : null}

      {activeStep === stepsConstant.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <HtmlLayout />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0 || state.errors.length > 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button
              disabled={isPending}
              type={activeStep < 3 ? "submit" : "button"}
            >
              {activeStep < 2 ? "Next" : "Finish"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
