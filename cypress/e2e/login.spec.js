describe("Halaman Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Menampilkan form login", () => {
    cy.contains("Login Akun").should("be.visible");
    cy.get('input[type="email"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
  });

  it("Gagal login jika input kosong", () => {
    cy.contains("button", "Login").click();

    cy.get('input[type="email"]:invalid').should("exist");
    cy.get('input[type="password"]:invalid').should("exist");
  });

  it("Menampilkan error jika kredensial salah", () => {
    cy.get('input[type="email"]').type("salah@contoh.com");
    cy.get('input[type="password"]').type("salah123");

    cy.contains("button", "Login").click();

    cy.get(".error").should("be.visible").and("contain.text", ""); // isi sesuai error real API-mu
  });

  it("Berhasil login dan redirect ke halaman utama", () => {
    cy.login("user@example.com", "password123");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});
