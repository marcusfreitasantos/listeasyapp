import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme } from "@/src/global/theme";
import { DynamicForm, DynamicFormFiedls } from "@/src/components/dynamicForm";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("DynamicForm", () => {
  const baseFields: DynamicFormFiedls[] = [
    {
      fieldName: "name",
      iconName: "user",
      placeholder: "Name",
      validationRules: { required: true },
    },
  ];

  it("renders the form title and submit button", () => {
    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <DynamicForm
          formTitle="My Form"
          submitBtnText="Submit"
          formFields={baseFields}
          handleFormData={jest.fn()}
        />
      </ThemeProvider>,
    );

    expect(getByText("My Form")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  it("shows validation error when required field is empty", async () => {
    const handleFormData = jest.fn();

    const { getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <DynamicForm
          submitBtnText="Submit"
          formFields={baseFields}
          handleFormData={handleFormData}
        />
      </ThemeProvider>,
    );

    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(getByText("required_field")).toBeTruthy();
      expect(handleFormData).not.toHaveBeenCalled();
    });
  });

  it("submits values when form is valid", async () => {
    const handleFormData = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={darkTheme}>
        <DynamicForm
          submitBtnText="Submit"
          formFields={baseFields}
          handleFormData={handleFormData}
        />
      </ThemeProvider>,
    );

    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.press(getByText("Submit"));

    await waitFor(() => {
      expect(handleFormData).toHaveBeenCalledWith({ name: "John Doe" });
    });
  });

  it("sanitizes numeric input values", async () => {
    const numericFields: DynamicFormFiedls[] = [
      {
        fieldName: "price",
        iconName: "dollar-sign",
        placeholder: "Price",
        keyboardType: "numeric",
        validationRules: { required: false },
      },
    ];

    const { getByPlaceholderText } = render(
      <ThemeProvider theme={darkTheme}>
        <DynamicForm
          submitBtnText="Submit"
          formFields={numericFields}
          handleFormData={jest.fn()}
        />
      </ThemeProvider>,
    );

    const input = getByPlaceholderText("Price");

    fireEvent.changeText(input, "a1,2..3");

    expect(input.props.value).toBe("12.3");
  });
});
