///<reference types="cypress"/> 

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verificar título da página', () => {
    cy.title().should('be.eql', 'Central de Atendimento ao Cliente TAT')
  })
  
  it('preencher campos', () => {
    const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste v teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
    cy.get('input[id="firstName"]').type('Flin')
    cy.get('input[id="lastName"]').type('Conrado')
    cy.get('input[id="email"]').type('conrado@gmail.com')
    cy.get('[id="open-text-area"]').type(longText, {delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('[class="success"]').should('be.visible')
  })

  it('verificar mensagem de erro', () => {
    const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste v teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
    cy.get('input[id="firstName"]').type('Flin')
    cy.get('input[id="lastName"]').type('Conrado')
    cy.get('input[id="email"]').type('conradogmail.com')
    cy.get('[id="open-text-area"]').type(longText, {delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
  })

  it('verificar se o campo de telefone ficará vazio quando digitar dado não numérico', () => {
    cy.get('#phone').type('Flin').should('have.value', '')
  })

  it('validar obrigatoriedade do campo telefone', () => {
    cy.get('input[id="firstName"]').type('Flin')
    cy.get('input[id="lastName"]').type('Conrado')
    cy.get('input[id="email"]').type('conrado@gmail.com')
    cy.get('[id="open-text-area"]').type('teste')
    cy.get('input[id="phone-checkbox"]').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id="firstName"]').type('Flin').should('have.value', 'Flin')
      .clear().should('have.value', '')
    cy.get('input[id="lastName"]').type('Conrado').should('have.value', 'Conrado')
      .clear().should('have.value', '')
    cy.get('input[id="email"]').type('conrado@gmail.com').should('have.value', 'conrado@gmail.com')
      .clear().should('have.value', '')
    cy.get('[id="open-text-area"]').type('teste').should('have.value', 'teste')
      .clear().should('have.value', '')
    cy.get('input[id="phone"]').type('71996680629').should('have.value', '71996680629')
      .clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
  })
  
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('[class="success"]').should('be.visible')
  })
//Open Cypress|Clear ".only"
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('[id="product"]').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('[id="product"]').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (blog) por seu índice', () => {
    cy.get('[id="product"]').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').should('have.length', 3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    .last().uncheck().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[id="file-upload"]').selectFile('cypress/fixtures/example.json')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[id="file-upload"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[id="file-upload"]').selectFile('@sampleFile')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target').click()
    cy.title().should('be.eql', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
  })
})

