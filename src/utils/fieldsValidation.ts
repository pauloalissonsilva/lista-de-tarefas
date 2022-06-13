interface IMessageData {
  password: {
    valueMissing: string,
    tooShort: string
  },
  text: {
    valueMissing: string
  },
  email: {
    valueMissing: string,
    typeMismatch: string
  }
}

export function fieldsValidation(fields: NodeListOf<HTMLInputElement>): void {

  function validateField(field: HTMLInputElement): Function {

    function verifyErrors(): string {
      let foundError: string;

      for (let error in field.validity) {

        if (field.validity[error] && !field.validity.valid) {
          foundError = error
        }
      }
      return foundError;
    }

    function customMessage(typeError: string): string {

      const messages: IMessageData = {
        password: {
          valueMissing: "Por favor, preencha este campo",
          tooShort: "Senha deve ter mínimo de 6 caracteres "
        },
        text: {
          valueMissing: "Por favor, preencha este campo"
        },
        email: {
          valueMissing: "Email é obrigatório",
          typeMismatch: "Por favor, preencha um email válido"
        }
      }

      return messages[field.type][typeError]
    }

    function setCustomMessage(message?: string): void {
      const spanError = field.parentNode.querySelector("span.error")

      if (message) {
        spanError.classList.add("active")
        spanError.innerHTML = message
      } else {
        spanError.classList.remove("active")
        spanError.innerHTML = ""
      }
    }

    return function () {

      const error = verifyErrors()

      if (error) {
        const message = customMessage(error)

        field.style.borderColor = "red"
        setCustomMessage(message)
      } else {
        field.style.borderColor = "green"
        setCustomMessage()
      }
    }
  }


  function customValidation(event: Event) {
    const field = event.target as HTMLInputElement
    const validation = validateField(field)

    validation()

  }

  for (const field of fields) {
    field.addEventListener("invalid", (event: Event) => {
      event.preventDefault()

      customValidation(event)
    })
    field.addEventListener("blur", customValidation)
  }
}