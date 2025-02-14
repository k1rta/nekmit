import homepage from '../selectors/homepage.js'

describe('Homepage', () => {

  const text = {
    header: 'Kirta-Linda Karits',
    paragraph: 'Software testing for great products • QA outsourcing • Customized testing solutions & methodologies • Automation'
  };

  const css = {
    color: 'rgb(99, 230, 190)',
    headingFontSize: '69.6px',
    paragraphFontSize: '24px',
    headingFontWeight: '900',
    paragraphFontWeight: '300',
    headingLetterSpacing: '-2.436px',
    paragraphLetterSpacing: '-0.4px',
    headingLineHeight: '69.6px',
    paragraphLineHeight: '28px'
  };

  const links = [
    'https://www.cypress.io/',
    'https://github.com/k1rta/nekmit/',
    'https://github.com/k1rta/nekmit/issues',
    'http://html5up.net/'
  ];

  const footerText = '© Nekmit LLC. Design: HTML5 UP.';

  beforeEach(() => {
    cy.visit('')
  });

  it('should display the correct header', () => {
    cy.get(homepage.header)
      .should('be.visible')
    cy.get(homepage.heading)
      .should('be.visible')
      .and('have.text', text.header)
      .and('have.css', 'color', css.color)
      .and('have.css', 'font-size', css.headingFontSize)
      .and('have.css', 'font-weight', css.headingFontWeight)
      .and('have.css', 'letter-spacing', css.headingLetterSpacing)
      .and('have.css', 'line-height', css.headingLineHeight)
  });
  
  /* it('check paragraph', () => {
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
    cy.get(homepage.emailLink).each($a => {
        expect($a, email).to.have.attr("href").not.contain("undefined")
    });
  });

it('check footer', () => {
  cy.get(homepage.footer)
    .should('be.visible')
    .and('have.text', footerText[0])
  }); */
})