import "@testing-library/cypress/add-commands";
import "cypress-file-upload";
import "cypress-wait-until";



Cypress.Commands.add("signIn", (email: string, password: string) => {
  cy.get('input[name="username"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.clickSubmitBtn();
});



Cypress.Commands.add("clickSubmitBtn",()=>{
  return cy.get('button[type="submit"]').click()

})

Cypress.Commands.add("typeInsideBoxWithLabel",(label:string,text:string)=>{

  cy.contains("label",label)
        .parent()
        .parent()
        .find('input')
        .type(text)
})

Cypress.Commands.add("typeInsideAutoCompleteBoxWithLabel",(label:string,text:string)=>{

  cy.typeInsideBoxWithLabel(label,text)
    .then(()=>{
      cy.wait(2000).then(()=>{
        cy.get('.oxd-autocomplete-dropdown').eq(0).click()
      })
    })
})


declare global {
  namespace Cypress {
    interface Chainable {
      signIn(email: string, password: string): void;
      clickSubmitBtn():void;
      typeInsideBoxWithLabel(label:string,text:string)
      typeInsideAutoCompleteBoxWithLabel(label:string,text:string)
    }
  }
}
