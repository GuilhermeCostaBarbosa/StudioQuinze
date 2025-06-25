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


document.querySelector('#contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.querySelector('#name').value,
    telefone: document.querySelector('#telefone').value,
    email: document.querySelector('#email').value,
    subject: document.querySelector('#subject').value,
    mensagem: document.querySelector('#mensagem').value,
  };

  try {
    const response = await fetch('http://localhost:3000/enviar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('Mensagem enviada com sucesso!');
    } else {
      alert('Erro ao enviar: ' + data.error);
    }
  } catch (error) {
    console.error(error);
    alert('Erro ao enviar a mensagem.');
  }
});
