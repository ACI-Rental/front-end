/// <reference types="cypress" />

describe('Users overview tests', () => {
    it('Should show table headers in English', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');

        cy.get(".mat-column-number").contains("Student number").should("exist");
        cy.get(".mat-column-blocked").contains("Blocked until").should("exist");
        cy.get(".mat-column-role").contains("Role").should("exist");
    });

    it('Should show table headers in Dutch', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');

        cy.get(".mat-column-number").contains("Studentennummer").should("exist");
        cy.get(".mat-column-blocked").contains("Geblokkeerd tot").should("exist");
        cy.get(".mat-column-role").contains("Rol").should("exist");
    });

    it('Should show paginator labels in English', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');

        cy.get(".mat-paginator-page-size-label").contains("Items per page").should("exist");
        cy.get(".mat-paginator-range-label").contains("1 - 7 of 7").should("exist");
    });

    it('Should show paginator labels in Dutch', () => {
        cy.intercept('GET', '/api/user', { fixture: 'users-overview-page-1.json'}).as('getUsers');
    
        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');

        cy.get(".mat-paginator-page-size-label").contains("Artikelen per pagina").should("exist");
        cy.get(".mat-paginator-range-label").contains("1 - 7 van 7").should("exist");
    });

    it('Should show error in English', () => {
        cy.visit('http://localhost:4200');
        cy.changeLanguage('en');

        cy.intercept('GET', '/api/user', { statusCode: 500 }).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.wait("@getUsers");

        cy.get("snack-bar-container").contains('Something went wrong, please try again later').should("exist");
    });

    it('Should show error in Dutch', () => {
        cy.visit('http://localhost:4200');
        cy.changeLanguage('nl');

        cy.intercept('GET', '/api/user', { statusCode: 500 }).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.wait("@getUsers");

        cy.get("snack-bar-container").contains('Er is iets misgegaan, probeer later opnieuw').should("exist");
    });


    it('Should go to next page', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('GET', /\/api\/user\/page\/1\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsersNextPage');
        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(5).click();
        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getUsersNextPage");
    });

    it('Should change page size', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('GET', '/api/user/page/0/100', { fixture: 'users-overview-page-1.json'}).as('getUsersNextPage');

        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(100).click();

        cy.wait("@getUsers");
    });

    it('Should have 5 users', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-row').should('have.length', 5);
    });

    it('Should change user amount on page change', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.intercept('GET', /\/api\/user\/page\/1\/[0-9]+$/, { fixture: 'users-overview-page-2.json'}).as('getUsersNextPage');
        cy.get('.mat-paginator-container mat-select').click().get('mat-option').contains(5).click();
        cy.get(".mat-paginator-navigation-next").click();

        cy.wait("@getUsersNextPage");

        cy.get('.mat-table').find('.mat-row').should('have.length', 2);
    });

    it('Should show role labels in English', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.cdk-column-role:contains("User")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Employee")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Admin")').should('have.length', 1);
    });

    it('Should show role labels in Dutch', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('nl');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.cdk-column-role:contains("Gebruiker")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Medewerker")').should('have.length', 2);
        cy.get('.mat-table').find('.cdk-column-role:contains("Admin")').should('have.length', 1);
    });

    it('Should show correct information in the table', () => {
        cy.intercept('GET', /\/api\/user\/page\/0\/[0-9]+$/, { fixture: 'users-overview-page-1.json'}).as('getUsers');

        cy.visit('http://localhost:4200/users');
        cy.changeLanguage('en');
        cy.wait("@getUsers");

        cy.get('.mat-table').find('.mat-column-number').contains(1).should('exist');
        cy.get('.mat-table').find('.mat-column-number').contains(2).should('exist');
        cy.get('.mat-table').find('.mat-column-number').contains(4).should('exist');
        cy.get('.mat-table').find('.mat-column-number').contains(5).should('exist');
        cy.get('.mat-table').find('.mat-column-number').contains(6).should('exist');

        cy.get('.mat-table').find('.mat-column-blocked').contains("2021-12-24T10:00:00").should('exist');
    });
});