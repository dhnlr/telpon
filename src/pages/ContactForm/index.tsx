import useForm from "../../hooks/useForm";
import { Contact } from "../../types";
import {
  styContactFormButton,
  styContactFormContainer,
  styContactFormContent,
  styContactFormContentPhoneContainer,
  styContactFormContentPhoneContent,
  styContactFormError,
} from "./style";

interface ContactFormProps {
  contact?: Contact;
  handleBack: () => void;
}

function ContactForm({ contact, handleBack }: ContactFormProps) {
  const [{ firstNameField, lastNameField, phoneField, submitError, isEdit },
    {
      handleSubmit,
      handleChangeName,
      handleChangePhone,
      handleRemovePhone,
      handleAddPhone,
    }] = useForm(contact, handleBack)

  return (
    <div css={styContactFormContainer}>
      <form css={styContactFormContent} onSubmit={(e) => e.preventDefault()}>
        <div css={styContactFormButton}>
          <button onClick={() => handleBack()}>🔙 Back</button>
          <button type="submit" onClick={handleSubmit}>
            💾{isEdit ? " Edit" : " Save"}
          </button>
        </div>
        {submitError && <p css={styContactFormError}>{submitError}</p>}
        <label htmlFor="first_name">First Name</label>
        <input
          required
          id="first_name"
          placeholder="First name"
          value={firstNameField?.value}
          onChange={(e) => handleChangeName && handleChangeName("firstname", e.target.value)}
        />
        {firstNameField?.error && (
          <p css={styContactFormError}>{firstNameField.error}</p>
        )}

        <label htmlFor="last_name">Last Name</label>
        <input
          required
          id="last_name"
          placeholder="Last name"
          value={lastNameField?.value}
          onChange={(e) => handleChangeName && handleChangeName("lastname", e.target.value)}
        />
        {lastNameField?.error && (
          <p css={styContactFormError}>{lastNameField.error}</p>
        )}

        {phoneField?.map((field, index) => {
          return (
            <div
              key={`phone-${index}`}
              css={styContactFormContentPhoneContainer}
            >
              <div css={styContactFormContentPhoneContent}>
                <label htmlFor={`phone-${index}`}>Phone Number</label>
                <input
                  required
                  id={`phone-${index}`}
                  type="phone"
                  placeholder="Phone number"
                  value={field.number || ""}
                  onChange={(e) => handleChangePhone && handleChangePhone(index, e)}
                />
                {field.error && <p css={styContactFormError}>{field.error}</p>}
              </div>
              {!isEdit && (
                <button type="button" onClick={() => handleRemovePhone && handleRemovePhone(index)}>
                  ❌
                </button>
              )}
            </div>
          );
        })}
        {!isEdit && (
          <button type="button" onClick={() => handleAddPhone && handleAddPhone()}>
            Add Phone Number
          </button>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
