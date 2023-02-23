import '../support/commands'
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
      url: 'http://testblog.com',
      likes: 0,
  
    }
      
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      cy.createBlog(newBlog)

      cy.contains(newBlog.title).should('be.visible')
      cy.contains(newBlog.author).should('be.visible')
      })

    it.only('A blog can be liked', function() {
      cy.createBlog(newBlog)

      cy.contains(newBlog.title, { timeout: 10000 }).parent().find('button[id^="togglable-"]', { timeout: 10000 }).click()
      cy.wait(500)
      cy.contains(newBlog.title).parent().find('button#like-click').click()
      cy.contains(`likes ${newBlog.likes + 1}`)
      })
    })
  })

