interface IPropsAlert {
  type: "success" | "danger" | "info"
}

export const alert = (message: string, type: IPropsAlert, local_tag = "body") => {
  const alertPlaceholder = document.querySelector<HTMLBodyElement>(local_tag)
  const wrapper = document.createElement('div')

  wrapper.innerHTML = [
    `<div class="alert alert-${type.type} alert-dismissible position-fixed top-0 end-0" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
  setTimeout(() => {
    alertPlaceholder.removeChild(wrapper)
  }, 5000);
}
