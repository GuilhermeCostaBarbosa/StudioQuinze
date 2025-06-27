document.querySelector('#mobile-btn').addEventListener('click', (e) => {
    e.stopPropagation()
    document.querySelector('#mobile-itens-list').classList.add('ativo')
    document.querySelector('.overlay-menu').style.display = 'block'
    
})

document.querySelector('#mobile-itens-list').addEventListener('click', (e) => {
    e.stopPropagation()
})


document.body.addEventListener('click', (event) => {
    document.querySelector('#mobile-itens-list').classList.remove('ativo')
    document.querySelector('.overlay-menu').style.display = 'none'
})

function showToast(message) {
  const toast = document.getElementById('toast')
  toast.textContent = message
  toast.classList.add('show')

  setTimeout(() => {
    toast.classList.remove('show')
  }, 4000) // esconde depois de 4 segundos
}


const form = document.getElementById('contact-form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Pegar os dados do formulario
    const formData = new FormData(form)

    // Converter em objeto
    const data = {
        nome: formData.get('nome'),
        tel: formData.get('telefone'),
        email: formData.get('email'),
        assunto: formData.get('assunto'),
        mensagem: formData.get('mensagem')
    }

    // Enviar para o backend
    try {
        const response = await fetch('.netlify/functions/server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        showToast(result.message || 'Mensagem enviada com sucesso!')
    } catch (error){
        showToast(`Erro ao enviar o formulário: ${error}`)
    }
})


