context("Basic tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:3000/")
  })

  it("basic template", () => {
    cy.get(".unit-select input").eq(0).clear().type(10)
    cy.get(".unit-select select").eq(0).select("cavalry")
    cy.get(".unit-select input").eq(1).clear().type(5)
    cy.get(".unit-select select").eq(1).select("heavy_armor")
    cy.get(".equipment-count").then(x => {
      expect(x.text()).to.eq(
        "Infantry Equipment I" + "1200 (600)" +
        "Heavy Tank I" + "200 (5000)" +
        "Towed Artillery" + "12 (42)"
      )
    })
  })

  it("technology and doctrines", () => {
    cy.get(".choices select").eq(0).select("1945")
    cy.get(".choices select").eq(1).select("Mobile Warfare / Blitzkrieg / Desperate Defense")
    cy.get(".support :checkbox").eq(3).check()
    cy.get(".equipment-count").then(x => {
      expect(x.text()).to.eq(
        "Infantry Equipment III" + "700 (483)" +
        "Advanced Artillery" + "84 (378)" +
        "Advanced Rocket Artillery" + "12 (60)"
      )
    })
  })

  it("Kaiserreich mod", () => {
    cy.get(".mod-selector button").eq(1).click()
    cy.get(".unit-select input").eq(0).clear().type(10)
    cy.get(".unit-select select").eq(0).select("militia")
    cy.get(".unit-select input").eq(1).clear()
    cy.get(".support :checkbox").eq(2).uncheck()
    cy.get(".equipment-count").then(x => {
      expect(x.text()).to.eq(
        "Infantry Equipment I" + "750 (375)"
      )
    })
  })
})
