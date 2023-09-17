
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id="firstName"]').type('Flin')
    cy.get('input[id="lastName"]').type('Conrado')
    cy.get('input[id="email"]').type('conrado@gmail.com')
    cy.get('[id="open-text-area"]').type('teste')
    cy.get('.button').contains('Enviar').click()
})
    
