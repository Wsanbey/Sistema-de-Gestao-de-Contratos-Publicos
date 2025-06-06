describe('Cadastro de Contrato', () => {
  it('Deve preencher e salvar o formulário de contrato', () => {
    // Visita a página de cadastro
    cy.visit('/contratos/novo')

    // Preenche os campos do formulário
    cy.get('input[name="numero"]').type('CONT-0001')
    cy.get('input[name="orgao"]').type('Prefeitura Municipal')
    cy.get('textarea[name="objeto"]').type('Contratação de serviços...')
    cy.get('input[name="valor_global"]').type('10000')
    cy.get('input[name="valor_empenhado"]').type('5000')
    cy.get('input[name="data_inicio"]').type('2024-01-01')
    cy.get('input[name="data_termino"]').type('2024-12-31')
    cy.get('select[name="tipo_reajuste"]').select('INPC')

    // Clica no botão de salvar
    cy.get('button[type="submit"]').click()

    // Verifica se o contrato foi salvo com sucesso
    cy.contains('Contrato salvo com sucesso!').should('be.visible')
  })
})