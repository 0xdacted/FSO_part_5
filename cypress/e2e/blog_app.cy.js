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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name=Password"]').type(user.password)
      cy.get('button[type="submit"]').click()

      cy.contains(`Welcome ${user.name}!`).should('be.visible')
      cy.get('button.logout').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('wrongusername')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('button[type="submit]').click()

      cy.contains('Wrong credentials').should('be.visible')
      cy.get('button.logout').should('not.exist')
    })
  })
})