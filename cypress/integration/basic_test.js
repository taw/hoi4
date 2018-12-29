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
        "Infantry Equipment III" + "700 (490)" +
        "Advanced Artillery" + "84 (378)" +
        "Advanced Rocket Artillery" + "24 (120)"
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

  it("Millennium Dawn mod", () => {
    cy.get(".mod-selector button").eq(2).click()
    cy.get(".unit-select input").eq(0).clear().type(6)
    cy.get(".unit-select select").eq(0).select("Modern Tank")
    cy.get(".unit-select input").eq(1).clear().type(5)
    cy.get(".unit-select select").eq(1).select("Light Tank")
    cy.get(".unit-select input").eq(2).clear().type(4)
    cy.get(".unit-select select").eq(2).select("Mechanized Infantry")
    cy.get(".unit-select input").eq(3).clear().type(3)
    cy.get(".unit-select select").eq(3).select("Light Mechanized")
    cy.get(".equipment-count").then(x => {
      expect(x.text()).to.eq(
        "Modern Gen 3 MBT" + "300 (10800)" +
        "Modern Gen 3 Light Tank" + "300 (3900)" +
        "Modern Equipment" + "700 (525)" +
        "Gen 2 Mechanized" + "400 (8800)" +
        "Gen 2 Light Mechanized" + "300 (3600)"
      )
    })
  })
})
