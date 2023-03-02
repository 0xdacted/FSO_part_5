import '../support/commands'
describe('Blog app', function () {
  const user = {
    name: 'John Doe',
    username: 'johndoe',
    password: 'password',
  }
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('form#login-form').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#username-input').type(user.username)
      cy.get('input#password-input').type(user.password)
      cy.get('button#login-button').click()

      cy.contains(`Welcome ${user.name}!`).should('be.visible')
      cy.get('button#logout-button').should('be.visible')
    })

    it('fails with wrong credentials', function () {
      cy.get('input#username-input').type('wrongusername')
      cy.get('input#password-input').type('wrongpassword')
      cy.get('button#login-button').click()

      cy.contains('Wrong credentials').should('be.visible')
      cy.get('button#logout-button').should('not.exist')
    })
  })

  describe('When logged in', function () {
    const user2 = {
      name: 'John Robinson',
      username: 'johnrobinson',
      password: 'password',
    }
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 0,
      user: user,
    }

    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
      cy.createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes,
        user: newBlog.user,
      })
    })

    it('A blog can be created', function () {
      cy.contains(newBlog.title).should('be.visible')
      cy.contains(newBlog.author).should('be.visible')
    })

    it('A blog can be liked', function () {
      cy.contains(newBlog.title, { timeout: 10000 })
        .parent()
        .find('button[id^="togglable-"]', { timeout: 10000 })
        .click()
      cy.contains(newBlog.title).parent().find('button#like-click').click()
      cy.contains(`likes ${newBlog.likes + 1}`)
    })

    it('User can delete a blog they created', function () {
      cy.contains(newBlog.title, { timeout: 10000 })
        .parent()
        .find('button[id^="togglable-"]', { timeout: 10000 })
        .click()
      cy.contains(newBlog.title)
        .parent()
        .find('button#remove-click', { timeout: 10000 })
        .click()
      cy.contains(newBlog.title, { timeout: 51000 }).should('not.exist')
    })

    it('User cannot see delete button for blogs they did not create', function () {
      cy.request('POST', 'http://localhost:3001/api/users', user2)
      cy.get('#logout-button').click()
      cy.visit('http://localhost:3000')
      cy.login({ username: user2.username, password: user2.password })
      cy.contains(newBlog.title, { timeout: 10000 })
        .parent()
        .find('button[id^="togglable-"]', { timeout: 10000 })
        .click()
      cy.contains(newBlog.title)
        .parent()
        .find('button#remove-click', { timeout: 10000 })
        .should('not.exist')
    })
  })

  describe('Blog ordering', function () {
    const blog1 = {
      title: 'First Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 1000,
      user: user,
    }

    const blog2 = {
      title: 'Second Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 999,
      user: user,
    }

    const blog3 = {
      title: 'Third Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 998,
      user: user,
    }
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
      cy.createBlog({
        title: blog3.title,
        author: blog3.author,
        url: blog3.url,
        likes: blog3.likes,
        user: blog3.user,
      })
      cy.createBlog({
        title: blog2.title,
        author: blog2.author,
        url: blog2.url,
        likes: blog2.likes,
        user: blog2.user,
      })
      cy.createBlog({
        title: blog1.title,
        author: blog1.author,
        url: blog1.url,
        likes: blog1.likes,
        user: blog1.user,
      })
    })
    it('Shows the blogs in order of their likes', function () {
      cy.get('.blog').eq(0).should('contain', 'First Blog')
      cy.get('.blog').eq(1).should('contain', 'Second Blog')
      cy.get('.blog').eq(2).should('contain', 'Third Blog')
    })
  })
})
