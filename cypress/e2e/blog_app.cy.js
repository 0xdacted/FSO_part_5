describe('Blog app', function()  {
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    password: 'password'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form#login-form').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input#username-input').type(user.username)
      cy.get('input#password-input').type(user.password)
      cy.get('button#login-button').click()

      cy.contains(`Welcome ${user.name}!`).should('be.visible')
      cy.get('button#logout-button').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username-input').type('wrongusername')
      cy.get('input#password-input').type('wrongpassword')
      cy.get('button#login-button').click()

      cy.contains('Wrong credentials').should('be.visible')
      cy.get('button#logout-button').should('not.exist')
    })
  })
})
