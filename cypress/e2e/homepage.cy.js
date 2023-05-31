import homepage, { email, links } from '../selectors/homepage.js'

describe('Homepage', () => {

  const text = ['Nekmit', 'Software testing for great products • QA outsourcing • Customised testing solutions & methodologies • Automation']
  const css = ['rgb(0, 0, 0)', '64px', '20px', '900', '300', '-2.24px', '-0.4px', '64px', '28px']
  const links = ['https://www.cypress.io/', 'https://github.com/k1rta/nekmit/', 'https://github.com/k1rta/nekmit/issues', 'http://html5up.net/']
  const footerText = ['\n\t\t\t\t\t\t© Nekmit OÜ. Design: HTML5 UP.\n\t\t\t\t\t']

  beforeEach(() => {
    cy.visit('')
  });

  it('check header', () => {
    cy.get(homepage.header)
      .should('be.visible')
      .and('have.text', text[0])
      .and('have.css', 'color', css[0])
      .and('have.css', 'font-size', css[1])
      .and('have.css', 'font-weight', css[3])
      .and('have.css', 'letter-spacing', css[5])
      .and('have.css', 'line-height', css[7])
  });
  
  it('check paragraph', () => {
    cy.get(homepage.paragraph)
      .should('be.visible')
      .and('have.text', text[1])
      .and('have.css', 'color', css[0])
      .and('have.css', 'font-size', css[2])
      .and('have.css', 'font-weight', css[4])
      .and('have.css', 'letter-spacing', css[6])
      .and('have.css', 'line-height', css[8])
  });

  it('check links', () => {
      cy.get(homepage.links).each($a => {
          expect($a, links).to.have.attr("href").not.contain("undefined")
          expect($a, links).to.have.attr("target").contain("_blank")
      });
  });

  it('check email', () => {
    cy.get(homepage.email).each($a => {
        expect($a, email).to.have.attr("href").not.contain("undefined")
    });
  });

it('check footer', () => {
  cy.get(homepage.footer)
    .should('be.visible')
    .and('have.text', footerText[0])
  });
})