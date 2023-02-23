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

  describe('When logged in', function() {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testblog.com'
    }
      
    beforeEach(function() {
      cy.get('input#username-input').type(user.username)
      cy.get('input#password-input').type(user.password)
      cy.get('button#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('button#new-blog', { timeout: 10000 }).click()
      cy.get('input#title-input').type(newBlog.title)
      cy.get('input#author-input').type(newBlog.author)
      cy.get('input#url-input').type(newBlog.url)
      cy.get('button#create-blog').click()

      cy.contains(newBlog.title).should('be.visible')
      cy.contains(newBlog.author).should('be.visible')
      })

      it('A blog can be liked')
    })
  })

