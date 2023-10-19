export function appendAlert(alertPlaceholderId: string ,msg: string, type: string) {
    const alertPlaceholder : HTMLDivElement = document.getElementById(alertPlaceholderId) as HTMLDivElement;
    const wrapper = document.createElement('div')
    
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${msg}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper);

    setInterval(() => {
        wrapper.remove();
    },2000)
}
