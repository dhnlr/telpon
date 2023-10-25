import { useState } from "react";

import { Contact } from "../../types";
import {
  styContactFormButton,
  styContactFormContainer,
  styContactFormContent,
  styContactFormContentPhoneContainer,
  styContactFormContentPhoneContent,
} from "./style";
import { useMutation, useQuery } from "@apollo/client";
import { CONTACT_LIST, CREATE_CONTACT } from "../../helpers/graphql/queries";

const nameRegex = /^[A-Za-z]+$/;
const phoneRegex = /^(\d+)$/;

interface ContactFormProps {
  contact?: Contact;
  handleBack: () => void;
}

function ContactForm({ contact, handleBack }: ContactFormProps) {
  const [firstNameField, setFirstNameField] = useState<{
    value: string;
    error: string | null;
  }>({ value: "", error: null });
  const [lastNameField, setLastNameField] = useState<{
    value: string;
    error: string | null;
  }>({ value: "", error: null });
  const [phoneField, setPhoneField] = useState<
    { number: string; error: string | null }[]
  >([{ number: "", error: "" }]);
  const [submitError, setSubmitError] = useState("");

  const { refetch: getContact } = useQuery(CONTACT_LIST, { skip: true });
  const [createContact] = useMutation(CREATE_CONTACT, {
    refetchQueries: [CONTACT_LIST, "GetContactList"],
    onError: (err) => {
      setSubmitError(err.message);
    },
    onCompleted() {
      handleBack();
    },
  });

  const handleAddPhone = () => {
    setPhoneField([...phoneField, { number: "", error: "" }]);
  };

  const handleRemovePhone = (index: number) => {
    const newPhoneField = [...phoneField];
    newPhoneField.splice(index, 1);
    setPhoneField(newPhoneField);
  };

  const handleChangePhone = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...phoneField];
    values[index]["number"] = event?.target?.value;
    phoneField.map((field, indexIteratin) => {
      values[indexIteratin]["error"] = "";
      if (!field.number) {
        values[indexIteratin]["error"] = "Phone number should not be empty";
        setPhoneField(values);
      } else if (!phoneRegex.test(field.number)) {
        values[indexIteratin]["error"] = "Phone number should only numeric";
      }
      setPhoneField(values);
    });
  };

  const handleSubmit = () => {
    if (
      !firstNameField.error &&
      !lastNameField.error &&
      phoneField.filter((field) => !!field.error).length === 0
    ) {
      getContact({
        where: {
          _or: [
            { first_name: { _ilike: `${firstNameField.value}` } },
            { last_name: { _ilike: `${lastNameField.value}` } },
          ],
        },
      })
        .then(({ data }) => {
          if (data.contact && data.contact.length > 0) {
            setFirstNameField({
              value: firstNameField.value,
              error: "First name should be unique",
            });
            setLastNameField({
              value: lastNameField.value,
              error: "Last name should be unique",
            });
          } else {
            const phones = phoneField.map((field) => {
              return { number: field.number };
            });
            console.log(phones);
            createContact({
              variables: {
                first_name: firstNameField.value,
                last_name: lastNameField.value,
                phones,
              },
            });
          }
        })
        .catch((err) => {
          setSubmitError(err?.message || "Failed to check name uniqueness");
        });
    }
  };

  const handleChangeName = (type: "firstname" | "lastname", value: string) => {
    switch (type) {
      case "firstname":
        setFirstNameField({
          value: value,
          error: "",
        });
        if (!value) {
          setFirstNameField({
            value: value,
            error: "First name should not be empty",
          });
        }
        if (value && !nameRegex.test(value)) {
          setFirstNameField({
            value: value,
            error: "First name should only alphabetical",
          });
        }
        break;
      case "lastname":
        setLastNameField({
          value: value,
          error: "",
        });
        if (!value) {
          setLastNameField({
            value: value,
            error: "Last name should not be empty",
          });
        }
        if (value && !nameRegex.test(value)) {
          setLastNameField({
            value: value,
            error: "Last name should only alphabetical",
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <div css={styContactFormContainer}>
      <div css={styContactFormButton}>
        <button onClick={() => handleBack()}>🔙 Back</button>
        <div>
          <button onClick={handleSubmit}>💾 Save</button>
        </div>
      </div>
      <form css={styContactFormContent} onSubmit={(e) => e.preventDefault()}>
        {submitError && <p>{submitError}</p>}
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          placeholder="First name"
          onChange={(e) => handleChangeName("firstname", e.target.value)}
        />
        {firstNameField.error && <p>{firstNameField.error}</p>}

        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          placeholder="Last name"
          onChange={(e) => handleChangeName("lastname", e.target.value)}
        />
        {lastNameField.error && <p>{lastNameField.error}</p>}

        {phoneField.map((field, index) => {
          return (
            <div
              key={`phone-${index}`}
              css={styContactFormContentPhoneContainer}
            >
              <div css={styContactFormContentPhoneContent}>
                <label htmlFor={`phone-${index}`}>Phone Number</label>
                <input
                  id={`phone-${index}`}
                  type="phone"
                  placeholder="Phone number"
                  value={field.number || ""}
                  onChange={(e) => handleChangePhone(index, e)}
                />
                {field.error && <p>{field.error}</p>}
              </div>
              <button type="button" onClick={() => handleRemovePhone(index)}>
                ❌
              </button>
            </div>
          );
        })}
        <button type="button" onClick={() => handleAddPhone()}>
          Add Phone Number
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
