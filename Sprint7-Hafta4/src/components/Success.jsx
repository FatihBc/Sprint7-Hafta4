import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents() {
            describe('Login Form Validation', () => {
                const visitForm = () => {
                    cy.visit('/');
                };

                it('Başarılı form gönderimi sonrası temizleniyor', () => {
                    visitForm();
                    cy.get('#exampleEmail').type('valid@test.com');
                    cy.get('#examplePassword').type('ValidPassword1');
                    cy.get('#terms').check();
                    cy.get('button[type="submit"]').click();

                    cy.get('#exampleEmail').should('have.value', '');
                    cy.get('#examplePassword').should('have.value', '');
                    cy.get('#terms').should('not.be.checked');
                });

                it('Sadece email hatalıysa → 1 hata mesajı, doğru içerik ve buton disabled', () => {
                    visitForm();
                    cy.get('#exampleEmail').type('invalid-email');
                    cy.get('#examplePassword').type('ValidPassword1');
                    cy.get('#terms').check();

                    cy.get('.feedback').should('have.length', 1);
                    cy.get('.feedback').should('contain', 'Please enter a valid email address');
                    cy.get('button[type="submit"]').should('be.disabled');
                });

                it('Hem email hem şifre hatalı → 2 hata mesajı, şifre hatası görünür', () => {
                    visitForm();
                    cy.get('#exampleEmail').type('invalid');
                    cy.get('#examplePassword').type('123');
                    cy.get('#terms').check();

                    cy.get('.feedback').should('have.length', 2);
                    cy.get('.feedback').eq(1).should('contain', 'Please enter a valid password');
                });

                it('Email ve şifre doğru ama terms işaretli değilse → buton disabled', () => {
                    visitForm();
                    cy.get('#exampleEmail').type('valid@test.com');
                    cy.get('#examplePassword').type('ValidPassword1');

                    cy.get('#terms').should('not.be.checked');
                    cy.get('button[type="submit"]').should('be.disabled');
                });
            });
        },
    },
});
